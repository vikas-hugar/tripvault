import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AuthCheckSkeleton } from './SkeletonLoader';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <AuthCheckSkeleton />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
