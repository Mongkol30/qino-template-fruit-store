import type { ClipboardEvent, KeyboardEvent } from 'react';
import { useEffect, useRef, useState } from 'react';

export interface OtpInputProps {
  /** Number of OTP digits */
  length?: number;
  /** On change callback */
  onChange?: (otp: string) => void;
  /** On complete callback */
  onComplete?: (otp: string) => void;
  /** Disabled state */
  disabled?: boolean;
  /** Error state */
  error?: boolean;
  /** Masked input */
  masked?: boolean;
  /** Auto focus first input */
  autoFocus?: boolean;
  /** Additional class name */
  className?: string;
}

export function OtpInput({
  length = 6,
  onChange,
  onComplete,
  disabled = false,
  error = false,
  masked = false,
  autoFocus = true,
  className = '',
}: OtpInputProps) {
  const [values, setValues] = useState<string[]>(Array(length).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (autoFocus && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [autoFocus]);

  const handleChange = (index: number, value: string) => {
    // Only allow digits
    if (value && !/^\d$/.test(value)) return;

    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);

    const otp = newValues.join('');
    onChange?.(otp);

    // Move to next input
    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Check if complete
    if (newValues.every((v) => v) && otp.length === length) {
      onComplete?.(otp);
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (!values[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, length);

    if (!/^\d+$/.test(pastedData)) return;

    const newValues = [...values];
    pastedData.split('').forEach((char, i) => {
      if (i < length) {
        newValues[i] = char;
      }
    });

    setValues(newValues);
    const otp = newValues.join('');
    onChange?.(otp);

    // Focus last filled or next empty input
    const lastIndex = Math.min(pastedData.length, length) - 1;
    inputRefs.current[lastIndex]?.focus();

    if (newValues.every((v) => v)) {
      onComplete?.(otp);
    }
  };

  return (
    <div className={`flex gap-2 ${className}`}>
      {values.map((value, index) => (
        <input
          key={index}
          ref={(el) => { inputRefs.current[index] = el; }}
          type={masked ? 'password' : 'text'}
          inputMode="numeric"
          pattern="\d*"
          maxLength={1}
          value={value}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          onFocus={(e) => e.target.select()}
          disabled={disabled}
          className={`
            w-12 h-14 text-center text-xl font-semibold
            border rounded-lg transition-colors
            focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
            ${error ? 'border-error-500 focus:ring-error-500 focus:border-error-500' : 'border-neutral-300 dark:border-neutral-600'}
            ${disabled ? 'bg-neutral-100 dark:bg-neutral-800 opacity-50 cursor-not-allowed' : 'bg-white dark:bg-neutral-900'}
            text-neutral-900 dark:text-white
          `}
          aria-label={`OTP digit ${index + 1}`}
        />
      ))}
    </div>
  );
}
