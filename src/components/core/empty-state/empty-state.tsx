import type { ReactNode } from 'react';

export interface EmptyStateProps {
  /** Icon to display */
  icon?: ReactNode;
  /** Title text */
  title: string;
  /** Description text */
  description?: string;
  /** Action button or element */
  action?: ReactNode;
  /** Additional class name */
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className = '',
}: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center py-12 px-4 text-center ${className}`}>
      {icon && (
        <div className="mb-4 text-neutral-400 dark:text-neutral-500">
          {icon}
        </div>
      )}

      <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
        {title}
      </h3>

      {description && (
        <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-sm mb-6">
          {description}
        </p>
      )}

      {action && <div>{action}</div>}
    </div>
  );
}

// Default empty state icon
export function EmptyStateIcon({ className = 'w-16 h-16' }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
      />
    </svg>
  );
}
