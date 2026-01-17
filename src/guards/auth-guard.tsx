import type { FC } from 'react';

import { useAppSelector } from '@stores/index';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

/**
 * AuthGuard - Protects routes that require authentication
 * Redirects to login page if user is not authenticated
 */
const AuthGuard: FC = () => {
  const location = useLocation();
  const { isAuthenticated, isLoading } = useAppSelector((state) => state.auth);

  // Show nothing while checking auth state
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-cyan-400 border-t-transparent" />
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login with return URL
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default AuthGuard;
