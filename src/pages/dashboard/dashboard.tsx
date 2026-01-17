import type { FC } from 'react';

import { Page } from '@components/page';
import { DashboardContent } from '@features/dashboard';

const DashboardPage: FC = () => {
  return (
    <Page title="Dashboard">
      <DashboardContent />
    </Page>
  );
};

export default DashboardPage;
