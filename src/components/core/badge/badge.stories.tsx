import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './badge';

const meta: Meta<typeof Badge> = {
  title: 'Data Display/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'outline', 'soft'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'error', 'info', 'neutral'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Badge',
  },
};

export const Colors: Story = {
  render: () => (
    <div className="flex gap-2">
      <Badge color="primary">Primary</Badge>
      <Badge color="secondary">Secondary</Badge>
      <Badge color="success">Success</Badge>
      <Badge color="warning">Warning</Badge>
      <Badge color="error">Error</Badge>
      <Badge color="info">Info</Badge>
      <Badge color="neutral">Neutral</Badge>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex gap-2">
      <Badge variant="solid" color="primary">Solid</Badge>
      <Badge variant="outline" color="primary">Outline</Badge>
      <Badge variant="soft" color="primary">Soft</Badge>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
    </div>
  ),
};

export const Pill: Story = {
  render: () => (
    <div className="flex gap-2">
      <Badge pill color="success">Online</Badge>
      <Badge pill color="warning">Away</Badge>
      <Badge pill color="error">Busy</Badge>
    </div>
  ),
};

export const StatusBadges: Story = {
  render: () => (
    <div className="flex gap-2">
      <Badge color="success" variant="soft">Active</Badge>
      <Badge color="warning" variant="soft">Pending</Badge>
      <Badge color="error" variant="soft">Inactive</Badge>
      <Badge color="primary" variant="soft">New</Badge>
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <div className="flex gap-2">
      <Badge color="success">✓ Verified</Badge>
      <Badge color="warning">⚠️ Warning</Badge>
      <Badge color="error">✕ Error</Badge>
    </div>
  ),
};

export const InContext: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="font-medium">Product Name</span>
        <Badge color="success" size="sm">In Stock</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-medium">Order #12345</span>
        <Badge color="warning" size="sm">Processing</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-medium">User Status</span>
        <Badge color="primary" size="sm">Pro Member</Badge>
      </div>
    </div>
  ),
};
