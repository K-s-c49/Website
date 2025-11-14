import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { ROUTES, USER_ROLES } from '@/constants';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

export function ProtectedRoute({ requiredRole }) {
  const { isAuthenticated, user, status } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.login} state={{ from: location }} replace />;
  }

  if (status === 'loading' && !user) {
    return <LoadingSpinner label="Checking access..." />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to={ROUTES.home} replace />;
  }

  return <Outlet />;
}

export function AdminRoute() {
  return <ProtectedRoute requiredRole={USER_ROLES.admin} />;
}

