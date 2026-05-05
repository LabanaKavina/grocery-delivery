import productsData from '../data/products.json';
import type { Product, Order, User } from '../types';
import { ProductCategory, OrderStatus, PaymentMethod } from '../types';

const products: Product[] = productsData.map((p) => ({
  ...p,
  category: p.category as ProductCategory,
}));

export const withDelay = <T>(data: T): Promise<T> => {
  const delay = 500 + Math.random() * 500;
  return new Promise((resolve) => setTimeout(() => resolve(data), delay));
};

export const fetchProducts = (): Promise<Product[]> => {
  return withDelay([...products]);
};

export const fetchProductById = (id: string): Promise<Product | null> => {
  const product = products.find((p) => p.id === id) ?? null;
  return withDelay(product);
};

export const fetchProductsByCategory = (category: ProductCategory): Promise<Product[]> => {
  const filtered = products.filter((p) => p.category === category);
  return withDelay(filtered);
};

export const searchProducts = (query: string): Promise<Product[]> => {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return withDelay([]);
  const results = products.filter((p) =>
    p.name.toLowerCase().includes(trimmed)
  );
  return withDelay(results);
};

export const login = (email: string, password: string): Promise<User> => {
  if (!email || !password) {
    return withDelay(null as unknown as User).then(() => {
      throw new Error('Email and password are required');
    });
  }
  const user: User = {
    id: 'user-1',
    username: email.split('@')[0] ?? email,
    email,
  };
  return withDelay(user);
};

export const signup = (
  username: string,
  email: string,
  password: string
): Promise<User> => {
  if (!username || !email || !password) {
    return withDelay(null as unknown as User).then(() => {
      throw new Error('All fields are required');
    });
  }
  const user: User = {
    id: `user-${Date.now()}`,
    username,
    email,
  };
  return withDelay(user);
};

export const placeOrder = (
  order: Omit<Order, 'id' | 'createdAt'>
): Promise<Order> => {
  const fullOrder: Order = {
    ...order,
    id: `order-${Date.now()}`,
    createdAt: new Date().toISOString(),
    status: order.status ?? OrderStatus.Accepted,
    paymentMethod: order.paymentMethod ?? PaymentMethod.CashOnDelivery,
  };
  return withDelay(fullOrder);
};
