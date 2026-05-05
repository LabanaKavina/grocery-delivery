import type { CartItem } from '../types';

/**
 * Calculates the total price of all items in the cart.
 * Total = sum of (item.product.price × item.quantity) for each item.
 */
export const calculateTotal = (items: CartItem[]): number => {
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  return Math.round(total * 100) / 100;
};
