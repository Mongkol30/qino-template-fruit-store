import { forwardRef, useId, useState, type InputHTMLAttributes } from 'react';
import { Icon } from '../icon';

export type PasswordFieldSize = 'sm' | 'md' | 'lg';

export interface PasswordFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /** Label text */
  label?: string;
  /** Helper text below the input */
  helperText?: string;
  /** Error message (also sets error state) */
  error?: string;
  /** Input size */
  size?: PasswordFieldSize;
  /** Full width input */
  fullWidth?: boolean;
  /** Required field indicator */
  required?: boolean;
  /** Show password strength indicator */
  showStrength?: boolean;
}

const sizeStyles: Record<PasswordFieldSize, string> = {
  sm: 'px-3 py-1.5 text-sm pr-10',
  md: 'px-4 py-2.5 text-base pr-12',
  lg: 'px-4 py-3 text-lg pr-14',
};

const iconSizeStyles: Record<PasswordFieldSize, string> = {
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
};

export const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
  (
    {
      label,
      helperText,
      error,
      size = 'md',
      fullWidth = false,
      required,
      disabled,
      showStrength = false,
      className = '',
      id,
      value,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const hasError = Boolean(error);
    const [showPassword, setShowPassword] = useState(false);

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

    // Password strength calculator
    const getStrength = (password: string): number => {
      let strength = 0;
      if (password.length >= 8) strength++;
      if (password.match(/[a-z]/)) strength++;
      if (password.match(/[A-Z]/)) strength++;
      if (password.match(/[0-9]/)) strength++;
      if (password.match(/[^a-zA-Z0-9]/)) strength++;
      return strength;
    };

    const passwordValue = typeof value === 'string' ? value : '';
    const strength = getStrength(passwordValue);
    const strengthColors = ['bg-error-500', 'bg-warning-500', 'bg-warning-400', 'bg-success-400', 'bg-success-500'];
    const strengthLabels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];

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
          <input
            ref={ref}
            id={inputId}
            type={showPassword ? 'text' : 'password'}
            value={value}
            disabled={disabled}
            aria-invalid={hasError}
            aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
            className={`
              ${baseStyles}
              ${stateStyles}
              ${sizeStyles[size]}
            `.trim()}
            {...props}
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
            tabIndex={-1}
          >
            <Icon name={showPassword ? 'eyeOff' : 'eye'} className={iconSizeStyles[size]} />
          </button>
        </div>

        {showStrength && passwordValue && (
          <div className="mt-2">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full ${
                    i < strength ? strengthColors[strength - 1] : 'bg-neutral-200 dark:bg-neutral-700'
                  }`}
                />
              ))}
            </div>
            <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
              {strengthLabels[strength - 1] || 'Enter password'}
            </p>
          </div>
        )}

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

PasswordField.displayName = 'PasswordField';
