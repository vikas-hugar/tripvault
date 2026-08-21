import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ShowHidePasswordInput from '../components/ShowHidePasswordInput';
import './AuthForm.css';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Login() {
  const { user, login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [rememberMe, setRememberMe] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const validateField = (name, value) => {
    let error = '';
    if (name === 'email') {
      if (!value.trim()) {
        error = 'Email address is required';
      } else if (!EMAIL_REGEX.test(value.trim())) {
        error = 'Please enter a valid email address';
      }
    } else if (name === 'password') {
      if (!value) {
        error = 'Password is required';
      }
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (serverError) setServerError('');

    const error = validateField(name, value);
    setFieldErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setFieldErrors((prev) => ({ ...prev, [name]: error }));
  };

  const validateForm = () => {
    const errors = {
      email: validateField('email', form.email),
      password: validateField('password', form.password)
    };
    setFieldErrors(errors);
    return !errors.email && !errors.password;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    if (!validateForm()) return;

    setLoading(true);
    try {
      await login(form.email.trim(), form.password, rememberMe);
    } catch (err) {
      setServerError(err.response?.data?.message || 'Invalid email address or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-split-wrapper">
        {/* Left Editorial Photography */}
        <div className="auth-image-panel">
          <img
            src="/assets/editorial_section2.png"
            alt="Luxury architectural suite view"
            className="auth-bg-img"
          />
          <div className="auth-image-overlay" />
          <div className="auth-quote-box">
            <blockquote className="auth-quote-text">
              "To travel is to discover that everyone is wrong about other countries."
            </blockquote>
            <span className="auth-quote-author">Aldous Huxley</span>
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="auth-form-panel">
          <header className="auth-header-nav">
            <Link to="/" className="auth-brand">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-accent)' }}>
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <span>TripVault</span>
            </Link>
            <Link to="/register" className="nav-link" style={{ fontSize: '0.875rem' }}>
              Create Account
            </Link>
          </header>

          <main className="auth-form-container">
            <h1 className="auth-title">Welcome back</h1>
            <p className="auth-subtitle">Sign in to access your travel journal.</p>

            <form className="auth-form" onSubmit={handleSubmit} noValidate>
              {/* Subtle Inline Validation (NO COLORED BOXES) */}
              {serverError && (
                <div className="inline-error" role="alert" aria-live="polite">
                  {serverError}
                </div>
              )}

              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="form-input"
                  value={form.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="you@example.com"
                  autoComplete="email"
                  autoFocus
                  aria-invalid={!!fieldErrors.email}
                  aria-describedby={fieldErrors.email ? 'email-error' : undefined}
                />
                {fieldErrors.email && (
                  <div id="email-error" className="inline-error" role="alert" aria-live="polite">
                    {fieldErrors.email}
                  </div>
                )}
              </div>

              <div className="form-group">
                <div className="form-label-row">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <Link to="/forgot-password" className="forgot-link">
                    Forgot?
                  </Link>
                </div>
                <ShowHidePasswordInput
                  id="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  hasError={!!fieldErrors.password}
                  ariaDescribedBy={fieldErrors.password ? 'password-error' : undefined}
                />
                {fieldErrors.password && (
                  <div id="password-error" className="inline-error" role="alert" aria-live="polite">
                    {fieldErrors.password}
                  </div>
                )}
              </div>

              <label className="remember-row">
                <input
                  type="checkbox"
                  className="remember-checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Remember me on this device</span>
              </label>

              <button
                type="submit"
                className="btn btn-primary btn-full"
                disabled={loading}
              >
                {loading ? 'Signing in…' : 'Sign In'}
              </button>
            </form>

            <p className="auth-footer">
              Don't have an account? <Link to="/register">Create one</Link>
            </p>
          </main>

          <footer style={{ textAlign: 'center' }}>
            <span style={{ fontSize: '0.8125rem', color: 'var(--color-secondary)' }}>
              © TripVault. All rights reserved.
            </span>
          </footer>
        </div>
      </div>
    </div>
  );
}
