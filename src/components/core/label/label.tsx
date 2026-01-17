import type { LabelHTMLAttributes, ReactNode } from 'react';

export type LabelSize = 'sm' | 'md' | 'lg';

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  /** Label content */
  children: ReactNode;
  /** Label size */
  size?: LabelSize;
  /** Required field indicator */
  required?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Optional helper text */
  hint?: string;
}

const sizeStyles: Record<LabelSize, string> = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
};

export function Label({
  children,
  size = 'md',
  required = false,
  disabled = false,
  hint,
  className = '',
  ...props
}: LabelProps) {
  return (
    <label
      className={`
        inline-flex flex-col gap-0.5 font-medium
        text-neutral-700 dark:text-neutral-300
        ${sizeStyles[size]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `.trim()}
      {...props}
    >
      <span className="inline-flex items-center gap-1">
        {children}
        {required && <span className="text-error-500">*</span>}
      </span>
      {hint && (
        <span className="text-xs font-normal text-neutral-500 dark:text-neutral-400">
          {hint}
        </span>
      )}
    </label>
  );
}
