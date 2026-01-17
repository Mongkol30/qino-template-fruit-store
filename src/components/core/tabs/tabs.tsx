import type { ReactNode } from 'react';
import { useState } from 'react';

export interface TabItem {
  /** Tab key */
  key: string;
  /** Tab label */
  label: ReactNode;
  /** Tab content */
  content: ReactNode;
  /** Tab icon */
  icon?: ReactNode;
  /** Disabled */
  disabled?: boolean;
}

export interface TabsProps {
  /** Tab items */
  items: TabItem[];
  /** Default active tab key */
  defaultActiveKey?: string;
  /** Controlled active key */
  activeKey?: string;
  /** On tab change */
  onChange?: (key: string) => void;
  /** Tab variant */
  variant?: 'line' | 'pills' | 'enclosed';
  /** Full width tabs */
  fullWidth?: boolean;
  /** Additional class name */
  className?: string;
}

const variantStyles = {
  line: {
    list: 'border-b border-neutral-200 dark:border-neutral-700',
    tab: (active: boolean) =>
      `px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
        active
          ? 'border-primary-600 text-primary-600 dark:text-primary-400'
          : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300 dark:text-neutral-400 dark:hover:text-neutral-300'
      }`,
  },
  pills: {
    list: 'gap-2',
    tab: (active: boolean) =>
      `px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
        active
          ? 'bg-primary-600 text-white'
          : 'text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800'
      }`,
  },
  enclosed: {
    list: 'border-b border-neutral-200 dark:border-neutral-700',
    tab: (active: boolean) =>
      `px-4 py-2 text-sm font-medium border border-b-0 rounded-t-lg -mb-px transition-colors ${
        active
          ? 'bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white'
          : 'bg-neutral-50 dark:bg-neutral-900 border-transparent text-neutral-500 hover:text-neutral-700 dark:text-neutral-400'
      }`,
  },
};

export function Tabs({
  items,
  defaultActiveKey,
  activeKey: controlledActiveKey,
  onChange,
  variant = 'line',
  fullWidth = false,
  className = '',
}: TabsProps) {
  const [uncontrolledActiveKey, setUncontrolledActiveKey] = useState(
    defaultActiveKey || items[0]?.key
  );

  const isControlled = controlledActiveKey !== undefined;
  const activeKey = isControlled ? controlledActiveKey : uncontrolledActiveKey;

  const handleTabClick = (key: string) => {
    if (!isControlled) {
      setUncontrolledActiveKey(key);
    }
    onChange?.(key);
  };

  const activeContent = items.find((item) => item.key === activeKey)?.content;

  return (
    <div className={className}>
      {/* Tab List */}
      <div
        role="tablist"
        className={`flex ${fullWidth ? 'w-full' : ''} ${variantStyles[variant].list}`}
      >
        {items.map((item) => (
          <button
            key={item.key}
            role="tab"
            aria-selected={activeKey === item.key}
            aria-disabled={item.disabled}
            disabled={item.disabled}
            onClick={() => !item.disabled && handleTabClick(item.key)}
            className={`
              ${variantStyles[variant].tab(activeKey === item.key)}
              ${fullWidth ? 'flex-1' : ''}
              ${item.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              inline-flex items-center justify-center gap-2
            `.trim()}
          >
            {item.icon && <span>{item.icon}</span>}
            {item.label}
          </button>
        ))}
      </div>

      {/* Tab Panel */}
      <div role="tabpanel" className="pt-4">
        {activeContent}
      </div>
    </div>
  );
}

// Single Tab component for composition
export interface TabProps {
  /** Tab label */
  children: ReactNode;
  /** Tab icon */
  icon?: ReactNode;
  /** Disabled */
  disabled?: boolean;
}

export function Tab({ children }: TabProps) {
  return <>{children}</>;
}
