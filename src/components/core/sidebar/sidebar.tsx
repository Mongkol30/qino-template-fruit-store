import type { HTMLAttributes, ReactNode } from 'react';

export interface SidebarProps extends HTMLAttributes<HTMLElement> {
  /** Sidebar content */
  children: ReactNode;
  /** Collapsed state */
  collapsed?: boolean;
  /** Width when expanded */
  width?: string | number;
  /** Width when collapsed */
  collapsedWidth?: string | number;
  /** Position */
  position?: 'left' | 'right';
  /** Fixed position */
  fixed?: boolean;
}

export function Sidebar({
  children,
  collapsed = false,
  width = 256,
  collapsedWidth = 64,
  position = 'left',
  fixed = false,
  className = '',
  ...props
}: SidebarProps) {
  const widthValue = collapsed ? collapsedWidth : width;
  const widthStyle = typeof widthValue === 'number' ? `${widthValue}px` : widthValue;

  return (
    <aside
      className={`
        h-full bg-white dark:bg-neutral-900
        border-neutral-200 dark:border-neutral-700
        transition-all duration-300 ease-in-out
        ${position === 'left' ? 'border-r' : 'border-l'}
        ${fixed ? 'fixed top-0 bottom-0' : ''}
        ${fixed && position === 'left' ? 'left-0' : ''}
        ${fixed && position === 'right' ? 'right-0' : ''}
        ${className}
      `.trim()}
      style={{ width: widthStyle }}
      {...props}
    >
      {children}
    </aside>
  );
}

// SidebarHeader
export interface SidebarHeaderProps extends HTMLAttributes<HTMLDivElement> {
  /** Header content */
  children: ReactNode;
}

export function SidebarHeader({ children, className = '', ...props }: SidebarHeaderProps) {
  return (
    <div
      className={`px-4 py-4 border-b border-neutral-200 dark:border-neutral-700 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

// SidebarContent
export interface SidebarContentProps extends HTMLAttributes<HTMLDivElement> {
  /** Content */
  children: ReactNode;
}

export function SidebarContent({ children, className = '', ...props }: SidebarContentProps) {
  return (
    <div className={`flex-1 overflow-y-auto py-4 ${className}`} {...props}>
      {children}
    </div>
  );
}

// SidebarFooter
export interface SidebarFooterProps extends HTMLAttributes<HTMLDivElement> {
  /** Footer content */
  children: ReactNode;
}

export function SidebarFooter({ children, className = '', ...props }: SidebarFooterProps) {
  return (
    <div
      className={`px-4 py-4 border-t border-neutral-200 dark:border-neutral-700 mt-auto ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

// SidebarItem
export interface SidebarItemProps {
  /** Item icon */
  icon?: ReactNode;
  /** Item label */
  label: ReactNode;
  /** Click handler */
  onClick?: () => void;
  /** Active state */
  active?: boolean;
  /** Collapsed mode (icon only) */
  collapsed?: boolean;
  /** Disabled state */
  disabled?: boolean;
}

export function SidebarItem({
  icon,
  label,
  onClick,
  active = false,
  collapsed = false,
  disabled = false,
}: SidebarItemProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full flex items-center gap-3 px-4 py-2.5
        text-sm font-medium transition-colors
        ${active
          ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
          : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
        }
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${collapsed ? 'justify-center' : ''}
      `.trim()}
    >
      {icon && <span className="w-5 h-5 flex-shrink-0">{icon}</span>}
      {!collapsed && <span className="truncate">{label}</span>}
    </button>
  );
}

// SidebarGroup
export interface SidebarGroupProps extends HTMLAttributes<HTMLDivElement> {
  /** Group label */
  label?: string;
  /** Group children */
  children: ReactNode;
  /** Collapsed mode */
  collapsed?: boolean;
}

export function SidebarGroup({
  label,
  children,
  collapsed = false,
  className = '',
  ...props
}: SidebarGroupProps) {
  return (
    <div className={`mb-4 ${className}`} {...props}>
      {label && !collapsed && (
        <div className="px-4 py-2 text-xs font-semibold uppercase text-neutral-400 dark:text-neutral-500">
          {label}
        </div>
      )}
      {children}
    </div>
  );
}
