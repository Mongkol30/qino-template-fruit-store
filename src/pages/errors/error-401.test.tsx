import i18n from 'i18next';
import { describe, expect, it } from 'vitest';

import { tokens } from '@locales/index';
import { setupRender } from '@test';
import { Error401Page } from './index';

const t = i18n.t.bind(i18n);

describe('pages/errors/Error401Page', () => {
  it('should render page with title', () => {
    setupRender(<Error401Page />);

    expect(document.title).toBe('Error: Authorization Required');
  });

  it('should render error content', () => {
    const { getByRole } = setupRender(<Error401Page />);

    const titleText = t(tokens.errors.error401Title);
    expect(
      getByRole('heading', { name: new RegExp(titleText, 'i') })
    ).toBeInTheDocument();
  });
});
