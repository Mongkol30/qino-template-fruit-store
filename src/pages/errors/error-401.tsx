import type { FC } from 'react';

import { Page } from '@components/page';
import { Error401Content } from '@features/errors';

const Error401Page: FC = () => {
  return (
    <Page title="Error: Authorization Required">
      <Error401Content />
    </Page>
  );
};

export default Error401Page;
