export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  subCategory?: string;
  images: string[];
  colors: Color[];
  materials: Material[];
  dimensions: {
    width: number;
    height: number;
    depth: number;
    unit: string;
  };
  inStock: boolean;
  featured: boolean;
  rating: number;
  reviewCount: number;
  tags: string[];
}

export interface Color {
  name: string;
  hex: string;
}

export interface Material {
  name: string;
  type: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: Color;
  selectedMaterial?: Material;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  phone?: string;
  address?: Address;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  shippingAddress: Address;
  paymentMethod: string;
}

export interface FilterOptions {
  categories: string[];
  priceRange: [number, number];
  materials: string[];
  colors: string[];
  inStock: boolean;
  sortBy: 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc' | 'newest';
}
