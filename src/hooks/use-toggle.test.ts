import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { useToggle } from './use-toggle';

describe('hooks/useToggle', () => {
  it('should initialize with default value false', () => {
    const { result } = renderHook(() => useToggle());

    expect(result.current[0]).toBe(false);
  });

  it('should initialize with provided value', () => {
    const { result } = renderHook(() => useToggle(true));

    expect(result.current[0]).toBe(true);
  });

  it('should toggle value', () => {
    const { result } = renderHook(() => useToggle());

    act(() => {
      result.current[1](); // toggle
    });

    expect(result.current[0]).toBe(true);

    act(() => {
      result.current[1](); // toggle again
    });

    expect(result.current[0]).toBe(false);
  });

  it('should set value to true', () => {
    const { result } = renderHook(() => useToggle(false));

    act(() => {
      result.current[2](); // setTrue
    });

    expect(result.current[0]).toBe(true);
  });

  it('should set value to false', () => {
    const { result } = renderHook(() => useToggle(true));

    act(() => {
      result.current[3](); // setFalse
    });

    expect(result.current[0]).toBe(false);
  });

  it('should set value directly', () => {
    const { result } = renderHook(() => useToggle());

    act(() => {
      result.current[4](true); // setValue
    });

    expect(result.current[0]).toBe(true);

    act(() => {
      result.current[4](false); // setValue
    });

    expect(result.current[0]).toBe(false);
  });
});
