import i18n from 'i18next';
import { describe, expect, it } from 'vitest';

import { tokens } from '@locales/index';
import { setupRender } from '@test';
import Error404Content from './error-404-content';

const t = i18n.t.bind(i18n);

describe('features/errors/Error404Content', () => {
  it('should render error image', () => {
    const { getByAltText } = setupRender(<Error404Content />);

    expect(getByAltText('Not found')).toBeInTheDocument();
  });

  it('should render error title', () => {
    const { getByRole } = setupRender(<Error404Content />);

    const titleText = t(tokens.errors.error404Title);
    expect(
      getByRole('heading', {
        name: new RegExp(titleText, 'i'),
      })
    ).toBeInTheDocument();
  });

  it('should render error description', () => {
    const { getByText } = setupRender(<Error404Content />);

    const messageText = t(tokens.errors.error404Message);
    expect(
      getByText(new RegExp(messageText.slice(0, 30), 'i'))
    ).toBeInTheDocument();
  });

  it('should render back to home button', () => {
    const { getByRole } = setupRender(<Error404Content />);

    const backToHomeText = t(tokens.errors.backToHome);
    const button = getByRole('button', { name: new RegExp(backToHomeText.replace('←', '').trim(), 'i') });
    expect(button).toBeInTheDocument();
  });
});
