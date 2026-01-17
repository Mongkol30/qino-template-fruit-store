import type { HTMLAttributes, ReactNode } from 'react';

export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
export type HeadingSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
export type HeadingColor = 'default' | 'muted' | 'primary' | 'gradient';

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  /** Heading content */
  children: ReactNode;
  /** Heading level (h1-h6) */
  as?: HeadingLevel;
  /** Visual size (independent of semantic level) */
  size?: HeadingSize;
  /** Text color */
  color?: HeadingColor;
  /** Text alignment */
  align?: 'left' | 'center' | 'right';
  /** Truncate text with ellipsis */
  truncate?: boolean;
}

const sizeStyles: Record<HeadingSize, string> = {
  xs: 'text-sm font-semibold',
  sm: 'text-base font-semibold',
  md: 'text-lg font-semibold',
  lg: 'text-xl font-bold',
  xl: 'text-2xl font-bold',
  '2xl': 'text-3xl font-bold',
  '3xl': 'text-4xl font-bold',
  '4xl': 'text-5xl font-bold',
};

const colorStyles: Record<HeadingColor, string> = {
  default: 'text-neutral-900 dark:text-white',
  muted: 'text-neutral-600 dark:text-neutral-400',
  primary: 'text-primary-600 dark:text-primary-400',
  gradient: 'bg-gradient-to-r from-primary-600 via-secondary-600 to-pink-500 bg-clip-text text-transparent',
};

const alignStyles: Record<string, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

// Default size mapping for each heading level
const defaultSizeByLevel: Record<HeadingLevel, HeadingSize> = {
  h1: '3xl',
  h2: '2xl',
  h3: 'xl',
  h4: 'lg',
  h5: 'md',
  h6: 'sm',
};

export function Heading({
  children,
  as: Component = 'h2',
  size,
  color = 'default',
  align = 'left',
  truncate = false,
  className = '',
  ...props
}: HeadingProps) {
  const resolvedSize = size ?? defaultSizeByLevel[Component];

  return (
    <Component
      className={`
        ${sizeStyles[resolvedSize]}
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
