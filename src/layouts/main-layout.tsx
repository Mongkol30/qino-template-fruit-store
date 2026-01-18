import type { FC } from 'react';

import { Column, Container, CustomScrollbar, Text } from '@components/core';
import { Navbar } from '@components/navbar';
import { Outlet } from 'react-router-dom';
import { Footer } from '@/components/footer';

const MainLayout: FC = () => {
  return (
    <CustomScrollbar maxHeight="100vh" autoHide={false} forceVisible="y">
      <Column className="min-h-screen bg-neutral-50 dark:bg-bg-dark">
      {/* Header */}
      <Navbar />

      {/* Main Content */}
      <main >
        <Container size="2xl" className="py-8">
          <Outlet />
        </Container>
      </main>

      {/* Footer */}
      <Footer />
      </Column>
    </CustomScrollbar>



  );
};

export default MainLayout;
