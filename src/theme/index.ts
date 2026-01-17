/**
 * Tailwind Theme Exports
 */

// Color constants (hex values for inline styles)
export {
    background, colors, error,
    info, neutral, pink, primary,
    secondary, success, tw,
    warning
} from './colors';

// Style utilities (Tailwind class strings)
export {
    buttonStyles, cardStyles, getButtonClasses,
    getInputClasses, inputStyles, layoutStyles,
    textStyles, themeClasses, twDark
} from './styles';
export { ThemeProvider, useTheme } from './theme-provider';
export type { ThemeMode } from './theme-provider';

