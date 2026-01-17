import { describe, expect, it } from 'vitest';

import settingsReducer, {
    setLanguage,
    setSidebarCollapsed,
    setTheme,
    toggleSidebar,
    type SettingsState,
} from './settings-slice';

const initialState: SettingsState = {
  theme: 'dark',
  language: 'en',
  sidebarCollapsed: false,
};

describe('slices/settingsSlice', () => {
  it('should return the initial state', () => {
    expect(settingsReducer(undefined, { type: 'unknown' })).toEqual(
      initialState,
    );
  });

  it('should handle setTheme', () => {
    const actual = settingsReducer(initialState, setTheme('light'));
    expect(actual.theme).toBe('light');
  });

  it('should handle setLanguage', () => {
    const actual = settingsReducer(initialState, setLanguage('th'));
    expect(actual.language).toBe('th');
  });

  it('should handle toggleSidebar', () => {
    const actual = settingsReducer(initialState, toggleSidebar());
    expect(actual.sidebarCollapsed).toBe(true);

    const toggled = settingsReducer(actual, toggleSidebar());
    expect(toggled.sidebarCollapsed).toBe(false);
  });

  it('should handle setSidebarCollapsed', () => {
    const actual = settingsReducer(initialState, setSidebarCollapsed(true));
    expect(actual.sidebarCollapsed).toBe(true);
  });
});
