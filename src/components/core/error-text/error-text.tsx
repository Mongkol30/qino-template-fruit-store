import type { HTMLAttributes, ReactNode } from 'react';

export interface ErrorTextProps extends HTMLAttributes<HTMLParagraphElement> {
  /** Error message */
  children: ReactNode;
  /** Show error icon */
  showIcon?: boolean;
}

export function ErrorText({
  children,
  showIcon = true,
  className = '',
  ...props
}: ErrorTextProps) {
  return (
    <p
      role="alert"
      className={`
        flex items-center gap-1.5 text-sm text-error-600 dark:text-error-400
        ${className}
      `.trim()}
      {...props}
    >
      {showIcon && (
        <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )}
      {children}
    </p>
  );
}
