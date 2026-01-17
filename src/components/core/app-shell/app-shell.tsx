import type { HTMLAttributes, ReactNode } from 'react';
import { createContext, forwardRef, useContext, useState } from 'react';

// ============ Context ============
interface AppShellContextValue {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

const AppShellContext = createContext<AppShellContextValue | null>(null);

export function useAppShell() {
  const context = useContext(AppShellContext);
  if (!context) {
    throw new Error('useAppShell must be used within AppShell');
  }
  return context;
}

// ============ AppShell ============
export interface AppShellProps extends HTMLAttributes<HTMLDivElement> {
  /** Children elements */
  children: ReactNode;
  /** Layout type */
  layout?: 'default' | 'alt';
  /** Additional class name */
  className?: string;
}

export const AppShell = forwardRef<HTMLDivElement, AppShellProps>(
  ({ children, layout = 'default', className = '', ...props }, ref) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    return (
      <AppShellContext.Provider
        value={{ sidebarOpen, setSidebarOpen, sidebarCollapsed, setSidebarCollapsed }}
      >
        <div
          ref={ref}
          className={`min-h-screen bg-neutral-50 dark:bg-neutral-950 ${className}`}
          {...props}
        >
          {children}
        </div>
      </AppShellContext.Provider>
    );
  }
);

AppShell.displayName = 'AppShell';

// ============ AppShell.Header ============
export interface AppShellHeaderProps extends HTMLAttributes<HTMLElement> {
  /** Children elements */
  children: ReactNode;
  /** Fixed position */
  fixed?: boolean;
  /** Height */
  height?: number;
  /** Additional class name */
  className?: string;
}

export const AppShellHeader = forwardRef<HTMLElement, AppShellHeaderProps>(
  ({ children, fixed = true, height = 64, className = '', style, ...props }, ref) => {
    return (
      <header
        ref={ref}
        className={`
          bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800
          ${fixed ? 'fixed top-0 left-0 right-0 z-40' : ''}
          ${className}
        `}
        style={{ height, ...style }}
        {...props}
      >
        {children}
      </header>
    );
  }
);

AppShellHeader.displayName = 'AppShellHeader';

// ============ AppShell.Sidebar ============
export interface AppShellSidebarProps extends HTMLAttributes<HTMLElement> {
  /** Children elements */
  children: ReactNode;
  /** Width when expanded */
  width?: number;
  /** Width when collapsed */
  collapsedWidth?: number;
  /** Fixed position */
  fixed?: boolean;
  /** Breakpoint to hide sidebar (for mobile) */
  breakpoint?: 'sm' | 'md' | 'lg' | 'xl';
  /** Additional class name */
  className?: string;
}

const breakpointStyles = {
  sm: 'hidden sm:flex',
  md: 'hidden md:flex',
  lg: 'hidden lg:flex',
  xl: 'hidden xl:flex',
};

export const AppShellSidebar = forwardRef<HTMLElement, AppShellSidebarProps>(
  (
    {
      children,
      width = 280,
      collapsedWidth = 72,
      fixed = true,
      breakpoint = 'md',
      className = '',
      style,
      ...props
    },
    ref
  ) => {
    const { sidebarCollapsed } = useAppShell();
    const currentWidth = sidebarCollapsed ? collapsedWidth : width;

    return (
      <aside
        ref={ref}
        className={`
          flex-col bg-white dark:bg-neutral-900
          border-r border-neutral-200 dark:border-neutral-800
          transition-all duration-300 ease-in-out
          ${fixed ? 'fixed top-0 left-0 bottom-0 z-30' : ''}
          ${breakpointStyles[breakpoint]}
          ${className}
        `}
        style={{ width: currentWidth, ...style }}
        {...props}
      >
        {children}
      </aside>
    );
  }
);

AppShellSidebar.displayName = 'AppShellSidebar';

// ============ AppShell.Main ============
export interface AppShellMainProps extends HTMLAttributes<HTMLElement> {
  /** Children elements */
  children: ReactNode;
  /** Offset for fixed header */
  headerHeight?: number;
  /** Offset for fixed sidebar */
  sidebarWidth?: number;
  /** Sidebar collapsed width */
  sidebarCollapsedWidth?: number;
  /** Additional class name */
  className?: string;
}

export const AppShellMain = forwardRef<HTMLElement, AppShellMainProps>(
  (
    {
      children,
      headerHeight = 64,
      sidebarWidth = 280,
      sidebarCollapsedWidth = 72,
      className = '',
      style,
      ...props
    },
    ref
  ) => {
    const { sidebarCollapsed } = useAppShell();
    const currentSidebarWidth = sidebarCollapsed ? sidebarCollapsedWidth : sidebarWidth;

    return (
      <main
        ref={ref}
        className={`min-h-screen transition-all duration-300 ease-in-out ${className}`}
        style={{
          paddingTop: headerHeight,
          marginLeft: currentSidebarWidth,
          ...style,
        }}
        {...props}
      >
        {children}
      </main>
    );
  }
);

AppShellMain.displayName = 'AppShellMain';

// ============ AppShell.Footer ============
export interface AppShellFooterProps extends HTMLAttributes<HTMLElement> {
  /** Children elements */
  children: ReactNode;
  /** Fixed position */
  fixed?: boolean;
  /** Height */
  height?: number;
  /** Additional class name */
  className?: string;
}

export const AppShellFooter = forwardRef<HTMLElement, AppShellFooterProps>(
  ({ children, fixed = false, height = 48, className = '', style, ...props }, ref) => {
    return (
      <footer
        ref={ref}
        className={`
          bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800
          ${fixed ? 'fixed bottom-0 left-0 right-0 z-30' : ''}
          ${className}
        `}
        style={{ height, ...style }}
        {...props}
      >
        {children}
      </footer>
    );
  }
);

AppShellFooter.displayName = 'AppShellFooter';
