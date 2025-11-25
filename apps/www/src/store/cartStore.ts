import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product, Color, Material } from '@/types';

interface CartState {
  items: CartItem[];
  addItem: (product: Product, quantity?: number, selectedColor?: Color, selectedMaterial?: Material) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product, quantity = 1, selectedColor, selectedMaterial) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) => 
              item.product.id === product.id &&
              item.selectedColor?.name === selectedColor?.name &&
              item.selectedMaterial?.name === selectedMaterial?.name
          );

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.product.id === product.id &&
                item.selectedColor?.name === selectedColor?.name &&
                item.selectedMaterial?.name === selectedMaterial?.name
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }

          return {
            items: [...state.items, { product, quantity, selectedColor, selectedMaterial }],
          };
        });
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId),
        }));
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      getTotal: () => {
        return get().items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        );
      },

      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);
