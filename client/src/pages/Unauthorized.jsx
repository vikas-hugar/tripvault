import { Link } from 'react-router-dom';
import './ErrorPages.css';

export default function Unauthorized() {
  return (
    <div className="error-page">
      <div className="error-card">
        <svg className="error-illustration" viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Shield & Lock SVG Illustration */}
          <rect x="25" y="20" width="150" height="110" rx="16" fill="#F8FAF9" stroke="#E2E8E5" strokeWidth="2" />
          <path d="M100 35C100 35 125 40 135 48V78C135 100 100 115 100 115C100 115 65 100 65 78V48C75 40 100 35 100 35Z" fill="#FFFFFF" stroke="#0F766E" strokeWidth="2" />
          <rect x="88" y="70" width="24" height="18" rx="3" fill="#0F766E" />
          <path d="M93 70V64A7 7 0 0 1 107 64V70" stroke="#0F766E" strokeWidth="2" fill="none" />
          <circle cx="100" cy="78" r="2" fill="#FFFFFF" />
        </svg>

        <span className="error-code-badge">401 Unauthorized</span>
        <h1 className="error-title">Access denied</h1>
        <p className="error-description">
          You don't have permission to access this page. Please sign in with an authorized account to continue.
        </p>

        <div className="error-actions">
          <Link to="/login" className="btn btn-primary btn-full" style={{ textAlign: 'center', display: 'block' }}>
            Sign in to TripVault
          </Link>
        </div>
      </div>
    </div>
  );
}
