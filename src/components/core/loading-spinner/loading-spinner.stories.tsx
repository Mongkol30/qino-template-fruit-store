import type { Meta, StoryObj } from '@storybook/react-vite';
import { LoadingSpinner } from './loading-spinner';

const meta: Meta<typeof LoadingSpinner> = {
  title: 'Feedback/LoadingSpinner',
  component: LoadingSpinner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    color: {
      control: 'select',
      options: ['primary', 'white', 'current'],
    },
    centered: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <LoadingSpinner size="xs" />
      <LoadingSpinner size="sm" />
      <LoadingSpinner size="md" />
      <LoadingSpinner size="lg" />
      <LoadingSpinner size="xl" />
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <LoadingSpinner color="primary" />
      <LoadingSpinner color="current" />
      <div className="bg-neutral-800 p-4 rounded">
        <LoadingSpinner color="white" />
      </div>
    </div>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <LoadingSpinner size="lg" label="Loading..." />
  ),
};

export const Centered: Story = {
  render: () => (
    <div className="w-64 h-32 border rounded-lg">
      <LoadingSpinner size="lg" centered className="h-full" />
    </div>
  ),
};

export const ButtonLoading: Story = {
  render: () => (
    <button className="btn btn-primary flex items-center gap-2" disabled>
      <LoadingSpinner size="sm" color="white" />
      Processing...
    </button>
  ),
};

export const FullPage: Story = {
  render: () => (
    <div className="fixed inset-0 flex items-center justify-center bg-white/80 dark:bg-neutral-900/80">
      <div className="flex flex-col items-center gap-4">
        <LoadingSpinner size="xl" />
        <p className="text-lg font-medium">Loading application...</p>
      </div>
    </div>
  ),
};

export const InlineLoading: Story = {
  render: () => (
    <LoadingSpinner size="sm" label="Saving changes..." />
  ),
};
