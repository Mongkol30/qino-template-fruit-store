import type { HTMLAttributes, ReactNode } from 'react';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  /** Alert content */
  children: ReactNode;
  /** Alert title */
  title?: string;
  /** Visual variant */
  variant?: AlertVariant;
  /** Show close button */
  dismissible?: boolean;
  /** Close callback */
  onClose?: () => void;
  /** Custom icon */
  icon?: ReactNode;
  /** Show default icon */
  showIcon?: boolean;
}

const variantStyles: Record<AlertVariant, { container: string; icon: string }> = {
  info: {
    container: 'bg-info-50 dark:bg-info-900/20 border-info-200 dark:border-info-800 text-info-800 dark:text-info-200',
    icon: 'text-info-500',
  },
  success: {
    container: 'bg-success-50 dark:bg-success-900/20 border-success-200 dark:border-success-800 text-success-800 dark:text-success-200',
    icon: 'text-success-500',
  },
  warning: {
    container: 'bg-warning-50 dark:bg-warning-900/20 border-warning-200 dark:border-warning-800 text-warning-800 dark:text-warning-200',
    icon: 'text-warning-500',
  },
  error: {
    container: 'bg-error-50 dark:bg-error-900/20 border-error-200 dark:border-error-800 text-error-800 dark:text-error-200',
    icon: 'text-error-500',
  },
};

const defaultIcons: Record<AlertVariant, ReactNode> = {
  info: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  success: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  warning: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  ),
  error: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

export function Alert({
  children,
  title,
  variant = 'info',
  dismissible = false,
  onClose,
  icon,
  showIcon = true,
  className = '',
  ...props
}: AlertProps) {
  const { container, icon: iconColor } = variantStyles[variant];

  return (
    <div
      role="alert"
      className={`
        flex gap-3 rounded-lg border p-4
        ${container}
        ${className}
      `.trim()}
      {...props}
    >
      {showIcon && (
        <div className={`shrink-0 ${iconColor}`}>
          {icon ?? defaultIcons[variant]}
        </div>
      )}

      <div className="flex-1">
        {title && <h3 className="font-semibold mb-1">{title}</h3>}
        <div className="text-sm">{children}</div>
      </div>

      {dismissible && onClose && (
        <button
          type="button"
          onClick={onClose}
          className="shrink-0 p-1 rounded-md hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
          aria-label="Dismiss"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}
