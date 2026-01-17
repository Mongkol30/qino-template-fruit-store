import type { HTMLAttributes, ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps extends Omit<HTMLAttributes<HTMLDivElement>, 'content'> {
  /** Tooltip content */
  content: ReactNode;
  /** Trigger element */
  children: ReactNode;
  /** Position of tooltip */
  position?: TooltipPosition;
  /** Delay before showing (ms) */
  delay?: number;
  /** Disabled state */
  disabled?: boolean;
}

const positionStyles: Record<TooltipPosition, string> = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
};

const arrowStyles: Record<TooltipPosition, string> = {
  top: 'bottom-0 left-1/2 -translate-x-1/2 translate-y-full border-l-transparent border-r-transparent border-b-transparent border-t-neutral-800',
  bottom: 'top-0 left-1/2 -translate-x-1/2 -translate-y-full border-l-transparent border-r-transparent border-t-transparent border-b-neutral-800',
  left: 'right-0 top-1/2 -translate-y-1/2 translate-x-full border-t-transparent border-b-transparent border-r-transparent border-l-neutral-800',
  right: 'left-0 top-1/2 -translate-y-1/2 -translate-x-full border-t-transparent border-b-transparent border-l-transparent border-r-neutral-800',
};

export function Tooltip({
  content,
  children,
  position = 'top',
  delay = 200,
  disabled = false,
  className = '',
  ...props
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showTooltip = () => {
    if (disabled) return;
    timeoutRef.current = setTimeout(() => setIsVisible(true), delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      className={`relative inline-block ${className}`}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
      {...props}
    >
      {children}

      {isVisible && content && (
        <div
          role="tooltip"
          className={`
            absolute z-50 ${positionStyles[position]}
            px-2 py-1 text-sm
            bg-neutral-800 text-white
            rounded-md shadow-lg
            whitespace-nowrap
            pointer-events-none
          `}
        >
          {content}
          <span
            className={`
              absolute border-4 ${arrowStyles[position]}
            `}
          />
        </div>
      )}
    </div>
  );
}
