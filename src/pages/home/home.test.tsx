import i18n from 'i18next';
import { describe, expect, it } from 'vitest';

import { tokens } from '@locales/index';
import { setupRender } from '@test';
import { HomePage } from './index';

const t = i18n.t.bind(i18n);

describe('pages/home/HomePage', () => {
  it('should render home page with title', () => {
    setupRender(<HomePage />);

    expect(document.title).toBe('Home');
  });

  it('should render home content', () => {
    const { getByRole } = setupRender(<HomePage />);

    const titleText = t(tokens.home.title);
    expect(
      getByRole('heading', { name: new RegExp(titleText, 'i') })
    ).toBeInTheDocument();
  });
});
