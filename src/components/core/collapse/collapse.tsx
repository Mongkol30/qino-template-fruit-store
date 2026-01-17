import type { ReactNode } from 'react';
import { useState } from 'react';

export interface CollapseProps {
  /** Collapse is open */
  open?: boolean;
  /** Default open state */
  defaultOpen?: boolean;
  /** On change callback */
  onChange?: (open: boolean) => void;
  /** Collapse header/trigger */
  trigger: ReactNode;
  /** Collapse content */
  children: ReactNode;
  /** Animation duration in ms */
  duration?: number;
  /** Additional class name */
  className?: string;
}

export function Collapse({
  open: controlledOpen,
  defaultOpen = false,
  onChange,
  trigger,
  children,
  duration = 200,
  className = '',
}: CollapseProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);

  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : uncontrolledOpen;

  const toggle = () => {
    const newValue = !isOpen;
    if (!isControlled) {
      setUncontrolledOpen(newValue);
    }
    onChange?.(newValue);
  };

  return (
    <div className={className}>
      {/* Trigger */}
      <div onClick={toggle} className="cursor-pointer">
        {trigger}
      </div>

      {/* Content */}
      <div
        className="overflow-hidden"
        style={{
          maxHeight: isOpen ? '2000px' : 0,
          opacity: isOpen ? 1 : 0,
          transition: `max-height ${duration}ms ease-in-out, opacity ${duration}ms ease-in-out`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
