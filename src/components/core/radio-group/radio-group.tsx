import type { ReactNode } from 'react';
import { createContext, useContext, useId } from 'react';

// RadioGroup Context
interface RadioGroupContextValue {
  name: string;
  value: string | undefined;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

export function useRadioGroupContext() {
  return useContext(RadioGroupContext);
}

// RadioGroup Props
export interface RadioGroupProps {
  /** Group name */
  name?: string;
  /** Selected value */
  value?: string;
  /** Default value */
  defaultValue?: string;
  /** On change callback */
  onChange?: (value: string) => void;
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

export function RadioGroup({
  name,
  value: controlledValue,
  defaultValue,
  onChange,
  label,
  children,
  orientation = 'vertical',
  disabled = false,
  error = false,
  helperText,
  className = '',
}: RadioGroupProps) {
  const generatedName = useId();
  const groupName = name || generatedName;

  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : defaultValue;

  const handleChange = (newValue: string) => {
    onChange?.(newValue);
  };

  return (
    <RadioGroupContext.Provider
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
          role="radiogroup"
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
    </RadioGroupContext.Provider>
  );
}

// RadioGroupItem Props
export interface RadioGroupItemProps {
  /** Radio value */
  value: string;
  /** Radio label */
  children: ReactNode;
  /** Disabled state */
  disabled?: boolean;
}

export function RadioGroupItem({ value, children, disabled = false }: RadioGroupItemProps) {
  const group = useRadioGroupContext();
  const id = useId();

  if (!group) {
    throw new Error('RadioGroupItem must be used within a RadioGroup');
  }

  const isChecked = group.value === value;
  const isDisabled = disabled || group.disabled;

  const handleChange = () => {
    group.onChange(value);
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
        type="radio"
        name={group.name}
        value={value}
        checked={isChecked}
        onChange={handleChange}
        disabled={isDisabled}
        className="sr-only peer"
      />
      <span
        className={`
          w-5 h-5 rounded-full border-2 flex items-center justify-center
          transition-colors
          ${
            isChecked
              ? 'border-primary-600'
              : 'border-neutral-300 dark:border-neutral-600'
          }
          peer-focus-visible:ring-2 peer-focus-visible:ring-primary-500 peer-focus-visible:ring-offset-2
        `}
      >
        {isChecked && <span className="w-2.5 h-2.5 rounded-full bg-primary-600" />}
      </span>
      <span className="text-sm text-neutral-700 dark:text-neutral-300">{children}</span>
    </label>
  );
}
