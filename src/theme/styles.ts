/**
 * Component Style Utilities
 * All styles use Tailwind's standard classes with custom theme colors
 *
 * The theme colors are defined in index.css using @theme directive,
 * so we can use: bg-primary-600, text-neutral-500, border-error-500, etc.
 *
 * Usage:
 *   import { buttonStyles, inputStyles, cardStyles } from '@/theme';
 *   <button className={buttonStyles.primary}>Click me</button>
 */

// ============================================
// BUTTON STYLES
// ============================================
export const buttonStyles = {
  base: `
    inline-flex items-center justify-center gap-2
    rounded-lg border font-medium
    transition-colors duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
  `,

  // Focus ring offset for dark mode
  focusRing: {
    light: 'focus:ring-offset-white focus:ring-primary-500',
    dark: 'focus:ring-offset-bg-dark focus:ring-primary-500',
  },

  variants: {
    // Primary - solid indigo, high contrast on both modes
    primary: 'bg-primary-600 text-white hover:bg-primary-700 border-transparent shadow-sm',
    // Secondary Light - gray bg contrasts with white page bg
    secondary: 'bg-neutral-200 text-neutral-800 hover:bg-neutral-300 border-neutral-300',
    // Secondary Dark - lighter gray contrasts with dark page bg
    secondaryDark: 'bg-neutral-700 text-neutral-100 hover:bg-neutral-600 border-neutral-600',
    // Outline Light
    outline: 'bg-transparent text-primary-600 border-primary-500 hover:bg-primary-600 hover:text-white',
    // Outline Dark
    outlineDark: 'bg-transparent text-primary-400 border-primary-400 hover:bg-primary-500 hover:text-white',
    // Ghost Light
    ghost: 'bg-transparent text-neutral-700 border-transparent hover:bg-neutral-100 hover:text-neutral-900',
    // Ghost Dark
    ghostDark: 'bg-transparent text-neutral-300 hover:bg-neutral-700 hover:text-white',
    // Danger
    danger: 'bg-error-600 text-white hover:bg-error-700 border-transparent shadow-sm',
  },

  sizes: {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg',
  },
} as const;

// ============================================
// INPUT/TEXTFIELD STYLES
// ============================================
export const inputStyles = {
  base: `
    w-full rounded-lg border
    transition-colors duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
  `,

  // Light mode - white input on white page, border provides contrast
  light: {
    bg: 'bg-white',
    text: 'text-neutral-900',
    placeholder: 'placeholder:text-neutral-400',
    border: 'border-neutral-300',
    focusBorder: 'focus:border-primary-500',
    focusRing: 'focus:ring-primary-500 focus:ring-offset-white',
  },

  // Dark mode - slightly lighter than page bg for contrast
  dark: {
    bg: 'bg-neutral-700',
    text: 'text-neutral-50',
    placeholder: 'placeholder:text-neutral-400',
    border: 'border-neutral-600',
    focusBorder: 'focus:border-primary-400',
    focusRing: 'focus:ring-primary-400 focus:ring-offset-bg-dark',
  },

  // Error state
  error: {
    border: 'border-error-500',
    focusBorder: 'focus:border-error-500',
    focusRing: 'focus:ring-error-500',
  },

  sizes: {
    sm: { input: 'px-3 py-1.5 text-sm', addon: 'px-2' },
    md: { input: 'px-4 py-2.5 text-base', addon: 'px-3' },
    lg: { input: 'px-4 py-3 text-lg', addon: 'px-4' },
  },

  label: {
    light: 'text-neutral-700',
    dark: 'text-neutral-200',
  },

  addon: {
    light: 'text-neutral-500',
    dark: 'text-neutral-400',
  },
} as const;

// ============================================
// CARD STYLES
// ============================================
export const cardStyles = {
  light: 'p-8 rounded-xl bg-white shadow-md border border-neutral-200',
  dark: 'bg-neutral-800 border-neutral-700 shadow-xl shadow-black/30',
} as const;

// ============================================
// LAYOUT/BACKGROUND STYLES
// ============================================
export const layoutStyles = {
  background: {
    light: 'bg-bg-light',
    dark: 'bg-bg-dark',
  },
  footer: {
    light: 'bg-neutral-100',
    dark: 'bg-neutral-900/80',
  },
  navbar: {
    light: 'bg-bg-light/95',
    dark: 'bg-bg-dark/95',
  },
} as const;

// ============================================
// TEXT STYLES
// ============================================
export const textStyles = {
  heading: {
    light: 'text-neutral-900',
    dark: 'text-neutral-50',
  },
  body: {
    light: 'text-neutral-700',
    dark: 'text-neutral-200',
  },
  muted: {
    light: 'text-neutral-500',
    dark: 'text-neutral-400',
  },
  link: {
    light: 'text-primary-600 hover:text-primary-500',
    dark: 'text-primary-400 hover:text-primary-300',
  },
} as const;

// ============================================
// COMBINED STYLE GETTERS
// ============================================

/**
 * Get button class string with variant and size
 */
export const getButtonClasses = (
  variant: keyof typeof buttonStyles.variants,
  size: keyof typeof buttonStyles.sizes = 'md',
  isDark = false
) => {
  const variantClass = buttonStyles.variants[variant];
  const sizeClass = buttonStyles.sizes[size];
  const focusOffset = isDark ? buttonStyles.focusRing.dark : buttonStyles.focusRing.light;

  return `${buttonStyles.base} ${variantClass} ${sizeClass} ${focusOffset}`.replace(/\s+/g, ' ').trim();
};

/**
 * Get input class string with state
 */
export const getInputClasses = (
  size: keyof typeof inputStyles.sizes = 'md',
  hasError = false,
  isDark = false
) => {
  const mode = isDark ? inputStyles.dark : inputStyles.light;
  const errorStyles = hasError ? inputStyles.error : null;

  const classes = [
    inputStyles.base,
    mode.bg,
    mode.text,
    mode.placeholder,
    errorStyles?.border ?? mode.border,
    errorStyles?.focusBorder ?? mode.focusBorder,
    errorStyles?.focusRing ?? mode.focusRing,
    inputStyles.sizes[size].input,
  ];

  return classes.join(' ').replace(/\s+/g, ' ').trim();
};

// ============================================
// DARK MODE AWARE UTILITIES
// ============================================

/**
 * Combine light and dark mode classes using Tailwind's dark: prefix
 * Example: tw('bg-white', 'bg-neutral-900') => 'bg-white dark:bg-neutral-900'
 */
export const twDark = (light: string, dark: string): string => {
  const darkClasses = dark
    .split(' ')
    .filter(Boolean)
    .map((cls) => `dark:${cls}`)
    .join(' ');
  return `${light} ${darkClasses}`;
};

/**
 * Common theme-aware class combinations
 */
export const themeClasses = {
  // Backgrounds - contrast with page bg
  pageBg: 'bg-bg-light dark:bg-bg-dark',
  cardBg: 'bg-white dark:bg-neutral-800',
  inputBg: 'bg-white dark:bg-neutral-700',
  navbarBg: 'bg-bg-light/95 dark:bg-bg-dark/95',
  footerBg: 'bg-neutral-100 dark:bg-neutral-900/80',

  // Text - good contrast with backgrounds
  textHeading: 'text-neutral-900 dark:text-neutral-50',
  textBody: 'text-neutral-700 dark:text-neutral-200',
  textMuted: 'text-neutral-500 dark:text-neutral-400',
  textLink: 'text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300',

  // Borders - visible on both light/dark
  borderDefault: 'border-neutral-300 dark:border-neutral-600',
  borderLight: 'border-neutral-200 dark:border-neutral-700',
  borderAccent: 'border-primary-500 dark:border-primary-400',

  // Focus rings
  focusRing: 'focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-bg-dark',
} as const;
