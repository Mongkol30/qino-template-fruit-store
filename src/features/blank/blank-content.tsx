import type { FC } from 'react';

import { Card, Container, Text } from '@components/core';

const BlankContent: FC = () => {
  return (
    <Container size="xl" className="py-8">
      <Card variant="default">
        <Text color="muted">Blank page content</Text>
      </Card>
    </Container>
  );
};

export default BlankContent;
