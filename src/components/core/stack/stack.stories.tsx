import type { Meta, StoryObj } from '@storybook/react-vite';
import { Stack } from './stack';

const meta: Meta<typeof Stack> = {
  title: 'Layout/Stack',
  component: Stack,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    spacing: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'],
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end', 'stretch', 'baseline'],
    },
    justify: {
      control: 'select',
      options: ['start', 'center', 'end', 'between', 'around', 'evenly'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const Box = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-primary-500 text-white p-4 rounded">{children}</div>
);

export const Vertical: Story = {
  render: () => (
    <Stack direction="vertical" spacing="md">
      <Box>Item 1</Box>
      <Box>Item 2</Box>
      <Box>Item 3</Box>
    </Stack>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <Stack direction="horizontal" spacing="md">
      <Box>Item 1</Box>
      <Box>Item 2</Box>
      <Box>Item 3</Box>
    </Stack>
  ),
};

export const Spacings: Story = {
  render: () => (
    <div className="space-y-8">
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map(spacing => (
        <div key={spacing}>
          <p className="mb-2 text-sm text-neutral-500">spacing: {spacing}</p>
          <Stack direction="horizontal" spacing={spacing}>
            <Box>1</Box>
            <Box>2</Box>
            <Box>3</Box>
          </Stack>
        </div>
      ))}
    </div>
  ),
};

export const Alignment: Story = {
  render: () => (
    <div className="space-y-4">
      {(['start', 'center', 'end'] as const).map(align => (
        <div key={align}>
          <p className="mb-2 text-sm text-neutral-500">align: {align}</p>
          <Stack direction="horizontal" spacing="md" align={align} className="bg-neutral-100 dark:bg-neutral-800 p-4 rounded h-24">
            <Box>1</Box>
            <Box>2</Box>
            <Box>3</Box>
          </Stack>
        </div>
      ))}
    </div>
  ),
};

export const FormLayout: Story = {
  render: () => (
    <Stack direction="vertical" spacing="md" className="w-72">
      <div className="space-y-1">
        <label className="text-sm font-medium">Name</label>
        <input className="w-full px-3 py-2 border rounded-lg" placeholder="Enter name" />
      </div>
      <div className="space-y-1">
        <label className="text-sm font-medium">Email</label>
        <input className="w-full px-3 py-2 border rounded-lg" placeholder="Enter email" />
      </div>
      <Stack direction="horizontal" spacing="sm" align="center">
        <button className="btn btn-primary flex-1">Submit</button>
        <button className="btn flex-1">Cancel</button>
      </Stack>
    </Stack>
  ),
};
