import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export interface PortalProps {
  /** Portal children */
  children: ReactNode;
  /** Container element or selector */
  container?: HTMLElement | string;
}

export function Portal({ children, container }: PortalProps) {
  const [mountNode, setMountNode] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let node: HTMLElement | null = null;

    if (container) {
      if (typeof container === 'string') {
        node = document.querySelector(container);
      } else {
        node = container;
      }
    } else {
      node = document.body;
    }

    setMountNode(node);
  }, [container]);

  if (!mountNode) return null;

  return createPortal(children, mountNode);
}
