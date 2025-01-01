import { create } from 'zustand';
import {
  generateDummyData,
  generateDummyUsers,
  generateDummyMessages,
  generateDummyOrders,
  generateDummyNotifications,
} from '../utils/generate-dummy-data';
import { Message, Notification, Order, Product, User } from '@/types';

// Product Store
export const useProductStore = create<{
  products: Product[];
  setProducts: (products: Product[]) => void;
}>((set) => ({
  products: generateDummyData(),
  setProducts: (products) => set({ products }),
}));


// User Store
export const useUserStore = create<{
  users: User[];
  setUsers: (users: User[]) => void;
}>((set) => ({
  users: generateDummyUsers(),
  setUsers: (users) => set({ users }),
}));

// Message Store
export const useMessageStore = create<{
  messages: Message[];
  setMessages: (messages: Message[]) => void;
}>((set) => ({
  messages: generateDummyMessages(),
  setMessages: (messages) => set({ messages }),
}));

// Order Store
export const useOrderStore = create<{
  orders: Order[];
  setOrders: (orders: Order[]) => void;
}>((set) => ({
  orders: generateDummyOrders(),
  setOrders: (orders) => set({ orders }),
}));

// Notification Store
export const useNotificationStore = create<{
  notifications: Notification[];
  setNotifications: (notifications: Notification[]) => void;
}>((set) => ({
  notifications: generateDummyNotifications(),
  setNotifications: (notifications) => set({ notifications }),
}));
