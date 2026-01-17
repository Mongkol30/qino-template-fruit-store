import type { HTMLAttributes } from 'react';

export interface PaginationProps extends Omit<HTMLAttributes<HTMLElement>, 'onChange'> {
  /** Current page (1-indexed) */
  currentPage: number;
  /** Total number of pages */
  totalPages: number;
  /** On page change callback */
  onPageChange: (page: number) => void;
  /** Number of sibling pages to show */
  siblingCount?: number;
  /** Show first/last buttons */
  showFirstLast?: boolean;
  /** Disabled state */
  disabled?: boolean;
}

function generatePagination(
  currentPage: number,
  totalPages: number,
  siblingCount: number
): (number | 'ellipsis')[] {
  const totalNumbers = siblingCount * 2 + 5; // siblings + first + last + current + 2 ellipsis

  if (totalPages <= totalNumbers) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

  const showLeftEllipsis = leftSiblingIndex > 2;
  const showRightEllipsis = rightSiblingIndex < totalPages - 1;

  if (!showLeftEllipsis && showRightEllipsis) {
    const leftItemCount = 3 + 2 * siblingCount;
    const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
    return [...leftRange, 'ellipsis', totalPages];
  }

  if (showLeftEllipsis && !showRightEllipsis) {
    const rightItemCount = 3 + 2 * siblingCount;
    const rightRange = Array.from(
      { length: rightItemCount },
      (_, i) => totalPages - rightItemCount + i + 1
    );
    return [1, 'ellipsis', ...rightRange];
  }

  const middleRange = Array.from(
    { length: rightSiblingIndex - leftSiblingIndex + 1 },
    (_, i) => leftSiblingIndex + i
  );
  return [1, 'ellipsis', ...middleRange, 'ellipsis', totalPages];
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  showFirstLast = true,
  disabled = false,
  className = '',
  ...props
}: PaginationProps) {
  const pages = generatePagination(currentPage, totalPages, siblingCount);

  const buttonClass = `
    inline-flex items-center justify-center w-9 h-9 text-sm font-medium rounded-lg
    transition-colors disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const activeClass = 'bg-primary-600 text-white';
  const inactiveClass =
    'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800';

  return (
    <nav
      role="navigation"
      aria-label="Pagination"
      className={`flex items-center gap-1 ${className}`}
      {...props}
    >
      {/* First */}
      {showFirstLast && (
        <button
          onClick={() => onPageChange(1)}
          disabled={disabled || currentPage === 1}
          className={`${buttonClass} ${inactiveClass}`}
          aria-label="Go to first page"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
        </button>
      )}

      {/* Previous */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={disabled || currentPage === 1}
        className={`${buttonClass} ${inactiveClass}`}
        aria-label="Go to previous page"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      </button>

      {/* Page numbers */}
      {pages.map((page, index) => {
        if (page === 'ellipsis') {
          return (
            <span
              key={`ellipsis-${index}`}
              className="w-9 h-9 flex items-center justify-center text-neutral-400"
            >
              ...
            </span>
          );
        }

        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            disabled={disabled}
            className={`${buttonClass} ${page === currentPage ? activeClass : inactiveClass}`}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </button>
        );
      })}

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={disabled || currentPage === totalPages}
        className={`${buttonClass} ${inactiveClass}`}
        aria-label="Go to next page"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
      </button>

      {/* Last */}
      {showFirstLast && (
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={disabled || currentPage === totalPages}
          className={`${buttonClass} ${inactiveClass}`}
          aria-label="Go to last page"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
            <path fillRule="evenodd" d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </button>
      )}
    </nav>
  );
}
