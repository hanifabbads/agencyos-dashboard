/**
 * AgencyOS — Application Configuration
 *
 * Central configuration for general application behavior, defaults,
 * currency formats, pagination, and feature toggles.
 */

export const appConfig = {
  // Application identity
  name: 'AgencyOS',
  version: '1.0.0',

  // Authentication provider mode: 'demo' | 'firebase' | 'supabase'
  // When 'demo', the app runs with local state and localStorage persistence without any external dependencies.
  authProvider: import.meta.env.VITE_AUTH_PROVIDER || 'demo',

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
