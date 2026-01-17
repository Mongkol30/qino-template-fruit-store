import { useCallback, useState } from 'react';

/**
 * Hook for managing boolean toggle state
 * @param initialValue - Initial boolean value (default: false)
 * @returns [value, toggle, setTrue, setFalse, setValue]
 */
export function useToggle(
  initialValue = false
): [boolean, () => void, () => void, () => void, (value: boolean) => void] {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => setValue((v) => !v), []);
  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);

  return [value, toggle, setTrue, setFalse, setValue];
}
