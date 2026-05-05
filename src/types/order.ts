import type { CartItem } from './cart';

export enum OrderStatus {
  Pending = 'pending',
  Accepted = 'accepted',
  Failed = 'failed',
  Delivered = 'delivered',
}

export enum PaymentMethod {
  CreditCard = 'credit_card',
  CashOnDelivery = 'cash_on_delivery',
  MobileBanking = 'mobile_banking',
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  deliveryMethod: string;
  paymentMethod: PaymentMethod;
  promoCode?: string;
  createdAt: string;
}
