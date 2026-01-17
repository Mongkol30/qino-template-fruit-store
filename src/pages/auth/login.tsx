import type { FC } from 'react';

import { Page } from '@components/page';
import { LoginContent } from '@features/auth';

const LoginPage: FC = () => {
  return (
    <Page title="Login">
      <LoginContent />
    </Page>
  );
};

export default LoginPage;
