import { describe, expect, it } from 'vitest';

import {
    background,
    colors,
    error,
    info,
    neutral,
    primary,
    secondary,
    success,
    warning,
} from './colors';

describe('theme/colors', () => {
  describe('background colors', () => {
    it('should have light and dark background colors', () => {
      expect(background.light).toBe('#FFFFFF');
      expect(background.dark).toBe('#020618');
    });
  });

  describe('primary colors', () => {
    it('should have correct primary color scale', () => {
      expect(primary[50]).toBe('#EEF2FF');
      expect(primary[500]).toBe('#6366F1');
      expect(primary[950]).toBe('#1E1B4B');
    });

    it('should have all shades from 50 to 950', () => {
      expect(Object.keys(primary)).toContain('50');
      expect(Object.keys(primary)).toContain('500');
      expect(Object.keys(primary)).toContain('950');
    });
  });

  describe('secondary colors', () => {
    it('should have correct secondary color scale', () => {
      expect(secondary[50]).toBe('#F5F3FF');
      expect(secondary[500]).toBe('#8B5CF6');
      expect(secondary[950]).toBe('#2E1065');
    });
  });

  describe('neutral colors', () => {
    it('should have neutral color scale defined', () => {
      expect(neutral).toBeDefined();
      expect(neutral[50]).toBeDefined();
      expect(neutral[900]).toBeDefined();
    });
  });

  describe('semantic colors', () => {
    it('should have success colors', () => {
      expect(success).toBeDefined();
      expect(success[500]).toBeDefined();
    });

    it('should have warning colors', () => {
      expect(warning).toBeDefined();
      expect(warning[500]).toBeDefined();
    });

    it('should have error colors', () => {
      expect(error).toBeDefined();
      expect(error[500]).toBeDefined();
    });

    it('should have info colors', () => {
      expect(info).toBeDefined();
      expect(info[500]).toBeDefined();
    });
  });

  describe('colors object', () => {
    it('should export all color collections', () => {
      expect(colors.background).toBe(background);
      expect(colors.primary).toBe(primary);
      expect(colors.secondary).toBe(secondary);
      expect(colors.neutral).toBe(neutral);
      expect(colors.success).toBe(success);
      expect(colors.warning).toBe(warning);
      expect(colors.error).toBe(error);
      expect(colors.info).toBe(info);
    });
  });
});
