import { describe, expect, it } from 'vitest';

import { screen, setupRender } from '@test';
import { Page } from './page';

describe('components/page/Page', () => {
  it('should render children content', () => {
    setupRender(
      <Page>
        <h1>Hello World</h1>
      </Page>
    );

    expect(
      screen.getByRole('heading', { name: /hello world/i })
    ).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    setupRender(
      <Page className="custom-class">
        <p>Content</p>
      </Page>
    );

    expect(screen.getByText('Content').parentElement).toHaveClass(
      'custom-class'
    );
  });

  it('should render SEO component with title', () => {
    setupRender(<Page title="Test Page">Content</Page>);

    expect(document.title).toBe('Test Page');
  });

  it('should not render SEO when no title', () => {
    setupRender(<Page>Content</Page>);

    expect(document.title).not.toBe('Test Page');
  });

  it('should pass seo props to SEO component', () => {
    setupRender(
      <Page title="Test" seo={{ description: 'Test description' }}>
        Content
      </Page>
    );

    const metaDesc = document.querySelector('meta[name="description"]');
    expect(metaDesc).toHaveAttribute('content', 'Test description');
  });
});
