import type { HTMLAttributes } from 'react';

export type ProgressBarSize = 'xs' | 'sm' | 'md' | 'lg';
export type ProgressBarColor = 'primary' | 'success' | 'warning' | 'error' | 'info';

export interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  /** Progress value (0-100) */
  value: number;
  /** Maximum value */
  max?: number;
  /** Progress bar size */
  size?: ProgressBarSize;
  /** Progress bar color */
  color?: ProgressBarColor;
  /** Show percentage label */
  showLabel?: boolean;
  /** Animated stripes */
  animated?: boolean;
  /** Indeterminate state */
  indeterminate?: boolean;
}

const sizeStyles: Record<ProgressBarSize, string> = {
  xs: 'h-1',
  sm: 'h-2',
  md: 'h-3',
  lg: 'h-4',
};

const colorStyles: Record<ProgressBarColor, string> = {
  primary: 'bg-primary-600',
  success: 'bg-success-500',
  warning: 'bg-warning-500',
  error: 'bg-error-500',
  info: 'bg-info-500',
};

export function ProgressBar({
  value,
  max = 100,
  size = 'md',
  color = 'primary',
  showLabel = false,
  animated = false,
  indeterminate = false,
  className = '',
  ...props
}: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={`w-full ${className}`} {...props}>
      {showLabel && !indeterminate && (
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Progress</span>
          <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">{Math.round(percentage)}%</span>
        </div>
      )}

      <div
        className={`
          w-full rounded-full overflow-hidden
          bg-neutral-200 dark:bg-neutral-700
          ${sizeStyles[size]}
        `}
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : percentage}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={`
            h-full rounded-full transition-all duration-300
            ${colorStyles[color]}
            ${animated ? 'bg-[length:1rem_1rem] bg-[linear-gradient(45deg,rgba(255,255,255,.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,.15)_50%,rgba(255,255,255,.15)_75%,transparent_75%,transparent)] animate-[progress-stripes_1s_linear_infinite]' : ''}
            ${indeterminate ? 'w-1/3 animate-[progress-indeterminate_1.5s_ease-in-out_infinite]' : ''}
          `}
          style={indeterminate ? undefined : { width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
