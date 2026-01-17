import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useThrottle } from './use-throttle';

describe('hooks/useThrottle', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should call function immediately on first call', () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useThrottle(callback, 300));

    act(() => {
      result.current('test');
    });

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith('test');
  });

  it('should throttle subsequent calls', () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useThrottle(callback, 300));

    act(() => {
      result.current('first');
    });

    expect(callback).toHaveBeenCalledTimes(1);

    // Call again immediately - should be throttled
    act(() => {
      result.current('second');
    });

    expect(callback).toHaveBeenCalledTimes(1);

    // Fast-forward past throttle delay
    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(callback).toHaveBeenCalledTimes(2);
    expect(callback).toHaveBeenLastCalledWith('second');
  });

  it('should allow calls after throttle period', () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useThrottle(callback, 300));

    act(() => {
      result.current('first');
    });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    act(() => {
      result.current('second');
    });

    expect(callback).toHaveBeenCalledTimes(2);
    expect(callback).toHaveBeenLastCalledWith('second');
  });

  it('should cancel pending timeout on rapid calls', () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useThrottle(callback, 300));

    act(() => {
      result.current('first');
    });

    act(() => {
      vi.advanceTimersByTime(100);
    });

    act(() => {
      result.current('second');
    });

    act(() => {
      vi.advanceTimersByTime(100);
    });

    act(() => {
      result.current('third');
    });

    // Only the last pending call should execute after delay
    act(() => {
      vi.advanceTimersByTime(200);
    });

    expect(callback).toHaveBeenCalledTimes(2);
    expect(callback).toHaveBeenLastCalledWith('third');
  });
});
