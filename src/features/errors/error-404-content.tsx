import type { FC } from 'react';

import { Button, Column, Container, Heading, Image, Text } from '@components/core';
import { tokens } from '@locales/index';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Error404Content: FC = () => {
  const { t } = useTranslation();

  return (
    <Container size="md" className="min-h-[60vh] py-20">
      <Column align="center" justify="center" gap="lg" className="h-full">
        <Image
          alt="Not found"
          src="/assets/errors/error-404.png"
          className="h-auto max-w-full w-[400px]"
        />

        <Heading as="h1" size="2xl" align="center">
          {t(tokens.errors.error404Title)}
        </Heading>

        <Text color="muted" align="center" className="max-w-md">
          {t(tokens.errors.error404Message)}
        </Text>

        <Link to="/">
          <Button variant="outline">{t(tokens.errors.backToHome)}</Button>
        </Link>
      </Column>
    </Container>
  );
};

export default Error404Content;
