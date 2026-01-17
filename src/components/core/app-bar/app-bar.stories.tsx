import type { Meta, StoryObj } from '@storybook/react-vite';
import { AppBar } from './app-bar';

const meta: Meta<typeof AppBar> = {
  title: 'Navigation/AppBar',
  component: AppBar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: 'select',
      options: ['static', 'fixed', 'sticky'],
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'transparent'],
    },
    elevated: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <AppBar>
      <div className="px-4 py-3 flex items-center justify-between">
        <span className="font-bold text-lg">App Name</span>
        <nav className="flex gap-4">
          <a href="#" className="hover:text-primary-600">Home</a>
          <a href="#" className="hover:text-primary-600">About</a>
          <a href="#" className="hover:text-primary-600">Contact</a>
        </nav>
      </div>
    </AppBar>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="space-y-4">
      <AppBar color="default">
        <div className="px-4 py-3">Default Color</div>
      </AppBar>
      <AppBar color="primary">
        <div className="px-4 py-3">Primary Color</div>
      </AppBar>
      <AppBar color="transparent" className="bg-neutral-100">
        <div className="px-4 py-3">Transparent Color</div>
      </AppBar>
    </div>
  ),
};

export const Elevated: Story = {
  render: () => (
    <AppBar elevated>
      <div className="px-4 py-3 flex items-center justify-between">
        <span className="font-bold text-lg">Elevated AppBar</span>
        <button className="px-4 py-1 bg-primary-600 text-white rounded">Login</button>
      </div>
    </AppBar>
  ),
};

export const WithLogo: Story = {
  render: () => (
    <AppBar color="primary">
      <div className="px-4 py-3 flex items-center gap-4">
        <span className="text-2xl">🚀</span>
        <span className="font-bold text-lg">My App</span>
        <div className="flex-1" />
        <nav className="flex gap-4">
          <a href="#" className="hover:opacity-80">Features</a>
          <a href="#" className="hover:opacity-80">Pricing</a>
          <a href="#" className="hover:opacity-80">Docs</a>
        </nav>
        <button className="px-4 py-1 bg-white text-primary-600 rounded font-medium">Get Started</button>
      </div>
    </AppBar>
  ),
};
