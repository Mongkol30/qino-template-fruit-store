import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarItem, SidebarGroup } from './sidebar';

const meta: Meta<typeof Sidebar> = {
  title: 'Navigation/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    collapsed: {
      control: 'boolean',
    },
    position: {
      control: 'select',
      options: ['left', 'right'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="flex h-96">
      <Sidebar>
        <SidebarHeader>
          <span className="font-bold text-lg">Dashboard</span>
        </SidebarHeader>
        <SidebarContent>
          <SidebarItem icon="🏠" label="Home" active />
          <SidebarItem icon="📊" label="Analytics" />
          <SidebarItem icon="👥" label="Users" />
          <SidebarItem icon="⚙️" label="Settings" />
        </SidebarContent>
        <SidebarFooter>
          <SidebarItem icon="🚪" label="Logout" />
        </SidebarFooter>
      </Sidebar>
      <div className="flex-1 p-4 bg-neutral-50 dark:bg-neutral-900">
        <p>Main content area</p>
      </div>
    </div>
  ),
};

export const Collapsed: Story = {
  render: function CollapsedSidebar() {
    const [collapsed, setCollapsed] = useState(false);
    return (
      <div className="flex h-96">
        <Sidebar collapsed={collapsed}>
          <SidebarHeader>
            {!collapsed && <span className="font-bold text-lg">App</span>}
          </SidebarHeader>
          <SidebarContent>
            <SidebarItem icon="🏠" label="Home" collapsed={collapsed} active />
            <SidebarItem icon="📊" label="Analytics" collapsed={collapsed} />
            <SidebarItem icon="👥" label="Users" collapsed={collapsed} />
            <SidebarItem icon="⚙️" label="Settings" collapsed={collapsed} />
          </SidebarContent>
          <SidebarFooter>
            <SidebarItem
              icon={collapsed ? '→' : '←'}
              label="Collapse"
              collapsed={collapsed}
              onClick={() => setCollapsed(!collapsed)}
            />
          </SidebarFooter>
        </Sidebar>
        <div className="flex-1 p-4 bg-neutral-50 dark:bg-neutral-900">
          <p>Click the arrow to toggle sidebar</p>
        </div>
      </div>
    );
  },
};

export const WithGroups: Story = {
  render: () => (
    <div className="flex h-[500px]">
      <Sidebar>
        <SidebarHeader>
          <span className="font-bold text-lg">Admin</span>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup label="Main">
            <SidebarItem icon="🏠" label="Dashboard" active />
            <SidebarItem icon="📊" label="Analytics" />
          </SidebarGroup>
          <SidebarGroup label="Management">
            <SidebarItem icon="👥" label="Users" />
            <SidebarItem icon="📦" label="Products" />
            <SidebarItem icon="📋" label="Orders" />
          </SidebarGroup>
          <SidebarGroup label="Settings">
            <SidebarItem icon="⚙️" label="General" />
            <SidebarItem icon="🔒" label="Security" />
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <div className="flex-1 p-4 bg-neutral-50 dark:bg-neutral-900">
        <p>Sidebar with grouped items</p>
      </div>
    </div>
  ),
};

export const EmailClient: Story = {
  render: () => (
    <div className="flex h-[500px]">
      <Sidebar width={280}>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <span className="text-2xl">📧</span>
            <span className="font-bold text-lg">Mail</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarItem icon="📥" label="Inbox" active />
          <SidebarItem icon="⭐" label="Starred" />
          <SidebarItem icon="📤" label="Sent" />
          <SidebarItem icon="📝" label="Drafts" />
          <SidebarItem icon="🗑" label="Trash" />
        </SidebarContent>
        <SidebarFooter>
          <div className="text-xs text-neutral-500">15 GB of 20 GB used</div>
        </SidebarFooter>
      </Sidebar>
      <div className="flex-1 p-4 bg-neutral-50 dark:bg-neutral-900">
        <p>Email client style sidebar</p>
      </div>
    </div>
  ),
};
