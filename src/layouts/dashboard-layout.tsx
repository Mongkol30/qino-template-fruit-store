import type { FC } from 'react';

import { Column, Container, CustomScrollbar, Text } from '@components/core';
import { Navbar } from '@components/navbar';
import { Outlet } from 'react-router-dom';

/**
 * DashboardLayout - Layout for authenticated dashboard pages
 */
const DashboardLayout: FC = () => {
  return (
    <CustomScrollbar maxHeight="100vh" autoHide={false} forceVisible="y">
      <Column className="min-h-screen bg-bg-light dark:bg-bg-dark">
      {/* Header */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-200 bg-neutral-50 py-6 dark:border-neutral-800 dark:bg-neutral-900/50">
        <Container size="xl">
          <Text size="sm" align="center" color="muted">
            © {new Date().getFullYear()} Qino Template. All rights reserved.
          </Text>
        </Container>
      </footer>
      </Column>
    </CustomScrollbar>
  );
};

export default DashboardLayout;
