import aboutTranslation from './about';
import authTranslation from './auth';
import commonTranslation from './common';
import dashboardTranslation from './dashboard';
import errorsTranslation from './errors';
import homeTranslation from './home';
import navTranslation from './nav';

export const en = {
  ...commonTranslation,
  ...authTranslation,
  ...navTranslation,
  ...homeTranslation,
  ...dashboardTranslation,
  ...aboutTranslation,
  ...errorsTranslation,
};
