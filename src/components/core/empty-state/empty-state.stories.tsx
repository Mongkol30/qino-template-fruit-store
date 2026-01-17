import type { Meta, StoryObj } from '@storybook/react-vite';
import { EmptyState } from './empty-state';

const meta: Meta<typeof EmptyState> = {
  title: 'Feedback/EmptyState',
  component: EmptyState,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'No data',
    description: 'There is no data to display.',
  },
};

export const WithIcon: Story = {
  args: {
    icon: '📭',
    title: 'No messages',
    description: 'Your inbox is empty.',
  },
};

export const WithAction: Story = {
  render: () => (
    <EmptyState
      icon="📁"
      title="No projects yet"
      description="Get started by creating your first project."
      action={<button className="btn btn-primary">Create Project</button>}
    />
  ),
};

export const SearchNoResults: Story = {
  render: () => (
    <EmptyState
      icon="🔍"
      title="No results found"
      description="We couldn't find any items matching your search. Try different keywords."
      action={<button className="btn">Clear Search</button>}
    />
  ),
};

export const ErrorState: Story = {
  render: () => (
    <EmptyState
      icon="⚠️"
      title="Something went wrong"
      description="We couldn't load the data. Please try again."
      action={
        <button className="btn btn-primary" onClick={() => window.location.reload()}>
          Retry
        </button>
      }
    />
  ),
};

export const NoPermission: Story = {
  render: () => (
    <EmptyState
      icon="🔒"
      title="Access denied"
      description="You don't have permission to view this content."
      action={<button className="btn">Request Access</button>}
    />
  ),
};

export const CartEmpty: Story = {
  render: () => (
    <EmptyState
      icon="🛒"
      title="Your cart is empty"
      description="Looks like you haven't added anything to your cart yet."
      action={<button className="btn btn-primary">Browse Products</button>}
    />
  ),
};
