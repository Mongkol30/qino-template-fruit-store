import type { HTMLAttributes, ReactNode } from 'react';

export type ChipVariant = 'solid' | 'outline' | 'soft';
export type ChipColor = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'neutral';
export type ChipSize = 'sm' | 'md' | 'lg';

export interface ChipProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'onClick'> {
  /** Chip label */
  label: string;
  /** Chip variant */
  variant?: ChipVariant;
  /** Chip color */
  color?: ChipColor;
  /** Chip size */
  size?: ChipSize;
  /** Leading icon */
  icon?: ReactNode;
  /** Avatar URL */
  avatar?: string;
  /** Deletable */
  onDelete?: () => void;
  /** Clickable */
  onClick?: () => void;
  /** Disabled */
  disabled?: boolean;
}

const sizeStyles: Record<ChipSize, { chip: string; avatar: string; deleteBtn: string }> = {
  sm: { chip: 'h-6 text-xs gap-1 pl-2 pr-1', avatar: 'w-4 h-4 -ml-1', deleteBtn: 'w-4 h-4' },
  md: { chip: 'h-8 text-sm gap-1.5 pl-3 pr-1.5', avatar: 'w-5 h-5 -ml-1.5', deleteBtn: 'w-5 h-5' },
  lg: { chip: 'h-10 text-base gap-2 pl-4 pr-2', avatar: 'w-6 h-6 -ml-2', deleteBtn: 'w-6 h-6' },
};

const colorStyles: Record<ChipColor, Record<ChipVariant, string>> = {
  primary: {
    solid: 'bg-primary-600 text-white hover:bg-primary-700',
    outline: 'border border-primary-600 text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-950',
    soft: 'bg-primary-100 text-primary-700 hover:bg-primary-200 dark:bg-primary-900/30 dark:text-primary-300 dark:hover:bg-primary-900/50',
  },
  secondary: {
    solid: 'bg-secondary-600 text-white hover:bg-secondary-700',
    outline: 'border border-secondary-600 text-secondary-600 hover:bg-secondary-50 dark:hover:bg-secondary-950',
    soft: 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200 dark:bg-secondary-900/30 dark:text-secondary-300 dark:hover:bg-secondary-900/50',
  },
  success: {
    solid: 'bg-success-500 text-white hover:bg-success-600',
    outline: 'border border-success-500 text-success-600 hover:bg-success-50 dark:hover:bg-success-950',
    soft: 'bg-success-100 text-success-700 hover:bg-success-200 dark:bg-success-900/30 dark:text-success-300 dark:hover:bg-success-900/50',
  },
  warning: {
    solid: 'bg-warning-500 text-white hover:bg-warning-600',
    outline: 'border border-warning-500 text-warning-600 hover:bg-warning-50 dark:hover:bg-warning-950',
    soft: 'bg-warning-100 text-warning-700 hover:bg-warning-200 dark:bg-warning-900/30 dark:text-warning-300 dark:hover:bg-warning-900/50',
  },
  error: {
    solid: 'bg-error-500 text-white hover:bg-error-600',
    outline: 'border border-error-500 text-error-600 hover:bg-error-50 dark:hover:bg-error-950',
    soft: 'bg-error-100 text-error-700 hover:bg-error-200 dark:bg-error-900/30 dark:text-error-300 dark:hover:bg-error-900/50',
  },
  info: {
    solid: 'bg-info-500 text-white hover:bg-info-600',
    outline: 'border border-info-500 text-info-600 hover:bg-info-50 dark:hover:bg-info-950',
    soft: 'bg-info-100 text-info-700 hover:bg-info-200 dark:bg-info-900/30 dark:text-info-300 dark:hover:bg-info-900/50',
  },
  neutral: {
    solid: 'bg-neutral-600 text-white hover:bg-neutral-700',
    outline: 'border border-neutral-400 text-neutral-600 hover:bg-neutral-100 dark:border-neutral-500 dark:text-neutral-400 dark:hover:bg-neutral-800',
    soft: 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700',
  },
};

export function Chip({
  label,
  variant = 'soft',
  color = 'primary',
  size = 'md',
  icon,
  avatar,
  onDelete,
  onClick,
  disabled = false,
  className = '',
  ...props
}: ChipProps) {
  const styles = sizeStyles[size];
  const isClickable = !disabled && (onClick || onDelete);

  return (
    <span
      role={onClick ? 'button' : undefined}
      tabIndex={onClick && !disabled ? 0 : undefined}
      onClick={disabled ? undefined : onClick}
      onKeyDown={(e) => {
        if (!disabled && onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
      className={`
        inline-flex items-center rounded-full font-medium transition-colors
        ${styles.chip}
        ${colorStyles[color][variant]}
        ${isClickable ? 'cursor-pointer' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${!onDelete ? 'pr-3' : ''}
        ${className}
      `.trim()}
      {...props}
    >
      {avatar && (
        <img
          src={avatar}
          alt=""
          className={`${styles.avatar} rounded-full object-cover`}
        />
      )}
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span className="truncate">{label}</span>
      {onDelete && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            if (!disabled) onDelete();
          }}
          disabled={disabled}
          className={`
            ${styles.deleteBtn} rounded-full flex items-center justify-center
            hover:bg-black/10 dark:hover:bg-white/10 transition-colors
            disabled:cursor-not-allowed
          `}
          aria-label="Remove"
        >
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      )}
    </span>
  );
}
