import { describe, expect, it } from 'vitest';

import authReducer, {
    login,
    logout,
    setLoading,
    setToken,
    setUser,
    type AuthState,
    type User,
} from './auth-slice';

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
};

const mockUser: User = {
  id: '1',
  email: 'test@example.com',
  name: 'Test User',
};

const mockToken = 'mock-jwt-token';

describe('slices/authSlice', () => {
  it('should return the initial state', () => {
    expect(authReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle setUser with a user', () => {
    const actual = authReducer(initialState, setUser(mockUser));
    expect(actual.user).toEqual(mockUser);
    expect(actual.isAuthenticated).toBe(true);
  });

  it('should handle setUser with null', () => {
    const stateWithUser: AuthState = {
      user: mockUser,
      token: mockToken,
      isAuthenticated: true,
      isLoading: false,
    };
    const actual = authReducer(stateWithUser, setUser(null));
    expect(actual.user).toBeNull();
    expect(actual.isAuthenticated).toBe(false);
  });

  it('should handle setToken', () => {
    const actual = authReducer(initialState, setToken(mockToken));
    expect(actual.token).toBe(mockToken);
  });

  it('should handle setLoading', () => {
    const actual = authReducer(initialState, setLoading(true));
    expect(actual.isLoading).toBe(true);
  });

  it('should handle login', () => {
    const actual = authReducer(initialState, login({ user: mockUser, token: mockToken }));
    expect(actual.user).toEqual(mockUser);
    expect(actual.token).toBe(mockToken);
    expect(actual.isAuthenticated).toBe(true);
    expect(actual.isLoading).toBe(false);
  });

  it('should handle logout', () => {
    const stateWithUser: AuthState = {
      user: mockUser,
      token: mockToken,
      isAuthenticated: true,
      isLoading: false,
    };
    const actual = authReducer(stateWithUser, logout());
    expect(actual.user).toBeNull();
    expect(actual.token).toBeNull();
    expect(actual.isAuthenticated).toBe(false);
    expect(actual.isLoading).toBe(false);
  });
});
