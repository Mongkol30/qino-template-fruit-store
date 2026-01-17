import type { HTMLAttributes } from 'react';

export type SkeletonVariant = 'text' | 'circular' | 'rectangular' | 'rounded';

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  /** Skeleton variant */
  variant?: SkeletonVariant;
  /** Width (e.g., '100px', '50%', 'full') */
  width?: string | number;
  /** Height (e.g., '20px', '2rem') */
  height?: string | number;
  /** Animate the skeleton */
  animate?: boolean;
}

const variantStyles: Record<SkeletonVariant, string> = {
  text: 'rounded',
  circular: 'rounded-full',
  rectangular: 'rounded-none',
  rounded: 'rounded-lg',
};

export function Skeleton({
  variant = 'text',
  width,
  height,
  animate = true,
  className = '',
  ...props
}: SkeletonProps) {
  const widthStyle = width === 'full' ? '100%' : width;
  const heightStyle = variant === 'text' && !height ? '1em' : height;

  return (
    <div
      aria-hidden="true"
      className={`
        bg-neutral-200 dark:bg-neutral-700
        ${variantStyles[variant]}
        ${animate ? 'animate-pulse' : ''}
        ${className}
      `.trim()}
      style={{
        width: widthStyle,
        height: heightStyle,
      }}
      {...props}
    />
  );
}

// Preset skeleton components
export function SkeletonText({ lines = 3, className = '' }: { lines?: number; className?: string }) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          variant="text"
          width={i === lines - 1 ? '60%' : '100%'}
          height="1rem"
        />
      ))}
    </div>
  );
}

export function SkeletonAvatar({ size = 40 }: { size?: number }) {
  return <Skeleton variant="circular" width={size} height={size} />;
}

export function SkeletonCard({ className = '' }: { className?: string }) {
  return (
    <div className={`p-4 border border-neutral-200 dark:border-neutral-700 rounded-xl ${className}`}>
      <Skeleton variant="rounded" height={160} width="full" className="mb-4" />
      <Skeleton variant="text" width="70%" height="1.5rem" className="mb-2" />
      <SkeletonText lines={2} />
    </div>
  );
}
