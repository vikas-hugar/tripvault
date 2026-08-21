import { useAuth } from '../context/AuthContext';

export default function Toast() {
  const { toast, clearToast } = useAuth();

  if (!toast) return null;

  return (
    <div className="toast-container" role="alert" aria-live="polite">
      <div className={`toast toast-${toast.type || 'error'}`}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-error)' }}>
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <span className="toast-message">{toast.message}</span>
        <button type="button" className="toast-close" onClick={clearToast} aria-label="Close notification">
          &times;
        </button>
      </div>
    </div>
  );
}
