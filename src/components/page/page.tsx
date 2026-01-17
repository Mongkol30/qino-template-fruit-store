import { forwardRef, type ReactNode } from 'react';

import { SEO, type SEOProps } from '@components/seo';

export interface PageProps {
  /** Page title for SEO */
  title?: string;
  /** SEO props */
  seo?: Omit<SEOProps, 'title'>;
  /** Page content */
  children?: ReactNode;
  /** Additional class names */
  className?: string;
}

export const Page = forwardRef<HTMLDivElement, PageProps>(
  ({ title, seo, children, className = '' }, ref) => {
    return (
      <div ref={ref} className={className}>
        {title && <SEO title={title} {...seo} />}
        {children}
      </div>
    );
  }
);

Page.displayName = 'Page';
