import type { HTMLAttributes, ReactNode } from 'react';

export type FlexDirection = 'row' | 'row-reverse' | 'col' | 'col-reverse';
export type FlexWrap = 'wrap' | 'nowrap' | 'wrap-reverse';
export type FlexAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
export type FlexJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
export type FlexGap = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface FlexProps extends HTMLAttributes<HTMLDivElement> {
  /** Flex content */
  children: ReactNode;
  /** Flex direction */
  direction?: FlexDirection;
  /** Flex wrap */
  wrap?: FlexWrap;
  /** Align items */
  align?: FlexAlign;
  /** Justify content */
  justify?: FlexJustify;
  /** Gap between items */
  gap?: FlexGap;
  /** Inline flex */
  inline?: boolean;
}

const directionStyles: Record<FlexDirection, string> = {
  row: 'flex-row',
  'row-reverse': 'flex-row-reverse',
  col: 'flex-col',
  'col-reverse': 'flex-col-reverse',
};

const wrapStyles: Record<FlexWrap, string> = {
  wrap: 'flex-wrap',
  nowrap: 'flex-nowrap',
  'wrap-reverse': 'flex-wrap-reverse',
};

const alignStyles: Record<FlexAlign, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
  baseline: 'items-baseline',
};

const justifyStyles: Record<FlexJustify, string> = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
};

const gapStyles: Record<FlexGap, string> = {
  none: 'gap-0',
  xs: 'gap-1',
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8',
};

export function Flex({
  children,
  direction = 'row',
  wrap = 'nowrap',
  align = 'stretch',
  justify = 'start',
  gap = 'none',
  inline = false,
  className = '',
  ...props
}: FlexProps) {
  return (
    <div
      className={`
        ${inline ? 'inline-flex' : 'flex'}
        ${directionStyles[direction]}
        ${wrapStyles[wrap]}
        ${alignStyles[align]}
        ${justifyStyles[justify]}
        ${gapStyles[gap]}
        ${className}
      `.trim()}
      {...props}
    >
      {children}
    </div>
  );
}
