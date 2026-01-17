import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonGroupVariant = 'solid' | 'outline' | 'ghost';
export type ButtonGroupSize = 'sm' | 'md' | 'lg';
export type ButtonGroupColor = 'primary' | 'secondary' | 'neutral';

export interface ButtonGroupProps {
  /** Button group children */
  children: ReactNode;
  /** Button variant */
  variant?: ButtonGroupVariant;
  /** Button size */
  size?: ButtonGroupSize;
  /** Button color */
  color?: ButtonGroupColor;
  /** Attached buttons (no gap) */
  attached?: boolean;
  /** Vertical orientation */
  vertical?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Additional class name */
  className?: string;
}

export function ButtonGroup({
  children,
  variant = 'outline',
  size = 'md',
  color = 'primary',
  attached = true,
  vertical = false,
  disabled = false,
  className = '',
}: ButtonGroupProps) {
  return (
    <div
      role="group"
      className={`
        inline-flex
        ${vertical ? 'flex-col' : 'flex-row'}
        ${attached ? '' : vertical ? 'gap-1' : 'gap-1'}
        ${className}
      `.trim()}
      data-variant={variant}
      data-size={size}
      data-color={color}
      data-disabled={disabled}
    >
      {children}
    </div>
  );
}

// ButtonGroupItem for use within ButtonGroup
export interface ButtonGroupItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button content */
  children: ReactNode;
  /** Active state */
  active?: boolean;
}

export function ButtonGroupItem({
  children,
  active = false,
  disabled = false,
  className = '',
  ...props
}: ButtonGroupItemProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      className={`
        px-4 py-2 text-sm font-medium transition-colors
        border border-neutral-300 dark:border-neutral-600
        first:rounded-l-lg last:rounded-r-lg
        -ml-px first:ml-0
        focus:z-10 focus:outline-none focus:ring-2 focus:ring-primary-500
        ${
          active
            ? 'bg-primary-600 text-white border-primary-600'
            : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700'
        }
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `.trim()}
      {...props}
    >
      {children}
    </button>
  );
}
