import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { RadioGroup, RadioGroupItem } from './radio-group';

const meta: Meta<typeof RadioGroup> = {
  title: 'Form/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('startup');
    return (
      <RadioGroup label="Select plan" name="plan" value={value} onChange={setValue}>
        <RadioGroupItem value="startup">Startup</RadioGroupItem>
        <RadioGroupItem value="business">Business</RadioGroupItem>
        <RadioGroupItem value="enterprise">Enterprise</RadioGroupItem>
      </RadioGroup>
    );
  },
};

export const Horizontal: Story = {
  render: () => {
    const [value, setValue] = useState('startup');
    return (
      <RadioGroup
        label="Select plan"
        name="plan-horizontal"
        value={value}
        onChange={setValue}
        orientation="horizontal"
      >
        <RadioGroupItem value="startup">Startup</RadioGroupItem>
        <RadioGroupItem value="business">Business</RadioGroupItem>
        <RadioGroupItem value="enterprise">Enterprise</RadioGroupItem>
      </RadioGroup>
    );
  },
};

export const WithDefaultValue: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <RadioGroup
        label="Select plan"
        name="plan-default"
        value={value}
        onChange={setValue}
        defaultValue="business"
      >
        <RadioGroupItem value="startup">Startup</RadioGroupItem>
        <RadioGroupItem value="business">Business</RadioGroupItem>
        <RadioGroupItem value="enterprise">Enterprise</RadioGroupItem>
      </RadioGroup>
    );
  },
};

export const WithError: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <RadioGroup
        label="Select plan"
        name="plan-error"
        value={value}
        onChange={setValue}
        error
        helperText="Please select a plan"
      >
        <RadioGroupItem value="startup">Startup</RadioGroupItem>
        <RadioGroupItem value="business">Business</RadioGroupItem>
        <RadioGroupItem value="enterprise">Enterprise</RadioGroupItem>
      </RadioGroup>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <RadioGroup
      label="Select plan"
      name="plan-disabled"
      value="startup"
      onChange={() => {}}
      disabled
    >
      <RadioGroupItem value="startup">Startup</RadioGroupItem>
      <RadioGroupItem value="business">Business</RadioGroupItem>
      <RadioGroupItem value="enterprise">Enterprise</RadioGroupItem>
    </RadioGroup>
  ),
};

export const WithDisabledOption: Story = {
  render: () => {
    const [value, setValue] = useState('startup');
    return (
      <RadioGroup label="Select plan" name="plan-partial" value={value} onChange={setValue}>
        <RadioGroupItem value="startup">Startup</RadioGroupItem>
        <RadioGroupItem value="business" disabled>
          Business (Unavailable)
        </RadioGroupItem>
        <RadioGroupItem value="enterprise">Enterprise</RadioGroupItem>
      </RadioGroup>
    );
  },
};
