import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export interface PrivateRouteProps {
  /** Content to render when authenticated */
  children: ReactNode;
  /** Whether user is authenticated */
  isAuthenticated: boolean;
  /** Redirect path when not authenticated */
  redirectTo?: string;
  /** Loading state */
  isLoading?: boolean;
  /** Loading component */
  loadingComponent?: ReactNode;
  /** Roles required to access */
  requiredRoles?: string[];
  /** User's current roles */
  userRoles?: string[];
  /** Forbidden component (when roles don't match) */
  forbiddenComponent?: ReactNode;
}

/**
 * Default loading component
 */
function DefaultLoading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin" />
    </div>
  );
}

/**
 * Default forbidden component
 */
function DefaultForbidden() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center p-8">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-error-100 dark:bg-error-900/30 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-error-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
            />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
          Access Denied
        </h2>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          You don&apos;t have permission to access this page.
        </p>
      </div>
    </div>
  );
}

/**
 * Private route component for authenticated routes
 */
export function PrivateRoute({
  children,
  isAuthenticated,
  redirectTo = '/login',
  isLoading = false,
  loadingComponent,
  requiredRoles,
  userRoles = [],
  forbiddenComponent,
}: PrivateRouteProps) {
  const location = useLocation();

  // Show loading state
  if (isLoading) {
    return <>{loadingComponent ?? <DefaultLoading />}</>;
  }

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // Check roles if specified
  if (requiredRoles && requiredRoles.length > 0) {
    const hasRequiredRole = requiredRoles.some((role) => userRoles.includes(role));
    if (!hasRequiredRole) {
      return <>{forbiddenComponent ?? <DefaultForbidden />}</>;
    }
  }

  return <>{children}</>;
}

// ============ Public Route (opposite of PrivateRoute) ============
export interface PublicRouteProps {
  /** Content to render when not authenticated */
  children: ReactNode;
  /** Whether user is authenticated */
  isAuthenticated: boolean;
  /** Redirect path when authenticated */
  redirectTo?: string;
  /** Loading state */
  isLoading?: boolean;
  /** Loading component */
  loadingComponent?: ReactNode;
}

/**
 * Public route component - redirects authenticated users away
 */
export function PublicRoute({
  children,
  isAuthenticated,
  redirectTo = '/',
  isLoading = false,
  loadingComponent,
}: PublicRouteProps) {
  const location = useLocation();

  // Show loading state
  if (isLoading) {
    return <>{loadingComponent ?? <DefaultLoading />}</>;
  }

  // Redirect if authenticated
  if (isAuthenticated) {
    // Try to redirect to the page they came from, or fallback
    const from = (location.state as { from?: Location })?.from?.pathname || redirectTo;
    return <Navigate to={from} replace />;
  }

  return <>{children}</>;
}
