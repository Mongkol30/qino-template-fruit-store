import type { HTMLAttributes, ReactNode } from 'react';

export type GridCols = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'none';
export type GridGap = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  /** Grid content */
  children: ReactNode;
  /** Number of columns */
  cols?: GridCols;
  /** Responsive columns (sm, md, lg) */
  colsSm?: GridCols;
  colsMd?: GridCols;
  colsLg?: GridCols;
  /** Gap between items */
  gap?: GridGap;
  /** Gap X (horizontal) */
  gapX?: GridGap;
  /** Gap Y (vertical) */
  gapY?: GridGap;
  /** Align items */
  align?: 'start' | 'center' | 'end' | 'stretch';
}

const colsStyles: Record<GridCols, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-6',
  7: 'grid-cols-7',
  8: 'grid-cols-8',
  9: 'grid-cols-9',
  10: 'grid-cols-10',
  11: 'grid-cols-11',
  12: 'grid-cols-12',
  none: 'grid-cols-none',
};

const colsSmStyles: Record<GridCols, string> = {
  1: 'sm:grid-cols-1',
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-3',
  4: 'sm:grid-cols-4',
  5: 'sm:grid-cols-5',
  6: 'sm:grid-cols-6',
  7: 'sm:grid-cols-7',
  8: 'sm:grid-cols-8',
  9: 'sm:grid-cols-9',
  10: 'sm:grid-cols-10',
  11: 'sm:grid-cols-11',
  12: 'sm:grid-cols-12',
  none: 'sm:grid-cols-none',
};

const colsMdStyles: Record<GridCols, string> = {
  1: 'md:grid-cols-1',
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-3',
  4: 'md:grid-cols-4',
  5: 'md:grid-cols-5',
  6: 'md:grid-cols-6',
  7: 'md:grid-cols-7',
  8: 'md:grid-cols-8',
  9: 'md:grid-cols-9',
  10: 'md:grid-cols-10',
  11: 'md:grid-cols-11',
  12: 'md:grid-cols-12',
  none: 'md:grid-cols-none',
};

const colsLgStyles: Record<GridCols, string> = {
  1: 'lg:grid-cols-1',
  2: 'lg:grid-cols-2',
  3: 'lg:grid-cols-3',
  4: 'lg:grid-cols-4',
  5: 'lg:grid-cols-5',
  6: 'lg:grid-cols-6',
  7: 'lg:grid-cols-7',
  8: 'lg:grid-cols-8',
  9: 'lg:grid-cols-9',
  10: 'lg:grid-cols-10',
  11: 'lg:grid-cols-11',
  12: 'lg:grid-cols-12',
  none: 'lg:grid-cols-none',
};

const gapStyles: Record<GridGap, string> = {
  none: 'gap-0',
  xs: 'gap-1',
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8',
};

const gapXStyles: Record<GridGap, string> = {
  none: 'gap-x-0',
  xs: 'gap-x-1',
  sm: 'gap-x-2',
  md: 'gap-x-4',
  lg: 'gap-x-6',
  xl: 'gap-x-8',
};

const gapYStyles: Record<GridGap, string> = {
  none: 'gap-y-0',
  xs: 'gap-y-1',
  sm: 'gap-y-2',
  md: 'gap-y-4',
  lg: 'gap-y-6',
  xl: 'gap-y-8',
};

const alignStyles: Record<string, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
};

export function Grid({
  children,
  cols = 1,
  colsSm,
  colsMd,
  colsLg,
  gap = 'md',
  gapX,
  gapY,
  align = 'stretch',
  className = '',
  ...props
}: GridProps) {
  const gapClass = gapX || gapY
    ? `${gapX ? gapXStyles[gapX] : ''} ${gapY ? gapYStyles[gapY] : ''}`
    : gapStyles[gap];

  return (
    <div
      className={`
        grid
        ${colsStyles[cols]}
        ${colsSm ? colsSmStyles[colsSm] : ''}
        ${colsMd ? colsMdStyles[colsMd] : ''}
        ${colsLg ? colsLgStyles[colsLg] : ''}
        ${gapClass}
        ${alignStyles[align]}
        ${className}
      `.trim()}
      {...props}
    >
      {children}
    </div>
  );
}
