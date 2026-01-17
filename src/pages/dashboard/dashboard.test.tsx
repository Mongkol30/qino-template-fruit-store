import i18n from 'i18next';
import { describe, expect, it } from 'vitest';

import { tokens } from '@locales/index';
import { setupRender } from '@test';
import { DashboardPage } from './index';

const t = i18n.t.bind(i18n);

describe('pages/dashboard/DashboardPage', () => {
  it('should render page with title', () => {
    setupRender(<DashboardPage />);

    expect(document.title).toBe('Dashboard');
  });

  it('should render dashboard content', () => {
    const { getByRole } = setupRender(<DashboardPage />);

    const titleText = t(tokens.dashboard.title);
    expect(
      getByRole('heading', { name: new RegExp(titleText, 'i') })
    ).toBeInTheDocument();
  });
});
