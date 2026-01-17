import type { ReactNode } from 'react';
import { Suspense } from 'react';
import { ErrorBoundary } from '../error-boundary';

export interface RouteWrapperProps {
  /** Page component/element */
  children: ReactNode;
  /** Loading fallback */
  loadingFallback?: ReactNode;
  /** Error fallback */
  errorFallback?: ReactNode | ((error: Error, reset: () => void) => ReactNode);
  /** Page title (for document.title) */
  title?: string;
  /** Whether to scroll to top on mount */
  scrollToTop?: boolean;
}

/**
 * Default loading component for routes
 */
function DefaultRouteLoading() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin" />
        <span className="text-sm text-neutral-500 dark:text-neutral-400">Loading...</span>
      </div>
    </div>
  );
}

/**
 * Default error component for routes
 */
function DefaultRouteError({ error, resetError }: { error: Error; resetError: () => void }) {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="text-center p-8 max-w-md">
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
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
          Something went wrong
        </h2>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">{error.message}</p>
        <button
          onClick={resetError}
          className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

/**
 * Wrapper component for routes with loading, error handling, and utilities
 */
export function RouteWrapper({
  children,
  loadingFallback,
  errorFallback,
  title,
  scrollToTop = true,
}: RouteWrapperProps) {
  // Set document title
  if (title && typeof document !== 'undefined') {
    document.title = title;
  }

  // Scroll to top on mount
  if (scrollToTop && typeof window !== 'undefined') {
    window.scrollTo(0, 0);
  }

  const fallbackComponent = errorFallback ?? ((error: Error, reset: () => void) => (
    <DefaultRouteError error={error} resetError={reset} />
  ));

  return (
    <ErrorBoundary fallback={fallbackComponent}>
      <Suspense fallback={loadingFallback ?? <DefaultRouteLoading />}>{children}</Suspense>
    </ErrorBoundary>
  );
}
