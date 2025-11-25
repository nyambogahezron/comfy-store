import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ProductGrid } from '@/components/ProductGrid';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { SlidersHorizontal } from 'lucide-react';
import { products } from '@/data/products';
import { categories } from '@/data/categories';
import { useFilterStore } from '@/store/filterStore';
import { filterProducts, sortProducts } from '@/utils/filters';
import { formatCurrency } from '@/utils/format';

const Shop = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  
  const filters = useFilterStore();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    if (categoryParam) {
      filters.setCategories([categoryParam]);
    }
  }, [categoryParam]);

  useEffect(() => {
    const filtered = filterProducts(products, filters);
    const sorted = sortProducts(filtered, filters.sortBy);
    setFilteredProducts(sorted);
  }, [filters]);

  const allMaterials = Array.from(
    new Set(products.flatMap((p) => p.materials.map((m) => m.name)))
  );

  const allColors = Array.from(
    new Set(products.flatMap((p) => p.colors.map((c) => c.name)))
  );

  const FilterSidebar = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="font-semibold mb-3">Categories</h3>
        <div className="space-y-2">
          {categories.map((cat) => (
            <div key={cat.id} className="flex items-center space-x-2">
              <Checkbox
                id={cat.slug}
                checked={filters.categories.includes(cat.slug)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    filters.setCategories([...filters.categories, cat.slug]);
                  } else {
                    filters.setCategories(filters.categories.filter((c) => c !== cat.slug));
                  }
                }}
              />
              <Label htmlFor={cat.slug} className="text-sm cursor-pointer">
                {cat.name}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-semibold mb-3">Price Range</h3>
        <Slider
          value={filters.priceRange}
          onValueChange={(value) => filters.setPriceRange(value as [number, number])}
          min={0}
          max={5000}
          step={100}
          className="mb-2"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>{formatCurrency(filters.priceRange[0])}</span>
          <span>{formatCurrency(filters.priceRange[1])}</span>
        </div>
      </div>

      {/* Materials */}
      <div>
        <h3 className="font-semibold mb-3">Materials</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {allMaterials.map((material) => (
            <div key={material} className="flex items-center space-x-2">
              <Checkbox
                id={material}
                checked={filters.materials.includes(material)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    filters.setMaterials([...filters.materials, material]);
                  } else {
                    filters.setMaterials(filters.materials.filter((m) => m !== material));
                  }
                }}
              />
              <Label htmlFor={material} className="text-sm cursor-pointer">
                {material}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* In Stock */}
      <div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="inStock"
            checked={filters.inStock}
            onCheckedChange={(checked) => filters.setInStock(!!checked)}
          />
          <Label htmlFor="inStock" className="text-sm cursor-pointer">
            In Stock Only
          </Label>
        </div>
      </div>

      {/* Reset */}
      <Button variant="outline" className="w-full" onClick={filters.resetFilters}>
        Reset Filters
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Shop All Furniture</h1>
          <p className="text-muted-foreground">
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </div>

        <div className="flex gap-8">
          {/* Desktop Filters */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <FilterSidebar />
          </aside>

          {/* Products */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              {/* Mobile Filter Button */}
              <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
                <SheetTrigger asChild className="lg:hidden">
                  <Button variant="outline">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <div className="mt-8">
                    <FilterSidebar />
                  </div>
                </SheetContent>
              </Sheet>

              {/* Sort */}
              <Select
                value={filters.sortBy}
                onValueChange={(value) => filters.setSortBy(value as any)}
              >
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="name-asc">Name: A to Z</SelectItem>
                  <SelectItem value="name-desc">Name: Z to A</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <ProductGrid products={filteredProducts} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Shop;
