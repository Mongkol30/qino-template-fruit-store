import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import GuestGuard from './guest-guard';

// Create mock store state
let mockAuthState: {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: { id: string; email: string; name: string } | null;
  token: string | null;
} = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
  token: null,
};

vi.mock('@stores/index', () => ({
  useAppSelector: vi.fn((selector) => {
    const state = { auth: mockAuthState };
    return selector(state);
  }),
}));

const renderWithRouter = (initialEntries: string[] = ['/auth/login']) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <Routes>
        <Route element={<GuestGuard />}>
          <Route path="/auth/login" element={<div>Login Form</div>} />
        </Route>
        <Route path="/dashboard" element={<div>Dashboard Page</div>} />
      </Routes>
    </MemoryRouter>
  );
};

describe('guards/GuestGuard', () => {
  it('should show loading spinner when isLoading is true', () => {
    mockAuthState = { isAuthenticated: false, isLoading: true, user: null, token: null };
    renderWithRouter();

    const spinner = document.querySelector('.animate-spin');
    expect(spinner).toBeInTheDocument();
  });

  it('should render guest content when not authenticated', () => {
    mockAuthState = { isAuthenticated: false, isLoading: false, user: null, token: null };
    renderWithRouter();

    expect(screen.getByText('Login Form')).toBeInTheDocument();
    expect(screen.queryByText('Dashboard Page')).not.toBeInTheDocument();
  });

  it('should redirect to dashboard when authenticated', () => {
    mockAuthState = {
      isAuthenticated: true,
      isLoading: false,
      user: { id: '1', email: 'test@example.com', name: 'Test User' },
      token: 'test-token',
    };
    renderWithRouter();

    expect(screen.getByText('Dashboard Page')).toBeInTheDocument();
    expect(screen.queryByText('Login Form')).not.toBeInTheDocument();
  });
});
