import type { FC } from 'react';

import { Page } from '@components/page';
import { HomeContent } from '@features/home';

const HomePage: FC = () => {
  return (
    <Page title="Home">
      <HomeContent />
    </Page>
  );
};

export default HomePage;
