import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import AuthGuard from './auth-guard';

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

const renderWithRouter = (initialEntries: string[] = ['/protected']) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <Routes>
        <Route element={<AuthGuard />}>
          <Route path="/protected" element={<div>Protected Content</div>} />
        </Route>
        <Route path="/auth/login" element={<div>Login Page</div>} />
      </Routes>
    </MemoryRouter>
  );
};

describe('guards/AuthGuard', () => {
  it('should show loading spinner when isLoading is true', () => {
    mockAuthState = { isAuthenticated: false, isLoading: true, user: null, token: null };
    renderWithRouter();

    const spinner = document.querySelector('.animate-spin');
    expect(spinner).toBeInTheDocument();
  });

  it('should redirect to login when not authenticated', () => {
    mockAuthState = { isAuthenticated: false, isLoading: false, user: null, token: null };
    renderWithRouter();

    expect(screen.getByText('Login Page')).toBeInTheDocument();
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });

  it('should render protected content when authenticated', () => {
    mockAuthState = {
      isAuthenticated: true,
      isLoading: false,
      user: { id: '1', email: 'test@example.com', name: 'Test User' },
      token: 'test-token',
    };
    renderWithRouter();

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
    expect(screen.queryByText('Login Page')).not.toBeInTheDocument();
  });
});
