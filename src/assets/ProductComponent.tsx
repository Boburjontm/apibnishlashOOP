import React, { useEffect, useState } from 'react';
import { ProductService } from './ProductService';
import { Product } from './Product';

interface ProductComponentProps {
  productId: number;
}

export const ProductComponent: React.FC<ProductComponentProps> = ({ productId }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [seeMore, setSeeMore] = useState(false);
  const [loading, setLoading] = useState(true); // Yuklanayotgan holat
  const [error, setError] = useState<string | null>(null); // Xatolik holati

  const productService = new ProductService();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true); // Yuklash boshlanishi
        const data = await productService.getProduct(productId);
        setProduct(data);
      } catch (error) {
        setError('Failed to fetch product'); // Xatolik xabari
        console.error(error);
      } finally {
        setLoading(false); // Yuklash tugashi
      }
    };
    fetchProduct();
  }, [productId]);

  if (loading) return <div className="text-center">Loading...</div>; // Yuklanayotganda

  if (error) return <div className="text-red-500 text-center">{error}</div>; // Xatolik holati

  if (!product) return <div className="text-center">Product not found</div>; // Mahsulot topilmasa

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <img src={product.imageUrl} alt={product.name} className="w-full h-64 object-cover rounded-md mb-4" />
      <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
      <p className="text-gray-600">
        {seeMore ? product.description : `${product.description.substring(0, 100)}...`}
      </p>
      <p className="text-lg font-bold text-gray-900 mt-2">${product.price.toFixed(2)}</p>
      <button
        onClick={() => setSeeMore(!seeMore)}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
      >
        {seeMore ? 'See Less' : 'See More'}
      </button>
    </div>
  );
};
