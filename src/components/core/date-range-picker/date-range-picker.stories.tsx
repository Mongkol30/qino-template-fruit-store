import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import type { DateRange } from './date-range-picker';
import { DateRangePicker } from './date-range-picker';

const meta: Meta<typeof DateRangePicker> = {
  title: 'Form/DateRangePicker',
  component: DateRangePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<DateRange>({ start: null, end: null });
    return (
      <div className="w-80">
        <DateRangePicker
          value={value}
          onChange={setValue}
          placeholder="Select date range"
        />
      </div>
    );
  },
};

export const WithValues: Story = {
  render: () => {
    const start = new Date();
    const end = new Date();
    end.setDate(end.getDate() + 7);

    const [value, setValue] = useState<DateRange>({ start, end });

    return (
      <div className="w-80">
        <DateRangePicker
          value={value}
          onChange={setValue}
        />
      </div>
    );
  },
};

export const WithPlaceholder: Story = {
  render: () => {
    const [value, setValue] = useState<DateRange>({ start: null, end: null });
    return (
      <div className="w-80">
        <DateRangePicker
          value={value}
          onChange={setValue}
          placeholder="Select booking period"
        />
      </div>
    );
  },
};

export const WithError: Story = {
  render: () => {
    const [value, setValue] = useState<DateRange>({ start: null, end: null });
    return (
      <div className="w-80">
        <DateRangePicker
          value={value}
          onChange={setValue}
          error
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="w-80">
      <DateRangePicker
        value={{ start: new Date(), end: new Date() }}
        onChange={() => {}}
        disabled
      />
    </div>
  ),
};
