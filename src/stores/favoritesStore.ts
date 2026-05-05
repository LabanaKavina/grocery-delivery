import { create } from 'zustand';
import type { Product } from '../types';
import { useCartStore } from './cartStore';

interface FavoritesState {
  items: Product[];
  toggleFavorite: (product: Product) => void;
  isFavorite: (productId: string) => boolean;
  addAllToCart: () => void;
  removeFavorite: (productId: string) => void;
}

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  items: [],

  toggleFavorite: (product: Product) => {
    set((state) => {
      const exists = state.items.some((item) => item.id === product.id);
      if (exists) {
        return { items: state.items.filter((item) => item.id !== product.id) };
      }
      return { items: [...state.items, product] };
    });
  },

  isFavorite: (productId: string) => {
    return get().items.some((item) => item.id === productId);
  },

  addAllToCart: () => {
    const { items } = get();
    const cartStore = useCartStore.getState();
    items.forEach((product) => {
      cartStore.addItem(product, 1);
    });
  },

  removeFavorite: (productId: string) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== productId),
    }));
  },
}));
