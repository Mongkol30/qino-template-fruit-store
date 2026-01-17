import type { HTMLAttributes, ReactNode } from 'react';

export interface ListProps extends HTMLAttributes<HTMLUListElement> {
  /** List variant */
  variant?: 'none' | 'disc' | 'decimal' | 'divided';
  /** List spacing */
  spacing?: 'none' | 'sm' | 'md' | 'lg';
}

const spacingStyles = {
  none: '',
  sm: 'space-y-1',
  md: 'space-y-2',
  lg: 'space-y-4',
};

const variantStyles = {
  none: '',
  disc: 'list-disc list-inside',
  decimal: 'list-decimal list-inside',
  divided: 'divide-y divide-neutral-200 dark:divide-neutral-700',
};

export function List({
  variant = 'none',
  spacing = 'none',
  className = '',
  children,
  ...props
}: ListProps) {
  return (
    <ul
      className={`
        ${variantStyles[variant]}
        ${variant === 'divided' ? '' : spacingStyles[spacing]}
        ${className}
      `.trim()}
      {...props}
    >
      {children}
    </ul>
  );
}

// ListItem Props
export interface ListItemProps extends HTMLAttributes<HTMLLIElement> {
  /** Leading icon or element */
  leading?: ReactNode;
  /** Trailing element */
  trailing?: ReactNode;
  /** Primary text */
  primary?: ReactNode;
  /** Secondary text */
  secondary?: ReactNode;
  /** Clickable */
  onClick?: () => void;
  /** Selected state */
  selected?: boolean;
  /** Disabled state */
  disabled?: boolean;
}

export function ListItem({
  leading,
  trailing,
  primary,
  secondary,
  onClick,
  selected = false,
  disabled = false,
  className = '',
  children,
  ...props
}: ListItemProps) {
  const isClickable = !disabled && onClick;

  const content = children || (
    <>
      {leading && <span className="flex-shrink-0">{leading}</span>}
      <div className="flex-1 min-w-0">
        {primary && (
          <p className="text-sm font-medium text-neutral-900 dark:text-white truncate">
            {primary}
          </p>
        )}
        {secondary && (
          <p className="text-sm text-neutral-500 dark:text-neutral-400 truncate">
            {secondary}
          </p>
        )}
      </div>
      {trailing && <span className="flex-shrink-0">{trailing}</span>}
    </>
  );

  return (
    <li
      onClick={disabled ? undefined : onClick}
      className={`
        flex items-center gap-3 px-4 py-3
        ${isClickable ? 'cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-800' : ''}
        ${selected ? 'bg-primary-50 dark:bg-primary-900/20' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        transition-colors
        ${className}
      `.trim()}
      {...props}
    >
      {content}
    </li>
  );
}
