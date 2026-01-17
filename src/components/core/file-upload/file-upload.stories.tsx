import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { FileUpload } from './file-upload';

const meta: Meta<typeof FileUpload> = {
  title: 'Form/FileUpload',
  component: FileUpload,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [, setFiles] = useState<File[]>([]);
    return (
      <div className="w-96">
        <FileUpload onChange={setFiles} />
      </div>
    );
  },
};

export const SingleFile: Story = {
  render: () => {
    const [, setFiles] = useState<File[]>([]);
    return (
      <div className="w-96">
        <FileUpload
          onChange={setFiles}
          multiple={false}
          accept="image/*"
          helperText="Upload a profile picture"
        />
      </div>
    );
  },
};

export const WithAccept: Story = {
  render: () => {
    const [, setFiles] = useState<File[]>([]);
    return (
      <div className="w-96">
        <FileUpload
          onChange={setFiles}
          accept=".pdf,.doc,.docx"
          helperText="Only PDF and Word documents are allowed"
        />
      </div>
    );
  },
};

export const Required: Story = {
  render: () => {
    const [, setFiles] = useState<File[]>([]);
    return (
      <div className="w-96">
        <FileUpload onChange={setFiles} required />
      </div>
    );
  },
};

export const WithError: Story = {
  render: () => {
    const [, setFiles] = useState<File[]>([]);
    return (
      <div className="w-96">
        <FileUpload
          onChange={setFiles}
          error
          helperText="File size exceeds 5MB limit"
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="w-96">
      <FileUpload onChange={() => {}} disabled />
    </div>
  ),
};

export const WithMaxSize: Story = {
  render: () => {
    const [, setFiles] = useState<File[]>([]);
    return (
      <div className="w-96">
        <FileUpload
          onChange={setFiles}
          multiple
          maxSize={5 * 1024 * 1024}
          helperText="Max file size: 5MB"
        />
      </div>
    );
  },
};
