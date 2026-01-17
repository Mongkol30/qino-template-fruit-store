import { forwardRef, useId, type InputHTMLAttributes } from 'react';

export type CheckboxSize = 'sm' | 'md' | 'lg';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /** Label text */
  label?: string;
  /** Description text */
  description?: string;
  /** Checkbox size */
  size?: CheckboxSize;
  /** Error state */
  error?: boolean;
  /** Indeterminate state */
  indeterminate?: boolean;
}

const sizeStyles: Record<CheckboxSize, { checkbox: string; label: string }> = {
  sm: { checkbox: 'h-4 w-4', label: 'text-sm' },
  md: { checkbox: 'h-5 w-5', label: 'text-base' },
  lg: { checkbox: 'h-6 w-6', label: 'text-lg' },
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      description,
      size = 'md',
      error = false,
      indeterminate = false,
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
            ref={(el) => {
              if (el) {
                el.indeterminate = indeterminate;
              }
              if (typeof ref === 'function') {
                ref(el);
              } else if (ref) {
                ref.current = el;
              }
            }}
            id={inputId}
            type="checkbox"
            disabled={disabled}
            className={`
              ${sizeStyles[size].checkbox}
              rounded border cursor-pointer
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
              checked:bg-primary-600 checked:border-primary-600
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

Checkbox.displayName = 'Checkbox';
