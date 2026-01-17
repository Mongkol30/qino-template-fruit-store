import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export type ToastVariant = 'info' | 'success' | 'warning' | 'error';
export type ToastPosition = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';

export interface ToastProps {
  /** Toast ID */
  id: string;
  /** Toast content */
  message: ReactNode;
  /** Toast variant */
  variant?: ToastVariant;
  /** Auto dismiss duration in ms (0 to disable) */
  duration?: number;
  /** Dismissible */
  dismissible?: boolean;
  /** On dismiss callback */
  onDismiss?: (id: string) => void;
}

export interface ToastContainerProps {
  /** Position of toast container */
  position?: ToastPosition;
  /** Toasts to display */
  toasts: ToastProps[];
  /** Remove toast callback */
  onRemove: (id: string) => void;
}

const variantStyles: Record<ToastVariant, { bg: string; icon: ReactNode }> = {
  info: {
    bg: 'bg-info-500',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
      </svg>
    ),
  },
  success: {
    bg: 'bg-success-500',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    ),
  },
  warning: {
    bg: 'bg-warning-500',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
    ),
  },
  error: {
    bg: 'bg-error-500',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
      </svg>
    ),
  },
};

const positionStyles: Record<ToastPosition, string> = {
  'top-left': 'top-4 left-4',
  'top-center': 'top-4 left-1/2 -translate-x-1/2',
  'top-right': 'top-4 right-4',
  'bottom-left': 'bottom-4 left-4',
  'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
  'bottom-right': 'bottom-4 right-4',
};

function Toast({
  id,
  message,
  variant = 'info',
  duration = 5000,
  dismissible = true,
  onDismiss,
}: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => onDismiss?.(id), 300);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, id, onDismiss]);

  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(() => onDismiss?.(id), 300);
  };

  const { bg, icon } = variantStyles[variant];

  return (
    <div
      className={`
        flex items-center gap-3 min-w-[280px] max-w-md p-4 rounded-lg shadow-lg text-white
        transition-all duration-300
        ${bg}
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
      `}
      role="alert"
    >
      <span className="flex-shrink-0">{icon}</span>
      <span className="flex-1 text-sm font-medium">{message}</span>
      {dismissible && (
        <button
          onClick={handleDismiss}
          className="flex-shrink-0 p-1 rounded hover:bg-white/20 transition-colors"
          aria-label="Dismiss"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      )}
    </div>
  );
}

export function ToastContainer({
  position = 'top-right',
  toasts,
  onRemove,
}: ToastContainerProps) {
  if (typeof window === 'undefined') return null;

  return createPortal(
    <div className={`fixed z-[9999] flex flex-col gap-2 ${positionStyles[position]}`}>
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} onDismiss={onRemove} />
      ))}
    </div>,
    document.body
  );
}

export { Toast };
