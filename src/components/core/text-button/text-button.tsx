import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type TextButtonSize = 'xs' | 'sm' | 'md' | 'lg';
export type TextButtonColor = 'primary' | 'secondary' | 'neutral' | 'error' | 'success' | 'warning';

export interface TextButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button content */
  children: ReactNode;
  /** Button size */
  size?: TextButtonSize;
  /** Button color */
  color?: TextButtonColor;
  /** Underline style */
  underline?: 'none' | 'hover' | 'always';
  /** Disabled state */
  disabled?: boolean;
}

const sizeStyles: Record<TextButtonSize, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};

const colorStyles: Record<TextButtonColor, string> = {
  primary: 'text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300',
  secondary: 'text-secondary-600 hover:text-secondary-500 dark:text-secondary-400 dark:hover:text-secondary-300',
  neutral: 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100',
  error: 'text-error-600 hover:text-error-500 dark:text-error-400 dark:hover:text-error-300',
  success: 'text-success-600 hover:text-success-500 dark:text-success-400 dark:hover:text-success-300',
  warning: 'text-warning-600 hover:text-warning-500 dark:text-warning-400 dark:hover:text-warning-300',
};

const underlineStyles: Record<string, string> = {
  none: 'no-underline',
  hover: 'no-underline hover:underline',
  always: 'underline',
};

export function TextButton({
  children,
  size = 'md',
  color = 'primary',
  underline = 'hover',
  disabled = false,
  className = '',
  ...props
}: TextButtonProps) {
  const baseStyles = `
    inline-flex items-center gap-1
    font-medium cursor-pointer
    bg-transparent border-none p-0
    transition-colors duration-200
    focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed disabled:no-underline
  `;

  return (
    <button
      type="button"
      disabled={disabled}
      className={`
        ${baseStyles}
        ${sizeStyles[size]}
        ${colorStyles[color]}
        ${underlineStyles[underline]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}

TextButton.displayName = 'TextButton';
