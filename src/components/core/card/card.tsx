import type { HTMLAttributes, ReactNode } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Card content */
  children: ReactNode;
  /** Card variant */
  variant?: 'default' | 'outlined' | 'elevated';
  /** Padding size */
  padding?: 'none' | 'sm' | 'md' | 'lg';
  /** Hoverable effect */
  hoverable?: boolean;
  /** Clickable (adds cursor pointer) */
  clickable?: boolean;
}

const variantStyles: Record<string, string> = {
  default: 'bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-sm',
  outlined: 'bg-transparent border border-neutral-200 dark:border-neutral-700',
  elevated: 'bg-white dark:bg-neutral-800 shadow-lg dark:shadow-black/30',
};

const paddingStyles: Record<string, string> = {
  none: 'p-0',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export function Card({
  children,
  variant = 'default',
  padding = 'md',
  hoverable = false,
  clickable = false,
  className = '',
  ...props
}: CardProps) {
  return (
    <div
      className={`
        rounded-xl
        ${variantStyles[variant]}
        ${paddingStyles[padding]}
        ${hoverable ? 'transition-shadow duration-200 hover:shadow-md dark:hover:shadow-black/40' : ''}
        ${clickable ? 'cursor-pointer' : ''}
        ${className}
      `.trim()}
      {...props}
    >
      {children}
    </div>
  );
}

// Card subcomponents
export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function CardHeader({ children, className = '', ...props }: CardHeaderProps) {
  return (
    <div className={`mb-4 ${className}`} {...props}>
      {children}
    </div>
  );
}

export interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function CardBody({ children, className = '', ...props }: CardBodyProps) {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
}

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function CardFooter({ children, className = '', ...props }: CardFooterProps) {
  return (
    <div className={`mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700 ${className}`} {...props}>
      {children}
    </div>
  );
}
