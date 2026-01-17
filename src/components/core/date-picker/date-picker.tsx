import { useId, useState } from 'react';

export interface DatePickerProps {
  /** Selected date */
  value?: Date | null;
  /** On change callback */
  onChange?: (date: Date | null) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Minimum date */
  minDate?: Date;
  /** Maximum date */
  maxDate?: Date;
  /** Disabled state */
  disabled?: boolean;
  /** Error state */
  error?: boolean;
  /** Date format display function */
  formatDate?: (date: Date) => string;
  /** Additional class name */
  className?: string;
}

const defaultFormatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export function DatePicker({
  value,
  onChange,
  placeholder = 'Select date',
  minDate,
  maxDate,
  disabled = false,
  error = false,
  formatDate = defaultFormatDate,
  className = '',
}: DatePickerProps) {
  const id = useId();
  const [isOpen, setIsOpen] = useState(false);
  const [viewDate, setViewDate] = useState(value || new Date());

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const startingDayOfWeek = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1));

  const isDateDisabled = (date: Date): boolean => {
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return false;
  };

  const isDateSelected = (date: Date): boolean => {
    if (!value) return false;
    return (
      date.getDate() === value.getDate() &&
      date.getMonth() === value.getMonth() &&
      date.getFullYear() === value.getFullYear()
    );
  };

  const isToday = (date: Date): boolean => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const handleDateSelect = (day: number) => {
    const selectedDate = new Date(year, month, day);
    if (!isDateDisabled(selectedDate)) {
      onChange?.(selectedDate);
      setIsOpen(false);
    }
  };

  const renderDays = () => {
    const days: React.ReactNode[] = [];

    // Empty cells for days before the first of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} />);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isDisabled = isDateDisabled(date);
      const isSelected = isDateSelected(date);
      const isTodayDate = isToday(date);

      days.push(
        <button
          key={day}
          type="button"
          onClick={() => handleDateSelect(day)}
          disabled={isDisabled}
          className={`
            w-8 h-8 text-sm rounded-full transition-colors
            ${isSelected ? 'bg-primary-600 text-white' : ''}
            ${isTodayDate && !isSelected ? 'border border-primary-600 text-primary-600' : ''}
            ${!isSelected && !isDisabled ? 'hover:bg-neutral-100 dark:hover:bg-neutral-700' : ''}
            ${isDisabled ? 'opacity-50 cursor-not-allowed text-neutral-400' : 'cursor-pointer'}
            ${!isSelected && !isTodayDate ? 'text-neutral-700 dark:text-neutral-300' : ''}
          `.trim()}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  return (
    <div className={`relative ${className}`}>
      {/* Input */}
      <button
        id={id}
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`
          w-full h-10 px-3 text-sm text-left rounded-lg border
          bg-white dark:bg-neutral-800
          flex items-center justify-between gap-2
          focus:outline-none focus:ring-2 focus:ring-primary-500
          disabled:opacity-50 disabled:cursor-not-allowed
          ${error ? 'border-error-500' : 'border-neutral-300 dark:border-neutral-600'}
          ${value ? 'text-neutral-900 dark:text-white' : 'text-neutral-400 dark:text-neutral-500'}
        `.trim()}
      >
        <span>{value ? formatDate(value) : placeholder}</span>
        <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </button>

      {/* Calendar dropdown */}
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} aria-hidden="true" />
          <div className="absolute z-50 mt-1 p-3 bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <button
                type="button"
                onClick={prevMonth}
                className="p-1 rounded hover:bg-neutral-100 dark:hover:bg-neutral-700"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              <span className="text-sm font-medium text-neutral-900 dark:text-white">
                {MONTHS[month]} {year}
              </span>
              <button
                type="button"
                onClick={nextMonth}
                className="p-1 rounded hover:bg-neutral-100 dark:hover:bg-neutral-700"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 gap-1 mb-1">
              {DAYS.map((day) => (
                <div key={day} className="w-8 h-8 flex items-center justify-center text-xs font-medium text-neutral-400">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-1">
              {renderDays()}
            </div>

            {/* Today button */}
            <div className="mt-3 pt-3 border-t border-neutral-200 dark:border-neutral-700">
              <button
                type="button"
                onClick={() => {
                  const today = new Date();
                  onChange?.(today);
                  setViewDate(today);
                  setIsOpen(false);
                }}
                className="w-full text-sm text-primary-600 dark:text-primary-400 hover:underline"
              >
                Today
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
