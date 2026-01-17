import type { FC } from 'react';

import { Pagination as CorePagination, Row, Text } from '@components/core';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPrevPage: () => void;
  onNextPage: () => void;
  isLoading?: boolean;
}

const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  isLoading = false,
}) => {
  return (
    <Row
      justify="between"
      align="center"
      wrap
      gap="md"
      className="mt-6"
    >
      <Text size="sm" color="muted">
        Page {currentPage} of {totalPages}
      </Text>

      <CorePagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        disabled={isLoading}
        siblingCount={1}
        showFirstLast={false}
      />
    </Row>
  );
};

export default Pagination;
