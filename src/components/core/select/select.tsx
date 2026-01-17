import { forwardRef, useId, type ReactNode, type SelectHTMLAttributes } from 'react';

export type SelectSize = 'sm' | 'md' | 'lg';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  /** Label text */
  label?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Helper text below the input */
  helperText?: string;
  /** Error message (also sets error state) */
  error?: string;
  /** Select size */
  size?: SelectSize;
  /** Full width input */
  fullWidth?: boolean;
  /** Required field indicator */
  required?: boolean;
  /** Options array */
  options: SelectOption[];
  /** Left icon */
  leftIcon?: ReactNode;
}

const sizeStyles: Record<SelectSize, string> = {
  sm: 'px-3 py-1.5 text-sm pr-10',
  md: 'px-4 py-2.5 text-base pr-12',
  lg: 'px-4 py-3 text-lg pr-14',
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      placeholder,
      helperText,
      error,
      size = 'md',
      fullWidth = false,
      required,
      disabled,
      options,
      leftIcon,
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const hasError = Boolean(error);

    const baseStyles = `
      w-full rounded-lg border bg-white text-neutral-900 appearance-none cursor-pointer
      transition-colors duration-200
      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-bg-light
      disabled:opacity-50 disabled:cursor-not-allowed
      dark:bg-neutral-800 dark:text-white
      dark:focus:ring-offset-bg-dark
    `;

    const stateStyles = hasError
      ? 'border-error-500 focus:border-error-500 focus:ring-error-500'
      : 'border-neutral-300 focus:border-primary-500 focus:ring-primary-500 dark:border-neutral-700 dark:focus:border-primary-500';

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

        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none">
              {leftIcon}
            </div>
          )}

          <select
            ref={ref}
            id={inputId}
            disabled={disabled}
            aria-invalid={hasError}
            aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
            className={`
              ${baseStyles}
              ${stateStyles}
              ${sizeStyles[size]}
              ${leftIcon ? 'pl-10' : ''}
            `.trim()}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value} disabled={option.disabled}>
                {option.label}
              </option>
            ))}
          </select>

          {/* Dropdown arrow */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
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

Select.displayName = 'Select';
