import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card } from './card';

const meta: Meta<typeof Card> = {
  title: 'Layout/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outlined', 'elevated'],
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'This is a basic card component',
    className: 'w-72',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex gap-4">
      <Card variant="elevated" className="w-48">Elevated</Card>
      <Card variant="outlined" className="w-48">Outlined</Card>
      <Card variant="default" className="w-48">Default</Card>
    </div>
  ),
};

export const Padding: Story = {
  render: () => (
    <div className="flex gap-4">
      <Card padding="none" className="w-32">None</Card>
      <Card padding="sm" className="w-32">Small</Card>
      <Card padding="md" className="w-32">Medium</Card>
      <Card padding="lg" className="w-32">Large</Card>
    </div>
  ),
};

export const WithContent: Story = {
  render: () => (
    <Card className="w-80">
      <div className="h-40 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-t-lg" />
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2">Card Title</h3>
        <p className="text-neutral-600 dark:text-neutral-400 text-sm">
          This is a card with an image header and content area.
        </p>
      </div>
    </Card>
  ),
};

export const Interactive: Story = {
  args: {
    children: 'Click me!',
    className: 'w-48 cursor-pointer hover:shadow-lg transition-shadow',
    onClick: () => alert('Card clicked!'),
  },
};

export const ProductCard: Story = {
  render: () => (
    <Card className="w-72">
      <div className="h-48 bg-neutral-200 dark:bg-neutral-700 rounded-t-lg flex items-center justify-center">
        <span className="text-4xl">📦</span>
      </div>
      <div className="p-4 space-y-2">
        <h3 className="font-semibold">Product Name</h3>
        <p className="text-sm text-neutral-500">Short description here</p>
        <div className="flex items-center justify-between pt-2">
          <span className="text-lg font-bold text-primary-600">$99.00</span>
          <button className="btn btn-primary text-sm">Add to Cart</button>
        </div>
      </div>
    </Card>
  ),
};
