import { useState, useMemo, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductCategory } from '../types';
import type { Product, FilterState } from '../types';
import { useProductStore } from '../stores/productStore';
import { useCartStore } from '../stores/cartStore';
import { useGlobalToast } from '../contexts/ToastContext';
import useDebounce from '../hooks/useDebounce';
import ProductGrid from '../components/organisms/ProductGrid';
import FilterSheet from '../components/organisms/FilterSheet';

const categories = [
  { category: ProductCategory.FreshFruitsVegetable, label: 'Fresh Fruits\n& Vegetable', bg: 'rgba(83,177,117,0.1)', border: 'rgba(83,177,117,0.7)', img: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=200&q=80' },
  { category: ProductCategory.CookingOilGhee, label: 'Cooking Oil\n& Ghee', bg: 'rgba(248,164,76,0.1)', border: 'rgba(248,164,76,0.7)', img: 'https://images.unsplash.com/photo-1620706857370-e1b9770e8bb1?w=200&q=80' },
  { category: ProductCategory.MeatFish, label: 'Meat & Fish', bg: 'rgba(247,165,147,0.25)', border: '#F7A593', img: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=200&q=80' },
  { category: ProductCategory.BakerySnacks, label: 'Bakery &\nSnacks', bg: 'rgba(211,176,224,0.25)', border: '#D3B0E0', img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200&q=80' },
  { category: ProductCategory.DairyEggs, label: 'Dairy & Eggs', bg: 'rgba(253,229,152,0.25)', border: '#FDE598', img: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=200&q=80' },
  { category: ProductCategory.Beverages, label: 'Beverages', bg: 'rgba(183,223,245,0.25)', border: '#B7DFF5', img: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=200&q=80' },
  { category: ProductCategory.Pulses, label: 'Pulses', bg: 'rgba(215,59,119,0.15)', border: 'rgba(215,59,119,0.5)', img: 'https://images.unsplash.com/photo-1515543904379-3d757afe72e4?w=200&q=80' },
  { category: ProductCategory.Rice, label: 'Rice', bg: 'rgba(131,106,246,0.15)', border: 'rgba(131,106,246,0.5)', img: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200&q=80' },
];

const ExplorePage = () => {
  const navigate = useNavigate();
  const { products, isLoading, fetchProducts, searchProducts } = useProductStore();
  const addItem = useCartStore((s) => s.addItem);
  const { showToast } = useGlobalToast();

  const [query, setQuery] = useState('');
  const [filterVisible, setFilterVisible] = useState(false);
  const [filters, setFilters] = useState<FilterState>({ categories: [], brands: [] });
  const inputRef = useRef<HTMLInputElement>(null);
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (products.length === 0) fetchProducts();
  }, [products.length, fetchProducts]);

  const searchResults = useMemo(() => {
    const hasQuery = debouncedQuery.trim().length > 0;
    const hasFilters = filters.categories.length > 0 || filters.brands.length > 0;

    // Start with search results or all products
    let results = hasQuery ? searchProducts(debouncedQuery) : products;

    // Apply filters if any are set
    if (hasFilters) {
      results = results.filter((p) => {
        const catMatch = filters.categories.length === 0 || filters.categories.includes(p.category);
        const brandMatch = filters.brands.length === 0 || filters.brands.includes(p.brand);
        return catMatch && brandMatch;
      });
    }

    return hasQuery || hasFilters ? results : [];
  }, [debouncedQuery, searchProducts, filters, products]);

  const allCategories = useMemo(() => [...new Set(products.map((p) => p.category))], [products]);
  const allBrands = useMemo(() => [...new Set(products.map((p) => p.brand))], [products]);

  const handleAddToCart = (product: Product) => {
    addItem(product, 1);
    showToast(`${product.name} added to cart`, 'success');
  };

  const isSearching = debouncedQuery.trim().length > 0 || filters.categories.length > 0 || filters.brands.length > 0;

  return (
    <div className="min-h-screen bg-white pb-24 lg:pb-0">

      {/* "Find Products" title — only shown when not searching */}
      {!isSearching && (
        <h1 className="text-center font-bold text-[#181725] pt-14 pb-0 lg:pt-8" style={{ fontSize: '20px', lineHeight: '18px' }}>
          Find Products
        </h1>
      )}

      {/* Search bar row */}
      <div className="flex items-center gap-3 px-6 mt-6 lg:max-w-2xl lg:mx-auto">
        <div
          className="flex items-center gap-3 flex-1"
          style={{ height: '51.57px', background: '#F2F3F2', borderRadius: '15px', padding: '0 16px' }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <circle cx="8" cy="8" r="6" stroke="#181B19" strokeWidth="1.5"/>
            <path d="M13 13l3 3" stroke="#181B19" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Store"
            className="flex-1 bg-transparent border-none outline-none font-semibold text-[#181B19]"
            style={{ fontSize: '14px', lineHeight: '17px' }}
            aria-label="Search products"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="flex items-center justify-center border-none cursor-pointer rounded-full"
              style={{ width: '16px', height: '16px', background: '#C5C5C5', padding: 0 }}
              aria-label="Clear search"
            >
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true">
                <path d="M1 1l6 6M7 1 1 7" stroke="white" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
            </button>
          )}
        </div>

        {/* Filter icon */}
        <button
          onClick={() => setFilterVisible(true)}
          className="bg-transparent border-none cursor-pointer p-1 shrink-0"
          aria-label="Open filters"
        >
          <svg width="17" height="18" viewBox="0 0 17 18" fill="none" aria-hidden="true">
            <circle cx="4.5" cy="5" r="2.5" stroke="#181725" strokeWidth="1.5"/>
            <line x1="0" y1="5" x2="2" y2="5" stroke="#181725" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="7" y1="5" x2="17" y2="5" stroke="#181725" strokeWidth="1.5" strokeLinecap="round"/>
            <circle cx="12.5" cy="13" r="2.5" stroke="#181725" strokeWidth="1.5"/>
            <line x1="0" y1="13" x2="10" y2="13" stroke="#181725" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="15" y1="13" x2="17" y2="13" stroke="#181725" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* Search results */}
      {isSearching ? (
        <div className="px-4 mt-4 lg:max-w-7xl lg:mx-auto lg:px-8">
          {searchResults.length === 0 && !isLoading ? (
            <div className="flex items-center justify-center py-16">
              <p className="text-[#7C7C7C]" style={{ fontSize: '14px' }}>No results for "{debouncedQuery}"</p>
            </div>
          ) : (
            <ProductGrid
              products={searchResults}
              loading={isLoading}
              onProductPress={(id) => navigate(`/product/${id}`)}
              onAddToCart={handleAddToCart}
            />
          )}
        </div>
      ) : (
        /* Category grid */
        <div className="grid grid-cols-2 gap-4 px-6 mt-6 lg:grid-cols-4 lg:max-w-7xl lg:mx-auto lg:px-8">
          {categories.map(({ category, label, bg, border, img }) => (
            <button
              key={category}
              onClick={() => navigate(`/category/${encodeURIComponent(category)}`)}
              className="flex flex-col items-center justify-between border-none cursor-pointer"
              style={{ height: '189px', background: bg, border: `1px solid ${border}`, borderRadius: '18px', padding: '20px 12px 16px' }}
              aria-label={label.replace('\n', ' ')}
            >
              <div className="flex items-center justify-center flex-1">
                <img src={img} alt={label.replace('\n', ' ')} className="object-contain" style={{ maxWidth: '111px', maxHeight: '75px' }} />
              </div>
              <span className="font-bold text-[#181725] text-center mt-2" style={{ fontSize: '16px', lineHeight: '22px', letterSpacing: '0.1px', whiteSpace: 'pre-line' }}>
                {label}
              </span>
            </button>
          ))}
        </div>
      )}

      <FilterSheet
        visible={filterVisible}
        onClose={() => setFilterVisible(false)}
        onApply={setFilters}
        categories={allCategories}
        brands={allBrands}
        initialFilters={filters}
      />
    </div>
  );
};

export default ExplorePage;
