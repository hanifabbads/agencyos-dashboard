import React, { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff, Check, Sun, Moon, AlertCircle } from 'lucide-react';
import { signUp, signInWithGoogle, signInWithApple, formatAuthErrorMessage } from '../../services/auth.service';
import { brandingConfig } from '../../config/branding.config';

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
    />
  </svg>
);

const AppleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.85c.66-.8 1.1-1.92.98-3.04-.95.04-2.1.64-2.77 1.43-.59.68-1.11 1.79-.97 2.88 1.06.08 2.14-.54 2.76-1.27z" />
  </svg>
);

export default function SignUpPage({ onNavigateToSignIn, onSignUpSuccess }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const toggleTheme = () => {
    const nextDark = !isDarkMode;
    setIsDarkMode(nextDark);
    if (nextDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const user = await signUp(username, email, password);
      if (onSignUpSuccess) {
        onSignUpSuccess(user);
      }
    } catch (err) {
      console.warn('Sign-up error:', err);
      setError(formatAuthErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setError('');
    setIsLoading(true);
    try {
      const user = await signInWithGoogle();
      if (onSignUpSuccess) {
        onSignUpSuccess(user);
      }
    } catch (err) {
      console.warn('Google sign-up error:', err);
      setError(formatAuthErrorMessage(err, 'google'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleAppleSignUp = async () => {
    setError('');
    setIsLoading(true);
    try {
      const user = await signInWithApple();
      if (onSignUpSuccess) {
        onSignUpSuccess(user);
      }
    } catch (err) {
      console.warn('Apple sign-up error:', err);
      setError(formatAuthErrorMessage(err, 'apple'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      {/* Left Panel - Branded Hero */}
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Run your agency<br />
            in one calm place.
          </h1>

          <p className="hero-description">
            {brandingConfig.auth.heroDescription}
          </p>

          <div className="hero-features">
            {brandingConfig.auth.bulletPoints.map((text, idx) => (
              <div className="feature-item" key={idx}>
                <span className="check-icon-wrapper">
                  <Check size={13} strokeWidth={2.5} />
                </span>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-footer">
          {brandingConfig.company.copyright}
        </div>
      </div>

      {/* Right Panel - Register Form */}
      <div className="form-section">
        {/* Theme Switcher */}
        <button 
          type="button" 
          className="theme-toggle-btn"
          onClick={toggleTheme}
          title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          aria-label={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <div className="form-wrapper">
          <div className="mobile-auth-brand">
            <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
              <rect width="36" height="36" rx="8" fill="#0C61CF" />
              <rect x="8" y="14" width="4" height="14" rx="2" fill="white" />
              <rect x="16" y="8" width="4" height="20" rx="2" fill="white" />
              <rect x="24" y="18" width="4" height="10" rx="2" fill="white" />
            </svg>
            <span className="mobile-auth-brand-name">{brandingConfig.brandName}</span>
          </div>

          <div className="form-header">
            <h2 className="form-title">Register Your<br />Account</h2>
            <p className="form-subtitle">Register to your {brandingConfig.brandName} workspace.</p>
          </div>

          {error && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 14px',
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '8px',
              color: '#EF4444',
              fontSize: '13px',
              marginBottom: '16px',
              lineHeight: '1.4'
            }}>
              <AlertCircle size={16} style={{ flexShrink: 0 }} />
              <span>{error}</span>
            </div>
          )}

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label className="input-label" htmlFor="username">
                Username
              </label>
              <div className="input-container">
                <span className="input-icon-left">
                  <User size={18} />
                </span>
                <input
                  id="username"
                  type="text"
                  className="form-input no-right-icon"
                  placeholder="Jane Doe"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="email">
                Email
              </label>
              <div className="input-container">
                <span className="input-icon-left">
                  <Mail size={18} />
                </span>
                <input
                  id="email"
                  type="email"
                  className="form-input no-right-icon"
                  placeholder="admin@agencyos.app"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="password">
                Password
              </label>
              <div className="input-container">
                <span className="input-icon-left">
                  <Lock size={18} />
                </span>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  className="form-input"
                  placeholder="••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="input-icon-right"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button type="submit" className="submit-button" disabled={isLoading}>
              {isLoading ? 'Registering...' : 'Sign Up'}
            </button>
          </form>

          <div className="form-footer">
            <span>Already have an account?</span>
            <button 
              type="button" 
              className="footer-link inline-btn" 
              onClick={onNavigateToSignIn}
            >
              Sign In
            </button>
          </div>

          <div className="social-buttons-container">
            <button
              type="button"
              className="social-auth-btn"
              onClick={handleGoogleSignUp}
              disabled={isLoading}
            >
              <GoogleIcon />
              <span>Continue with Google</span>
            </button>
            <button
              type="button"
              className="social-auth-btn"
              onClick={handleAppleSignUp}
              disabled={isLoading}
            >
              <AppleIcon />
              <span>Continue with Apple</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
