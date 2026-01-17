import type { Meta, StoryObj } from '@storybook/react-vite';
import { OtpInput } from './otp-input';

const meta: Meta<typeof OtpInput> = {
  title: 'Form/OtpInput',
  component: OtpInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return (
      <OtpInput
        onChange={(otp) => console.log('OTP changed:', otp)}
        onComplete={(otp) => console.log('OTP complete:', otp)}
        length={6}
      />
    );
  },
};

export const FourDigits: Story = {
  render: () => {
    return (
      <OtpInput
        onChange={(otp) => console.log('OTP changed:', otp)}
        onComplete={(otp) => console.log('OTP complete:', otp)}
        length={4}
      />
    );
  },
};

export const WithLabel: Story = {
  render: () => {
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
          Enter verification code
        </label>
        <OtpInput
          onChange={(otp) => console.log('OTP changed:', otp)}
          onComplete={(otp) => console.log('OTP complete:', otp)}
          length={6}
        />
        <p className="text-sm text-neutral-500">We sent a code to your email</p>
      </div>
    );
  },
};

export const WithError: Story = {
  render: () => {
    return (
      <div className="space-y-2">
        <OtpInput
          onChange={(otp) => console.log('OTP changed:', otp)}
          length={6}
          error
        />
        <p className="text-sm text-error-500">Invalid code. Please try again.</p>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => <OtpInput onChange={() => {}} length={6} disabled />,
};

export const Masked: Story = {
  render: () => {
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
          Enter PIN
        </label>
        <OtpInput
          onChange={(otp) => console.log('PIN changed:', otp)}
          onComplete={(otp) => console.log('PIN complete:', otp)}
          length={4}
          masked
        />
      </div>
    );
  },
};

export const NoAutoFocus: Story = {
  render: () => {
    return (
      <OtpInput
        onChange={(otp) => console.log('OTP changed:', otp)}
        length={6}
        autoFocus={false}
      />
    );
  },
};
