import type { FC } from 'react';

import { Button, Column, Container, Heading, Image, Text } from '@components/core';
import { tokens } from '@locales/index';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const Error500Content: FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Container size="md" className="min-h-[60vh] py-20">
      <Column align="center" justify="center" gap="lg" className="h-full">
        <Image
          alt="Internal server error"
          src="/assets/errors/error-500.png"
          className="h-auto max-w-full w-[400px]"
        />

        <Heading as="h1" size="2xl" align="center">
          {t(tokens.errors.error500Title)}
        </Heading>

        <Text color="muted" align="center" className="max-w-md">
          {t(tokens.errors.error500Message)}
        </Text>

        <Button variant="outline" onClick={() => navigate('/')}>
          {t(tokens.errors.backToHome)}
        </Button>
      </Column>
    </Container>
  );
};

export default Error500Content;
