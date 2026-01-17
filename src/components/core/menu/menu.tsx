import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';

export interface MenuItemProps {
  /** Menu item label */
  label: ReactNode;
  /** Icon */
  icon?: ReactNode;
  /** Click handler */
  onClick?: () => void;
  /** Disabled state */
  disabled?: boolean;
  /** Danger style */
  danger?: boolean;
  /** Divider after this item */
  divider?: boolean;
}

export interface MenuProps {
  /** Menu trigger button */
  trigger: ReactNode;
  /** Menu items */
  items: MenuItemProps[];
  /** Menu alignment - 'auto' will detect based on position */
  align?: 'left' | 'right' | 'auto';
  /** Additional class name */
  className?: string;
}

export function Menu({
  trigger,
  items,
  align = 'left',
  className = '',
}: MenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [computedAlign, setComputedAlign] = useState<'left' | 'right'>('left');
  const triggerRef = useRef<HTMLDivElement>(null);

  // Compute alignment when 'auto' is set
  useEffect(() => {
    if (align !== 'auto') {
      setComputedAlign(align);
      return;
    }

    if (triggerRef.current && isOpen) {
      const rect = triggerRef.current.getBoundingClientRect();
      const windowWidth = window.innerWidth;
      // If trigger is in the right half of the screen, align right
      setComputedAlign(rect.left > windowWidth / 2 ? 'right' : 'left');
    }
  }, [align, isOpen]);

  const handleItemClick = (item: MenuItemProps) => {
    if (!item.disabled) {
      item.onClick?.();
      setIsOpen(false);
    }
  };

  return (
    <div ref={triggerRef} className={`relative inline-block ${className}`}>
      {/* Trigger */}
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Menu dropdown */}
      {isOpen && (
        <div
          role="menu"
          className={`
            absolute z-50 mt-2 min-w-[180px] py-1
            bg-white dark:bg-neutral-800 rounded-lg shadow-lg
            border border-neutral-200 dark:border-neutral-700
            animate-in fade-in zoom-in-95 duration-150
            ${computedAlign === 'left' ? 'left-0' : 'right-0'}
          `}
        >
          {items.map((item, index) => (
            <div key={index}>
              <button
                role="menuitem"
                onClick={() => handleItemClick(item)}
                disabled={item.disabled}
                className={`
                  w-full flex items-center gap-2 px-4 py-2 text-sm text-left
                  transition-colors
                  ${
                    item.disabled
                      ? 'opacity-50 cursor-not-allowed text-neutral-400'
                      : item.danger
                        ? 'text-error-600 hover:bg-error-50 dark:text-error-400 dark:hover:bg-error-900/20'
                        : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700'
                  }
                `}
              >
                {item.icon && <span className="w-4 h-4">{item.icon}</span>}
                {item.label}
              </button>
              {item.divider && (
                <div className="my-1 border-t border-neutral-200 dark:border-neutral-700" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Single MenuItem for composition
export function MenuItem({
  label,
  icon,
  onClick,
  disabled = false,
  danger = false,
}: Omit<MenuItemProps, 'divider'>) {
  return (
    <button
      role="menuitem"
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full flex items-center gap-2 px-4 py-2 text-sm text-left
        transition-colors
        ${
          disabled
            ? 'opacity-50 cursor-not-allowed text-neutral-400'
            : danger
              ? 'text-error-600 hover:bg-error-50 dark:text-error-400 dark:hover:bg-error-900/20'
              : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700'
        }
      `}
    >
      {icon && <span className="w-4 h-4">{icon}</span>}
      {label}
    </button>
  );
}
