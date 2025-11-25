import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Award, Heart, Leaf, Users } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero */}
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-4">About Comfy Store</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Crafting timeless furniture that brings warmth and elegance to modern homes since 2010
            </p>
          </div>
        </section>

        {/* Story */}
        <section className="py-16 container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Comfy Store was founded with a simple yet profound mission: to make beautifully designed, 
                high-quality furniture accessible to everyone. We believe that your home should be a 
                sanctuary that reflects your personal style while providing comfort and functionality.
              </p>
              <p>
                Drawing inspiration from Scandinavian minimalism and contemporary design principles, 
                we curate a collection of furniture pieces that are both timeless and practical. Each 
                item is thoughtfully selected for its craftsmanship, materials, and design integrity.
              </p>
              <p>
                What started as a small showroom has grown into a beloved brand serving thousands of 
                customers nationwide. Through it all, we've stayed true to our core values: quality, 
                sustainability, and customer satisfaction.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Quality Craftsmanship</h3>
                <p className="text-sm text-muted-foreground">
                  Every piece is built to last with premium materials and expert construction
                </p>
              </div>
              <div className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Leaf className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Sustainability</h3>
                <p className="text-sm text-muted-foreground">
                  Committed to eco-friendly practices and responsibly sourced materials
                </p>
              </div>
              <div className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Customer First</h3>
                <p className="text-sm text-muted-foreground">
                  Your satisfaction is our priority with dedicated support and service
                </p>
              </div>
              <div className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Community</h3>
                <p className="text-sm text-muted-foreground">
                  Building relationships and supporting local artisans and makers
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-16 container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The passionate people behind Comfy Store who make it all possible
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { name: 'Sarah Mitchell', role: 'Founder & CEO', image: '/placeholder.svg' },
              { name: 'David Chen', role: 'Head of Design', image: '/placeholder.svg' },
              { name: 'Emma Rodriguez', role: 'Customer Experience', image: '/placeholder.svg' },
            ].map((member, i) => (
              <div key={i} className="text-center">
                <div className="aspect-square bg-muted rounded-lg mb-4 overflow-hidden">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="font-semibold text-lg">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
