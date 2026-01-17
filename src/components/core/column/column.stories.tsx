import type { Meta, StoryObj } from '@storybook/react-vite';
import { Column } from './column';

const meta: Meta<typeof Column> = {
  title: 'Layout/Column',
  component: Column,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    gap: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'],
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end', 'stretch'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const Box = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-primary-500 text-white p-4 rounded">{children}</div>
);

export const Default: Story = {
  render: () => (
    <Column gap="md">
      <Box>Item 1</Box>
      <Box>Item 2</Box>
      <Box>Item 3</Box>
    </Column>
  ),
};

export const Gaps: Story = {
  render: () => (
    <div className="flex gap-8">
      {(['sm', 'md', 'lg'] as const).map(gap => (
        <div key={gap}>
          <p className="mb-2 text-sm text-neutral-500">gap: {gap}</p>
          <Column gap={gap}>
            <Box>1</Box>
            <Box>2</Box>
            <Box>3</Box>
          </Column>
        </div>
      ))}
    </div>
  ),
};

export const Alignment: Story = {
  render: () => (
    <div className="flex gap-8">
      {(['start', 'center', 'end'] as const).map(align => (
        <div key={align} className="w-40">
          <p className="mb-2 text-sm text-neutral-500">align: {align}</p>
          <Column gap="md" align={align} className="bg-neutral-100 dark:bg-neutral-800 p-4 rounded">
            <Box>Short</Box>
            <Box>Medium text</Box>
            <Box>Longer text here</Box>
          </Column>
        </div>
      ))}
    </div>
  ),
};

export const SidebarExample: Story = {
  render: () => (
    <Column gap="sm" className="w-64 bg-neutral-100 dark:bg-neutral-800 p-4 rounded-lg">
      <a href="#" className="px-4 py-2 rounded-lg bg-primary-100 dark:bg-primary-900 text-primary-600">Dashboard</a>
      <a href="#" className="px-4 py-2 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700">Analytics</a>
      <a href="#" className="px-4 py-2 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700">Settings</a>
      <a href="#" className="px-4 py-2 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700">Help</a>
    </Column>
  ),
};
