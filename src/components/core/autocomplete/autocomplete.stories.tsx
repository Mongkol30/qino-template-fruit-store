import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import type { AutocompleteOption } from './autocomplete';
import { Autocomplete } from './autocomplete';

const meta: Meta<typeof Autocomplete> = {
  title: 'Form/Autocomplete',
  component: Autocomplete,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const countries: AutocompleteOption[] = [
  { value: 'thailand', label: 'Thailand' },
  { value: 'japan', label: 'Japan' },
  { value: 'south-korea', label: 'South Korea' },
  { value: 'singapore', label: 'Singapore' },
  { value: 'malaysia', label: 'Malaysia' },
  { value: 'indonesia', label: 'Indonesia' },
  { value: 'vietnam', label: 'Vietnam' },
  { value: 'philippines', label: 'Philippines' },
  { value: 'taiwan', label: 'Taiwan' },
  { value: 'hong-kong', label: 'Hong Kong' },
];

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div className="w-72">
        <Autocomplete
          options={countries}
          value={value}
          onChange={setValue}
          placeholder="Search country..."
        />
      </div>
    );
  },
};

export const WithValue: Story = {
  render: () => {
    const [value, setValue] = useState('thailand');
    return (
      <div className="w-72">
        <Autocomplete
          options={countries}
          value={value}
          onChange={setValue}
          placeholder="Select a country"
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
        <Autocomplete
          options={countries}
          value={value}
          onChange={setValue}
          placeholder="Required field"
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
        <Autocomplete
          options={countries}
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
    <div className="w-72">
      <Autocomplete
        options={countries}
        value="thailand"
        onChange={() => {}}
        disabled
      />
    </div>
  ),
};
