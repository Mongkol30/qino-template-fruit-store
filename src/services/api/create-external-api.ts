import type {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { config } from '@config/index';

/**
 * Options for creating an external API
 */
export interface ExternalApiOptions {
  /** Unique reducer path for this API */
  reducerPath: string;
  /** Base URL for the external API */
  baseUrl: string;
  /** Request timeout in milliseconds (default: 30000) */
  timeout?: number;
  /** Tag types for cache invalidation */
  tagTypes?: string[];
  /** Custom headers to include in every request */
  headers?: Record<string, string>;
  /** API key header name (e.g., 'X-API-Key', 'Authorization') */
  apiKeyHeader?: string;
  /** API key value */
  apiKey?: string;
}

/**
 * Creates an external API instance for third-party APIs
 *
 * Use this for APIs that:
 * - Don't require your app's auth token
 * - Have their own authentication (API keys, etc.)
 * - Are external services (Pokemon API, Weather API, etc.)
 *
 * @example
 * // Create a new external API
 * export const weatherApi = createExternalApi({
 *   reducerPath: 'weatherApi',
 *   baseUrl: 'https://api.weather.com/v1',
 *   apiKeyHeader: 'X-API-Key',
 *   apiKey: import.meta.env.VITE_WEATHER_API_KEY,
 *   tagTypes: ['Weather'],
 * });
 *
 * // Inject endpoints
 * const weatherEndpoints = weatherApi.api.injectEndpoints({
 *   endpoints: (builder) => ({
 *     getWeather: builder.query({
 *       query: (city) => `weather/${city}`,
 *     }),
 *   }),
 * });
 */
export function createExternalApi(options: ExternalApiOptions) {
  const {
    reducerPath,
    baseUrl,
    timeout = config.apiTimeout,
    tagTypes = [],
    headers = {},
    apiKeyHeader,
    apiKey,
  } = options;

  // Build base query with optional API key
  const baseQueryFn = fetchBaseQuery({
    baseUrl,
    timeout,
    prepareHeaders: (requestHeaders) => {
      // Add custom headers
      Object.entries(headers).forEach(([key, value]) => {
        requestHeaders.set(key, value);
      });

      // Add API key if provided
      if (apiKeyHeader && apiKey) {
        requestHeaders.set(apiKeyHeader, apiKey);
      }

      return requestHeaders;
    },
  });

  // Wrapper for error logging (optional enhancement)
  const baseQueryWithErrorHandling: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
  > = async (args, api, extraOptions) => {
    const result = await baseQueryFn(args, api, extraOptions);

    if (result.error) {
      // Log errors in development
      if (config.isDev) {
        console.error(`[${reducerPath}] API Error:`, {
          endpoint: typeof args === 'string' ? args : args.url,
          error: result.error,
        });
      }
    }

    return result;
  };

  // Create the API
  const api = createApi({
    reducerPath,
    baseQuery: baseQueryWithErrorHandling,
    tagTypes,
    endpoints: () => ({}),
  });

  return {
    api,
    reducer: { [reducerPath]: api.reducer },
    middleware: api.middleware,
    reducerPath,
  };
}

/**
 * Type helper for external API return type
 */
export type ExternalApiResult = ReturnType<typeof createExternalApi>;
