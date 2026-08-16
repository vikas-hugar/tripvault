import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Landing.css';

export default function Landing() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="page-loader">
        <div className="loader-spinner" />
      </div>
    );
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="landing">
      <nav className="landing-nav">
        <span className="brand">TripVault</span>
        <Link to="/login" className="nav-link">Sign in</Link>
      </nav>

      <main className="landing-hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Your journeys,<br />organized beautifully.
          </h1>
          <p className="hero-subtitle">
            Plan trips, track expenses, and keep every detail
            in one place — from first idea to last photo.
          </p>
          <Link to="/register" className="btn btn-primary btn-lg">
            Create your account
          </Link>
        </div>
      </main>

      <footer className="landing-footer">
        <span className="footer-text">TripVault — Built for travelers who plan ahead.</span>
      </footer>
    </div>
  );
}
