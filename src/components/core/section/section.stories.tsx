import type { Meta, StoryObj } from '@storybook/react-vite';
import { Section } from './section';

const meta: Meta<typeof Section> = {
  title: 'Layout/Section',
  component: Section,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    title: {
      control: 'text',
    },
    description: {
      control: 'text',
    },
    divider: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Section>
      <p className="text-neutral-600 dark:text-neutral-400">
        This is a default section with proper spacing.
      </p>
    </Section>
  ),
};

export const WithTitleAndDescription: Story = {
  render: () => (
    <Section title="Section Title" description="This is a description for the section.">
      <p className="text-neutral-600 dark:text-neutral-400">
        Section content goes here.
      </p>
    </Section>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div>
      <Section size="sm" className="bg-neutral-100 dark:bg-neutral-800">
        <p>Small padding</p>
      </Section>
      <Section size="md">
        <p>Medium padding (default)</p>
      </Section>
      <Section size="lg" className="bg-neutral-100 dark:bg-neutral-800">
        <p>Large padding</p>
      </Section>
    </div>
  ),
};

export const WithActions: Story = {
  render: () => (
    <Section
      title="Users"
      description="Manage your team members"
      actions={<button className="btn btn-primary text-sm">Add User</button>}
    >
      <div className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
        User list goes here
      </div>
    </Section>
  ),
};

export const WithDivider: Story = {
  render: () => (
    <Section
      title="Settings"
      description="Configure your preferences"
      divider
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span>Dark Mode</span>
          <button className="btn btn-sm">Toggle</button>
        </div>
        <div className="flex items-center justify-between">
          <span>Notifications</span>
          <button className="btn btn-sm">Configure</button>
        </div>
      </div>
    </Section>
  ),
};

export const PageExample: Story = {
  render: () => (
    <div className="min-h-screen bg-white dark:bg-neutral-900">
      <Section size="lg" className="bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Welcome to Our Platform</h1>
          <p className="text-xl opacity-90 mb-6">Build amazing things with our tools</p>
          <button className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold">
            Get Started
          </button>
        </div>
      </Section>
      <Section title="Features" description="What we offer">
        <div className="grid grid-cols-3 gap-6">
          {['Fast', 'Secure', 'Scalable'].map(feature => (
            <div key={feature} className="text-center p-6 rounded-lg bg-neutral-50 dark:bg-neutral-800">
              <h3 className="font-semibold text-lg">{feature}</h3>
            </div>
          ))}
        </div>
      </Section>
    </div>
  ),
};
