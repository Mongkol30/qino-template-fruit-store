import type { HTMLAttributes, ReactNode } from 'react';
import { forwardRef } from 'react';

export interface PanelProps extends HTMLAttributes<HTMLDivElement> {
  /** Children elements */
  children: ReactNode;
  /** Panel title */
  title?: string;
  /** Panel subtitle */
  subtitle?: string;
  /** Header actions */
  actions?: ReactNode;
  /** Variant */
  variant?: 'default' | 'bordered' | 'elevated' | 'filled';
  /** Padding size */
  padding?: 'none' | 'sm' | 'md' | 'lg';
  /** Collapsible */
  collapsible?: boolean;
  /** Default collapsed state */
  defaultCollapsed?: boolean;
  /** Footer content */
  footer?: ReactNode;
  /** Additional class name */
  className?: string;
}

const variantStyles = {
  default: 'bg-white dark:bg-neutral-900',
  bordered: 'bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700',
  elevated: 'bg-white dark:bg-neutral-900 shadow-md',
  filled: 'bg-neutral-100 dark:bg-neutral-800',
};

const paddingStyles = {
  none: 'p-0',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
};

const headerPaddingStyles = {
  none: 'px-0 py-0',
  sm: 'px-3 py-2',
  md: 'px-4 py-3',
  lg: 'px-6 py-4',
};

export const Panel = forwardRef<HTMLDivElement, PanelProps>(
  (
    {
      children,
      title,
      subtitle,
      actions,
      variant = 'bordered',
      padding = 'md',
      collapsible = false,
      defaultCollapsed = false,
      footer,
      className = '',
      ...props
    },
    ref
  ) => {
    const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);

    const hasHeader = title || subtitle || actions;

    return (
      <div
        ref={ref}
        className={`
          rounded-lg overflow-hidden
          ${variantStyles[variant]}
          ${className}
        `}
        {...props}
      >
        {/* Header */}
        {hasHeader && (
          <div
            className={`
              flex items-center justify-between
              border-b border-neutral-200 dark:border-neutral-700
              ${headerPaddingStyles[padding]}
              ${collapsible ? 'cursor-pointer select-none' : ''}
            `}
            onClick={collapsible ? () => setIsCollapsed(!isCollapsed) : undefined}
          >
            <div className="flex-1">
              {title && (
                <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">{subtitle}</p>
              )}
            </div>
            <div className="flex items-center gap-2">
              {actions && <div onClick={(e) => e.stopPropagation()}>{actions}</div>}
              {collapsible && (
                <svg
                  className={`w-5 h-5 text-neutral-400 transition-transform ${isCollapsed ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              )}
            </div>
          </div>
        )}

        {/* Content */}
        {!isCollapsed && <div className={paddingStyles[padding]}>{children}</div>}

        {/* Footer */}
        {footer && !isCollapsed && (
          <div
            className={`
              border-t border-neutral-200 dark:border-neutral-700
              ${headerPaddingStyles[padding]}
            `}
          >
            {footer}
          </div>
        )}
      </div>
    );
  }
);

Panel.displayName = 'Panel';

import React from 'react';
