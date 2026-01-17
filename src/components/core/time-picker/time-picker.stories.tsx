import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { TimePicker } from './time-picker';

const meta: Meta<typeof TimePicker> = {
  title: 'Form/TimePicker',
  component: TimePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div className="w-64">
        <TimePicker value={value} onChange={setValue} placeholder="Select time" />
      </div>
    );
  },
};

export const WithValue: Story = {
  render: () => {
    const [value, setValue] = useState('14:30');
    return (
      <div className="w-64">
        <TimePicker value={value} onChange={setValue} />
      </div>
    );
  },
};

export const Format12Hour: Story = {
  render: () => {
    const [value, setValue] = useState('14:30');
    return (
      <div className="w-64">
        <TimePicker value={value} onChange={setValue} use24Hour={false} />
      </div>
    );
  },
};

export const WithSeconds: Story = {
  render: () => {
    const [value, setValue] = useState('14:30:45');
    return (
      <div className="w-64">
        <TimePicker value={value} onChange={setValue} showSeconds />
      </div>
    );
  },
};

export const WithError: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div className="w-64">
        <TimePicker value={value} onChange={setValue} error placeholder="Select time" />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="w-64">
      <TimePicker value="09:00" onChange={() => {}} disabled />
    </div>
  ),
};

export const WithMinuteStep: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div className="w-64">
        <TimePicker value={value} onChange={setValue} minuteStep={15} placeholder="15-min intervals" />
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [value, setValue] = useState('12:00');
    return (
      <div className="w-64 space-y-4">
        <TimePicker value={value} onChange={setValue} size="sm" placeholder="Small" />
        <TimePicker value={value} onChange={setValue} size="md" placeholder="Medium" />
        <TimePicker value={value} onChange={setValue} size="lg" placeholder="Large" />
      </div>
    );
  },
};
