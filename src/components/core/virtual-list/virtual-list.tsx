import type { HTMLAttributes, ReactNode } from 'react';
import { useCallback, useRef, useState } from 'react';

export interface VirtualListProps<T> extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** List items */
  items: T[];
  /** Item height (fixed or function for variable height) */
  itemHeight: number | ((index: number) => number);
  /** Visible height of the list container */
  height: number;
  /** Render function for each item */
  renderItem: (item: T, index: number) => ReactNode;
  /** Overscan count (extra items to render above/below) */
  overscan?: number;
  /** Gap between items */
  gap?: number;
  /** Additional class name */
  className?: string;
}

export function VirtualList<T>({
  items,
  itemHeight,
  height,
  renderItem,
  overscan = 3,
  gap = 0,
  className = '',
  ...props
}: VirtualListProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);

  const getItemHeight = useCallback(
    (index: number): number => {
      return typeof itemHeight === 'function' ? itemHeight(index) : itemHeight;
    },
    [itemHeight]
  );

  // Calculate positions for all items (for variable height support)
  const itemPositions = useCallback(() => {
    const positions: number[] = [];
    let offset = 0;
    for (let i = 0; i < items.length; i++) {
      positions.push(offset);
      offset += getItemHeight(i) + gap;
    }
    return positions;
  }, [items.length, getItemHeight, gap]);

  const positions = itemPositions();
  const totalHeight = positions.length > 0
    ? positions[positions.length - 1] + getItemHeight(items.length - 1)
    : 0;

  // Find visible range
  const findStartIndex = useCallback(
    (scrollTop: number): number => {
      let low = 0;
      let high = positions.length - 1;

      while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        if (positions[mid] < scrollTop) {
          low = mid + 1;
        } else {
          high = mid - 1;
        }
      }
      return Math.max(0, low - 1);
    },
    [positions]
  );

  const findEndIndex = useCallback(
    (scrollTop: number, startIndex: number): number => {
      const targetEnd = scrollTop + height;
      let index = startIndex;
      while (index < items.length && positions[index] < targetEnd) {
        index++;
      }
      return Math.min(items.length - 1, index);
    },
    [positions, height, items.length]
  );

  const startIndex = Math.max(0, findStartIndex(scrollTop) - overscan);
  const endIndex = Math.min(items.length - 1, findEndIndex(scrollTop, startIndex) + overscan);

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  // Scroll to item
  const visibleItems = [];
  for (let i = startIndex; i <= endIndex && i < items.length; i++) {
    visibleItems.push({
      index: i,
      item: items[i],
      style: {
        position: 'absolute' as const,
        top: positions[i],
        height: getItemHeight(i),
        width: '100%',
      },
    });
  }

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className={`overflow-auto ${className}`}
      style={{ height }}
      {...props}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        {visibleItems.map(({ index, item, style }) => (
          <div key={index} style={style}>
            {renderItem(item, index)}
          </div>
        ))}
      </div>
    </div>
  );
}
