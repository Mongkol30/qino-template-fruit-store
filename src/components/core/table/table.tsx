import type { ReactNode, TdHTMLAttributes, ThHTMLAttributes } from 'react';

// Table Props
export interface TableProps {
  /** Table children */
  children: ReactNode;
  /** Striped rows */
  striped?: boolean;
  /** Hoverable rows */
  hoverable?: boolean;
  /** Bordered */
  bordered?: boolean;
  /** Compact sizing */
  compact?: boolean;
  /** Additional class name */
  className?: string;
}

export function Table({
  children,
  striped = false,
  hoverable = false,
  bordered = false,
  compact = false,
  className = '',
}: TableProps) {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table
        className={`
          w-full text-sm text-left
          ${bordered ? 'border border-neutral-200 dark:border-neutral-700' : ''}
        `}
        data-striped={striped}
        data-hoverable={hoverable}
        data-compact={compact}
      >
        {children}
      </table>
    </div>
  );
}

// TableHeader Props
export interface TableHeaderProps {
  /** Header children */
  children: ReactNode;
  /** Additional class name */
  className?: string;
}

export function TableHeader({ children, className = '' }: TableHeaderProps) {
  return (
    <thead className={`text-xs uppercase bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 ${className}`}>
      {children}
    </thead>
  );
}

// TableBody Props
export interface TableBodyProps {
  /** Body children */
  children: ReactNode;
  /** Additional class name */
  className?: string;
}

export function TableBody({ children, className = '' }: TableBodyProps) {
  return (
    <tbody className={`divide-y divide-neutral-200 dark:divide-neutral-700 ${className}`}>
      {children}
    </tbody>
  );
}

// TableRow Props
export interface TableRowProps {
  /** Row children */
  children: ReactNode;
  /** Selected state */
  selected?: boolean;
  /** Clickable */
  onClick?: () => void;
  /** Additional class name */
  className?: string;
}

export function TableRow({
  children,
  selected = false,
  onClick,
  className = '',
}: TableRowProps) {
  return (
    <tr
      onClick={onClick}
      className={`
        bg-white dark:bg-neutral-900
        ${onClick ? 'cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-800' : ''}
        ${selected ? 'bg-primary-50 dark:bg-primary-900/20' : ''}
        ${className}
      `.trim()}
    >
      {children}
    </tr>
  );
}

// TableCell Props
export interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
  /** Cell children */
  children?: ReactNode;
}

export function TableCell({ children, className = '', ...props }: TableCellProps) {
  return (
    <td className={`px-4 py-3 ${className}`} {...props}>
      {children}
    </td>
  );
}

// TableHeaderCell Props
export interface TableHeaderCellProps extends ThHTMLAttributes<HTMLTableCellElement> {
  /** Cell children */
  children?: ReactNode;
  /** Sortable */
  sortable?: boolean;
  /** Sort direction */
  sortDirection?: 'asc' | 'desc' | null;
  /** On sort click */
  onSort?: () => void;
}

export function TableHeaderCell({
  children,
  sortable = false,
  sortDirection = null,
  onSort,
  className = '',
  ...props
}: TableHeaderCellProps) {
  return (
    <th
      className={`
        px-4 py-3 font-semibold
        ${sortable ? 'cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-700 select-none' : ''}
        ${className}
      `.trim()}
      onClick={sortable ? onSort : undefined}
      {...props}
    >
      <span className="flex items-center gap-1">
        {children}
        {sortable && (
          <span className="flex flex-col">
            <svg
              className={`w-3 h-3 ${sortDirection === 'asc' ? 'text-primary-600' : 'text-neutral-400'}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M5 10l5-5 5 5H5z" />
            </svg>
            <svg
              className={`w-3 h-3 -mt-1 ${sortDirection === 'desc' ? 'text-primary-600' : 'text-neutral-400'}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M5 10l5 5 5-5H5z" />
            </svg>
          </span>
        )}
      </span>
    </th>
  );
}
