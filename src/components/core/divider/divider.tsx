import type { HTMLAttributes, ReactNode } from 'react';

export type DividerOrientation = 'horizontal' | 'vertical';
export type DividerVariant = 'solid' | 'dashed' | 'dotted';
export type DividerTextAlign = 'left' | 'center' | 'right';

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  /** Orientation of the divider */
  orientation?: DividerOrientation;
  /** Line style variant */
  variant?: DividerVariant;
  /** Optional text or content to display */
  children?: ReactNode;
  /** Text alignment when children are provided */
  textAlign?: DividerTextAlign;
  /** Custom color class */
  color?: string;
  /** Spacing around the divider */
  spacing?: 'sm' | 'md' | 'lg';
}

const variantStyles: Record<DividerVariant, string> = {
  solid: 'border-solid',
  dashed: 'border-dashed',
  dotted: 'border-dotted',
};

const spacingStyles: Record<string, { horizontal: string; vertical: string }> = {
  sm: { horizontal: 'my-2', vertical: 'mx-2' },
  md: { horizontal: 'my-4', vertical: 'mx-4' },
  lg: { horizontal: 'my-6', vertical: 'mx-6' },
};

const textAlignStyles: Record<DividerTextAlign, string> = {
  left: 'before:w-[5%] after:w-[95%]',
  center: 'before:w-1/2 after:w-1/2',
  right: 'before:w-[95%] after:w-[5%]',
};

export function Divider({
  orientation = 'horizontal',
  variant = 'solid',
  children,
  textAlign = 'center',
  color = 'border-gray-700',
  spacing = 'md',
  className = '',
  ...props
}: DividerProps) {
  const isHorizontal = orientation === 'horizontal';

  // Vertical divider
  if (!isHorizontal) {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className={`
          inline-block h-full min-h-[1em] w-0
          border-l ${color} ${variantStyles[variant]}
          ${spacingStyles[spacing].vertical}
          ${className}
        `.trim()}
        {...props}
      />
    );
  }

  // Horizontal divider without children
  if (!children) {
    return (
      <div
        role="separator"
        aria-orientation="horizontal"
        className={`
          w-full border-t ${color} ${variantStyles[variant]}
          ${spacingStyles[spacing].horizontal}
          ${className}
        `.trim()}
        {...props}
      />
    );
  }

  // Horizontal divider with children (text)
  return (
    <div
      role="separator"
      aria-orientation="horizontal"
      className={`
        flex items-center w-full
        ${spacingStyles[spacing].horizontal}
        ${textAlignStyles[textAlign]}
        ${className}
      `.trim()}
      {...props}
    >
      <span
        className={`flex-grow border-t ${color} ${variantStyles[variant]}`}
      />
      <span className="px-3 text-sm text-gray-400 whitespace-nowrap">
        {children}
      </span>
      <span
        className={`flex-grow border-t ${color} ${variantStyles[variant]}`}
      />
    </div>
  );
}
