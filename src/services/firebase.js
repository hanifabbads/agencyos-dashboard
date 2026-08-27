/**
 * AgencyOS — Firebase Service Initialization
 *
 * Configured using Vite environment variables (VITE_FIREBASE_*).
 * Safely handles missing credentials without throwing unhandled exceptions.
 */

import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

// Read environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || ""
};

export const isFirebaseConfigured = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId);

let app = null;
let auth = null;

if (isFirebaseConfigured) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    auth = getAuth(app);
  } catch (error) {
    console.warn("Firebase initialization warning (falling back to demo mode):", error);
  }
}

export { app, auth };
export default app;
