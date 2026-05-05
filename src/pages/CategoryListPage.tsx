import { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProductStore } from '../stores/productStore';
import { useCartStore } from '../stores/cartStore';
import { ProductCategory } from '../types';
import type { Product, FilterState } from '../types';
import ProductListLayout from '../components/templates/ProductListLayout';
import ProductGrid from '../components/organisms/ProductGrid';
import FilterSheet from '../components/organisms/FilterSheet';
import { useGlobalToast } from '../contexts/ToastContext';

const CategoryListPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, isLoading, fetchProducts } = useProductStore();
  const addItem = useCartStore((s) => s.addItem);
  const { showToast } = useGlobalToast();

  const [filterVisible, setFilterVisible] = useState(false);
  const [filters, setFilters] = useState<FilterState>({ categories: [], brands: [] });

  const categoryName = decodeURIComponent(id ?? '');

  useEffect(() => {
    if (products.length === 0) {
      fetchProducts();
    }
  }, [products.length, fetchProducts]);

  const categoryProducts = useMemo(() => {
    const matchingCategory = Object.values(ProductCategory).find((c) => c === categoryName);
    if (!matchingCategory) return [];
    return products.filter((p) => p.category === matchingCategory);
  }, [products, categoryName]);

  const filteredProducts = useMemo(() => {
    if (filters.brands.length === 0) return categoryProducts;
    return categoryProducts.filter((p) => filters.brands.includes(p.brand));
  }, [categoryProducts, filters]);

  const brands = useMemo(
    () => [...new Set(categoryProducts.map((p) => p.brand))],
    [categoryProducts]
  );

  const handleProductPress = (productId: string) => navigate(`/product/${productId}`);
  const handleAddToCart = (product: Product) => {
    addItem(product, 1);
    showToast(`${product.name} added to cart`, 'success');
  };

  return (
    <ProductListLayout title={categoryName} onFilterClick={() => setFilterVisible(true)}>
      <ProductGrid
        products={filteredProducts}
        loading={isLoading}
        onProductPress={handleProductPress}
        onAddToCart={handleAddToCart}
      />
      <FilterSheet
        visible={filterVisible}
        onClose={() => setFilterVisible(false)}
        onApply={setFilters}
        categories={[]}
        brands={brands}
        initialFilters={filters}
      />
    </ProductListLayout>
  );
};

export default CategoryListPage;
