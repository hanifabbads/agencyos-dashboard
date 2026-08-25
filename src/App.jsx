import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase';
import LandingPage from './features/landing/LandingPage';
import SignInPage from './features/auth/SignInPage';
import SignUpPage from './features/auth/SignUpPage';
import DashboardPage from './features/dashboard/DashboardPage';

const AUTH_KEY = 'agencyos_auth';

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentView, setCurrentView] = useState(() => {
    try {
      const stored = localStorage.getItem(AUTH_KEY);
      if (stored === 'true') {
        return 'dashboard';
      }
    } catch (e) {
      console.error('Failed to read auth from storage:', e);
    }
    return 'landing';
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        try {
          localStorage.setItem(AUTH_KEY, 'true');
        } catch (e) {
          console.error('Failed to write auth to storage:', e);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [currentView]);

  const handleSignInSuccess = (user) => {
    setCurrentUser(user || auth.currentUser);
    try {
      localStorage.setItem(AUTH_KEY, 'true');
    } catch (e) {
      console.error('Failed to write auth to storage:', e);
    }
    setCurrentView('dashboard');
  };

  const handleSignUpSuccess = (user) => {
    setCurrentUser(user || auth.currentUser);
    try {
      localStorage.setItem(AUTH_KEY, 'true');
    } catch (e) {
      console.error('Failed to write auth to storage:', e);
    }
    setCurrentView('dashboard');
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.error('Firebase sign-out error:', e);
    }
    try {
      localStorage.removeItem(AUTH_KEY);
      localStorage.removeItem('agencyos_user_profile');
    } catch (e) {
      console.error('Failed to clear auth from storage:', e);
    }
    setCurrentUser(null);
    setCurrentView('landing');
  };

  if (currentView === 'dashboard') {
    return <DashboardPage onLogout={handleLogout} currentUser={currentUser} />;
  }

  if (currentView === 'sign-up') {
    return (
      <SignUpPage
        onNavigateToSignIn={() => setCurrentView('sign-in')}
        onSignUpSuccess={handleSignUpSuccess}
      />
    );
  }

  if (currentView === 'sign-in') {
    return (
      <SignInPage
        onNavigateToSignUp={() => setCurrentView('sign-up')}
        onSignInSuccess={handleSignInSuccess}
      />
    );
  }

  // Default: landing page
  return (
    <LandingPage onGetStarted={() => setCurrentView('sign-in')} />
  );
}
