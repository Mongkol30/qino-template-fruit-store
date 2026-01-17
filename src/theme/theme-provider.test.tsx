import { configureStore } from '@reduxjs/toolkit';
import { act, renderHook } from '@testing-library/react';
import type { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import settingsReducer, { type Language } from '@slices/settings-slice';
import { useTheme } from './theme-provider';

const createMockStore = (initialTheme: 'light' | 'dark' | 'system' = 'light') => {
  return configureStore({
    reducer: {
      settings: settingsReducer,
    },
    preloadedState: {
      settings: {
        theme: initialTheme,
        language: 'en' as Language,
        sidebarCollapsed: false,
      },
    },
  });
};

const createWrapper = (store: ReturnType<typeof createMockStore>) => {
  return ({ children }: { children: ReactNode }) => (
    <Provider store={store}>{children}</Provider>
  );
};

describe('theme/useTheme', () => {
  beforeEach(() => {
    document.documentElement.classList.remove('light', 'dark');
    window.matchMedia = vi.fn().mockReturnValue({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    });
  });

  it('should return current theme', () => {
    const store = createMockStore('dark');
    const wrapper = createWrapper(store);

    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(result.current.theme).toBe('dark');
  });

  it('should return isDark true when theme is dark', () => {
    const store = createMockStore('dark');
    const wrapper = createWrapper(store);

    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(result.current.isDark).toBe(true);
  });

  it('should toggle theme from light to dark', () => {
    const store = createMockStore('light');
    const wrapper = createWrapper(store);

    const { result } = renderHook(() => useTheme(), { wrapper });

    act(() => {
      result.current.toggleTheme();
    });

    expect(result.current.theme).toBe('dark');
  });

  it('should set theme mode directly', () => {
    const store = createMockStore('light');
    const wrapper = createWrapper(store);

    const { result } = renderHook(() => useTheme(), { wrapper });

    act(() => {
      result.current.setTheme('dark');
    });

    expect(result.current.theme).toBe('dark');
  });

  it('should provide setTheme function', () => {
    const store = createMockStore('light');
    const wrapper = createWrapper(store);

    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(typeof result.current.setTheme).toBe('function');
    expect(typeof result.current.toggleTheme).toBe('function');
  });
});
