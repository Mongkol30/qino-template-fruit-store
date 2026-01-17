import type { Meta, StoryObj } from '@storybook/react-vite';
import { Breadcrumb, type BreadcrumbItem } from './breadcrumb';
import { MemoryRouter } from 'react-router';

const meta: Meta<typeof Breadcrumb> = {
  title: 'Navigation/Breadcrumb',
  component: Breadcrumb,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultItems: BreadcrumbItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Electronics' },
];

export const Default: Story = {
  args: {
    items: defaultItems,
  },
};

export const WithCustomSeparator: Story = {
  args: {
    items: defaultItems,
    separator: '→',
  },
};

export const WithIcons: Story = {
  args: {
    items: [
      { label: 'Home', href: '/', icon: <span>🏠</span> },
      { label: 'Documents', href: '/docs', icon: <span>📁</span> },
      { label: 'File.pdf', icon: <span>📄</span> },
    ],
  },
};

export const LongPath: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Users', href: '/users' },
      { label: 'John Doe', href: '/users/john' },
      { label: 'Projects', href: '/users/john/projects' },
      { label: 'My Project', href: '/users/john/projects/1' },
      { label: 'Settings' },
    ],
  },
};

export const WithMaxItems: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Users', href: '/users' },
      { label: 'John Doe', href: '/users/john' },
      { label: 'Projects', href: '/users/john/projects' },
      { label: 'My Project', href: '/users/john/projects/1' },
      { label: 'Settings' },
    ],
    maxItems: 4,
  },
};

export const SingleItem: Story = {
  args: {
    items: [{ label: 'Dashboard' }],
  },
};

export const TwoItems: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Current Page' },
    ],
  },
};
