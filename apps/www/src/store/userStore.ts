import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types';

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: async (email, password) => {
        // Mock login - in real app, would call API
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        const mockUser: User = {
          id: '1',
          email,
          name: 'John Doe',
          avatar: '/placeholder.svg',
        };

        set({ user: mockUser, isAuthenticated: true });
        return true;
      },

      signup: async (name, email, password) => {
        // Mock signup - in real app, would call API
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        const mockUser: User = {
          id: Date.now().toString(),
          email,
          name,
        };

        set({ user: mockUser, isAuthenticated: true });
        return true;
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      updateProfile: (updates) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        }));
      },
    }),
    {
      name: 'user-storage',
    }
  )
);
