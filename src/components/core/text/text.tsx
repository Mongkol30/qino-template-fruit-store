import type { HTMLAttributes, ReactNode } from 'react';

export type TextSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type TextWeight = 'normal' | 'medium' | 'semibold' | 'bold';
export type TextColor = 'default' | 'muted' | 'primary' | 'success' | 'warning' | 'error';
export type TextAlign = 'left' | 'center' | 'right' | 'justify';

export interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  /** Text content */
  children: ReactNode;
  /** Text size */
  size?: TextSize;
  /** Font weight */
  weight?: TextWeight;
  /** Text color */
  color?: TextColor;
  /** Text alignment */
  align?: TextAlign;
  /** Truncate text with ellipsis */
  truncate?: boolean;
  /** HTML element to render */
  as?: 'p' | 'span' | 'div';
}

const sizeStyles: Record<TextSize, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
};

const weightStyles: Record<TextWeight, string> = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
};

const colorStyles: Record<TextColor, string> = {
  default: 'text-neutral-900 dark:text-neutral-100',
  muted: 'text-neutral-500 dark:text-neutral-400',
  primary: 'text-primary-600 dark:text-primary-400',
  success: 'text-success-600 dark:text-success-400',
  warning: 'text-warning-600 dark:text-warning-400',
  error: 'text-error-600 dark:text-error-400',
};

const alignStyles: Record<TextAlign, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
  justify: 'text-justify',
};

export function Text({
  children,
  size = 'md',
  weight = 'normal',
  color = 'default',
  align = 'left',
  truncate = false,
  as: Component = 'p',
  className = '',
  ...props
}: TextProps) {
  return (
    <Component
      className={`
        ${sizeStyles[size]}
        ${weightStyles[weight]}
        ${colorStyles[color]}
        ${alignStyles[align]}
        ${truncate ? 'truncate' : ''}
        ${className}
      `.trim()}
      {...props}
    >
      {children}
    </Component>
  );
}
