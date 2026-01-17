import type { Meta, StoryObj } from '@storybook/react-vite';
import { Image } from './image';

const meta: Meta<typeof Image> = {
  title: 'Core/Image',
  component: Image,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    fit: {
      control: 'select',
      options: ['contain', 'cover', 'fill', 'none', 'scale-down'],
    },
    radius: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'full'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: 'https://picsum.photos/400/300',
    alt: 'Sample image',
  },
};

export const Rounded: Story = {
  render: () => (
    <div className="flex gap-4">
      <Image src="https://picsum.photos/100/100" alt="None" radius="none" className="w-24 h-24" />
      <Image src="https://picsum.photos/100/100" alt="Small" radius="sm" className="w-24 h-24" />
      <Image src="https://picsum.photos/100/100" alt="Medium" radius="md" className="w-24 h-24" />
      <Image src="https://picsum.photos/100/100" alt="Large" radius="lg" className="w-24 h-24" />
      <Image src="https://picsum.photos/100/100" alt="Full" radius="full" className="w-24 h-24" />
    </div>
  ),
};

export const AspectRatios: Story = {
  render: () => (
    <div className="flex gap-4">
      <div className="w-32">
        <Image src="https://picsum.photos/200/200" alt="Square" aspectRatio="square" />
        <p className="text-center text-sm mt-1 text-neutral-500">Square</p>
      </div>
      <div className="w-48">
        <Image src="https://picsum.photos/400/225" alt="Video" aspectRatio="video" />
        <p className="text-center text-sm mt-1 text-neutral-500">Video (16:9)</p>
      </div>
      <div className="w-24">
        <Image src="https://picsum.photos/200/300" alt="Portrait" aspectRatio="portrait" />
        <p className="text-center text-sm mt-1 text-neutral-500">Portrait</p>
      </div>
    </div>
  ),
};

export const WithFallback: Story = {
  args: {
    src: 'https://invalid-url.com/image.jpg',
    alt: 'Fallback image',
    fallback: 'https://picsum.photos/200/200',
    className: 'w-48 h-32',
  },
};

export const ObjectFit: Story = {
  render: () => (
    <div className="flex gap-4">
      <div>
        <Image src="https://picsum.photos/200/300" alt="Cover" fit="cover" className="w-32 h-32" />
        <p className="text-center text-sm mt-1 text-neutral-500">Cover</p>
      </div>
      <div>
        <Image src="https://picsum.photos/200/300" alt="Contain" fit="contain" className="w-32 h-32 bg-neutral-100" />
        <p className="text-center text-sm mt-1 text-neutral-500">Contain</p>
      </div>
      <div>
        <Image src="https://picsum.photos/200/300" alt="Fill" fit="fill" className="w-32 h-32" />
        <p className="text-center text-sm mt-1 text-neutral-500">Fill</p>
      </div>
    </div>
  ),
};
