import { act, renderHook } from '@testing-library/react';
import type { ReactNode } from 'react';
import { describe, expect, it } from 'vitest';

import { ModalProvider, useModal, useModalState } from './modal-context';

const wrapper = ({ children }: { children: ReactNode }) => (
  <ModalProvider>{children}</ModalProvider>
);

describe('contexts/ModalContext', () => {
  describe('useModal', () => {
    it('should throw error when used outside provider', () => {
      expect(() => {
        renderHook(() => useModal());
      }).toThrow('useModal must be used within ModalProvider');
    });

    it('should start with empty modals array', () => {
      const { result } = renderHook(() => useModal(), { wrapper });

      expect(result.current.modals).toEqual([]);
    });

    it('should open a modal', () => {
      const { result } = renderHook(() => useModal(), { wrapper });

      act(() => {
        result.current.openModal('test-modal', <div>Test Modal Content</div>);
      });

      expect(result.current.modals.length).toBe(1);
      expect(result.current.modals[0].id).toBe('test-modal');
    });

    it('should close a modal', () => {
      const { result } = renderHook(() => useModal(), { wrapper });

      act(() => {
        result.current.openModal('test-modal', <div>Test Modal Content</div>);
      });

      expect(result.current.modals.length).toBe(1);

      act(() => {
        result.current.closeModal('test-modal');
      });

      expect(result.current.modals.length).toBe(0);
    });

    it('should close all modals', () => {
      const { result } = renderHook(() => useModal(), { wrapper });

      act(() => {
        result.current.openModal('modal-1', <div>Modal 1</div>);
        result.current.openModal('modal-2', <div>Modal 2</div>);
      });

      expect(result.current.modals.length).toBe(2);

      act(() => {
        result.current.closeAllModals();
      });

      expect(result.current.modals.length).toBe(0);
    });

    it('should check if modal is open', () => {
      const { result } = renderHook(() => useModal(), { wrapper });

      expect(result.current.isOpen('test-modal')).toBe(false);

      act(() => {
        result.current.openModal('test-modal', <div>Test</div>);
      });

      expect(result.current.isOpen('test-modal')).toBe(true);
    });

    it('should replace existing modal with same id', () => {
      const { result } = renderHook(() => useModal(), { wrapper });

      act(() => {
        result.current.openModal('test-modal', <div>Content 1</div>);
      });

      act(() => {
        result.current.openModal('test-modal', <div>Content 2</div>);
      });

      expect(result.current.modals.length).toBe(1);
    });
  });

  describe('useModalState', () => {
    it('should start closed by default', () => {
      const { result } = renderHook(() => useModalState());

      expect(result.current.isOpen).toBe(false);
    });

    it('should start open when defaultOpen is true', () => {
      const { result } = renderHook(() => useModalState(true));

      expect(result.current.isOpen).toBe(true);
    });

    it('should open modal', () => {
      const { result } = renderHook(() => useModalState());

      act(() => {
        result.current.open();
      });

      expect(result.current.isOpen).toBe(true);
    });

    it('should close modal', () => {
      const { result } = renderHook(() => useModalState(true));

      act(() => {
        result.current.close();
      });

      expect(result.current.isOpen).toBe(false);
    });

    it('should toggle modal state', () => {
      const { result } = renderHook(() => useModalState());

      act(() => {
        result.current.toggle();
      });

      expect(result.current.isOpen).toBe(true);

      act(() => {
        result.current.toggle();
      });

      expect(result.current.isOpen).toBe(false);
    });
  });
});
