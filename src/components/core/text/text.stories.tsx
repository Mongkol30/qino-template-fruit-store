import type { Meta, StoryObj } from '@storybook/react-vite';
import { Text } from './text';

const meta: Meta<typeof Text> = {
  title: 'Core/Text',
  component: Text,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    weight: {
      control: 'select',
      options: ['normal', 'medium', 'semibold', 'bold'],
    },
    color: {
      control: 'select',
      options: ['default', 'muted', 'primary', 'success', 'warning', 'error'],
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right', 'justify'],
    },
    as: {
      control: 'select',
      options: ['p', 'span', 'div'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'This is a default text component.',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-2">
      <Text size="xs">Extra small text</Text>
      <Text size="sm">Small text</Text>
      <Text size="md">Medium text (default)</Text>
      <Text size="lg">Large text</Text>
      <Text size="xl">Extra large text</Text>
    </div>
  ),
};

export const Weights: Story = {
  render: () => (
    <div className="space-y-2">
      <Text weight="normal">Normal weight</Text>
      <Text weight="medium">Medium weight</Text>
      <Text weight="semibold">Semibold weight</Text>
      <Text weight="bold">Bold weight</Text>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="space-y-2">
      <Text color="default">Default color</Text>
      <Text color="muted">Muted color</Text>
      <Text color="primary">Primary color</Text>
      <Text color="success">Success color</Text>
      <Text color="warning">Warning color</Text>
      <Text color="error">Error color</Text>
    </div>
  ),
};

export const Truncated: Story = {
  args: {
    children: 'This is a very long text that should be truncated when it exceeds the container width',
    truncate: true,
  },
  decorators: [
    (Story) => (
      <div className="w-48">
        <Story />
      </div>
    ),
  ],
};

export const Paragraph: Story = {
  args: {
    children:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
  },
  decorators: [
    (Story) => (
      <div className="max-w-md">
        <Story />
      </div>
    ),
  ],
};
