import { useEffect, type FC, type ReactNode } from 'react';

import { setTheme } from '@slices/settings-slice';
import { useAppDispatch, useAppSelector } from '@stores/index';

export type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeProviderProps {
  children: ReactNode;
}

/**
 * ThemeProvider - Manages dark/light mode for Tailwind CSS
 * Syncs with Redux store and applies theme class to document
 */
export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const { theme } = useAppSelector((state) => state.settings);

  useEffect(() => {
    const root = window.document.documentElement;

    // Remove existing theme classes
    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      // Use system preference
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  }, [theme]);

  // Listen for system theme changes when in 'system' mode
  useEffect(() => {
    if (theme !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e: MediaQueryListEvent) => {
      const root = window.document.documentElement;
      root.classList.remove('light', 'dark');
      root.classList.add(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  return <>{children}</>;
};

/**
 * useTheme hook - Access and control theme mode
 */
export const useTheme = () => {
  const dispatch = useAppDispatch();
  const { theme } = useAppSelector((state) => state.settings);

  const setThemeMode = (mode: ThemeMode) => {
    dispatch(setTheme(mode));
  };

  const toggleTheme = () => {
    if (theme === 'dark') {
      dispatch(setTheme('light'));
    } else if (theme === 'light') {
      dispatch(setTheme('dark'));
    } else {
      // If system, toggle to the opposite of current system preference
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      dispatch(setTheme(isDark ? 'light' : 'dark'));
    }
  };

  const isDark =
    theme === 'dark' ||
    (theme === 'system' &&
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches);

  return {
    theme,
    isDark,
    setTheme: setThemeMode,
    toggleTheme,
  };
};
