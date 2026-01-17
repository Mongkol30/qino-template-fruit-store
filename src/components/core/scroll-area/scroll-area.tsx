import type { HTMLAttributes, ReactNode, UIEvent } from 'react';
import { useRef } from 'react';

export interface ScrollAreaProps extends HTMLAttributes<HTMLDivElement> {
  /** Content */
  children: ReactNode;
  /** Maximum height */
  maxHeight?: string | number;
  /** Show scrollbar always */
  alwaysShowScrollbar?: boolean;
  /** Horizontal scrolling */
  horizontal?: boolean;
  /** On scroll callback */
  onScroll?: (e: UIEvent<HTMLDivElement>) => void;
  /** On scroll end callback */
  onScrollEnd?: () => void;
}

export function ScrollArea({
  children,
  maxHeight,
  alwaysShowScrollbar = false,
  horizontal = false,
  onScroll,
  onScrollEnd,
  className = '',
  style,
  ...props
}: ScrollAreaProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    onScroll?.(e);

    if (onScrollEnd && scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight, scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

      if (horizontal) {
        if (scrollLeft + clientWidth >= scrollWidth - 1) {
          onScrollEnd();
        }
      } else {
        if (scrollTop + clientHeight >= scrollHeight - 1) {
          onScrollEnd();
        }
      }
    }
  };

  return (
    <div
      ref={scrollRef}
      onScroll={handleScroll}
      className={`
        ${horizontal ? 'overflow-x-auto overflow-y-hidden' : 'overflow-y-auto overflow-x-hidden'}
        ${alwaysShowScrollbar ? 'scrollbar-always' : 'scrollbar-thin scrollbar-thumb-neutral-300 dark:scrollbar-thumb-neutral-600 scrollbar-track-transparent'}
        ${className}
      `.trim()}
      style={{
        maxHeight: typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}
