import type { Meta, StoryObj } from '@storybook/react-vite';
import { Chip } from './chip';

const meta: Meta<typeof Chip> = {
  title: 'Data Display/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'outline', 'soft'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'error', 'info', 'neutral'],
    },
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
    label: 'Chip',
  },
};

export const Colors: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Chip label="Primary" color="primary" />
      <Chip label="Secondary" color="secondary" />
      <Chip label="Success" color="success" />
      <Chip label="Warning" color="warning" />
      <Chip label="Error" color="error" />
      <Chip label="Info" color="info" />
      <Chip label="Neutral" color="neutral" />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex gap-2">
      <Chip label="Solid" variant="solid" color="primary" />
      <Chip label="Outline" variant="outline" color="primary" />
      <Chip label="Soft" variant="soft" color="primary" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Chip label="Small" size="sm" />
      <Chip label="Medium" size="md" />
      <Chip label="Large" size="lg" />
    </div>
  ),
};

export const Deletable: Story = {
  render: () => (
    <div className="flex gap-2">
      <Chip label="Deletable" onDelete={() => alert('Deleted!')} />
      <Chip label="Primary" onDelete={() => {}} color="primary" />
      <Chip label="Error" onDelete={() => {}} color="error" />
    </div>
  ),
};

export const Clickable: Story = {
  render: () => (
    <div className="flex gap-2">
      <Chip label="Click me" onClick={() => alert('Clicked!')} />
      <Chip label="Primary" onClick={() => {}} color="primary" />
    </div>
  ),
};

export const WithAvatar: Story = {
  render: () => (
    <div className="flex gap-2">
      <Chip label="John Doe" avatar="https://i.pravatar.cc/40?img=1" />
      <Chip label="Jane Smith" avatar="https://i.pravatar.cc/40?img=2" />
    </div>
  ),
};

export const TagsInput: Story = {
  render: () => (
    <div className="border rounded-lg p-2 flex flex-wrap gap-2">
      <Chip label="React" onDelete={() => {}} />
      <Chip label="TypeScript" onDelete={() => {}} />
      <Chip label="TailwindCSS" onDelete={() => {}} />
      <Chip label="Storybook" onDelete={() => {}} />
      <input
        type="text"
        placeholder="Add tag..."
        className="flex-1 min-w-24 outline-none bg-transparent"
      />
    </div>
  ),
};

export const FilterChips: Story = {
  render: () => (
    <div className="space-y-2">
      <p className="text-sm text-neutral-500">Filter by:</p>
      <div className="flex flex-wrap gap-2">
        <Chip label="All" onClick={() => {}} variant="outline" />
        <Chip label="Active" onClick={() => {}} color="primary" />
        <Chip label="Completed" onClick={() => {}} variant="outline" />
        <Chip label="Archived" onClick={() => {}} variant="outline" />
      </div>
    </div>
  ),
};
