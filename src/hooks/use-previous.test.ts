import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { usePrevious } from './use-previous';

describe('hooks/usePrevious', () => {
  it('should return undefined on first render', () => {
    const { result } = renderHook(() => usePrevious('initial'));

    expect(result.current).toBeUndefined();
  });

  it('should return previous value after update', () => {
    const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
      initialProps: { value: 'first' },
    });

    expect(result.current).toBeUndefined();

    rerender({ value: 'second' });

    expect(result.current).toBe('first');

    rerender({ value: 'third' });

    expect(result.current).toBe('second');
  });

  it('should work with numbers', () => {
    const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
      initialProps: { value: 1 },
    });

    expect(result.current).toBeUndefined();

    rerender({ value: 2 });

    expect(result.current).toBe(1);

    rerender({ value: 3 });

    expect(result.current).toBe(2);
  });

  it('should work with objects', () => {
    const obj1 = { id: 1 };
    const obj2 = { id: 2 };

    const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
      initialProps: { value: obj1 },
    });

    expect(result.current).toBeUndefined();

    rerender({ value: obj2 });

    expect(result.current).toBe(obj1);
  });
});
