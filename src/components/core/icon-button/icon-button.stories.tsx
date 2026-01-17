import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconButton } from './icon-button';

const PlusIcon = () => (
  <svg className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

const TrashIcon = () => (
  <svg className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const EditIcon = () => (
  <svg className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

const meta: Meta<typeof IconButton> = {
  title: 'Core/IconButton',
  component: IconButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'danger'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
    },
    rounded: {
      control: 'boolean',
    },
    isLoading: {
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
    icon: <PlusIcon />,
    'aria-label': 'Add item',
  },
};

export const Primary: Story = {
  args: {
    icon: <PlusIcon />,
    variant: 'primary',
    'aria-label': 'Add item',
  },
};

export const Secondary: Story = {
  args: {
    icon: <EditIcon />,
    variant: 'secondary',
    'aria-label': 'Edit item',
  },
};

export const Outline: Story = {
  args: {
    icon: <EditIcon />,
    variant: 'outline',
    'aria-label': 'Edit item',
  },
};

export const Danger: Story = {
  args: {
    icon: <TrashIcon />,
    variant: 'danger',
    'aria-label': 'Delete item',
  },
};

export const Rounded: Story = {
  args: {
    icon: <PlusIcon />,
    variant: 'primary',
    rounded: true,
    'aria-label': 'Add item',
  },
};

export const ExtraSmall: Story = {
  args: {
    icon: <PlusIcon />,
    size: 'xs',
    'aria-label': 'Add item',
  },
};

export const Small: Story = {
  args: {
    icon: <PlusIcon />,
    size: 'sm',
    'aria-label': 'Add item',
  },
};

export const Large: Story = {
  args: {
    icon: <PlusIcon />,
    size: 'lg',
    'aria-label': 'Add item',
  },
};

export const Loading: Story = {
  args: {
    icon: <PlusIcon />,
    isLoading: true,
    'aria-label': 'Loading',
  },
};

export const Disabled: Story = {
  args: {
    icon: <PlusIcon />,
    disabled: true,
    'aria-label': 'Disabled',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-4">
      <IconButton icon={<PlusIcon />} variant="primary" aria-label="Primary" />
      <IconButton icon={<EditIcon />} variant="secondary" aria-label="Secondary" />
      <IconButton icon={<EditIcon />} variant="outline" aria-label="Outline" />
      <IconButton icon={<PlusIcon />} variant="ghost" aria-label="Ghost" />
      <IconButton icon={<TrashIcon />} variant="danger" aria-label="Danger" />
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <IconButton icon={<PlusIcon />} size="xs" variant="primary" aria-label="Extra small" />
      <IconButton icon={<PlusIcon />} size="sm" variant="primary" aria-label="Small" />
      <IconButton icon={<PlusIcon />} size="md" variant="primary" aria-label="Medium" />
      <IconButton icon={<PlusIcon />} size="lg" variant="primary" aria-label="Large" />
    </div>
  ),
};
