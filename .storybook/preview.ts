import type { Preview } from '@storybook/react-vite';
import { useEffect } from 'react';

// Import Tailwind CSS styles
import '../src/index.css';
// Import Storybook dark theme styles
import './storybook.css';

// Decorator to apply dark mode class based on theme selection
const withThemeProvider = (Story: any, context: any) => {
  const theme = context.globals.theme || 'dark';
  const isDark = theme === 'dark';

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    if (isDark) {
      root.classList.add('dark');
      body.style.backgroundColor = '#1a1a2e';
      body.style.color = '#ffffff';
    } else {
      root.classList.remove('dark');
      body.style.backgroundColor = '#ffffff';
      body.style.color = '#1a1a2e';
    }

    // Update Storybook docs wrapper background
    const docsWrapper = document.querySelector('.sbdocs-wrapper') as HTMLElement;
    const docsContent = document.querySelector('.sbdocs-content') as HTMLElement;
    const docsPreview = document.querySelectorAll('.sbdocs-preview, .docs-story') as NodeListOf<HTMLElement>;

    if (docsWrapper) {
      docsWrapper.style.backgroundColor = isDark ? '#1a1a2e' : '#ffffff';
      docsWrapper.style.color = isDark ? '#ffffff' : '#1a1a2e';
    }
    if (docsContent) {
      docsContent.style.backgroundColor = isDark ? '#1a1a2e' : '#ffffff';
    }
    docsPreview.forEach((el) => {
      el.style.backgroundColor = isDark ? '#1a1a2e' : '#ffffff';
    });
  }, [isDark]);

  return Story();
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      disable: true, // Disable default backgrounds, use theme toggle instead
    },
  },
  globalTypes: {
    theme: {
      description: 'Theme mode',
      defaultValue: 'dark',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'light', icon: 'sun', title: 'Light' },
          { value: 'dark', icon: 'moon', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [withThemeProvider],
};

export default preview;