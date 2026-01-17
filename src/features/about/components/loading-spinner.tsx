import type { FC } from 'react';

import { LoadingSpinner as CoreLoadingSpinner, Row, Text } from '@components/core';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

const LoadingSpinner: FC<LoadingSpinnerProps> = ({
  message,
  size = 'md',
}) => {
  return (
    <Row justify="center" align="center" gap="sm" className="py-12">
      <CoreLoadingSpinner size={size} />
      {message && <Text color="muted">{message}</Text>}
    </Row>
  );
};

export default LoadingSpinner;
