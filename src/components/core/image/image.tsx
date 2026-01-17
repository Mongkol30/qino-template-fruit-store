import type { ImgHTMLAttributes } from 'react';

export type ImageFit = 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
export type ImageRadius = 'none' | 'sm' | 'md' | 'lg' | 'full';

export interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  /** Image source URL */
  src: string;
  /** Alt text for accessibility */
  alt: string;
  /** Object fit style */
  fit?: ImageFit;
  /** Border radius */
  radius?: ImageRadius;
  /** Aspect ratio (e.g., "16/9", "4/3", "1/1") */
  aspectRatio?: string;
  /** Fallback image URL */
  fallback?: string;
  /** Show skeleton while loading */
  skeleton?: boolean;
}

const fitStyles: Record<ImageFit, string> = {
  contain: 'object-contain',
  cover: 'object-cover',
  fill: 'object-fill',
  none: 'object-none',
  'scale-down': 'object-scale-down',
};

const radiusStyles: Record<ImageRadius, string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full',
};

export function Image({
  src,
  alt,
  fit = 'cover',
  radius = 'none',
  aspectRatio,
  fallback,
  skeleton = false,
  className = '',
  onError,
  ...props
}: ImageProps) {
  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    if (fallback) {
      e.currentTarget.src = fallback;
    }
    onError?.(e);
  };

  const aspectStyle = aspectRatio ? { aspectRatio } : {};

  return (
    <img
      src={src}
      alt={alt}
      onError={handleError}
      loading="lazy"
      style={aspectStyle}
      className={`
        ${fitStyles[fit]}
        ${radiusStyles[radius]}
        ${skeleton ? 'animate-pulse bg-neutral-200 dark:bg-neutral-700' : ''}
        ${className}
      `.trim()}
      {...props}
    />
  );
}
