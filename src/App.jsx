import React, { useState } from 'react';
import SignInPage from './features/auth/SignInPage';
import SignUpPage from './features/auth/SignUpPage';
import DashboardPage from './features/dashboard/DashboardPage';

const AUTH_KEY = 'agencyos_auth';

export default function App() {
  const [currentView, setCurrentView] = useState(() => {
    try {
      const stored = localStorage.getItem(AUTH_KEY);
      if (stored === 'true') {
        return 'dashboard';
      }
    } catch (e) {
      console.error('Failed to read auth from storage:', e);
    }
    return 'sign-in';
  });

  const handleSignInSuccess = () => {
    try {
      localStorage.setItem(AUTH_KEY, 'true');
    } catch (e) {
      console.error('Failed to write auth to storage:', e);
    }
    setCurrentView('dashboard');
  };

  const handleSignUpSuccess = () => {
    try {
      localStorage.setItem(AUTH_KEY, 'true');
    } catch (e) {
      console.error('Failed to write auth to storage:', e);
    }
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem(AUTH_KEY);
    } catch (e) {
      console.error('Failed to clear auth from storage:', e);
    }
    setCurrentView('sign-in');
  };

  if (currentView === 'dashboard') {
    return <DashboardPage onLogout={handleLogout} />;
  }

  if (currentView === 'sign-up') {
    return (
      <SignUpPage 
        onNavigateToSignIn={() => setCurrentView('sign-in')}
        onSignUpSuccess={handleSignUpSuccess}
      />
    );
  }

  return (
    <SignInPage 
      onNavigateToSignUp={() => setCurrentView('sign-up')}
      onSignInSuccess={handleSignInSuccess}
    />
  );
}
