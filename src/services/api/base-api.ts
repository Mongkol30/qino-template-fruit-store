import type {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { config } from '@config/index';
import { logout } from '@slices/auth-slice';
import type { RootState } from '@stores/root-reducer';

/**
 * Base query with authentication headers
 * Automatically attaches bearer token from auth state
 */
const baseQueryWithAuth = fetchBaseQuery({
  baseUrl: config.apiUrl,
  timeout: config.apiTimeout,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    // Default headers
    if (!headers.has('Content-Type')) {
      headers.set('Content-Type', 'application/json');
    }

    return headers;
  },
});

/**
 * Base query with automatic re-authentication handling
 * - Handles 401 Unauthorized by logging out user
 * - Can be extended for token refresh logic
 */
const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQueryWithAuth(args, api, extraOptions);

  // Handle 401 Unauthorized - logout user and redirect
  if (result.error && result.error.status === 401) {
    api.dispatch(logout());
    // Redirect to login page
    if (typeof window !== 'undefined') {
      window.location.href = '/auth/login';
    }
  }

  // Handle 403 Forbidden (optional: show permission denied)
  if (result.error && result.error.status === 403) {
    console.error('Access forbidden:', args);
  }

  return result;
};

/**
 * Central Base API for internal/authenticated endpoints
 *
 * Features:
 * - Automatic authentication (Bearer token)
 * - 401 handling with auto-logout
 * - Configurable timeout
 * - Tag-based cache invalidation
 *
 * @example
 * // Inject endpoints in feature files:
 * import { baseApi } from '@services/api/base-api';
 *
 * export const userApi = baseApi.injectEndpoints({
 *   endpoints: (builder) => ({
 *     getUser: builder.query<User, string>({
 *       query: (id) => `users/${id}`,
 *       providesTags: ['User'],
 *     }),
 *   }),
 * });
 *
 * export const { useGetUserQuery } = userApi;
 */
export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    // Auth & User
    'User',
    'Auth',
    // Core features
    'Dashboard',
    'Settings',
    // Add more tag types as needed for your features
  ],
  endpoints: () => ({}), // Empty - endpoints injected by features
});

// Export for store configuration
export const baseApiReducer = { [baseApi.reducerPath]: baseApi.reducer };
export const baseApiMiddleware = baseApi.middleware;
