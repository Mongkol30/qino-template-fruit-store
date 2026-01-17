import type { ReactNode } from 'react';
import { useCallback, useEffect, useRef } from 'react';

export interface FocusTrapProps {
  /** Children to trap focus within */
  children: ReactNode;
  /** Whether focus trap is active */
  active?: boolean;
  /** Initial element to focus (query selector) */
  initialFocus?: string;
  /** Return focus on deactivation */
  returnFocusOnDeactivate?: boolean;
  /** Additional class name */
  className?: string;
}

export function FocusTrap({
  children,
  active = true,
  initialFocus,
  returnFocusOnDeactivate = true,
  className = '',
}: FocusTrapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const getFocusableElements = useCallback(() => {
    if (!containerRef.current) return [];

    return Array.from(
      containerRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    );
  }, []);

  // Store previous focus and set initial focus
  useEffect(() => {
    if (!active) return;

    previousFocusRef.current = document.activeElement as HTMLElement;

    // Set initial focus
    if (initialFocus && containerRef.current) {
      const element = containerRef.current.querySelector<HTMLElement>(initialFocus);
      if (element) {
        element.focus();
        return;
      }
    }

    // Focus first focusable element
    const focusableElements = getFocusableElements();
    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    }

    return () => {
      if (returnFocusOnDeactivate && previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    };
  }, [active, initialFocus, returnFocusOnDeactivate, getFocusableElements]);

  // Handle tab key to trap focus
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!active || e.key !== 'Tab') return;

      const focusableElements = getFocusableElements();
      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    },
    [active, getFocusableElements]
  );

  return (
    <div
      ref={containerRef}
      onKeyDown={handleKeyDown}
      className={className}
    >
      {children}
    </div>
  );
}
