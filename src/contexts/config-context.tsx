import type { ReactNode } from 'react';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';

// ============ Types ============
export interface AppConfig {
  /** App name */
  appName: string;
  /** Theme mode preference */
  theme: 'light' | 'dark' | 'system';
  /** Primary color */
  primaryColor: string;
  /** Default locale */
  locale: string;
  /** Date format */
  dateFormat: string;
  /** Time format */
  timeFormat: string;
  /** Currency */
  currency: string;
  /** API base URL */
  apiBaseUrl: string;
  /** Enable animations */
  enableAnimations: boolean;
  /** Custom config values */
  custom: Record<string, unknown>;
}

const defaultConfig: AppConfig = {
  appName: 'App',
  theme: 'system',
  primaryColor: 'indigo',
  locale: 'en',
  dateFormat: 'MM/DD/YYYY',
  timeFormat: 'HH:mm',
  currency: 'USD',
  apiBaseUrl: '',
  enableAnimations: true,
  custom: {},
};

// ============ Context ============
interface ConfigContextValue {
  config: AppConfig;
  updateConfig: (partial: Partial<AppConfig>) => void;
}

const ConfigContext = createContext<ConfigContextValue | null>(null);

export function useConfig(): ConfigContextValue {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error('useConfig must be used within ConfigProvider');
  }
  return context;
}

export function useConfigValue<K extends keyof AppConfig>(key: K): AppConfig[K] {
  const { config } = useConfig();
  return config[key];
}

// ============ Provider ============
export interface ConfigProviderProps {
  /** Children */
  children: ReactNode;
  /** Initial config */
  config?: Partial<AppConfig>;
  /** On config change callback */
  onConfigChange?: (config: AppConfig) => void;
}

export function ConfigProvider({
  children,
  config: initialConfig,
  onConfigChange,
}: ConfigProviderProps) {
  const [config, setConfig] = useState<AppConfig>({
    ...defaultConfig,
    ...initialConfig,
  });

  const updateConfig = useCallback(
    (partial: Partial<AppConfig>) => {
      setConfig((prev) => {
        const newConfig = { ...prev, ...partial };
        onConfigChange?.(newConfig);
        return newConfig;
      });
    },
    [onConfigChange]
  );

  const value = useMemo(
    () => ({
      config,
      updateConfig,
    }),
    [config, updateConfig]
  );

  return <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>;
}
