import type { HTMLAttributes, ReactNode } from 'react';
import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

// ============ Context ============
interface ContextMenuState {
  x: number;
  y: number;
  isOpen: boolean;
}

interface ContextMenuContextValue {
  state: ContextMenuState;
  open: (x: number, y: number) => void;
  close: () => void;
}

const ContextMenuContext = createContext<ContextMenuContextValue | null>(null);

function useContextMenuContext() {
  const context = useContext(ContextMenuContext);
  if (!context) {
    throw new Error('ContextMenu components must be used within ContextMenu');
  }
  return context;
}

// ============ ContextMenu ============
export interface ContextMenuProps {
  /** Trigger element */
  children: ReactNode;
  /** Menu content */
  menu: ReactNode;
  /** Disabled state */
  disabled?: boolean;
  /** Additional class name for trigger wrapper */
  className?: string;
}

export function ContextMenu({ children, menu, disabled = false, className = '' }: ContextMenuProps) {
  const [state, setState] = useState<ContextMenuState>({ x: 0, y: 0, isOpen: false });
  const triggerRef = useRef<HTMLDivElement>(null);

  const open = useCallback((x: number, y: number) => {
    setState({ x, y, isOpen: true });
  }, []);

  const close = useCallback(() => {
    setState((prev) => ({ ...prev, isOpen: false }));
  }, []);

  const handleContextMenu = (e: React.MouseEvent) => {
    if (disabled) return;
    e.preventDefault();
    open(e.clientX, e.clientY);
  };

  // Close on click outside
  useEffect(() => {
    if (!state.isOpen) return;

    const handleClick = () => close();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };

    document.addEventListener('click', handleClick);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [state.isOpen, close]);

  return (
    <ContextMenuContext.Provider value={{ state, open, close }}>
      <div ref={triggerRef} onContextMenu={handleContextMenu} className={className}>
        {children}
      </div>
      {state.isOpen &&
        createPortal(
          <div
            className="fixed z-50 min-w-48 py-1 bg-white dark:bg-neutral-800
            border border-neutral-200 dark:border-neutral-700 rounded-lg shadow-lg"
            style={{ left: state.x, top: state.y }}
            onClick={(e) => e.stopPropagation()}
          >
            {menu}
          </div>,
          document.body
        )}
    </ContextMenuContext.Provider>
  );
}

// ============ ContextMenuItem ============
export interface ContextMenuItemProps extends HTMLAttributes<HTMLDivElement> {
  /** Item label */
  children: ReactNode;
  /** Icon (optional) */
  icon?: ReactNode;
  /** Shortcut key (optional) */
  shortcut?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Destructive/danger style */
  destructive?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Additional class name */
  className?: string;
}

export function ContextMenuItem({
  children,
  icon,
  shortcut,
  disabled = false,
  destructive = false,
  onClick,
  className = '',
  ...props
}: ContextMenuItemProps) {
  const { close } = useContextMenuContext();

  const handleClick = () => {
    if (disabled) return;
    onClick?.();
    close();
  };

  return (
    <div
      onClick={handleClick}
      className={`
        flex items-center gap-3 px-3 py-2 text-sm cursor-pointer transition-colors
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${destructive ? 'text-error-600 dark:text-error-400' : 'text-neutral-700 dark:text-neutral-300'}
        ${!disabled && !destructive ? 'hover:bg-neutral-100 dark:hover:bg-neutral-700' : ''}
        ${!disabled && destructive ? 'hover:bg-error-50 dark:hover:bg-error-900/20' : ''}
        ${className}
      `}
      {...props}
    >
      {icon && <span className="w-4 h-4 flex-shrink-0">{icon}</span>}
      <span className="flex-1">{children}</span>
      {shortcut && (
        <span className="text-xs text-neutral-400 dark:text-neutral-500">{shortcut}</span>
      )}
    </div>
  );
}

// ============ ContextMenuDivider ============
export function ContextMenuDivider() {
  return <div className="my-1 border-t border-neutral-200 dark:border-neutral-700" />;
}

// ============ ContextMenuLabel ============
export interface ContextMenuLabelProps {
  /** Label text */
  children: ReactNode;
  /** Additional class name */
  className?: string;
}

export function ContextMenuLabel({ children, className = '' }: ContextMenuLabelProps) {
  return (
    <div
      className={`px-3 py-1.5 text-xs font-medium text-neutral-500 dark:text-neutral-400 ${className}`}
    >
      {children}
    </div>
  );
}

// ============ ContextMenuSub ============
export interface ContextMenuSubProps {
  /** Trigger label */
  label: ReactNode;
  /** Icon (optional) */
  icon?: ReactNode;
  /** Submenu content */
  children: ReactNode;
  /** Disabled state */
  disabled?: boolean;
}

export function ContextMenuSub({ label, icon, children, disabled = false }: ContextMenuSubProps) {
  const [isOpen, setIsOpen] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={itemRef}
      onMouseEnter={() => !disabled && setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      className="relative"
    >
      <div
        className={`
          flex items-center gap-3 px-3 py-2 text-sm cursor-pointer transition-colors
          text-neutral-700 dark:text-neutral-300
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-neutral-100 dark:hover:bg-neutral-700'}
        `}
      >
        {icon && <span className="w-4 h-4 flex-shrink-0">{icon}</span>}
        <span className="flex-1">{label}</span>
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
      {isOpen && (
        <div
          className="absolute left-full top-0 min-w-48 py-1 bg-white dark:bg-neutral-800
          border border-neutral-200 dark:border-neutral-700 rounded-lg shadow-lg"
        >
          {children}
        </div>
      )}
    </div>
  );
}
