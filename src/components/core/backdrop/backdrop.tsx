import type { HTMLAttributes } from 'react';

export interface BackdropProps extends HTMLAttributes<HTMLDivElement> {
  /** Backdrop is visible */
  open: boolean;
  /** On click callback */
  onClick?: () => void;
  /** Blur effect */
  blur?: boolean;
  /** Opacity level */
  opacity?: 'light' | 'medium' | 'dark';
  /** Z-index */
  zIndex?: number;
}

const opacityStyles = {
  light: 'bg-black/25',
  medium: 'bg-black/50',
  dark: 'bg-black/75',
};

export function Backdrop({
  open,
  onClick,
  blur = false,
  opacity = 'medium',
  zIndex = 40,
  className = '',
  ...props
}: BackdropProps) {
  if (!open) return null;

  return (
    <div
      aria-hidden="true"
      onClick={onClick}
      className={`
        fixed inset-0 transition-opacity
        ${opacityStyles[opacity]}
        ${blur ? 'backdrop-blur-sm' : ''}
        ${className}
      `.trim()}
      style={{ zIndex }}
      {...props}
    />
  );
}
