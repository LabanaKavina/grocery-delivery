import { useState, useMemo, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useProductStore } from '../stores/productStore';
import { useCartStore } from '../stores/cartStore';
import type { Product, FilterState } from '../types';
import useDebounce from '../hooks/useDebounce';
import ProductGrid from '../components/organisms/ProductGrid';
import FilterSheet from '../components/organisms/FilterSheet';
import { useGlobalToast } from '../contexts/ToastContext';

const SearchPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') ?? '';

  const { products, isLoading, fetchProducts, searchProducts } = useProductStore();
  const addItem = useCartStore((s) => s.addItem);
  const { showToast } = useGlobalToast();

  const [query, setQuery] = useState(initialQuery);
  const [filterVisible, setFilterVisible] = useState(false);
  const [filters, setFilters] = useState<FilterState>({ categories: [], brands: [] });
  const inputRef = useRef<HTMLInputElement>(null);

  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (products.length === 0) fetchProducts();
  }, [products.length, fetchProducts]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const searchResults = useMemo(() => {
    if (!debouncedQuery.trim()) return [];
    const results = searchProducts(debouncedQuery);
    if (filters.categories.length === 0 && filters.brands.length === 0) return results;
    return results.filter((p) => {
      const categoryMatch = filters.categories.length === 0 || filters.categories.includes(p.category);
      const brandMatch = filters.brands.length === 0 || filters.brands.includes(p.brand);
      return categoryMatch && brandMatch;
    });
  }, [debouncedQuery, searchProducts, filters]);

  const categories = useMemo(() => [...new Set(products.map((p) => p.category))], [products]);
  const brands = useMemo(() => [...new Set(products.map((p) => p.brand))], [products]);

  const handleProductPress = (id: string) => navigate(`/product/${id}`);
  const handleAddToCart = (product: Product) => {
    addItem(product, 1);
    showToast(`${product.name} added to cart`, 'success');
  };

  return (
    <div className="min-h-screen bg-white pb-24">

      {/* Search bar row — Figma: left: 25px, top: 48px, width: 324px, height: 51.57px */}
      <div className="flex items-center gap-3 px-6 pt-12 pb-4">
        {/* Search input — #F2F3F2, border-radius: 15px */}
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
          {/* Clear button */}
          {query && (
            <button
              onClick={() => setQuery('')}
              className="bg-transparent border-none cursor-pointer p-0 flex items-center justify-center rounded-full bg-[#C5C5C5]"
              style={{ width: '16px', height: '16px' }}
              aria-label="Clear search"
            >
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true">
                <path d="M1 1l6 6M7 1 1 7" stroke="white" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
            </button>
          )}
        </div>

        {/* Filter icon — two circles/sliders */}
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

      {/* Results grid */}
      <div className="px-4">
        {!debouncedQuery.trim() ? (
          <div className="flex items-center justify-center py-16">
            <p className="text-[#7C7C7C]" style={{ fontSize: '14px' }}>Search for products</p>
          </div>
        ) : searchResults.length === 0 && !isLoading ? (
          <div className="flex items-center justify-center py-16">
            <p className="text-[#7C7C7C]" style={{ fontSize: '14px' }}>No results for "{debouncedQuery}"</p>
          </div>
        ) : (
          <ProductGrid
            products={searchResults}
            loading={isLoading}
            onProductPress={handleProductPress}
            onAddToCart={handleAddToCart}
          />
        )}
      </div>

      <FilterSheet
        visible={filterVisible}
        onClose={() => setFilterVisible(false)}
        onApply={setFilters}
        categories={categories}
        brands={brands}
        initialFilters={filters}
      />
    </div>
  );
};

export default SearchPage;
