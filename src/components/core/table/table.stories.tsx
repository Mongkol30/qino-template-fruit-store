import type { Meta, StoryObj } from '@storybook/react-vite';
import { Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from './table';

const meta: Meta<typeof Table> = {
  title: 'Data Display/Table',
  component: Table,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell>Email</TableHeaderCell>
          <TableHeaderCell>Role</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>John Doe</TableCell>
          <TableCell>john@example.com</TableCell>
          <TableCell>Admin</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Jane Smith</TableCell>
          <TableCell>jane@example.com</TableCell>
          <TableCell>User</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const Striped: Story = {
  render: () => (
    <Table striped>
      <TableHeader>
        <TableRow>
          <TableHeaderCell>ID</TableHeaderCell>
          <TableHeaderCell>Product</TableHeaderCell>
          <TableHeaderCell>Price</TableHeaderCell>
          <TableHeaderCell>Stock</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[1, 2, 3, 4, 5].map(i => (
          <TableRow key={i}>
            <TableCell>{i}</TableCell>
            <TableCell>Product {i}</TableCell>
            <TableCell>${(i * 29.99).toFixed(2)}</TableCell>
            <TableCell>{i * 10}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

export const Bordered: Story = {
  render: () => (
    <Table bordered>
      <TableHeader>
        <TableRow>
          <TableHeaderCell>Header 1</TableHeaderCell>
          <TableHeaderCell>Header 2</TableHeaderCell>
          <TableHeaderCell>Header 3</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Cell 1</TableCell>
          <TableCell>Cell 2</TableCell>
          <TableCell>Cell 3</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Cell 4</TableCell>
          <TableCell>Cell 5</TableCell>
          <TableCell>Cell 6</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const Hoverable: Story = {
  render: () => (
    <Table hoverable>
      <TableHeader>
        <TableRow>
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell>Status</TableHeaderCell>
          <TableHeaderCell>Actions</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {['Alice', 'Bob', 'Charlie'].map(name => (
          <TableRow key={name}>
            <TableCell>{name}</TableCell>
            <TableCell>
              <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded text-sm">
                Active
              </span>
            </TableCell>
            <TableCell>
              <button className="text-primary-500 hover:underline">Edit</button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

export const Compact: Story = {
  render: () => (
    <Table compact>
      <TableHeader>
        <TableRow>
          <TableHeaderCell>Date</TableHeaderCell>
          <TableHeaderCell>Description</TableHeaderCell>
          <TableHeaderCell>Amount</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {['2024-01-15', '2024-01-14', '2024-01-13', '2024-01-12'].map((date, i) => (
          <TableRow key={date}>
            <TableCell>{date}</TableCell>
            <TableCell>Transaction {i + 1}</TableCell>
            <TableCell>${(Math.random() * 100).toFixed(2)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

export const Complete: Story = {
  render: () => (
    <Table striped hoverable bordered>
      <TableHeader>
        <TableRow>
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell>Email</TableHeaderCell>
          <TableHeaderCell>Date</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Alice</TableCell>
          <TableCell>alice@example.com</TableCell>
          <TableCell>2024-01-15</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Bob</TableCell>
          <TableCell>bob@example.com</TableCell>
          <TableCell>2024-01-14</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};
