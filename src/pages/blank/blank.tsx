import type { FC } from 'react';

import { Page } from '@components/page';
import { BlankContent } from '@features/blank';

const BlankPage: FC = () => {
  return (
    <Page title="Blank">
      <BlankContent />
    </Page>
  );
};

export default BlankPage;
