import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Dialog } from './dialog';

const meta: Meta<typeof Dialog> = {
  title: 'Feedback/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    maxWidth: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <button onClick={() => setOpen(true)} className="btn btn-primary">
          Open Dialog
        </button>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          title="Dialog Title"
          footer={
            <>
              <button onClick={() => setOpen(false)} className="btn">Cancel</button>
              <button onClick={() => setOpen(false)} className="btn btn-primary">Confirm</button>
            </>
          }
        >
          This is the dialog content. You can put anything here.
        </Dialog>
      </>
    );
  },
};

export const Sizes: Story = {
  render: () => {
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
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          maxWidth={size}
          title={`Size: ${size}`}
          footer={
            <button onClick={() => setOpen(false)} className="btn btn-primary">Close</button>
          }
        >
          This dialog is using the {size} max-width variant.
        </Dialog>
      </>
    );
  },
};

export const FormDialog: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <button onClick={() => setOpen(true)} className="btn btn-primary">
          Add New User
        </button>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          title="Add New User"
          footer={
            <>
              <button onClick={() => setOpen(false)} className="btn">Cancel</button>
              <button onClick={() => setOpen(false)} className="btn btn-primary">Add User</button>
            </>
          }
        >
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input className="w-full px-3 py-2 border rounded-lg" placeholder="Enter name" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input className="w-full px-3 py-2 border rounded-lg" placeholder="Enter email" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Role</label>
              <select className="w-full px-3 py-2 border rounded-lg">
                <option>Admin</option>
                <option>User</option>
                <option>Guest</option>
              </select>
            </div>
          </form>
        </Dialog>
      </>
    );
  },
};

export const NoFooter: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <button onClick={() => setOpen(true)} className="btn btn-primary">
          Open Dialog Without Footer
        </button>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          title="Information"
        >
          This dialog has no footer. Use the X button to close.
        </Dialog>
      </>
    );
  },
};

export const NoOverlayClose: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <button onClick={() => setOpen(true)} className="btn btn-primary">
          Open Non-Dismissible Dialog
        </button>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          closeOnOverlay={false}
          title="Important"
          footer={
            <button onClick={() => setOpen(false)} className="btn btn-primary">Got it</button>
          }
        >
          This dialog cannot be dismissed by clicking the overlay.
        </Dialog>
      </>
    );
  },
};
