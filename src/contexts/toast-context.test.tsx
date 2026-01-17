import { act, renderHook } from '@testing-library/react';
import type { ReactNode } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { ToastProvider, useToast } from './toast-context';

const wrapper = ({ children }: { children: ReactNode }) => (
  <ToastProvider>{children}</ToastProvider>
);

describe('contexts/ToastContext', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('useToast', () => {
    it('should throw error when used outside provider', () => {
      expect(() => {
        renderHook(() => useToast());
      }).toThrow('useToast must be used within ToastProvider');
    });

    it('should start with empty toasts array', () => {
      const { result } = renderHook(() => useToast(), { wrapper });

      expect(result.current.toasts).toEqual([]);
    });

    it('should add a toast', () => {
      const { result } = renderHook(() => useToast(), { wrapper });

      act(() => {
        result.current.toast('Test message');
      });

      expect(result.current.toasts.length).toBe(1);
      expect(result.current.toasts[0].message).toBe('Test message');
    });

    it('should add success toast', () => {
      const { result } = renderHook(() => useToast(), { wrapper });

      act(() => {
        result.current.success('Success message');
      });

      expect(result.current.toasts[0].type).toBe('success');
    });

    it('should add error toast', () => {
      const { result } = renderHook(() => useToast(), { wrapper });

      act(() => {
        result.current.error('Error message');
      });

      expect(result.current.toasts[0].type).toBe('error');
    });

    it('should add warning toast', () => {
      const { result } = renderHook(() => useToast(), { wrapper });

      act(() => {
        result.current.warning('Warning message');
      });

      expect(result.current.toasts[0].type).toBe('warning');
    });

    it('should add info toast', () => {
      const { result } = renderHook(() => useToast(), { wrapper });

      act(() => {
        result.current.info('Info message');
      });

      expect(result.current.toasts[0].type).toBe('info');
    });

    it('should dismiss a specific toast', () => {
      const { result } = renderHook(() => useToast(), { wrapper });

      let toastId: string;
      act(() => {
        toastId = result.current.toast('Test message');
      });

      expect(result.current.toasts.length).toBe(1);

      act(() => {
        result.current.dismiss(toastId);
      });

      expect(result.current.toasts.length).toBe(0);
    });

    it('should dismiss all toasts', () => {
      const { result } = renderHook(() => useToast(), { wrapper });

      act(() => {
        result.current.toast('Message 1');
        result.current.toast('Message 2');
        result.current.toast('Message 3');
      });

      expect(result.current.toasts.length).toBe(3);

      act(() => {
        result.current.dismissAll();
      });

      expect(result.current.toasts.length).toBe(0);
    });

    it('should auto-dismiss toast after duration', () => {
      const { result } = renderHook(() => useToast(), { wrapper });

      act(() => {
        result.current.toast('Test message', { duration: 3000 });
      });

      expect(result.current.toasts.length).toBe(1);

      act(() => {
        vi.advanceTimersByTime(3000);
      });

      expect(result.current.toasts.length).toBe(0);
    });

    it('should limit max toasts', () => {
      const customWrapper = ({ children }: { children: ReactNode }) => (
        <ToastProvider maxToasts={3}>{children}</ToastProvider>
      );

      const { result } = renderHook(() => useToast(), { wrapper: customWrapper });

      act(() => {
        result.current.toast('Message 1');
        result.current.toast('Message 2');
        result.current.toast('Message 3');
        result.current.toast('Message 4');
        result.current.toast('Message 5');
      });

      expect(result.current.toasts.length).toBe(3);
    });
  });
});
