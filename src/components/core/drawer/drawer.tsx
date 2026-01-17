import type { ReactNode } from 'react';
import { useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';

export type DrawerPlacement = 'left' | 'right' | 'top' | 'bottom';
export type DrawerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface DrawerProps {
  /** Drawer is open */
  open: boolean;
  /** On close callback */
  onClose: () => void;
  /** Drawer placement */
  placement?: DrawerPlacement;
  /** Drawer size */
  size?: DrawerSize;
  /** Drawer title */
  title?: ReactNode;
  /** Drawer content */
  children: ReactNode;
  /** Footer content */
  footer?: ReactNode;
  /** Close on overlay click */
  closeOnOverlay?: boolean;
  /** Close on escape key */
  closeOnEscape?: boolean;
  /** Show close button */
  showCloseButton?: boolean;
}

const sizeStyles: Record<DrawerPlacement, Record<DrawerSize, string>> = {
  left: {
    sm: 'w-64',
    md: 'w-80',
    lg: 'w-96',
    xl: 'w-[32rem]',
    full: 'w-screen',
  },
  right: {
    sm: 'w-64',
    md: 'w-80',
    lg: 'w-96',
    xl: 'w-[32rem]',
    full: 'w-screen',
  },
  top: {
    sm: 'h-48',
    md: 'h-64',
    lg: 'h-80',
    xl: 'h-96',
    full: 'h-screen',
  },
  bottom: {
    sm: 'h-48',
    md: 'h-64',
    lg: 'h-80',
    xl: 'h-96',
    full: 'h-screen',
  },
};

const placementStyles: Record<DrawerPlacement, { container: string; panel: string; transform: string }> = {
  left: {
    container: 'left-0 top-0 h-full',
    panel: 'h-full',
    transform: '-translate-x-full',
  },
  right: {
    container: 'right-0 top-0 h-full',
    panel: 'h-full',
    transform: 'translate-x-full',
  },
  top: {
    container: 'top-0 left-0 w-full',
    panel: 'w-full',
    transform: '-translate-y-full',
  },
  bottom: {
    container: 'bottom-0 left-0 w-full',
    panel: 'w-full',
    transform: 'translate-y-full',
  },
};

export function Drawer({
  open,
  onClose,
  placement = 'right',
  size = 'md',
  title,
  children,
  footer,
  closeOnOverlay = true,
  closeOnEscape = true,
  showCloseButton = true,
}: DrawerProps) {
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (closeOnEscape && e.key === 'Escape') {
        onClose();
      }
    },
    [closeOnEscape, onClose]
  );

  useEffect(() => {
    if (open) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [open, handleEscape]);

  if (typeof window === 'undefined') return null;

  const styles = placementStyles[placement];

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        className={`
          fixed inset-0 z-40 bg-black/50 backdrop-blur-sm
          transition-opacity duration-300
          ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
        onClick={closeOnOverlay ? onClose : undefined}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'drawer-title' : undefined}
        className={`
          fixed z-50 ${styles.container}
          transition-transform duration-300 ease-in-out
          ${open ? 'translate-x-0 translate-y-0' : styles.transform}
        `}
      >
        <div
          className={`
            ${styles.panel} ${sizeStyles[placement][size]}
            bg-white dark:bg-neutral-800
            flex flex-col shadow-xl
          `}
        >
          {/* Header */}
          {(title || showCloseButton) && (
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 dark:border-neutral-700">
              {title && (
                <h2 id="drawer-title" className="text-lg font-semibold text-neutral-900 dark:text-white">
                  {title}
                </h2>
              )}
              {showCloseButton && (
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors ml-auto"
                  aria-label="Close drawer"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              )}
            </div>
          )}

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {children}
          </div>

          {/* Footer */}
          {footer && (
            <div className="px-6 py-4 border-t border-neutral-200 dark:border-neutral-700">
              {footer}
            </div>
          )}
        </div>
      </div>
    </>,
    document.body
  );
}
