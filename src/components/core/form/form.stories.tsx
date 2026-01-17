import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Button, TextField } from '..';
import { Form } from './form';

const meta: Meta<typeof Form> = {
  title: 'Form/Form',
  component: Form,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log('Form submitted:', formData);
    };

    return (
      <Form onSubmit={handleSubmit} className="w-80 space-y-4">
        <TextField
          label="Email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          required
        />
        <TextField
          label="Password"
          type="password"
          value={formData.password}
          onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
          required
        />
        <Button type="submit" variant="primary" fullWidth>
          Sign In
        </Button>
      </Form>
    );
  },
};

export const WithValidation: Story = {
  render: () => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const error = submitted && !isValidEmail ? 'Please enter a valid email' : undefined;

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setSubmitted(true);
      if (isValidEmail) {
        console.log('Valid email:', email);
      }
    };

    return (
      <Form onSubmit={handleSubmit} className="w-80 space-y-4">
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={error}
          required
        />
        <Button type="submit" variant="primary" fullWidth>
          Subscribe
        </Button>
      </Form>
    );
  },
};

export const ContactForm: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      subject: '',
      message: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log('Contact form:', formData);
    };

    return (
      <Form onSubmit={handleSubmit} className="w-96 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <TextField
            label="Name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            required
          />
          <TextField
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            required
          />
        </div>
        <TextField
          label="Subject"
          value={formData.subject}
          onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
          required
        />
        <div className="space-y-2">
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Message
          </label>
          <textarea
            className="w-full px-3 py-2 border rounded-lg border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 min-h-32"
            value={formData.message}
            onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
            required
          />
        </div>
        <div className="flex gap-2">
          <Button type="button" variant="outline" fullWidth>
            Cancel
          </Button>
          <Button type="submit" variant="primary" fullWidth>
            Send Message
          </Button>
        </div>
      </Form>
    );
  },
};
