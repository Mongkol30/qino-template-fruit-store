import type { FormHTMLAttributes, ReactNode } from 'react';
import { createContext, useContext, useId, useMemo, useState } from 'react';

// Form Context
interface FormContextValue {
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const FormContext = createContext<FormContextValue>({});

export function useFormContext() {
  return useContext(FormContext);
}

// Form Props
export interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  /** Form children */
  children: ReactNode;
  /** Disable all form fields */
  disabled?: boolean;
  /** Form field size */
  size?: 'sm' | 'md' | 'lg';
}

export function Form({
  children,
  disabled = false,
  size = 'md',
  className = '',
  ...props
}: FormProps) {
  const contextValue = useMemo(() => ({ disabled, size }), [disabled, size]);

  return (
    <FormContext.Provider value={contextValue}>
      <form className={`space-y-4 ${className}`} {...props}>
        {children}
      </form>
    </FormContext.Provider>
  );
}

// FormItem Context
interface FormItemContextValue {
  id: string;
  hasError: boolean;
  isRequired: boolean;
}

const FormItemContext = createContext<FormItemContextValue | null>(null);

export function useFormItemContext() {
  return useContext(FormItemContext);
}

// FormItem Props
export interface FormItemProps {
  /** Form item children */
  children: ReactNode;
  /** Error state */
  error?: boolean;
  /** Required field */
  required?: boolean;
  /** Additional class name */
  className?: string;
}

export function FormItem({
  children,
  error = false,
  required = false,
  className = '',
}: FormItemProps) {
  const id = useId();
  const [hasError] = useState(error);

  const contextValue = useMemo(
    () => ({ id, hasError: hasError || error, isRequired: required }),
    [id, hasError, error, required]
  );

  return (
    <FormItemContext.Provider value={contextValue}>
      <div className={`space-y-1.5 ${className}`}>{children}</div>
    </FormItemContext.Provider>
  );
}

// FormLabel Props
export interface FormLabelProps {
  /** Label text */
  children: ReactNode;
  /** Additional class name */
  className?: string;
}

export function FormLabel({ children, className = '' }: FormLabelProps) {
  const formItem = useFormItemContext();

  return (
    <label
      htmlFor={formItem?.id}
      className={`
        block text-sm font-medium text-neutral-700 dark:text-neutral-300
        ${className}
      `.trim()}
    >
      {children}
      {formItem?.isRequired && (
        <span className="text-error-500 ml-1" aria-hidden="true">
          *
        </span>
      )}
    </label>
  );
}

// FormHelperText Props
export interface FormHelperTextProps {
  /** Helper text content */
  children: ReactNode;
  /** Additional class name */
  className?: string;
}

export function FormHelperText({ children, className = '' }: FormHelperTextProps) {
  const formItem = useFormItemContext();

  if (formItem?.hasError) return null;

  return (
    <p
      id={formItem ? `${formItem.id}-helper` : undefined}
      className={`text-sm text-neutral-500 dark:text-neutral-400 ${className}`}
    >
      {children}
    </p>
  );
}

// FormErrorMessage Props
export interface FormErrorMessageProps {
  /** Error message content */
  children: ReactNode;
  /** Additional class name */
  className?: string;
}

export function FormErrorMessage({ children, className = '' }: FormErrorMessageProps) {
  const formItem = useFormItemContext();

  if (!formItem?.hasError) return null;

  return (
    <p
      id={formItem ? `${formItem.id}-error` : undefined}
      role="alert"
      className={`text-sm text-error-500 flex items-center gap-1 ${className}`}
    >
      <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
          clipRule="evenodd"
        />
      </svg>
      {children}
    </p>
  );
}
