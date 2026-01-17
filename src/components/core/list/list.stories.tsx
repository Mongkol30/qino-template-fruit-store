import type { Meta, StoryObj } from '@storybook/react-vite';
import { List, ListItem } from './list';

const meta: Meta<typeof List> = {
  title: 'Data Display/List',
  component: List,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['none', 'disc', 'decimal', 'divided'],
    },
    spacing: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <List>
      <ListItem>Item 1</ListItem>
      <ListItem>Item 2</ListItem>
      <ListItem>Item 3</ListItem>
    </List>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <List variant="divided">
      <ListItem leading="🏠" primary="Home" />
      <ListItem leading="📁" primary="Documents" />
      <ListItem leading="⚙️" primary="Settings" />
    </List>
  ),
};

export const WithSecondaryText: Story = {
  render: () => (
    <List variant="divided">
      <ListItem
        leading="📧"
        primary="Inbox"
        secondary="12 new messages"
      />
      <ListItem
        leading="⭐"
        primary="Starred"
        secondary="No new messages"
      />
      <ListItem
        leading="📤"
        primary="Sent"
        secondary="Last sent 2 hours ago"
      />
    </List>
  ),
};

export const Clickable: Story = {
  render: () => (
    <List variant="divided">
      <ListItem onClick={() => alert('Clicked Home')} primary="Home" />
      <ListItem onClick={() => alert('Clicked About')} primary="About" />
      <ListItem onClick={() => alert('Clicked Contact')} primary="Contact" />
    </List>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-neutral-500 mb-2">None</p>
        <List variant="none">
          <ListItem>Item 1</ListItem>
          <ListItem>Item 2</ListItem>
        </List>
      </div>
      <div>
        <p className="text-sm text-neutral-500 mb-2">Disc</p>
        <List variant="disc">
          <ListItem>Item 1</ListItem>
          <ListItem>Item 2</ListItem>
        </List>
      </div>
      <div>
        <p className="text-sm text-neutral-500 mb-2">Decimal</p>
        <List variant="decimal">
          <ListItem>Item 1</ListItem>
          <ListItem>Item 2</ListItem>
        </List>
      </div>
      <div>
        <p className="text-sm text-neutral-500 mb-2">Divided</p>
        <List variant="divided">
          <ListItem>Item 1</ListItem>
          <ListItem>Item 2</ListItem>
        </List>
      </div>
    </div>
  ),
};

export const Selected: Story = {
  render: () => (
    <List variant="divided">
      <ListItem primary="Dashboard" selected />
      <ListItem primary="Analytics" />
      <ListItem primary="Settings" />
    </List>
  ),
};

export const Disabled: Story = {
  render: () => (
    <List variant="divided">
      <ListItem primary="Active Item" onClick={() => {}} />
      <ListItem primary="Disabled Item" disabled onClick={() => {}} />
      <ListItem primary="Another Active" onClick={() => {}} />
    </List>
  ),
};

export const ContactList: Story = {
  render: () => (
    <List variant="divided" className="max-w-sm">
      {[
        { name: 'Alice Johnson', email: 'alice@example.com' },
        { name: 'Bob Smith', email: 'bob@example.com' },
        { name: 'Carol White', email: 'carol@example.com' },
      ].map(contact => (
        <ListItem
          key={contact.email}
          onClick={() => {}}
          leading={
            <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-white">
              {contact.name[0]}
            </div>
          }
          primary={contact.name}
          secondary={contact.email}
        />
      ))}
    </List>
  ),
};

export const WithTrailing: Story = {
  render: () => (
    <List variant="divided" className="max-w-sm">
      <ListItem
        primary="Notifications"
        secondary="Manage alerts"
        trailing={<span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full">3</span>}
      />
      <ListItem
        primary="Privacy"
        secondary="Control your data"
        trailing={<span className="text-neutral-400">→</span>}
      />
      <ListItem
        primary="Help"
        secondary="Get support"
        trailing={<span className="text-neutral-400">→</span>}
      />
    </List>
  ),
};
