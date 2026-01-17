import type { ReactNode } from 'react';
import { Dialog } from '../dialog';

export interface ConfirmDialogProps {
  /** Dialog is open */
  open: boolean;
  /** On close callback */
  onClose: () => void;
  /** On confirm callback */
  onConfirm: () => void;
  /** Dialog title */
  title: string;
  /** Confirmation message */
  message: ReactNode;
  /** Confirm button text */
  confirmText?: string;
  /** Cancel button text */
  cancelText?: string;
  /** Confirm button variant */
  variant?: 'primary' | 'danger';
  /** Loading state */
  loading?: boolean;
}

export function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'primary',
  loading = false,
}: ConfirmDialogProps) {
  const confirmButtonStyles = {
    primary:
      'bg-primary-600 hover:bg-primary-700 focus:ring-primary-500 text-white',
    danger:
      'bg-error-600 hover:bg-error-700 focus:ring-error-500 text-white',
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={title}
      maxWidth="sm"
      footer={
        <>
          <button
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 rounded-lg transition-colors disabled:opacity-50"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className={`
              px-4 py-2 text-sm font-medium rounded-lg transition-colors
              focus:outline-none focus:ring-2 focus:ring-offset-2
              disabled:opacity-50 disabled:cursor-not-allowed
              ${confirmButtonStyles[variant]}
            `}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Loading...
              </span>
            ) : (
              confirmText
            )}
          </button>
        </>
      }
    >
      <p className="text-neutral-600 dark:text-neutral-400">{message}</p>
    </Dialog>
  );
}
