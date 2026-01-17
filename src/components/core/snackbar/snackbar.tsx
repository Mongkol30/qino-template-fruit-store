import type { ReactNode } from 'react';

export interface SnackbarProps {
  /** Snackbar is open */
  open: boolean;
  /** On close callback */
  onClose: () => void;
  /** Snackbar message */
  message: ReactNode;
  /** Action button */
  action?: ReactNode;
  /** Auto hide duration in ms (0 to disable) */
  autoHideDuration?: number;
  /** Position */
  position?: 'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

import { useEffect } from 'react';
import { createPortal } from 'react-dom';

const positionStyles = {
  top: 'top-4 left-1/2 -translate-x-1/2',
  bottom: 'bottom-4 left-1/2 -translate-x-1/2',
  'top-left': 'top-4 left-4',
  'top-right': 'top-4 right-4',
  'bottom-left': 'bottom-4 left-4',
  'bottom-right': 'bottom-4 right-4',
};

export function Snackbar({
  open,
  onClose,
  message,
  action,
  autoHideDuration = 5000,
  position = 'bottom',
}: SnackbarProps) {
  useEffect(() => {
    if (open && autoHideDuration > 0) {
      const timer = setTimeout(onClose, autoHideDuration);
      return () => clearTimeout(timer);
    }
  }, [open, autoHideDuration, onClose]);

  if (!open || typeof window === 'undefined') return null;

  return createPortal(
    <div
      role="alert"
      className={`
        fixed z-50 ${positionStyles[position]}
        flex items-center gap-3 px-4 py-3 min-w-[280px] max-w-md
        bg-neutral-800 dark:bg-neutral-900 text-white
        rounded-lg shadow-lg
        animate-in fade-in slide-in-from-bottom-2 duration-200
      `}
    >
      <span className="flex-1 text-sm">{message}</span>
      {action && <div className="flex-shrink-0">{action}</div>}
      <button
        onClick={onClose}
        className="flex-shrink-0 p-1 rounded hover:bg-white/10 transition-colors"
        aria-label="Close"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
    </div>,
    document.body
  );
}
