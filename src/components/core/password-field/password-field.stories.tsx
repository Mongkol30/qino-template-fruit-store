import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { PasswordField } from './password-field';

const meta: Meta<typeof PasswordField> = {
  title: 'Form/PasswordField',
  component: PasswordField,
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
        <PasswordField
          label="Password"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter password"
        />
      </div>
    );
  },
};

export const WithStrengthIndicator: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div className="w-72">
        <PasswordField
          label="Create password"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          showStrength
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
        <PasswordField
          label="Password"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required
        />
      </div>
    );
  },
};

export const WithError: Story = {
  render: () => {
    const [value, setValue] = useState('weak');
    return (
      <div className="w-72">
        <PasswordField
          label="Password"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          error="Password must be at least 8 characters"
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="w-72">
      <PasswordField
        label="Password"
        value="secretpassword"
        onChange={() => {}}
        disabled
      />
    </div>
  ),
};

export const ConfirmPassword: Story = {
  render: () => {
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const error = confirm && password !== confirm ? 'Passwords do not match' : undefined;

    return (
      <div className="w-72 space-y-4">
        <PasswordField
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          showStrength
        />
        <PasswordField
          label="Confirm password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          error={error}
        />
      </div>
    );
  },
};
