import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Snackbar } from './snackbar';

const meta: Meta<typeof Snackbar> = {
  title: 'Feedback/Snackbar',
  component: Snackbar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: 'select',
      options: ['top', 'bottom', 'top-left', 'top-right', 'bottom-left', 'bottom-right'],
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
          Show Snackbar
        </button>
        <Snackbar
          open={open}
          onClose={() => setOpen(false)}
          message="This is a snackbar message"
          autoHideDuration={3000}
        />
      </>
    );
  },
};

export const Positions: Story = {
  render: () => {
    const [open, setOpen] = useState<string | null>(null);
    return (
      <>
        <div className="flex flex-wrap gap-2">
          {(['top', 'bottom', 'top-left', 'top-right', 'bottom-left', 'bottom-right'] as const).map(position => (
            <button
              key={position}
              onClick={() => setOpen(position)}
              className="btn"
            >
              {position}
            </button>
          ))}
        </div>
        {open && (
          <Snackbar
            open={true}
            onClose={() => setOpen(null)}
            message={`Snackbar at ${open}`}
            position={open as 'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'}
            autoHideDuration={3000}
          />
        )}
      </>
    );
  },
};

export const WithAction: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <button onClick={() => setOpen(true)} className="btn btn-primary">
          Show with Action
        </button>
        <Snackbar
          open={open}
          onClose={() => setOpen(false)}
          message="File deleted"
          action={
            <button
              onClick={() => { alert('Undo clicked'); setOpen(false); }}
              className="text-primary-500 font-semibold"
            >
              UNDO
            </button>
          }
        />
      </>
    );
  },
};

export const AllPositions: Story = {
  render: () => {
    const [position, setPosition] = useState<string | null>(null);
    return (
      <>
        <div className="grid grid-cols-3 gap-2">
          {['top-left', 'top', 'top-right', 'bottom-left', 'bottom', 'bottom-right'].map(pos => (
            <button
              key={pos}
              onClick={() => setPosition(pos)}
              className="btn text-sm"
            >
              {pos}
            </button>
          ))}
        </div>
        {position && (
          <Snackbar
            open={true}
            onClose={() => setPosition(null)}
            message={`Position: ${position}`}
            position={position as 'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'}
            autoHideDuration={2000}
          />
        )}
      </>
    );
  },
};

export const Persistent: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <button onClick={() => setOpen(true)} className="btn btn-primary">
          Show Persistent
        </button>
        <Snackbar
          open={open}
          onClose={() => setOpen(false)}
          message="This snackbar won't auto-hide"
          action={
            <button onClick={() => setOpen(false)} className="font-semibold">
              DISMISS
            </button>
          }
        />
      </>
    );
  },
};
