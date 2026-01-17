import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ChangeEvent } from 'react';
import { useState } from 'react';
import { NumberInput } from './number-input';

const meta: Meta<typeof NumberInput> = {
  title: 'Form/NumberInput',
  component: NumberInput,
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
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    };
    return (
      <div className="w-64">
        <NumberInput
          label="Quantity"
          value={value}
          onChange={handleChange}
          placeholder="Enter number"
        />
      </div>
    );
  },
};

export const WithMinMax: Story = {
  render: () => {
    const [value, setValue] = useState('5');
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    };
    return (
      <div className="w-64">
        <NumberInput
          label="Rating"
          value={value}
          onChange={handleChange}
          min={1}
          max={10}
          helperText="Enter a value between 1 and 10"
        />
      </div>
    );
  },
};

export const WithStep: Story = {
  render: () => {
    const [value, setValue] = useState('0');
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    };
    return (
      <div className="w-64">
        <NumberInput
          label="Price"
          value={value}
          onChange={handleChange}
          step={0.5}
          min={0}
        />
      </div>
    );
  },
};

export const WithControls: Story = {
  render: () => {
    const [value, setValue] = useState('0');
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    };
    return (
      <div className="w-64">
        <NumberInput
          label="Items"
          value={value}
          onChange={handleChange}
          showControls
          min={0}
        />
      </div>
    );
  },
};

export const Required: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    };
    return (
      <div className="w-64">
        <NumberInput label="Age" value={value} onChange={handleChange} required />
      </div>
    );
  },
};

export const WithError: Story = {
  render: () => {
    const [value, setValue] = useState('150');
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    };
    return (
      <div className="w-64">
        <NumberInput
          label="Age"
          value={value}
          onChange={handleChange}
          max={120}
          error="Please enter a valid age"
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="w-64">
      <NumberInput label="Disabled" value="42" onChange={() => {}} disabled />
    </div>
  ),
};
