import type { ReactNode } from 'react';
import { createContext, useContext, useId } from 'react';

// CheckboxGroup Context
interface CheckboxGroupContextValue {
  name: string;
  value: string[];
  onChange: (value: string[]) => void;
  disabled?: boolean;
}

const CheckboxGroupContext = createContext<CheckboxGroupContextValue | null>(null);

export function useCheckboxGroupContext() {
  return useContext(CheckboxGroupContext);
}

// CheckboxGroup Props
export interface CheckboxGroupProps {
  /** Group name */
  name?: string;
  /** Selected values */
  value?: string[];
  /** Default values */
  defaultValue?: string[];
  /** On change callback */
  onChange?: (value: string[]) => void;
  /** Group label */
  label?: string;
  /** Group children */
  children: ReactNode;
  /** Orientation */
  orientation?: 'horizontal' | 'vertical';
  /** Disabled state */
  disabled?: boolean;
  /** Error state */
  error?: boolean;
  /** Helper text */
  helperText?: string;
  /** Additional class name */
  className?: string;
}

export function CheckboxGroup({
  name,
  value: controlledValue,
  defaultValue = [],
  onChange,
  label,
  children,
  orientation = 'vertical',
  disabled = false,
  error = false,
  helperText,
  className = '',
}: CheckboxGroupProps) {
  const generatedName = useId();
  const groupName = name || generatedName;

  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : defaultValue;

  const handleChange = (newValue: string[]) => {
    onChange?.(newValue);
  };

  return (
    <CheckboxGroupContext.Provider
      value={{
        name: groupName,
        value: currentValue,
        onChange: handleChange,
        disabled,
      }}
    >
      <fieldset className={className} disabled={disabled}>
        {label && (
          <legend className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            {label}
          </legend>
        )}
        <div
          className={`
            flex
            ${orientation === 'vertical' ? 'flex-col gap-2' : 'flex-row flex-wrap gap-4'}
          `}
          role="group"
          aria-label={label}
        >
          {children}
        </div>
        {helperText && (
          <p className={`mt-1.5 text-sm ${error ? 'text-error-500' : 'text-neutral-500 dark:text-neutral-400'}`}>
            {helperText}
          </p>
        )}
      </fieldset>
    </CheckboxGroupContext.Provider>
  );
}

// CheckboxGroupItem Props
export interface CheckboxGroupItemProps {
  /** Checkbox value */
  value: string;
  /** Checkbox label */
  children: ReactNode;
  /** Disabled state */
  disabled?: boolean;
}

export function CheckboxGroupItem({ value, children, disabled = false }: CheckboxGroupItemProps) {
  const group = useCheckboxGroupContext();
  const id = useId();

  if (!group) {
    throw new Error('CheckboxGroupItem must be used within a CheckboxGroup');
  }

  const isChecked = group.value.includes(value);
  const isDisabled = disabled || group.disabled;

  const handleChange = () => {
    if (isChecked) {
      group.onChange(group.value.filter((v) => v !== value));
    } else {
      group.onChange([...group.value, value]);
    }
  };

  return (
    <label
      htmlFor={id}
      className={`
        inline-flex items-center gap-2 cursor-pointer
        ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}
      `}
    >
      <input
        id={id}
        type="checkbox"
        name={group.name}
        value={value}
        checked={isChecked}
        onChange={handleChange}
        disabled={isDisabled}
        className="sr-only peer"
      />
      <span
        className={`
          w-5 h-5 rounded border-2 flex items-center justify-center
          transition-colors
          ${
            isChecked
              ? 'bg-primary-600 border-primary-600'
              : 'bg-white dark:bg-neutral-800 border-neutral-300 dark:border-neutral-600'
          }
          peer-focus-visible:ring-2 peer-focus-visible:ring-primary-500 peer-focus-visible:ring-offset-2
        `}
      >
        {isChecked && (
          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 12 10">
            <path d="M10.28.78a.75.75 0 00-1.06 0L4.5 5.5 2.78 3.78a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.06 0l5.25-5.25a.75.75 0 000-1.06z" />
          </svg>
        )}
      </span>
      <span className="text-sm text-neutral-700 dark:text-neutral-300">{children}</span>
    </label>
  );
}
