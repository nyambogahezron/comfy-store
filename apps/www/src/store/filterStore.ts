import { create } from 'zustand';
import { FilterOptions } from '@/types';

interface FilterState extends FilterOptions {
  setCategories: (categories: string[]) => void;
  setPriceRange: (range: [number, number]) => void;
  setMaterials: (materials: string[]) => void;
  setColors: (colors: string[]) => void;
  setInStock: (inStock: boolean) => void;
  setSortBy: (sortBy: FilterOptions['sortBy']) => void;
  resetFilters: () => void;
}

const initialState: FilterOptions = {
  categories: [],
  priceRange: [0, 5000],
  materials: [],
  colors: [],
  inStock: false,
  sortBy: 'newest',
};

export const useFilterStore = create<FilterState>((set) => ({
  ...initialState,

  setCategories: (categories) => set({ categories }),
  setPriceRange: (range) => set({ priceRange: range }),
  setMaterials: (materials) => set({ materials }),
  setColors: (colors) => set({ colors }),
  setInStock: (inStock) => set({ inStock }),
  setSortBy: (sortBy) => set({ sortBy }),
  
  resetFilters: () => set(initialState),
}));
