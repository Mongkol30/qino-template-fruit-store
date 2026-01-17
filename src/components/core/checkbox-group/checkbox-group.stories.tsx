import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Checkbox } from '../checkbox';
import { CheckboxGroup } from './checkbox-group';

const meta: Meta<typeof CheckboxGroup> = {
  title: 'Form/CheckboxGroup',
  component: CheckboxGroup,
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
    const [values, setValues] = useState<string[]>(['react']);
    return (
      <CheckboxGroup
        label="Select frameworks"
        value={values}
        onChange={setValues}
      >
        <Checkbox value="react" label="React" />
        <Checkbox value="vue" label="Vue" />
        <Checkbox value="angular" label="Angular" />
        <Checkbox value="svelte" label="Svelte" />
      </CheckboxGroup>
    );
  },
};

export const Horizontal: Story = {
  render: () => {
    const [values, setValues] = useState<string[]>([]);
    return (
      <CheckboxGroup
        label="Select frameworks"
        value={values}
        onChange={setValues}
        orientation="horizontal"
      >
        <Checkbox value="react" label="React" />
        <Checkbox value="vue" label="Vue" />
        <Checkbox value="angular" label="Angular" />
        <Checkbox value="svelte" label="Svelte" />
      </CheckboxGroup>
    );
  },
};

export const WithHelperText: Story = {
  render: () => {
    const [values, setValues] = useState<string[]>([]);
    return (
      <CheckboxGroup
        label="Select at least one"
        value={values}
        onChange={setValues}
        helperText="Choose the frameworks you want to learn"
      >
        <Checkbox value="react" label="React" />
        <Checkbox value="vue" label="Vue" />
        <Checkbox value="angular" label="Angular" />
      </CheckboxGroup>
    );
  },
};

export const WithError: Story = {
  render: () => {
    const [values, setValues] = useState<string[]>([]);
    return (
      <CheckboxGroup
        label="Select frameworks"
        value={values}
        onChange={setValues}
        error
        helperText="Please select at least one framework"
      >
        <Checkbox value="react" label="React" />
        <Checkbox value="vue" label="Vue" />
        <Checkbox value="angular" label="Angular" />
      </CheckboxGroup>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <CheckboxGroup
      label="Select frameworks"
      value={['react']}
      onChange={() => {}}
      disabled
    >
      <Checkbox value="react" label="React" />
      <Checkbox value="vue" label="Vue" />
      <Checkbox value="angular" label="Angular" />
    </CheckboxGroup>
  ),
};
