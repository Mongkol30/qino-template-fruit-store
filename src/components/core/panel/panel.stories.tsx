import type { Meta, StoryObj } from '@storybook/react-vite';
import { Panel } from './panel';

const meta: Meta<typeof Panel> = {
  title: 'Layout/Panel',
  component: Panel,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'bordered', 'elevated'],
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'This is a panel component with default styling',
    className: 'w-80',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex gap-4">
      <Panel variant="default" className="w-48">Default</Panel>
      <Panel variant="bordered" className="w-48">Bordered</Panel>
      <Panel variant="elevated" className="w-48">Elevated</Panel>
    </div>
  ),
};

export const WithHeader: Story = {
  render: () => (
    <Panel className="w-80">
      <div className="border-b border-neutral-200 dark:border-neutral-700 px-4 py-3">
        <h3 className="font-semibold">Panel Header</h3>
      </div>
      <div className="p-4">
        Panel content goes here
      </div>
    </Panel>
  ),
};

export const Collapsible: Story = {
  render: () => (
    <Panel variant="bordered" className="w-80">
      <details open>
        <summary className="px-4 py-3 cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-800">
          <span className="font-semibold">Collapsible Panel</span>
        </summary>
        <div className="p-4 border-t border-neutral-200 dark:border-neutral-700">
          This content can be collapsed
        </div>
      </details>
    </Panel>
  ),
};
