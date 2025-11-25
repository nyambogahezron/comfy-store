import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Category } from '@/types';

interface CategoryCardProps {
  category: Category;
}

export const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <Link to={`/shop?category=${category.slug}`}>
      <Card className="group overflow-hidden hover:shadow-medium transition-all duration-300">
        <div className="relative aspect-square overflow-hidden">
          <img
            src={category.image}
            alt={category.name}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
            <div>
              <h3 className="text-white text-2xl font-bold mb-1">{category.name}</h3>
              <p className="text-white/90 text-sm">{category.description}</p>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};
