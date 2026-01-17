import type { Meta, StoryObj } from '@storybook/react-vite';
import { Popover } from './popover';

const meta: Meta<typeof Popover> = {
  title: 'Feedback/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    placement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
    triggerMode: {
      control: 'select',
      options: ['click', 'hover'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Popover
      trigger={<button className="btn btn-primary">Click me</button>}
    >
      <div className="p-2">
        <p>Popover content</p>
      </div>
    </Popover>
  ),
};

export const Placements: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4 p-20">
      <div />
      <Popover
        placement="top"
        trigger={<button className="btn w-full">Top</button>}
      >
        <div className="p-2">Top popover</div>
      </Popover>
      <div />
      <Popover
        placement="left"
        trigger={<button className="btn w-full">Left</button>}
      >
        <div className="p-2">Left popover</div>
      </Popover>
      <div />
      <Popover
        placement="right"
        trigger={<button className="btn w-full">Right</button>}
      >
        <div className="p-2">Right popover</div>
      </Popover>
      <div />
      <Popover
        placement="bottom"
        trigger={<button className="btn w-full">Bottom</button>}
      >
        <div className="p-2">Bottom popover</div>
      </Popover>
      <div />
    </div>
  ),
};

export const HoverTrigger: Story = {
  render: () => (
    <Popover
      triggerMode="hover"
      trigger={<button className="btn btn-primary">Hover me</button>}
    >
      <div className="p-2">
        <p>This appears on hover</p>
      </div>
    </Popover>
  ),
};

export const WithForm: Story = {
  render: () => (
    <Popover
      trigger={<button className="btn btn-primary">Edit</button>}
    >
      <div className="p-4 w-64">
        <h4 className="font-semibold mb-2">Quick Edit</h4>
        <input className="w-full px-3 py-2 border rounded-lg mb-2" placeholder="Enter value" />
        <button className="btn btn-primary btn-sm w-full">Save</button>
      </div>
    </Popover>
  ),
};

export const UserProfile: Story = {
  render: () => (
    <Popover
      trigger={
        <div className="w-10 h-10 rounded-full bg-primary-500 cursor-pointer" />
      }
    >
      <div className="p-4 w-64">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-full bg-primary-500" />
          <div>
            <p className="font-semibold">John Doe</p>
            <p className="text-sm text-neutral-500">john@example.com</p>
          </div>
        </div>
        <div className="space-y-1">
          <button className="w-full text-left px-2 py-1 rounded hover:bg-neutral-100 dark:hover:bg-neutral-700">Profile</button>
          <button className="w-full text-left px-2 py-1 rounded hover:bg-neutral-100 dark:hover:bg-neutral-700">Settings</button>
          <button className="w-full text-left px-2 py-1 rounded hover:bg-neutral-100 dark:hover:bg-neutral-700 text-red-500">Sign out</button>
        </div>
      </div>
    </Popover>
  ),
};

export const Controlled: Story = {
  render: () => {
    return (
      <Popover
        trigger={<button className="btn btn-primary">Controlled Popover</button>}
      >
        <div className="p-4">
          <p>This popover uses children for content instead of a content prop.</p>
        </div>
      </Popover>
    );
  },
};
