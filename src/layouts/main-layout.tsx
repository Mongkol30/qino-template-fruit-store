import type { FC } from 'react';

import { Column, Container, CustomScrollbar, Text } from '@components/core';
import { Navbar } from '@components/navbar';
import { Outlet } from 'react-router-dom';

const MainLayout: FC = () => {
  return (
    <CustomScrollbar maxHeight="100vh" autoHide={false} forceVisible="y">
      <Column className="min-h-screen bg-neutral-50 dark:bg-bg-dark">
      {/* Header */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1">
        <Container size="xl" className="py-8">
          <Outlet />
        </Container>
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-200 bg-neutral-50 py-6 dark:border-neutral-800 dark:bg-neutral-900/50">
        <Container size="xl">
          <Text align="center" color="muted">
            © {new Date().getFullYear()} Qino Template. Built with React + Vite
            + Tailwind.
          </Text>
        </Container>
      </footer>
      </Column>
    </CustomScrollbar>
  );
};

export default MainLayout;
