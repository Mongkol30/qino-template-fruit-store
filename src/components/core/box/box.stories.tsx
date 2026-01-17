import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box } from './box';

const meta: Meta<typeof Box> = {
  title: 'Layout/Box',
  component: Box,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Basic Box',
    className: 'p-4 bg-primary-100 dark:bg-primary-900',
  },
};

export const AsSection: Story = {
  args: {
    as: 'section',
    children: 'This is a section element',
    className: 'p-4 bg-neutral-100 dark:bg-neutral-800 rounded-lg',
  },
};

export const Nested: Story = {
  render: () => (
    <Box className="p-4 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
      <Box className="p-4 bg-primary-100 dark:bg-primary-900 rounded mb-2">
        Nested Box 1
      </Box>
      <Box className="p-4 bg-secondary-100 dark:bg-secondary-900 rounded">
        Nested Box 2
      </Box>
    </Box>
  ),
};
