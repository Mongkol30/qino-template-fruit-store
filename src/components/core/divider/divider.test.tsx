import { describe, expect, it } from 'vitest';

import { screen, setupRender } from '@test';
import { Divider } from './divider';

describe('components/core/Divider', () => {
  it('loads and displays', () => {
    setupRender(<Divider />);

    const divider = screen.getByRole('separator');
    expect(divider).toBeInTheDocument();
  });

  it('should render horizontal orientation by default', () => {
    setupRender(<Divider />);

    const divider = screen.getByRole('separator');
    expect(divider).toHaveAttribute('aria-orientation', 'horizontal');
  });

  it('should render vertical orientation when specified', () => {
    setupRender(<Divider orientation="vertical" />);

    const divider = screen.getByRole('separator');
    expect(divider).toHaveAttribute('aria-orientation', 'vertical');
  });

  it('should render with solid variant by default', () => {
    setupRender(<Divider />);

    const divider = screen.getByRole('separator');
    expect(divider).toHaveClass('border-solid');
  });

  it('should render with dashed variant', () => {
    setupRender(<Divider variant="dashed" />);

    const divider = screen.getByRole('separator');
    expect(divider).toHaveClass('border-dashed');
  });

  it('should render with dotted variant', () => {
    setupRender(<Divider variant="dotted" />);

    const divider = screen.getByRole('separator');
    expect(divider).toHaveClass('border-dotted');
  });

  it('should render with children text', () => {
    setupRender(<Divider>OR</Divider>);

    expect(screen.getByText('OR')).toBeInTheDocument();
  });

  it('should render with small spacing', () => {
    setupRender(<Divider spacing="sm" />);

    const divider = screen.getByRole('separator');
    expect(divider).toHaveClass('my-2');
  });

  it('should render with medium spacing by default', () => {
    setupRender(<Divider />);

    const divider = screen.getByRole('separator');
    expect(divider).toHaveClass('my-4');
  });

  it('should render with large spacing', () => {
    setupRender(<Divider spacing="lg" />);

    const divider = screen.getByRole('separator');
    expect(divider).toHaveClass('my-6');
  });

  it('should render with custom color', () => {
    setupRender(<Divider color="border-purple-500" />);

    const divider = screen.getByRole('separator');
    expect(divider).toHaveClass('border-purple-500');
  });

  it('should apply custom className', () => {
    setupRender(<Divider className="custom-class" />);

    const divider = screen.getByRole('separator');
    expect(divider).toHaveClass('custom-class');
  });

  it('should render vertical divider with correct classes', () => {
    setupRender(<Divider orientation="vertical" />);

    const divider = screen.getByRole('separator');
    expect(divider).toHaveClass('border-l');
    expect(divider).toHaveClass('mx-4');
  });
});
