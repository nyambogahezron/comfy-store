import { Product, FilterOptions } from '@/types';

export const filterProducts = (products: Product[], filters: FilterOptions): Product[] => {
  return products.filter((product) => {
    // Category filter
    if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
      return false;
    }

    // Price range filter
    if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
      return false;
    }

    // Materials filter
    if (filters.materials.length > 0) {
      const productMaterials = product.materials.map((m) => m.name);
      if (!filters.materials.some((mat) => productMaterials.includes(mat))) {
        return false;
      }
    }

    // Colors filter
    if (filters.colors.length > 0) {
      const productColors = product.colors.map((c) => c.name);
      if (!filters.colors.some((color) => productColors.includes(color))) {
        return false;
      }
    }

    // In stock filter
    if (filters.inStock && !product.inStock) {
      return false;
    }

    return true;
  });
};

export const sortProducts = (products: Product[], sortBy: FilterOptions['sortBy']): Product[] => {
  const sorted = [...products];

  switch (sortBy) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price);
    case 'name-asc':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'name-desc':
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    case 'newest':
      return sorted.reverse(); // Assuming products are ordered by creation date
    default:
      return sorted;
  }
};
