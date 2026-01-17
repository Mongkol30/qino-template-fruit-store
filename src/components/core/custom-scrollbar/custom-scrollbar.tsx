import { OverlayScrollbarsComponent, type OverlayScrollbarsComponentRef } from 'overlayscrollbars-react';
import 'overlayscrollbars/overlayscrollbars.css';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { forwardRef } from 'react';

// ============ Types ============
export interface CustomScrollbarProps extends Omit<ComponentPropsWithoutRef<'div'>, 'children'> {
  /** Children */
  children: ReactNode;
  /** Auto hide scrollbar */
  autoHide?: boolean;
  /** Force visible scrollbar */
  forceVisible?: boolean | 'x' | 'y';
  /** Click on track to scroll */
  clickOnTrack?: boolean;
  /** Custom class for scrollbar */
  scrollbarClassName?: string;
  /** Max height */
  maxHeight?: string | number;
  /** Enable smooth scroll */
  smoothScroll?: boolean;
}

// ============ Component ============
export const CustomScrollbar = forwardRef<OverlayScrollbarsComponentRef<'div'>, CustomScrollbarProps>(
  (
    {
      children,
      autoHide = false,
      forceVisible = false,
      clickOnTrack = true,
      scrollbarClassName,
      maxHeight,
      className = '',
      smoothScroll = true,
      style,
      ...props
    },
    ref
  ) => {
    return (
      <OverlayScrollbarsComponent
        ref={ref}
        className={`custom-scrollbar ${scrollbarClassName || ''}`}
        style={{
          maxHeight: maxHeight,
          ...style,
        }}
        options={{
          scrollbars: {
            autoHide: autoHide ? 'scroll' : 'never',
            autoHideDelay: 800,
            clickScroll: clickOnTrack,
            visibility: forceVisible ? 'visible' : 'auto',
            theme: 'os-theme-custom',
          },
          overflow: {
            x: 'hidden',
            y: 'scroll',
          },
        }}
        defer
        {...props}
      >
        <div className={className}>{children}</div>
      </OverlayScrollbarsComponent>
    );
  }
);

CustomScrollbar.displayName = 'CustomScrollbar';

// ============ Scrollbar Styles Component ============
export function ScrollbarStyles() {
  return (
    <style>{`
      /* OverlayScrollbars Custom Theme */
      .os-theme-custom {
        --os-size: 10px;
        --os-padding-perpendicular: 2px;
        --os-padding-axis: 2px;
        --os-track-border-radius: 10px;
        --os-handle-border-radius: 10px;
        --os-handle-bg: var(--color-neutral-400);
        --os-handle-bg-hover: var(--color-neutral-500);
        --os-handle-bg-active: var(--color-neutral-600);
      }

      .dark .os-theme-custom {
        --os-handle-bg: var(--color-neutral-500);
        --os-handle-bg-hover: var(--color-neutral-400);
        --os-handle-bg-active: var(--color-neutral-300);
      }

      /* Smooth scroll behavior */
      .custom-scrollbar [data-overlayscrollbars-viewport] {
        scroll-behavior: smooth;
      }

      /* Track styling */
      .os-theme-custom .os-scrollbar-track {
        background: transparent;
      }

      .os-theme-custom .os-scrollbar-handle {
        opacity: 0.7;
        transition: opacity 0.2s ease, background 0.2s ease;
      }

      .os-theme-custom:hover .os-scrollbar-handle,
      .os-theme-custom .os-scrollbar-handle:hover {
        opacity: 1;
      }

      /* Hide native scrollbar globally when using custom scrollbar */
      .hide-native-scrollbar {
        scrollbar-width: none;
        -ms-overflow-style: none;
      }

      .hide-native-scrollbar::-webkit-scrollbar {
        display: none;
      }
    `}</style>
  );
}
