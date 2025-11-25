import { Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ProductGrid } from '@/components/ProductGrid';
import { Button } from '@/components/ui/button';
import { useWishlistStore } from '@/store/wishlistStore';
import { Heart } from 'lucide-react';

const Wishlist = () => {
  const items = useWishlistStore((state) => state.items);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">My Wishlist</h1>

        {items.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="h-20 w-20 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h2 className="text-2xl font-bold mb-2">Your wishlist is empty</h2>
            <p className="text-muted-foreground mb-8">
              Save items you love to your wishlist
            </p>
            <Button asChild size="lg">
              <Link to="/shop">Start Shopping</Link>
            </Button>
          </div>
        ) : (
          <>
            <p className="text-muted-foreground mb-8">
              {items.length} {items.length === 1 ? 'item' : 'items'} saved
            </p>
            <ProductGrid products={items} />
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Wishlist;
