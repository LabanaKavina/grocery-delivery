import type { Product } from '../../types';
import ProductCard from '../molecules/ProductCard';
import SkeletonBox from '../atoms/SkeletonBox';

interface ProductSectionProps {
  title: string;
  products: Product[];
  onSeeAll: () => void;
  loading: boolean;
  onAddToCart: (product: Product) => void;
  onProductPress: (id: string) => void;
  titleSize?: string;
}

const SKELETON_COUNT = 4;

const ProductSection = ({
  title,
  products,
  onSeeAll,
  loading,
  onAddToCart,
  onProductPress,
  titleSize = '24px',
}: ProductSectionProps) => {
  return (
    <section aria-label={title}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-[#181725]" style={{ fontSize: titleSize, lineHeight: '29px' }}>{title}</h2>
        <button
          onClick={onSeeAll}
          className="font-semibold text-[#53B175] cursor-pointer hover:underline bg-transparent border-none"
          style={{ fontSize: '16px', lineHeight: '20px' }}
        >
          See all
        </button>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide lg:grid lg:grid-cols-4 lg:overflow-x-visible" role="list">
        {loading
          ? Array.from({ length: SKELETON_COUNT }).map((_, i) => (
              <div
                key={i}
                className="shrink-0 w-[173px] lg:w-auto min-h-[249px] rounded-[18px] border border-[#E2E2E2] p-4 flex flex-col gap-3"
                role="listitem"
              >
                <SkeletonBox height="100px" rounded="rounded-lg" />
                <SkeletonBox height="16px" width="80%" />
                <SkeletonBox height="14px" width="50%" />
                <div className="flex items-center justify-between mt-auto pt-3">
                  <SkeletonBox height="20px" width="60px" />
                  <SkeletonBox height="45px" width="45px" rounded="rounded-[17px]" />
                </div>
              </div>
            ))
          : products.map((product) => (
              <div key={product.id} className="shrink-0 lg:shrink" role="listitem">
                <ProductCard
                  product={product}
                  onAddToCart={onAddToCart}
                  onPress={onProductPress}
                />
              </div>
            ))}
      </div>
    </section>
  );
};

export default ProductSection;
