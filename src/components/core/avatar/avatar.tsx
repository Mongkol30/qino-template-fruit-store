import type { HTMLAttributes, ReactNode } from 'react';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type AvatarStatus = 'online' | 'offline' | 'busy' | 'away';

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  /** Image source URL */
  src?: string;
  /** Alt text */
  alt?: string;
  /** Fallback initials or content */
  fallback?: ReactNode;
  /** Avatar size */
  size?: AvatarSize;
  /** Status indicator */
  status?: AvatarStatus;
  /** Show status indicator */
  showStatus?: boolean;
  /** Border style */
  bordered?: boolean;
}

const sizeStyles: Record<AvatarSize, { container: string; text: string; status: string }> = {
  xs: { container: 'h-6 w-6', text: 'text-xs', status: 'h-1.5 w-1.5' },
  sm: { container: 'h-8 w-8', text: 'text-sm', status: 'h-2 w-2' },
  md: { container: 'h-10 w-10', text: 'text-base', status: 'h-2.5 w-2.5' },
  lg: { container: 'h-12 w-12', text: 'text-lg', status: 'h-3 w-3' },
  xl: { container: 'h-16 w-16', text: 'text-xl', status: 'h-4 w-4' },
  '2xl': { container: 'h-20 w-20', text: 'text-2xl', status: 'h-5 w-5' },
};

const statusColors: Record<AvatarStatus, string> = {
  online: 'bg-success-500',
  offline: 'bg-neutral-400',
  busy: 'bg-error-500',
  away: 'bg-warning-500',
};

export function Avatar({
  src,
  alt = '',
  fallback,
  size = 'md',
  status = 'offline',
  showStatus = false,
  bordered = false,
  className = '',
  ...props
}: AvatarProps) {
  const { container, text, status: statusSize } = sizeStyles[size];

  // Generate initials from alt text
  const getInitials = (name: string) => {
    const words = name.trim().split(' ');
    if (words.length >= 2) {
      return `${words[0][0]}${words[1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <div
      className={`
        relative inline-flex items-center justify-center
        ${container}
        rounded-full overflow-hidden
        bg-neutral-200 dark:bg-neutral-700
        ${bordered ? 'ring-2 ring-white dark:ring-neutral-800' : ''}
        ${className}
      `.trim()}
      {...props}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      ) : (
        <span
          className={`
            font-medium text-neutral-600 dark:text-neutral-300
            ${text}
          `}
        >
          {fallback ?? getInitials(alt)}
        </span>
      )}

      {showStatus && (
        <span
          className={`
            absolute bottom-0 right-0
            ${statusSize}
            rounded-full
            ${statusColors[status]}
            ring-2 ring-white dark:ring-neutral-800
          `}
        />
      )}
    </div>
  );
}
