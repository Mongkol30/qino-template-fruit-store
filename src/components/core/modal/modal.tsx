import type { HTMLAttributes, ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  /** Modal content */
  children: ReactNode;
  /** Open state */
  isOpen: boolean;
  /** Close callback */
  onClose: () => void;
  /** Modal title */
  title?: string;
  /** Modal size */
  size?: ModalSize;
  /** Show close button */
  showCloseButton?: boolean;
  /** Close on overlay click */
  closeOnOverlay?: boolean;
  /** Close on escape key */
  closeOnEscape?: boolean;
}

const sizeStyles: Record<ModalSize, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  full: 'max-w-full mx-4',
};

export function Modal({
  children,
  isOpen,
  onClose,
  title,
  size = 'md',
  showCloseButton = true,
  closeOnOverlay = true,
  closeOnEscape = true,
  className = '',
  ...props
}: ModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!closeOnEscape) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose, closeOnEscape]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!mounted || !isOpen) return null;

  const modalContent = (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={closeOnOverlay ? onClose : undefined}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
        className={`
          relative w-full ${sizeStyles[size]}
          bg-white dark:bg-neutral-800
          rounded-xl shadow-xl
          transform transition-all
          ${className}
        `.trim()}
        {...props}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-700">
            {title && (
              <h2 id="modal-title" className="text-lg font-semibold text-neutral-900 dark:text-white">
                {title}
              </h2>
            )}
            {showCloseButton && (
              <button
                type="button"
                onClick={onClose}
                className="p-1 rounded-md text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 dark:hover:text-neutral-300 dark:hover:bg-neutral-700 transition-colors"
                aria-label="Close modal"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-4">{children}</div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
