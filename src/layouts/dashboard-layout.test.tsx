import { describe, expect, it, vi } from 'vitest';
import DashboardLayout from './dashboard-layout';

// Mock dependencies
vi.mock('@stores/index', () => ({
  useAppSelector: vi.fn(() => ({
    theme: 'light',
    language: 'en',
    sidebarCollapsed: false,
  })),
  useAppDispatch: vi.fn(() => vi.fn()),
}));

vi.mock('react-router-dom', () => ({
  Outlet: () => <div data-testid="outlet">Outlet Content</div>,
}));

vi.mock('@components/navbar', () => ({
  Navbar: () => <nav data-testid="navbar">Navbar</nav>,
}));

vi.mock('@components/core', () => ({
  Column: ({ children, className }: { children: React.ReactNode; className?: string }) =>
    <div data-testid="column" className={className}>{children}</div>,
  Container: ({ children }: { children: React.ReactNode }) =>
    <div data-testid="container">{children}</div>,
  CustomScrollbar: ({ children }: { children: React.ReactNode }) =>
    <div data-testid="scrollbar">{children}</div>,
  Text: ({ children }: { children: React.ReactNode }) =>
    <span data-testid="text">{children}</span>,
}));

describe('layouts/DashboardLayout', () => {
  it('should be a valid component', () => {
    expect(DashboardLayout).toBeDefined();
    expect(typeof DashboardLayout).toBe('function');
  });

  it('should export default DashboardLayout', () => {
    expect(DashboardLayout.name).toBe('DashboardLayout');
  });
});
