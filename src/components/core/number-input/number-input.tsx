import { forwardRef, useId, type InputHTMLAttributes } from 'react';

export type NumberInputSize = 'sm' | 'md' | 'lg';

export interface NumberInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /** Label text */
  label?: string;
  /** Helper text below the input */
  helperText?: string;
  /** Error message (also sets error state) */
  error?: string;
  /** Input size */
  size?: NumberInputSize;
  /** Full width input */
  fullWidth?: boolean;
  /** Required field indicator */
  required?: boolean;
  /** Show increment/decrement buttons */
  showControls?: boolean;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step value */
  step?: number;
}

const sizeStyles: Record<NumberInputSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2.5 text-base',
  lg: 'px-4 py-3 text-lg',
};

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      label,
      helperText,
      error,
      size = 'md',
      fullWidth = false,
      required,
      disabled,
      showControls = true,
      min,
      max,
      step = 1,
      className = '',
      id,
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const hasError = Boolean(error);

    const baseStyles = `
      w-full rounded-lg border bg-white text-neutral-900 text-center
      placeholder:text-neutral-400
      transition-colors duration-200
      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-bg-light
      disabled:opacity-50 disabled:cursor-not-allowed
      dark:bg-neutral-800 dark:text-white dark:placeholder:text-neutral-500
      dark:focus:ring-offset-bg-dark
      [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
    `;

    const stateStyles = hasError
      ? 'border-error-500 focus:border-error-500 focus:ring-error-500'
      : 'border-neutral-300 focus:border-primary-500 focus:ring-primary-500 dark:border-neutral-700 dark:focus:border-primary-500';

    const handleIncrement = () => {
      const currentValue = Number(value) || 0;
      const newValue = currentValue + step;
      if (max === undefined || newValue <= max) {
        const event = { target: { value: String(newValue) } } as React.ChangeEvent<HTMLInputElement>;
        onChange?.(event);
      }
    };

    const handleDecrement = () => {
      const currentValue = Number(value) || 0;
      const newValue = currentValue - step;
      if (min === undefined || newValue >= min) {
        const event = { target: { value: String(newValue) } } as React.ChangeEvent<HTMLInputElement>;
        onChange?.(event);
      }
    };

    return (
      <div className={`${fullWidth ? 'w-full' : 'w-fit'} ${className}`}>
        {label && (
          <label
            htmlFor={inputId}
            className="block mb-1.5 text-sm font-medium text-neutral-700 dark:text-neutral-300"
          >
            {label}
            {required && <span className="ml-1 text-error-500">*</span>}
          </label>
        )}

        <div className="flex items-center gap-2">
          {showControls && (
            <button
              type="button"
              onClick={handleDecrement}
              disabled={disabled || (min !== undefined && Number(value) <= min)}
              className="flex items-center justify-center h-10 w-10 rounded-lg border border-neutral-300 bg-neutral-50 text-neutral-600 hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </button>
          )}

          <input
            ref={ref}
            id={inputId}
            type="number"
            value={value}
            onChange={onChange}
            min={min}
            max={max}
            step={step}
            disabled={disabled}
            aria-invalid={hasError}
            aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
            className={`
              ${baseStyles}
              ${stateStyles}
              ${sizeStyles[size]}
              ${showControls ? 'flex-1' : 'w-full'}
            `.trim()}
            {...props}
          />

          {showControls && (
            <button
              type="button"
              onClick={handleIncrement}
              disabled={disabled || (max !== undefined && Number(value) >= max)}
              className="flex items-center justify-center h-10 w-10 rounded-lg border border-neutral-300 bg-neutral-50 text-neutral-600 hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          )}
        </div>

        {(error || helperText) && (
          <p
            id={error ? `${inputId}-error` : `${inputId}-helper`}
            className={`mt-1.5 text-sm ${
              hasError ? 'text-error-500' : 'text-neutral-500 dark:text-neutral-400'
            }`}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

NumberInput.displayName = 'NumberInput';
