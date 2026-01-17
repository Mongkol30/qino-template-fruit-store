import type { FC } from 'react';

import { Column, CustomScrollbar, Flex, Text } from '@components/core';
import { Navbar } from '@components/navbar';
import { Outlet } from 'react-router-dom';

/**
 * AuthLayout - Layout for authentication pages with navbar
 */
const AuthLayout: FC = () => {
  return (
    <CustomScrollbar maxHeight="100vh" autoHide={false} forceVisible="y">
      <Column className="min-h-screen bg-gradient-to-br from-bg-light via-primary-50/20 to-secondary-50/20 dark:from-bg-dark dark:via-bg-dark dark:to-neutral-900">
      {/* Header */}
      <Navbar />

      {/* Main Content */}
      <Flex justify="center" align="center" className="flex-1 px-4">
        <Outlet />
      </Flex>

      {/* Footer */}
      <footer className="border-t border-neutral-200/50 py-4 dark:border-neutral-800">
        <Text size="sm" align="center" color="muted">
          © {new Date().getFullYear()} Qino Template. All rights reserved.
        </Text>
      </footer>
      </Column>
    </CustomScrollbar>
  );
};

export default AuthLayout;
