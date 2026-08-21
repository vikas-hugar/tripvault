import { useState } from 'react';
import { Link } from 'react-router-dom';
import './AuthForm.css';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [serverError, setServerError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (e) => {
    const val = e.target.value;
    setEmail(val);
    if (serverError) setServerError('');
    if (emailError) {
      if (!val.trim()) {
        setEmailError('Email address is required');
      } else if (!EMAIL_REGEX.test(val.trim())) {
        setEmailError('Please enter a valid email address');
      } else {
        setEmailError('');
      }
    }
  };

  const validate = () => {
    if (!email.trim()) {
      setEmailError('Email address is required');
      return false;
    }
    if (!EMAIL_REGEX.test(email.trim())) {
      setEmailError('Please enter a valid email address');
      return false;
    }
    setEmailError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    if (!validate()) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="auth-page">
      <div className="auth-split-wrapper">
        {/* Left Editorial Image */}
        <div className="auth-image-panel">
          <img
            src="/assets/auth_travel.png"
            alt="Mediterranean coastal view"
            className="auth-bg-img"
          />
          <div className="auth-image-overlay" />
          <div className="auth-quote-box">
            <p className="auth-quote-text">
              "To travel is to live."
            </p>
            <p className="auth-quote-author">Hans Christian Andersen</p>
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="auth-form-panel">
          <header className="auth-header-nav">
            <Link to="/" className="auth-brand">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-accent)' }}>
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
            <h1 className="auth-title">Reset password</h1>
            <p className="auth-subtitle">
              Enter your email address and we'll send you instructions to reset your password.
            </p>

            {submitted ? (
              <div className="form-success-alert" role="alert" aria-live="polite">
                <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Check your email</p>
                <p>If an account exists for {email}, a password reset link has been sent.</p>
                <div style={{ marginTop: '1.25rem' }}>
                  <Link to="/login" className="btn btn-primary btn-full" style={{ textAlign: 'center', display: 'block' }}>
                    Back to Sign in
                  </Link>
                </div>
              </div>
            ) : (
              <form className="auth-form" onSubmit={handleSubmit} noValidate>
                {serverError && (
                  <div className="form-error-alert" role="alert" aria-live="polite">
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
                    className={`form-input ${emailError ? 'form-input-error' : ''}`}
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="you@example.com"
                    autoComplete="email"
                    autoFocus
                    aria-invalid={!!emailError}
                    aria-describedby={emailError ? 'email-error' : undefined}
                  />
                  {emailError && (
                    <div id="email-error" className="field-error" role="alert" aria-live="polite">
                      {emailError}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-full"
                  disabled={loading}
                >
                  {loading ? 'Sending link…' : 'Send reset link'}
                </button>
              </form>
            )}

            <p className="auth-footer">
              Remember your password? <Link to="/login">Sign in</Link>
            </p>
          </main>

          <footer style={{ paddingTop: '1.5rem', textAlign: 'center' }}>
            <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
              © TripVault. All rights reserved.
            </span>
          </footer>
        </div>
      </div>
    </div>
  );
}
