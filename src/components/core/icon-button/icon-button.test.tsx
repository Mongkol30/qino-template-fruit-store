import { describe, expect, it, vi } from 'vitest';

import { screen, setupRender } from '@test';
import { IconButton } from './icon-button';

const MockIcon = () => <span data-testid="mock-icon">★</span>;

describe('components/core/IconButton', () => {
  it('loads and displays', () => {
    setupRender(<IconButton icon={<MockIcon />} aria-label="Test button" />);

    const button = screen.getByRole('button', { name: /test button/i });
    expect(button).toBeInTheDocument();
  });

  it('should render the icon', () => {
    setupRender(<IconButton icon={<MockIcon />} aria-label="Test button" />);

    expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
  });

  it('should render with ghost variant by default', () => {
    setupRender(<IconButton icon={<MockIcon />} aria-label="Test button" />);

    const button = screen.getByRole('button', { name: /test button/i });
    expect(button).toHaveClass('bg-transparent');
  });

  it('should render with primary variant', () => {
    setupRender(
      <IconButton icon={<MockIcon />} variant="primary" aria-label="Test button" />
    );

    const button = screen.getByRole('button', { name: /test button/i });
    expect(button).toHaveClass('bg-[--color-primary]');
  });

  it('should render with danger variant', () => {
    setupRender(
      <IconButton icon={<MockIcon />} variant="danger" aria-label="Delete" />
    );

    const button = screen.getByRole('button', { name: /delete/i });
    expect(button).toHaveClass('bg-red-600');
  });

  it('should render with extra small size', () => {
    setupRender(
      <IconButton icon={<MockIcon />} size="xs" aria-label="Test button" />
    );

    const button = screen.getByRole('button', { name: /test button/i });
    expect(button).toHaveClass('p-1');
  });

  it('should render with large size', () => {
    setupRender(
      <IconButton icon={<MockIcon />} size="lg" aria-label="Test button" />
    );

    const button = screen.getByRole('button', { name: /test button/i });
    expect(button).toHaveClass('p-3');
  });

  it('should render rounded when rounded prop is true', () => {
    setupRender(
      <IconButton icon={<MockIcon />} rounded aria-label="Test button" />
    );

    const button = screen.getByRole('button', { name: /test button/i });
    expect(button).toHaveClass('rounded-full');
  });

  it('should render rounded-lg when rounded prop is false', () => {
    setupRender(
      <IconButton icon={<MockIcon />} rounded={false} aria-label="Test button" />
    );

    const button = screen.getByRole('button', { name: /test button/i });
    expect(button).toHaveClass('rounded-lg');
  });

  it('should be disabled when disabled prop is true', () => {
    setupRender(
      <IconButton icon={<MockIcon />} disabled aria-label="Test button" />
    );

    const button = screen.getByRole('button', { name: /test button/i });
    expect(button).toBeDisabled();
  });

  it('should be disabled when isLoading prop is true', () => {
    setupRender(
      <IconButton icon={<MockIcon />} isLoading aria-label="Loading" />
    );

    const button = screen.getByRole('button', { name: /loading/i });
    expect(button).toBeDisabled();
  });

  it('should show loading spinner when isLoading is true', () => {
    setupRender(
      <IconButton icon={<MockIcon />} isLoading aria-label="Loading" />
    );

    const button = screen.getByRole('button', { name: /loading/i });
    const spinner = button.querySelector('svg.animate-spin');
    expect(spinner).toBeInTheDocument();
  });

  it('should hide icon when isLoading is true', () => {
    setupRender(
      <IconButton icon={<MockIcon />} isLoading aria-label="Loading" />
    );

    expect(screen.queryByTestId('mock-icon')).not.toBeInTheDocument();
  });

  it('should call onClick handler when clicked', async () => {
    const handleClick = vi.fn();
    const { user } = setupRender(
      <IconButton icon={<MockIcon />} onClick={handleClick} aria-label="Test button" />
    );

    const button = screen.getByRole('button', { name: /test button/i });
    await user.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should not call onClick handler when disabled', async () => {
    const handleClick = vi.fn();
    const { user } = setupRender(
      <IconButton
        icon={<MockIcon />}
        onClick={handleClick}
        disabled
        aria-label="Test button"
      />
    );

    const button = screen.getByRole('button', { name: /test button/i });
    await user.click(button);

    expect(handleClick).not.toHaveBeenCalled();
  });
});
