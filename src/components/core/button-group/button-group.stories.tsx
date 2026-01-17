import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../button';
import { ButtonGroup } from './button-group';

const meta: Meta<typeof ButtonGroup> = {
  title: 'Form/ButtonGroup',
  component: ButtonGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    vertical: {
      control: 'boolean',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: 'select',
      options: ['solid', 'outline', 'ghost'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ButtonGroup>
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
    </ButtonGroup>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-4">
      <ButtonGroup>
        <Button variant="primary">Primary</Button>
        <Button variant="primary">Primary</Button>
        <Button variant="primary">Primary</Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline">Outline</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="outline">Outline</Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="secondary">Secondary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="secondary">Secondary</Button>
      </ButtonGroup>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <ButtonGroup size="sm">
        <Button>Small</Button>
        <Button>Small</Button>
        <Button>Small</Button>
      </ButtonGroup>
      <ButtonGroup size="md">
        <Button>Medium</Button>
        <Button>Medium</Button>
        <Button>Medium</Button>
      </ButtonGroup>
      <ButtonGroup size="lg">
        <Button>Large</Button>
        <Button>Large</Button>
        <Button>Large</Button>
      </ButtonGroup>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <ButtonGroup vertical>
      <Button variant="outline">Option A</Button>
      <Button variant="outline">Option B</Button>
      <Button variant="outline">Option C</Button>
    </ButtonGroup>
  ),
};
