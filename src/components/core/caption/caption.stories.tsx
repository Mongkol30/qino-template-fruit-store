import type { Meta, StoryObj } from '@storybook/react-vite';
import { Caption } from './caption';

const meta: Meta<typeof Caption> = {
  title: 'Core/Caption',
  component: Caption,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['default', 'muted', 'primary', 'success', 'warning', 'error'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'This is a caption text',
  },
};

export const Colors: Story = {
  render: () => (
    <div className="space-y-2">
      <Caption color="default">Default caption</Caption>
      <Caption color="muted">Muted caption</Caption>
      <Caption color="primary">Primary caption</Caption>
      <Caption color="success">Success caption</Caption>
      <Caption color="warning">Warning caption</Caption>
      <Caption color="error">Error caption</Caption>
    </div>
  ),
};

export const WithImage: Story = {
  render: () => (
    <figure className="space-y-2">
      <div className="w-64 h-40 bg-neutral-200 dark:bg-neutral-700 rounded-lg" />
      <Caption className="text-center block">Figure 1: Example image caption</Caption>
    </figure>
  ),
};
