import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Dropdown } from './dropdown';

const meta: Meta<typeof Dropdown> = {
  title: 'Navigation/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <Dropdown
        trigger={<button className="px-4 py-2 bg-primary-500 text-white rounded-md">Open Menu</button>}
        open={open}
        onOpenChange={setOpen}
      >
        <div className="py-1">
          <button className="w-full px-4 py-2 text-left hover:bg-neutral-100 dark:hover:bg-neutral-700">Profile</button>
          <button className="w-full px-4 py-2 text-left hover:bg-neutral-100 dark:hover:bg-neutral-700">Settings</button>
          <button className="w-full px-4 py-2 text-left hover:bg-neutral-100 dark:hover:bg-neutral-700">Help</button>
          <hr className="my-1 border-neutral-200 dark:border-neutral-700" />
          <button className="w-full px-4 py-2 text-left hover:bg-neutral-100 dark:hover:bg-neutral-700 text-error-500">Logout</button>
        </div>
      </Dropdown>
    );
  },
};

export const RightAligned: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div className="flex justify-end w-64">
        <Dropdown
          trigger={<button className="px-4 py-2 bg-primary-500 text-white rounded-md">Right Menu</button>}
          open={open}
          onOpenChange={setOpen}
          align="right"
        >
          <div className="py-1">
            <button className="w-full px-4 py-2 text-left hover:bg-neutral-100 dark:hover:bg-neutral-700">Profile</button>
            <button className="w-full px-4 py-2 text-left hover:bg-neutral-100 dark:hover:bg-neutral-700">Settings</button>
          </div>
        </Dropdown>
      </div>
    );
  },
};

export const WithIcons: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <Dropdown
        trigger={<button className="px-4 py-2 bg-primary-500 text-white rounded-md">Actions</button>}
        open={open}
        onOpenChange={setOpen}
      >
        <div className="py-1">
          <button className="w-full px-4 py-2 text-left hover:bg-neutral-100 dark:hover:bg-neutral-700 flex items-center gap-2">
            ✏️ Edit
          </button>
          <button className="w-full px-4 py-2 text-left hover:bg-neutral-100 dark:hover:bg-neutral-700 flex items-center gap-2">
            📋 Duplicate
          </button>
          <button className="w-full px-4 py-2 text-left hover:bg-neutral-100 dark:hover:bg-neutral-700 flex items-center gap-2 text-error-500">
            🗑️ Delete
          </button>
        </div>
      </Dropdown>
    );
  },
};

export const TopSide: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div className="mt-40">
        <Dropdown
          trigger={<button className="px-4 py-2 bg-primary-500 text-white rounded-md">Open Up</button>}
          open={open}
          onOpenChange={setOpen}
          side="top"
        >
          <div className="py-1">
            <button className="w-full px-4 py-2 text-left hover:bg-neutral-100 dark:hover:bg-neutral-700">Option A</button>
            <button className="w-full px-4 py-2 text-left hover:bg-neutral-100 dark:hover:bg-neutral-700">Option B</button>
          </div>
        </Dropdown>
      </div>
    );
  },
};
