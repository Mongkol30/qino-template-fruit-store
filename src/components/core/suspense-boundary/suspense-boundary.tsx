import type { ReactNode } from 'react';
import { Suspense } from 'react';

export interface SuspenseBoundaryProps {
  /** Children to render */
  children: ReactNode;
  /** Fallback to show while loading */
  fallback?: ReactNode;
  /** Custom loading component */
  loadingComponent?: ReactNode;
}

/**
 * Default loading spinner component
 */
function DefaultLoading() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="flex flex-col items-center gap-3">
        <svg
          className="w-8 h-8 text-primary-500 animate-spin"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
        <span className="text-sm text-neutral-500 dark:text-neutral-400">Loading...</span>
      </div>
    </div>
  );
}

/**
 * Suspense boundary wrapper with default loading state
 */
export function SuspenseBoundary({
  children,
  fallback,
  loadingComponent,
}: SuspenseBoundaryProps) {
  const loadingFallback = fallback ?? loadingComponent ?? <DefaultLoading />;

  return <Suspense fallback={loadingFallback}>{children}</Suspense>;
}

/**
 * Skeleton-based loading fallback
 */
export function SuspenseSkeleton({
  lines = 3,
  className = '',
}: {
  lines?: number;
  className?: string;
}) {
  return (
    <div className={`animate-pulse space-y-3 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded"
          style={{ width: `${Math.max(40, 100 - i * 20)}%` }}
        />
      ))}
    </div>
  );
}

/**
 * Card-based loading fallback
 */
export function SuspenseCard({ className = '' }: { className?: string }) {
  return (
    <div
      className={`animate-pulse p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg ${className}`}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-neutral-200 dark:bg-neutral-700 rounded-full" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-1/2" />
          <div className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded w-1/3" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded" />
        <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-5/6" />
        <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-4/6" />
      </div>
    </div>
  );
}

/**
 * Table-based loading fallback
 */
export function SuspenseTable({
  rows = 5,
  columns = 4,
  className = '',
}: {
  rows?: number;
  columns?: number;
  className?: string;
}) {
  return (
    <div className={`animate-pulse ${className}`}>
      {/* Header */}
      <div className="flex gap-4 pb-3 border-b border-neutral-200 dark:border-neutral-700">
        {Array.from({ length: columns }).map((_, i) => (
          <div key={i} className="flex-1 h-4 bg-neutral-200 dark:bg-neutral-700 rounded" />
        ))}
      </div>
      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div
          key={rowIndex}
          className="flex gap-4 py-3 border-b border-neutral-100 dark:border-neutral-800"
        >
          {Array.from({ length: columns }).map((_, colIndex) => (
            <div key={colIndex} className="flex-1 h-4 bg-neutral-200 dark:bg-neutral-700 rounded" />
          ))}
        </div>
      ))}
    </div>
  );
}
