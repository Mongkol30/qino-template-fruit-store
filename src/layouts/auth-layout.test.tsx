import { describe, expect, it, vi } from 'vitest';
import AuthLayout from './auth-layout';

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
  Flex: ({ children }: { children: React.ReactNode }) =>
    <div data-testid="flex">{children}</div>,
  CustomScrollbar: ({ children }: { children: React.ReactNode }) =>
    <div data-testid="scrollbar">{children}</div>,
  Text: ({ children }: { children: React.ReactNode }) =>
    <span data-testid="text">{children}</span>,
}));

describe('layouts/AuthLayout', () => {
  it('should be a valid component', () => {
    expect(AuthLayout).toBeDefined();
    expect(typeof AuthLayout).toBe('function');
  });

  it('should export default AuthLayout', () => {
    expect(AuthLayout.name).toBe('AuthLayout');
  });
});
