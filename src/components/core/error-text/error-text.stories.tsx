import type { Meta, StoryObj } from '@storybook/react-vite';
import { ErrorText } from './error-text';

const meta: Meta<typeof ErrorText> = {
  title: 'Form/ErrorText',
  component: ErrorText,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'This field is required',
  },
};

export const WithIcon: Story = {
  args: {
    children: 'Please enter a valid email address',
    showIcon: true,
  },
};

export const Multiple: Story = {
  render: () => (
    <div className="space-y-2">
      <ErrorText>Password must be at least 8 characters</ErrorText>
      <ErrorText>Password must contain a number</ErrorText>
      <ErrorText>Password must contain a special character</ErrorText>
    </div>
  ),
};

export const InFormContext: Story = {
  render: () => (
    <div className="space-y-2 w-72">
      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
        Email
      </label>
      <input
        type="email"
        className="w-full px-3 py-2 border rounded-lg border-error-500 bg-white dark:bg-neutral-800"
        placeholder="Enter email"
      />
      <ErrorText>Please enter a valid email address</ErrorText>
    </div>
  ),
};
