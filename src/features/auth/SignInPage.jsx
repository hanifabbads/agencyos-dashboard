import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Check, Sun, Moon } from 'lucide-react';

export default function SignInPage({ onNavigateToSignUp, onSignInSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleTheme = () => {
    const nextDark = !isDarkMode;
    setIsDarkMode(nextDark);
    if (nextDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (onSignInSuccess) {
        onSignInSuccess();
      }
    }, 600);
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
            Projects, deadlines, team workload, and revenue — everything your team needs, beautifully organized.
          </p>

          <div className="hero-features">
            <div className="feature-item">
              <span className="check-icon-wrapper">
                <Check size={13} strokeWidth={2.5} />
              </span>
              <span>Live dashboard with KPIs & revenue tracking</span>
            </div>

            <div className="feature-item">
              <span className="check-icon-wrapper">
                <Check size={13} strokeWidth={2.5} />
              </span>
              <span>Project pipeline with at-risk alerts</span>
            </div>

            <div className="feature-item">
              <span className="check-icon-wrapper">
                <Check size={13} strokeWidth={2.5} />
              </span>
              <span>Team workload balancing</span>
            </div>
          </div>
        </div>

        <div className="hero-footer">
          © 2026 AgencyOS
        </div>
      </div>

      {/* Right Panel - Sign In Form */}
      <div className="form-section">
        {/* Theme Switcher */}
        <button 
          type="button" 
          className="theme-toggle-btn"
          onClick={toggleTheme}
          title="Toggle Color Mode Tokens"
        >
          {isDarkMode ? <Sun size={15} /> : <Moon size={15} />}
          <span>{isDarkMode ? 'Light Tokens' : 'Dark Tokens'}</span>
        </button>

        <div className="form-wrapper">
          <div className="form-header">
            <h2 className="form-title">Welcome back.</h2>
            <p className="form-subtitle">Sign in to your AgencyOS workspace.</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
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
                  placeholder="example@gmail.com"
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
                  placeholder="**********"
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
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="form-footer">
            <span>New to AgencyOS?</span>
            <button 
              type="button" 
              className="footer-link inline-btn"
              onClick={onNavigateToSignUp}
            >
              Create an Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
