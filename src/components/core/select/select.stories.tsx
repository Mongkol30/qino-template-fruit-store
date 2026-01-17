import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Select } from './select';

const meta: Meta<typeof Select> = {
  title: 'Form/Select',
  component: Select,
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
];

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div className="w-72">
        <Select
          label="Framework"
          options={options}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Select a framework"
        />
      </div>
    );
  },
};

export const WithValue: Story = {
  render: () => {
    const [value, setValue] = useState('react');
    return (
      <div className="w-72">
        <Select
          label="Framework"
          options={options}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    );
  },
};

export const Required: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div className="w-72">
        <Select
          label="Framework"
          options={options}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required
          placeholder="Select a framework"
        />
      </div>
    );
  },
};

export const WithError: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div className="w-72">
        <Select
          label="Framework"
          options={options}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          error="Please select a framework"
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="w-72">
      <Select
        label="Framework"
        options={options}
        value="react"
        onChange={() => {}}
        disabled
      />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => {
    const [value, setValue] = useState('react');
    return (
      <div className="space-y-4 w-72">
        <Select
          label="Small"
          options={options}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          size="sm"
        />
        <Select
          label="Medium"
          options={options}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          size="md"
        />
        <Select
          label="Large"
          options={options}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          size="lg"
        />
      </div>
    );
  },
};

export const WithGroups: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const groupedOptions = [
      { group: 'Frontend', options: [
        { value: 'react', label: 'React' },
        { value: 'vue', label: 'Vue' },
      ]},
      { group: 'Backend', options: [
        { value: 'node', label: 'Node.js' },
        { value: 'python', label: 'Python' },
      ]},
    ];
    return (
      <div className="w-72">
        <Select
          label="Technology"
          options={groupedOptions.flatMap(g => g.options)}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Select technology"
        />
      </div>
    );
  },
};
