import type { HTMLAttributes, ReactNode } from 'react';
import { forwardRef } from 'react';
import { createPortal } from 'react-dom';

export interface OverlayProps extends HTMLAttributes<HTMLDivElement> {
  /** Whether overlay is visible */
  open: boolean;
  /** Children content */
  children?: ReactNode;
  /** On click callback */
  onClose?: () => void;
  /** Background opacity */
  opacity?: 'light' | 'medium' | 'dark';
  /** Blur effect */
  blur?: boolean;
  /** Z-index */
  zIndex?: number;
  /** Center content */
  center?: boolean;
  /** Lock body scroll */
  lockScroll?: boolean;
  /** Use portal */
  portal?: boolean;
  /** Additional class name */
  className?: string;
}

const opacityStyles = {
  light: 'bg-black/25',
  medium: 'bg-black/50',
  dark: 'bg-black/75',
};

export const Overlay = forwardRef<HTMLDivElement, OverlayProps>(
  (
    {
      open,
      children,
      onClose,
      opacity = 'medium',
      blur = false,
      zIndex = 40,
      center = true,
      lockScroll = true,
      portal = true,
      className = '',
      ...props
    },
    ref
  ) => {
    // Lock scroll effect
    if (typeof document !== 'undefined' && lockScroll) {
      if (open) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }

    if (!open) return null;

    const overlay = (
      <div
        ref={ref}
        onClick={onClose}
        className={`
          fixed inset-0 transition-opacity
          ${opacityStyles[opacity]}
          ${blur ? 'backdrop-blur-sm' : ''}
          ${center ? 'flex items-center justify-center' : ''}
          ${className}
        `}
        style={{ zIndex }}
        {...props}
      >
        {children && (
          <div onClick={(e) => e.stopPropagation()}>
            {children}
          </div>
        )}
      </div>
    );

    if (portal && typeof document !== 'undefined') {
      return createPortal(overlay, document.body);
    }

    return overlay;
  }
);

Overlay.displayName = 'Overlay';
