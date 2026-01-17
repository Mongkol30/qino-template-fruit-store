import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Tabs } from './tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Navigation/Tabs',
  component: Tabs,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['line', 'pills', 'enclosed'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      { key: 'tab1', label: 'Tab 1', content: 'Content for Tab 1' },
      { key: 'tab2', label: 'Tab 2', content: 'Content for Tab 2' },
      { key: 'tab3', label: 'Tab 3', content: 'Content for Tab 3' },
    ],
    defaultActiveKey: 'tab1',
  },
};

export const Pills: Story = {
  args: {
    items: [
      { key: 'overview', label: 'Overview', content: 'Overview content' },
      { key: 'analytics', label: 'Analytics', content: 'Analytics content' },
      { key: 'reports', label: 'Reports', content: 'Reports content' },
    ],
    defaultActiveKey: 'overview',
    variant: 'pills',
  },
};

export const Enclosed: Story = {
  args: {
    items: [
      { key: 'details', label: 'Details', content: 'Product details here' },
      { key: 'reviews', label: 'Reviews', content: 'Customer reviews' },
      { key: 'specs', label: 'Specifications', content: 'Technical specifications' },
    ],
    defaultActiveKey: 'details',
    variant: 'enclosed',
  },
};

export const WithIcons: Story = {
  args: {
    items: [
      { key: 'home', label: '🏠 Home', content: 'Home content' },
      { key: 'messages', label: '💬 Messages', content: 'Messages content' },
      { key: 'settings', label: '⚙️ Settings', content: 'Settings content' },
    ],
    defaultActiveKey: 'home',
  },
};

export const WithDisabled: Story = {
  args: {
    items: [
      { key: 'tab1', label: 'Tab 1', content: 'Content for Tab 1' },
      { key: 'tab2', label: 'Tab 2 (Disabled)', content: 'Content for Tab 2', disabled: true },
      { key: 'tab3', label: 'Tab 3', content: 'Content for Tab 3' },
    ],
    defaultActiveKey: 'tab1',
  },
};

export const FullWidth: Story = {
  args: {
    items: [
      { key: 'all', label: 'All', content: 'All items' },
      { key: 'active', label: 'Active', content: 'Active items' },
      { key: 'completed', label: 'Completed', content: 'Completed items' },
    ],
    defaultActiveKey: 'all',
    fullWidth: true,
  },
};

export const Controlled: Story = {
  render: () => {
    const [activeKey, setActiveKey] = useState('general');
    return (
      <div className="max-w-2xl">
        <h1 className="text-2xl font-bold mb-4">Settings</h1>
        <Tabs
          items={[
            {
              key: 'general',
              label: 'General',
              content: (
                <div className="space-y-4 py-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Display Name</label>
                    <input className="w-full px-3 py-2 border rounded-lg" defaultValue="John Doe" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input className="w-full px-3 py-2 border rounded-lg" defaultValue="john@example.com" />
                  </div>
                </div>
              ),
            },
            { key: 'security', label: 'Security', content: <div className="py-4">Security settings content</div> },
            { key: 'notifications', label: 'Notifications', content: <div className="py-4">Notification preferences content</div> },
            { key: 'billing', label: 'Billing', content: <div className="py-4">Billing information content</div> },
          ]}
          activeKey={activeKey}
          onChange={setActiveKey}
          variant="line"
        />
      </div>
    );
  },
};
