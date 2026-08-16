import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="dashboard">
      <header className="dash-header">
        <span className="brand">TripVault</span>
        <div className="dash-header-right">
          <span className="dash-user">{user?.name}</span>
          <button className="btn-logout" onClick={logout}>Sign out</button>
        </div>
      </header>

      <main className="dash-main">
        <div className="dash-welcome">
          <h1 className="dash-title">Welcome back, {user?.name?.split(' ')[0]}</h1>
          <p className="dash-subtitle">Here's where your trips will live.</p>
        </div>

        <div className="dash-empty">
          <div className="empty-icon">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="8" y="14" width="32" height="24" rx="3" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              <path d="M8 20h32" stroke="currentColor" strokeWidth="1.5"/>
              <circle cx="14" cy="17" r="1" fill="currentColor"/>
              <circle cx="18" cy="17" r="1" fill="currentColor"/>
              <circle cx="22" cy="17" r="1" fill="currentColor"/>
              <rect x="14" y="26" width="12" height="2" rx="1" fill="currentColor" opacity="0.4"/>
              <rect x="14" y="31" width="8" height="2" rx="1" fill="currentColor" opacity="0.25"/>
            </svg>
          </div>
          <h2 className="empty-title">No trips yet</h2>
          <p className="empty-text">
            When you create your first trip, it will appear here.
          </p>
        </div>
      </main>
    </div>
  );
}
