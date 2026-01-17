import type { FC } from 'react';

import { Card, Column, Container, Grid, Heading, Row, Stack, Statistic, Text } from '@components/core';
import { tokens } from '@locales/index';
import { useAppSelector } from '@stores/index';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const DashboardContent: FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const statsData = [
    {
      label: t(tokens.dashboard.totalViews),
      value: '12,345',
      change: 12,
      changeType: 'positive' as const,
    },
    {
      label: t(tokens.dashboard.activeUsers),
      value: '1,234',
      change: 5,
      changeType: 'positive' as const,
    },
    {
      label: t(tokens.dashboard.conversionRate),
      value: '3.2%',
      change: 2,
      changeType: 'negative' as const,
    },
    {
      label: t(tokens.dashboard.revenue),
      value: '$45,678',
      change: 8,
      changeType: 'positive' as const,
    },
  ];

  const quickLinks = [
    {
      title: t(tokens.dashboard.apiIntegration),
      description: t(tokens.dashboard.apiIntegrationDesc),
      path: '/about',
      icon: '🔗',
    },
    {
      title: t(tokens.dashboard.blankPage),
      description: t(tokens.dashboard.blankPageDesc),
      path: '/blank',
      icon: '📄',
    },
  ];

  const recentActivities = [
    { action: t(tokens.dashboard.userLoggedIn), time: t(tokens.dashboard.minutesAgo, { count: 2 }), icon: '👤' },
    { action: t(tokens.dashboard.apiRequestCompleted), time: t(tokens.dashboard.minutesAgo, { count: 5 }), icon: '✅' },
    { action: t(tokens.dashboard.settingsUpdated), time: t(tokens.dashboard.minutesAgo, { count: 10 }), icon: '⚙️' },
    { action: t(tokens.dashboard.newDataSynced), time: t(tokens.dashboard.hourAgo), icon: '🔄' },
  ];

  return (
    <Container size="xl" className="py-8">
      <Heading as="h1" size="2xl" className="mb-6">
        {t(tokens.dashboard.title)}
      </Heading>

      {/* Welcome Card */}
      <Card
        variant="elevated"
        className="mb-8 border border-primary-100 bg-gradient-to-r from-primary-50 via-secondary-50 to-pink-50 dark:border-primary-900/50 dark:from-primary-950/50 dark:via-secondary-950/50 dark:to-pink-950/50"
      >
        <Heading as="h2" size="lg" className="mb-2">
          {t(tokens.dashboard.welcomeBack)}{user?.name ? `, ${user.name}` : ''}! 👋
        </Heading>
        <Text color="muted">
          {t(tokens.dashboard.accountToday)}
        </Text>
      </Card>

      {/* Stats Grid */}
      <Grid cols={1} colsSm={2} colsLg={4} gap="lg" className="mb-8">
        {statsData.map((stat) => (
          <Card key={stat.label} variant="default">
            <Statistic
              label={stat.label}
              value={stat.value}
              trend={{
                value: stat.change,
                direction: stat.changeType === 'positive' ? 'up' : 'down',
              }}
            />
          </Card>
        ))}
      </Grid>

      <Grid cols={1} colsLg={2} gap="xl">
        {/* Quick Links */}
        <Column gap="md">
          <Heading as="h2" size="lg">
            {t(tokens.dashboard.quickLinks)}
          </Heading>
          <Stack spacing="md">
            {quickLinks.map((link) => (
              <Card
                key={link.path}
                variant="default"
                hoverable
                clickable
                className="cursor-pointer transition-all hover:border-primary-300 dark:hover:border-primary-500"
                onClick={() => navigate(link.path)}
              >
                <Row gap="md" align="start">
                  <span className="text-2xl">{link.icon}</span>
                  <Column gap="xs">
                    <Heading as="h3" size="sm">
                      {link.title}
                    </Heading>
                    <Text size="sm" color="muted">
                      {link.description}
                    </Text>
                  </Column>
                </Row>
              </Card>
            ))}
          </Stack>
        </Column>

        {/* Recent Activity */}
        <Column gap="md">
          <Heading as="h2" size="lg">
            {t(tokens.dashboard.recentActivity)}
          </Heading>
          <Card variant="default" padding="none">
            {recentActivities.map((activity, index) => (
              <Row
                key={index}
                gap="md"
                align="center"
                className={`p-4 ${
                  index !== recentActivities.length - 1
                    ? 'border-b border-neutral-100 dark:border-neutral-700'
                    : ''
                }`}
              >
                <span className="text-xl">{activity.icon}</span>
                <Column gap="none" className="flex-1">
                  <Text>{activity.action}</Text>
                  <Text size="sm" color="muted">
                    {activity.time}
                  </Text>
                </Column>
              </Row>
            ))}
          </Card>
        </Column>
      </Grid>

      {/* User Info Card */}
      {user && (
        <Card variant="default" className="mt-8">
          <Heading as="h2" size="lg" className="mb-4">
            {t(tokens.dashboard.accountInfo)}
          </Heading>
          <Grid cols={1} colsSm={3} gap="md">
            <Column gap="xs">
              <Text size="sm" color="muted">
                {t(tokens.common.name)}
              </Text>
              <Text weight="medium">{user.name}</Text>
            </Column>
            <Column gap="xs">
              <Text size="sm" color="muted">
                {t(tokens.common.email)}
              </Text>
              <Text weight="medium">{user.email}</Text>
            </Column>
            <Column gap="xs">
              <Text size="sm" color="muted">
                {t(tokens.dashboard.userId)}
              </Text>
              <Text as="span" size="sm" className="font-mono">
                {user.id}
              </Text>
            </Column>
          </Grid>
        </Card>
      )}
    </Container>
  );
};

export default DashboardContent;
