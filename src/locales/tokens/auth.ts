// Auth tokens (Type-safe translation keys)
const auth = {
  // Login
  login: 'auth.login',
  loginTitle: 'auth.loginTitle',
  loginSubtitle: 'auth.loginSubtitle',
  loginButton: 'auth.loginButton',
  loginSuccess: 'auth.loginSuccess',
  loginError: 'auth.loginError',

  // Register
  register: 'auth.register',
  registerTitle: 'auth.registerTitle',
  registerSubtitle: 'auth.registerSubtitle',
  registerButton: 'auth.registerButton',
  registerSuccess: 'auth.registerSuccess',
  registerError: 'auth.registerError',

  // Logout
  logout: 'auth.logout',
  logoutConfirm: 'auth.logoutConfirm',

  // Password
  forgotPassword: 'auth.forgotPassword',
  resetPassword: 'auth.resetPassword',
  changePassword: 'auth.changePassword',
  confirmPassword: 'auth.confirmPassword',
  passwordMismatch: 'auth.passwordMismatch',

  // Form Fields
  firstName: 'auth.firstName',
  lastName: 'auth.lastName',
  email: 'auth.email',
  password: 'auth.password',
  rememberMe: 'auth.rememberMe',

  // Errors
  invalidCredentials: 'auth.invalidCredentials',
  emailRequired: 'auth.emailRequired',
  passwordRequired: 'auth.passwordRequired',

  // Links
  noAccount: 'auth.noAccount',
  haveAccount: 'auth.haveAccount',
} as const;

export default auth;
