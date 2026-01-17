import { useCallback, useState } from 'react';

export interface UseDisclosureReturn {
  /** Current open state */
  isOpen: boolean;
  /** Open the disclosure */
  open: () => void;
  /** Close the disclosure */
  close: () => void;
  /** Toggle the disclosure */
  toggle: () => void;
  /** Set the disclosure state */
  setIsOpen: (value: boolean) => void;
}

/**
 * Hook for managing disclosure/modal open state
 * @param initialOpen - Initial open state (default: false)
 * @returns Disclosure controls
 */
export function useDisclosure(initialOpen = false): UseDisclosureReturn {
  const [isOpen, setIsOpen] = useState(initialOpen);

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
