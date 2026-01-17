import type { HTMLAttributes } from 'react';
import { useEffect, useRef, useState } from 'react';

export interface TimePickerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Current value (HH:mm or HH:mm:ss format) */
  value?: string;
  /** On change callback */
  onChange?: (value: string) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Use 24-hour format */
  use24Hour?: boolean;
  /** Show seconds */
  showSeconds?: boolean;
  /** Minute step */
  minuteStep?: number;
  /** Second step */
  secondStep?: number;
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

function padZero(num: number): string {
  return num.toString().padStart(2, '0');
}

function generateOptions(max: number, step = 1): number[] {
  const options: number[] = [];
  for (let i = 0; i < max; i += step) {
    options.push(i);
  }
  return options;
}

export function TimePicker({
  value,
  onChange,
  placeholder = 'Select time',
  use24Hour = true,
  showSeconds = false,
  minuteStep = 1,
  secondStep = 1,
  disabled = false,
  error = false,
  size = 'md',
  className = '',
  ...props
}: TimePickerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [period, setPeriod] = useState<'AM' | 'PM'>('AM');

  // Parse value on mount and when value changes
  useEffect(() => {
    if (value) {
      const parts = value.split(':');
      let h = parseInt(parts[0] || '0', 10);
      const m = parseInt(parts[1] || '0', 10);
      const s = parseInt(parts[2] || '0', 10);

      if (!use24Hour) {
        if (h >= 12) {
          setPeriod('PM');
          if (h > 12) h -= 12;
        } else {
          setPeriod('AM');
          if (h === 0) h = 12;
        }
      }

      setHours(h);
      setMinutes(m);
      setSeconds(s);
    }
  }, [value, use24Hour]);

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

  const handleTimeChange = (h: number, m: number, s: number, p: 'AM' | 'PM') => {
    let finalHours = h;
    if (!use24Hour) {
      if (p === 'PM' && h < 12) finalHours = h + 12;
      else if (p === 'AM' && h === 12) finalHours = 0;
    }

    const timeString = showSeconds
      ? `${padZero(finalHours)}:${padZero(m)}:${padZero(s)}`
      : `${padZero(finalHours)}:${padZero(m)}`;

    onChange?.(timeString);
  };

  const displayValue = value
    ? (() => {
        const parts = value.split(':');
        let h = parseInt(parts[0] || '0', 10);
        const m = parts[1] || '00';
        const s = parts[2];
        let suffix = '';

        if (!use24Hour) {
          suffix = h >= 12 ? ' PM' : ' AM';
          if (h > 12) h -= 12;
          if (h === 0) h = 12;
        }

        return showSeconds && s ? `${padZero(h)}:${m}:${s}${suffix}` : `${padZero(h)}:${m}${suffix}`;
      })()
    : '';

  const hourOptions = use24Hour ? generateOptions(24) : generateOptions(12, 1).map((h) => h + 1);
  const minuteOptions = generateOptions(60, minuteStep);
  const secondOptions = generateOptions(60, secondStep);

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
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span className={displayValue ? 'text-neutral-900 dark:text-neutral-100' : 'text-neutral-400'}>
          {displayValue || placeholder}
        </span>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          className="absolute z-50 mt-1 p-3 bg-white dark:bg-neutral-800
          border border-neutral-200 dark:border-neutral-700 rounded-lg shadow-lg"
        >
          <div className="flex gap-2">
            {/* Hours */}
            <div className="flex flex-col">
              <span className="text-xs text-neutral-500 mb-1 text-center">Hour</span>
              <div className="h-40 overflow-y-auto scrollbar-thin">
                {hourOptions.map((h) => (
                  <button
                    key={h}
                    type="button"
                    onClick={() => {
                      setHours(h);
                      handleTimeChange(h, minutes, seconds, period);
                    }}
                    className={`
                      block w-10 py-1 text-center rounded transition-colors
                      ${hours === h ? 'bg-primary-500 text-white' : 'hover:bg-neutral-100 dark:hover:bg-neutral-700'}
                    `}
                  >
                    {padZero(h)}
                  </button>
                ))}
              </div>
            </div>

            {/* Minutes */}
            <div className="flex flex-col">
              <span className="text-xs text-neutral-500 mb-1 text-center">Min</span>
              <div className="h-40 overflow-y-auto scrollbar-thin">
                {minuteOptions.map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => {
                      setMinutes(m);
                      handleTimeChange(hours, m, seconds, period);
                    }}
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
                  {secondOptions.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => {
                        setSeconds(s);
                        handleTimeChange(hours, minutes, s, period);
                      }}
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

            {/* AM/PM */}
            {!use24Hour && (
              <div className="flex flex-col">
                <span className="text-xs text-neutral-500 mb-1 text-center">Period</span>
                <div className="flex flex-col gap-1">
                  {(['AM', 'PM'] as const).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => {
                        setPeriod(p);
                        handleTimeChange(hours, minutes, seconds, p);
                      }}
                      className={`
                        px-3 py-2 rounded transition-colors
                        ${period === p ? 'bg-primary-500 text-white' : 'hover:bg-neutral-100 dark:hover:bg-neutral-700'}
                      `}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
