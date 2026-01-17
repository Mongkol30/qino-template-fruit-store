import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';

export interface AutocompleteOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface AutocompleteProps {
  /** Options to display */
  options: AutocompleteOption[];
  /** Selected value */
  value?: string;
  /** On change callback */
  onChange?: (value: string) => void;
  /** On input change callback */
  onInputChange?: (value: string) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Error state */
  error?: boolean;
  /** Loading state */
  loading?: boolean;
  /** No options text */
  noOptionsText?: string;
  /** Allow free text input */
  freeSolo?: boolean;
  /** Clear input on select */
  clearOnSelect?: boolean;
  /** Filter function */
  filterOptions?: (options: AutocompleteOption[], inputValue: string) => AutocompleteOption[];
  /** Render option */
  renderOption?: (option: AutocompleteOption) => ReactNode;
  /** Additional class name */
  className?: string;
}

const defaultFilter = (options: AutocompleteOption[], inputValue: string) => {
  const lowerInput = inputValue.toLowerCase();
  return options.filter((option) =>
    option.label.toLowerCase().includes(lowerInput)
  );
};

export function Autocomplete({
  options,
  value,
  onChange,
  onInputChange,
  placeholder = 'Search...',
  disabled = false,
  error = false,
  loading = false,
  noOptionsText = 'No options',
  freeSolo = false,
  clearOnSelect = false,
  filterOptions = defaultFilter,
  renderOption,
  className = '',
}: AutocompleteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const filteredOptions = filterOptions(options, inputValue);

  // Sync input value with selected value
  useEffect(() => {
    if (value && !freeSolo) {
      const selected = options.find((opt) => opt.value === value);
      if (selected) {
        setInputValue(selected.label);
      }
    }
  }, [value, options, freeSolo]);

  const handleInputChange = (newValue: string) => {
    setInputValue(newValue);
    onInputChange?.(newValue);
    setIsOpen(true);
    setHighlightedIndex(-1);
  };

  const handleSelect = (option: AutocompleteOption) => {
    onChange?.(option.value);
    setInputValue(clearOnSelect ? '' : option.label);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setIsOpen(true);
        setHighlightedIndex((prev) =>
          prev < filteredOptions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredOptions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
          handleSelect(filteredOptions[highlightedIndex]);
        } else if (freeSolo && inputValue) {
          onChange?.(inputValue);
          setIsOpen(false);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        break;
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Input */}
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={(e) => handleInputChange(e.target.value)}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        className={`
          w-full h-10 px-3 text-sm rounded-lg border
          bg-white dark:bg-neutral-800
          text-neutral-900 dark:text-white
          placeholder:text-neutral-400 dark:placeholder:text-neutral-500
          focus:outline-none focus:ring-2 focus:ring-primary-500
          disabled:opacity-50 disabled:cursor-not-allowed
          ${error ? 'border-error-500' : 'border-neutral-300 dark:border-neutral-600'}
        `.trim()}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-autocomplete="list"
      />

      {/* Loading indicator */}
      {loading && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <svg className="w-4 h-4 animate-spin text-neutral-400" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        </div>
      )}

      {/* Dropdown */}
      {isOpen && !disabled && (
        <ul
          ref={listRef}
          role="listbox"
          className={`
            absolute z-50 w-full mt-1 max-h-60 overflow-auto
            bg-white dark:bg-neutral-800 rounded-lg shadow-lg
            border border-neutral-200 dark:border-neutral-700
          `}
        >
          {filteredOptions.length === 0 ? (
            <li className="px-3 py-2 text-sm text-neutral-500 dark:text-neutral-400">
              {noOptionsText}
            </li>
          ) : (
            filteredOptions.map((option, index) => (
              <li
                key={option.value}
                role="option"
                aria-selected={option.value === value}
                onClick={() => !option.disabled && handleSelect(option)}
                className={`
                  px-3 py-2 text-sm cursor-pointer
                  ${option.disabled ? 'opacity-50 cursor-not-allowed' : ''}
                  ${index === highlightedIndex ? 'bg-primary-50 dark:bg-primary-900/20' : ''}
                  ${option.value === value ? 'text-primary-600 dark:text-primary-400 font-medium' : 'text-neutral-700 dark:text-neutral-300'}
                  hover:bg-neutral-50 dark:hover:bg-neutral-700
                `}
              >
                {renderOption ? renderOption(option) : option.label}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
