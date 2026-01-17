import { forwardRef, useId, type TextareaHTMLAttributes } from 'react';

export type TextAreaSize = 'sm' | 'md' | 'lg';

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Label text */
  label?: string;
  /** Helper text below the input */
  helperText?: string;
  /** Error message (also sets error state) */
  error?: string;
  /** Input size */
  size?: TextAreaSize;
  /** Full width input */
  fullWidth?: boolean;
  /** Required field indicator */
  required?: boolean;
  /** Number of rows */
  rows?: number;
  /** Auto-resize based on content */
  autoResize?: boolean;
}

const sizeStyles: Record<TextAreaSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2.5 text-base',
  lg: 'px-4 py-3 text-lg',
};

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      label,
      helperText,
      error,
      size = 'md',
      fullWidth = false,
      required,
      disabled,
      rows = 4,
      autoResize = false,
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
      w-full rounded-lg border bg-white text-neutral-900
      placeholder:text-neutral-400
      transition-colors duration-200
      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-bg-light
      disabled:opacity-50 disabled:cursor-not-allowed
      dark:bg-neutral-800 dark:text-white dark:placeholder:text-neutral-500
      dark:focus:ring-offset-bg-dark
    `;

    const stateStyles = hasError
      ? 'border-error-500 focus:border-error-500 focus:ring-error-500'
      : 'border-neutral-300 focus:border-primary-500 focus:ring-primary-500 dark:border-neutral-700 dark:focus:border-primary-500';

    const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
      if (autoResize) {
        const target = e.currentTarget;
        target.style.height = 'auto';
        target.style.height = `${target.scrollHeight}px`;
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

        <textarea
          ref={ref}
          id={inputId}
          rows={rows}
          disabled={disabled}
          aria-invalid={hasError}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
          onInput={handleInput}
          className={`
            ${baseStyles}
            ${stateStyles}
            ${sizeStyles[size]}
            ${autoResize ? 'resize-none overflow-hidden' : 'resize-y'}
          `.trim()}
          {...props}
        />

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

TextArea.displayName = 'TextArea';
