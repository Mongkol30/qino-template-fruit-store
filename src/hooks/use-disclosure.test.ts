import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { useDisclosure } from './use-disclosure';

describe('hooks/useDisclosure', () => {
  it('should initialize with default value false', () => {
    const { result } = renderHook(() => useDisclosure());

    expect(result.current.isOpen).toBe(false);
  });

  it('should initialize with provided value', () => {
    const { result } = renderHook(() => useDisclosure(true));

    expect(result.current.isOpen).toBe(true);
  });

  it('should open disclosure', () => {
    const { result } = renderHook(() => useDisclosure());

    act(() => {
      result.current.open();
    });

    expect(result.current.isOpen).toBe(true);
  });

  it('should close disclosure', () => {
    const { result } = renderHook(() => useDisclosure(true));

    act(() => {
      result.current.close();
    });

    expect(result.current.isOpen).toBe(false);
  });

  it('should toggle disclosure', () => {
    const { result } = renderHook(() => useDisclosure());

    act(() => {
      result.current.toggle();
    });

    expect(result.current.isOpen).toBe(true);

    act(() => {
      result.current.toggle();
    });

    expect(result.current.isOpen).toBe(false);
  });

  it('should set isOpen directly', () => {
    const { result } = renderHook(() => useDisclosure());

    act(() => {
      result.current.setIsOpen(true);
    });

    expect(result.current.isOpen).toBe(true);

    act(() => {
      result.current.setIsOpen(false);
    });

    expect(result.current.isOpen).toBe(false);
  });
});
