import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProductStore } from '../stores/productStore';
import { useCartStore } from '../stores/cartStore';
import { ProductCategory } from '../types';
import type { Product, Banner } from '../types';
import SearchBar from '../components/molecules/SearchBar';
import BannerCarousel from '../components/organisms/BannerCarousel';
import ProductSection from '../components/organisms/ProductSection';
import ProductCard from '../components/molecules/ProductCard';
import SkeletonBox from '../components/atoms/SkeletonBox';
import { useGlobalToast } from '../contexts/ToastContext';

const banners: Banner[] = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80',
    title: 'Fresh Vegetables',
    subtitle: 'Get Up To 40% OFF',
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=800&q=80',
    title: 'Daily Essentials',
    subtitle: 'Free Delivery on Orders $50+',
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=800&q=80',
    title: 'Weekend Special',
    subtitle: 'Buy 1 Get 1 Free',
  },
];


const HomePage = () => {
  const navigate = useNavigate();
  const { products, isLoading, fetchProducts } = useProductStore();
  const addItem = useCartStore((s) => s.addItem);
  const { showToast } = useGlobalToast();

  useEffect(() => {
    if (products.length === 0) {
      fetchProducts();
    }
  }, [products.length, fetchProducts]);

  const exclusiveOffers = useMemo(
    () => products.filter((p) => p.category === ProductCategory.FreshFruitsVegetable).slice(0, 8),
    [products]
  );

  const bestSelling = useMemo(
    () => products.filter((p) => p.reviewRating >= 4).slice(0, 8),
    [products]
  );

  const groceries = useMemo(
    () => products.filter((p) => p.category === ProductCategory.Pulses || p.category === ProductCategory.Rice).slice(0, 8),
    [products]
  );

  const [selectedGroceryCategory, setSelectedGroceryCategory] = useState<ProductCategory | null>(null);

  const filteredGroceries = useMemo(() => {
    if (!selectedGroceryCategory) return groceries;
    return products.filter((p) => p.category === selectedGroceryCategory).slice(0, 8);
  }, [products, groceries, selectedGroceryCategory]);

  const handleProductPress = (id: string) => navigate(`/product/${id}`);
  const handleAddToCart = (product: Product) => {
    addItem(product, 1);
    showToast(`${product.name} added to cart`, 'success');
  };

  return (
    <div className="px-4 py-6 space-y-8 lg:px-0 lg:py-8 lg:max-w-6xl lg:mx-auto">
      {/* Location header — hidden on desktop (top nav handles it) */}
      <div className="flex flex-col items-center gap-2 pt-2 lg:hidden">
        <svg width="40" height="50" viewBox="0 0 48 60" fill="none" aria-hidden="true">
          <path d="M24 58C24 58 8 40 8 26C8 17.163 15.163 10 24 10C32.837 10 40 17.163 40 26C40 40 24 58 24 58Z" fill="#F3603F"/>
          <path d="M18 18C18 18 16 24 17 30" stroke="#F7A593" strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M24 10C24 10 20 2 14 4C14 4 18 8 22 10" fill="#53B175"/>
          <path d="M24 10C24 10 24 1 30 2C30 2 28 7 24 10" fill="#53B175"/>
          <path d="M24 10C24 10 28 3 34 5C34 5 30 9 24 10" fill="#53B175"/>
        </svg>
        <div className="flex items-center gap-1">
          <svg width="15" height="18" viewBox="0 0 15 18" fill="none" aria-hidden="true">
            <path d="M7.5 0C3.36 0 0 3.36 0 7.5C0 13.13 7.5 18 7.5 18C7.5 18 15 13.13 15 7.5C15 3.36 11.64 0 7.5 0Z" fill="#4C4F4D"/>
            <circle cx="7.5" cy="7.5" r="2.5" fill="white"/>
          </svg>
          <p className="font-semibold text-[#4C4F4D]" style={{ fontSize: '18px', lineHeight: '22px' }}>
            Dhaka, Banassree
          </p>
        </div>
      </div>

      {/* Search bar */}
      <SearchBar value="" onChange={() => navigate('/search')} placeholder="Search Store" />

      {/* Banner carousel */}
      {isLoading ? (
        <SkeletonBox height="115px" rounded="rounded-[15px]" />
      ) : (
        <BannerCarousel banners={banners} />
      )}

      {/* Exclusive Offer section */}
      <ProductSection
        title="Exclusive Offer"
        products={exclusiveOffers}
        loading={isLoading}
        onSeeAll={() => navigate('/category/Fresh Fruits & Vegetable')}
        onAddToCart={handleAddToCart}
        onProductPress={handleProductPress}
        titleSize="24px"
      />

      {/* Best Selling section */}
      <ProductSection
        title="Best Selling"
        products={bestSelling}
        loading={isLoading}
        onSeeAll={() => navigate('/category/best-selling')}
        onAddToCart={handleAddToCart}
        onProductPress={handleProductPress}
        titleSize="24px"
      />

      {/* Groceries section */}
      <section aria-label="Groceries">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-[#030303]" style={{ fontSize: '24px', lineHeight: '29px' }}>Groceries</h2>
          <button onClick={() => navigate('/explore')} className="font-semibold text-[#53B175] cursor-pointer hover:underline bg-transparent border-none" style={{ fontSize: '16px', lineHeight: '20px' }}>
            See all
          </button>
        </div>

        {/* Category chips */}
        <div className="flex gap-3 mb-4 overflow-x-auto scrollbar-hide pb-1 lg:overflow-x-visible lg:flex-wrap">
          {[
            { cat: ProductCategory.Pulses, bg: '#F8A44C', label: 'Pulses', img: 'https://images.unsplash.com/photo-1515543904379-3d757afe72e4?w=150&q=80' },
            { cat: ProductCategory.Rice, bg: '#53B175', label: 'Rice', img: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=150&q=80' },
            { cat: ProductCategory.BakerySnacks, bg: '#D3B0E0', label: 'Bakery', img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=150&q=80' },
            { cat: ProductCategory.DairyEggs, bg: '#FFC107', label: 'Dairy', img: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=150&q=80' },
          ].map(({ cat, bg, label, img }) => {
            const isSelected = selectedGroceryCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedGroceryCategory(isSelected ? null : cat)}
                className="shrink-0 relative flex items-center rounded-[18px] cursor-pointer border-none overflow-hidden lg:flex-1"
                style={{ width: '248px', height: '105px' }}
                aria-pressed={isSelected}
              >
                <div className="absolute inset-0 rounded-[18px]" style={{ background: bg, opacity: isSelected ? 0.3 : 0.15 }} />
                <img src={img} alt={label} className="relative z-10 object-contain" style={{ width: '72px', height: '72px', marginLeft: '17px' }} />
                <span className="relative z-10 font-semibold text-[#3E423F]" style={{ fontSize: '20px', lineHeight: '25px', marginLeft: '16px' }}>{label}</span>
              </button>
            );
          })}
        </div>

        {/* Groceries product grid */}
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide lg:grid lg:grid-cols-4 lg:overflow-x-visible" role="list">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="shrink-0 w-[173px] lg:w-auto min-h-[249px] rounded-[18px] border border-[#E2E2E2] p-4 flex flex-col gap-3" role="listitem">
                  <SkeletonBox height="100px" rounded="rounded-lg" />
                  <SkeletonBox height="16px" width="80%" />
                  <SkeletonBox height="14px" width="50%" />
                  <div className="flex items-center justify-between mt-auto pt-3">
                    <SkeletonBox height="20px" width="60px" />
                    <SkeletonBox height="45px" width="45px" rounded="rounded-[17px]" />
                  </div>
                </div>
              ))
            : filteredGroceries.map((product) => (
                <div key={product.id} className="shrink-0 lg:shrink" role="listitem">
                  <ProductCard product={product} onAddToCart={handleAddToCart} onPress={handleProductPress} />
                </div>
              ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
