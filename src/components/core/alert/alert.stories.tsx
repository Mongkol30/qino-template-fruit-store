import type { Meta, StoryObj } from '@storybook/react-vite';
import { Alert } from './alert';

const meta: Meta<typeof Alert> = {
  title: 'Feedback/Alert',
  component: Alert,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
    },
    dismissible: {
      control: 'boolean',
    },
    showIcon: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'This is an informational alert.',
    variant: 'info',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-4">
      <Alert variant="info">This is an info alert — check it out!</Alert>
      <Alert variant="success">This is a success alert — well done!</Alert>
      <Alert variant="warning">This is a warning alert — be careful!</Alert>
      <Alert variant="error">This is an error alert — something went wrong!</Alert>
    </div>
  ),
};

export const WithTitle: Story = {
  render: () => (
    <div className="space-y-4">
      <Alert variant="error" title="Error">
        This is an error alert with a title.
      </Alert>
      <Alert variant="warning" title="Warning">
        This is a warning alert with a title.
      </Alert>
      <Alert variant="success" title="Success">
        Your changes have been saved successfully.
      </Alert>
      <Alert variant="info" title="Info">
        Here is some helpful information.
      </Alert>
    </div>
  ),
};

export const Dismissible: Story = {
  render: () => (
    <Alert variant="info" dismissible onClose={() => alert('Dismissed!')}>
      This alert can be dismissed by clicking the close button.
    </Alert>
  ),
};

export const WithCustomIcon: Story = {
  render: () => (
    <div className="space-y-4">
      <Alert variant="info" icon={<span>ℹ️</span>}>Custom info icon</Alert>
      <Alert variant="success" icon={<span>✅</span>}>Custom success icon</Alert>
      <Alert variant="error" icon={<span>❌</span>}>Custom error icon</Alert>
    </div>
  ),
};

export const WithoutIcon: Story = {
  render: () => (
    <div className="space-y-4">
      <Alert variant="info" showIcon={false}>Alert without icon</Alert>
      <Alert variant="success" showIcon={false}>Alert without icon</Alert>
    </div>
  ),
};

export const LongContent: Story = {
  render: () => (
    <Alert variant="warning" title="Important Notice">
      This is a longer alert message that contains more detailed information. 
      It demonstrates how the alert component handles longer content and maintains 
      proper formatting and readability across multiple lines.
    </Alert>
  ),
};
