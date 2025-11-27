import { Product, Category, Order, Customer } from '@/types';
import { 
  generateMockProducts, 
  generateMockCategories, 
  generateMockOrders, 
  generateMockCustomers 
} from './mockData';

const STORAGE_KEYS = {
  PRODUCTS: 'furniture_admin_products',
  CATEGORIES: 'furniture_admin_categories',
  ORDERS: 'furniture_admin_orders',
  CUSTOMERS: 'furniture_admin_customers',
  INITIALIZED: 'furniture_admin_initialized',
};

// Initialize localStorage with mock data if not already initialized
export const initializeStorage = () => {
  if (!localStorage.getItem(STORAGE_KEYS.INITIALIZED)) {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(generateMockProducts()));
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(generateMockCategories()));
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(generateMockOrders()));
    localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(generateMockCustomers()));
    localStorage.setItem(STORAGE_KEYS.INITIALIZED, 'true');
  }
};

// Products
export const getProducts = (): Product[] => {
  const data = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
  return data ? JSON.parse(data) : [];
};

export const saveProducts = (products: Product[]) => {
  localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
};

export const addProduct = (product: Product) => {
  const products = getProducts();
  products.push(product);
  saveProducts(products);
};

export const updateProduct = (id: string, updates: Partial<Product>) => {
  const products = getProducts();
  const index = products.findIndex(p => p.id === id);
  if (index !== -1) {
    products[index] = { ...products[index], ...updates, updatedAt: new Date().toISOString() };
    saveProducts(products);
  }
};

export const deleteProduct = (id: string) => {
  const products = getProducts().filter(p => p.id !== id);
  saveProducts(products);
};

// Categories
export const getCategories = (): Category[] => {
  const data = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
  return data ? JSON.parse(data) : [];
};

export const saveCategories = (categories: Category[]) => {
  localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
};

export const addCategory = (category: Category) => {
  const categories = getCategories();
  categories.push(category);
  saveCategories(categories);
};

export const updateCategory = (id: string, updates: Partial<Category>) => {
  const categories = getCategories();
  const index = categories.findIndex(c => c.id === id);
  if (index !== -1) {
    categories[index] = { ...categories[index], ...updates };
    saveCategories(categories);
  }
};

export const deleteCategory = (id: string) => {
  const categories = getCategories().filter(c => c.id !== id);
  saveCategories(categories);
};

// Orders
export const getOrders = (): Order[] => {
  const data = localStorage.getItem(STORAGE_KEYS.ORDERS);
  return data ? JSON.parse(data) : [];
};

export const saveOrders = (orders: Order[]) => {
  localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
};

export const updateOrderStatus = (id: string, status: Order['status']) => {
  const orders = getOrders();
  const index = orders.findIndex(o => o.id === id);
  if (index !== -1) {
    orders[index] = { ...orders[index], status, updatedAt: new Date().toISOString() };
    saveOrders(orders);
  }
};

// Customers
export const getCustomers = (): Customer[] => {
  const data = localStorage.getItem(STORAGE_KEYS.CUSTOMERS);
  return data ? JSON.parse(data) : [];
};

export const saveCustomers = (customers: Customer[]) => {
  localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(customers));
};

export const updateCustomer = (id: string, updates: Partial<Customer>) => {
  const customers = getCustomers();
  const index = customers.findIndex(c => c.id === id);
  if (index !== -1) {
    customers[index] = { ...customers[index], ...updates };
    saveCustomers(customers);
  }
};
