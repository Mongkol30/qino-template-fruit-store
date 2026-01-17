import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type IconButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type IconButtonSize = 'xs' | 'sm' | 'md' | 'lg';

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Icon element to display */
  icon: ReactNode;
  /** Visual style variant */
  variant?: IconButtonVariant;
  /** Button size */
  size?: IconButtonSize;
  /** Loading state */
  isLoading?: boolean;
  /** Rounded style */
  rounded?: boolean;
  /** Accessible label (required for accessibility) */
  'aria-label': string;
}

const variantStyles: Record<IconButtonVariant, string> = {
  primary:
    'bg-[--color-primary] text-white hover:bg-[--color-primary-hover] border-transparent',
  secondary:
    'bg-gray-800 text-white hover:bg-gray-700 border-gray-700',
  outline:
    'bg-transparent text-[--color-primary] border-[--color-primary] hover:bg-[--color-primary] hover:text-white',
  ghost:
    'bg-transparent text-gray-300 border-transparent hover:bg-gray-800 hover:text-white',
  danger:
    'bg-red-600 text-white hover:bg-red-700 border-transparent',
};

const sizeStyles: Record<IconButtonSize, { button: string; icon: string }> = {
  xs: { button: 'p-1', icon: 'h-4 w-4' },
  sm: { button: 'p-1.5', icon: 'h-5 w-5' },
  md: { button: 'p-2', icon: 'h-6 w-6' },
  lg: { button: 'p-3', icon: 'h-7 w-7' },
};

export function IconButton({
  icon,
  variant = 'ghost',
  size = 'md',
  isLoading = false,
  rounded = false,
  disabled,
  className = '',
  ...props
}: IconButtonProps) {
  const baseStyles = `
    inline-flex items-center justify-center
    border font-medium
    transition-colors duration-200
    focus:outline-none focus:ring-2 focus:ring-[--color-primary] focus:ring-offset-2 focus:ring-offset-gray-900
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  return (
    <button
      type="button"
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${sizeStyles[size].button}
        ${rounded ? 'rounded-full' : 'rounded-lg'}
        ${className}
      `.trim()}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <svg
          className={`animate-spin ${sizeStyles[size].icon}`}
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
        <span className={sizeStyles[size].icon}>{icon}</span>
      )}
    </button>
  );
}
