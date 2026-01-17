import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar } from './avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Core/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
    },
    status: {
      control: 'select',
      options: ['online', 'offline', 'busy', 'away'],
    },
    showStatus: {
      control: 'boolean',
    },
    bordered: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=1',
    alt: 'John Doe',
  },
};

export const WithFallback: Story = {
  args: {
    alt: 'John Doe',
    fallback: 'JD',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      <Avatar size="xs" src="https://i.pravatar.cc/150?img=2" alt="User" />
      <Avatar size="sm" src="https://i.pravatar.cc/150?img=2" alt="User" />
      <Avatar size="md" src="https://i.pravatar.cc/150?img=2" alt="User" />
      <Avatar size="lg" src="https://i.pravatar.cc/150?img=2" alt="User" />
      <Avatar size="xl" src="https://i.pravatar.cc/150?img=2" alt="User" />
      <Avatar size="2xl" src="https://i.pravatar.cc/150?img=2" alt="User" />
    </div>
  ),
};

export const WithStatus: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar src="https://i.pravatar.cc/150?img=3" showStatus status="online" />
      <Avatar src="https://i.pravatar.cc/150?img=4" showStatus status="busy" />
      <Avatar src="https://i.pravatar.cc/150?img=5" showStatus status="away" />
      <Avatar src="https://i.pravatar.cc/150?img=6" showStatus status="offline" />
    </div>
  ),
};

export const Bordered: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=7',
    alt: 'User',
    bordered: true,
  },
};

export const Group: Story = {
  render: () => (
    <div className="flex -space-x-3">
      <Avatar src="https://i.pravatar.cc/150?img=1" bordered />
      <Avatar src="https://i.pravatar.cc/150?img=2" bordered />
      <Avatar src="https://i.pravatar.cc/150?img=3" bordered />
      <Avatar fallback="+5" bordered />
    </div>
  ),
};
