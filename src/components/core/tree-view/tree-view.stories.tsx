import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import type { TreeNode } from './tree-view';
import { TreeView } from './tree-view';

const meta: Meta<typeof TreeView> = {
  title: 'Data Display/TreeView',
  component: TreeView,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultData: TreeNode[] = [
  {
    id: '1',
    label: 'Documents',
    children: [
      {
        id: '2',
        label: 'Images',
        children: [
          { id: '3', label: 'photo1.jpg' },
          { id: '4', label: 'photo2.jpg' },
        ],
      },
      {
        id: '5',
        label: 'PDFs',
        children: [{ id: '6', label: 'document.pdf' }],
      },
    ],
  },
  {
    id: '7',
    label: 'Downloads',
    children: [{ id: '8', label: 'file.zip' }],
  },
];

export const Default: Story = {
  args: {
    data: defaultData,
  },
};

export const WithIcons: Story = {
  args: {
    data: [
      {
        id: '1',
        label: 'Documents',
        icon: '📁',
        children: [
          {
            id: '2',
            label: 'Images',
            icon: '📁',
            children: [
              { id: '3', label: 'photo1.jpg', icon: '🖼️' },
              { id: '4', label: 'photo2.jpg', icon: '🖼️' },
            ],
          },
          {
            id: '5',
            label: 'PDFs',
            icon: '📁',
            children: [{ id: '6', label: 'document.pdf', icon: '📄' }],
          },
        ],
      },
      {
        id: '7',
        label: 'Downloads',
        icon: '📁',
        children: [{ id: '8', label: 'file.zip', icon: '📦' }],
      },
    ],
  },
};

export const Selectable: Story = {
  render: () => {
    const [selected, setSelected] = useState<string | null>(null);
    return (
      <div>
        <p className="mb-4 text-sm text-neutral-500">Selected: {selected || 'None'}</p>
        <TreeView
          data={[
            {
              id: '1',
              label: 'Root',
              children: [
                { id: '2', label: 'Child 1' },
                {
                  id: '3',
                  label: 'Child 2',
                  children: [
                    { id: '4', label: 'Grandchild 1' },
                    { id: '5', label: 'Grandchild 2' },
                  ],
                },
              ],
            },
          ]}
          selected={selected}
          onSelect={(id) => setSelected(id as string)}
        />
      </div>
    );
  },
};

export const DefaultExpanded: Story = {
  args: {
    data: [
      {
        id: '1',
        label: 'Expanded by default',
        children: [
          {
            id: '2',
            label: 'Also expanded',
            children: [{ id: '3', label: 'Leaf node' }],
          },
          {
            id: '4',
            label: 'Collapsed',
            children: [{ id: '5', label: 'Hidden' }],
          },
        ],
      },
    ],
    defaultExpanded: ['1', '2'],
  },
};

export const FileExplorer: Story = {
  render: () => (
    <div className="w-64 border rounded-lg p-2">
      <TreeView
        data={[
          {
            id: '1',
            label: 'src',
            icon: '📁',
            children: [
              {
                id: '2',
                label: 'components',
                icon: '📁',
                children: [
                  { id: '3', label: 'Button.tsx', icon: '📄' },
                  { id: '4', label: 'Input.tsx', icon: '📄' },
                  { id: '5', label: 'Modal.tsx', icon: '📄' },
                ],
              },
              {
                id: '6',
                label: 'hooks',
                icon: '📁',
                children: [
                  { id: '7', label: 'useAuth.ts', icon: '📄' },
                  { id: '8', label: 'useTheme.ts', icon: '📄' },
                ],
              },
              { id: '9', label: 'App.tsx', icon: '📄' },
              { id: '10', label: 'main.tsx', icon: '📄' },
            ],
          },
          { id: '11', label: 'package.json', icon: '📄' },
          { id: '12', label: 'tsconfig.json', icon: '📄' },
        ]}
      />
    </div>
  ),
};

export const MultiSelect: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>([]);
    return (
      <div>
        <p className="mb-4 text-sm text-neutral-500">
          Selected: {selected.length > 0 ? selected.join(', ') : 'None'}
        </p>
        <TreeView
          data={[
            {
              id: '1',
              label: 'All Items',
              children: [
                {
                  id: '2',
                  label: 'Category A',
                  children: [
                    { id: '3', label: 'Item A1' },
                    { id: '4', label: 'Item A2' },
                  ],
                },
                {
                  id: '5',
                  label: 'Category B',
                  children: [
                    { id: '6', label: 'Item B1' },
                    { id: '7', label: 'Item B2' },
                  ],
                },
              ],
            },
          ]}
          multiSelect
          selected={selected}
          onSelect={(ids) => setSelected(ids as string[])}
        />
      </div>
    );
  },
};
