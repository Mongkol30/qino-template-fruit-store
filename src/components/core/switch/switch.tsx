import { forwardRef, useId, type InputHTMLAttributes } from 'react';

export type SwitchSize = 'sm' | 'md' | 'lg';

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /** Label text */
  label?: string;
  /** Description text */
  description?: string;
  /** Switch size */
  size?: SwitchSize;
  /** Label position */
  labelPosition?: 'left' | 'right';
}

const sizeStyles: Record<SwitchSize, { track: string; thumb: string; translate: string; label: string }> = {
  sm: { track: 'h-5 w-9', thumb: 'h-4 w-4', translate: 'translate-x-4', label: 'text-sm' },
  md: { track: 'h-6 w-11', thumb: 'h-5 w-5', translate: 'translate-x-5', label: 'text-base' },
  lg: { track: 'h-7 w-14', thumb: 'h-6 w-6', translate: 'translate-x-7', label: 'text-lg' },
};

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      label,
      description,
      size = 'md',
      labelPosition = 'right',
      disabled,
      className = '',
      id,
      checked,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const { track, thumb, translate, label: labelSize } = sizeStyles[size];

    const switchElement = (
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => {
          const input = document.getElementById(inputId) as HTMLInputElement;
          if (input && !disabled) {
            input.click();
          }
        }}
        disabled={disabled}
        className={`
          relative inline-flex shrink-0 cursor-pointer
          rounded-full border-2 border-transparent
          transition-colors duration-200 ease-in-out
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500
          focus:ring-offset-bg-light dark:focus:ring-offset-bg-dark
          disabled:opacity-50 disabled:cursor-not-allowed
          ${track}
          ${checked ? 'bg-primary-600' : 'bg-neutral-300 dark:bg-neutral-600'}
        `}
      >
        <span
          className={`
            pointer-events-none inline-block rounded-full
            bg-white shadow-lg ring-0
            transition duration-200 ease-in-out
            ${thumb}
            ${checked ? translate : 'translate-x-0'}
          `}
        />
      </button>
    );

    const labelElement = (label || description) && (
      <div className="flex flex-col">
        {label && (
          <label
            htmlFor={inputId}
            className={`
              font-medium cursor-pointer
              ${labelSize}
              ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
              text-neutral-900 dark:text-neutral-100
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
    );

    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <input
          ref={ref}
          id={inputId}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          className="sr-only"
          {...props}
        />
        {labelPosition === 'left' && labelElement}
        {switchElement}
        {labelPosition === 'right' && labelElement}
      </div>
    );
  }
);

Switch.displayName = 'Switch';
