import type { Meta, StoryObj } from '@storybook/react-vite';
import { Label } from './label';

const meta: Meta<typeof Label> = {
  title: 'Core/Label',
  component: Label,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    required: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Form Label',
    htmlFor: 'input',
  },
};

export const Required: Story = {
  args: {
    children: 'Required Field',
    htmlFor: 'required-input',
    required: true,
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled Field',
    htmlFor: 'disabled-input',
    disabled: true,
  },
};

export const WithInput: Story = {
  render: () => (
    <div className="space-y-2">
      <Label htmlFor="email" required>Email Address</Label>
      <input
        id="email"
        type="email"
        className="w-full px-3 py-2 border rounded-lg border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800"
        placeholder="Enter your email"
      />
    </div>
  ),
};
