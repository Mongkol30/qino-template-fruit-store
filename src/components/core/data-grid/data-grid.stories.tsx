import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { DataGrid, type DataGridColumn } from './data-grid';

const meta: Meta<typeof DataGrid> = {
  title: 'Data Display/DataGrid',
  component: DataGrid,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

type User = Record<string, unknown> & {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
};

const sampleData: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'Inactive' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Editor', status: 'Active' },
  { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'User', status: 'Pending' },
];

const columns: DataGridColumn<User>[] = [
  { key: 'id', header: 'ID', width: 60 },
  { key: 'name', header: 'Name' },
  { key: 'email', header: 'Email' },
  { key: 'role', header: 'Role' },
  { key: 'status', header: 'Status' },
];

export const Default: Story = {
  render: () => (
    <DataGrid data={sampleData} columns={columns} rowKey="id" />
  ),
};

export const WithSelection: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>([]);
    return (
      <div>
        <p className="mb-4">Selected: {selected.join(', ') || 'None'}</p>
        <DataGrid
          data={sampleData}
          columns={columns}
          rowKey="id"
          selectable
          selected={selected}
          onSelect={setSelected}
        />
      </div>
    );
  },
};

export const Sortable: Story = {
  render: () => {
    const sortableColumns: DataGridColumn<User>[] = columns.map(col => ({
      ...col,
      sortable: true,
    }));
    return (
      <DataGrid
        data={sampleData}
        columns={sortableColumns}
        rowKey="id"
        sortable
      />
    );
  },
};

export const CustomCellRenderer: Story = {
  render: () => {
    const customColumns: DataGridColumn<User>[] = [
      { key: 'id', header: 'ID', width: 60 },
      { key: 'name', header: 'Name' },
      { key: 'email', header: 'Email' },
      { key: 'role', header: 'Role' },
      {
        key: 'status',
        header: 'Status',
        render: (value, _row, _index) => (
          <span className={`px-2 py-1 rounded text-xs ${
            value === 'Active' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' :
            value === 'Inactive' ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300' :
            'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
          }`}>
            {String(value)}
          </span>
        )
      },
    ];
    return <DataGrid data={sampleData} columns={customColumns} rowKey="id" />;
  },
};

export const Loading: Story = {
  render: () => (
    <DataGrid data={[]} columns={columns} rowKey="id" loading />
  ),
};

export const Empty: Story = {
  render: () => (
    <DataGrid
      data={[]}
      columns={columns}
      rowKey="id"
      emptyContent={<p className="text-neutral-500">No data available</p>}
    />
  ),
};

export const Striped: Story = {
  render: () => (
    <DataGrid data={sampleData} columns={columns} rowKey="id" striped />
  ),
};

export const Hoverable: Story = {
  render: () => (
    <DataGrid data={sampleData} columns={columns} rowKey="id" hoverable />
  ),
};

export const Compact: Story = {
  render: () => (
    <DataGrid data={sampleData} columns={columns} rowKey="id" compact />
  ),
};

export const Bordered: Story = {
  render: () => (
    <DataGrid data={sampleData} columns={columns} rowKey="id" bordered />
  ),
};

export const AllFeatures: Story = {
  render: () => (
    <DataGrid
      data={sampleData}
      columns={columns}
      rowKey="id"
      striped
      hoverable
      bordered
    />
  ),
};
