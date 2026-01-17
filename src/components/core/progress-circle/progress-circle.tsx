import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';

export interface ProgressCircleProps extends Omit<HTMLAttributes<SVGSVGElement>, 'children'> {
  /** Progress value (0-100) */
  value: number;
  /** Size in pixels */
  size?: number;
  /** Stroke width */
  strokeWidth?: number;
  /** Color variant */
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  /** Show percentage text */
  showValue?: boolean;
  /** Custom label */
  label?: string;
  /** Indeterminate state */
  indeterminate?: boolean;
  /** Additional class name */
  className?: string;
}

const colorStyles = {
  primary: 'text-primary-500',
  secondary: 'text-secondary-500',
  success: 'text-success-500',
  warning: 'text-warning-500',
  error: 'text-error-500',
  info: 'text-info-500',
};

export const ProgressCircle = forwardRef<SVGSVGElement, ProgressCircleProps>(
  (
    {
      value,
      size = 48,
      strokeWidth = 4,
      color = 'primary',
      showValue = false,
      label,
      indeterminate = false,
      className = '',
      ...props
    },
    ref
  ) => {
    const normalizedValue = Math.min(100, Math.max(0, value));
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (normalizedValue / 100) * circumference;

    return (
      <div className={`relative inline-flex items-center justify-center ${className}`}>
        <svg
          ref={ref}
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className={indeterminate ? 'animate-spin' : ''}
          {...props}
        >
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            strokeWidth={strokeWidth}
            className="stroke-neutral-200 dark:stroke-neutral-700"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={indeterminate ? circumference * 0.75 : offset}
            className={`${colorStyles[color]} transition-all duration-300 ease-out`}
            style={{
              transform: 'rotate(-90deg)',
              transformOrigin: '50% 50%',
            }}
          />
        </svg>
        {/* Center text */}
        {(showValue || label) && !indeterminate && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ fontSize: size * 0.25 }}
          >
            <span className="font-medium text-neutral-900 dark:text-neutral-100">
              {label || `${Math.round(normalizedValue)}%`}
            </span>
          </div>
        )}
      </div>
    );
  }
);

ProgressCircle.displayName = 'ProgressCircle';
