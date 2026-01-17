import { describe, expect, it, vi } from 'vitest';

import { screen, setupRender } from '@test';
import { Button } from './button';

describe('components/core/Button', () => {
  it('loads and displays', () => {
    setupRender(<Button>Click me</Button>);

    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
  });

  it('should render with primary variant by default', () => {
    setupRender(<Button>Primary</Button>);

    const button = screen.getByRole('button', { name: /primary/i });
    expect(button).toHaveClass('bg-primary-600');
  });

  it('should render with secondary variant', () => {
    setupRender(<Button variant="secondary">Secondary</Button>);

    const button = screen.getByRole('button', { name: /secondary/i });
    expect(button).toHaveClass('bg-neutral-100');
  });

  it('should render with outline variant', () => {
    setupRender(<Button variant="outline">Outline</Button>);

    const button = screen.getByRole('button', { name: /outline/i });
    expect(button).toHaveClass('bg-transparent');
    expect(button).toHaveClass('border-primary-500');
  });

  it('should render with ghost variant', () => {
    setupRender(<Button variant="ghost">Ghost</Button>);

    const button = screen.getByRole('button', { name: /ghost/i });
    expect(button).toHaveClass('bg-transparent');
    expect(button).toHaveClass('border-transparent');
  });

  it('should render with danger variant', () => {
    setupRender(<Button variant="danger">Danger</Button>);

    const button = screen.getByRole('button', { name: /danger/i });
    expect(button).toHaveClass('bg-error-600');
  });

  it('should render with small size', () => {
    setupRender(<Button size="sm">Small</Button>);

    const button = screen.getByRole('button', { name: /small/i });
    expect(button).toHaveClass('px-3');
    expect(button).toHaveClass('py-1.5');
  });

  it('should render with large size', () => {
    setupRender(<Button size="lg">Large</Button>);

    const button = screen.getByRole('button', { name: /large/i });
    expect(button).toHaveClass('px-6');
    expect(button).toHaveClass('py-3');
  });

  it('should render full width when fullWidth prop is true', () => {
    setupRender(<Button fullWidth>Full Width</Button>);

    const button = screen.getByRole('button', { name: /full width/i });
    expect(button).toHaveClass('w-full');
  });

  it('should be disabled when disabled prop is true', () => {
    setupRender(<Button disabled>Disabled</Button>);

    const button = screen.getByRole('button', { name: /disabled/i });
    expect(button).toBeDisabled();
  });

  it('should be disabled when isLoading prop is true', () => {
    setupRender(<Button isLoading>Loading</Button>);

    const button = screen.getByRole('button', { name: /loading/i });
    expect(button).toBeDisabled();
  });

  it('should show loading spinner when isLoading is true', () => {
    setupRender(<Button isLoading>Loading</Button>);

    const button = screen.getByRole('button', { name: /loading/i });
    const spinner = button.querySelector('svg');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('animate-spin');
  });

  it('should render left icon when provided', () => {
    const LeftIcon = () => <span data-testid="left-icon">+</span>;
    setupRender(<Button leftIcon={<LeftIcon />}>With Icon</Button>);

    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
  });

  it('should render right icon when provided', () => {
    const RightIcon = () => <span data-testid="right-icon">→</span>;
    setupRender(<Button rightIcon={<RightIcon />}>With Icon</Button>);

    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
  });

  it('should call onClick handler when clicked', async () => {
    const handleClick = vi.fn();
    const { user } = setupRender(<Button onClick={handleClick}>Click me</Button>);

    const button = screen.getByRole('button', { name: /click me/i });
    await user.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should not call onClick handler when disabled', async () => {
    const handleClick = vi.fn();
    const { user } = setupRender(
      <Button onClick={handleClick} disabled>
        Click me
      </Button>
    );

    const button = screen.getByRole('button', { name: /click me/i });
    await user.click(button);

    expect(handleClick).not.toHaveBeenCalled();
  });
});
