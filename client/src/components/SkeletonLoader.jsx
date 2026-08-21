import Navbar from './Navbar';

export function AuthCheckSkeleton() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--color-bg)' }} role="status" aria-label="Loading application state">
      <div style={{ width: '100%', maxWidth: '380px', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', alignItems: 'center' }}>
        <div className="skeleton" style={{ width: '140px', height: '28px', borderRadius: '6px' }} />
        <div className="skeleton" style={{ width: '100%', height: '220px', borderRadius: '18px' }} />
      </div>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="dashboard">
      <Navbar />

      <main className="dash-main">
        <div style={{ marginBottom: '2.5rem' }}>
          <div className="skeleton" style={{ width: '260px', height: '36px', marginBottom: '0.5rem' }} />
          <div className="skeleton" style={{ width: '180px', height: '20px' }} />
        </div>

        <div className="dash-hero-card">
          <div className="skeleton" style={{ width: '64px', height: '64px', borderRadius: '50%', marginBottom: '1.5rem' }} />
          <div className="skeleton" style={{ width: '240px', height: '28px', marginBottom: '0.75rem' }} />
          <div className="skeleton" style={{ width: '320px', height: '18px' }} />
        </div>
      </main>
    </div>
  );
}

export function ProfileSkeleton() {
  return (
    <div className="profile-page">
      <Navbar />

      <main className="profile-main">
        <div className="profile-card">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2rem' }}>
            <div className="skeleton" style={{ width: '88px', height: '88px', borderRadius: '50%', marginBottom: '1rem' }} />
            <div className="skeleton" style={{ width: '180px', height: '28px', marginBottom: '0.5rem' }} />
            <div className="skeleton" style={{ width: '220px', height: '18px' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', width: '100%' }}>
            <div className="skeleton" style={{ width: '100%', height: '60px', borderRadius: '14px' }} />
            <div className="skeleton" style={{ width: '100%', height: '60px', borderRadius: '14px' }} />
            <div className="skeleton" style={{ width: '100%', height: '44px', borderRadius: '9999px', marginTop: '1rem' }} />
          </div>
        </div>
      </main>
    </div>
  );
}
