import i18n from 'i18next';
import { describe, expect, it } from 'vitest';

import { tokens } from '@locales/index';
import { setupRender } from '@test';
import AboutContent from './about-content';

const t = i18n.t.bind(i18n);

describe('features/about/AboutContent', () => {
  it('should render title', () => {
    const { getByRole } = setupRender(<AboutContent />);

    const titleText = t(tokens.about.title);
    expect(
      getByRole('heading', { name: new RegExp(titleText, 'i') })
    ).toBeInTheDocument();
  });

  it('should render pokeapi button', () => {
    const { getByRole } = setupRender(<AboutContent />);

    const button = getByRole('button', { name: /pokéapi/i });
    expect(button).toBeInTheDocument();
  });

  it('should render pokemon list heading', () => {
    const { getByRole } = setupRender(<AboutContent />);

    const pokemonListText = t(tokens.about.pokemonList);
    expect(
      getByRole('heading', { name: new RegExp(pokemonListText, 'i') })
    ).toBeInTheDocument();
  });

  it('should render pokemon details heading', () => {
    const { getByRole } = setupRender(<AboutContent />);

    const pokemonDetailsText = t(tokens.about.pokemonDetails);
    expect(
      getByRole('heading', { name: new RegExp(pokemonDetailsText, 'i') })
    ).toBeInTheDocument();
  });

  it('should render refresh button', () => {
    const { getByRole } = setupRender(<AboutContent />);

    const refreshText = t(tokens.common.refresh);
    expect(
      getByRole('button', { name: new RegExp(refreshText, 'i') })
    ).toBeInTheDocument();
  });

  it('should render back to home button', () => {
    const { getByRole } = setupRender(<AboutContent />);

    const backToHomeText = t(tokens.about.backToHome);
    const button = getByRole('button', { name: new RegExp(backToHomeText, 'i') });
    expect(button).toBeInTheDocument();
  });
});
