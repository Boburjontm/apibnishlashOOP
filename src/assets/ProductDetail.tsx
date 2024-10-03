import React from 'react';
import { ProductComponent } from './ProductComponent';

export const ProductDetailPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <ProductComponent productId={1} />
    </div>
  );
};
