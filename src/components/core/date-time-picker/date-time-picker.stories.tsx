import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { DateTimePicker } from './date-time-picker';

const meta: Meta<typeof DateTimePicker> = {
  title: 'Form/DateTimePicker',
  component: DateTimePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [dateTime, setDateTime] = useState<Date | undefined>(undefined);
    return (
      <div className="w-80">
        <DateTimePicker
          value={dateTime}
          onChange={setDateTime}
          placeholder="Select date and time"
        />
      </div>
    );
  },
};

export const WithValue: Story = {
  render: () => {
    const [dateTime, setDateTime] = useState<Date | undefined>(new Date());
    return (
      <div className="w-80">
        <DateTimePicker
          value={dateTime}
          onChange={setDateTime}
        />
      </div>
    );
  },
};

export const With24Hour: Story = {
  render: () => {
    const [dateTime, setDateTime] = useState<Date | undefined>(undefined);
    return (
      <div className="w-80">
        <DateTimePicker
          value={dateTime}
          onChange={setDateTime}
          use24Hour
          placeholder="24-hour format"
        />
      </div>
    );
  },
};

export const WithError: Story = {
  render: () => {
    const [dateTime, setDateTime] = useState<Date | undefined>(undefined);
    return (
      <div className="w-80">
        <DateTimePicker
          value={dateTime}
          onChange={setDateTime}
          error
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="w-80">
      <DateTimePicker
        value={new Date()}
        onChange={() => {}}
        disabled
      />
    </div>
  ),
};
