import type { ReactNode } from 'react';

export type TimelinePosition = 'left' | 'right' | 'alternate';

export interface TimelineItemData {
  /** Unique key */
  key: string;
  /** Item title */
  title: ReactNode;
  /** Item description */
  description?: ReactNode;
  /** Item date/time */
  date?: ReactNode;
  /** Custom icon */
  icon?: ReactNode;
  /** Icon color */
  color?: 'primary' | 'success' | 'warning' | 'error' | 'info' | 'neutral';
}

export interface TimelineProps {
  /** Timeline items */
  items: TimelineItemData[];
  /** Content position */
  position?: TimelinePosition;
  /** Additional class name */
  className?: string;
}

const colorStyles = {
  primary: 'bg-primary-600',
  success: 'bg-success-500',
  warning: 'bg-warning-500',
  error: 'bg-error-500',
  info: 'bg-info-500',
  neutral: 'bg-neutral-400 dark:bg-neutral-600',
};

export function Timeline({
  items,
  position = 'left',
  className = '',
}: TimelineProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Center line for alternate */}
      {position === 'alternate' && (
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-neutral-200 dark:bg-neutral-700 -translate-x-1/2" />
      )}

      {items.map((item, index) => {
        const isLeft = position === 'left' || (position === 'alternate' && index % 2 === 0);
        const color = item.color || 'primary';

        return (
          <div
            key={item.key}
            className={`
              relative flex
              ${position === 'alternate' ? 'justify-center' : ''}
              ${index !== items.length - 1 ? 'pb-8' : ''}
            `}
          >
            {/* Left line (for non-alternate) */}
            {position === 'left' && (
              <div className="absolute left-3 top-3 bottom-0 w-0.5 bg-neutral-200 dark:bg-neutral-700" />
            )}

            {/* Content wrapper */}
            <div
              className={`
                flex items-start gap-4
                ${position === 'alternate' ? 'w-1/2' : 'w-full'}
                ${position === 'alternate' && !isLeft ? 'flex-row-reverse ml-auto pl-8' : ''}
                ${position === 'alternate' && isLeft ? 'pr-8' : ''}
              `}
            >
              {/* Icon/dot */}
              <div
                className={`
                  relative z-10 flex-shrink-0 w-6 h-6 rounded-full
                  flex items-center justify-center
                  ${colorStyles[color]}
                  ${position === 'alternate' ? 'order-first' : ''}
                `}
              >
                {item.icon ? (
                  <span className="text-white w-4 h-4">{item.icon}</span>
                ) : (
                  <span className="w-2 h-2 rounded-full bg-white" />
                )}
              </div>

              {/* Content */}
              <div className={`flex-1 ${position === 'alternate' && !isLeft ? 'text-right' : ''}`}>
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="text-sm font-semibold text-neutral-900 dark:text-white">
                    {item.title}
                  </h4>
                  {item.date && (
                    <span className="text-xs text-neutral-500 dark:text-neutral-400">
                      {item.date}
                    </span>
                  )}
                </div>
                {item.description && (
                  <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
