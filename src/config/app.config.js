/**
 * AgencyOS — Application Configuration
 *
 * Central configuration for general application behavior, defaults,
 * currency formats, pagination, and feature toggles.
 */

/**
 * Resolves the active authentication provider mode: 'firebase' | 'demo' | 'supabase'
 * 1. Honors explicit VITE_AUTH_PROVIDER if defined ('firebase', 'demo', or 'supabase').
 * 2. If undefined, automatically activates 'firebase' when Firebase credentials exist in the environment (e.g. on Vercel).
 * 3. Falls back to 'demo' for zero-config local development.
 */
function resolveAuthProvider() {
  const env = (typeof import.meta !== 'undefined' && import.meta.env)
    ? import.meta.env
    : (typeof process !== 'undefined' && process.env)
      ? process.env
      : {};

  if (env.VITE_AUTH_PROVIDER) {
    return env.VITE_AUTH_PROVIDER;
  }
  if (env.VITE_FIREBASE_API_KEY && env.VITE_FIREBASE_PROJECT_ID) {
    return 'firebase';
  }
  return 'demo';
}

export const appConfig = {
  // Application identity
  name: 'AgencyOS',
  version: '1.0.0',

  // Authentication provider mode: 'demo' | 'firebase' | 'supabase'
  authProvider: resolveAuthProvider(),

  // Default theme: 'light' | 'dark'
  defaultTheme: 'light',

  // Storage keys for localStorage
  storageKeys: {
    auth: 'agencyos_auth',
    userProfile: 'agencyos_user_profile',
    projects: 'agencyos_projects_data',
    theme: 'agencyos_theme',
  },

  // Localization and currency settings
  locale: {
    currencyCode: 'IDR',
    currencySymbol: 'Rp',
    thousandsSeparator: '.',
    decimalSeparator: ',',
    defaultCurrencySuffix: 'jt', // 'jt' for million (juta), 'M' for billion (miliar)
  },

  // Pagination defaults
  pagination: {
    projectsPerPage: 30,
    deadlinesPreviewLimit: 20,
    recentActivityLimit: 8,
  },

  // Feature Toggles (buyers can disable sections if needed)
  features: {
    landingPage: true,
    authPages: true,
    dashboard: true,
    projects: true,
    team: true,
    deadlines: true,
    financeMetrics: true,
    notifications: true,
    globalSearch: true,
    darkModeToggle: true,
    projectCreation: true,
    userSettings: true,
  },
};

export default appConfig;
