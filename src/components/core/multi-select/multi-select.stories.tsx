import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { MultiSelect } from './multi-select';

const meta: Meta<typeof MultiSelect> = {
  title: 'Form/MultiSelect',
  component: MultiSelect,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const options = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'solid', label: 'Solid' },
  { value: 'preact', label: 'Preact' },
];

export const Default: Story = {
  render: () => {
    const [values, setValues] = useState<string[]>([]);
    return (
      <div className="w-80">
        <MultiSelect
          options={options}
          value={values}
          onChange={setValues}
          placeholder="Choose frameworks..."
        />
      </div>
    );
  },
};

export const WithValues: Story = {
  render: () => {
    const [values, setValues] = useState(['react', 'vue']);
    return (
      <div className="w-80">
        <MultiSelect options={options} value={values} onChange={setValues} />
      </div>
    );
  },
};

export const Searchable: Story = {
  render: () => {
    const [values, setValues] = useState<string[]>([]);
    return (
      <div className="w-80">
        <MultiSelect
          options={options}
          value={values}
          onChange={setValues}
          searchable
          placeholder="Search and select..."
        />
      </div>
    );
  },
};

export const WithError: Story = {
  render: () => {
    const [values, setValues] = useState<string[]>([]);
    return (
      <div className="w-80">
        <MultiSelect options={options} value={values} onChange={setValues} error />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="w-80">
      <MultiSelect options={options} value={['react']} onChange={() => {}} disabled />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => {
    const [values, setValues] = useState<string[]>(['react']);
    return (
      <div className="w-80 space-y-4">
        <MultiSelect
          options={options}
          value={values}
          onChange={setValues}
          size="sm"
          placeholder="Small"
        />
        <MultiSelect
          options={options}
          value={values}
          onChange={setValues}
          size="md"
          placeholder="Medium"
        />
        <MultiSelect
          options={options}
          value={values}
          onChange={setValues}
          size="lg"
          placeholder="Large"
        />
      </div>
    );
  },
};
