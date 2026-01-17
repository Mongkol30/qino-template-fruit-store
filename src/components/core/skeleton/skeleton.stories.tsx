import type { Meta, StoryObj } from '@storybook/react-vite';
import { Skeleton } from './skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'Feedback/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['text', 'circular', 'rectangular'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    width: 200,
    height: 20,
  },
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <p className="text-sm text-neutral-500 mb-2">Text</p>
        <Skeleton variant="text" width={200} />
      </div>
      <div>
        <p className="text-sm text-neutral-500 mb-2">Circular</p>
        <Skeleton variant="circular" width={48} height={48} />
      </div>
      <div>
        <p className="text-sm text-neutral-500 mb-2">Rectangular</p>
        <Skeleton variant="rectangular" width={200} height={100} />
      </div>
    </div>
  ),
};

export const TextLines: Story = {
  render: () => (
    <div className="space-y-2">
      <Skeleton variant="text" width="100%" />
      <Skeleton variant="text" width="80%" />
      <Skeleton variant="text" width="90%" />
      <Skeleton variant="text" width="60%" />
    </div>
  ),
};

export const CardSkeleton: Story = {
  render: () => (
    <div className="w-72 border rounded-lg p-4 space-y-4">
      <Skeleton variant="rectangular" width="100%" height={150} />
      <Skeleton variant="text" width="80%" />
      <Skeleton variant="text" width="60%" />
      <div className="flex items-center gap-3">
        <Skeleton variant="circular" width={40} height={40} />
        <div className="flex-1 space-y-2">
          <Skeleton variant="text" width="70%" />
          <Skeleton variant="text" width="50%" />
        </div>
      </div>
    </div>
  ),
};

export const ListSkeleton: Story = {
  render: () => (
    <div className="space-y-4">
      {[1, 2, 3].map(i => (
        <div key={i} className="flex items-center gap-4 p-3 border rounded-lg">
          <Skeleton variant="circular" width={48} height={48} />
          <div className="flex-1 space-y-2">
            <Skeleton variant="text" width="60%" />
            <Skeleton variant="text" width="40%" />
          </div>
          <Skeleton variant="rectangular" width={80} height={32} />
        </div>
      ))}
    </div>
  ),
};

export const TableSkeleton: Story = {
  render: () => (
    <div className="border rounded-lg overflow-hidden">
      <div className="grid grid-cols-4 gap-4 p-4 bg-neutral-100 dark:bg-neutral-800">
        {[1, 2, 3, 4].map(i => (
          <Skeleton key={i} variant="text" width="80%" />
        ))}
      </div>
      {[1, 2, 3, 4, 5].map(row => (
        <div key={row} className="grid grid-cols-4 gap-4 p-4 border-t">
          {[1, 2, 3, 4].map(col => (
            <Skeleton key={col} variant="text" width={col === 1 ? '60%' : '80%'} />
          ))}
        </div>
      ))}
    </div>
  ),
};

export const ProfileSkeleton: Story = {
  render: () => (
    <div className="flex flex-col items-center p-6 space-y-4">
      <Skeleton variant="circular" width={100} height={100} />
      <Skeleton variant="text" width={150} height={24} />
      <Skeleton variant="text" width={200} />
      <div className="flex gap-4 mt-4">
        <Skeleton variant="rectangular" width={100} height={36} />
        <Skeleton variant="rectangular" width={100} height={36} />
      </div>
    </div>
  ),
};
