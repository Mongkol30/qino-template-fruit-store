import { forwardRef, useId, type InputHTMLAttributes } from 'react';

export type RadioSize = 'sm' | 'md' | 'lg';

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /** Label text */
  label?: string;
  /** Description text */
  description?: string;
  /** Radio size */
  size?: RadioSize;
  /** Error state */
  error?: boolean;
}

const sizeStyles: Record<RadioSize, { radio: string; label: string }> = {
  sm: { radio: 'h-4 w-4', label: 'text-sm' },
  md: { radio: 'h-5 w-5', label: 'text-base' },
  lg: { radio: 'h-6 w-6', label: 'text-lg' },
};

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      label,
      description,
      size = 'md',
      error = false,
      disabled,
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;

    return (
      <div className={`flex items-start gap-3 ${className}`}>
        <div className="flex items-center h-5">
          <input
            ref={ref}
            id={inputId}
            type="radio"
            disabled={disabled}
            className={`
              ${sizeStyles[size].radio}
              rounded-full border cursor-pointer
              transition-colors duration-200
              focus:ring-2 focus:ring-offset-2 focus:ring-primary-500
              focus:ring-offset-bg-light dark:focus:ring-offset-bg-dark
              disabled:opacity-50 disabled:cursor-not-allowed
              ${
                error
                  ? 'border-error-500 text-error-600'
                  : 'border-neutral-300 dark:border-neutral-600 text-primary-600'
              }
              bg-white dark:bg-neutral-800
              checked:border-primary-600
            `}
            {...props}
          />
        </div>

        {(label || description) && (
          <div className="flex flex-col">
            {label && (
              <label
                htmlFor={inputId}
                className={`
                  font-medium cursor-pointer
                  ${sizeStyles[size].label}
                  ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
                  ${error ? 'text-error-600' : 'text-neutral-900 dark:text-neutral-100'}
                `}
              >
                {label}
              </label>
            )}
            {description && (
              <span className="text-sm text-neutral-500 dark:text-neutral-400">
                {description}
              </span>
            )}
          </div>
        )}
      </div>
    );
  }
);

Radio.displayName = 'Radio';
