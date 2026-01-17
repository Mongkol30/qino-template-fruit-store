import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Drawer } from './drawer';

const meta: Meta<typeof Drawer> = {
  title: 'Feedback/Drawer',
  component: Drawer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    placement: {
      control: 'select',
      options: ['left', 'right', 'top', 'bottom'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Left: Story = {
  render: function LeftDrawer() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <button onClick={() => setOpen(true)} className="btn btn-primary">
          Open Left Drawer
        </button>
        <Drawer open={open} onClose={() => setOpen(false)} placement="left" title="Left Drawer">
          <div className="p-4">
            <p>This drawer slides in from the left.</p>
          </div>
        </Drawer>
      </>
    );
  },
};

export const Right: Story = {
  render: function RightDrawer() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <button onClick={() => setOpen(true)} className="btn btn-primary">
          Open Right Drawer
        </button>
        <Drawer open={open} onClose={() => setOpen(false)} placement="right" title="Right Drawer">
          <div className="p-4">
            <p>This drawer slides in from the right.</p>
          </div>
        </Drawer>
      </>
    );
  },
};

export const Bottom: Story = {
  render: function BottomDrawer() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <button onClick={() => setOpen(true)} className="btn btn-primary">
          Open Bottom Drawer
        </button>
        <Drawer open={open} onClose={() => setOpen(false)} placement="bottom" title="Bottom Drawer">
          <div className="p-4">
            <p>This drawer slides up from the bottom.</p>
          </div>
        </Drawer>
      </>
    );
  },
};

export const Sizes: Story = {
  render: function SizesDrawer() {
    const [size, setSize] = useState<'sm' | 'md' | 'lg' | 'xl'>('md');
    const [open, setOpen] = useState(false);
    return (
      <>
        <div className="flex gap-2">
          {(['sm', 'md', 'lg', 'xl'] as const).map(s => (
            <button
              key={s}
              onClick={() => { setSize(s); setOpen(true); }}
              className="btn"
            >
              {s.toUpperCase()}
            </button>
          ))}
        </div>
        <Drawer open={open} onClose={() => setOpen(false)} size={size} title={`${size.toUpperCase()} Drawer`}>
          <div className="p-4">
            <p>This is a {size} sized drawer.</p>
          </div>
        </Drawer>
      </>
    );
  },
};

export const WithFooter: Story = {
  render: function FooterDrawer() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <button onClick={() => setOpen(true)} className="btn btn-primary">
          Open Drawer with Footer
        </button>
        <Drawer
          open={open}
          onClose={() => setOpen(false)}
          title="Settings"
          footer={
            <div className="flex gap-2 justify-end">
              <button onClick={() => setOpen(false)} className="btn">Cancel</button>
              <button onClick={() => setOpen(false)} className="btn btn-primary">Save</button>
            </div>
          }
        >
          <div className="p-4 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input className="w-full px-3 py-2 border rounded" placeholder="Enter name" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input className="w-full px-3 py-2 border rounded" placeholder="Enter email" />
            </div>
          </div>
        </Drawer>
      </>
    );
  },
};
