import { Link } from 'react-router-dom';
import './ErrorPages.css';

export default function NotFound() {
  return (
    <div className="error-page">
      <div className="error-card">
        <svg className="error-illustration" viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Compass & Map SVG Illustration */}
          <rect x="20" y="25" width="160" height="100" rx="12" fill="#F8FAF9" stroke="#E2E8E5" strokeWidth="2" />
          <path d="M40 50L80 75L120 45L160 65" stroke="#CBD5D0" strokeWidth="2" strokeDasharray="4 4" />
          <circle cx="100" cy="75" r="32" fill="#FFFFFF" stroke="#0F766E" strokeWidth="2" />
          <path d="M100 55L106 75L100 95L94 75Z" fill="#0F766E" />
          <path d="M100 55L106 75L100 75Z" fill="#0D655E" />
          <circle cx="100" cy="75" r="4" fill="#FFFFFF" />
          <circle cx="150" cy="45" r="6" fill="#DC2626" />
        </svg>

        <span className="error-code-badge">404 Error</span>
        <h1 className="error-title">Page not found</h1>
        <p className="error-description">
          The page you are looking for doesn't exist or may have been moved to a new destination.
        </p>

        <div className="error-actions">
          <Link to="/" className="btn btn-secondary btn-full" style={{ textAlign: 'center', display: 'block' }}>
            Go to Home
          </Link>
          <Link to="/dashboard" className="btn btn-primary btn-full" style={{ textAlign: 'center', display: 'block' }}>
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
