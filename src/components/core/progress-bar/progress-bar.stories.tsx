import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProgressBar } from './progress-bar';

const meta: Meta<typeof ProgressBar> = {
  title: 'Feedback/ProgressBar',
  component: ProgressBar,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100 },
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
    },
    color: {
      control: 'select',
      options: ['primary', 'success', 'warning', 'error', 'info'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 60,
  },
};

export const Values: Story = {
  render: () => (
    <div className="space-y-4">
      <ProgressBar value={0} />
      <ProgressBar value={25} />
      <ProgressBar value={50} />
      <ProgressBar value={75} />
      <ProgressBar value={100} />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <ProgressBar value={60} size="sm" />
      <ProgressBar value={60} size="md" />
      <ProgressBar value={60} size="lg" />
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="space-y-4">
      <ProgressBar value={60} color="primary" />
      <ProgressBar value={60} color="success" />
      <ProgressBar value={60} color="warning" />
      <ProgressBar value={60} color="error" />
      <ProgressBar value={60} color="info" />
    </div>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>Progress</span>
        <span>60%</span>
      </div>
      <ProgressBar value={60} />
    </div>
  ),
};

export const Indeterminate: Story = {
  render: () => (
    <ProgressBar value={0} indeterminate />
  ),
};

export const FileUpload: Story = {
  render: () => (
    <div className="space-y-2 p-4 border rounded-lg">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">document.pdf</span>
        <span className="text-sm text-neutral-500">2.4 MB</span>
      </div>
      <ProgressBar value={75} color="success" />
      <p className="text-xs text-neutral-500">75% complete</p>
    </div>
  ),
};

export const MultipleFiles: Story = {
  render: () => (
    <div className="space-y-4">
      {[
        { name: 'image1.jpg', progress: 100 },
        { name: 'image2.png', progress: 75 },
        { name: 'document.pdf', progress: 30 },
      ].map(file => (
        <div key={file.name} className="space-y-1">
          <div className="flex justify-between text-sm">
            <span>{file.name}</span>
            <span>{file.progress}%</span>
          </div>
          <ProgressBar
            value={file.progress}
            color={file.progress === 100 ? 'success' : 'primary'}
            size="sm"
          />
        </div>
      ))}
    </div>
  ),
};
