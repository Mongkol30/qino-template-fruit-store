import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { afterEach, vi } from 'vitest';
import { en } from '../locales/translations/en';

// Initialize i18n for testing with actual translations
i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

// Mock Redux store hooks
vi.mock('@stores/index', () => ({
  useAppDispatch: () => vi.fn(),
  useAppSelector: (selector: (state: unknown) => unknown) =>
    selector({
      auth: {
        user: null,
        isAuthenticated: false,
        isLoading: false,
      },
      settings: {
        theme: 'dark',
        language: 'en',
        sidebarCollapsed: false,
      },
    }),
}));

// Cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
});
