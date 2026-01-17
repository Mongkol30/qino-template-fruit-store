import i18n from 'i18next';
import { describe, expect, it } from 'vitest';

import { tokens } from '@locales/index';
import { setupRender } from '@test';
import Error401Content from './error-401-content';

const t = i18n.t.bind(i18n);

describe('features/errors/Error401Content', () => {
  it('should render error image', () => {
    const { getByAltText } = setupRender(<Error401Content />);

    expect(getByAltText('Not authorized')).toBeInTheDocument();
  });

  it('should render error title', () => {
    const { getByRole } = setupRender(<Error401Content />);

    const titleText = t(tokens.errors.error401Title);
    expect(
      getByRole('heading', { name: new RegExp(titleText, 'i') })
    ).toBeInTheDocument();
  });

  it('should render error description', () => {
    const { getByText } = setupRender(<Error401Content />);

    const messageText = t(tokens.errors.error401Message);
    expect(
      getByText(new RegExp(messageText.slice(0, 30), 'i'))
    ).toBeInTheDocument();
  });

  it('should render back to home button', () => {
    const { getByRole } = setupRender(<Error401Content />);

    const backToHomeText = t(tokens.errors.backToHome);
    const button = getByRole('button', { name: new RegExp(backToHomeText.replace('←', '').trim(), 'i') });
    expect(button).toBeInTheDocument();
  });
});
