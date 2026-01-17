import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/tests/setup.ts'],
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        'src/tests/',
        'storybook-static/',
        '**/*.d.ts',
        '**/*.stories.{js,jsx,ts,tsx}',
        '**/index.ts',
      ],
    },
    // Silence console during tests (optional)
    // onConsoleLog: () => false,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@features': path.resolve(__dirname, './src/features'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@stores': path.resolve(__dirname, './src/stores'),
      '@slices': path.resolve(__dirname, './src/slices'),
      '@api': path.resolve(__dirname, './src/api'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@types': path.resolve(__dirname, './src/types'),
      '@locales': path.resolve(__dirname, './src/locales'),
      '@theme': path.resolve(__dirname, './src/theme'),
      '@contexts': path.resolve(__dirname, './src/contexts'),
      '@layouts': path.resolve(__dirname, './src/layouts'),
      '@config': path.resolve(__dirname, './src/config'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@test': path.resolve(__dirname, './src/tests'),
      '@services': path.resolve(__dirname, './src/services'),
      '@guards': path.resolve(__dirname, './src/guards'),
    },
  },
});
