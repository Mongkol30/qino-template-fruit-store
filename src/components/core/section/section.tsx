import type { HTMLAttributes, ReactNode } from 'react';
import { forwardRef } from 'react';

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  /** Children elements */
  children: ReactNode;
  /** Section title */
  title?: string;
  /** Section subtitle/description */
  description?: string;
  /** Actions/buttons to show in header */
  actions?: ReactNode;
  /** Size/spacing variant */
  size?: 'sm' | 'md' | 'lg';
  /** Whether to show a divider below header */
  divider?: boolean;
  /** Additional class name */
  className?: string;
}

const sizeStyles = {
  sm: {
    wrapper: 'py-4',
    title: 'text-lg',
    gap: 'gap-3',
  },
  md: {
    wrapper: 'py-6',
    title: 'text-xl',
    gap: 'gap-4',
  },
  lg: {
    wrapper: 'py-8',
    title: 'text-2xl',
    gap: 'gap-6',
  },
};

export const Section = forwardRef<HTMLElement, SectionProps>(
  (
    {
      children,
      title,
      description,
      actions,
      size = 'md',
      divider = false,
      className = '',
      ...props
    },
    ref
  ) => {
    const styles = sizeStyles[size];
    const hasHeader = title || description || actions;

    return (
      <section ref={ref} className={`${styles.wrapper} ${className}`} {...props}>
        {hasHeader && (
          <div
            className={`
              flex flex-col sm:flex-row sm:items-center sm:justify-between
              ${styles.gap} mb-4
              ${divider ? 'pb-4 border-b border-neutral-200 dark:border-neutral-700' : ''}
            `}
          >
            <div>
              {title && (
                <h2
                  className={`${styles.title} font-semibold text-neutral-900 dark:text-neutral-100`}
                >
                  {title}
                </h2>
              )}
              {description && (
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">{description}</p>
              )}
            </div>
            {actions && <div className="flex items-center gap-2">{actions}</div>}
          </div>
        )}
        {children}
      </section>
    );
  }
);

Section.displayName = 'Section';
