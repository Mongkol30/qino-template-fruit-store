import type { Meta, StoryObj } from '@storybook/react-vite';
import { Spacer } from './spacer';

const meta: Meta<typeof Spacer> = {
  title: 'Core/Spacer',
  component: Spacer,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'],
    },
    horizontal: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Vertical: Story = {
  render: () => (
    <div className="bg-neutral-100 dark:bg-neutral-800 p-4 rounded-lg">
      <div className="bg-primary-500 h-8 rounded">Top</div>
      <Spacer size="lg" />
      <div className="bg-primary-500 h-8 rounded">Bottom</div>
    </div>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <div className="flex bg-neutral-100 dark:bg-neutral-800 p-4 rounded-lg">
      <div className="bg-primary-500 w-16 h-8 rounded flex items-center justify-center text-white">Left</div>
      <Spacer size="lg" horizontal />
      <div className="bg-primary-500 w-16 h-8 rounded flex items-center justify-center text-white">Right</div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      {(['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'] as const).map((size) => (
        <div key={size} className="flex items-center bg-neutral-100 dark:bg-neutral-800 p-2 rounded">
          <span className="text-sm w-12">{size}</span>
          <div className="bg-primary-500 w-4 h-4 rounded" />
          <Spacer size={size} horizontal />
          <div className="bg-secondary-500 w-4 h-4 rounded" />
        </div>
      ))}
    </div>
  ),
};
