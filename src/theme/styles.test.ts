import { describe, expect, it } from 'vitest';

import {
    buttonStyles,
    cardStyles,
    getButtonClasses,
    getInputClasses,
    inputStyles,
    layoutStyles,
    textStyles,
    themeClasses,
    twDark,
} from './styles';

describe('theme/styles', () => {
  describe('buttonStyles', () => {
    it('should have base styles', () => {
      expect(buttonStyles.base).toBeDefined();
      expect(buttonStyles.base).toContain('inline-flex');
      expect(buttonStyles.base).toContain('rounded-lg');
    });

    it('should have variant styles', () => {
      expect(buttonStyles.variants).toBeDefined();
      expect(buttonStyles.variants.primary).toContain('bg-primary-600');
      expect(buttonStyles.variants.secondary).toContain('bg-neutral-200');
      expect(buttonStyles.variants.danger).toContain('bg-error-600');
    });

    it('should have size styles', () => {
      expect(buttonStyles.sizes).toBeDefined();
      expect(buttonStyles.sizes.sm).toBeDefined();
      expect(buttonStyles.sizes.md).toBeDefined();
      expect(buttonStyles.sizes.lg).toBeDefined();
    });

    it('should have focus ring styles', () => {
      expect(buttonStyles.focusRing).toBeDefined();
      expect(buttonStyles.focusRing.light).toContain('focus:ring-primary-500');
      expect(buttonStyles.focusRing.dark).toContain('focus:ring-primary-500');
    });
  });

  describe('inputStyles', () => {
    it('should have base styles', () => {
      expect(inputStyles.base).toBeDefined();
    });

    it('should have light and dark mode styles', () => {
      expect(inputStyles.light).toBeDefined();
      expect(inputStyles.dark).toBeDefined();
    });

    it('should have error state styles', () => {
      expect(inputStyles.error).toBeDefined();
    });

    it('should have size styles', () => {
      expect(inputStyles.sizes).toBeDefined();
    });
  });

  describe('cardStyles', () => {
    it('should have light mode styles', () => {
      expect(cardStyles.light).toBeDefined();
      expect(cardStyles.light).toContain('bg-white');
    });

    it('should have dark mode styles', () => {
      expect(cardStyles.dark).toBeDefined();
      expect(cardStyles.dark).toContain('bg-neutral-800');
    });
  });

  describe('textStyles', () => {
    it('should have heading styles', () => {
      expect(textStyles.heading).toBeDefined();
      expect(textStyles.heading.light).toBeDefined();
      expect(textStyles.heading.dark).toBeDefined();
    });

    it('should have body styles', () => {
      expect(textStyles.body).toBeDefined();
    });

    it('should have muted styles', () => {
      expect(textStyles.muted).toBeDefined();
    });

    it('should have link styles', () => {
      expect(textStyles.link).toBeDefined();
    });
  });

  describe('layoutStyles', () => {
    it('should have background styles', () => {
      expect(layoutStyles.background).toBeDefined();
    });

    it('should have footer styles', () => {
      expect(layoutStyles.footer).toBeDefined();
    });

    it('should have navbar styles', () => {
      expect(layoutStyles.navbar).toBeDefined();
    });
  });

  describe('themeClasses', () => {
    it('should have page background classes', () => {
      expect(themeClasses.pageBg).toBeDefined();
      expect(themeClasses.pageBg).toContain('dark:');
    });

    it('should have text classes', () => {
      expect(themeClasses.textHeading).toBeDefined();
      expect(themeClasses.textBody).toBeDefined();
      expect(themeClasses.textMuted).toBeDefined();
    });

    it('should have border classes', () => {
      expect(themeClasses.borderDefault).toBeDefined();
    });
  });

  describe('getButtonClasses', () => {
    it('should return button class string', () => {
      const classes = getButtonClasses('primary', 'md', false);
      expect(classes).toContain('inline-flex');
      expect(classes).toContain('bg-primary-600');
    });

    it('should handle dark mode', () => {
      const classes = getButtonClasses('primary', 'md', true);
      expect(classes).toContain('focus:ring-offset-bg-dark');
    });
  });

  describe('getInputClasses', () => {
    it('should return input class string', () => {
      const classes = getInputClasses('md', false, false);
      expect(classes).toContain('rounded-lg');
    });

    it('should handle error state', () => {
      const classes = getInputClasses('md', true, false);
      expect(classes).toContain('border-error-500');
    });

    it('should handle dark mode', () => {
      const classes = getInputClasses('md', false, true);
      expect(classes).toContain('bg-neutral-700');
    });
  });

  describe('twDark', () => {
    it('should combine light and dark classes', () => {
      const result = twDark('bg-white', 'bg-neutral-900');
      expect(result).toBe('bg-white dark:bg-neutral-900');
    });

    it('should handle multiple classes', () => {
      const result = twDark('bg-white text-black', 'bg-gray-900 text-white');
      expect(result).toContain('dark:bg-gray-900');
      expect(result).toContain('dark:text-white');
    });
  });
});
