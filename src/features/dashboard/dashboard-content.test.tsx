import i18n from 'i18next';
import { describe, expect, it } from 'vitest';

import { tokens } from '@locales/index';
import { setupRender } from '@test';
import DashboardContent from './dashboard-content';

const t = i18n.t.bind(i18n);

describe('features/dashboard/DashboardContent', () => {
  it('should render dashboard heading', () => {
    const { getByRole } = setupRender(<DashboardContent />);

    const titleText = t(tokens.dashboard.title);
    expect(
      getByRole('heading', { name: new RegExp(titleText, 'i') })
    ).toBeInTheDocument();
  });

  it('should render welcome message', () => {
    const { getByText } = setupRender(<DashboardContent />);

    const welcomeText = t(tokens.dashboard.welcomeBack);
    expect(getByText(new RegExp(welcomeText, 'i'))).toBeInTheDocument();
  });

  it('should render stats cards', () => {
    const { getByText } = setupRender(<DashboardContent />);

    expect(getByText(new RegExp(t(tokens.dashboard.totalViews), 'i'))).toBeInTheDocument();
    expect(getByText(new RegExp(t(tokens.dashboard.activeUsers), 'i'))).toBeInTheDocument();
    expect(getByText(new RegExp(t(tokens.dashboard.conversionRate), 'i'))).toBeInTheDocument();
    expect(getByText(new RegExp(t(tokens.dashboard.revenue), 'i'))).toBeInTheDocument();
  });

  it('should render quick links section', () => {
    const { getByRole } = setupRender(<DashboardContent />);

    const quickLinksText = t(tokens.dashboard.quickLinks);
    expect(
      getByRole('heading', { name: new RegExp(quickLinksText, 'i') })
    ).toBeInTheDocument();
  });

  it('should render recent activity section', () => {
    const { getByRole } = setupRender(<DashboardContent />);

    const recentActivityText = t(tokens.dashboard.recentActivity);
    expect(
      getByRole('heading', { name: new RegExp(recentActivityText, 'i') })
    ).toBeInTheDocument();
  });
});
