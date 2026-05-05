import type { Product } from '../../types';
import ProductCard from '../molecules/ProductCard';
import SkeletonBox from '../atoms/SkeletonBox';

interface ProductGridProps {
  products: Product[];
  loading: boolean;
  onProductPress: (id: string) => void;
  onAddToCart: (product: Product) => void;
}

const SKELETON_COUNT = 6;

const ProductGrid = ({ products, loading, onProductPress, onAddToCart }: ProductGridProps) => {
  if (loading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4" aria-busy="true" aria-label="Loading products">
        {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
          <div key={i} className="rounded-[18px] border border-[#E2E2E2] p-4 flex flex-col gap-3">
            <SkeletonBox height="100px" rounded="rounded-lg" />
            <SkeletonBox height="16px" width="80%" />
            <SkeletonBox height="14px" width="50%" />
            <div className="flex items-center justify-between mt-auto pt-3">
              <SkeletonBox height="20px" width="60px" />
              <SkeletonBox height="45px" width="45px" rounded="rounded-[17px]" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-[#7C7C7C] text-base">No products found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          onPress={onProductPress}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
