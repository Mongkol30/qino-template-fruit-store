import reactLogo from '@assets/react.svg';
import {
  Badge,
  Button,
  Card,
  Column,
  Container,
  Grid,
  Heading,
  Image,
  Row,
  Section,
  Text,
} from '@components/core';
import { tokens } from '@locales/index';
import { useAppSelector } from '@stores/index';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import viteLogo from '/vite.svg';

const techStack = [
  { name: 'React', version: '19.2.0' },
  { name: 'Vite', version: '7.3.1' },
  { name: 'TypeScript', version: '5.9.3' },
  { name: 'Tailwind CSS', version: '4.1.18' },
  { name: 'Redux Toolkit', version: '2.8.2' },
  { name: 'React Router', version: '7.12.0' },
  { name: 'Vitest', version: '3.2.4' },
  { name: 'Storybook', version: '10.0.2' },
];

const HomeContent: FC = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const features = [
    {
      title: t(tokens.home.react19),
      description: t(tokens.home.react19Desc),
      icon: '⚛️',
    },
    {
      title: t(tokens.home.vite7),
      description: t(tokens.home.vite7Desc),
      icon: '⚡',
    },
    {
      title: t(tokens.home.tailwindCss4),
      description: t(tokens.home.tailwindCss4Desc),
      icon: '🎨',
    },
    {
      title: t(tokens.home.typescript),
      description: t(tokens.home.typescriptDesc),
      icon: '📘',
    },
    {
      title: t(tokens.home.reduxToolkit),
      description: t(tokens.home.reduxToolkitDesc),
      icon: '🔄',
    },
    {
      title: t(tokens.home.dockerReady),
      description: t(tokens.home.dockerReadyDesc),
      icon: '🐳',
    },
  ];

  return (
    <Container size="xl" className="py-8">
      {/* Hero Section */}
      <Column align="center" className="mb-16 text-center">
        {/* Logos */}
        <Row gap="xl" justify="center" className="mb-8">
          <a
            href="https://vite.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform hover:scale-110"
          >
            <Image src={viteLogo} className="h-20 w-20" alt="Vite logo" />
          </a>
          <a
            href="https://react.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform hover:scale-110"
          >
            <Image
              src={reactLogo}
              fit="fill"
              className="h-20 w-20 animate-spin-slow"
              alt="React logo"
            />
          </a>
        </Row>

        {/* Title */}
        <Heading as="h1" size="4xl" color="gradient" className="mb-4">
          {t(tokens.home.title)}
        </Heading>
        <Text size="lg" color="muted" align="center" className="mb-6 max-w-2xl">
          {t(tokens.home.subtitle)}
        </Text>

        {/* CTA */}
        <Row gap="md" justify="center">
          {isAuthenticated ? (
            <Button variant="primary" size="lg" onClick={() => navigate('/dashboard')}>
              {t(tokens.home.goToDashboard)}
            </Button>
          ) : (
            <Button variant="primary" size="lg" onClick={() => navigate('/auth/login')}>
              {t(tokens.home.getStarted)}
            </Button>
          )}
          <Button
            variant="outline"
            size="lg"
            onClick={() => window.open('https://github.com', '_blank')}
          >
            {t(tokens.home.viewOnGithub)}
          </Button>
        </Row>
      </Column>

      {/* Features Grid */}
      <Section className="mb-16">
        <Heading as="h2" size="2xl" align="center" className="mb-8">
          {t(tokens.home.features)}
        </Heading>
        <Grid cols={1} colsMd={2} colsLg={3} gap="lg">
          {features.map((feature) => (
            <Card
              key={feature.title}
              variant="default"
              hoverable
              className="transition-all hover:border-primary-300 dark:hover:border-primary-500/50"
            >
              <span className="mb-4 block text-4xl">{feature.icon}</span>
              <Heading as="h3" size="lg" className="mb-2">
                {feature.title}
              </Heading>
              <Text color="muted">{feature.description}</Text>
            </Card>
          ))}
        </Grid>
      </Section>

      {/* Tech Stack */}
      <Section className="mb-16">
        <Heading as="h2" size="2xl" align="center" className="mb-8">
          {t(tokens.home.techStack)}
        </Heading>
        <Grid cols={1} colsSm={2} colsMd={4} gap="md">
          {techStack.map((tech) => (
            <Card key={tech.name} variant="default" padding="sm">
              <Row justify="between" align="center">
                <Text weight="medium">{tech.name}</Text>
                <Badge color="primary" variant="soft" pill>
                  v{tech.version}
                </Badge>
              </Row>
            </Card>
          ))}
        </Grid>
      </Section>

      {/* Getting Started */}
      <Card variant="elevated" className="mx-auto max-w-2xl text-center">
        <Heading as="h2" size="xl" className="mb-4">
          {t(tokens.home.gettingStarted)}
        </Heading>
        <Text color="muted" className="mb-6">
          {t(tokens.home.gettingStartedDesc)}
        </Text>
        <div className="mb-4 overflow-x-auto rounded-lg bg-neutral-900 p-4 text-left dark:bg-neutral-950">
          <code className="text-sm text-primary-400">
            git clone https://github.com/your-repo/qino-template.git
            <br />
            cd qino-template
            <br />
            npm install
            <br />
            npm run dev
          </code>
        </div>
        {!isAuthenticated && (
          <Row justify="center" align="center" gap="xs">
            <Button variant="ghost" size="sm" onClick={() => navigate('/auth/login')}>
              {t(tokens.auth.login)}
            </Button>
            <Text size="sm" color="muted">
              {t(tokens.home.loginToAccess)}
            </Text>
          </Row>
        )}
      </Card>
    </Container>
  );
};

export default HomeContent;
