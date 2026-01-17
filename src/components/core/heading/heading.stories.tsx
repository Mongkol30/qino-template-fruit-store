import type { Meta, StoryObj } from '@storybook/react-vite';
import { Heading } from './heading';

const meta: Meta<typeof Heading> = {
  title: 'Core/Heading',
  component: Heading,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    as: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'],
    },
    color: {
      control: 'select',
      options: ['default', 'muted', 'primary', 'gradient'],
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default Heading',
    as: 'h2',
  },
};

export const Levels: Story = {
  render: () => (
    <div className="space-y-4">
      <Heading as="h1">Heading 1</Heading>
      <Heading as="h2">Heading 2</Heading>
      <Heading as="h3">Heading 3</Heading>
      <Heading as="h4">Heading 4</Heading>
      <Heading as="h5">Heading 5</Heading>
      <Heading as="h6">Heading 6</Heading>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Heading size="xs">Extra Small</Heading>
      <Heading size="sm">Small</Heading>
      <Heading size="md">Medium</Heading>
      <Heading size="lg">Large</Heading>
      <Heading size="xl">Extra Large</Heading>
      <Heading size="2xl">2X Large</Heading>
      <Heading size="3xl">3X Large</Heading>
      <Heading size="4xl">4X Large</Heading>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="space-y-4">
      <Heading color="default">Default Color</Heading>
      <Heading color="muted">Muted Color</Heading>
      <Heading color="primary">Primary Color</Heading>
      <Heading color="gradient">Gradient Color</Heading>
    </div>
  ),
};

export const Gradient: Story = {
  args: {
    children: 'Beautiful Gradient Heading',
    color: 'gradient',
    size: '3xl',
  },
};

export const Truncated: Story = {
  args: {
    children: 'This is a very long heading that should be truncated when it exceeds the container width',
    truncate: true,
  },
  decorators: [
    (Story) => (
      <div className="w-64">
        <Story />
      </div>
    ),
  ],
};
