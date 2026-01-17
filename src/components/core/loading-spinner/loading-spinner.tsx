import type { HTMLAttributes } from 'react';

export type LoadingSpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type LoadingSpinnerColor = 'primary' | 'white' | 'current';

export interface LoadingSpinnerProps extends HTMLAttributes<HTMLDivElement> {
  /** Spinner size */
  size?: LoadingSpinnerSize;
  /** Spinner color */
  color?: LoadingSpinnerColor;
  /** Loading text */
  label?: string;
  /** Center in container */
  centered?: boolean;
}

const sizeStyles: Record<LoadingSpinnerSize, string> = {
  xs: 'h-4 w-4',
  sm: 'h-5 w-5',
  md: 'h-8 w-8',
  lg: 'h-12 w-12',
  xl: 'h-16 w-16',
};

const colorStyles: Record<LoadingSpinnerColor, string> = {
  primary: 'text-primary-600',
  white: 'text-white',
  current: 'text-current',
};

export function LoadingSpinner({
  size = 'md',
  color = 'primary',
  label,
  centered = false,
  className = '',
  ...props
}: LoadingSpinnerProps) {
  return (
    <div
      role="status"
      className={`
        ${centered ? 'flex items-center justify-center' : 'inline-flex items-center'}
        gap-2
        ${className}
      `.trim()}
      {...props}
    >
      <svg
        className={`animate-spin ${sizeStyles[size]} ${colorStyles[color]}`}
        xmlns="http://www.w3.org/2000/svg"
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
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      {label && <span className="text-sm text-neutral-600 dark:text-neutral-400">{label}</span>}
      <span className="sr-only">{label || 'Loading...'}</span>
    </div>
  );
}
