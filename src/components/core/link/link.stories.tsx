import type { Meta, StoryObj } from '@storybook/react-vite';
import { Link } from './link';

const meta: Meta<typeof Link> = {
  title: 'Core/Link',
  component: Link,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'muted', 'primary', 'danger'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    underline: {
      control: 'select',
      options: ['always', 'hover', 'none'],
    },
    external: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default Link',
    href: '#',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex gap-4">
      <Link href="#" variant="default">Default</Link>
      <Link href="#" variant="muted">Muted</Link>
      <Link href="#" variant="primary">Primary</Link>
      <Link href="#" variant="danger">Danger</Link>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Link href="#" size="sm">Small</Link>
      <Link href="#" size="md">Medium</Link>
      <Link href="#" size="lg">Large</Link>
    </div>
  ),
};

export const Underlines: Story = {
  render: () => (
    <div className="flex gap-4">
      <Link href="#" underline="always">Always</Link>
      <Link href="#" underline="hover">Hover</Link>
      <Link href="#" underline="none">None</Link>
    </div>
  ),
};

export const External: Story = {
  args: {
    children: 'External Link',
    href: 'https://example.com',
    external: true,
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled Link',
    href: '#',
    disabled: true,
  },
};

export const InText: Story = {
  render: () => (
    <p className="text-neutral-700 dark:text-neutral-300">
      This is a paragraph with a <Link href="#">link inside</Link> the text.
      You can also have <Link href="#" variant="primary">primary links</Link> or{' '}
      <Link href="https://example.com" external>external links</Link>.
    </p>
  ),
};
