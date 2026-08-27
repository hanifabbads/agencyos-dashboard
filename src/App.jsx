import React, { useState, useEffect, useCallback } from 'react';
import {
  isAuthenticated,
  getStoredUserProfile,
  subscribeToAuthState,
  logout,
} from './services/auth.service';
import LandingPage from './features/landing/LandingPage';
import SignInPage from './features/auth/SignInPage';
import SignUpPage from './features/auth/SignUpPage';
import DashboardPage from './features/dashboard/DashboardPage';

/**
 * Determine initial view based on authentication and URL hash
 */
function getInitialView() {
  const hash = window.location.hash.toLowerCase().replace('#/', '').replace('#', '');
  const authed = isAuthenticated();

  if (hash === 'sign-in') return 'sign-in';
  if (hash === 'sign-up') return 'sign-up';
  if (hash === 'dashboard' || hash === 'projects' || hash === 'team' || hash === 'deadlines') {
    return authed ? 'dashboard' : 'sign-in';
  }
  if (hash === 'landing') return 'landing';

  return authed ? 'dashboard' : 'landing';
}

export default function App() {
  const [currentUser, setCurrentUser] = useState(() => getStoredUserProfile());
  const [currentView, setCurrentView] = useState(getInitialView);

  // Sync route on hash changes (back/forward buttons)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase().replace('#/', '').replace('#', '');
      if (hash === 'sign-in') setCurrentView('sign-in');
      else if (hash === 'sign-up') setCurrentView('sign-up');
      else if (hash === 'landing' || hash === '') setCurrentView('landing');
      else if (['dashboard', 'projects', 'team', 'deadlines'].includes(hash)) {
        if (isAuthenticated()) {
          setCurrentView('dashboard');
        } else {
          setCurrentView('sign-in');
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Sync auth state listener
  useEffect(() => {
    const unsubscribe = subscribeToAuthState((user) => {
      if (user) {
        setCurrentUser(user);
      }
    });

    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, []);

  // Update hash & scroll to top when view changes
  const navigateTo = useCallback((view) => {
    setCurrentView(view);
    if (view === 'landing') {
      window.location.hash = '#/';
    } else if (view === 'sign-in') {
      window.location.hash = '#/sign-in';
    } else if (view === 'sign-up') {
      window.location.hash = '#/sign-up';
    } else if (view === 'dashboard') {
      window.location.hash = '#/dashboard';
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  const handleSignInSuccess = (user) => {
    setCurrentUser(user || getStoredUserProfile());
    navigateTo('dashboard');
  };

  const handleSignUpSuccess = (user) => {
    setCurrentUser(user || getStoredUserProfile());
    navigateTo('dashboard');
  };

  const handleLogout = async () => {
    await logout();
    setCurrentUser(null);
    navigateTo('landing');
  };

  if (currentView === 'dashboard') {
    return <DashboardPage onLogout={handleLogout} currentUser={currentUser} />;
  }

  if (currentView === 'sign-up') {
    return (
      <SignUpPage
        onNavigateToSignIn={() => navigateTo('sign-in')}
        onSignUpSuccess={handleSignUpSuccess}
      />
    );
  }

  if (currentView === 'sign-in') {
    return (
      <SignInPage
        onNavigateToSignUp={() => navigateTo('sign-up')}
        onSignInSuccess={handleSignInSuccess}
      />
    );
  }

  // Default: landing page
  return (
    <LandingPage onGetStarted={() => navigateTo('sign-in')} />
  );
}
