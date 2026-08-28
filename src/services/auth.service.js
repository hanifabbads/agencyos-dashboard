/**
 * AgencyOS — Authentication Service
 *
 * Provides robust authentication support for Firebase Authentication (Google OAuth & Email/Password)
 * and zero-config local development demo mode.
 */

import { appConfig } from '../config/app.config.js';
import { auth as firebaseAuth, isFirebaseConfigured } from './firebase.js';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  onAuthStateChanged,
} from 'firebase/auth';

const STORAGE_KEYS = appConfig.storageKeys;

/**
 * Check if Firebase is the active authentication provider.
 * Returns true if:
 * 1. Explicitly configured as 'firebase', OR
 * 2. Firebase credentials exist in the environment (e.g. on Vercel) and provider is not 'supabase'.
 */
export function isUsingFirebase() {
  const env = (typeof import.meta !== 'undefined' && import.meta.env)
    ? import.meta.env
    : (typeof process !== 'undefined' && process.env)
      ? process.env
      : {};
  const explicit = env.VITE_AUTH_PROVIDER || appConfig.authProvider;
  if (explicit === 'supabase') return false;
  if (explicit === 'firebase') return true;
  if (isFirebaseConfigured && firebaseAuth) return true;
  return false;
}

/**
 * Safe, privacy-preserving diagnostics for debugging deployment auth states.
 * (Never logs actual API keys or secret values).
 */
export function getAuthDiagnostics() {
  const env = (typeof import.meta !== 'undefined' && import.meta.env)
    ? import.meta.env
    : (typeof process !== 'undefined' && process.env)
      ? process.env
      : {};
  return {
    provider: appConfig.authProvider,
    isUsingFirebase: isUsingFirebase(),
    isFirebaseConfigured: isFirebaseConfigured,
    hasApiKey: Boolean(env.VITE_FIREBASE_API_KEY),
    hasAuthDomain: Boolean(env.VITE_FIREBASE_AUTH_DOMAIN),
    hasProjectId: Boolean(env.VITE_FIREBASE_PROJECT_ID),
    isProduction: Boolean(env.PROD || (typeof process !== 'undefined' && process.env && process.env.NODE_ENV === 'production')),
  };
}

/**
 * Generate 2-character initials from a full name.
 */
export function getInitials(name) {
  if (!name || typeof name !== 'string') return 'AO';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/**
 * Default fallback user profile
 */
export function getDefaultUserProfile(override = {}) {
  const name = override.name || 'Agency Owner';
  return {
    name,
    role: override.role || 'Agency Owner',
    email: override.email || 'admin@agencyos.app',
    initials: getInitials(name),
    taskThreshold: override.taskThreshold || 30,
    emailNotifications: override.emailNotifications ?? true,
    avatar: override.avatar || null,
  };
}

/**
 * Read stored user profile from localStorage safely
 */
export function getStoredUserProfile() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.userProfile);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.name) {
        return {
          ...getDefaultUserProfile(),
          ...parsed,
          initials: parsed.initials || getInitials(parsed.name),
        };
      }
    }
  } catch (err) {
    console.warn('Could not read user profile from storage:', err);
  }
  return getDefaultUserProfile();
}

/**
 * Save user profile to localStorage
 */
export function saveStoredUserProfile(profile) {
  try {
    const sanitized = {
      ...getStoredUserProfile(),
      ...profile,
      initials: profile.initials || getInitials(profile.name || 'Agency Owner'),
    };
    localStorage.setItem(STORAGE_KEYS.userProfile, JSON.stringify(sanitized));
    return sanitized;
  } catch (err) {
    console.warn('Could not write user profile to storage:', err);
    return profile;
  }
}

/**
 * Check if user is currently authenticated
 */
export function isAuthenticated() {
  try {
    return localStorage.getItem(STORAGE_KEYS.auth) === 'true';
  } catch {
    return false;
  }
}

/**
 * Format Firebase and authentication error codes into clear, user-friendly messages
 */
export function formatAuthErrorMessage(error, provider = null) {
  if (!error) return 'An unexpected error occurred. Please try again.';

  const code = error.code || '';
  const message = error.message || '';

  if (code === 'auth/popup-closed-by-user') {
    return 'Sign-in window was closed before completing authentication. Please try again.';
  }
  if (code === 'auth/popup-blocked') {
    return 'The sign-in popup was blocked by your browser. Please allow popups for this site.';
  }
  if (code === 'auth/cancelled-popup-request') {
    return 'The authentication popup request was cancelled. Please try again.';
  }
  if (code === 'auth/unauthorized-domain') {
    return 'This domain is not authorized in your Firebase project. Please add your current domain (including Vercel deployment URL) under Firebase Console > Authentication > Settings > Authorized domains.';
  }
  if (code === 'auth/operation-not-allowed') {
    if (provider === 'google') {
      return 'Google sign-in is not enabled in your Firebase project. Please enable Google under Authentication > Sign-in method in Firebase Console.';
    }
    return 'This authentication provider is not enabled in your Firebase Authentication settings.';
  }
  if (code === 'auth/invalid-api-key') {
    return 'Invalid Firebase API key. Please check your VITE_FIREBASE_API_KEY environment variable.';
  }
  if (code === 'auth/account-exists-with-different-credential') {
    return 'An account already exists with the same email address using a different sign-in provider.';
  }
  if (code === 'auth/invalid-credential' || code === 'auth/wrong-password' || code === 'auth/user-not-found') {
    return 'Invalid email or password. Please check your credentials.';
  }
  if (code === 'auth/invalid-email') {
    return 'Please enter a valid email address.';
  }
  if (code === 'auth/email-already-in-use') {
    return 'An account with this email address already exists. Please sign in instead.';
  }
  if (code === 'auth/weak-password') {
    return 'Password is too weak. Please use at least 6 characters.';
  }
  if (code === 'auth/user-disabled') {
    return 'This user account has been disabled. Please contact support.';
  }
  if (code === 'auth/too-many-requests') {
    return 'Too many failed login attempts. Access has been temporarily restricted. Please try again later.';
  }
  if (code === 'auth/network-request-failed') {
    return 'Network connection error. Please check your internet connection and try again.';
  }

  // Return clean message for custom configuration errors
  if (message.includes('Firebase credentials are not configured') || message.includes('Google Sign-In requires Firebase')) {
    return message;
  }

  return message || 'Authentication failed. Please check your settings and try again.';
}

/**
 * Sign In with Email & Password
 */
export async function signIn(email, password) {
  if (isUsingFirebase()) {
    if (!isFirebaseConfigured || !firebaseAuth) {
      throw new Error('Firebase credentials are not configured. Please add your Firebase configuration to environment variables.');
    }

    const userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password);
    const user = userCredential.user;
    const displayName = user.displayName || (email ? email.split('@')[0] : 'Agency Owner');
    
    saveStoredUserProfile({
      name: displayName,
      email: user.email || email,
      initials: getInitials(displayName),
    });
    localStorage.setItem(STORAGE_KEYS.auth, 'true');
    return user;
  }

  // Demo Mode (Available only in local development when Firebase is not configured)
  const isProd = typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.PROD;
  if (isProd) {
    throw new Error('Authentication requires Firebase configuration. Please configure VITE_FIREBASE_* environment variables in your deployment.');
  }

  const displayName = email ? email.split('@')[0] : 'Agency Owner';
  const formattedName = displayName.charAt(0).toUpperCase() + displayName.slice(1);
  const mockUser = {
    uid: `demo-user-${Date.now()}`,
    email: email || 'admin@agencyos.app',
    displayName: formattedName,
  };

  saveStoredUserProfile({
    name: formattedName,
    email: mockUser.email,
    initials: getInitials(formattedName),
  });
  localStorage.setItem(STORAGE_KEYS.auth, 'true');
  return mockUser;
}

/**
 * Sign Up / Register Account
 */
export async function signUp(username, email, password) {
  if (isUsingFirebase()) {
    if (!isFirebaseConfigured || !firebaseAuth) {
      throw new Error('Firebase credentials are not configured. Please add your Firebase configuration to environment variables.');
    }

    const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
    const cleanUsername = username ? username.trim() : '';
    if (cleanUsername) {
      try {
        await updateProfile(userCredential.user, { displayName: cleanUsername });
      } catch (e) {
        console.warn('Firebase profile update warning:', e);
      }
    }
    const displayName = cleanUsername || userCredential.user.displayName || 'Agency Owner';
    saveStoredUserProfile({
      name: displayName,
      email: email,
      initials: getInitials(displayName),
    });
    localStorage.setItem(STORAGE_KEYS.auth, 'true');
    return { ...userCredential.user, displayName };
  }

  // Demo Mode (Available only in local development when Firebase is not configured)
  const isProd = typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.PROD;
  if (isProd) {
    throw new Error('Registration requires Firebase configuration. Please configure VITE_FIREBASE_* environment variables in your deployment.');
  }

  const cleanUsername = username ? username.trim() : (email ? email.split('@')[0] : 'Agency Owner');
  const mockUser = {
    uid: `demo-user-${Date.now()}`,
    email: email || 'admin@agencyos.app',
    displayName: cleanUsername,
  };

  saveStoredUserProfile({
    name: cleanUsername,
    email: mockUser.email,
    initials: getInitials(cleanUsername),
  });
  localStorage.setItem(STORAGE_KEYS.auth, 'true');
  return mockUser;
}

/**
 * Google Social Sign In
 * Strictly triggers Firebase GoogleAuthProvider popup.
 * Never silently enters the dashboard without successful OAuth resolution.
 */
export async function signInWithGoogle() {
  if (isUsingFirebase()) {
    if (!isFirebaseConfigured || !firebaseAuth) {
      throw new Error('Firebase credentials are not configured. Please ensure VITE_FIREBASE_API_KEY and VITE_FIREBASE_PROJECT_ID are set in your environment variables.');
    }

    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    
    // Execute real Firebase popup OAuth
    const result = await signInWithPopup(firebaseAuth, provider);
    const user = result.user;
    const displayName = user.displayName || (user.email ? user.email.split('@')[0] : 'Google User');
    
    saveStoredUserProfile({
      name: displayName,
      email: user.email || 'user@agencyos.app',
      initials: getInitials(displayName),
      avatar: user.photoURL || null,
    });
    localStorage.setItem(STORAGE_KEYS.auth, 'true');
    return user;
  }

  // In production, NEVER mock Google authentication
  const isProd = typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.PROD;
  if (isProd) {
    throw new Error('Google Sign-In requires Firebase configuration. Please configure VITE_FIREBASE_* environment variables in your Vercel Project Settings.');
  }

  // In local development demo mode without Firebase credentials
  throw new Error('Google Sign-In requires Firebase configuration. Please add your Firebase credentials to .env or use Email sign-in for Demo mode.');
}

/**
 * Log Out
 */
export async function logout() {
  if (isUsingFirebase() && isFirebaseConfigured && firebaseAuth) {
    try {
      await firebaseSignOut(firebaseAuth);
    } catch (err) {
      console.warn('Firebase sign out warning:', err);
    }
  }

  try {
    localStorage.removeItem(STORAGE_KEYS.auth);
    localStorage.removeItem(STORAGE_KEYS.userProfile);
  } catch (err) {
    console.warn('Storage cleanup warning:', err);
  }
}

/**
 * Listen to auth state changes
 */
export function subscribeToAuthState(callback) {
  if (isUsingFirebase() && isFirebaseConfigured && firebaseAuth) {
    return onAuthStateChanged(firebaseAuth, (firebaseUser) => {
      if (firebaseUser) {
        const displayName = firebaseUser.displayName || (firebaseUser.email ? firebaseUser.email.split('@')[0] : 'Agency Owner');
        const profile = {
          name: displayName,
          email: firebaseUser.email || 'user@agencyos.app',
          initials: getInitials(displayName),
          avatar: firebaseUser.photoURL || null,
        };
        saveStoredUserProfile(profile);
        localStorage.setItem(STORAGE_KEYS.auth, 'true');
        callback(profile);
      } else {
        if (localStorage.getItem(STORAGE_KEYS.auth) === 'true') {
          localStorage.removeItem(STORAGE_KEYS.auth);
          localStorage.removeItem(STORAGE_KEYS.userProfile);
          callback(null);
        }
      }
    });
  }

  // If in demo mode, invoke immediately with stored profile state
  if (isAuthenticated()) {
    callback(getStoredUserProfile());
  } else {
    callback(null);
  }
  return () => {};
}

export default {
  isUsingFirebase,
  getAuthDiagnostics,
  getInitials,
  getDefaultUserProfile,
  getStoredUserProfile,
  saveStoredUserProfile,
  isAuthenticated,
  formatAuthErrorMessage,
  signIn,
  signUp,
  signInWithGoogle,
  logout,
  subscribeToAuthState,
};
