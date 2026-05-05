import { create } from 'zustand';
import type { Product, FilterState } from '../types';
import { ProductCategory } from '../types';
import * as mockApi from '../services/mockApi';

interface ProductState {
  products: Product[];
  categories: ProductCategory[];
  isLoading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
  getProductById: (id: string) => Product | undefined;
  getProductsByCategory: (category: ProductCategory) => Product[];
  searchProducts: (query: string) => Product[];
  filterProducts: (filters: FilterState) => Product[];
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  categories: Object.values(ProductCategory),
  isLoading: false,
  error: null,

  fetchProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      const products = await mockApi.fetchProducts();
      set({ products, isLoading: false });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch products';
      set({ error: message, isLoading: false });
    }
  },

  getProductById: (id: string) => {
    return get().products.find((p) => p.id === id);
  },

  getProductsByCategory: (category: ProductCategory) => {
    return get().products.filter((p) => p.category === category);
  },

  searchProducts: (query: string) => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return [];
    return get().products.filter((p) => p.name.toLowerCase().includes(trimmed));
  },

  filterProducts: (filters: FilterState) => {
    return get().products.filter((p) => {
      const categoryMatch = filters.categories.length === 0 || filters.categories.includes(p.category);
      const brandMatch = filters.brands.length === 0 || filters.brands.includes(p.brand);
      return categoryMatch && brandMatch;
    });
  },
}));
