import type { HTMLAttributes, ReactNode } from 'react';
import { useCallback, useMemo, useState } from 'react';

// ============ Types ============
export interface DataGridColumn<T> {
  key: string;
  header: string;
  width?: number | string;
  minWidth?: number;
  sortable?: boolean;
  render?: (value: T[keyof T], row: T, index: number) => ReactNode;
  align?: 'left' | 'center' | 'right';
}

export type SortDirection = 'asc' | 'desc' | null;

export interface SortState {
  key: string;
  direction: SortDirection;
}

// ============ DataGrid ============
export interface DataGridProps<T> extends Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /** Column definitions */
  columns: DataGridColumn<T>[];
  /** Data rows */
  data: T[];
  /** Row key accessor */
  rowKey: keyof T | ((row: T) => string);
  /** Enable row selection */
  selectable?: boolean;
  /** Selected row keys */
  selected?: string[];
  /** On selection change */
  onSelect?: (selected: string[]) => void;
  /** Enable sorting */
  sortable?: boolean;
  /** Sort state */
  sortState?: SortState;
  /** On sort change */
  onSort?: (sortState: SortState) => void;
  /** Loading state */
  loading?: boolean;
  /** Empty state content */
  emptyContent?: ReactNode;
  /** Striped rows */
  striped?: boolean;
  /** Hover effect */
  hoverable?: boolean;
  /** Compact size */
  compact?: boolean;
  /** Border style */
  bordered?: boolean;
  /** Additional class name */
  className?: string;
}

export function DataGrid<T extends Record<string, unknown>>({
  columns,
  data,
  rowKey,
  selectable = false,
  selected = [],
  onSelect,
  sortable = false,
  sortState,
  onSort,
  loading = false,
  emptyContent = 'No data available',
  striped = false,
  hoverable = true,
  compact = false,
  bordered = true,
  className = '',
  ...props
}: DataGridProps<T>) {
  const [internalSort, setInternalSort] = useState<SortState>({ key: '', direction: null });

  const currentSort = sortState || internalSort;

  const getRowKey = useCallback(
    (row: T, index: number): string => {
      if (typeof rowKey === 'function') {
        return rowKey(row);
      }
      return String(row[rowKey] ?? index);
    },
    [rowKey]
  );

  const handleSort = useCallback(
    (key: string) => {
      const newDirection: SortDirection =
        currentSort.key === key
          ? currentSort.direction === 'asc'
            ? 'desc'
            : currentSort.direction === 'desc'
              ? null
              : 'asc'
          : 'asc';

      const newSort = { key, direction: newDirection };
      setInternalSort(newSort);
      onSort?.(newSort);
    },
    [currentSort, onSort]
  );

  const handleSelectAll = useCallback(() => {
    if (selected.length === data.length) {
      onSelect?.([]);
    } else {
      const allKeys = data.map((row, index) => getRowKey(row, index));
      onSelect?.(allKeys);
    }
  }, [data, selected, onSelect, getRowKey]);

  const handleSelectRow = useCallback(
    (key: string) => {
      const newSelected = selected.includes(key)
        ? selected.filter((s) => s !== key)
        : [...selected, key];
      onSelect?.(newSelected);
    },
    [selected, onSelect]
  );

  const sortedData = useMemo(() => {
    if (!currentSort.key || !currentSort.direction) return data;

    return [...data].sort((a, b) => {
      const aVal = a[currentSort.key];
      const bVal = b[currentSort.key];

      if (aVal === bVal) return 0;
      if (aVal === null || aVal === undefined) return 1;
      if (bVal === null || bVal === undefined) return -1;

      const comparison = aVal < bVal ? -1 : 1;
      return currentSort.direction === 'asc' ? comparison : -comparison;
    });
  }, [data, currentSort]);

  const cellPadding = compact ? 'px-3 py-2' : 'px-4 py-3';

  return (
    <div
      className={`overflow-auto ${bordered ? 'border border-neutral-200 dark:border-neutral-700 rounded-lg' : ''} ${className}`}
      {...props}
    >
      <table className="w-full text-sm">
        {/* Header */}
        <thead className="bg-neutral-50 dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700">
          <tr>
            {selectable && (
              <th className={`${cellPadding} w-12`}>
                <input
                  type="checkbox"
                  checked={data.length > 0 && selected.length === data.length}
                  onChange={handleSelectAll}
                  className="w-4 h-4 rounded border-neutral-300 dark:border-neutral-600
                    text-primary-600 focus:ring-primary-500"
                />
              </th>
            )}
            {columns.map((column) => (
              <th
                key={column.key}
                className={`
                  ${cellPadding} font-medium text-neutral-700 dark:text-neutral-300
                  text-${column.align || 'left'}
                  ${sortable && column.sortable !== false ? 'cursor-pointer select-none hover:bg-neutral-100 dark:hover:bg-neutral-700' : ''}
                `}
                style={{ width: column.width, minWidth: column.minWidth }}
                onClick={() => sortable && column.sortable !== false && handleSort(column.key)}
              >
                <div className="flex items-center gap-1">
                  <span>{column.header}</span>
                  {sortable && column.sortable !== false && (
                    <span className="flex flex-col">
                      <svg
                        className={`w-3 h-3 ${currentSort.key === column.key && currentSort.direction === 'asc' ? 'text-primary-500' : 'text-neutral-400'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 3l-7 7h14l-7-7z" />
                      </svg>
                      <svg
                        className={`w-3 h-3 -mt-1 ${currentSort.key === column.key && currentSort.direction === 'desc' ? 'text-primary-500' : 'text-neutral-400'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 17l7-7H3l7 7z" />
                      </svg>
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>

        {/* Body */}
        <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
          {loading ? (
            <tr>
              <td colSpan={columns.length + (selectable ? 1 : 0)} className={`${cellPadding} text-center`}>
                <div className="flex items-center justify-center gap-2 text-neutral-500">
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Loading...
                </div>
              </td>
            </tr>
          ) : sortedData.length === 0 ? (
            <tr>
              <td colSpan={columns.length + (selectable ? 1 : 0)} className={`${cellPadding} text-center text-neutral-500`}>
                {emptyContent}
              </td>
            </tr>
          ) : (
            sortedData.map((row, rowIndex) => {
              const key = getRowKey(row, rowIndex);
              const isSelected = selected.includes(key);

              return (
                <tr
                  key={key}
                  className={`
                    ${striped && rowIndex % 2 === 1 ? 'bg-neutral-50 dark:bg-neutral-800/50' : ''}
                    ${hoverable ? 'hover:bg-neutral-100 dark:hover:bg-neutral-800' : ''}
                    ${isSelected ? 'bg-primary-50 dark:bg-primary-900/20' : ''}
                  `}
                >
                  {selectable && (
                    <td className={cellPadding}>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleSelectRow(key)}
                        className="w-4 h-4 rounded border-neutral-300 dark:border-neutral-600
                          text-primary-600 focus:ring-primary-500"
                      />
                    </td>
                  )}
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={`${cellPadding} text-${column.align || 'left'} text-neutral-900 dark:text-neutral-100`}
                    >
                      {column.render
                        ? column.render(row[column.key] as T[keyof T], row, rowIndex)
                        : String(row[column.key] ?? '')}
                    </td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
