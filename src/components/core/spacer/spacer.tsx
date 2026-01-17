import type { HTMLAttributes } from 'react';

export type SpacerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';

export interface SpacerProps extends HTMLAttributes<HTMLDivElement> {
  /** Size of the spacer */
  size?: SpacerSize;
  /** Horizontal spacer (default is vertical) */
  horizontal?: boolean;
}

const sizeStyles: Record<SpacerSize, { vertical: string; horizontal: string }> = {
  xs: { vertical: 'h-1', horizontal: 'w-1' },
  sm: { vertical: 'h-2', horizontal: 'w-2' },
  md: { vertical: 'h-4', horizontal: 'w-4' },
  lg: { vertical: 'h-6', horizontal: 'w-6' },
  xl: { vertical: 'h-8', horizontal: 'w-8' },
  '2xl': { vertical: 'h-12', horizontal: 'w-12' },
  '3xl': { vertical: 'h-16', horizontal: 'w-16' },
  '4xl': { vertical: 'h-24', horizontal: 'w-24' },
};

export function Spacer({
  size = 'md',
  horizontal = false,
  className = '',
  ...props
}: SpacerProps) {
  const sizeClass = horizontal ? sizeStyles[size].horizontal : sizeStyles[size].vertical;

  return (
    <div
      aria-hidden="true"
      className={`
        ${sizeClass}
        ${horizontal ? 'inline-block' : 'block'}
        ${className}
      `.trim()}
      {...props}
    />
  );
}
