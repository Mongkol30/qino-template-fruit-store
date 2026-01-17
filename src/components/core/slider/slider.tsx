import type { HTMLAttributes } from 'react';
import { useId } from 'react';

export interface SliderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Current value */
  value: number;
  /** On change callback */
  onChange: (value: number) => void;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step value */
  step?: number;
  /** Disabled state */
  disabled?: boolean;
  /** Show value label */
  showValue?: boolean;
  /** Show min/max labels */
  showRange?: boolean;
  /** Size */
  size?: 'sm' | 'md' | 'lg';
  /** Label */
  label?: string;
}

const sizeStyles = {
  sm: {
    track: 'h-1',
    thumb: 'h-3 w-3',
  },
  md: {
    track: 'h-2',
    thumb: 'h-4 w-4',
  },
  lg: {
    track: 'h-3',
    thumb: 'h-5 w-5',
  },
};

export function Slider({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  showValue = false,
  showRange = false,
  size = 'md',
  label,
  className = '',
  ...props
}: SliderProps) {
  const id = useId();
  const percentage = ((value - min) / (max - min)) * 100;
  const styles = sizeStyles[size];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  };

  return (
    <div className={className} {...props}>
      {/* Label and value */}
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-2">
          {label && (
            <label
              htmlFor={id}
              className="text-sm font-medium text-neutral-700 dark:text-neutral-300"
            >
              {label}
            </label>
          )}
          {showValue && (
            <span className="text-sm font-medium text-neutral-900 dark:text-white">
              {value}
            </span>
          )}
        </div>
      )}

      {/* Slider */}
      <div className="relative flex items-center">
        {/* Track background */}
        <div
          className={`
            absolute w-full rounded-full bg-neutral-200 dark:bg-neutral-700
            ${styles.track}
          `}
        />

        {/* Track fill */}
        <div
          className={`
            absolute rounded-full bg-primary-600
            ${styles.track}
            ${disabled ? 'opacity-50' : ''}
          `}
          style={{ width: `${percentage}%` }}
        />

        {/* Native input (for accessibility) */}
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          disabled={disabled}
          className={`
            relative w-full appearance-none bg-transparent cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:${styles.thumb}
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-white
            [&::-webkit-slider-thumb]:border-2
            [&::-webkit-slider-thumb]:border-primary-600
            [&::-webkit-slider-thumb]:shadow-md
            [&::-webkit-slider-thumb]:transition-transform
            [&::-webkit-slider-thumb]:hover:scale-110
            [&::-moz-range-thumb]:${styles.thumb}
            [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:bg-white
            [&::-moz-range-thumb]:border-2
            [&::-moz-range-thumb]:border-primary-600
            [&::-moz-range-thumb]:shadow-md
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
        />
      </div>

      {/* Range labels */}
      {showRange && (
        <div className="flex justify-between mt-1">
          <span className="text-xs text-neutral-500 dark:text-neutral-400">{min}</span>
          <span className="text-xs text-neutral-500 dark:text-neutral-400">{max}</span>
        </div>
      )}
    </div>
  );
}
