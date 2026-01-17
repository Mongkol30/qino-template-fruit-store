import type { Meta, StoryObj } from '@storybook/react-vite';
import { Menu } from './menu';

const meta: Meta<typeof Menu> = {
  title: 'Navigation/Menu',
  component: Menu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    trigger: <button className="px-4 py-2 bg-primary-500 text-white rounded-md">Open Menu</button>,
    items: [
      { label: 'Profile', onClick: () => console.log('Profile') },
      { label: 'Settings', onClick: () => console.log('Settings') },
      { label: 'Help', onClick: () => console.log('Help'), divider: true },
      { label: 'Sign Out', onClick: () => console.log('Sign Out') },
    ],
  },
};

export const WithIcons: Story = {
  args: {
    trigger: <button className="px-4 py-2 bg-primary-500 text-white rounded-md">Actions</button>,
    items: [
      { label: '👤 Profile', icon: undefined, onClick: () => {} },
      { label: '⚙️ Settings', onClick: () => {} },
      { label: '❓ Help', onClick: () => {}, divider: true },
      { label: '🚪 Sign Out', onClick: () => {} },
    ],
  },
};

export const Disabled: Story = {
  args: {
    trigger: <button className="px-4 py-2 bg-primary-500 text-white rounded-md">Menu</button>,
    items: [
      { label: 'Edit', onClick: () => {} },
      { label: 'Duplicate', onClick: () => {} },
      { label: 'Archive', onClick: () => {}, disabled: true },
      { label: 'Delete', onClick: () => {}, disabled: true },
    ],
  },
};

export const DangerItems: Story = {
  args: {
    trigger: <button className="px-4 py-2 bg-primary-500 text-white rounded-md">Options</button>,
    items: [
      { label: 'New', onClick: () => {} },
      { label: 'Open', onClick: () => {} },
      { label: 'Export', onClick: () => {}, divider: true },
      { label: 'Delete', onClick: () => {}, danger: true },
    ],
  },
};

export const RightAligned: Story = {
  args: {
    trigger: <button className="px-4 py-2 bg-primary-500 text-white rounded-md">Right Menu</button>,
    items: [
      { label: 'Profile', onClick: () => {} },
      { label: 'Settings', onClick: () => {} },
      { label: 'Help', onClick: () => {}, divider: true },
      { label: 'Sign Out', onClick: () => {} },
    ],
    align: 'right',
  },
};

export const UserMenu: Story = {
  args: {
    trigger: (
      <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800">
        <div className="w-8 h-8 rounded-full bg-primary-500" />
        <span>John Doe</span>
        <span>▼</span>
      </button>
    ),
    items: [
      { label: 'Your Profile', onClick: () => {} },
      { label: 'Your Projects', onClick: () => {} },
      { label: 'Settings', onClick: () => {}, divider: true },
      { label: 'Sign out', onClick: () => {}, danger: true },
    ],
  },
};
