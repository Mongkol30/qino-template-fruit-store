import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Collapse } from './collapse';

const meta: Meta<typeof Collapse> = {
  title: 'Data Display/Collapse',
  component: Collapse,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Collapse
      trigger={
        <div className="px-4 py-3 bg-neutral-100 dark:bg-neutral-800 rounded-t-lg font-medium flex items-center justify-between">
          Click to expand
          <span>▼</span>
        </div>
      }
    >
      <div className="p-4 bg-neutral-50 dark:bg-neutral-900 rounded-b-lg">
        This content will collapse and expand smoothly.
      </div>
    </Collapse>
  ),
};

export const DefaultOpen: Story = {
  render: () => (
    <Collapse
      defaultOpen
      trigger={
        <div className="px-4 py-3 bg-neutral-100 dark:bg-neutral-800 rounded-t-lg font-medium">
          Expandable Section (Open by Default)
        </div>
      }
    >
      <div className="p-4 border border-t-0 rounded-b-lg">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </div>
    </Collapse>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div className="space-y-4">
        <button onClick={() => setOpen(!open)} className="btn btn-primary">
          {open ? 'Close' : 'Open'} Collapse
        </button>
        <Collapse
          open={open}
          onChange={setOpen}
          trigger={
            <div className="px-4 py-3 bg-neutral-100 dark:bg-neutral-800 rounded-t-lg font-medium">
              Controlled Collapse
            </div>
          }
        >
          <div className="p-4 border border-t-0 rounded-b-lg">
            This collapse is controlled from outside.
          </div>
        </Collapse>
      </div>
    );
  },
};

export const MultipleItems: Story = {
  render: () => {
    const items = [
      { title: 'Personal Information', content: 'Name, email, phone number, and other contact details.' },
      { title: 'Address', content: 'Street address, city, state, country, and postal code.' },
      { title: 'Payment Method', content: 'Credit card, PayPal, bank transfer, and other payment options.' },
    ];

    return (
      <div className="space-y-2">
        {items.map((item, index) => (
          <Collapse
            key={index}
            trigger={
              <div className="px-4 py-3 border rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800 font-medium flex justify-between items-center">
                {item.title}
                <span>▼</span>
              </div>
            }
          >
            <div className="p-4 border border-t-0 rounded-b-lg -mt-2">
              {item.content}
            </div>
          </Collapse>
        ))}
      </div>
    );
  },
};

export const ReadMore: Story = {
  render: () => (
    <div className="max-w-md">
      <p>
        This is the beginning of a long text. It shows a preview of the content...
      </p>
      <Collapse
        trigger={<span className="text-primary-500 cursor-pointer">Read more</span>}
      >
        <p className="mt-2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </Collapse>
    </div>
  ),
};

export const FAQ: Story = {
  render: () => {
    const faqs = [
      { question: 'What is your return policy?', answer: 'We accept returns within 30 days of purchase.' },
      { question: 'How long does shipping take?', answer: 'Standard shipping takes 5-7 business days.' },
      { question: 'Do you offer international shipping?', answer: 'Yes, we ship to over 50 countries.' },
    ];

    return (
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <Collapse
              key={index}
              trigger={
                <div className="px-4 py-3 bg-neutral-100 dark:bg-neutral-800 rounded-lg font-medium flex justify-between items-center">
                  {faq.question}
                  <span>▼</span>
                </div>
              }
            >
              <div className="p-4 text-neutral-600 dark:text-neutral-400">
                {faq.answer}
              </div>
            </Collapse>
          ))}
        </div>
      </div>
    );
  },
};
