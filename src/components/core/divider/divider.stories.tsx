import type { Meta, StoryObj } from '@storybook/react-vite';
import { Divider } from './divider';

const meta: Meta<typeof Divider> = {
  title: 'Core/Divider',
  component: Divider,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    variant: {
      control: 'select',
      options: ['solid', 'dashed', 'dotted'],
    },
    textAlign: {
      control: 'select',
      options: ['left', 'center', 'right'],
    },
    spacing: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Solid: Story = {
  args: {
    variant: 'solid',
  },
};

export const Dashed: Story = {
  args: {
    variant: 'dashed',
  },
};

export const Dotted: Story = {
  args: {
    variant: 'dotted',
  },
};

export const WithText: Story = {
  args: {
    children: 'OR',
  },
};

export const TextAlignLeft: Story = {
  args: {
    children: 'Section',
    textAlign: 'left',
  },
};

export const TextAlignRight: Story = {
  args: {
    children: 'Section',
    textAlign: 'right',
  },
};

export const SmallSpacing: Story = {
  args: {
    spacing: 'sm',
  },
};

export const LargeSpacing: Story = {
  args: {
    spacing: 'lg',
  },
};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
  },
  render: (args) => (
    <div className="flex items-center h-10 gap-0">
      <span className="px-4">Item 1</span>
      <Divider {...args} />
      <span className="px-4">Item 2</span>
      <Divider {...args} />
      <span className="px-4">Item 3</span>
    </div>
  ),
};

export const CustomColor: Story = {
  args: {
    color: 'border-purple-500',
  },
};

export const InContent: Story = {
  render: () => (
    <div className="w-80 bg-gray-800 p-4 rounded-lg">
      <h3 className="text-lg font-semibold text-white">Section Title</h3>
      <p className="text-gray-400 text-sm mt-2">Some content above the divider.</p>
      <Divider />
      <p className="text-gray-400 text-sm">Some content below the divider.</p>
    </div>
  ),
};

export const LoginForm: Story = {
  render: () => (
    <div className="w-80 bg-gray-800 p-6 rounded-lg">
      <button className="w-full py-2 px-4 bg-white text-gray-900 rounded-lg font-medium">
        Continue with Google
      </button>
      <Divider spacing="lg">or continue with</Divider>
      <input
        type="email"
        placeholder="Email"
        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400"
      />
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="w-full space-y-8">
      <div>
        <p className="text-sm text-gray-400 mb-2">Solid (default)</p>
        <Divider variant="solid" />
      </div>
      <div>
        <p className="text-sm text-gray-400 mb-2">Dashed</p>
        <Divider variant="dashed" />
      </div>
      <div>
        <p className="text-sm text-gray-400 mb-2">Dotted</p>
        <Divider variant="dotted" />
      </div>
    </div>
  ),
};
