import type { HTMLAttributes, ReactNode } from 'react';
import { createContext, useCallback, useContext, useState } from 'react';

// ============ Types ============
export interface TreeNode {
  id: string;
  label: string;
  icon?: ReactNode;
  children?: TreeNode[];
  disabled?: boolean;
  data?: Record<string, unknown>;
}

// ============ Context ============
interface TreeViewContextValue {
  selected: string | string[] | null;
  expanded: string[];
  multiSelect: boolean;
  onSelect: (id: string) => void;
  onToggle: (id: string) => void;
}

const TreeViewContext = createContext<TreeViewContextValue | null>(null);

function useTreeViewContext() {
  const context = useContext(TreeViewContext);
  if (!context) {
    throw new Error('TreeNode must be used within TreeView');
  }
  return context;
}

// ============ TreeView ============
export interface TreeViewProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /** Tree data */
  data: TreeNode[];
  /** Selected node id(s) */
  selected?: string | string[] | null;
  /** On select callback */
  onSelect?: (id: string | string[] | null) => void;
  /** Default expanded node ids */
  defaultExpanded?: string[];
  /** Allow multiple selection */
  multiSelect?: boolean;
  /** Show lines connecting nodes */
  showLines?: boolean;
  /** Additional class name */
  className?: string;
}

export function TreeView({
  data,
  selected: controlledSelected,
  onSelect,
  defaultExpanded = [],
  multiSelect = false,
  showLines = false,
  className = '',
  ...props
}: TreeViewProps) {
  const [internalSelected, setInternalSelected] = useState<string | string[] | null>(
    multiSelect ? [] : null
  );
  const [expanded, setExpanded] = useState<string[]>(defaultExpanded);

  const selected = controlledSelected !== undefined ? controlledSelected : internalSelected;

  const handleSelect = useCallback(
    (id: string) => {
      if (multiSelect) {
        const currentSelected = (selected as string[]) || [];
        const newSelected = currentSelected.includes(id)
          ? currentSelected.filter((s) => s !== id)
          : [...currentSelected, id];
        setInternalSelected(newSelected);
        onSelect?.(newSelected);
      } else {
        const newSelected = selected === id ? null : id;
        setInternalSelected(newSelected);
        onSelect?.(newSelected);
      }
    },
    [multiSelect, selected, onSelect]
  );

  const handleToggle = useCallback((id: string) => {
    setExpanded((prev) => (prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]));
  }, []);

  return (
    <TreeViewContext.Provider
      value={{ selected, expanded, multiSelect, onSelect: handleSelect, onToggle: handleToggle }}
    >
      <div className={`text-sm ${className}`} role="tree" {...props}>
        {data.map((node) => (
          <TreeNodeItem key={node.id} node={node} level={0} showLines={showLines} />
        ))}
      </div>
    </TreeViewContext.Provider>
  );
}

// ============ TreeNodeItem ============
interface TreeNodeItemProps {
  node: TreeNode;
  level: number;
  showLines: boolean;
}

function TreeNodeItem({ node, level, showLines }: TreeNodeItemProps) {
  const { selected, expanded, multiSelect, onSelect, onToggle } = useTreeViewContext();
  const hasChildren = node.children && node.children.length > 0;
  const isExpanded = expanded.includes(node.id);
  const isSelected = multiSelect
    ? (selected as string[])?.includes(node.id)
    : selected === node.id;

  return (
    <div role="treeitem" aria-expanded={hasChildren ? isExpanded : undefined}>
      <div
        onClick={() => !node.disabled && onSelect(node.id)}
        className={`
          flex items-center gap-2 py-1.5 px-2 rounded cursor-pointer transition-colors
          ${node.disabled ? 'opacity-50 cursor-not-allowed' : ''}
          ${isSelected ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300' : ''}
          ${!isSelected && !node.disabled ? 'hover:bg-neutral-100 dark:hover:bg-neutral-800' : ''}
        `}
        style={{ paddingLeft: `${level * 20 + 8}px` }}
      >
        {/* Expand/Collapse button */}
        {hasChildren ? (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggle(node.id);
            }}
            className="p-0.5 rounded hover:bg-neutral-200 dark:hover:bg-neutral-700"
          >
            <svg
              className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        ) : (
          <span className="w-5" />
        )}

        {/* Icon */}
        {node.icon && <span className="w-4 h-4 flex-shrink-0">{node.icon}</span>}

        {/* Label */}
        <span className="flex-1 truncate">{node.label}</span>
      </div>

      {/* Children */}
      {hasChildren && isExpanded && (
        <div className={showLines ? 'border-l border-neutral-300 dark:border-neutral-600 ml-4' : ''}>
          {node.children!.map((child) => (
            <TreeNodeItem key={child.id} node={child} level={level + 1} showLines={showLines} />
          ))}
        </div>
      )}
    </div>
  );
}
