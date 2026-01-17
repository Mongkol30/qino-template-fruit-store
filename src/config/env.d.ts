/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Environment
  readonly VITE_ENVIRONMENT: 'development' | 'staging' | 'production';

  // API
  readonly VITE_API_URL: string;
  readonly VITE_API_TIMEOUT: string;

  // App
  readonly VITE_APP_NAME: string;
  readonly VITE_APP_VERSION: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
