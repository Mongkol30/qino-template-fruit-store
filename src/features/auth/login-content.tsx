import {
  Alert,
  Button,
  Card,
  Checkbox,
  Column,
  Container,
  Flex,
  Form,
  FormErrorMessage,
  FormItem,
  FormLabel,
  Heading,
  Row,
  Text,
  TextButton,
  TextField,
} from '@components/core';
import { tokens } from '@locales';
import { login } from '@slices/auth-slice';
import { useAppDispatch } from '@stores/hooks';
import { useFormik } from 'formik';
import type { FC } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
  initialLoginValues,
  loginSchema,
  type LoginFormValues,
} from './login-schema';

const LoginContent: FC = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values: LoginFormValues) => {
    setIsLoading(true);
    setError(null);
    try {
      // Mock API call - simulate authentication
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock validation: accept any email with password length >= 6
      if (values.password.length < 6) {
        throw new Error('Invalid credentials');
      }

      // Create mock user from email
      const mockUser = {
        id: crypto.randomUUID(),
        email: values.email,
        name: values.email.split('@')[0],
      };

      // Create mock token
      const mockToken = `mock-token-${crypto.randomUUID()}`;

      // Dispatch login action to update Redux state
      dispatch(login({ user: mockUser, token: mockToken }));

      // Navigate to dashboard after successful login
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: initialLoginValues,
    validationSchema: loginSchema,
    onSubmit: handleSubmit,
  });

  return (
    <Flex justify="center" align="center" className="min-h-[60vh] py-12">
      <Container size="sm" className="w-full max-w-md">
        <Card variant="elevated" padding="lg">
          {/* Header */}
          <Column align="center" gap="sm" className="mb-8">
            <Heading as="h1" size="2xl">
              {t(tokens.auth.loginTitle)}
            </Heading>
            <Text color="muted">{t(tokens.auth.loginSubtitle)}</Text>
          </Column>

          {/* Form */}
          <Form onSubmit={formik.handleSubmit} disabled={isLoading}>
            {/* Error Message */}
            {error && (
              <Alert variant="error">
                {error}
              </Alert>
            )}

            <FormItem error={!!(formik.touched.email && formik.errors.email)} required>
              <FormLabel>{t(tokens.auth.email)}</FormLabel>
              <TextField
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email ? formik.errors.email : undefined}
                fullWidth
              />
              <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
            </FormItem>

            <FormItem error={!!(formik.touched.password && formik.errors.password)} required>
              <FormLabel>{t(tokens.auth.password)}</FormLabel>
              <TextField
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password ? formik.errors.password : undefined}
                fullWidth
              />
              <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
            </FormItem>

            <Row justify="between" align="center">
              <Checkbox label={t(tokens.auth.rememberMe)} size="sm" />

              <TextButton
                size="sm"
                onClick={() => navigate('/forgot-password')}
              >
                {t(tokens.auth.forgotPassword)}
              </TextButton>
            </Row>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              isLoading={isLoading}
              disabled={isLoading || !formik.isValid}
            >
              {t(tokens.auth.loginButton)}
            </Button>
          </Form>

          {/* Footer */}
          <Row justify="center" align="center" gap="xs" className="mt-6">
            <Text size="sm" color="muted">
              {t(tokens.auth.noAccount)}
            </Text>
            <TextButton
              size="sm"
              onClick={() => navigate('/register')}
            >
              {t(tokens.auth.register)}
            </TextButton>
          </Row>
        </Card>
      </Container>
    </Flex>
  );
};

export default LoginContent;
