import type { Meta, StoryObj } from '@storybook/react-vite';
import { AppShell, AppShellFooter, AppShellHeader, AppShellMain, AppShellSidebar } from './app-shell';

const meta: Meta<typeof AppShell> = {
  title: 'Layout/AppShell',
  component: AppShell,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <AppShell className="h-96">
      <AppShellHeader className="bg-primary-600 text-white p-4">
        Header
      </AppShellHeader>
      <AppShellSidebar className="bg-neutral-100 dark:bg-neutral-800 p-4 w-64">
        Sidebar
      </AppShellSidebar>
      <AppShellMain className="p-4">
        Main Content
      </AppShellMain>
      <AppShellFooter className="bg-neutral-100 dark:bg-neutral-800 p-4">
        Footer
      </AppShellFooter>
    </AppShell>
  ),
};

export const WithoutSidebar: Story = {
  render: () => (
    <AppShell className="h-96">
      <AppShellHeader className="bg-primary-600 text-white p-4">
        Header
      </AppShellHeader>
      <AppShellMain className="p-4">
        Main Content without sidebar
      </AppShellMain>
      <AppShellFooter className="bg-neutral-100 dark:bg-neutral-800 p-4">
        Footer
      </AppShellFooter>
    </AppShell>
  ),
};

export const DashboardLayout: Story = {
  render: () => (
    <AppShell className="h-[500px]">
      <AppShellHeader className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-700 p-4 flex items-center justify-between">
        <span className="font-bold text-lg">Dashboard</span>
        <div className="flex items-center gap-4">
          <span className="text-sm text-neutral-500">John Doe</span>
          <div className="w-8 h-8 rounded-full bg-primary-500" />
        </div>
      </AppShellHeader>
      <AppShellSidebar className="bg-neutral-50 dark:bg-neutral-800 w-64 p-4">
        <nav className="space-y-2">
          <a href="#" className="block px-4 py-2 rounded-lg bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300">Home</a>
          <a href="#" className="block px-4 py-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700">Analytics</a>
          <a href="#" className="block px-4 py-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700">Settings</a>
        </nav>
      </AppShellSidebar>
      <AppShellMain className="p-6 bg-neutral-100 dark:bg-neutral-900">
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="p-4 bg-white dark:bg-neutral-800 rounded-lg shadow">
              Card {i}
            </div>
          ))}
        </div>
      </AppShellMain>
    </AppShell>
  ),
};
