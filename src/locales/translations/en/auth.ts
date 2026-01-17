import auth from '../../tokens/auth';

const authTranslation = {
  // Login
  [auth.login]: 'Login',
  [auth.loginTitle]: 'Welcome Back',
  [auth.loginSubtitle]: 'Sign in to your account',
  [auth.loginButton]: 'Sign In',
  [auth.loginSuccess]: 'Login successful',
  [auth.loginError]: 'Login failed',

  // Register
  [auth.register]: 'Register',
  [auth.registerTitle]: 'Create Account',
  [auth.registerSubtitle]: 'Sign up for a new account',
  [auth.registerButton]: 'Sign Up',
  [auth.registerSuccess]: 'Registration successful',
  [auth.registerError]: 'Registration failed',

  // Logout
  [auth.logout]: 'Logout',
  [auth.logoutConfirm]: 'Are you sure you want to logout?',

  // Password
  [auth.forgotPassword]: 'Forgot password?',
  [auth.resetPassword]: 'Reset Password',
  [auth.changePassword]: 'Change Password',
  [auth.confirmPassword]: 'Confirm Password',
  [auth.passwordMismatch]: 'Passwords do not match',

  // Form Fields
  [auth.firstName]: 'First Name',
  [auth.lastName]: 'Last Name',
  [auth.email]: 'Email',
  [auth.phoneOrUsername]: 'Phone number/Username',
  [auth.phoneOrUsernamePlaceholder]: 'Phone number/Username',
  [auth.password]: 'Password',
  [auth.passwordPlaceholder]: 'Password',
  [auth.rememberMe]: 'Remember me',

  // Errors
  [auth.invalidCredentials]: 'Invalid email or password',
  [auth.emailRequired]: 'Email is required',
  [auth.phoneOrUsernameRequired]: 'Phone number or username is required',
  [auth.passwordRequired]: 'Password is required',

  // Links
  [auth.noAccount]: "Don't have an account?",
  [auth.haveAccount]: 'Already have an account?',
  [auth.trackOrder]: 'Track your order',
  [auth.notRegisteredYet]: "Haven't registered yet?",
};

export default authTranslation;
