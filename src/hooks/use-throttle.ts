import { useCallback, useRef } from 'react';

/**
 * Hook to throttle a callback function
 * @param callback - Function to throttle
 * @param delay - Throttle delay in ms
 * @returns Throttled function
 */
export function useThrottle<T extends (...args: Parameters<T>) => ReturnType<T>>(
  callback: T,
  delay: number
): (...args: Parameters<T>) => void {
  const lastRan = useRef<number>(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  return useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();

      if (now - lastRan.current >= delay) {
        callback(...args);
        lastRan.current = now;
      } else {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(
          () => {
            callback(...args);
            lastRan.current = Date.now();
          },
          delay - (now - lastRan.current)
        );
      }
    },
    [callback, delay]
  );
}
