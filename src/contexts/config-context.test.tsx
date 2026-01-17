import { act, renderHook } from '@testing-library/react';
import type { ReactNode } from 'react';
import { describe, expect, it } from 'vitest';

import { ConfigProvider, useConfig, useConfigValue } from './config-context';

const wrapper = ({ children }: { children: ReactNode }) => (
  <ConfigProvider>{children}</ConfigProvider>
);

describe('contexts/ConfigContext', () => {
  describe('useConfig', () => {
    it('should throw error when used outside provider', () => {
      expect(() => {
        renderHook(() => useConfig());
      }).toThrow('useConfig must be used within ConfigProvider');
    });

    it('should return default config values', () => {
      const { result } = renderHook(() => useConfig(), { wrapper });

      expect(result.current.config.appName).toBe('App');
      expect(result.current.config.theme).toBe('system');
      expect(result.current.config.locale).toBe('en');
    });

    it('should update config values', () => {
      const { result } = renderHook(() => useConfig(), { wrapper });

      act(() => {
        result.current.updateConfig({ appName: 'My App', locale: 'th' });
      });

      expect(result.current.config.appName).toBe('My App');
      expect(result.current.config.locale).toBe('th');
    });
  });

  describe('useConfigValue', () => {
    it('should return specific config value', () => {
      const { result } = renderHook(() => useConfigValue('appName'), { wrapper });

      expect(result.current).toBe('App');
    });
  });

  describe('ConfigProvider', () => {
    it('should accept initial config', () => {
      const customWrapper = ({ children }: { children: ReactNode }) => (
        <ConfigProvider config={{ appName: 'Custom App', theme: 'dark' }}>
          {children}
        </ConfigProvider>
      );

      const { result } = renderHook(() => useConfig(), { wrapper: customWrapper });

      expect(result.current.config.appName).toBe('Custom App');
      expect(result.current.config.theme).toBe('dark');
    });

    it('should call onConfigChange when config updates', () => {
      let capturedConfig = null;
      const onConfigChange = (config: unknown) => {
        capturedConfig = config;
      };

      const customWrapper = ({ children }: { children: ReactNode }) => (
        <ConfigProvider onConfigChange={onConfigChange}>{children}</ConfigProvider>
      );

      const { result } = renderHook(() => useConfig(), { wrapper: customWrapper });

      act(() => {
        result.current.updateConfig({ appName: 'Updated App' });
      });

      expect(capturedConfig).not.toBeNull();
      expect((capturedConfig as unknown as { appName: string }).appName).toBe('Updated App');
    });
  });
});
