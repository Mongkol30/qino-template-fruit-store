import type { HTMLAttributes } from 'react';
import { useEffect, useRef, useState } from 'react';

export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export interface DateRangePickerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Current value */
  value?: DateRange;
  /** On change callback */
  onChange?: (value: DateRange) => void;
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
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Additional class name */
  className?: string;
}

const sizeStyles = {
  sm: 'h-8 text-sm px-2',
  md: 'h-10 text-sm px-3',
  lg: 'h-12 text-base px-4',
};

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

function formatDate(date: Date): string {
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
}

function isSameDay(date1: Date | null, date2: Date | null): boolean {
  if (!date1 || !date2) return false;
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
}

function isInRange(date: Date, start: Date | null, end: Date | null): boolean {
  if (!start || !end) return false;
  return date > start && date < end;
}

export function DateRangePicker({
  value,
  onChange,
  placeholder = 'Select date range',
  minDate,
  maxDate,
  disabled = false,
  error = false,
  size = 'md',
  className = '',
  ...props
}: DateRangePickerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selecting, setSelecting] = useState<'start' | 'end'>('start');
  const [hoverDate, setHoverDate] = useState<Date | null>(null);

  const [leftMonth, setLeftMonth] = useState<Date>(value?.start || new Date());
  const [rightMonth, setRightMonth] = useState<Date>(() => {
    const next = new Date(value?.start || new Date());
    next.setMonth(next.getMonth() + 1);
    return next;
  });

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDateClick = (date: Date) => {
    if (selecting === 'start') {
      onChange?.({ start: date, end: null });
      setSelecting('end');
    } else {
      if (value?.start && date < value.start) {
        onChange?.({ start: date, end: value.start });
      } else {
        onChange?.({ start: value?.start || null, end: date });
      }
      setSelecting('start');
      setIsOpen(false);
    }
  };

  const navigateMonth = (panel: 'left' | 'right', delta: number) => {
    if (panel === 'left') {
      setLeftMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + delta, 1));
    } else {
      setRightMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + delta, 1));
    }
  };

  const isDateDisabled = (date: Date): boolean => {
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return false;
  };

  const displayValue =
    value?.start && value?.end
      ? `${formatDate(value.start)} - ${formatDate(value.end)}`
      : value?.start
        ? `${formatDate(value.start)} - ...`
        : '';

  const renderCalendar = (monthDate: Date, panel: 'left' | 'right') => {
    const year = monthDate.getFullYear();
    const month = monthDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const days: (number | null)[] = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return (
      <div className="p-3">
        {/* Month Navigation */}
        <div className="flex items-center justify-between mb-3">
          <button
            type="button"
            onClick={() => navigateMonth(panel, -1)}
            className="p-1 rounded hover:bg-neutral-100 dark:hover:bg-neutral-700"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="font-medium text-sm">
            {MONTHS[month]} {year}
          </span>
          <button
            type="button"
            onClick={() => navigateMonth(panel, 1)}
            className="p-1 rounded hover:bg-neutral-100 dark:hover:bg-neutral-700"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-1 mb-1">
          {DAYS.map((day) => (
            <div key={day} className="text-center text-xs text-neutral-500 font-medium py-1">
              {day}
            </div>
          ))}
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, index) => {
            if (day === null) {
              return <div key={`empty-${index}`} className="w-8 h-8" />;
            }

            const date = new Date(year, month, day);
            const isStart = isSameDay(date, value?.start || null);
            const isEnd = isSameDay(date, value?.end || null);
            const inRange = isInRange(date, value?.start || null, value?.end || hoverDate);
            const isDisabled = isDateDisabled(date);

            return (
              <button
                key={day}
                type="button"
                onClick={() => !isDisabled && handleDateClick(date)}
                onMouseEnter={() => selecting === 'end' && setHoverDate(date)}
                onMouseLeave={() => setHoverDate(null)}
                disabled={isDisabled}
                className={`
                  w-8 h-8 text-sm transition-colors relative
                  ${isStart ? 'bg-primary-500 text-white rounded-l-full' : ''}
                  ${isEnd ? 'bg-primary-500 text-white rounded-r-full' : ''}
                  ${inRange && !isStart && !isEnd ? 'bg-primary-100 dark:bg-primary-900/30' : ''}
                  ${!isStart && !isEnd && !inRange ? 'rounded-full' : ''}
                  ${isDisabled ? 'text-neutral-300 dark:text-neutral-600 cursor-not-allowed' : ''}
                  ${!isStart && !isEnd && !isDisabled ? 'hover:bg-neutral-100 dark:hover:bg-neutral-700' : ''}
                `}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div ref={containerRef} className={`relative inline-block ${className}`} {...props}>
      {/* Input */}
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`
          flex items-center gap-2 w-full rounded-lg border bg-white
          dark:bg-neutral-900 transition-colors
          ${sizeStyles[size]}
          ${error ? 'border-error-500' : 'border-neutral-300 dark:border-neutral-700'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-primary-500 cursor-pointer'}
          ${isOpen ? 'ring-2 ring-primary-500 border-primary-500' : ''}
        `}
      >
        <svg className="w-5 h-5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <span className={displayValue ? 'text-neutral-900 dark:text-neutral-100' : 'text-neutral-400'}>
          {displayValue || placeholder}
        </span>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          className="absolute z-50 mt-1 bg-white dark:bg-neutral-800
          border border-neutral-200 dark:border-neutral-700 rounded-lg shadow-lg"
        >
          <div className="flex divide-x divide-neutral-200 dark:divide-neutral-700">
            {renderCalendar(leftMonth, 'left')}
            {renderCalendar(rightMonth, 'right')}
          </div>

          {/* Quick Select */}
          <div className="flex gap-2 p-3 border-t border-neutral-200 dark:border-neutral-700">
            <button
              type="button"
              onClick={() => {
                const today = new Date();
                const weekAgo = new Date(today);
                weekAgo.setDate(weekAgo.getDate() - 7);
                onChange?.({ start: weekAgo, end: today });
                setIsOpen(false);
              }}
              className="px-3 py-1 text-xs rounded-full bg-neutral-100 dark:bg-neutral-700
                hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors"
            >
              Last 7 days
            </button>
            <button
              type="button"
              onClick={() => {
                const today = new Date();
                const monthAgo = new Date(today);
                monthAgo.setMonth(monthAgo.getMonth() - 1);
                onChange?.({ start: monthAgo, end: today });
                setIsOpen(false);
              }}
              className="px-3 py-1 text-xs rounded-full bg-neutral-100 dark:bg-neutral-700
                hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors"
            >
              Last 30 days
            </button>
            <button
              type="button"
              onClick={() => {
                const today = new Date();
                const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
                onChange?.({ start: startOfMonth, end: today });
                setIsOpen(false);
              }}
              className="px-3 py-1 text-xs rounded-full bg-neutral-100 dark:bg-neutral-700
                hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors"
            >
              This month
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
