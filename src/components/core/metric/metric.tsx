import type { HTMLAttributes, ReactNode } from 'react';
import { forwardRef } from 'react';

export interface MetricProps extends HTMLAttributes<HTMLDivElement> {
  /** Metric label */
  label: string;
  /** Metric value */
  value: string | number;
  /** Previous value for comparison */
  previousValue?: number;
  /** Prefix (e.g., $, €) */
  prefix?: string;
  /** Suffix (e.g., %, users) */
  suffix?: string;
  /** Icon */
  icon?: ReactNode;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Trend direction */
  trend?: 'up' | 'down' | 'neutral';
  /** Trend value (e.g., "+12%") */
  trendValue?: string;
  /** Color variant */
  color?: 'default' | 'primary' | 'success' | 'warning' | 'error';
  /** Loading state */
  loading?: boolean;
  /** Additional class name */
  className?: string;
}

const sizeStyles = {
  sm: {
    value: 'text-xl',
    label: 'text-xs',
    icon: 'w-8 h-8',
  },
  md: {
    value: 'text-3xl',
    label: 'text-sm',
    icon: 'w-10 h-10',
  },
  lg: {
    value: 'text-4xl',
    label: 'text-base',
    icon: 'w-12 h-12',
  },
};

const colorStyles = {
  default: 'text-neutral-900 dark:text-neutral-100',
  primary: 'text-primary-600 dark:text-primary-400',
  success: 'text-success-600 dark:text-success-400',
  warning: 'text-warning-600 dark:text-warning-400',
  error: 'text-error-600 dark:text-error-400',
};

const trendStyles = {
  up: 'text-success-600 dark:text-success-400',
  down: 'text-error-600 dark:text-error-400',
  neutral: 'text-neutral-500',
};

export const Metric = forwardRef<HTMLDivElement, MetricProps>(
  (
    {
      label,
      value,
      previousValue,
      prefix,
      suffix,
      icon,
      size = 'md',
      trend,
      trendValue,
      color = 'default',
      loading = false,
      className = '',
      ...props
    },
    ref
  ) => {
    const styles = sizeStyles[size];

    // Calculate trend if previousValue is provided
    const calculatedTrend = trend || (previousValue !== undefined
      ? typeof value === 'number'
        ? value > previousValue
          ? 'up'
          : value < previousValue
            ? 'down'
            : 'neutral'
        : 'neutral'
      : undefined);

    const calculatedTrendValue = trendValue || (previousValue !== undefined && typeof value === 'number'
      ? previousValue !== 0
        ? `${((value - previousValue) / previousValue * 100).toFixed(1)}%`
        : ''
      : '');

    if (loading) {
      return (
        <div ref={ref} className={`animate-pulse ${className}`} {...props}>
          <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-20 mb-2" />
          <div className="h-8 bg-neutral-200 dark:bg-neutral-700 rounded w-32" />
        </div>
      );
    }

    return (
      <div ref={ref} className={`${className}`} {...props}>
        <div className="flex items-start gap-3">
          {/* Icon */}
          {icon && (
            <div
              className={`
                ${styles.icon} flex items-center justify-center rounded-lg
                bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400
              `}
            >
              {icon}
            </div>
          )}

          <div className="flex-1">
            {/* Label */}
            <div className={`${styles.label} text-neutral-500 dark:text-neutral-400 mb-1`}>
              {label}
            </div>

            {/* Value */}
            <div className={`${styles.value} font-semibold ${colorStyles[color]} flex items-baseline gap-1`}>
              {prefix && <span className="text-neutral-500">{prefix}</span>}
              <span>{value}</span>
              {suffix && <span className="text-neutral-500 text-lg">{suffix}</span>}
            </div>

            {/* Trend */}
            {calculatedTrend && (
              <div className={`flex items-center gap-1 mt-1 text-sm ${trendStyles[calculatedTrend]}`}>
                {calculatedTrend === 'up' && (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                )}
                {calculatedTrend === 'down' && (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                )}
                {calculatedTrend === 'neutral' && (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
                  </svg>
                )}
                {calculatedTrendValue && <span>{calculatedTrendValue}</span>}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);

Metric.displayName = 'Metric';
