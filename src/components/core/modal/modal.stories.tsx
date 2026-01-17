import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Modal } from './modal';

const meta: Meta<typeof Modal> = {
  title: 'Feedback/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
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
        <button onClick={() => setOpen(true)} className="px-4 py-2 bg-primary-500 text-white rounded-md">
          Open Modal
        </button>
        <Modal isOpen={open} onClose={() => setOpen(false)} title="Modal Title">
          <p>This is the modal content. You can put anything here.</p>
          <div className="mt-4 flex justify-end gap-2">
            <button onClick={() => setOpen(false)} className="px-4 py-2 border rounded-md">Cancel</button>
            <button onClick={() => setOpen(false)} className="px-4 py-2 bg-primary-500 text-white rounded-md">Save</button>
          </div>
        </Modal>
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
            <button key={s} onClick={() => { setSize(s); setOpen(true); }} className="px-3 py-2 border rounded-md">
              {s.toUpperCase()}
            </button>
          ))}
        </div>
        <Modal isOpen={open} onClose={() => setOpen(false)} size={size} title={`Size: ${size}`}>
          <p>Modal content with {size} size.</p>
          <div className="mt-4 flex justify-end">
            <button onClick={() => setOpen(false)} className="px-4 py-2 bg-primary-500 text-white rounded-md">Close</button>
          </div>
        </Modal>
      </>
    );
  },
};

export const NonDismissible: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSave = () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setOpen(false);
      }, 2000);
    };

    return (
      <>
        <button onClick={() => setOpen(true)} className="px-4 py-2 bg-primary-500 text-white rounded-md">
          Open Non-Dismissible
        </button>
        <Modal isOpen={open} onClose={() => {}} closeOnOverlay={false} closeOnEscape={false} title="Save Progress">
          <p>Please wait while we save your progress...</p>
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-primary-500 text-white rounded-md disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </Modal>
      </>
    );
  },
};

export const WithoutCloseButton: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <button onClick={() => setOpen(true)} className="px-4 py-2 bg-primary-500 text-white rounded-md">
          Open Modal
        </button>
        <Modal isOpen={open} onClose={() => setOpen(false)} title="No Close Button" showCloseButton={false}>
          <p>This modal doesn't have a close button in the header.</p>
          <div className="mt-4 flex justify-end">
            <button onClick={() => setOpen(false)} className="px-4 py-2 bg-primary-500 text-white rounded-md">Close</button>
          </div>
        </Modal>
      </>
    );
  },
};

export const ImagePreview: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <button onClick={() => setOpen(true)} className="px-4 py-2 bg-primary-500 text-white rounded-md">
          View Image
        </button>
        <Modal isOpen={open} onClose={() => setOpen(false)} size="lg">
          <div className="aspect-video bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center text-white text-4xl">
            🖼️ Image Preview
          </div>
        </Modal>
      </>
    );
  },
};
