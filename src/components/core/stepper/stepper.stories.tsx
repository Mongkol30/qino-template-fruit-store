import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Stepper } from './stepper';

const meta: Meta<typeof Stepper> = {
  title: 'Navigation/Stepper',
  component: Stepper,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    steps: [
      { title: 'Account' },
      { title: 'Personal Info' },
      { title: 'Review' },
      { title: 'Complete' },
    ],
    currentStep: 1,
  },
};

export const WithDescriptions: Story = {
  args: {
    steps: [
      { title: 'Account', description: 'Create your account' },
      { title: 'Personal Info', description: 'Add your details' },
      { title: 'Review', description: 'Review and submit' },
    ],
    currentStep: 2,
  },
};

export const Interactive: Story = {
  render: () => {
    const [step, setStep] = useState(0);
    const steps = [
      { title: 'Account' },
      { title: 'Profile' },
      { title: 'Review' },
      { title: 'Done' },
    ];
    return (
      <div className="space-y-6">
        <Stepper steps={steps} currentStep={step} onStepClick={setStep} />
        <div className="p-4 border rounded-lg">
          <h3 className="text-lg font-semibold">Step {step + 1}: {steps[step].title}</h3>
          <p className="text-neutral-500 mt-2">Content for step {step + 1}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setStep(s => Math.max(0, s - 1))}
            disabled={step === 0}
            className="px-4 py-2 border rounded-md disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => setStep(s => Math.min(steps.length - 1, s + 1))}
            disabled={step === steps.length - 1}
            className="px-4 py-2 bg-primary-500 text-white rounded-md disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    );
  },
};

export const Vertical: Story = {
  args: {
    steps: [
      { title: 'Step 1', description: 'Description for step 1' },
      { title: 'Step 2', description: 'Description for step 2' },
      { title: 'Step 3', description: 'Description for step 3' },
      { title: 'Step 4', description: 'Description for step 4' },
    ],
    currentStep: 1,
    orientation: 'vertical',
  },
};

export const CheckoutFlow: Story = {
  render: () => {
    const [step, setStep] = useState(0);
    const steps = [
      { title: 'Cart', description: 'Review items' },
      { title: 'Shipping', description: 'Enter address' },
      { title: 'Payment', description: 'Payment method' },
      { title: 'Confirm', description: 'Place order' },
    ];
    return (
      <div className="max-w-2xl mx-auto">
        <Stepper steps={steps} currentStep={step} />
        <div className="mt-8 p-6 border rounded-lg">
          {step === 0 && <p>Your shopping cart items...</p>}
          {step === 1 && <p>Enter shipping address...</p>}
          {step === 2 && <p>Select payment method...</p>}
          {step === 3 && <p>Review and confirm order...</p>}
        </div>
        <div className="flex justify-between mt-4">
          <button onClick={() => setStep(s => Math.max(0, s - 1))} className="px-4 py-2 border rounded-md" disabled={step === 0}>
            Back
          </button>
          <button onClick={() => setStep(s => Math.min(3, s + 1))} className="px-4 py-2 bg-primary-500 text-white rounded-md">
            {step === 3 ? 'Place Order' : 'Continue'}
          </button>
        </div>
      </div>
    );
  },
};
