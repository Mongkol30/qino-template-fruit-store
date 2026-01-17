import type { AnchorHTMLAttributes, ReactNode } from 'react';

export type LinkVariant = 'default' | 'muted' | 'primary' | 'danger';
export type LinkSize = 'sm' | 'md' | 'lg';

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Link content */
  children: ReactNode;
  /** Visual style variant */
  variant?: LinkVariant;
  /** Link size */
  size?: LinkSize;
  /** Show external link icon */
  external?: boolean;
  /** Disable the link */
  disabled?: boolean;
  /** Underline style */
  underline?: 'always' | 'hover' | 'none';
}

const variantStyles: Record<LinkVariant, string> = {
  default: 'text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300',
  muted: 'text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200',
  primary: 'text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300',
  danger: 'text-error-600 hover:text-error-700 dark:text-error-400 dark:hover:text-error-300',
};

const sizeStyles: Record<LinkSize, string> = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};

const underlineStyles: Record<string, string> = {
  always: 'underline',
  hover: 'hover:underline',
  none: 'no-underline',
};

export function Link({
  children,
  variant = 'default',
  size = 'md',
  external = false,
  disabled = false,
  underline = 'hover',
  className = '',
  href,
  ...props
}: LinkProps) {
  const baseStyles = 'inline-flex items-center gap-1 font-medium transition-colors duration-200';

  return (
    <a
      href={disabled ? undefined : href}
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${underlineStyles[underline]}
        ${disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'cursor-pointer'}
        ${className}
      `.trim()}
      {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
      aria-disabled={disabled}
      {...props}
    >
      {children}
      {external && (
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          />
        </svg>
      )}
    </a>
  );
}
