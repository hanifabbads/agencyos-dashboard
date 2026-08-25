import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCbjizDkQeLMk1oS3lvg0wId_XCl98r10k",
  authDomain: "agencyos-23a1d.firebaseapp.com",
  projectId: "agencyos-23a1d",
  storageBucket: "agencyos-23a1d.firebasestorage.app",
  messagingSenderId: "122602227513",
  appId: "1:122602227513:web:8ad13f744577a978b6cae8",
  measurementId: "G-PXW3Z1CEWY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Analytics
export let analytics = null;
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  }).catch(() => {});
}

export default app;
