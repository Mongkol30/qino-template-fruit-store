import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProgressCircle } from './progress-circle';

const meta: Meta<typeof ProgressCircle> = {
  title: 'Feedback/ProgressCircle',
  component: ProgressCircle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100 },
    },
    size: {
      control: { type: 'number', min: 40, max: 200 },
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'error', 'info'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 75,
  },
};

export const Values: Story = {
  render: () => (
    <div className="flex gap-8">
      <ProgressCircle value={0} />
      <ProgressCircle value={25} />
      <ProgressCircle value={50} />
      <ProgressCircle value={75} />
      <ProgressCircle value={100} />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <ProgressCircle value={60} size={40} />
      <ProgressCircle value={60} size={60} />
      <ProgressCircle value={60} size={80} />
      <ProgressCircle value={60} size={120} />
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="flex gap-8">
      <ProgressCircle value={75} color="primary" />
      <ProgressCircle value={75} color="secondary" />
      <ProgressCircle value={75} color="success" />
      <ProgressCircle value={75} color="warning" />
      <ProgressCircle value={75} color="error" />
    </div>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div className="flex gap-8">
      <ProgressCircle value={75} showValue />
      <ProgressCircle value={100} showValue />
    </div>
  ),
};

export const Indeterminate: Story = {
  render: () => (
    <ProgressCircle value={0} indeterminate />
  ),
};

export const Dashboard: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-6">
      {[
        { label: 'CPU', value: 45, color: 'success' as const },
        { label: 'Memory', value: 72, color: 'warning' as const },
        { label: 'Disk', value: 89, color: 'error' as const },
      ].map(item => (
        <div key={item.label} className="text-center">
          <ProgressCircle value={item.value} color={item.color} size={80} showValue />
          <p className="mt-2 font-medium">{item.label}</p>
        </div>
      ))}
    </div>
  ),
};

export const GoalTracker: Story = {
  render: () => (
    <div className="flex items-center gap-4 p-4 border rounded-lg">
      <ProgressCircle value={68} size={100} showValue color="success" />
      <div>
        <h3 className="font-semibold">Monthly Goal</h3>
        <p className="text-sm text-neutral-500">$6,800 of $10,000</p>
        <p className="text-xs text-neutral-400 mt-1">12 days remaining</p>
      </div>
    </div>
  ),
};
