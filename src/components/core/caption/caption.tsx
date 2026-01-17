import type { HTMLAttributes, ReactNode } from 'react';

export type CaptionSize = 'xs' | 'sm' | 'md';
export type CaptionColor = 'default' | 'muted' | 'primary' | 'success' | 'warning' | 'error';

export interface CaptionProps extends HTMLAttributes<HTMLSpanElement> {
  /** Caption content */
  children: ReactNode;
  /** Caption size */
  size?: CaptionSize;
  /** Caption color */
  color?: CaptionColor;
  /** Italic style */
  italic?: boolean;
}

const sizeStyles: Record<CaptionSize, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
};

const colorStyles: Record<CaptionColor, string> = {
  default: 'text-neutral-600 dark:text-neutral-400',
  muted: 'text-neutral-400 dark:text-neutral-500',
  primary: 'text-primary-600 dark:text-primary-400',
  success: 'text-success-600 dark:text-success-400',
  warning: 'text-warning-600 dark:text-warning-400',
  error: 'text-error-600 dark:text-error-400',
};

export function Caption({
  children,
  size = 'sm',
  color = 'muted',
  italic = false,
  className = '',
  ...props
}: CaptionProps) {
  return (
    <span
      className={`
        block
        ${sizeStyles[size]}
        ${colorStyles[color]}
        ${italic ? 'italic' : ''}
        ${className}
      `.trim()}
      {...props}
    >
      {children}
    </span>
  );
}
