/**
 * Example: User API using base API (internal, with auth)
 *
 * This demonstrates how to create feature APIs that inject
 * endpoints into the central baseApi for authenticated requests.
 */
import { baseApi } from '@services/api';

// ============ Types ============
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateUserPayload {
  name?: string;
  avatar?: string;
}

// ============ Inject Endpoints ============
/**
 * User API - Internal API (with auth)
 * Endpoints are injected into the central baseApi
 *
 * Benefits:
 * - Automatic auth token injection
 * - 401 handling with auto-logout
 * - Shared cache and tag invalidation
 */
export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get current user profile
    getCurrentUser: builder.query<User, void>({
      query: () => 'users/me',
      providesTags: ['User'],
    }),

    // Get user by ID
    getUser: builder.query<User, string>({
      query: (id) => `users/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'User', id }],
    }),

    // Update user profile
    updateUser: builder.mutation<User, { id: string; data: UpdateUserPayload }>(
      {
        query: ({ id, data }) => ({
          url: `users/${id}`,
          method: 'PATCH',
          body: data,
        }),
        invalidatesTags: (_result, _error, { id }) => [
          { type: 'User', id },
          'User',
        ],
      }
    ),

    // Delete user
    deleteUser: builder.mutation<void, string>({
      query: (id) => ({
        url: `users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

// ============ Export Hooks ============
export const {
  useGetCurrentUserQuery,
  useGetUserQuery,
  useLazyGetUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
