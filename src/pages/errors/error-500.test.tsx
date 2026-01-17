import i18n from 'i18next';
import { describe, expect, it } from 'vitest';

import { tokens } from '@locales/index';
import { setupRender } from '@test';
import { Error500Page } from './index';

const t = i18n.t.bind(i18n);

describe('pages/errors/Error500Page', () => {
  it('should render page with title', () => {
    setupRender(<Error500Page />);

    expect(document.title).toBe('Error: Server Error');
  });

  it('should render error content', () => {
    const { getByRole } = setupRender(<Error500Page />);

    const titleText = t(tokens.errors.error500Title);
    expect(
      getByRole('heading', { name: new RegExp(titleText, 'i') })
    ).toBeInTheDocument();
  });
});
