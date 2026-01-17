import { describe, expect, it } from 'vitest';

import { setupRender } from '@test';
import { AboutPage } from './index';

describe('pages/about/AboutPage', () => {
  it('should render about page with title', () => {
    setupRender(<AboutPage />);

    expect(document.title).toBe('About');
  });

  it('should render about content', () => {
    const { getByRole } = setupRender(<AboutPage />);

    expect(
      getByRole('heading', { name: /api integration example/i })
    ).toBeInTheDocument();
  });
});
