import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tooltip } from './tooltip';

const meta: Meta<typeof Tooltip> = {
  title: 'Feedback/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
    delay: {
      control: 'number',
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tooltip content="This is a tooltip">
      <button className="btn btn-primary">Hover me</button>
    </Tooltip>
  ),
};

export const Positions: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4 p-20">
      <div />
      <Tooltip content="Top" position="top">
        <button className="btn w-full">Top</button>
      </Tooltip>
      <div />
      <Tooltip content="Left" position="left">
        <button className="btn w-full">Left</button>
      </Tooltip>
      <div />
      <Tooltip content="Right" position="right">
        <button className="btn w-full">Right</button>
      </Tooltip>
      <div />
      <Tooltip content="Bottom" position="bottom">
        <button className="btn w-full">Bottom</button>
      </Tooltip>
      <div />
    </div>
  ),
};

export const WithDelay: Story = {
  render: () => (
    <Tooltip content="Delayed tooltip" delay={500}>
      <button className="btn btn-primary">Hover (500ms delay)</button>
    </Tooltip>
  ),
};

export const RichContent: Story = {
  render: () => (
    <Tooltip
      content={
        <div className="space-y-1">
          <p className="font-semibold">Keyboard Shortcut</p>
          <p className="text-sm opacity-80">Press ⌘ + K to open</p>
        </div>
      }
    >
      <button className="btn btn-primary">Rich Tooltip</button>
    </Tooltip>
  ),
};

export const OnIcons: Story = {
  render: () => (
    <div className="flex gap-4">
      <Tooltip content="Settings">
        <button className="p-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800">⚙️</button>
      </Tooltip>
      <Tooltip content="Notifications">
        <button className="p-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800">🔔</button>
      </Tooltip>
      <Tooltip content="Profile">
        <button className="p-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800">👤</button>
      </Tooltip>
      <Tooltip content="Help">
        <button className="p-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800">❓</button>
      </Tooltip>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Tooltip content="This tooltip won't show" disabled>
      <button className="btn">Disabled Tooltip</button>
    </Tooltip>
  ),
};

export const LongContent: Story = {
  render: () => (
    <Tooltip content="This is a longer tooltip message that provides more detailed information about the element.">
      <button className="btn btn-primary">Long Tooltip</button>
    </Tooltip>
  ),
};
