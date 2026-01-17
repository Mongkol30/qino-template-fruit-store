/**
 * Tailwind Theme Colors
 * Centralized color definitions for the application
 *
 * These hex values are synced with index.css @theme configuration.
 * In components, use Tailwind classes directly: bg-primary-600, text-neutral-500, etc.
 *
 * For inline styles or programmatic access, use these values:
 *   import { colors } from '@/theme';
 *   style={{ backgroundColor: colors.primary[600] }}
 */

// Background colors
export const background = {
  light: '#FFFFFF',
  dark: '#020618',
} as const;

// Primary - Indigo
export const primary = {
  50: '#EEF2FF',
  100: '#E0E7FF',
  200: '#C7D2FE',
  300: '#A5B4FC',
  400: '#818CF8',
  500: '#6366F1',
  600: '#4F46E5',
  700: '#4338CA',
  800: '#3730A3',
  900: '#312E81',
  950: '#1E1B4B',
} as const;

// Secondary - Purple/Violet
export const secondary = {
  50: '#F5F3FF',
  100: '#EDE9FE',
  200: '#DDD6FE',
  300: '#C4B5FD',
  400: '#A78BFA',
  500: '#8B5CF6',
  600: '#7C3AED',
  700: '#6D28D9',
  800: '#5B21B6',
  900: '#4C1D95',
  950: '#2E1065',
} as const;

// Neutral - Slate
export const neutral = {
  50: '#F8FAFC',
  100: '#F1F5F9',
  200: '#E2E8F0',
  300: '#CBD5E1',
  400: '#94A3B8',
  500: '#64748B',
  600: '#475569',
  700: '#334155',
  800: '#1E293B',
  900: '#0F172A',
  950: '#020617',
} as const;

// Semantic colors
export const success = {
  50: '#F0FDF4',
  100: '#DCFCE7',
  200: '#BBF7D0',
  300: '#86EFAC',
  400: '#4ADE80',
  500: '#22C55E',
  600: '#16A34A',
  700: '#15803D',
  800: '#166534',
  900: '#14532D',
} as const;

export const warning = {
  50: '#FFFBEB',
  100: '#FEF3C7',
  200: '#FDE68A',
  300: '#FCD34D',
  400: '#FBBF24',
  500: '#F59E0B',
  600: '#D97706',
  700: '#B45309',
  800: '#92400E',
  900: '#78350F',
} as const;

export const error = {
  50: '#FEF2F2',
  100: '#FEE2E2',
  200: '#FECACA',
  300: '#FCA5A5',
  400: '#F87171',
  500: '#EF4444',
  600: '#DC2626',
  700: '#B91C1C',
  800: '#991B1B',
  900: '#7F1D1D',
} as const;

export const info = {
  50: '#EFF6FF',
  100: '#DBEAFE',
  200: '#BFDBFE',
  300: '#93C5FD',
  400: '#60A5FA',
  500: '#3B82F6',
  600: '#2563EB',
  700: '#1D4ED8',
  800: '#1E40AF',
  900: '#1E3A8A',
} as const;

// Pink - for gradients and accents
export const pink = {
  50: '#FDF2F8',
  100: '#FCE7F3',
  200: '#FBCFE8',
  300: '#F9A8D4',
  400: '#F472B6',
  500: '#EC4899',
  600: '#DB2777',
  700: '#BE185D',
  800: '#9D174D',
  900: '#831843',
} as const;

// Combined colors object for easy import
export const colors = {
  background,
  primary,
  secondary,
  neutral,
  success,
  warning,
  error,
  info,
  pink,
} as const;

/**
 * Tailwind Class Names for theme colors
 * Use these in className - Tailwind will detect them at build time
 *
 * Example:
 *   import { tw } from '@/theme';
 *   className={`${tw.bg.primary[600]} ${tw.text.neutral[100]}`}
 */
export const tw = {
  bg: {
    light: 'bg-bg-light',
    dark: 'bg-bg-dark',
    primary: {
      50: 'bg-primary-50', 100: 'bg-primary-100', 200: 'bg-primary-200',
      300: 'bg-primary-300', 400: 'bg-primary-400', 500: 'bg-primary-500',
      600: 'bg-primary-600', 700: 'bg-primary-700', 800: 'bg-primary-800',
      900: 'bg-primary-900', 950: 'bg-primary-950',
    },
    secondary: {
      50: 'bg-secondary-50', 100: 'bg-secondary-100', 200: 'bg-secondary-200',
      300: 'bg-secondary-300', 400: 'bg-secondary-400', 500: 'bg-secondary-500',
      600: 'bg-secondary-600', 700: 'bg-secondary-700', 800: 'bg-secondary-800',
      900: 'bg-secondary-900', 950: 'bg-secondary-950',
    },
    neutral: {
      50: 'bg-neutral-50', 100: 'bg-neutral-100', 200: 'bg-neutral-200',
      300: 'bg-neutral-300', 400: 'bg-neutral-400', 500: 'bg-neutral-500',
      600: 'bg-neutral-600', 700: 'bg-neutral-700', 800: 'bg-neutral-800',
      900: 'bg-neutral-900', 950: 'bg-neutral-950',
    },
    success: {
      50: 'bg-success-50', 100: 'bg-success-100', 200: 'bg-success-200',
      300: 'bg-success-300', 400: 'bg-success-400', 500: 'bg-success-500',
      600: 'bg-success-600', 700: 'bg-success-700', 800: 'bg-success-800',
      900: 'bg-success-900',
    },
    warning: {
      50: 'bg-warning-50', 100: 'bg-warning-100', 200: 'bg-warning-200',
      300: 'bg-warning-300', 400: 'bg-warning-400', 500: 'bg-warning-500',
      600: 'bg-warning-600', 700: 'bg-warning-700', 800: 'bg-warning-800',
      900: 'bg-warning-900',
    },
    error: {
      50: 'bg-error-50', 100: 'bg-error-100', 200: 'bg-error-200',
      300: 'bg-error-300', 400: 'bg-error-400', 500: 'bg-error-500',
      600: 'bg-error-600', 700: 'bg-error-700', 800: 'bg-error-800',
      900: 'bg-error-900',
    },
    info: {
      50: 'bg-info-50', 100: 'bg-info-100', 200: 'bg-info-200',
      300: 'bg-info-300', 400: 'bg-info-400', 500: 'bg-info-500',
      600: 'bg-info-600', 700: 'bg-info-700', 800: 'bg-info-800',
      900: 'bg-info-900',
    },
  },
  text: {
    primary: {
      50: 'text-primary-50', 100: 'text-primary-100', 200: 'text-primary-200',
      300: 'text-primary-300', 400: 'text-primary-400', 500: 'text-primary-500',
      600: 'text-primary-600', 700: 'text-primary-700', 800: 'text-primary-800',
      900: 'text-primary-900', 950: 'text-primary-950',
    },
    secondary: {
      50: 'text-secondary-50', 100: 'text-secondary-100', 200: 'text-secondary-200',
      300: 'text-secondary-300', 400: 'text-secondary-400', 500: 'text-secondary-500',
      600: 'text-secondary-600', 700: 'text-secondary-700', 800: 'text-secondary-800',
      900: 'text-secondary-900', 950: 'text-secondary-950',
    },
    neutral: {
      50: 'text-neutral-50', 100: 'text-neutral-100', 200: 'text-neutral-200',
      300: 'text-neutral-300', 400: 'text-neutral-400', 500: 'text-neutral-500',
      600: 'text-neutral-600', 700: 'text-neutral-700', 800: 'text-neutral-800',
      900: 'text-neutral-900', 950: 'text-neutral-950',
    },
    success: {
      50: 'text-success-50', 100: 'text-success-100', 200: 'text-success-200',
      300: 'text-success-300', 400: 'text-success-400', 500: 'text-success-500',
      600: 'text-success-600', 700: 'text-success-700', 800: 'text-success-800',
      900: 'text-success-900',
    },
    warning: {
      50: 'text-warning-50', 100: 'text-warning-100', 200: 'text-warning-200',
      300: 'text-warning-300', 400: 'text-warning-400', 500: 'text-warning-500',
      600: 'text-warning-600', 700: 'text-warning-700', 800: 'text-warning-800',
      900: 'text-warning-900',
    },
    error: {
      50: 'text-error-50', 100: 'text-error-100', 200: 'text-error-200',
      300: 'text-error-300', 400: 'text-error-400', 500: 'text-error-500',
      600: 'text-error-600', 700: 'text-error-700', 800: 'text-error-800',
      900: 'text-error-900',
    },
    info: {
      50: 'text-info-50', 100: 'text-info-100', 200: 'text-info-200',
      300: 'text-info-300', 400: 'text-info-400', 500: 'text-info-500',
      600: 'text-info-600', 700: 'text-info-700', 800: 'text-info-800',
      900: 'text-info-900',
    },
  },
  border: {
    primary: {
      200: 'border-primary-200', 300: 'border-primary-300', 400: 'border-primary-400',
      500: 'border-primary-500', 600: 'border-primary-600', 700: 'border-primary-700',
    },
    neutral: {
      100: 'border-neutral-100', 200: 'border-neutral-200', 300: 'border-neutral-300',
      600: 'border-neutral-600', 700: 'border-neutral-700', 800: 'border-neutral-800',
    },
    error: {
      500: 'border-error-500', 600: 'border-error-600',
    },
  },
  ring: {
    primary: {
      500: 'ring-primary-500', 600: 'ring-primary-600',
    },
    error: {
      500: 'ring-error-500',
    },
  },
} as const;

export type ThemeColors = typeof colors;
