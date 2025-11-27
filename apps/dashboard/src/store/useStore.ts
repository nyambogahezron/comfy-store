import { create } from 'zustand';

interface StoreState {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export const useStore = create<StoreState>((set) => ({
  sidebarOpen: true,
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  
  selectedCategory: 'all',
  setSelectedCategory: (category) => set({ selectedCategory: category }),
}));
