/**
 * AgencyOS — Authentication Service Abstraction
 *
 * Provides a unified API for authentication across Demo/Mock, Firebase,
 * and future backend adapters (such as Supabase or custom REST APIs).
 */

import { appConfig } from '../config/app.config.js';
import { auth as firebaseAuth, isFirebaseConfigured } from './firebase.js';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
  OAuthProvider,
  signOut as firebaseSignOut,
  onAuthStateChanged,
} from 'firebase/auth';

const STORAGE_KEYS = appConfig.storageKeys;

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
 * Format Firebase and authentication error codes into user-friendly messages
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
    return 'This domain is not authorized in your Firebase project. Please add it under Firebase Console > Authentication > Settings > Authorized domains.';
  }
  if (code === 'auth/operation-not-allowed') {
    if (provider === 'google') {
      return 'Google sign-in is not enabled in your Firebase project. Please enable Google under Authentication > Sign-in method in Firebase Console.';
    }
    if (provider === 'apple') {
      return 'Apple sign-in is not enabled in your Firebase project. Please configure Apple under Authentication > Sign-in method in Firebase Console.';
    }
    return 'This authentication provider is not enabled in your Firebase Authentication settings.';
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
  if (code === 'auth/configuration-not-found' || code === 'auth/invalid-oauth-provider') {
    if (provider === 'apple') {
      return 'Apple sign-in is not configured correctly in Firebase. Please check your Firebase Apple OAuth credentials.';
    }
    return 'OAuth provider is not configured properly in Firebase. Please check your Authentication settings.';
  }

  // Return clean message for custom errors (e.g. missing environment variables)
  if (message.includes('Firebase credentials are not configured')) {
    return message;
  }

  return message || 'Authentication failed. Please check your settings and try again.';
}

/**
 * Sign In with Email & Password
 */
export async function signIn(email, password) {
  // If Firebase Mode is enabled
  if (appConfig.authProvider === 'firebase') {
    if (!isFirebaseConfigured || !firebaseAuth) {
      throw new Error('Firebase credentials are not configured. Please add your Firebase configuration to .env or set VITE_AUTH_PROVIDER="demo".');
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

  // Demo / Mock Mode
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
  // If Firebase Mode is enabled
  if (appConfig.authProvider === 'firebase') {
    if (!isFirebaseConfigured || !firebaseAuth) {
      throw new Error('Firebase credentials are not configured. Please add your Firebase configuration to .env or set VITE_AUTH_PROVIDER="demo".');
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

  // Demo / Mock Mode
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
 * Google Social Sign In / Up
 */
export async function signInWithGoogle() {
  // If Firebase Mode is enabled: strictly execute Firebase OAuth
  if (appConfig.authProvider === 'firebase') {
    if (!isFirebaseConfigured || !firebaseAuth) {
      throw new Error('Firebase credentials are not configured. Please add your Firebase configuration to .env or set VITE_AUTH_PROVIDER="demo".');
    }

    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    
    // Execute real Firebase popup OAuth without silent catch-to-demo fallback
    const result = await signInWithPopup(firebaseAuth, provider);
    const user = result.user;
    const displayName = user.displayName || (user.email ? user.email.split('@')[0] : 'Google User');
    
    saveStoredUserProfile({
      name: displayName,
      email: user.email || 'google.user@agencyos.app',
      initials: getInitials(displayName),
      avatar: user.photoURL || null,
    });
    localStorage.setItem(STORAGE_KEYS.auth, 'true');
    return user;
  }

  // Demo Mode: Mock instant login for local evaluation
  const mockUser = {
    uid: 'google-demo-uid',
    displayName: 'Google Demo User',
    email: 'google.user@agencyos.app',
  };
  saveStoredUserProfile({
    name: mockUser.displayName,
    email: mockUser.email,
    initials: 'GU',
  });
  localStorage.setItem(STORAGE_KEYS.auth, 'true');
  return mockUser;
}

/**
 * Apple Social Sign In / Up
 */
export async function signInWithApple() {
  // If Firebase Mode is enabled: strictly execute Firebase Apple OAuth
  if (appConfig.authProvider === 'firebase') {
    if (!isFirebaseConfigured || !firebaseAuth) {
      throw new Error('Firebase credentials are not configured. Please add your Firebase configuration to .env or set VITE_AUTH_PROVIDER="demo".');
    }

    const provider = new OAuthProvider('apple.com');
    provider.addScope('email');
    provider.addScope('name');
    
    // Execute real Firebase popup OAuth without silent catch-to-demo fallback
    const result = await signInWithPopup(firebaseAuth, provider);
    const user = result.user;
    const displayName = user.displayName || (user.email ? user.email.split('@')[0] : 'Apple User');
    
    saveStoredUserProfile({
      name: displayName,
      email: user.email || 'apple.user@agencyos.app',
      initials: getInitials(displayName),
      avatar: user.photoURL || null,
    });
    localStorage.setItem(STORAGE_KEYS.auth, 'true');
    return user;
  }

  // Demo Mode: Mock instant login for local evaluation
  const mockUser = {
    uid: 'apple-demo-uid',
    displayName: 'Apple Demo User',
    email: 'apple.user@agencyos.app',
  };
  saveStoredUserProfile({
    name: mockUser.displayName,
    email: mockUser.email,
    initials: 'AU',
  });
  localStorage.setItem(STORAGE_KEYS.auth, 'true');
  return mockUser;
}

/**
 * Log Out
 */
export async function logout() {
  if (appConfig.authProvider === 'firebase' && isFirebaseConfigured && firebaseAuth) {
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
 * Listen to auth state changes (optional subscriber)
 */
export function subscribeToAuthState(callback) {
  if (appConfig.authProvider === 'firebase' && isFirebaseConfigured && firebaseAuth) {
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
        if (localStorage.getItem(STORAGE_KEYS.auth) === 'true' && !getStoredUserProfile()?.email?.includes('demo')) {
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
  getInitials,
  getDefaultUserProfile,
  getStoredUserProfile,
  saveStoredUserProfile,
  isAuthenticated,
  formatAuthErrorMessage,
  signIn,
  signUp,
  signInWithGoogle,
  signInWithApple,
  logout,
  subscribeToAuthState,
};
