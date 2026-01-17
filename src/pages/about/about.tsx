import type { FC } from 'react';

import { Page } from '@components/page';
import { AboutContent } from '@features/about';

const AboutPage: FC = () => {
  return (
    <Page title="About">
      <AboutContent />
    </Page>
  );
};

export default AboutPage;
