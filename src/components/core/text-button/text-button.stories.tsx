import type { Meta, StoryObj } from '@storybook/react';
import { TextButton } from './text-button';

const meta: Meta<typeof TextButton> = {
  title: 'Core/TextButton',
  component: TextButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'neutral', 'error', 'success', 'warning'],
    },
    underline: {
      control: 'select',
      options: ['none', 'hover', 'always'],
    },
    disabled: {
      control: 'boolean',
    },
    onClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof TextButton>;

// Default
export const Default: Story = {
  args: {
    children: 'Click me',
  },
};

// Sizes
export const ExtraSmall: Story = {
  args: {
    children: 'Extra Small',
    size: 'xs',
  },
};

export const Small: Story = {
  args: {
    children: 'Small',
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    children: 'Medium',
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    children: 'Large',
    size: 'lg',
  },
};

// Colors
export const Primary: Story = {
  args: {
    children: 'Primary',
    color: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary',
    color: 'secondary',
  },
};

export const Neutral: Story = {
  args: {
    children: 'Neutral',
    color: 'neutral',
  },
};

export const Error: Story = {
  args: {
    children: 'Error',
    color: 'error',
  },
};

export const Success: Story = {
  args: {
    children: 'Success',
    color: 'success',
  },
};

export const Warning: Story = {
  args: {
    children: 'Warning',
    color: 'warning',
  },
};

// Underline styles
export const NoUnderline: Story = {
  args: {
    children: 'No Underline',
    underline: 'none',
  },
};

export const UnderlineOnHover: Story = {
  args: {
    children: 'Underline on Hover',
    underline: 'hover',
  },
};

export const AlwaysUnderline: Story = {
  args: {
    children: 'Always Underline',
    underline: 'always',
  },
};

// States
export const Disabled: Story = {
  args: {
    children: 'Disabled',
    disabled: true,
  },
};

// All Sizes
export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <TextButton size="xs">Extra Small</TextButton>
      <TextButton size="sm">Small</TextButton>
      <TextButton size="md">Medium</TextButton>
      <TextButton size="lg">Large</TextButton>
    </div>
  ),
};

// All Colors
export const AllColors: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <TextButton color="primary">Primary</TextButton>
      <TextButton color="secondary">Secondary</TextButton>
      <TextButton color="neutral">Neutral</TextButton>
      <TextButton color="success">Success</TextButton>
      <TextButton color="warning">Warning</TextButton>
      <TextButton color="error">Error</TextButton>
    </div>
  ),
};

// In Context - Login Example
export const InLoginContext: Story = {
  render: () => (
    <div className="flex flex-col gap-4 rounded-lg border border-neutral-200 bg-white p-6 dark:border-neutral-700 dark:bg-neutral-800">
      <p className="text-sm text-neutral-600 dark:text-neutral-400">
        Don&apos;t have an account?{' '}
        <TextButton size="sm">Register</TextButton>
      </p>
      <div className="flex justify-between">
        <span className="text-sm text-neutral-600 dark:text-neutral-400">Remember me</span>
        <TextButton size="sm">Forgot password?</TextButton>
      </div>
    </div>
  ),
};

// With Icon
export const WithIcon: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <TextButton>
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
        Open link
      </TextButton>
      <TextButton color="neutral">
        Learn more
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </TextButton>
    </div>
  ),
};
