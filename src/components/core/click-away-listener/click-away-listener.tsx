import type { ReactNode } from 'react';
import { useEffect, useRef } from 'react';

export interface ClickAwayListenerProps {
  /** Children to wrap */
  children: ReactNode;
  /** On click away callback */
  onClickAway: () => void;
  /** Mouse event to listen for */
  mouseEvent?: 'click' | 'mousedown' | 'mouseup';
  /** Touch event to listen for */
  touchEvent?: 'touchstart' | 'touchend';
  /** Disabled state */
  disabled?: boolean;
}

export function ClickAwayListener({
  children,
  onClickAway,
  mouseEvent = 'click',
  touchEvent = 'touchend',
  disabled = false,
}: ClickAwayListenerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (disabled) return;

    const handleClickAway = (event: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        onClickAway();
      }
    };

    document.addEventListener(mouseEvent, handleClickAway as EventListener);
    document.addEventListener(touchEvent, handleClickAway as EventListener);

    return () => {
      document.removeEventListener(mouseEvent, handleClickAway as EventListener);
      document.removeEventListener(touchEvent, handleClickAway as EventListener);
    };
  }, [onClickAway, mouseEvent, touchEvent, disabled]);

  return <div ref={containerRef}>{children}</div>;
}
