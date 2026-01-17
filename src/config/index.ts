/**
 * Application configuration from environment variables
 * All env variables should be prefixed with VITE_
 */
export const config = {
  // Environment
  env: import.meta.env.VITE_ENVIRONMENT || 'development',
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,

  // API URLs
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  apiTimeout: Number(import.meta.env.VITE_API_TIMEOUT) || 30000,

  // App info
  appName: import.meta.env.VITE_APP_NAME || 'Qino App',
  appVersion: import.meta.env.VITE_APP_VERSION || '1.0.0',
} as const;

export type Config = typeof config;
