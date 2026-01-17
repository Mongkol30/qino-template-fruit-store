import type { FC } from 'react';

import { IconButton, Menu, type MenuItemProps } from '@components/core';
import { supportedLanguages, type LanguageCode } from '@locales/i18n';
import { useTranslation } from 'react-i18next';

interface LanguageSwitcherProps {
  /** Alignment */
  align?: 'left' | 'right' | 'auto';
  /** Additional class names */
  className?: string;
}

// Globe icon component
const GlobeIcon: FC = () => (
  <svg
    className="h-full w-full"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
    />
  </svg>
);

const LanguageSwitcher: FC<LanguageSwitcherProps> = ({
  align = 'auto',
  className = '',
}) => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language as LanguageCode;

  const currentLang = supportedLanguages.find(
    (lang) => lang.code === currentLanguage
  ) || supportedLanguages[0];

  const menuItems: MenuItemProps[] = supportedLanguages.map((lang) => ({
    label: (
      <span className="flex items-center gap-2">
        <span>{lang.flag}</span>
        <span>{lang.name}</span>
        {currentLanguage === lang.code && (
          <svg
            className="ml-auto h-4 w-4 text-primary-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </span>
    ),
    icon: undefined,
    onClick: () => i18n.changeLanguage(lang.code),
  }));

  return (
    <Menu
      trigger={
        <IconButton
          icon={<GlobeIcon />}
          variant="ghost"
          size="sm"
          aria-label={`Language: ${currentLang.name}`}
        />
      }
      items={menuItems}
      align={align}
      className={className}
    />
  );
};

export default LanguageSwitcher;
