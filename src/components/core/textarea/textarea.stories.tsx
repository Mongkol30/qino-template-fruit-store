import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { TextArea } from './textarea';

const meta: Meta<typeof TextArea> = {
  title: 'Form/TextArea',
  component: TextArea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    rows: {
      control: 'number',
    },
    autoResize: {
      control: 'boolean',
    },
    fullWidth: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div className="w-80">
        <TextArea
          label="Description"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter description..."
        />
      </div>
    );
  },
};

export const WithCharacterCount: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const maxLength = 200;
    return (
      <div className="w-80">
        <TextArea
          label="Bio"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Tell us about yourself..."
          maxLength={maxLength}
          helperText={`${value.length}/${maxLength} characters`}
        />
      </div>
    );
  },
};

export const Required: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div className="w-80">
        <TextArea
          label="Feedback"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Your feedback..."
          required
        />
      </div>
    );
  },
};

export const WithError: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div className="w-80">
        <TextArea
          label="Message"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          error="Message is required"
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="w-80">
      <TextArea
        label="Disabled"
        value="This textarea is disabled"
        onChange={() => {}}
        disabled
      />
    </div>
  ),
};

export const Rows: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <TextArea label="2 rows" rows={2} placeholder="Small textarea" />
      <TextArea label="4 rows" rows={4} placeholder="Medium textarea" />
      <TextArea label="6 rows" rows={6} placeholder="Large textarea" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <TextArea label="Small" size="sm" placeholder="Small size" />
      <TextArea label="Medium" size="md" placeholder="Medium size" />
      <TextArea label="Large" size="lg" placeholder="Large size" />
    </div>
  ),
};

export const AutoResize: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div className="w-80">
        <TextArea
          label="Auto-resize"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="This textarea will grow as you type..."
          autoResize
          rows={2}
        />
      </div>
    );
  },
};
