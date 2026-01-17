export interface SEOProps {
  /** Page title */
  title?: string;
  /** Title template, use %s as placeholder for title */
  titleTemplate?: string;
  /** Default title when no title is provided */
  defaultTitle?: string;
  /** Meta description */
  description?: string;
  /** Canonical URL */
  canonical?: string;
  /** Open Graph properties */
  openGraph?: {
    title?: string;
    description?: string;
    url?: string;
    type?: 'website' | 'article' | 'profile';
    image?: string;
    imageAlt?: string;
    siteName?: string;
    locale?: string;
  };
  /** Twitter Card properties */
  twitter?: {
    card?: 'summary' | 'summary_large_image' | 'app' | 'player';
    site?: string;
    creator?: string;
    title?: string;
    description?: string;
    image?: string;
    imageAlt?: string;
  };
  /** Robots meta tag */
  robots?: string;
  /** Additional meta tags */
  meta?: Array<{
    name?: string;
    property?: string;
    content: string;
  }>;
  /** Keywords for SEO */
  keywords?: string[];
}

/**
 * SEO Component using React 19 native Document Metadata support.
 * React 19 automatically hoists <title>, <meta>, and <link> tags to <head>.
 * @see https://react.dev/blog/2024/12/05/react-19#support-for-metadata-tags
 */
export function SEO({
  title,
  titleTemplate = '%s',
  defaultTitle = '',
  description,
  canonical,
  openGraph,
  twitter,
  robots,
  meta = [],
  keywords,
}: SEOProps) {
  const pageTitle = title ? titleTemplate.replace('%s', title) : defaultTitle;

  const ogTitle = openGraph?.title || title;
  const ogDescription = openGraph?.description || description;
  const ogUrl = openGraph?.url || canonical;

  const twitterTitle = twitter?.title || ogTitle;
  const twitterDescription = twitter?.description || ogDescription;
  const twitterImage = twitter?.image || openGraph?.image;
  const twitterImageAlt = twitter?.imageAlt || openGraph?.imageAlt;

  return (
    <>
      {/* Document Title */}
      {pageTitle && <title>{pageTitle}</title>}

      {/* Basic Meta Tags */}
      {description && <meta name="description" content={description} />}
      {robots && <meta name="robots" content={robots} />}
      {keywords && keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(', ')} />
      )}

      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Open Graph Tags */}
      {ogTitle && <meta property="og:title" content={ogTitle} />}
      {ogDescription && <meta property="og:description" content={ogDescription} />}
      {ogUrl && <meta property="og:url" content={ogUrl} />}
      {openGraph?.type && <meta property="og:type" content={openGraph.type} />}
      {openGraph?.image && <meta property="og:image" content={openGraph.image} />}
      {openGraph?.imageAlt && <meta property="og:image:alt" content={openGraph.imageAlt} />}
      {openGraph?.siteName && <meta property="og:site_name" content={openGraph.siteName} />}
      {openGraph?.locale && <meta property="og:locale" content={openGraph.locale} />}

      {/* Twitter Card Tags */}
      {twitter && <meta name="twitter:card" content={twitter.card || 'summary'} />}
      {twitter?.site && <meta name="twitter:site" content={twitter.site} />}
      {twitter?.creator && <meta name="twitter:creator" content={twitter.creator} />}
      {twitterTitle && twitter && <meta name="twitter:title" content={twitterTitle} />}
      {twitterDescription && twitter && (
        <meta name="twitter:description" content={twitterDescription} />
      )}
      {twitterImage && <meta name="twitter:image" content={twitterImage} />}
      {twitterImageAlt && <meta name="twitter:image:alt" content={twitterImageAlt} />}

      {/* Additional Custom Meta Tags */}
      {meta.map(({ name, property, content }, index) =>
        name ? (
          <meta key={`meta-name-${name}-${index}`} name={name} content={content} />
        ) : property ? (
          <meta key={`meta-prop-${property}-${index}`} property={property} content={content} />
        ) : null
      )}
    </>
  );
}
