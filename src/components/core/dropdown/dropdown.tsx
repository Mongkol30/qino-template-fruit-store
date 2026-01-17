import type { HTMLAttributes, ReactNode } from 'react';

export interface DropdownProps {
  /** Dropdown trigger */
  trigger: ReactNode;
  /** Dropdown content */
  children: ReactNode;
  /** Open state */
  open?: boolean;
  /** On open change */
  onOpenChange?: (open: boolean) => void;
  /** Alignment */
  align?: 'left' | 'right' | 'center';
  /** Side */
  side?: 'top' | 'bottom';
  /** Additional class name */
  className?: string;
}

export function Dropdown({
  trigger,
  children,
  open: controlledOpen,
  onOpenChange,
  align = 'left',
  side = 'bottom',
  className = '',
}: DropdownProps) {
  const isControlled = controlledOpen !== undefined;
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false);
  const isOpen = isControlled ? controlledOpen : uncontrolledOpen;

  const setOpen = (value: boolean) => {
    if (!isControlled) {
      setUncontrolledOpen(value);
    }
    onOpenChange?.(value);
  };

  const alignStyles = {
    left: 'left-0',
    right: 'right-0',
    center: 'left-1/2 -translate-x-1/2',
  };

  const sideStyles = {
    top: 'bottom-full mb-1',
    bottom: 'top-full mt-1',
  };

  return (
    <div className={`relative inline-block ${className}`}>
      <div onClick={() => setOpen(!isOpen)}>{trigger}</div>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div
            className={`
              absolute z-50 min-w-[160px]
              bg-white dark:bg-neutral-800 rounded-lg shadow-lg
              border border-neutral-200 dark:border-neutral-700
              py-1
              ${alignStyles[align]}
              ${sideStyles[side]}
            `}
          >
            {children}
          </div>
        </>
      )}
    </div>
  );
}

import React from 'react';

// DropdownItem
export interface DropdownItemProps extends HTMLAttributes<HTMLButtonElement> {
  /** Item content */
  children: ReactNode;
  /** Icon */
  icon?: ReactNode;
  /** Disabled state */
  disabled?: boolean;
  /** Danger variant */
  danger?: boolean;
}

export function DropdownItem({
  children,
  icon,
  disabled = false,
  danger = false,
  onClick,
  className = '',
  ...props
}: DropdownItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full flex items-center gap-2 px-3 py-2 text-sm text-left
        transition-colors
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${danger
          ? 'text-error-600 dark:text-error-400 hover:bg-error-50 dark:hover:bg-error-900/20'
          : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700'
        }
        ${className}
      `.trim()}
      {...props}
    >
      {icon && <span className="w-4 h-4 flex-shrink-0">{icon}</span>}
      {children}
    </button>
  );
}

// DropdownDivider
export function DropdownDivider() {
  return <div className="my-1 border-t border-neutral-200 dark:border-neutral-700" />;
}

// DropdownLabel
export interface DropdownLabelProps {
  children: ReactNode;
}

export function DropdownLabel({ children }: DropdownLabelProps) {
  return (
    <div className="px-3 py-1.5 text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase">
      {children}
    </div>
  );
}
