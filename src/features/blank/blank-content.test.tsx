import { describe, expect, it } from 'vitest';

import { setupRender } from '@test';
import BlankContent from './blank-content';

describe('features/blank/BlankContent', () => {
  it('should render blank content', () => {
    const { getByText } = setupRender(<BlankContent />);

    expect(getByText(/blank page content/i)).toBeInTheDocument();
  });

  it('should be wrapped in a card', () => {
    const { getByText } = setupRender(<BlankContent />);

    expect(getByText(/blank page content/i).parentElement).toHaveClass(
      'rounded-xl'
    );
  });
});
