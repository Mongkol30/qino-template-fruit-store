import { useEffect, useState } from 'react';

/**
 * Hook to debounce a value
 * @param value - Value to debounce
 * @param delay - Debounce delay in ms (default: 300)
 * @returns Debounced value
 * @example
 * const debouncedSearch = useDebounce(searchTerm, 500);
 */
export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
