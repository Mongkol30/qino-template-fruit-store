import type { HTMLAttributes, ReactNode } from 'react';

export type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  /** Container content */
  children: ReactNode;
  /** Maximum width */
  size?: ContainerSize;
  /** Center the container */
  centered?: boolean;
  /** Add horizontal padding */
  padding?: boolean;
}

const sizeStyles: Record<ContainerSize, string> = {
  sm: 'max-w-screen-sm',
  md: 'max-w-screen-md',
  lg: 'max-w-screen-lg',
  xl: 'max-w-screen-xl',
  '2xl': 'max-w-screen-2xl',
  full: 'max-w-full',
};

export function Container({
  children,
  size = 'xl',
  centered = true,
  padding = true,
  className = '',
  ...props
}: ContainerProps) {
  return (
    <div
      className={`
        w-full
        ${sizeStyles[size]}
        ${centered ? 'mx-auto' : ''}
        ${padding ? 'px-4 sm:px-6 lg:px-8' : ''}
        ${className}
      `.trim()}
      {...props}
    >
      {children}
    </div>
  );
}
