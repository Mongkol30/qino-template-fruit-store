import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button content */
  children: ReactNode;
  /** Visual style variant */
  variant?: ButtonVariant;
  /** Button size */
  size?: ButtonSize;
  /** Full width button */
  fullWidth?: boolean;
  /** Loading state */
  isLoading?: boolean;
  /** Left icon */
  leftIcon?: ReactNode;
  /** Right icon */
  rightIcon?: ReactNode;
}

// Using static Tailwind classes with custom theme colors
const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-primary-600 text-white hover:bg-primary-700 border-transparent shadow-sm',
  secondary: 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 border-neutral-200 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:border-neutral-700',
  outline: 'bg-transparent text-primary-600 border-primary-500 hover:bg-primary-600 hover:text-white dark:text-primary-400 dark:border-primary-500 dark:hover:bg-primary-600 dark:hover:text-white',
  ghost: 'bg-transparent text-neutral-600 border-transparent hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-white',
  danger: 'bg-error-600 text-white hover:bg-error-700 border-transparent shadow-sm',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-base',
  lg: 'px-6 py-3 text-lg',
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  disabled,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = `
    inline-flex items-center justify-center gap-2
    rounded-lg border font-medium
    transition-colors duration-200
    cursor-pointer
    focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
    focus:ring-offset-bg-light dark:focus:ring-offset-bg-dark
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  return (
    <button
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `.trim()}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <svg
          className="animate-spin h-5 w-5"
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
      ) : (
        leftIcon
      )}
      {children}
      {!isLoading && rightIcon}
    </button>
  );
}
