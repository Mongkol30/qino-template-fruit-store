import type { HTMLAttributes, ReactNode } from 'react';

export interface AppBarProps extends HTMLAttributes<HTMLElement> {
  /** AppBar content */
  children: ReactNode;
  /** Position */
  position?: 'static' | 'fixed' | 'sticky';
  /** Color variant */
  color?: 'default' | 'primary' | 'transparent';
  /** Elevated shadow */
  elevated?: boolean;
}

const colorStyles = {
  default: 'bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-700',
  primary: 'bg-primary-600 text-white',
  transparent: 'bg-transparent',
};

const positionStyles = {
  static: '',
  fixed: 'fixed top-0 left-0 right-0 z-50',
  sticky: 'sticky top-0 z-50',
};

export function AppBar({
  children,
  position = 'static',
  color = 'default',
  elevated = false,
  className = '',
  ...props
}: AppBarProps) {
  return (
    <header
      className={`
        w-full
        ${positionStyles[position]}
        ${colorStyles[color]}
        ${elevated ? 'shadow-md' : ''}
        ${className}
      `.trim()}
      {...props}
    >
      {children}
    </header>
  );
}

// AppBarContent (toolbar area)
export interface AppBarContentProps extends HTMLAttributes<HTMLDivElement> {
  /** Content */
  children: ReactNode;
}

export function AppBarContent({ children, className = '', ...props }: AppBarContentProps) {
  return (
    <div
      className={`flex items-center justify-between h-16 px-4 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

// AppBarSection
export interface AppBarSectionProps extends HTMLAttributes<HTMLDivElement> {
  /** Section content */
  children: ReactNode;
  /** Section alignment */
  align?: 'left' | 'center' | 'right';
}

export function AppBarSection({
  children,
  align = 'left',
  className = '',
  ...props
}: AppBarSectionProps) {
  const alignStyles = {
    left: 'justify-start',
    center: 'justify-center flex-1',
    right: 'justify-end ml-auto',
  };

  return (
    <div
      className={`flex items-center gap-2 ${alignStyles[align]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
