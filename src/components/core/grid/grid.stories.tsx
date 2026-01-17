import type { Meta, StoryObj } from '@storybook/react-vite';
import { Grid } from './grid';

const meta: Meta<typeof Grid> = {
  title: 'Layout/Grid',
  component: Grid,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    cols: {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6, 12],
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
  <div className="bg-primary-500 text-white p-4 rounded text-center">{children}</div>
);

export const Default: Story = {
  render: () => (
    <Grid cols={3} gap="md">
      {[1, 2, 3, 4, 5, 6].map(i => (
        <Box key={i}>Item {i}</Box>
      ))}
    </Grid>
  ),
};

export const Columns: Story = {
  render: () => (
    <div className="space-y-8">
      {([2, 3, 4] as const).map(cols => (
        <div key={cols}>
          <p className="mb-2 text-sm text-neutral-500">{cols} columns</p>
          <Grid cols={cols} gap="md">
            {Array.from({ length: cols * 2 }, (_, i) => (
              <Box key={i}>{i + 1}</Box>
            ))}
          </Grid>
        </div>
      ))}
    </div>
  ),
};

export const Gaps: Story = {
  render: () => (
    <div className="space-y-8">
      {(['sm', 'md', 'lg'] as const).map(gap => (
        <div key={gap}>
          <p className="mb-2 text-sm text-neutral-500">gap: {gap}</p>
          <Grid cols={4} gap={gap}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <Box key={i}>{i}</Box>
            ))}
          </Grid>
        </div>
      ))}
    </div>
  ),
};

export const ResponsiveGrid: Story = {
  render: () => (
    <Grid cols={4} gap="md" className="[&>*]:min-w-32">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(i => (
        <Box key={i}>Item {i}</Box>
      ))}
    </Grid>
  ),
};

export const Dashboard: Story = {
  render: () => (
    <Grid cols={4} gap="md">
      <div className="col-span-2 row-span-2 bg-gradient-to-br from-primary-500 to-secondary-500 text-white p-6 rounded-lg">
        <h3 className="text-xl font-bold">Featured</h3>
        <p className="mt-2">Large featured card spanning 2x2</p>
      </div>
      {[1, 2, 3, 4].map(i => (
        <div key={i} className="bg-white dark:bg-neutral-800 p-4 rounded-lg shadow">
          <p className="font-semibold">Card {i}</p>
        </div>
      ))}
    </Grid>
  ),
};
