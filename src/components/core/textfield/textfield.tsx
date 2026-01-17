import {
  forwardRef,
  useId,
  type InputHTMLAttributes,
  type ReactNode,
} from 'react';

export type TextFieldSize = 'sm' | 'md' | 'lg';

export interface TextFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Label text */
  label?: string;
  /** Helper text below the input */
  helperText?: string;
  /** Error message (also sets error state) */
  error?: string;
  /** Input size */
  size?: TextFieldSize;
  /** Full width input */
  fullWidth?: boolean;
  /** Left addon/icon */
  leftAddon?: ReactNode;
  /** Right addon/icon */
  rightAddon?: ReactNode;
  /** Required field indicator */
  required?: boolean;
}

const sizeStyles: Record<TextFieldSize, { input: string; addon: string }> = {
  sm: { input: 'px-3 py-1.5 text-sm', addon: 'px-2' },
  md: { input: 'px-4 py-2.5 text-base', addon: 'px-3' },
  lg: { input: 'px-4 py-3 text-lg', addon: 'px-4' },
};

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      label,
      helperText,
      error,
      size = 'md',
      fullWidth = false,
      leftAddon,
      rightAddon,
      required,
      disabled,
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const hasError = Boolean(error);

    const baseInputStyles = `
      w-full rounded-lg border bg-neutral-50 text-neutral-900
      placeholder:text-neutral-400
      transition-colors duration-200
      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-bg-light
      disabled:opacity-50 disabled:cursor-not-allowed
      dark:bg-neutral-800/80 dark:text-white dark:placeholder:text-neutral-500
      dark:focus:ring-offset-bg-dark
    `;

    const stateStyles = hasError
      ? 'border-error-500 focus:border-error-500 focus:ring-error-500'
      : 'border-neutral-300 focus:border-primary-500 focus:ring-primary-500 dark:border-neutral-700 dark:focus:border-primary-500';

    return (
      <div className={`${fullWidth ? 'w-full' : 'w-fit'} ${className}`}>
        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className="block mb-1.5 text-sm font-medium text-neutral-700 dark:text-neutral-300"
          >
            {label}
            {required && <span className="ml-1 text-error-500">*</span>}
          </label>
        )}

        {/* Input wrapper */}
        <div className="relative flex items-center">
          {/* Left addon */}
          {leftAddon && (
            <div
              className={`
                absolute left-0 flex items-center justify-center
                text-neutral-400 dark:text-neutral-500 pointer-events-none
                ${sizeStyles[size].addon}
              `}
            >
              {leftAddon}
            </div>
          )}

          {/* Input */}
          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            aria-invalid={hasError}
            aria-describedby={
              hasError ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
            }
            className={`
              ${baseInputStyles}
              ${stateStyles}
              ${sizeStyles[size].input}
              ${leftAddon ? 'pl-10' : ''}
              ${rightAddon ? 'pr-10' : ''}
            `.trim()}
            {...props}
          />

          {/* Right addon */}
          {rightAddon && (
            <div
              className={`
                absolute right-0 flex items-center justify-center
                text-neutral-400 dark:text-neutral-500
                ${sizeStyles[size].addon}
              `}
            >
              {rightAddon}
            </div>
          )}
        </div>

        {/* Error message */}
        {hasError && (
          <p id={`${inputId}-error`} className="mt-1.5 text-sm text-error-500">
            {error}
          </p>
        )}

        {/* Helper text */}
        {!hasError && helperText && (
          <p id={`${inputId}-helper`} className="mt-1.5 text-sm text-neutral-500">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

TextField.displayName = 'TextField';
