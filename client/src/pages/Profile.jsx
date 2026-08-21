import { useAuth } from '../context/AuthContext';
import { DashboardSkeleton } from '../components/SkeletonLoader';
import Navbar from '../components/Navbar';
import './Profile.css';

export default function Profile() {
  const { user, loading, logout } = useAuth();

  if (loading) {
    return <DashboardSkeleton />;
  }

  const getInitials = (name) => {
    if (!name) return 'TV';
    const parts = name.trim().split(' ').filter(Boolean);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const getMemberSince = (createdAt) => {
    if (!createdAt) return 'Recent Member';
    const date = new Date(createdAt);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  return (
    <div className="profile-page">
      <Navbar />

      <main className="profile-main">
        <div className="profile-card">
          <div className="profile-avatar-large">{getInitials(user?.name)}</div>
          <h1 className="profile-name">{user?.name}</h1>
          <p className="profile-email">{user?.email}</p>

          <div className="profile-details-grid">
            <div className="profile-detail-row">
              <span className="detail-label">Account Name</span>
              <span className="detail-value">{user?.name}</span>
            </div>
            <div className="profile-detail-row">
              <span className="detail-label">Email Address</span>
              <span className="detail-value">{user?.email}</span>
            </div>
            <div className="profile-detail-row">
              <span className="detail-label">Member Since</span>
              <span className="detail-value">{getMemberSince(user?.createdAt)}</span>
            </div>
          </div>

          <div className="profile-actions">
            <button type="button" className="btn btn-secondary" onClick={logout}>
              Sign out of account
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
