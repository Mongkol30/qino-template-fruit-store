import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Switch } from './switch';

const meta: Meta<typeof Switch> = {
  title: 'Form/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Enable notifications',
  },
};

export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <Switch
        label="Dark mode"
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
    );
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Switch size="sm" label="Small switch" />
      <Switch size="md" label="Medium switch" />
      <Switch size="lg" label="Large switch" />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="space-y-4">
      <Switch label="Unchecked" />
      <Switch label="Checked" defaultChecked />
      <Switch label="Disabled" disabled />
      <Switch label="Disabled checked" disabled defaultChecked />
    </div>
  ),
};

export const WithDescription: Story = {
  args: {
    label: 'Marketing emails',
    description: 'Receive emails about new products and features.',
  },
};

export const Colors: Story = {
  render: () => (
    <div className="space-y-4">
      <Switch label="Primary" defaultChecked color="primary" />
      <Switch label="Success" defaultChecked color="success" />
      <Switch label="Warning" defaultChecked color="warning" />
      <Switch label="Error" defaultChecked color="error" />
    </div>
  ),
};

export const SettingsExample: Story = {
  render: () => {
    const [settings, setSettings] = useState({
      notifications: true,
      emails: false,
      updates: true,
    });

    return (
      <div className="space-y-4 p-4 bg-white dark:bg-neutral-800 rounded-lg w-80">
        <h3 className="font-semibold text-neutral-900 dark:text-white">Settings</h3>
        <Switch
          label="Push notifications"
          description="Receive push notifications on your device"
          checked={settings.notifications}
          onChange={(e) => setSettings(s => ({ ...s, notifications: e.target.checked }))}
        />
        <Switch
          label="Email notifications"
          description="Receive email updates"
          checked={settings.emails}
          onChange={(e) => setSettings(s => ({ ...s, emails: e.target.checked }))}
        />
        <Switch
          label="Auto-update"
          description="Automatically install updates"
          checked={settings.updates}
          onChange={(e) => setSettings(s => ({ ...s, updates: e.target.checked }))}
        />
      </div>
    );
  },
};
