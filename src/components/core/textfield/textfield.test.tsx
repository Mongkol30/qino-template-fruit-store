import { describe, expect, it, vi } from 'vitest';

import { screen, setupRender } from '@test';
import { TextField } from './textfield';

describe('components/core/TextField', () => {
  it('loads and displays', () => {
    setupRender(<TextField aria-label="username" />);

    const input = screen.getByRole('textbox', { name: /username/i });
    expect(input).toBeInTheDocument();
  });

  it('should render with label', () => {
    setupRender(<TextField label="Email" />);

    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('should render with placeholder', () => {
    setupRender(<TextField placeholder="Enter your email" aria-label="email" />);

    const input = screen.getByPlaceholderText('Enter your email');
    expect(input).toBeInTheDocument();
  });

  it('should render with helper text', () => {
    setupRender(
      <TextField label="Username" helperText="This will be your display name" />
    );

    expect(screen.getByText('This will be your display name')).toBeInTheDocument();
  });

  it('should render with error message', () => {
    setupRender(
      <TextField label="Password" error="Password is required" />
    );

    expect(screen.getByText('Password is required')).toBeInTheDocument();
  });

  it('should not render helper text when error is present', () => {
    setupRender(
      <TextField
        label="Password"
        helperText="Enter a strong password"
        error="Password is required"
      />
    );

    expect(screen.getByText('Password is required')).toBeInTheDocument();
    expect(screen.queryByText('Enter a strong password')).not.toBeInTheDocument();
  });

  it('should render required indicator when required prop is true', () => {
    setupRender(<TextField label="Email" required />);

    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('should be disabled when disabled prop is true', () => {
    setupRender(<TextField label="Email" disabled />);

    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
  });

  it('should render with small size', () => {
    setupRender(<TextField label="Email" size="sm" />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('px-3');
    expect(input).toHaveClass('py-1.5');
  });

  it('should render with large size', () => {
    setupRender(<TextField label="Email" size="lg" />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('px-4');
    expect(input).toHaveClass('py-3');
  });

  it('should render full width when fullWidth prop is true', () => {
    setupRender(<TextField label="Email" fullWidth />);

    const wrapper = screen.getByRole('textbox').parentElement?.parentElement;
    expect(wrapper).toHaveClass('w-full');
  });

  it('should render left addon when provided', () => {
    const LeftAddon = () => <span data-testid="left-addon">@</span>;
    setupRender(<TextField label="Email" leftAddon={<LeftAddon />} />);

    expect(screen.getByTestId('left-addon')).toBeInTheDocument();
  });

  it('should render right addon when provided', () => {
    const RightAddon = () => <span data-testid="right-addon">✓</span>;
    setupRender(<TextField label="Email" rightAddon={<RightAddon />} />);

    expect(screen.getByTestId('right-addon')).toBeInTheDocument();
  });

  it('should have aria-invalid when error is present', () => {
    setupRender(<TextField label="Email" error="Invalid email" />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('should call onChange handler when value changes', async () => {
    const handleChange = vi.fn();
    const { user } = setupRender(
      <TextField label="Email" onChange={handleChange} />
    );

    const input = screen.getByRole('textbox');
    await user.type(input, 'test@example.com');

    expect(handleChange).toHaveBeenCalled();
  });

  it('should update value when typing', async () => {
    const { user } = setupRender(<TextField label="Email" />);

    const input = screen.getByRole('textbox');
    await user.type(input, 'hello');

    expect(input).toHaveValue('hello');
  });

  it('should call onBlur handler when focus is lost', async () => {
    const handleBlur = vi.fn();
    const { user } = setupRender(
      <TextField label="Email" onBlur={handleBlur} />
    );

    const input = screen.getByRole('textbox');
    await user.click(input);
    await user.tab();

    expect(handleBlur).toHaveBeenCalledTimes(1);
  });
});
