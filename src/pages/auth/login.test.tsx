import i18n from 'i18next';
import { describe, expect, it } from 'vitest';

import { tokens } from '@locales';
import { setupRender } from '@test';
import { LoginPage } from './index';

const t = i18n.t.bind(i18n);

describe('pages/auth/LoginPage', () => {
  it('should render page with title', () => {
    setupRender(<LoginPage />);

    expect(document.title).toBe('Login');
  });

  it('should render login form', () => {
    const { getByRole } = setupRender(<LoginPage />);

    const loginTitleText = t(tokens.auth.loginTitle);
    expect(
      getByRole('heading', { name: new RegExp(loginTitleText, 'i') })
    ).toBeInTheDocument();
  });
});
