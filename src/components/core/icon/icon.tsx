import type { SVGAttributes } from 'react';

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type IconColor = 'inherit' | 'default' | 'muted' | 'primary' | 'success' | 'warning' | 'error';

export interface IconProps extends SVGAttributes<SVGSVGElement> {
  /** Icon name or custom SVG path */
  name?: string;
  /** Icon size */
  size?: IconSize;
  /** Icon color */
  color?: IconColor;
  /** Custom children (SVG paths) */
  children?: React.ReactNode;
}

const sizeStyles: Record<IconSize, string> = {
  xs: 'h-3 w-3',
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
  xl: 'h-8 w-8',
};

const colorStyles: Record<IconColor, string> = {
  inherit: 'text-inherit',
  default: 'text-neutral-900 dark:text-neutral-100',
  muted: 'text-neutral-500 dark:text-neutral-400',
  primary: 'text-primary-600 dark:text-primary-400',
  success: 'text-success-600 dark:text-success-400',
  warning: 'text-warning-600 dark:text-warning-400',
  error: 'text-error-600 dark:text-error-400',
};

// Common icons
const iconPaths: Record<string, string> = {
  check: 'M5 13l4 4L19 7',
  x: 'M6 18L18 6M6 6l12 12',
  plus: 'M12 4v16m8-8H4',
  minus: 'M20 12H4',
  chevronDown: 'M19 9l-7 7-7-7',
  chevronUp: 'M5 15l7-7 7 7',
  chevronLeft: 'M15 19l-7-7 7-7',
  chevronRight: 'M9 5l7 7-7 7',
  search: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
  menu: 'M4 6h16M4 12h16M4 18h16',
  close: 'M6 18L18 6M6 6l12 12',
  info: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  warning: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
  error: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z',
  success: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
  eye: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z',
  eyeOff: 'M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21',
  user: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
  settings: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
  home: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
  logout: 'M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1',
  loading: 'M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z',
};

export function Icon({
  name,
  size = 'md',
  color = 'inherit',
  children,
  className = '',
  ...props
}: IconProps) {
  const pathData = name ? iconPaths[name] : null;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      className={`
        ${sizeStyles[size]}
        ${colorStyles[color]}
        ${name === 'loading' ? 'animate-spin' : ''}
        ${className}
      `.trim()}
      {...props}
    >
      {children ?? (
        pathData && (
          <path strokeLinecap="round" strokeLinejoin="round" d={pathData} />
        )
      )}
    </svg>
  );
}

// Export icon names for type safety
export const iconNames = Object.keys(iconPaths) as Array<keyof typeof iconPaths>;
export type IconName = keyof typeof iconPaths;
