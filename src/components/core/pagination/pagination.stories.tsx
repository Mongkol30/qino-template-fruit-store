import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Pagination } from './pagination';

const meta: Meta<typeof Pagination> = {
  title: 'Navigation/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    siblingCount: {
      control: { type: 'number', min: 0, max: 3 },
    },
    showFirstLast: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function DefaultPagination() {
    const [page, setPage] = useState(1);
    return (
      <Pagination currentPage={page} totalPages={10} onPageChange={setPage} />
    );
  },
};

export const ManyPages: Story = {
  render: function ManyPagesPagination() {
    const [page, setPage] = useState(1);
    return (
      <Pagination currentPage={page} totalPages={100} onPageChange={setPage} />
    );
  },
};

export const WithSiblings: Story = {
  render: function SiblingsPagination() {
    const [page, setPage] = useState(5);
    return (
      <div className="space-y-4">
        <div>
          <p className="text-sm text-neutral-500 mb-2">siblingCount: 1</p>
          <Pagination currentPage={page} totalPages={20} onPageChange={setPage} siblingCount={1} />
        </div>
        <div>
          <p className="text-sm text-neutral-500 mb-2">siblingCount: 2</p>
          <Pagination currentPage={page} totalPages={20} onPageChange={setPage} siblingCount={2} />
        </div>
      </div>
    );
  },
};

export const ShowFirstLast: Story = {
  render: function FirstLastPagination() {
    const [page, setPage] = useState(5);
    return (
      <Pagination
        currentPage={page}
        totalPages={20}
        onPageChange={setPage}
        showFirstLast
      />
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <Pagination currentPage={3} totalPages={10} onPageChange={() => {}} disabled />
  ),
};

export const FewPages: Story = {
  render: function FewPagesPagination() {
    const [page, setPage] = useState(1);
    return (
      <Pagination currentPage={page} totalPages={3} onPageChange={setPage} />
    );
  },
};

export const InContext: Story = {
  render: function ContextPagination() {
    const [page, setPage] = useState(1);
    const itemsPerPage = 10;
    const totalItems = 95;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    return (
      <div className="space-y-4">
        <div className="bg-neutral-50 dark:bg-neutral-800 p-4 rounded-lg">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Showing {(page - 1) * itemsPerPage + 1} to {Math.min(page * itemsPerPage, totalItems)} of {totalItems} results
          </p>
        </div>
        <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
    );
  },
};
