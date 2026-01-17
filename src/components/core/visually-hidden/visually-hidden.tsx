import type { HTMLAttributes } from 'react';

export interface VisuallyHiddenProps extends HTMLAttributes<HTMLSpanElement> {
  /** Content to hide visually but keep accessible */
  children: React.ReactNode;
  /** Render as different element */
  as?: 'span' | 'div';
}

export function VisuallyHidden({
  children,
  as: Component = 'span',
  ...props
}: VisuallyHiddenProps) {
  return (
    <Component
      {...props}
      style={{
        position: 'absolute',
        width: '1px',
        height: '1px',
        padding: 0,
        margin: '-1px',
        overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)',
        whiteSpace: 'nowrap',
        border: 0,
        ...props.style,
      }}
    >
      {children}
    </Component>
  );
}
