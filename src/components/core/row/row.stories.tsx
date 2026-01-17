import type { Meta, StoryObj } from '@storybook/react-vite';
import { Row } from './row';

const meta: Meta<typeof Row> = {
  title: 'Layout/Row',
  component: Row,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    gap: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'],
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end', 'stretch', 'baseline'],
    },
    justify: {
      control: 'select',
      options: ['start', 'center', 'end', 'between', 'around'],
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
    <Row gap="md">
      <Box>Item 1</Box>
      <Box>Item 2</Box>
      <Box>Item 3</Box>
    </Row>
  ),
};

export const Justify: Story = {
  render: () => (
    <div className="space-y-4">
      {(['start', 'center', 'end', 'between'] as const).map(justify => (
        <div key={justify}>
          <p className="mb-2 text-sm text-neutral-500">justify: {justify}</p>
          <Row justify={justify} gap="md" className="bg-neutral-100 dark:bg-neutral-800 p-2 rounded">
            <Box>1</Box>
            <Box>2</Box>
            <Box>3</Box>
          </Row>
        </div>
      ))}
    </div>
  ),
};

export const Align: Story = {
  render: () => (
    <div className="space-y-4">
      {(['start', 'center', 'end'] as const).map(align => (
        <div key={align}>
          <p className="mb-2 text-sm text-neutral-500">align: {align}</p>
          <Row align={align} gap="md" className="bg-neutral-100 dark:bg-neutral-800 p-2 rounded h-24">
            <Box>1</Box>
            <Box>2</Box>
            <Box>3</Box>
          </Row>
        </div>
      ))}
    </div>
  ),
};

export const NavExample: Story = {
  render: () => (
    <Row justify="between" align="center" className="bg-white dark:bg-neutral-800 p-4 rounded-lg shadow">
      <span className="font-bold text-lg">Logo</span>
      <Row gap="lg">
        <a href="#" className="hover:text-primary-500">Home</a>
        <a href="#" className="hover:text-primary-500">About</a>
        <a href="#" className="hover:text-primary-500">Contact</a>
      </Row>
      <button className="btn btn-primary">Sign In</button>
    </Row>
  ),
};
