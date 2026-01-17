import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Slider } from './slider';

const meta: Meta<typeof Slider> = {
  title: 'Form/Slider',
  component: Slider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState(50);
    return (
      <div className="w-72">
        <Slider label="Volume" value={value} onChange={setValue} />
      </div>
    );
  },
};

export const WithMinMax: Story = {
  render: () => {
    const [value, setValue] = useState(25);
    return (
      <div className="w-72">
        <Slider label="Temperature" value={value} onChange={setValue} min={0} max={100} showValue />
      </div>
    );
  },
};

export const WithStep: Story = {
  render: () => {
    const [value, setValue] = useState(50);
    return (
      <div className="w-72">
        <Slider label="Brightness" value={value} onChange={setValue} step={10} showValue />
      </div>
    );
  },
};

export const WithRange: Story = {
  render: () => {
    const [value, setValue] = useState(50);
    return (
      <div className="w-72">
        <Slider label="Progress" value={value} onChange={setValue} showValue showRange />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="w-72">
      <Slider label="Disabled" value={50} onChange={() => {}} disabled />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => {
    const [value1, setValue1] = useState(50);
    const [value2, setValue2] = useState(50);
    const [value3, setValue3] = useState(50);
    return (
      <div className="space-y-8 w-72">
        <Slider label="Small" value={value1} onChange={setValue1} size="sm" />
        <Slider label="Medium" value={value2} onChange={setValue2} size="md" />
        <Slider label="Large" value={value3} onChange={setValue3} size="lg" />
      </div>
    );
  },
};
