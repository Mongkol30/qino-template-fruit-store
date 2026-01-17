import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { SearchField } from './search-field';

const meta: Meta<typeof SearchField> = {
  title: 'Form/SearchField',
  component: SearchField,
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
      <div className="w-72">
        <SearchField value={value} onChange={setValue} placeholder="Search..." />
      </div>
    );
  },
};

export const WithOnSearch: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div className="w-72">
        <SearchField
          value={value}
          onChange={setValue}
          onSearch={(searchValue) => console.log('Search:', searchValue)}
          placeholder="Press Enter to search..."
        />
      </div>
    );
  },
};

export const Loading: Story = {
  render: () => {
    const [value, setValue] = useState('react');
    return (
      <div className="w-72">
        <SearchField value={value} onChange={setValue} placeholder="Search..." loading />
      </div>
    );
  },
};

export const WithClear: Story = {
  render: () => {
    const [value, setValue] = useState('search term');
    return (
      <div className="w-72">
        <SearchField value={value} onChange={setValue} placeholder="Search..." clearable />
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div className="space-y-4 w-72">
        <SearchField value={value} onChange={setValue} placeholder="Small" size="sm" />
        <SearchField value={value} onChange={setValue} placeholder="Medium" size="md" />
        <SearchField value={value} onChange={setValue} placeholder="Large" size="lg" />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="w-72">
      <SearchField value="disabled search" onChange={() => {}} disabled />
    </div>
  ),
};
