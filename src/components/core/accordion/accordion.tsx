import type { ReactNode } from 'react';
import { createContext, useContext, useState } from 'react';

// Accordion Context
interface AccordionContextValue {
  expandedItems: string[];
  toggleItem: (key: string) => void;
  allowMultiple: boolean;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

function useAccordionContext() {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error('AccordionItem must be used within an Accordion');
  }
  return context;
}

// Accordion Props
export interface AccordionProps {
  /** Accordion children */
  children: ReactNode;
  /** Default expanded keys */
  defaultExpandedKeys?: string[];
  /** Allow multiple items expanded */
  allowMultiple?: boolean;
  /** Additional class name */
  className?: string;
}

export function Accordion({
  children,
  defaultExpandedKeys = [],
  allowMultiple = false,
  className = '',
}: AccordionProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>(defaultExpandedKeys);

  const toggleItem = (key: string) => {
    setExpandedItems((prev) => {
      if (prev.includes(key)) {
        return prev.filter((item) => item !== key);
      }
      return allowMultiple ? [...prev, key] : [key];
    });
  };

  return (
    <AccordionContext.Provider value={{ expandedItems, toggleItem, allowMultiple }}>
      <div className={`divide-y divide-neutral-200 dark:divide-neutral-700 border border-neutral-200 dark:border-neutral-700 rounded-lg overflow-hidden ${className}`}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

// AccordionItem Props
export interface AccordionItemProps {
  /** Unique key */
  itemKey: string;
  /** Item title */
  title: ReactNode;
  /** Item content */
  children: ReactNode;
  /** Icon */
  icon?: ReactNode;
  /** Disabled */
  disabled?: boolean;
}

export function AccordionItem({
  itemKey,
  title,
  children,
  icon,
  disabled = false,
}: AccordionItemProps) {
  const { expandedItems, toggleItem } = useAccordionContext();
  const isExpanded = expandedItems.includes(itemKey);

  return (
    <div>
      {/* Header */}
      <button
        type="button"
        onClick={() => !disabled && toggleItem(itemKey)}
        disabled={disabled}
        aria-expanded={isExpanded}
        className={`
          w-full flex items-center justify-between px-4 py-3
          text-left text-neutral-900 dark:text-white
          bg-white dark:bg-neutral-800
          hover:bg-neutral-50 dark:hover:bg-neutral-750
          transition-colors
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
      >
        <span className="flex items-center gap-2 font-medium">
          {icon && <span className="w-5 h-5">{icon}</span>}
          {title}
        </span>
        <svg
          className={`w-5 h-5 text-neutral-500 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>

      {/* Content */}
      <div
        className={`
          overflow-hidden transition-all duration-200
          ${isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}
        `}
      >
        <div className="px-4 py-3 text-neutral-600 dark:text-neutral-400 bg-neutral-50 dark:bg-neutral-900">
          {children}
        </div>
      </div>
    </div>
  );
}
