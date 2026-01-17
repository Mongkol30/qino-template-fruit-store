import type { Meta, StoryObj } from '@storybook/react-vite';
import { Flex } from './flex';

const meta: Meta<typeof Flex> = {
  title: 'Layout/Flex',
  component: Flex,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: 'select',
      options: ['row', 'row-reverse', 'col', 'col-reverse'],
    },
    justify: {
      control: 'select',
      options: ['start', 'end', 'center', 'between', 'around', 'evenly'],
    },
    align: {
      control: 'select',
      options: ['start', 'end', 'center', 'baseline', 'stretch'],
    },
    wrap: {
      control: 'select',
      options: ['wrap', 'nowrap', 'wrap-reverse'],
    },
    gap: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const Box = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-primary-500 text-white p-4 rounded">{children}</div>
);

export const Default: Story = {
  render: () => (
    <Flex gap="md">
      <Box>Item 1</Box>
      <Box>Item 2</Box>
      <Box>Item 3</Box>
    </Flex>
  ),
};

export const Direction: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <p className="mb-2 text-sm text-neutral-500">Row (default)</p>
        <Flex direction="row" gap="md">
          <Box>1</Box>
          <Box>2</Box>
          <Box>3</Box>
        </Flex>
      </div>
      <div>
        <p className="mb-2 text-sm text-neutral-500">Column</p>
        <Flex direction="col" gap="md">
          <Box>1</Box>
          <Box>2</Box>
          <Box>3</Box>
        </Flex>
      </div>
    </div>
  ),
};

export const Justify: Story = {
  render: () => (
    <div className="space-y-4">
      {(['start', 'end', 'center', 'between', 'around', 'evenly'] as const).map(justify => (
        <div key={justify}>
          <p className="mb-2 text-sm text-neutral-500">{justify}</p>
          <Flex justify={justify} gap="md" className="bg-neutral-100 dark:bg-neutral-800 p-2 rounded">
            <Box>1</Box>
            <Box>2</Box>
            <Box>3</Box>
          </Flex>
        </div>
      ))}
    </div>
  ),
};

export const Align: Story = {
  render: () => (
    <div className="space-y-4">
      {(['start', 'end', 'center', 'stretch'] as const).map(align => (
        <div key={align}>
          <p className="mb-2 text-sm text-neutral-500">{align}</p>
          <Flex align={align} gap="md" className="bg-neutral-100 dark:bg-neutral-800 p-2 rounded h-24">
            <Box>1</Box>
            <Box>2</Box>
            <Box>3</Box>
          </Flex>
        </div>
      ))}
    </div>
  ),
};

export const Gaps: Story = {
  render: () => (
    <div className="space-y-4">
      {(['none', 'xs', 'sm', 'md', 'lg', 'xl'] as const).map(gap => (
        <div key={gap}>
          <p className="mb-2 text-sm text-neutral-500">gap: {gap}</p>
          <Flex gap={gap} className="bg-neutral-100 dark:bg-neutral-800 p-2 rounded">
            <Box>1</Box>
            <Box>2</Box>
            <Box>3</Box>
          </Flex>
        </div>
      ))}
    </div>
  ),
};

export const Wrap: Story = {
  render: () => (
    <Flex wrap="wrap" gap="md" className="w-64">
      {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
        <Box key={i}>Item {i}</Box>
      ))}
    </Flex>
  ),
};
