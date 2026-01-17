import type { FC, ReactNode } from 'react';
import { Container, Text } from '@components/core';

type FooterLink = {
  label: string;
  href: string;
};

type FooterSection = {
  title: string;
  links: FooterLink[];
};

type FooterProps = {
  brandName?: string;
  sections?: FooterSection[];
  bottomText?: ReactNode;
};

const defaultSections: FooterSection[] = [
  {
    title: 'ศูนย์ช่วยเหลือ',
    links: [
      { label: 'Help Centre', href: '#' },
      { label: 'สั่งซื้อสินค้ายังไง', href: '#' },
      { label: 'ยกเลิกสินค้า/คำสั่งซื้อ', href: '#' },
    ],
  },
  {
    title: 'เกี่ยวกับ Fruit For You',
    links: [
      { label: 'เกี่ยวกับเรา', href: '#' },
      { label: 'ร่วมงานกับเรา', href: '#' },
    ],
  },
  {
    title: 'ติดตามเรา',
    links: [
      { label: 'Facebook', href: '#' },
      { label: 'Instagram', href: '#' },
    ],
  },
];

const Footer: FC<FooterProps> = ({
  brandName = 'Fruit For You',
  sections = defaultSections,
  bottomText,
}) => {
  return (
    <footer className="bg-white border-t border-neutral-200 dark:bg-bg-dark dark:border-neutral-800">
      <Container size="xl">
        <div className="py-10">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            {sections.map((section) => (
              <div key={section.title}>
                <Text className="font-semibold text-neutral-900 dark:text-white">
                  {section.title}
                </Text>

                <div className="mt-4 space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                  {section.links.map((l) => (
                    <a
                      key={l.label}
                      href={l.href}
                      className="block hover:text-neutral-900 dark:hover:text-white transition-colors"
                    >
                      {l.label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 border-t border-neutral-200 dark:border-neutral-800 pt-6">
            {bottomText ?? (
              <Text size="sm" color="muted">
                © {new Date().getFullYear()} {brandName}. All Rights Reserved
              </Text>
            )}
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
