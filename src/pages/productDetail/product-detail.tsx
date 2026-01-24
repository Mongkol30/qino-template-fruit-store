import type { FC } from 'react';

import { Page } from '@components/page';
import { ProductDetail } from '@/features/productDetail';

const ProductDetails: FC = () => {
  return (
    <Page title="Detail">
      <ProductDetail />
    </Page>
  );
};

export default ProductDetails;
