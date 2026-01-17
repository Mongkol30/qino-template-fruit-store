import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextField } from './textfield';

const SearchIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const MailIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const EyeIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const meta: Meta<typeof TextField> = {
  title: 'Form/TextField',
  component: TextField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    fullWidth: {
      control: 'boolean',
    },
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
    placeholder: 'Enter text...',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter username',
    helperText: 'This will be your display name',
  },
};

export const Required: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    required: true,
  },
};

export const WithError: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter password',
    error: 'Password must be at least 8 characters',
    required: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Field',
    placeholder: 'Cannot edit',
    disabled: true,
  },
};

export const Small: Story = {
  args: {
    label: 'Small Input',
    placeholder: 'Small size',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    label: 'Large Input',
    placeholder: 'Large size',
    size: 'lg',
  },
};

export const WithLeftIcon: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search...',
    leftAddon: <SearchIcon />,
  },
};

export const WithRightIcon: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter password',
    rightAddon: <EyeIcon />,
  },
};

export const EmailInput: Story = {
  args: {
    label: 'Email Address',
    type: 'email',
    placeholder: 'you@example.com',
    leftAddon: <MailIcon />,
    helperText: "We'll never share your email",
  },
};

export const FullWidth: Story = {
  args: {
    label: 'Full Width Input',
    placeholder: 'This input takes full width',
    fullWidth: true,
  },
  parameters: {
    layout: 'padded',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <TextField label="Small" placeholder="Small size" size="sm" />
      <TextField label="Medium" placeholder="Medium size (default)" size="md" />
      <TextField label="Large" placeholder="Large size" size="lg" />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <TextField label="Default" placeholder="Default state" />
      <TextField label="With Helper" placeholder="Has helper text" helperText="This is helper text" />
      <TextField label="With Error" placeholder="Has error" error="This field has an error" />
      <TextField label="Disabled" placeholder="Disabled state" disabled />
    </div>
  ),
};
