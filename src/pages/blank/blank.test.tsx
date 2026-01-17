import { describe, expect, it } from 'vitest';

import { setupRender } from '@test';
import { BlankPage } from './index';

describe('pages/blank/BlankPage', () => {
  it('should render page with title', () => {
    setupRender(<BlankPage />);

    expect(document.title).toBe('Blank');
  });

  it('should render blank content', () => {
    const { getByText } = setupRender(<BlankPage />);

    expect(getByText(/blank page content/i)).toBeInTheDocument();
  });
});
