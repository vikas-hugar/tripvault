import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ShowHidePasswordInput from '../components/ShowHidePasswordInput';
import PasswordStrengthMeter from '../components/PasswordStrengthMeter';
import './AuthForm.css';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Register() {
  const { user, register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [fieldErrors, setFieldErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const validateField = (name, value) => {
    let error = '';
    if (name === 'name') {
      if (!value.trim()) {
        error = 'Full name is required';
      } else if (value.trim().length < 2) {
        error = 'Name must be at least 2 characters';
      }
    } else if (name === 'email') {
      if (!value.trim()) {
        error = 'Email address is required';
      } else if (!EMAIL_REGEX.test(value.trim())) {
        error = 'Please enter a valid email address';
      }
    } else if (name === 'password') {
      if (!value) {
        error = 'Password is required';
      } else if (value.length < 8) {
        error = 'Password must be at least 8 characters';
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
      name: validateField('name', form.name),
      email: validateField('email', form.email),
      password: validateField('password', form.password)
    };
    setFieldErrors(errors);
    return !errors.name && !errors.email && !errors.password;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    if (!validateForm()) return;

    setLoading(true);
    try {
      await register(form.name.trim(), form.email.trim(), form.password);
      navigate('/dashboard');
    } catch (err) {
      if (err.response?.status === 409) {
        setServerError('An account with this email address already exists.');
        setFieldErrors((prev) => ({ ...prev, email: 'Email address is already registered.' }));
      } else {
        setServerError(err.response?.data?.message || 'Unable to create account.');
      }
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
            src="/assets/hero_editorial.png"
            alt="Aman resort architectural photography"
            className="auth-bg-img"
          />
          <div className="auth-image-overlay" />
          <div className="auth-quote-box">
            <blockquote className="auth-quote-text">
              "A journey is best measured in friends, rather than miles."
            </blockquote>
            <span className="auth-quote-author">Tim Cahill</span>
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
            <Link to="/login" className="nav-link" style={{ fontSize: '0.875rem' }}>
              Sign in
            </Link>
          </header>

          <main className="auth-form-container">
            <h1 className="auth-title">Create your vault</h1>
            <p className="auth-subtitle">Begin your private travel journal.</p>

            <form className="auth-form" onSubmit={handleSubmit} noValidate>
              {/* Subtle Inline Server Error (NO COLORED BOXES) */}
              {serverError && (
                <div className="inline-error" role="alert" aria-live="polite">
                  {serverError}
                </div>
              )}

              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="form-input"
                  value={form.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Jane Doe"
                  autoComplete="name"
                  autoFocus
                  aria-invalid={!!fieldErrors.name}
                  aria-describedby={fieldErrors.name ? 'name-error' : undefined}
                />
                {fieldErrors.name && (
                  <div id="name-error" className="inline-error" role="alert" aria-live="polite">
                    {fieldErrors.name}
                  </div>
                )}
              </div>

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
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <ShowHidePasswordInput
                  id="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Minimum 8 characters"
                  autoComplete="new-password"
                  hasError={!!fieldErrors.password}
                  ariaDescribedBy={fieldErrors.password ? 'password-error' : undefined}
                />
                {fieldErrors.password && (
                  <div id="password-error" className="inline-error" role="alert" aria-live="polite">
                    {fieldErrors.password}
                  </div>
                )}
                <PasswordStrengthMeter password={form.password} />
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-full"
                disabled={loading}
              >
                {loading ? 'Creating vault…' : 'Create Account'}
              </button>
            </form>

            <p className="auth-footer">
              Already have an account? <Link to="/login">Sign in</Link>
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
