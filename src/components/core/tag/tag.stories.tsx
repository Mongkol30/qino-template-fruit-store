import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tag } from './tag';

const meta: Meta<typeof Tag> = {
  title: 'Data Display/Tag',
  component: Tag,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'error', 'info', 'neutral'],
    },
    variant: {
      control: 'select',
      options: ['solid', 'outline', 'soft'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Tag',
  },
};

export const Colors: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Tag color="neutral">Neutral</Tag>
      <Tag color="primary">Primary</Tag>
      <Tag color="secondary">Secondary</Tag>
      <Tag color="success">Success</Tag>
      <Tag color="warning">Warning</Tag>
      <Tag color="error">Error</Tag>
      <Tag color="info">Info</Tag>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Tag variant="solid" color="primary">Solid</Tag>
        <Tag variant="solid" color="success">Solid</Tag>
        <Tag variant="solid" color="error">Solid</Tag>
      </div>
      <div className="flex gap-2">
        <Tag variant="outline" color="primary">Outline</Tag>
        <Tag variant="outline" color="success">Outline</Tag>
        <Tag variant="outline" color="error">Outline</Tag>
      </div>
      <div className="flex gap-2">
        <Tag variant="soft" color="primary">Soft</Tag>
        <Tag variant="soft" color="success">Soft</Tag>
        <Tag variant="soft" color="error">Soft</Tag>
      </div>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex gap-2">
      <Tag color="success" leftIcon={<span>✓</span>}>Approved</Tag>
      <Tag color="warning" leftIcon={<span>⏳</span>}>Pending</Tag>
      <Tag color="error" leftIcon={<span>✕</span>}>Rejected</Tag>
    </div>
  ),
};

export const Categories: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Tag color="primary">React</Tag>
      <Tag color="secondary">TypeScript</Tag>
      <Tag color="success">TailwindCSS</Tag>
      <Tag color="warning">JavaScript</Tag>
      <Tag color="error">CSS</Tag>
      <Tag color="neutral">HTML</Tag>
    </div>
  ),
};

export const ProductTags: Story = {
  render: () => (
    <div className="p-4 border rounded-lg">
      <h3 className="font-semibold mb-2">Product Name</h3>
      <div className="flex flex-wrap gap-1">
        <Tag color="success">In Stock</Tag>
        <Tag color="primary">Best Seller</Tag>
        <Tag color="warning">Limited Edition</Tag>
      </div>
    </div>
  ),
};

export const AllColorVariants: Story = {
  render: () => (
    <div className="space-y-4">
      {(['primary', 'secondary', 'success', 'warning', 'error', 'info', 'neutral'] as const).map((color) => (
        <div key={color} className="flex gap-2">
          <Tag variant="solid" color={color}>{color} solid</Tag>
          <Tag variant="outline" color={color}>{color} outline</Tag>
          <Tag variant="soft" color={color}>{color} soft</Tag>
        </div>
      ))}
    </div>
  ),
};
