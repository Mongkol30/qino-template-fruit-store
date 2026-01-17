import type { ElementType, HTMLAttributes, ReactNode } from 'react';

export type BoxPadding = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface BoxProps extends HTMLAttributes<HTMLDivElement> {
  /** Box content */
  children: ReactNode;
  /** HTML element to render */
  as?: ElementType;
  /** Padding size */
  padding?: BoxPadding;
  /** Padding X (horizontal) */
  paddingX?: BoxPadding;
  /** Padding Y (vertical) */
  paddingY?: BoxPadding;
  /** Background color */
  bg?: 'transparent' | 'white' | 'gray' | 'primary';
  /** Border radius */
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  /** Add shadow */
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  /** Add border */
  border?: boolean;
}

const paddingStyles: Record<BoxPadding, string> = {
  none: 'p-0',
  xs: 'p-1',
  sm: 'p-2',
  md: 'p-4',
  lg: 'p-6',
  xl: 'p-8',
};

const paddingXStyles: Record<BoxPadding, string> = {
  none: 'px-0',
  xs: 'px-1',
  sm: 'px-2',
  md: 'px-4',
  lg: 'px-6',
  xl: 'px-8',
};

const paddingYStyles: Record<BoxPadding, string> = {
  none: 'py-0',
  xs: 'py-1',
  sm: 'py-2',
  md: 'py-4',
  lg: 'py-6',
  xl: 'py-8',
};

const bgStyles: Record<string, string> = {
  transparent: 'bg-transparent',
  white: 'bg-white dark:bg-neutral-800',
  gray: 'bg-neutral-100 dark:bg-neutral-900',
  primary: 'bg-primary-50 dark:bg-primary-900/20',
};

const roundedStyles: Record<string, string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  full: 'rounded-full',
};

const shadowStyles: Record<string, string> = {
  none: 'shadow-none',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
};

export function Box({
  children,
  as: Component = 'div',
  padding = 'none',
  paddingX,
  paddingY,
  bg = 'transparent',
  rounded = 'none',
  shadow = 'none',
  border = false,
  className = '',
  ...props
}: BoxProps) {
  const paddingClass = paddingX || paddingY
    ? `${paddingX ? paddingXStyles[paddingX] : ''} ${paddingY ? paddingYStyles[paddingY] : ''}`
    : paddingStyles[padding];

  return (
    <Component
      className={`
        ${paddingClass}
        ${bgStyles[bg]}
        ${roundedStyles[rounded]}
        ${shadowStyles[shadow]}
        ${border ? 'border border-neutral-200 dark:border-neutral-700' : ''}
        ${className}
      `.trim()}
      {...props}
    >
      {children}
    </Component>
  );
}
