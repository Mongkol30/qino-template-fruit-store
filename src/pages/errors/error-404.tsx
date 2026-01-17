import type { FC } from 'react';

import { Page } from '@components/page';
import { Error404Content } from '@features/errors';

const Error404Page: FC = () => {
  return (
    <Page title="Error: Not Found">
      <Error404Content />
    </Page>
  );
};

export default Error404Page;
