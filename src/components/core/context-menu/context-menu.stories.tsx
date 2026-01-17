import type { Meta, StoryObj } from '@storybook/react-vite';
import { ContextMenu, ContextMenuItem, ContextMenuDivider } from './context-menu';

const meta: Meta<typeof ContextMenu> = {
  title: 'Navigation/ContextMenu',
  component: ContextMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ContextMenu
      menu={
        <>
          <ContextMenuItem onClick={() => alert('Cut')}>Cut</ContextMenuItem>
          <ContextMenuItem onClick={() => alert('Copy')}>Copy</ContextMenuItem>
          <ContextMenuItem onClick={() => alert('Paste')}>Paste</ContextMenuItem>
        </>
      }
    >
      <div className="p-8 bg-neutral-100 dark:bg-neutral-800 rounded-lg cursor-context-menu">
        Right-click here
      </div>
    </ContextMenu>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <ContextMenu
      menu={
        <>
          <ContextMenuItem onClick={() => alert('Cut')}>
            <span className="flex items-center gap-2">✂️ Cut</span>
          </ContextMenuItem>
          <ContextMenuItem onClick={() => alert('Copy')}>
            <span className="flex items-center gap-2">📋 Copy</span>
          </ContextMenuItem>
          <ContextMenuItem onClick={() => alert('Paste')}>
            <span className="flex items-center gap-2">📄 Paste</span>
          </ContextMenuItem>
        </>
      }
    >
      <div className="p-8 bg-neutral-100 dark:bg-neutral-800 rounded-lg cursor-context-menu">
        Right-click for options
      </div>
    </ContextMenu>
  ),
};

export const WithDividers: Story = {
  render: () => (
    <ContextMenu
      menu={
        <>
          <ContextMenuItem>New File</ContextMenuItem>
          <ContextMenuItem>New Folder</ContextMenuItem>
          <ContextMenuDivider />
          <ContextMenuItem>Cut</ContextMenuItem>
          <ContextMenuItem>Copy</ContextMenuItem>
          <ContextMenuItem>Paste</ContextMenuItem>
          <ContextMenuDivider />
          <ContextMenuItem>Delete</ContextMenuItem>
        </>
      }
    >
      <div className="p-8 bg-neutral-100 dark:bg-neutral-800 rounded-lg cursor-context-menu">
        Right-click me
      </div>
    </ContextMenu>
  ),
};

export const FileExplorer: Story = {
  render: () => (
    <ContextMenu
      menu={
        <>
          <ContextMenuItem>Open</ContextMenuItem>
          <ContextMenuItem>Open With...</ContextMenuItem>
          <ContextMenuDivider />
          <ContextMenuItem>Rename</ContextMenuItem>
          <ContextMenuItem>Move to Trash</ContextMenuItem>
          <ContextMenuDivider />
          <ContextMenuItem>Get Info</ContextMenuItem>
        </>
      }
    >
      <div className="p-8 bg-neutral-100 dark:bg-neutral-800 rounded-lg cursor-context-menu flex items-center gap-3">
        <span className="text-4xl">📁</span>
        <div>
          <p className="font-medium">Documents</p>
          <p className="text-sm text-neutral-500">Right-click for options</p>
        </div>
      </div>
    </ContextMenu>
  ),
};
