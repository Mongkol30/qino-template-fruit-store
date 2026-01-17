import type { HTMLAttributes, ReactNode } from 'react';
import { forwardRef } from 'react';

export interface RowProps extends HTMLAttributes<HTMLDivElement> {
  /** Children elements */
  children: ReactNode;
  /** Gap between items */
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Horizontal alignment */
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  /** Vertical alignment */
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  /** Wrap items */
  wrap?: boolean;
  /** Reverse order */
  reverse?: boolean;
  /** Additional class name */
  className?: string;
}

const gapStyles = {
  none: 'gap-0',
  xs: 'gap-1',
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8',
};

const justifyStyles = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
};

const alignStyles = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
  baseline: 'items-baseline',
};

export const Row = forwardRef<HTMLDivElement, RowProps>(
  (
    {
      children,
      gap = 'md',
      justify = 'start',
      align = 'center',
      wrap = false,
      reverse = false,
      className = '',
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={`
          flex
          ${reverse ? 'flex-row-reverse' : 'flex-row'}
          ${gapStyles[gap]}
          ${justifyStyles[justify]}
          ${alignStyles[align]}
          ${wrap ? 'flex-wrap' : 'flex-nowrap'}
          ${className}
        `}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Row.displayName = 'Row';
