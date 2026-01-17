import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { DatePicker } from './date-picker';

const meta: Meta<typeof DatePicker> = {
  title: 'Form/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(null);
    return (
      <div className="w-72">
        <DatePicker
          value={date}
          onChange={setDate}
          placeholder="Pick a date"
        />
      </div>
    );
  },
};

export const WithValue: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(new Date());
    return (
      <div className="w-72">
        <DatePicker
          value={date}
          onChange={setDate}
        />
      </div>
    );
  },
};

export const WithPlaceholder: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(null);
    return (
      <div className="w-72">
        <DatePicker
          value={date}
          onChange={setDate}
          placeholder="Select event date..."
        />
      </div>
    );
  },
};

export const WithError: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(null);
    return (
      <div className="w-72">
        <DatePicker
          value={date}
          onChange={setDate}
          error
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="w-72">
      <DatePicker
        value={new Date()}
        onChange={() => {}}
        disabled
      />
    </div>
  ),
};

export const WithMinMax: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(null);
    const minDate = new Date();
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 3);

    return (
      <div className="w-72">
        <DatePicker
          value={date}
          onChange={setDate}
          minDate={minDate}
          maxDate={maxDate}
          placeholder="Select within next 3 months"
        />
      </div>
    );
  },
};
