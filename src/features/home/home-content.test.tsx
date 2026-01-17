import i18n from 'i18next';
import { describe, expect, it } from 'vitest';

import { tokens } from '@locales/index';
import { setupRender } from '@test';
import HomeContent from './home-content';

const t = i18n.t.bind(i18n);

describe('features/home/HomeContent', () => {
  it('should render logos', () => {
    const { getByAltText } = setupRender(<HomeContent />);

    expect(getByAltText('Vite logo')).toBeInTheDocument();
    expect(getByAltText('React logo')).toBeInTheDocument();
  });

  it('should render title', () => {
    const { getByRole } = setupRender(<HomeContent />);

    const titleText = t(tokens.home.title);
    expect(
      getByRole('heading', { name: new RegExp(titleText, 'i') })
    ).toBeInTheDocument();
  });

  it('should render description', () => {
    const { getByText } = setupRender(<HomeContent />);

    const subtitleText = t(tokens.home.subtitle);
    expect(getByText(new RegExp(subtitleText, 'i'))).toBeInTheDocument();
  });

  it('should render features heading', () => {
    const { getByRole } = setupRender(<HomeContent />);

    const featuresText = t(tokens.home.features);
    expect(
      getByRole('heading', { name: new RegExp(featuresText, 'i') })
    ).toBeInTheDocument();
  });

  it('should render feature cards', () => {
    const { getByRole } = setupRender(<HomeContent />);

    expect(getByRole('heading', { name: t(tokens.home.react19) })).toBeInTheDocument();
    expect(getByRole('heading', { name: t(tokens.home.vite7) })).toBeInTheDocument();
    expect(getByRole('heading', { name: t(tokens.home.tailwindCss4) })).toBeInTheDocument();
    expect(getByRole('heading', { name: t(tokens.home.typescript) })).toBeInTheDocument();
    expect(getByRole('heading', { name: t(tokens.home.reduxToolkit) })).toBeInTheDocument();
    expect(getByRole('heading', { name: t(tokens.home.dockerReady) })).toBeInTheDocument();
  });

  it('should render tech stack heading', () => {
    const { getByRole } = setupRender(<HomeContent />);

    const techStackText = t(tokens.home.techStack);
    expect(
      getByRole('heading', { name: new RegExp(techStackText, 'i') })
    ).toBeInTheDocument();
  });

  it('should render getting started heading', () => {
    const { getByRole } = setupRender(<HomeContent />);

    const gettingStartedText = t(tokens.home.gettingStarted);
    expect(
      getByRole('heading', { name: new RegExp(gettingStartedText, 'i') })
    ).toBeInTheDocument();
  });

  it('should render GitHub button', () => {
    const { getByRole } = setupRender(<HomeContent />);

    const viewOnGithubText = t(tokens.home.viewOnGithub);
    const button = getByRole('button', { name: new RegExp(viewOnGithubText, 'i') });
    expect(button).toBeInTheDocument();
  });
});
