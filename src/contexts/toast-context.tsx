import type { ReactNode } from 'react';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';

// ============ Types ============
export interface ToastConfig {
  id: string;
  message: ReactNode;
  type: 'info' | 'success' | 'warning' | 'error';
  duration: number;
  position: ToastPosition;
  closable: boolean;
}

export type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

export interface ToastOptions {
  type?: ToastConfig['type'];
  duration?: number;
  position?: ToastPosition;
  closable?: boolean;
}

// ============ Context ============
interface ToastContextValue {
  toasts: ToastConfig[];
  toast: (message: ReactNode, options?: ToastOptions) => string;
  success: (message: ReactNode, options?: Omit<ToastOptions, 'type'>) => string;
  error: (message: ReactNode, options?: Omit<ToastOptions, 'type'>) => string;
  warning: (message: ReactNode, options?: Omit<ToastOptions, 'type'>) => string;
  info: (message: ReactNode, options?: Omit<ToastOptions, 'type'>) => string;
  dismiss: (id: string) => void;
  dismissAll: () => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
}

// ============ Provider ============
export interface ToastProviderProps {
  /** Children */
  children: ReactNode;
  /** Default position */
  position?: ToastPosition;
  /** Default duration in ms */
  duration?: number;
  /** Max visible toasts */
  maxToasts?: number;
}

let toastCounter = 0;

export function ToastProvider({
  children,
  position: defaultPosition = 'top-right',
  duration: defaultDuration = 5000,
  maxToasts = 5,
}: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastConfig[]>([]);

  const addToast = useCallback(
    (message: ReactNode, options: ToastOptions = {}): string => {
      const id = `toast-${++toastCounter}`;
      const config: ToastConfig = {
        id,
        message,
        type: options.type || 'info',
        duration: options.duration ?? defaultDuration,
        position: options.position || defaultPosition,
        closable: options.closable ?? true,
      };

      setToasts((prev) => {
        const newToasts = [...prev, config];
        // Limit max toasts
        if (newToasts.length > maxToasts) {
          return newToasts.slice(-maxToasts);
        }
        return newToasts;
      });

      // Auto dismiss
      if (config.duration > 0) {
        setTimeout(() => {
          setToasts((prev) => prev.filter((t) => t.id !== id));
        }, config.duration);
      }

      return id;
    },
    [defaultDuration, defaultPosition, maxToasts]
  );

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const dismissAll = useCallback(() => {
    setToasts([]);
  }, []);

  const value = useMemo(
    () => ({
      toasts,
      toast: addToast,
      success: (message: ReactNode, options?: Omit<ToastOptions, 'type'>) =>
        addToast(message, { ...options, type: 'success' }),
      error: (message: ReactNode, options?: Omit<ToastOptions, 'type'>) =>
        addToast(message, { ...options, type: 'error' }),
      warning: (message: ReactNode, options?: Omit<ToastOptions, 'type'>) =>
        addToast(message, { ...options, type: 'warning' }),
      info: (message: ReactNode, options?: Omit<ToastOptions, 'type'>) =>
        addToast(message, { ...options, type: 'info' }),
      dismiss,
      dismissAll,
    }),
    [toasts, addToast, dismiss, dismissAll]
  );

  // Group toasts by position
  const groupedToasts = useMemo(() => {
    const groups: Record<ToastPosition, ToastConfig[]> = {
      'top-left': [],
      'top-center': [],
      'top-right': [],
      'bottom-left': [],
      'bottom-center': [],
      'bottom-right': [],
    };
    toasts.forEach((toast) => {
      groups[toast.position].push(toast);
    });
    return groups;
  }, [toasts]);

  const positionStyles: Record<ToastPosition, string> = {
    'top-left': 'top-4 left-4',
    'top-center': 'top-4 left-1/2 -translate-x-1/2',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
    'bottom-right': 'bottom-4 right-4',
  };

  const typeStyles: Record<ToastConfig['type'], string> = {
    info: 'bg-info-500 text-white',
    success: 'bg-success-500 text-white',
    warning: 'bg-warning-500 text-white',
    error: 'bg-error-500 text-white',
  };

  const typeIcons: Record<ToastConfig['type'], ReactNode> = {
    info: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    success: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    warning: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
    ),
    error: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      {typeof document !== 'undefined' &&
        createPortal(
          <>
            {(Object.entries(groupedToasts) as [ToastPosition, ToastConfig[]][]).map(
              ([position, positionToasts]) =>
                positionToasts.length > 0 && (
                  <div
                    key={position}
                    className={`fixed z-50 flex flex-col gap-2 ${positionStyles[position]}`}
                  >
                    {positionToasts.map((toast) => (
                      <div
                        key={toast.id}
                        className={`
                          flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg
                          min-w-64 max-w-md animate-in slide-in-from-right-5
                          ${typeStyles[toast.type]}
                        `}
                      >
                        {typeIcons[toast.type]}
                        <div className="flex-1 text-sm">{toast.message}</div>
                        {toast.closable && (
                          <button
                            onClick={() => dismiss(toast.id)}
                            className="p-1 hover:bg-white/20 rounded transition-colors"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )
            )}
          </>,
          document.body
        )}
    </ToastContext.Provider>
  );
}
