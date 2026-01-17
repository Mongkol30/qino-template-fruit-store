import type { HTMLAttributes, ReactNode } from 'react';

export interface StatisticProps extends Omit<HTMLAttributes<HTMLDivElement>, 'prefix'> {
  /** Statistic label */
  label: string;
  /** Statistic value */
  value: string | number;
  /** Prefix (icon or text) */
  prefix?: ReactNode;
  /** Suffix (unit text) */
  suffix?: ReactNode;
  /** Help text or description */
  helpText?: string;
  /** Trend indicator */
  trend?: {
    value: number;
    direction: 'up' | 'down';
  };
  /** Loading state */
  loading?: boolean;
}

export function Statistic({
  label,
  value,
  prefix,
  suffix,
  helpText,
  trend,
  loading = false,
  className = '',
  ...props
}: StatisticProps) {
  return (
    <div className={`${className}`} {...props}>
      <dt className="text-sm font-medium text-neutral-500 dark:text-neutral-400 truncate">
        {label}
      </dt>
      <dd className="mt-1 flex items-baseline gap-2">
        {loading ? (
          <div className="h-8 w-24 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse" />
        ) : (
          <>
            {prefix && (
              <span className="text-neutral-500 dark:text-neutral-400">{prefix}</span>
            )}
            <span className="text-2xl font-semibold text-neutral-900 dark:text-white">
              {value}
            </span>
            {suffix && (
              <span className="text-sm text-neutral-500 dark:text-neutral-400">{suffix}</span>
            )}
            {trend && (
              <span
                className={`
                  inline-flex items-center text-sm font-medium
                  ${trend.direction === 'up' ? 'text-success-600 dark:text-success-400' : 'text-error-600 dark:text-error-400'}
                `}
              >
                {trend.direction === 'up' ? (
                  <svg className="w-4 h-4 mr-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 mr-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
                {Math.abs(trend.value)}%
              </span>
            )}
          </>
        )}
      </dd>
      {helpText && (
        <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">{helpText}</p>
      )}
    </div>
  );
}
