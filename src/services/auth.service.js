/**
 * AgencyOS — Authentication Service Abstraction
 *
 * Provides a unified API for authentication across Demo/Mock, Firebase,
 * and future backend adapters (such as Supabase or custom REST APIs).
 */

import { appConfig } from '../config/app.config';
import { auth as firebaseAuth, isFirebaseConfigured } from './firebase';
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
 * Sign In with Email & Password
 */
export async function signIn(email, password) {
  // If Firebase is configured and selected
  if (appConfig.authProvider === 'firebase' && isFirebaseConfigured && firebaseAuth) {
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
  // If Firebase is configured and selected
  if (appConfig.authProvider === 'firebase' && isFirebaseConfigured && firebaseAuth) {
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
  if (appConfig.authProvider === 'firebase' && isFirebaseConfigured && firebaseAuth) {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(firebaseAuth, provider);
      const user = result.user;
      const displayName = user.displayName || 'Google User';
      saveStoredUserProfile({
        name: displayName,
        email: user.email || 'google.user@agencyos.app',
        initials: getInitials(displayName),
      });
      localStorage.setItem(STORAGE_KEYS.auth, 'true');
      return user;
    } catch (error) {
      console.warn('Firebase Google Auth error, falling back to demo session:', error);
    }
  }

  // Demo fallback
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
  if (appConfig.authProvider === 'firebase' && isFirebaseConfigured && firebaseAuth) {
    try {
      const provider = new OAuthProvider('apple.com');
      const result = await signInWithPopup(firebaseAuth, provider);
      const user = result.user;
      const displayName = user.displayName || 'Apple User';
      saveStoredUserProfile({
        name: displayName,
        email: user.email || 'apple.user@agencyos.app',
        initials: getInitials(displayName),
      });
      localStorage.setItem(STORAGE_KEYS.auth, 'true');
      return user;
    } catch (error) {
      console.warn('Firebase Apple Auth error, falling back to demo session:', error);
    }
  }

  // Demo fallback
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
    return onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        localStorage.setItem(STORAGE_KEYS.auth, 'true');
      }
      callback(user);
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
  signIn,
  signUp,
  signInWithGoogle,
  signInWithApple,
  logout,
  subscribeToAuthState,
};
