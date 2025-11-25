import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CategoryCard } from '@/components/CategoryCard';
import { ProductGrid } from '@/components/ProductGrid';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { categories } from '@/data/categories';
import { products } from '@/data/products';
import heroImage from '@/assets/hero-furniture.jpg';
import { ArrowRight, Truck, ShieldCheck, HeadphonesIcon } from 'lucide-react';

const Index = () => {
  const featuredProducts = products.filter((p) => p.featured).slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
          <img
            src={heroImage}
            alt="Modern living room furniture"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
          <div className="relative z-10 container mx-auto px-4 text-white">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 max-w-3xl animate-fade-in">
              Timeless Design
              <br />
              For Modern Living
            </h1>
            <p className="text-lg md:text-xl mb-8 max-w-xl text-white/90 animate-fade-in">
              Curated furniture that brings warmth, style, and functionality to every room.
            </p>
            <Button asChild size="lg" className="animate-fade-in">
              <Link to="/shop">
                Shop Collection <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Truck className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Free Shipping</h3>
                  <p className="text-sm text-muted-foreground">On orders over $500</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Secure Payment</h3>
                  <p className="text-sm text-muted-foreground">100% secure transactions</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <HeadphonesIcon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">24/7 Support</h3>
                  <p className="text-sm text-muted-foreground">Dedicated customer service</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Shop by Room</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Discover furniture and décor for every space in your home
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.slice(0, 6).map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-2">Featured Collection</h2>
                <p className="text-muted-foreground">Handpicked pieces for discerning tastes</p>
              </div>
              <Button asChild variant="outline">
                <Link to="/shop">View All</Link>
              </Button>
            </div>
            <ProductGrid products={featuredProducts} />
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What Our Customers Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: 'Sarah Johnson',
                  text: 'The Oslo sofa is everything I hoped for. Quality craftsmanship and timeless design.',
                  rating: 5,
                },
                {
                  name: 'Michael Chen',
                  text: 'Fast delivery and excellent customer service. The dining table is stunning!',
                  rating: 5,
                },
                {
                  name: 'Emma Williams',
                  text: 'Beautiful furniture that transformed my living space. Highly recommend!',
                  rating: 5,
                },
              ].map((testimonial, i) => (
                <div key={i} className="bg-card border rounded-lg p-6 shadow-soft">
                  <div className="flex mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-accent">★</span>
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">&quot;{testimonial.text}&quot;</p>
                  <p className="font-semibold">{testimonial.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-16 bg-gradient-hero text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay in the Loop</h2>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter for exclusive offers, design tips, and new arrivals
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-md text-foreground"
              />
              <Button variant="secondary" size="lg">
                Subscribe
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
