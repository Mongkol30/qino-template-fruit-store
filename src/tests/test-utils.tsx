import { render, type RenderOptions } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import i18n from 'i18next';
import type { ReactElement, ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { MemoryRouter, type MemoryRouterProps } from 'react-router-dom';

import { ConfigProvider } from '@contexts/config-context';
import { ModalProvider } from '@contexts/modal-context';
import { ToastProvider } from '@contexts/toast-context';
import { store } from '@stores/store';
import { ThemeProvider } from '@theme/theme-provider';

/**
 * Custom render options with all providers
 */
interface SetupRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  /** Initial route entries for MemoryRouter */
  initialEntries?: MemoryRouterProps['initialEntries'];
  /** Initial index for MemoryRouter */
  initialIndex?: number;
  /** Whether to include Redux Provider (default: true) */
  withRedux?: boolean;
  /** Whether to include Router (default: true) */
  withRouter?: boolean;
  /** Whether to include Theme Provider (default: true) */
  withTheme?: boolean;
  /** Whether to include Config Provider (default: true) */
  withConfig?: boolean;
  /** Whether to include Toast Provider (default: true) */
  withToast?: boolean;
  /** Whether to include Modal Provider (default: true) */
  withModal?: boolean;
  /** Whether to include I18next Provider (default: true) */
  withI18n?: boolean;
  /** Optional additional wrapper component */
  wrapper?: React.ComponentType<{ children: ReactNode }>;
}

/**
 * Custom render function that wraps Testing Library's render
 * with all common providers (Redux, Router, Theme, Config, Toast, Modal)
 *
 * All providers are included by default but can be disabled individually.
 *
 * @param ui - React element to render
 * @param options - Render options
 * @returns Render result with user event instance
 *
 * @example
 * // Basic usage with all providers
 * setupRender(<MyComponent />);
 *
 * @example
 * // With custom route
 * setupRender(<MyComponent />, { initialEntries: ['/dashboard'] });
 *
 * @example
 * // Without specific providers
 * setupRender(<MyComponent />, { withTheme: false, withToast: false });
 */
export const setupRender = (
  ui: ReactElement,
  options: SetupRenderOptions = {}
) => {
  const {
    initialEntries = ['/'],
    initialIndex,
    withRedux = true,
    withRouter = true,
    withTheme = true,
    withConfig = true,
    withToast = true,
    withModal = true,
    withI18n = true,
    wrapper: Wrapper,
    ...renderOptions
  } = options;

  const AllProviders = ({ children }: { children: ReactNode }) => {
    let content = <>{children}</>;

    // Apply custom wrapper if provided
    if (Wrapper) {
      content = <Wrapper>{content}</Wrapper>;
    }

    // Apply Modal Provider
    if (withModal) {
      content = <ModalProvider>{content}</ModalProvider>;
    }

    // Apply Toast Provider
    if (withToast) {
      content = <ToastProvider>{content}</ToastProvider>;
    }

    // Apply Theme Provider (requires Redux)
    if (withTheme && withRedux) {
      content = <ThemeProvider>{content}</ThemeProvider>;
    }

    // Apply Config Provider
    if (withConfig) {
      content = <ConfigProvider>{content}</ConfigProvider>;
    }

    // Apply I18next Provider
    if (withI18n) {
      content = <I18nextProvider i18n={i18n}>{content}</I18nextProvider>;
    }

    // Apply Router
    if (withRouter) {
      content = (
        <MemoryRouter initialEntries={initialEntries} initialIndex={initialIndex}>
          {content}
        </MemoryRouter>
      );
    }

    // Apply Redux Provider (outermost for store access)
    if (withRedux) {
      content = <Provider store={store}>{content}</Provider>;
    }

    return content;
  };

  return {
    user: userEvent.setup(),
    ...render(ui, { wrapper: AllProviders, ...renderOptions }),
  };
};

/**
 * @deprecated Use setupRender instead with the same options.
 * This is kept for backward compatibility.
 */
export const setupRenderWithRouter = setupRender;

/**
 * Re-export everything from testing-library
 */
export * from '@testing-library/react';
export { userEvent };

