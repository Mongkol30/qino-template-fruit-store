import type { ReactNode } from 'react';
import { Link, useLocation } from 'react-router';

export interface BreadcrumbItem {
  /** Breadcrumb label */
  label: ReactNode;
  /** Link href (optional for last item) */
  href?: string;
  /** Custom icon */
  icon?: ReactNode;
}

export interface BreadcrumbProps {
  /** Breadcrumb items */
  items: BreadcrumbItem[];
  /** Separator */
  separator?: ReactNode;
  /** Max items before collapse */
  maxItems?: number;
  /** Additional class name */
  className?: string;
}

function DefaultSeparator() {
  return (
    <svg
      className="w-4 h-4 text-neutral-400"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        fillRule="evenodd"
        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function Breadcrumb({
  items,
  separator = <DefaultSeparator />,
  maxItems,
  className = '',
}: BreadcrumbProps) {
  const location = useLocation();

  // Handle collapse if maxItems is set
  let displayItems = items;
  let collapsed = false;

  if (maxItems && items.length > maxItems) {
    const firstItems = items.slice(0, 1);
    const lastItems = items.slice(-maxItems + 2);
    displayItems = [...firstItems, { label: '...', href: undefined }, ...lastItems];
    collapsed = true;
  }

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex items-center gap-2">
        {displayItems.map((item, index) => {
          const isLast = index === displayItems.length - 1;
          const isCollapsed = collapsed && index === 1;

          return (
            <li key={index} className="flex items-center gap-2">
              {index > 0 && <span className="text-neutral-400">{separator}</span>}

              {isCollapsed ? (
                <span className="text-sm text-neutral-400 px-1">...</span>
              ) : isLast || !item.href ? (
                <span
                  className="text-sm font-medium text-neutral-900 dark:text-white flex items-center gap-1.5"
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.icon}
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.href}
                  className={`
                    text-sm text-neutral-500 hover:text-neutral-700
                    dark:text-neutral-400 dark:hover:text-neutral-300
                    flex items-center gap-1.5 transition-colors
                    ${location.pathname === item.href ? 'font-medium' : ''}
                  `}
                >
                  {item.icon}
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
