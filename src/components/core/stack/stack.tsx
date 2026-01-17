import type { HTMLAttributes, ReactNode } from 'react';

export type StackDirection = 'horizontal' | 'vertical';
export type StackSpacing = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type StackAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
export type StackJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  /** Stack content */
  children: ReactNode;
  /** Stack direction */
  direction?: StackDirection;
  /** Gap between items */
  spacing?: StackSpacing;
  /** Align items */
  align?: StackAlign;
  /** Justify content */
  justify?: StackJustify;
  /** Wrap items */
  wrap?: boolean;
  /** Reverse order */
  reverse?: boolean;
}

const spacingStyles: Record<StackSpacing, string> = {
  none: 'gap-0',
  xs: 'gap-1',
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8',
};

const alignStyles: Record<StackAlign, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
  baseline: 'items-baseline',
};

const justifyStyles: Record<StackJustify, string> = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
};

export function Stack({
  children,
  direction = 'vertical',
  spacing = 'md',
  align = 'stretch',
  justify = 'start',
  wrap = false,
  reverse = false,
  className = '',
  ...props
}: StackProps) {
  const directionClass = direction === 'horizontal'
    ? (reverse ? 'flex-row-reverse' : 'flex-row')
    : (reverse ? 'flex-col-reverse' : 'flex-col');

  return (
    <div
      className={`
        flex
        ${directionClass}
        ${spacingStyles[spacing]}
        ${alignStyles[align]}
        ${justifyStyles[justify]}
        ${wrap ? 'flex-wrap' : 'flex-nowrap'}
        ${className}
      `.trim()}
      {...props}
    >
      {children}
    </div>
  );
}
