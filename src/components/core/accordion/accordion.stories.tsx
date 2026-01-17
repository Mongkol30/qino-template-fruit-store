import type { Meta, StoryObj } from '@storybook/react-vite';
import { Accordion, AccordionItem } from './accordion';

const meta: Meta<typeof Accordion> = {
  title: 'Data Display/Accordion',
  component: Accordion,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Accordion>
      <AccordionItem itemKey="section1" title="Section 1">
        Content for section 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </AccordionItem>
      <AccordionItem itemKey="section2" title="Section 2">
        Content for section 2. Sed do eiusmod tempor incididunt ut labore.
      </AccordionItem>
      <AccordionItem itemKey="section3" title="Section 3">
        Content for section 3. Ut enim ad minim veniam, quis nostrud exercitation.
      </AccordionItem>
    </Accordion>
  ),
};

export const DefaultOpen: Story = {
  render: () => (
    <Accordion defaultExpandedKeys={['section1']}>
      <AccordionItem itemKey="section1" title="Open by Default">
        This section is open by default.
      </AccordionItem>
      <AccordionItem itemKey="section2" title="Section 2">
        Content for section 2.
      </AccordionItem>
    </Accordion>
  ),
};

export const AllowMultiple: Story = {
  render: () => (
    <Accordion allowMultiple>
      <AccordionItem itemKey="section1" title="Section 1">
        Multiple sections can be open at once.
      </AccordionItem>
      <AccordionItem itemKey="section2" title="Section 2">
        Try opening multiple sections.
      </AccordionItem>
      <AccordionItem itemKey="section3" title="Section 3">
        All can be open simultaneously.
      </AccordionItem>
    </Accordion>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <Accordion>
      <AccordionItem itemKey="security" title="🔒 Security Settings">
        Configure your security preferences here.
      </AccordionItem>
      <AccordionItem itemKey="notifications" title="🔔 Notifications">
        Manage notification settings.
      </AccordionItem>
      <AccordionItem itemKey="appearance" title="🎨 Appearance">
        Customize the look and feel.
      </AccordionItem>
    </Accordion>
  ),
};

export const FAQ: Story = {
  render: () => (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
      <Accordion>
        <AccordionItem itemKey="faq1" title="What is your return policy?">
          We accept returns within 30 days of purchase. Items must be in original condition.
        </AccordionItem>
        <AccordionItem itemKey="faq2" title="How long does shipping take?">
          Standard shipping takes 5-7 business days. Express shipping is available for 2-3 day delivery.
        </AccordionItem>
        <AccordionItem itemKey="faq3" title="Do you offer international shipping?">
          Yes, we ship to over 50 countries worldwide. International shipping typically takes 10-14 business days.
        </AccordionItem>
        <AccordionItem itemKey="faq4" title="How can I track my order?">
          Once your order ships, you'll receive a tracking number via email to monitor your delivery.
        </AccordionItem>
      </Accordion>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Accordion>
      <AccordionItem itemKey="active1" title="Active Section">
        This section can be toggled.
      </AccordionItem>
      <AccordionItem itemKey="disabled" title="Disabled Section" disabled>
        This section is disabled and cannot be toggled.
      </AccordionItem>
      <AccordionItem itemKey="active2" title="Another Active Section">
        This section can also be toggled.
      </AccordionItem>
    </Accordion>
  ),
};
