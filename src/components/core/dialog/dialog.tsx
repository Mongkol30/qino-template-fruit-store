import type { ReactNode } from 'react';
import { useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';

export interface DialogProps {
  /** Dialog is open */
  open: boolean;
  /** On close callback */
  onClose: () => void;
  /** Dialog title */
  title: string;
  /** Dialog content */
  children: ReactNode;
  /** Footer actions */
  footer?: ReactNode;
  /** Close on overlay click */
  closeOnOverlay?: boolean;
  /** Close on escape key */
  closeOnEscape?: boolean;
  /** Maximum width */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
}

const maxWidthStyles = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
};

export function Dialog({
  open,
  onClose,
  title,
  children,
  footer,
  closeOnOverlay = true,
  closeOnEscape = true,
  maxWidth = 'md',
}: DialogProps) {
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

  if (!open || typeof window === 'undefined') return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={closeOnOverlay ? onClose : undefined}
        aria-hidden="true"
      />

      {/* Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        className={`
          relative w-full ${maxWidthStyles[maxWidth]} mx-4
          bg-white dark:bg-neutral-800 rounded-xl shadow-xl
          animate-in fade-in zoom-in-95 duration-200
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 dark:border-neutral-700">
          <h2 id="dialog-title" className="text-lg font-semibold text-neutral-900 dark:text-white">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
            aria-label="Close dialog"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-4 text-neutral-700 dark:text-neutral-300">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="flex justify-end gap-3 px-6 py-4 border-t border-neutral-200 dark:border-neutral-700">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
