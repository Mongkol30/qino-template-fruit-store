import type { HTMLAttributes } from 'react';

export type BadgeVariant = 'solid' | 'outline' | 'soft';
export type BadgeColor = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'neutral';
export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Badge variant */
  variant?: BadgeVariant;
  /** Badge color */
  color?: BadgeColor;
  /** Badge size */
  size?: BadgeSize;
  /** Pill shape */
  pill?: boolean;
}

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-0.5 text-sm',
  lg: 'px-3 py-1 text-sm',
};

const colorStyles: Record<BadgeColor, Record<BadgeVariant, string>> = {
  primary: {
    solid: 'bg-primary-600 text-white',
    outline: 'border border-primary-600 text-primary-600',
    soft: 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300',
  },
  secondary: {
    solid: 'bg-secondary-600 text-white',
    outline: 'border border-secondary-600 text-secondary-600',
    soft: 'bg-secondary-100 text-secondary-700 dark:bg-secondary-900/30 dark:text-secondary-300',
  },
  success: {
    solid: 'bg-success-500 text-white',
    outline: 'border border-success-500 text-success-600',
    soft: 'bg-success-100 text-success-700 dark:bg-success-900/30 dark:text-success-300',
  },
  warning: {
    solid: 'bg-warning-500 text-white',
    outline: 'border border-warning-500 text-warning-600',
    soft: 'bg-warning-100 text-warning-700 dark:bg-warning-900/30 dark:text-warning-300',
  },
  error: {
    solid: 'bg-error-500 text-white',
    outline: 'border border-error-500 text-error-600',
    soft: 'bg-error-100 text-error-700 dark:bg-error-900/30 dark:text-error-300',
  },
  info: {
    solid: 'bg-info-500 text-white',
    outline: 'border border-info-500 text-info-600',
    soft: 'bg-info-100 text-info-700 dark:bg-info-900/30 dark:text-info-300',
  },
  neutral: {
    solid: 'bg-neutral-600 text-white',
    outline: 'border border-neutral-400 text-neutral-600 dark:border-neutral-500 dark:text-neutral-400',
    soft: 'bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300',
  },
};

export function Badge({
  variant = 'soft',
  color = 'primary',
  size = 'md',
  pill = false,
  className = '',
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center font-medium
        ${sizeStyles[size]}
        ${colorStyles[color][variant]}
        ${pill ? 'rounded-full' : 'rounded'}
        ${className}
      `.trim()}
      {...props}
    >
      {children}
    </span>
  );
}
