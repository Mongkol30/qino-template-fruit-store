import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { ConfirmDialog } from './confirm-dialog';

const meta: Meta<typeof ConfirmDialog> = {
  title: 'Feedback/ConfirmDialog',
  component: ConfirmDialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'danger'],
    },
    loading: {
      control: 'boolean',
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
          Open Confirm Dialog
        </button>
        <ConfirmDialog
          open={open}
          onClose={() => setOpen(false)}
          onConfirm={() => { alert('Confirmed!'); setOpen(false); }}
          title="Confirm Action"
          message="Are you sure you want to proceed with this action?"
        />
      </>
    );
  },
};

export const Danger: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <button onClick={() => setOpen(true)} className="btn bg-red-600 text-white">
          Delete Item
        </button>
        <ConfirmDialog
          open={open}
          onClose={() => setOpen(false)}
          onConfirm={() => { alert('Deleted!'); setOpen(false); }}
          title="Delete Item"
          message="Are you sure you want to delete this item? This action cannot be undone."
          variant="danger"
          confirmText="Delete"
        />
      </>
    );
  },
};

export const Primary: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <button onClick={() => setOpen(true)} className="btn btn-primary">
          Save Changes
        </button>
        <ConfirmDialog
          open={open}
          onClose={() => setOpen(false)}
          onConfirm={() => { setOpen(false); }}
          title="Save Changes"
          message="Are you sure you want to save these changes?"
          variant="primary"
          confirmText="Save"
          cancelText="Cancel"
        />
      </>
    );
  },
};

export const CustomButtons: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <button onClick={() => setOpen(true)} className="btn btn-primary">
          Custom Buttons
        </button>
        <ConfirmDialog
          open={open}
          onClose={() => setOpen(false)}
          onConfirm={() => { setOpen(false); }}
          title="Save Document"
          message="Do you want to save changes to this document before closing?"
          confirmText="Save"
          cancelText="Don't Save"
        />
      </>
    );
  },
};

export const Loading: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    
    const handleConfirm = () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setOpen(false);
      }, 2000);
    };

    return (
      <>
        <button onClick={() => setOpen(true)} className="btn btn-primary">
          With Loading State
        </button>
        <ConfirmDialog
          open={open}
          onClose={() => setOpen(false)}
          onConfirm={handleConfirm}
          title="Processing"
          message="This will demonstrate the loading state."
          loading={loading}
        />
      </>
    );
  },
};
