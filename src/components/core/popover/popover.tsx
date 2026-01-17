import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export type PopoverPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface PopoverProps {
  /** Trigger element */
  trigger: ReactNode;
  /** Popover content */
  children: ReactNode;
  /** Placement */
  placement?: PopoverPlacement;
  /** Trigger mode */
  triggerMode?: 'click' | 'hover';
  /** Controlled open state */
  open?: boolean;
  /** On open change callback */
  onOpenChange?: (open: boolean) => void;
  /** Additional class name */
  className?: string;
}

export function Popover({
  trigger,
  children,
  placement = 'bottom',
  triggerMode = 'click',
  open: controlledOpen,
  onOpenChange,
  className = '',
}: PopoverProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : uncontrolledOpen;

  const setOpen = (value: boolean) => {
    if (!isControlled) {
      setUncontrolledOpen(value);
    }
    onOpenChange?.(value);
  };

  const updatePosition = () => {
    if (!triggerRef.current) return;

    const rect = triggerRef.current.getBoundingClientRect();
    const gap = 8;

    let top = 0;
    let left = 0;

    switch (placement) {
      case 'top':
        top = rect.top - gap;
        left = rect.left + rect.width / 2;
        break;
      case 'bottom':
        top = rect.bottom + gap;
        left = rect.left + rect.width / 2;
        break;
      case 'left':
        top = rect.top + rect.height / 2;
        left = rect.left - gap;
        break;
      case 'right':
        top = rect.top + rect.height / 2;
        left = rect.right + gap;
        break;
    }

    setPosition({ top, left });
  };

  useEffect(() => {
    if (isOpen) {
      updatePosition();
      window.addEventListener('resize', updatePosition);
      window.addEventListener('scroll', updatePosition, true);
    }
    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [isOpen]);

  useEffect(() => {
    if (triggerMode === 'click' && isOpen) {
      const handleClickOutside = (e: MouseEvent) => {
        if (
          !triggerRef.current?.contains(e.target as Node) &&
          !popoverRef.current?.contains(e.target as Node)
        ) {
          setOpen(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, triggerMode]);

  const handleTriggerClick = () => {
    if (triggerMode === 'click') {
      setOpen(!isOpen);
    }
  };

  const handleMouseEnter = () => {
    if (triggerMode === 'hover') {
      setOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (triggerMode === 'hover') {
      setOpen(false);
    }
  };

  const placementTransform: Record<PopoverPlacement, string> = {
    top: 'translate(-50%, -100%)',
    bottom: 'translate(-50%, 0)',
    left: 'translate(-100%, -50%)',
    right: 'translate(0, -50%)',
  };

  return (
    <>
      <div
        ref={triggerRef}
        onClick={handleTriggerClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="inline-block"
      >
        {trigger}
      </div>

      {isOpen &&
        typeof window !== 'undefined' &&
        createPortal(
          <div
            ref={popoverRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`
              fixed z-50 p-3 rounded-lg shadow-lg
              bg-white dark:bg-neutral-800
              border border-neutral-200 dark:border-neutral-700
              animate-in fade-in zoom-in-95 duration-150
              ${className}
            `}
            style={{
              top: position.top,
              left: position.left,
              transform: placementTransform[placement],
            }}
          >
            {children}
          </div>,
          document.body
        )}
    </>
  );
}
