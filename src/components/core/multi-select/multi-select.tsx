import type { HTMLAttributes } from 'react';
import { useEffect, useRef, useState } from 'react';

export interface MultiSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface MultiSelectProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Options list */
  options: MultiSelectOption[];
  /** Selected values */
  value?: string[];
  /** On change callback */
  onChange?: (value: string[]) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Max items to show */
  maxDisplay?: number;
  /** Searchable */
  searchable?: boolean;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Disabled state */
  disabled?: boolean;
  /** Error state */
  error?: boolean;
  /** Additional class name */
  className?: string;
}

const sizeStyles = {
  sm: 'min-h-8 text-sm px-2 py-1',
  md: 'min-h-10 text-sm px-3 py-2',
  lg: 'min-h-12 text-base px-4 py-2',
};

export function MultiSelect({
  options,
  value = [],
  onChange,
  placeholder = 'Select...',
  maxDisplay = 3,
  searchable = true,
  size = 'md',
  disabled = false,
  error = false,
  className = '',
  ...props
}: MultiSelectProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  const filteredOptions = options.filter(
    (option) => !searchable || option.label.toLowerCase().includes(search.toLowerCase())
  );

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearch('');
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = (optionValue: string) => {
    const newValue = value.includes(optionValue)
      ? value.filter((v) => v !== optionValue)
      : [...value, optionValue];
    onChange?.(newValue);
  };

  const handleRemove = (optionValue: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onChange?.(value.filter((v) => v !== optionValue));
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange?.([]);
  };

  const handleSelectAll = () => {
    const allValues = options.filter((o) => !o.disabled).map((o) => o.value);
    onChange?.(allValues);
  };

  const selectedLabels = value
    .map((v) => options.find((o) => o.value === v)?.label)
    .filter(Boolean) as string[];

  return (
    <div ref={containerRef} className={`relative ${className}`} {...props}>
      {/* Input/Display */}
      <div
        onClick={() => {
          if (!disabled) {
            setIsOpen(true);
            if (searchable) inputRef.current?.focus();
          }
        }}
        className={`
          flex flex-wrap items-center gap-1 rounded-lg border bg-white
          dark:bg-neutral-900 cursor-pointer transition-colors
          ${sizeStyles[size]}
          ${error ? 'border-error-500' : 'border-neutral-300 dark:border-neutral-700'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-primary-500'}
          ${isOpen ? 'ring-2 ring-primary-500 border-primary-500' : ''}
        `}
      >
        {/* Selected Tags */}
        {selectedLabels.length === 0 ? (
          <span className="text-neutral-400">{placeholder}</span>
        ) : selectedLabels.length <= maxDisplay ? (
          selectedLabels.map((label, index) => (
            <span
              key={value[index]}
              className="inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full
                bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300"
            >
              {label}
              <button
                type="button"
                onClick={(e) => handleRemove(value[index], e)}
                className="hover:text-primary-900 dark:hover:text-primary-100"
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </span>
          ))
        ) : (
          <span className="text-neutral-700 dark:text-neutral-300">
            {selectedLabels.length} selected
          </span>
        )}

        {/* Search Input */}
        {searchable && isOpen && (
          <input
            ref={inputRef}
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={selectedLabels.length > 0 ? '' : 'Search...'}
            className="flex-1 min-w-20 bg-transparent outline-none"
            onClick={(e) => e.stopPropagation()}
          />
        )}

        {/* Actions */}
        <div className="ml-auto flex items-center gap-1">
          {value.length > 0 && (
            <button
              type="button"
              onClick={handleClear}
              className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded"
            >
              <svg className="w-4 h-4 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
          <svg
            className={`w-5 h-5 text-neutral-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div
          className="absolute z-50 w-full mt-1 bg-white dark:bg-neutral-800
          border border-neutral-200 dark:border-neutral-700 rounded-lg shadow-lg max-h-60 overflow-auto"
        >
          {/* Select All */}
          <div className="sticky top-0 bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700 px-3 py-2">
            <button
              type="button"
              onClick={handleSelectAll}
              className="text-sm text-primary-600 hover:text-primary-700"
            >
              Select All
            </button>
          </div>

          {filteredOptions.length === 0 ? (
            <div className="px-3 py-2 text-sm text-neutral-500">No options found</div>
          ) : (
            filteredOptions.map((option) => {
              const isSelected = value.includes(option.value);
              return (
                <div
                  key={option.value}
                  onClick={() => !option.disabled && handleToggle(option.value)}
                  className={`
                    flex items-center gap-2 px-3 py-2 cursor-pointer transition-colors
                    ${option.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-neutral-100 dark:hover:bg-neutral-700'}
                    ${isSelected ? 'bg-primary-50 dark:bg-primary-900/20' : ''}
                  `}
                >
                  <div
                    className={`w-4 h-4 rounded border flex items-center justify-center transition-colors
                      ${isSelected ? 'bg-primary-500 border-primary-500' : 'border-neutral-300 dark:border-neutral-600'}`}
                  >
                    {isSelected && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className="text-sm">{option.label}</span>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
