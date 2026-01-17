import type { InputHTMLAttributes } from 'react';
import { useId, useState } from 'react';

export interface SearchFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange' | 'size'> {
  /** Current value */
  value?: string;
  /** On change callback */
  onChange?: (value: string) => void;
  /** On search submit callback */
  onSearch?: (value: string) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Show clear button */
  clearable?: boolean;
  /** Loading state */
  loading?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Additional class name */
  className?: string;
}

const sizeStyles = {
  sm: 'h-8 text-sm pl-8 pr-8',
  md: 'h-10 text-sm pl-10 pr-10',
  lg: 'h-12 text-base pl-12 pr-12',
};

const iconSizeStyles = {
  sm: 'w-4 h-4 left-2',
  md: 'w-5 h-5 left-3',
  lg: 'w-5 h-5 left-4',
};

export function SearchField({
  value: controlledValue,
  onChange,
  onSearch,
  placeholder = 'Search...',
  size = 'md',
  clearable = true,
  loading = false,
  disabled = false,
  className = '',
  ...props
}: SearchFieldProps) {
  const id = useId();
  const [uncontrolledValue, setUncontrolledValue] = useState('');

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : uncontrolledValue;

  const handleChange = (newValue: string) => {
    if (!isControlled) {
      setUncontrolledValue(newValue);
    }
    onChange?.(newValue);
  };

  const handleClear = () => {
    handleChange('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(value);
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Search icon */}
      <div className={`absolute top-1/2 -translate-y-1/2 text-neutral-400 ${iconSizeStyles[size]}`}>
        {loading ? (
          <svg className="animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : (
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        )}
      </div>

      {/* Input */}
      <input
        id={id}
        type="search"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        className={`
          w-full rounded-lg border border-neutral-300 dark:border-neutral-600
          bg-white dark:bg-neutral-800
          text-neutral-900 dark:text-white
          placeholder:text-neutral-400 dark:placeholder:text-neutral-500
          focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
          disabled:opacity-50 disabled:cursor-not-allowed
          ${sizeStyles[size]}
        `.trim()}
        {...props}
      />

      {/* Clear button */}
      {clearable && value && !disabled && (
        <button
          type="button"
          onClick={handleClear}
          className={`
            absolute top-1/2 -translate-y-1/2 right-2
            p-1 rounded text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300
            transition-colors
          `}
          aria-label="Clear search"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
