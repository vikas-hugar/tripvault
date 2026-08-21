import { useAuth } from '../context/AuthContext';
import { DashboardSkeleton } from '../components/SkeletonLoader';
import Navbar from '../components/Navbar';
import './Dashboard.css';

export default function Dashboard() {
  const { user, loading } = useAuth();

  if (loading) {
    return <DashboardSkeleton />;
  }

  const getInitials = (name) => {
    if (!name) return 'TV';
    const parts = name.trim().split(' ').filter(Boolean);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const getFormattedDate = () => {
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    return new Date().toLocaleDateString('en-US', options);
  };

  const firstName = user?.name ? user.name.split(' ')[0] : 'Traveler';

  return (
    <div className="dashboard">
      <Navbar />

      <main className="dash-main">
        {/* Editorial Header */}
        <div className="dash-header-section">
          <div>
            <div className="dash-date">{getFormattedDate()}</div>
            <h1 className="dash-title">Welcome back, {firstName}</h1>
          </div>
          <div className="dash-user-badge">
            <div className="user-avatar-circle">{getInitials(user?.name)}</div>
            <span className="user-badge-name">{user?.name}</span>
          </div>
        </div>

        {/* Featured Journey Card */}
        <div className="featured-journey-card">
          <div className="featured-img-wrapper">
            <img
              src="/assets/hero_editorial.png"
              alt="Mediterranean coastal sanctuary view"
              className="featured-journey-img"
            />
          </div>
          <div className="featured-content">
            <div>
              <span className="featured-badge">Featured Journey</span>
              <h2 className="featured-title">The Mediterranean Sanctuary</h2>
              <p className="featured-location">Amalfi Coast, Italy • Autumn 2026</p>
              <p className="featured-desc">
                A 7-day retreat along quiet coastal cliffs, secluded olive groves, and ancient stone villages.
              </p>
            </div>
            <div>
              <button type="button" className="btn btn-primary">
                View Itinerary
              </button>
            </div>
          </div>
        </div>

        {/* Recent Journeys Grid (Line Art Empty State) */}
        <section>
          <h3 className="dash-section-title">Recent Journeys</h3>
          <div className="recent-empty-card">
            {/* Elegant Line Art SVG Compass */}
            <svg className="line-art-icon" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2">
              <circle cx="50" cy="50" r="42" strokeDasharray="2 3" />
              <circle cx="50" cy="50" r="34" />
              <path d="M50 16v8M50 76v8M16 50h8M76 50h8" />
              <polygon points="50 26 56 50 50 74 44 50" fill="currentColor" opacity="0.15" />
              <polygon points="50 26 56 50 50 50" fill="currentColor" opacity="0.4" />
              <circle cx="50" cy="50" r="3" fill="currentColor" />
            </svg>
            <h4 className="empty-title">No recent journeys saved</h4>
            <p className="empty-subtitle">Start crafting your next private itinerary.</p>
          </div>
        </section>
      </main>
    </div>
  );
}
