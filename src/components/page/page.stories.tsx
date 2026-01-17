import type { Meta, StoryObj } from '@storybook/react';

import { Page } from './page';

const meta: Meta<typeof Page> = {
  title: 'Components/Page',
  component: Page,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Page>;

export const Default: Story = {
  args: {
    title: 'Default Page',
    children: (
      <div className="p-4">
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Hello World</h1>
        <p className="mt-2 text-neutral-600 dark:text-neutral-400">This is a simple page component.</p>
      </div>
    ),
  },
};

export const WithSEO: Story = {
  args: {
    title: 'Page with SEO',
    seo: {
      description: 'This is a page with SEO metadata',
    },
    children: (
      <div className="p-4">
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">SEO Page</h1>
        <p className="mt-2 text-neutral-600 dark:text-neutral-400">Check the document title!</p>
      </div>
    ),
  },
};

export const WithClassName: Story = {
  args: {
    title: 'Styled Page',
    className: 'bg-neutral-100 dark:bg-neutral-900 min-h-screen',
    children: (
      <div className="p-8">
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Custom Styled Page</h1>
        <p className="mt-2 text-neutral-600 dark:text-neutral-400">This page has custom styling.</p>
      </div>
    ),
  },
};
