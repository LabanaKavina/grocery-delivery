import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProductStore } from '../stores/productStore';
import { useCartStore } from '../stores/cartStore';
import { useFavoritesStore } from '../stores/favoritesStore';
import { formatCurrency } from '../utils/formatCurrency';
import SkeletonBox from '../components/atoms/SkeletonBox';
import { useGlobalToast } from '../contexts/ToastContext';

const StarRatingInline = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-1">
    {[1, 2, 3, 4, 5].map((s) => (
      <svg key={s} width="16" height="16" viewBox="0 0 16 16" fill={s <= Math.round(rating) ? '#F3603F' : 'none'} aria-hidden="true">
        <path d="M8 1.5l1.8 4.8H15l-4.1 3 1.6 4.8L8 11.3l-4.5 2.8 1.6-4.8L1 6.3h5.2z" stroke="#F3603F" strokeWidth="0.8"/>
      </svg>
    ))}
  </div>
);

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, isLoading, fetchProducts, getProductById } = useProductStore();
  const addItem = useCartStore((s) => s.addItem);
  const { toggleFavorite, isFavorite } = useFavoritesStore();
  const { showToast } = useGlobalToast();

  const [quantity, setQuantity] = useState(1);
  const [detailExpanded, setDetailExpanded] = useState(true);
  const [nutritionExpanded, setNutritionExpanded] = useState(false);

  useEffect(() => {
    if (products.length === 0) fetchProducts();
  }, [products.length, fetchProducts]);

  const product = getProductById(id ?? '');
  const favorite = product ? isFavorite(product.id) : false;
  const [currentSlide, setCurrentSlide] = useState(0);

  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToBasket = () => {
    if (!product) return;
    addItem(product, quantity);
    showToast(`${product.name} added to cart`, 'success');
    setAddedToCart(true);
  };

  if (isLoading || !product) {
    return (
      <div className="min-h-screen bg-white">
        <div className="bg-[#F2F3F2] rounded-b-[25px] h-[371px] flex items-center justify-center">
          <SkeletonBox height="200px" width="200px" rounded="rounded-lg" />
        </div>
        <div className="px-6 pt-6 space-y-4">
          <SkeletonBox height="28px" width="60%" />
          <SkeletonBox height="18px" width="40%" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row lg:max-w-5xl lg:mx-auto lg:pt-10 lg:gap-16 lg:px-8 lg:pb-12">

      {/* ── Left column (desktop: back button + image | mobile: image only) ── */}
      <div className="lg:w-[420px] lg:shrink-0 lg:self-start lg:sticky lg:top-8 lg:flex lg:flex-col lg:gap-4">

        {/* Back button — desktop only */}
        <button
          onClick={() => navigate(-1)}
          className="hidden lg:flex items-center gap-2 bg-transparent border-none cursor-pointer p-0 text-[#181725]"
          aria-label="Go back"
        >
          <svg width="10" height="18" viewBox="0 0 10 18" fill="none" aria-hidden="true">
            <path d="M9 1L1 9l8 8" stroke="#181725" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="font-medium" style={{ fontSize: '14px' }}>Back</span>
        </button>

        {/* Image area */}
        <div
          className="bg-[#F2F3F2] rounded-b-[25px] relative overflow-hidden lg:rounded-[25px] lg:h-[420px]"
          style={{ height: '371px', flexShrink: 0 }}
          onTouchStart={(e) => {
            const touch = e.touches[0];
            if (!touch) return;
            e.currentTarget.dataset.startX = String(touch.clientX);
          }}
          onTouchEnd={(e) => {
            const touch = e.changedTouches[0];
            if (!touch) return;
            const startX = Number(e.currentTarget.dataset.startX ?? 0);
            const diff = startX - touch.clientX;
            if (Math.abs(diff) > 40) {
              if (diff > 0) setCurrentSlide((s) => Math.min(s + 1, 2));
              else setCurrentSlide((s) => Math.max(s - 1, 0));
            }
          }}
        >
          {/* Back arrow — mobile only */}
          <button
            onClick={() => navigate(-1)}
            className="absolute z-10 bg-transparent border-none cursor-pointer p-2 lg:hidden"
            style={{ left: '16px', top: '56px' }}
            aria-label="Go back"
          >
            <svg width="10" height="18" viewBox="0 0 10 18" fill="none" aria-hidden="true">
              <path d="M9 1L1 9l8 8" stroke="#181725" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Share icon — mobile only */}
          <button
            onClick={() => navigate('/cart')}
            className="absolute z-10 bg-transparent border-none cursor-pointer p-2 lg:hidden"
            style={{ right: '16px', top: '56px' }}
            aria-label="Go to cart"
          >
            <svg width="20" height="22" viewBox="0 0 20 22" fill="none" aria-hidden="true">
              <path d="M10 1v14M5 5L10 1l5 4M1 17v3a1 1 0 001 1h16a1 1 0 001-1v-3" stroke="#181725" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Sliding images */}
          <div
            className="flex h-full transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)`, width: '300%' }}
          >
            {[1, 0.9, 1.05].map((scale, i) => (
              <div key={i} className="flex items-center justify-center" style={{ width: '33.333%', height: '100%' }}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="object-contain transition-transform duration-300"
                  style={{ maxHeight: '240px', maxWidth: '280px', transform: `scale(${scale})` }}
                />
              </div>
            ))}
          </div>

          {/* Carousel dots */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2">
            {[0, 1, 2].map((i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className="border-none cursor-pointer p-0"
                style={{
                  width: i === currentSlide ? '16px' : '3px',
                  height: '3px',
                  borderRadius: '13px',
                  background: i === currentSlide ? '#53B175' : '#B3B3B3',
                  transition: 'all 0.3s',
                }}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="flex flex-col flex-1 px-6 pt-5 pb-28 lg:pb-8 lg:px-0">

        {/* Name + favorite */}
        <div className="flex items-start justify-between mb-1">
          <h1 className="font-bold text-[#181725]" style={{ fontSize: '24px', lineHeight: '29px', letterSpacing: '0.1px' }}>
            {product.name}
          </h1>
          <button
            onClick={() => toggleFavorite(product)}
            className="bg-transparent border-none cursor-pointer p-1 mt-1"
            aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <svg width="22" height="20" viewBox="0 0 24 22" fill={favorite ? '#F3603F' : 'none'} aria-hidden="true">
              <path d="M20.84 3.61a5.5 5.5 0 00-7.78 0L12 4.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 20.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
                stroke={favorite ? '#F3603F' : '#7C7C7C'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Weight */}
        <p className="font-semibold text-[#7C7C7C] mb-5" style={{ fontSize: '16px', lineHeight: '18px' }}>
          {product.weight}
        </p>

        {/* Quantity + Price */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center" style={{ width: '119.67px', height: '45.67px' }}>
            <button
              onClick={() => setQuantity((q) => (q > 1 ? q - 1 : 1))}
              className="flex items-center justify-center bg-transparent border-none cursor-pointer"
              style={{ width: '25px', height: '45.67px' }}
              aria-label="Decrease quantity"
            >
              <svg width="14" height="2" viewBox="0 0 14 2" fill="none" aria-hidden="true">
                <path d="M1 1h12" stroke="#B3B3B3" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
            <div className="flex items-center justify-center" style={{ width: '45.67px', height: '45.67px', border: '1px solid #E2E2E2', borderRadius: '17px' }}>
              <span className="font-semibold text-[#181725]" style={{ fontSize: '18px', lineHeight: '18px' }}>{quantity}</span>
            </div>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="flex items-center justify-center bg-transparent border-none cursor-pointer"
              style={{ width: '25px', height: '45.67px', marginLeft: '4px' }}
              aria-label="Increase quantity"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M7 1v12M1 7h12" stroke="#53B175" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
          <span className="font-bold text-[#181725]" style={{ fontSize: '24px', lineHeight: '18px', letterSpacing: '0.1px' }}>
            ${formatCurrency(product.price)}
          </span>
        </div>

        {/* Divider */}
        <div className="bg-[#E2E2E2]" style={{ height: '1px' }} />

        {/* Product Detail accordion */}
        <button
          onClick={() => setDetailExpanded(!detailExpanded)}
          className="flex items-center justify-between w-full bg-transparent border-none cursor-pointer py-4"
          aria-expanded={detailExpanded}
        >
          <span className="font-semibold text-[#181725]" style={{ fontSize: '16px' }}>Product Detail</span>
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none" aria-hidden="true"
            className={`transition-transform duration-300 ${detailExpanded ? '' : 'rotate-180'}`}>
            <path d="M1 7l5-5 5 5" stroke="#181725" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <div className="overflow-hidden transition-all duration-300" style={{ maxHeight: detailExpanded ? '300px' : '0' }}>
          <p className="text-[#7C7C7C] pb-4" style={{ fontSize: '13px', lineHeight: '21px' }}>{product.description}</p>
        </div>

        {/* Divider */}
        <div className="bg-[#E2E2E2]" style={{ height: '1px' }} />

        {/* Nutritions */}
        <button
          onClick={() => setNutritionExpanded(!nutritionExpanded)}
          className="flex items-center justify-between w-full bg-transparent border-none cursor-pointer py-4"
          aria-expanded={nutritionExpanded}
        >
          <span className="font-semibold text-[#181725]" style={{ fontSize: '16px' }}>Nutritions</span>
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center rounded-[5px] bg-[#EBEBEB] px-2" style={{ height: '18px' }}>
              <span className="font-semibold text-[#7C7C7C]" style={{ fontSize: '9px' }}>{product.nutritions}</span>
            </div>
            <svg width="8" height="12" viewBox="0 0 8 12" fill="none" aria-hidden="true"
              className={`transition-transform duration-300 ${nutritionExpanded ? 'rotate-90' : ''}`}>
              <path d="M1 1l5 5-5 5" stroke="#181725" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </button>
        <div className="overflow-hidden transition-all duration-300" style={{ maxHeight: nutritionExpanded ? '200px' : '0' }}>
          <p className="text-[#7C7C7C] pb-4" style={{ fontSize: '13px', lineHeight: '21px' }}>Per serving: {product.nutritions}</p>
        </div>

        {/* Divider */}
        <div className="bg-[#E2E2E2]" style={{ height: '1px' }} />

        {/* Review */}
        <div className="flex items-center justify-between py-4">
          <span className="font-semibold text-[#181725]" style={{ fontSize: '16px' }}>Review</span>
          <div className="flex items-center gap-2">
            <StarRatingInline rating={product.reviewRating} />
            <svg width="8" height="12" viewBox="0 0 8 12" fill="none" aria-hidden="true">
              <path d="M1 1l5 5-5 5" stroke="#181725" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* Add To Basket — fixed on mobile, inline on desktop */}
        <div className="fixed bottom-0 left-0 right-0 px-6 pb-6 bg-white lg:static lg:px-0 lg:pb-0 lg:pt-8 lg:bg-transparent">
          {addedToCart ? (
            <button
              onClick={() => navigate('/cart')}
              className="w-full border-none cursor-pointer font-semibold text-[#53B175]"
              style={{ height: '67px', background: 'white', borderRadius: '19px', fontSize: '18px', border: '2px solid #53B175' }}
            >
              Go to Cart
            </button>
          ) : (
            <button
              onClick={handleAddToBasket}
              className="w-full border-none cursor-pointer font-semibold text-[#FFF9FF]"
              style={{ height: '67px', background: '#53B175', borderRadius: '19px', fontSize: '18px' }}
            >
              Add To Basket
            </button>
          )}
        </div>

      </div>

    </div>
  );
};

export default ProductDetailPage;
