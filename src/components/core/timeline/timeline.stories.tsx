import type { Meta, StoryObj } from '@storybook/react-vite';
import { Timeline } from './timeline';

const meta: Meta<typeof Timeline> = {
  title: 'Data Display/Timeline',
  component: Timeline,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      { key: '1', title: 'Step 1', description: 'Description for step 1' },
      { key: '2', title: 'Step 2', description: 'Description for step 2' },
      { key: '3', title: 'Step 3', description: 'Description for step 3' },
    ],
  },
};

export const WithDates: Story = {
  args: {
    items: [
      { key: '1', title: 'Order Placed', description: 'Your order has been placed', date: 'Jan 15, 2024' },
      { key: '2', title: 'Processing', description: 'Your order is being processed', date: 'Jan 16, 2024' },
      { key: '3', title: 'Shipped', description: 'Your order has been shipped', date: 'Jan 17, 2024' },
      { key: '4', title: 'Delivered', description: 'Your order has been delivered', date: 'Jan 18, 2024' },
    ],
  },
};

export const WithIcons: Story = {
  args: {
    items: [
      { key: '1', icon: '📝', title: 'Created', description: 'Document was created' },
      { key: '2', icon: '✏️', title: 'Edited', description: 'Document was modified' },
      { key: '3', icon: '👀', title: 'Reviewed', description: 'Document was reviewed' },
      { key: '4', icon: '✅', title: 'Approved', description: 'Document was approved' },
    ],
  },
};

export const WithColors: Story = {
  args: {
    items: [
      { key: '1', title: 'Success', description: 'This step is done', color: 'success' as const },
      { key: '2', title: 'Primary', description: 'Currently working on this', color: 'primary' as const },
      { key: '3', title: 'Warning', description: 'Needs attention', color: 'warning' as const },
      { key: '4', title: 'Error', description: 'Failed step', color: 'error' as const },
    ],
  },
};

export const ActivityFeed: Story = {
  args: {
    items: [
      { key: '1', title: 'John commented', description: 'Great work on this feature!', date: '2 hours ago', icon: '💬' },
      { key: '2', title: 'Sarah merged PR #123', description: 'Feature: Add user authentication', date: '4 hours ago', icon: '🔀' },
      { key: '3', title: 'Mike opened issue', description: 'Bug: Login button not working', date: '6 hours ago', icon: '🐛' },
      { key: '4', title: 'Anna pushed to main', description: '15 commits', date: 'Yesterday', icon: '⬆️' },
    ],
  },
};

export const RightPosition: Story = {
  args: {
    items: [
      { key: '1', title: 'Step 1', description: 'Description for step 1' },
      { key: '2', title: 'Step 2', description: 'Description for step 2' },
      { key: '3', title: 'Step 3', description: 'Description for step 3' },
    ],
    position: 'right',
  },
};

export const Alternate: Story = {
  args: {
    items: [
      { key: '1', title: 'Step 1', description: 'Description for step 1' },
      { key: '2', title: 'Step 2', description: 'Description for step 2' },
      { key: '3', title: 'Step 3', description: 'Description for step 3' },
      { key: '4', title: 'Step 4', description: 'Description for step 4' },
    ],
    position: 'alternate',
  },
};
