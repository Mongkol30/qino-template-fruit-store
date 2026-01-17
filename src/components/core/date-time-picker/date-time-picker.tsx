import type { HTMLAttributes } from 'react';
import { useEffect, useRef, useState } from 'react';

export interface DateTimePickerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Current value (ISO string or Date) */
  value?: Date | string;
  /** On change callback */
  onChange?: (value: Date) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Use 24-hour format */
  use24Hour?: boolean;
  /** Show seconds */
  showSeconds?: boolean;
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
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function padZero(num: number): string {
  return num.toString().padStart(2, '0');
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

export function DateTimePicker({
  value,
  onChange,
  placeholder = 'Select date and time',
  use24Hour = true,
  showSeconds = false,
  minDate,
  maxDate,
  disabled = false,
  error = false,
  size = 'md',
  className = '',
  ...props
}: DateTimePickerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'date' | 'time'>('date');

  const dateValue = value ? (typeof value === 'string' ? new Date(value) : value) : null;

  const [viewDate, setViewDate] = useState<Date>(dateValue || new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(dateValue);
  const [hours, setHours] = useState<number>(dateValue?.getHours() || 0);
  const [minutes, setMinutes] = useState<number>(dateValue?.getMinutes() || 0);
  const [seconds, setSeconds] = useState<number>(dateValue?.getSeconds() || 0);

  // Sync with external value
  useEffect(() => {
    if (value) {
      const date = typeof value === 'string' ? new Date(value) : value;
      setSelectedDate(date);
      setViewDate(date);
      setHours(date.getHours());
      setMinutes(date.getMinutes());
      setSeconds(date.getSeconds());
    }
  }, [value]);

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

  const handleDateSelect = (day: number) => {
    const newDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day, hours, minutes, seconds);
    setSelectedDate(newDate);
    onChange?.(newDate);
  };

  const handleTimeChange = (h: number, m: number, s: number) => {
    setHours(h);
    setMinutes(m);
    setSeconds(s);
    if (selectedDate) {
      const newDate = new Date(selectedDate);
      newDate.setHours(h, m, s);
      onChange?.(newDate);
    }
  };

  const navigateMonth = (delta: number) => {
    setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + delta, 1));
  };

  const isDateDisabled = (day: number): boolean => {
    const date = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return false;
  };

  const formatDisplay = (): string => {
    if (!selectedDate) return '';
    const dateStr = `${MONTHS[selectedDate.getMonth()]} ${selectedDate.getDate()}, ${selectedDate.getFullYear()}`;
    let h = selectedDate.getHours();
    const m = padZero(selectedDate.getMinutes());
    const s = padZero(selectedDate.getSeconds());
    let suffix = '';

    if (!use24Hour) {
      suffix = h >= 12 ? ' PM' : ' AM';
      if (h > 12) h -= 12;
      if (h === 0) h = 12;
    }

    const timeStr = showSeconds ? `${padZero(h)}:${m}:${s}${suffix}` : `${padZero(h)}:${m}${suffix}`;
    return `${dateStr} ${timeStr}`;
  };

  // Generate calendar days
  const daysInMonth = getDaysInMonth(viewDate.getFullYear(), viewDate.getMonth());
  const firstDay = getFirstDayOfMonth(viewDate.getFullYear(), viewDate.getMonth());
  const days: (number | null)[] = [];

  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

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
        <span
          className={selectedDate ? 'text-neutral-900 dark:text-neutral-100' : 'text-neutral-400'}
        >
          {formatDisplay() || placeholder}
        </span>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          className="absolute z-50 mt-1 bg-white dark:bg-neutral-800
          border border-neutral-200 dark:border-neutral-700 rounded-lg shadow-lg"
        >
          {/* Tabs */}
          <div className="flex border-b border-neutral-200 dark:border-neutral-700">
            <button
              type="button"
              onClick={() => setActiveTab('date')}
              className={`flex-1 px-4 py-2 text-sm font-medium transition-colors
                ${activeTab === 'date' ? 'text-primary-600 border-b-2 border-primary-500' : 'text-neutral-500 hover:text-neutral-700'}`}
            >
              Date
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('time')}
              className={`flex-1 px-4 py-2 text-sm font-medium transition-colors
                ${activeTab === 'time' ? 'text-primary-600 border-b-2 border-primary-500' : 'text-neutral-500 hover:text-neutral-700'}`}
            >
              Time
            </button>
          </div>

          {activeTab === 'date' ? (
            <div className="p-3">
              {/* Month Navigation */}
              <div className="flex items-center justify-between mb-3">
                <button
                  type="button"
                  onClick={() => navigateMonth(-1)}
                  className="p-1 rounded hover:bg-neutral-100 dark:hover:bg-neutral-700"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <span className="font-medium">
                  {MONTHS[viewDate.getMonth()]} {viewDate.getFullYear()}
                </span>
                <button
                  type="button"
                  onClick={() => navigateMonth(1)}
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

                  const isSelected =
                    selectedDate &&
                    selectedDate.getDate() === day &&
                    selectedDate.getMonth() === viewDate.getMonth() &&
                    selectedDate.getFullYear() === viewDate.getFullYear();
                  const isDisabled = isDateDisabled(day);

                  return (
                    <button
                      key={day}
                      type="button"
                      onClick={() => !isDisabled && handleDateSelect(day)}
                      disabled={isDisabled}
                      className={`
                        w-8 h-8 rounded-full text-sm transition-colors
                        ${isSelected ? 'bg-primary-500 text-white' : ''}
                        ${isDisabled ? 'text-neutral-300 dark:text-neutral-600 cursor-not-allowed' : ''}
                        ${!isSelected && !isDisabled ? 'hover:bg-neutral-100 dark:hover:bg-neutral-700' : ''}
                      `}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="p-3">
              <div className="flex gap-2 justify-center">
                {/* Hours */}
                <div className="flex flex-col">
                  <span className="text-xs text-neutral-500 mb-1 text-center">Hour</span>
                  <div className="h-40 overflow-y-auto scrollbar-thin">
                    {Array.from({ length: use24Hour ? 24 : 12 }, (_, i) => (use24Hour ? i : i + 1)).map(
                      (h) => (
                        <button
                          key={h}
                          type="button"
                          onClick={() => handleTimeChange(h, minutes, seconds)}
                          className={`
                          block w-10 py-1 text-center rounded transition-colors
                          ${hours === h ? 'bg-primary-500 text-white' : 'hover:bg-neutral-100 dark:hover:bg-neutral-700'}
                        `}
                        >
                          {padZero(h)}
                        </button>
                      )
                    )}
                  </div>
                </div>

                {/* Minutes */}
                <div className="flex flex-col">
                  <span className="text-xs text-neutral-500 mb-1 text-center">Min</span>
                  <div className="h-40 overflow-y-auto scrollbar-thin">
                    {Array.from({ length: 60 }, (_, i) => i).map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => handleTimeChange(hours, m, seconds)}
                        className={`
                          block w-10 py-1 text-center rounded transition-colors
                          ${minutes === m ? 'bg-primary-500 text-white' : 'hover:bg-neutral-100 dark:hover:bg-neutral-700'}
                        `}
                      >
                        {padZero(m)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Seconds */}
                {showSeconds && (
                  <div className="flex flex-col">
                    <span className="text-xs text-neutral-500 mb-1 text-center">Sec</span>
                    <div className="h-40 overflow-y-auto scrollbar-thin">
                      {Array.from({ length: 60 }, (_, i) => i).map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => handleTimeChange(hours, minutes, s)}
                          className={`
                            block w-10 py-1 text-center rounded transition-colors
                            ${seconds === s ? 'bg-primary-500 text-white' : 'hover:bg-neutral-100 dark:hover:bg-neutral-700'}
                          `}
                        >
                          {padZero(s)}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
