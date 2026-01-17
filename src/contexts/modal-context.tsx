import type { ReactNode } from 'react';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';

// ============ Types ============
export interface ModalConfig {
  id: string;
  component: ReactNode;
  props?: Record<string, unknown>;
}

// ============ Context ============
interface ModalContextValue {
  modals: ModalConfig[];
  openModal: (id: string, component: ReactNode, props?: Record<string, unknown>) => void;
  closeModal: (id: string) => void;
  closeAllModals: () => void;
  isOpen: (id: string) => boolean;
}

const ModalContext = createContext<ModalContextValue | null>(null);

export function useModal(): ModalContextValue {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within ModalProvider');
  }
  return context;
}

// ============ Provider ============
export interface ModalProviderProps {
  /** Children */
  children: ReactNode;
}

export function ModalProvider({ children }: ModalProviderProps) {
  const [modals, setModals] = useState<ModalConfig[]>([]);

  const openModal = useCallback(
    (id: string, component: ReactNode, props?: Record<string, unknown>) => {
      setModals((prev) => {
        // Replace if exists, otherwise add
        const exists = prev.find((m) => m.id === id);
        if (exists) {
          return prev.map((m) => (m.id === id ? { id, component, props } : m));
        }
        return [...prev, { id, component, props }];
      });
    },
    []
  );

  const closeModal = useCallback((id: string) => {
    setModals((prev) => prev.filter((m) => m.id !== id));
  }, []);

  const closeAllModals = useCallback(() => {
    setModals([]);
  }, []);

  const isOpen = useCallback(
    (id: string) => {
      return modals.some((m) => m.id === id);
    },
    [modals]
  );

  const value = useMemo(
    () => ({
      modals,
      openModal,
      closeModal,
      closeAllModals,
      isOpen,
    }),
    [modals, openModal, closeModal, closeAllModals, isOpen]
  );

  return (
    <ModalContext.Provider value={value}>
      {children}
      {/* Render all modals */}
      {modals.map((modal) => (
        <div key={modal.id}>{modal.component}</div>
      ))}
    </ModalContext.Provider>
  );
}

// ============ Hook for creating managed modals ============
export function useModalState(defaultOpen = false) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((v) => !v), []);

  return {
    isOpen,
    open,
    close,
    toggle,
    setIsOpen,
  };
}
