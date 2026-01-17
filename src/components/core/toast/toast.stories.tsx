import type { Meta, StoryObj } from '@storybook/react-vite';
import { ToastContainer } from './toast';
import type { ToastProps } from './toast';

const meta: Meta<typeof ToastContainer> = {
  title: 'Feedback/Toast',
  component: ToastContainer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: 'select',
      options: ['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleToasts: ToastProps[] = [
  { id: '1', message: 'This is an info toast', variant: 'info' },
  { id: '2', message: 'This is a success toast', variant: 'success' },
  { id: '3', message: 'This is a warning toast', variant: 'warning' },
  { id: '4', message: 'This is an error toast', variant: 'error' },
];

export const Default: Story = {
  render: () => (
    <ToastContainer
      toasts={sampleToasts}
      onRemove={(id) => console.log('Remove toast:', id)}
    />
  ),
};

export const TopRight: Story = {
  render: () => (
    <ToastContainer
      position="top-right"
      toasts={[
        { id: '1', message: 'New notification received', variant: 'info' },
      ]}
      onRemove={() => {}}
    />
  ),
};

export const BottomCenter: Story = {
  render: () => (
    <ToastContainer
      position="bottom-center"
      toasts={[
        { id: '1', message: 'Changes saved successfully', variant: 'success' },
      ]}
      onRemove={() => {}}
    />
  ),
};

export const AllVariants: Story = {
  render: () => (
    <ToastContainer
      position="top-center"
      toasts={sampleToasts}
      onRemove={() => {}}
    />
  ),
};

export const WithLongMessage: Story = {
  render: () => (
    <ToastContainer
      toasts={[
        { 
          id: '1', 
          message: 'This is a longer toast message that demonstrates how the component handles multiline content.',
          variant: 'warning',
        },
      ]}
      onRemove={() => {}}
    />
  ),
};

export const NonDismissible: Story = {
  render: () => (
    <ToastContainer
      toasts={[
        { 
          id: '1', 
          message: 'Processing your request...', 
          variant: 'info',
          dismissible: false,
          duration: 0,
        },
      ]}
      onRemove={() => {}}
    />
  ),
};
