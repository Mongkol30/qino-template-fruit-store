import type { Meta, StoryObj } from '@storybook/react-vite';
import { HelperText } from './helper-text';

const meta: Meta<typeof HelperText> = {
  title: 'Form/HelperText',
  component: HelperText,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Enter your full legal name as it appears on official documents',
  },
};

export const WithInput: Story = {
  render: () => (
    <div className="space-y-2 w-72">
      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
        Username
      </label>
      <input
        type="text"
        className="w-full px-3 py-2 border rounded-lg border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800"
        placeholder="Enter username"
      />
      <HelperText>Choose a unique username (3-20 characters)</HelperText>
    </div>
  ),
};

export const CharacterCount: Story = {
  render: () => (
    <div className="space-y-2 w-72">
      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
        Bio
      </label>
      <textarea
        className="w-full px-3 py-2 border rounded-lg border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800"
        placeholder="Tell us about yourself"
        rows={3}
      />
      <HelperText>42/200 characters</HelperText>
    </div>
  ),
};
