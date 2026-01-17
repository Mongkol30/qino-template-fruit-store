import type { HTMLAttributes, ReactNode } from 'react';

export type HelperTextVariant = 'default' | 'success' | 'warning' | 'error';

export interface HelperTextProps extends HTMLAttributes<HTMLParagraphElement> {
  /** Helper text content */
  children: ReactNode;
  /** Visual variant */
  variant?: HelperTextVariant;
  /** Show icon */
  showIcon?: boolean;
}

const variantStyles: Record<HelperTextVariant, string> = {
  default: 'text-neutral-500 dark:text-neutral-400',
  success: 'text-success-600 dark:text-success-400',
  warning: 'text-warning-600 dark:text-warning-400',
  error: 'text-error-600 dark:text-error-400',
};

const icons: Record<HelperTextVariant, ReactNode> = {
  default: null,
  success: (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  ),
  warning: (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  ),
  error: (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
};

export function HelperText({
  children,
  variant = 'default',
  showIcon = false,
  className = '',
  ...props
}: HelperTextProps) {
  return (
    <p
      className={`
        flex items-center gap-1.5 text-sm
        ${variantStyles[variant]}
        ${className}
      `.trim()}
      {...props}
    >
      {showIcon && icons[variant]}
      {children}
    </p>
  );
}
