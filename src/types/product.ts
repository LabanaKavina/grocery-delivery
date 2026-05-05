export enum ProductCategory {
  FreshFruitsVegetable = 'Fresh Fruits & Vegetable',
  CookingOilGhee = 'Cooking Oil & Ghee',
  MeatFish = 'Meat & Fish',
  BakerySnacks = 'Bakery & Snacks',
  DairyEggs = 'Dairy & Eggs',
  Beverages = 'Beverages',
  Pulses = 'Pulses',
  Rice = 'Rice',
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: ProductCategory;
  weight: string;
  nutritions: string;
  reviewRating: number;
  brand: string;
}

export interface Banner {
  id: string;
  image: string;
  title: string;
  subtitle: string;
}

export interface FilterState {
  categories: string[];
  brands: string[];
}
