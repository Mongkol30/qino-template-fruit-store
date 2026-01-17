import type { Meta, StoryObj } from '@storybook/react-vite';
import { Container } from './container';

const meta: Meta<typeof Container> = {
  title: 'Layout/Container',
  component: Container,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', '2xl', 'full'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Container className="bg-primary-100 dark:bg-primary-900 p-4">
      <p>Default container with max-width and centered content</p>
    </Container>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4 p-4">
      {(['sm', 'md', 'lg', 'xl', '2xl'] as const).map(size => (
        <Container key={size} size={size} className="bg-primary-100 dark:bg-primary-900 p-4">
          Size: {size}
        </Container>
      ))}
    </div>
  ),
};

export const WithPadding: Story = {
  render: () => (
    <Container className="bg-primary-100 dark:bg-primary-900" padding>
      <p>Container with padding enabled</p>
    </Container>
  ),
};

export const PageExample: Story = {
  render: () => (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <div className="bg-primary-600 text-white py-4">
        <Container>
          <h1 className="text-xl font-bold">Website Header</h1>
        </Container>
      </div>
      <Container className="py-8">
        <h2 className="text-2xl font-bold mb-4">Page Content</h2>
        <p className="text-neutral-600 dark:text-neutral-400">
          This content is centered within a container with a max-width.
          It provides consistent margins on larger screens.
        </p>
      </Container>
    </div>
  ),
};
