import i18n from 'i18next';
import { describe, expect, it } from 'vitest';

import { tokens } from '@locales/index';
import { setupRender } from '@test';
import { Error404Page } from './index';

const t = i18n.t.bind(i18n);

describe('pages/errors/Error404Page', () => {
  it('should render page with title', () => {
    setupRender(<Error404Page />);

    expect(document.title).toBe('Error: Not Found');
  });

  it('should render error content', () => {
    const { getByRole } = setupRender(<Error404Page />);

    const titleText = t(tokens.errors.error404Title);
    expect(
      getByRole('heading', { name: new RegExp(titleText, 'i') })
    ).toBeInTheDocument();
  });
});
