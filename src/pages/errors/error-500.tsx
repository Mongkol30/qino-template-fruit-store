import type { FC } from 'react';

import { Page } from '@components/page';
import { Error500Content } from '@features/errors';

const Error500Page: FC = () => {
  return (
    <Page title="Error: Server Error">
      <Error500Content />
    </Page>
  );
};

export default Error500Page;
