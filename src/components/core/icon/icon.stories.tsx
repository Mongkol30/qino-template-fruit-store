import type { Meta, StoryObj } from '@storybook/react-vite';
import { Icon } from './icon';

const meta: Meta<typeof Icon> = {
  title: 'Core/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    color: {
      control: 'select',
      options: ['default', 'muted', 'primary', 'success', 'warning', 'error'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Simple SVG icon for demo
const HeartIcon = (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

const StarIcon = (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
);

export const Default: Story = {
  args: {
    children: HeartIcon,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Icon size="xs">{HeartIcon}</Icon>
      <Icon size="sm">{HeartIcon}</Icon>
      <Icon size="md">{HeartIcon}</Icon>
      <Icon size="lg">{HeartIcon}</Icon>
      <Icon size="xl">{HeartIcon}</Icon>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Icon color="default">{HeartIcon}</Icon>
      <Icon color="muted">{HeartIcon}</Icon>
      <Icon color="primary">{HeartIcon}</Icon>
      <Icon color="success">{HeartIcon}</Icon>
      <Icon color="warning">{HeartIcon}</Icon>
      <Icon color="error">{HeartIcon}</Icon>
    </div>
  ),
};

export const Gallery: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Icon color="error">{HeartIcon}</Icon>
      <Icon color="warning">{StarIcon}</Icon>
    </div>
  ),
};
