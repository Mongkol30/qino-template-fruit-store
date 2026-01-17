import { Component, type ErrorInfo, type ReactNode } from 'react';

export interface ErrorBoundaryProps {
  /** Children to render */
  children: ReactNode;
  /** Fallback UI when error occurs */
  fallback?: ReactNode | ((error: Error, reset: () => void) => ReactNode);
  /** Error handler callback */
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  /** Reset on prop changes (e.g., route change) */
  resetKeys?: unknown[];
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.props.onError?.(error, errorInfo);
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps): void {
    if (this.state.hasError && this.props.resetKeys) {
      const hasChanged = this.props.resetKeys.some(
        (key, index) => key !== prevProps.resetKeys?.[index]
      );
      if (hasChanged) {
        this.reset();
      }
    }
  }

  reset = (): void => {
    this.setState({ hasError: false, error: null });
  };

  render(): ReactNode {
    if (this.state.hasError && this.state.error) {
      const { fallback } = this.props;

      if (typeof fallback === 'function') {
        return fallback(this.state.error, this.reset);
      }

      if (fallback) {
        return fallback;
      }

      // Default fallback UI
      return (
        <div className="min-h-[200px] flex items-center justify-center p-6">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-error-100 dark:bg-error-900/30 mb-4">
              <svg
                className="w-8 h-8 text-error-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
              Something went wrong
            </h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4 max-w-md">
              {this.state.error.message || 'An unexpected error occurred'}
            </p>
            <button
              onClick={this.reset}
              className="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors"
            >
              Try again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Functional wrapper for easier use with hooks
export interface ErrorBoundaryWrapperProps extends ErrorBoundaryProps {
  /** Render prop pattern */
  render?: (props: { reset: () => void }) => ReactNode;
}

export function withErrorBoundary<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  errorBoundaryProps?: Omit<ErrorBoundaryProps, 'children'>
) {
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

  const ComponentWithErrorBoundary = (props: P) => (
    <ErrorBoundary {...errorBoundaryProps}>
      <WrappedComponent {...props} />
    </ErrorBoundary>
  );

  ComponentWithErrorBoundary.displayName = `withErrorBoundary(${displayName})`;

  return ComponentWithErrorBoundary;
}
