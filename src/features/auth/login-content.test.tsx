import i18n from 'i18next';
import { describe, expect, it } from 'vitest';

import { tokens } from '@locales';
import { setupRender, waitFor } from '@test';
import LoginContent from './login-content';

const t = i18n.t.bind(i18n);

describe('features/auth/LoginContent', () => {
  it('should render login form', () => {
    const { getByRole, getByPlaceholderText } = setupRender(<LoginContent />);

    const loginTitleText = t(tokens.auth.loginTitle);
    expect(
      getByRole('heading', { name: new RegExp(loginTitleText, 'i') })
    ).toBeInTheDocument();
    expect(getByPlaceholderText(/enter your email/i)).toBeInTheDocument();
    expect(getByPlaceholderText(/enter your password/i)).toBeInTheDocument();
    const loginButtonText = t(tokens.auth.loginButton);
    expect(
      getByRole('button', { name: new RegExp(loginButtonText, 'i') })
    ).toBeInTheDocument();
  });

  it('should render sign up button', () => {
    const { getByRole } = setupRender(<LoginContent />);

    const registerText = t(tokens.auth.register);
    const button = getByRole('button', { name: new RegExp(registerText, 'i') });
    expect(button).toBeInTheDocument();
  });

  it('should render forgot password button', () => {
    const { getByRole } = setupRender(<LoginContent />);

    const forgotPasswordText = t(tokens.auth.forgotPassword);
    const button = getByRole('button', { name: new RegExp(forgotPasswordText, 'i') });
    expect(button).toBeInTheDocument();
  });

  it('should show validation error for invalid email on blur', async () => {
    const { user, getByPlaceholderText } = setupRender(<LoginContent />);

    const emailInput = getByPlaceholderText(/enter your email/i);
    await user.type(emailInput, 'invalid-email');
    await user.tab();

    await waitFor(() => {
      const errorElement = document.getElementById('email-error');
      expect(errorElement?.textContent).toMatch(/invalid email/i);
    });
  });

  it('should show validation error for empty email on blur', async () => {
    const { user, getByPlaceholderText } = setupRender(<LoginContent />);

    const emailInput = getByPlaceholderText(/enter your email/i);
    await user.click(emailInput);
    await user.tab();

    await waitFor(() => {
      const errorElement = document.getElementById('email-error');
      expect(errorElement?.textContent).toMatch(/email is required/i);
    });
  });

  it('should show validation error for short password on blur', async () => {
    const { user, getByPlaceholderText } = setupRender(<LoginContent />);

    const passwordInput = getByPlaceholderText(/enter your password/i);
    await user.type(passwordInput, '123');
    await user.tab();

    await waitFor(() => {
      const errorElement = document.getElementById('password-error');
      expect(errorElement?.textContent).toMatch(/at least 6 characters/i);
    });
  });

  it('should show validation error for empty password on blur', async () => {
    const { user, getByPlaceholderText } = setupRender(<LoginContent />);

    const passwordInput = getByPlaceholderText(/enter your password/i);
    await user.click(passwordInput);
    await user.tab();

    await waitFor(() => {
      const errorElement = document.getElementById('password-error');
      expect(errorElement?.textContent).toMatch(/password is required/i);
    });
  });

  it('should submit form with valid data', async () => {
    const { user, getByPlaceholderText, getByRole } = setupRender(<LoginContent />);

    await user.type(getByPlaceholderText(/enter your email/i), 'test@example.com');
    await user.type(getByPlaceholderText(/enter your password/i), 'password123');

    const loginButtonText = t(tokens.auth.loginButton);
    const submitButton = getByRole('button', { name: new RegExp(loginButtonText, 'i') });
    expect(submitButton).not.toBeDisabled();
  });
});
