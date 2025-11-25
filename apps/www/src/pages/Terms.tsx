import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto prose prose-neutral dark:prose-invert">
          <h1 className="text-4xl font-bold mb-8">Terms & Conditions</h1>
          <p className="text-sm text-muted-foreground mb-8">Last updated: November 24, 2024</p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Agreement to Terms</h2>
            <p className="text-muted-foreground mb-4">
              By accessing and using the Comfy Store website, you agree to be bound by these Terms and Conditions. 
              If you disagree with any part of these terms, you may not access our website or use our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Use of Our Website</h2>
            <p className="text-muted-foreground mb-4">
              You agree to use our website only for lawful purposes and in a way that does not infringe upon the rights of others. 
              You must not:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
              <li>Use our website in any way that causes damage to the website or impairs its availability</li>
              <li>Use our website to transmit harmful or malicious code</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Collect data from our website using automated means</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Product Information</h2>
            <p className="text-muted-foreground mb-4">
              We strive to provide accurate product descriptions and pricing. However, we do not warrant that product descriptions, 
              colors, or other content are accurate, complete, reliable, or error-free. We reserve the right to correct any errors 
              and to change or update information at any time without prior notice.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Orders and Payment</h2>
            <p className="text-muted-foreground mb-4">
              By placing an order, you make an offer to purchase products. We reserve the right to accept or decline your order 
              for any reason. Payment must be received before we process your order. All prices are in USD and include applicable taxes.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Shipping and Delivery</h2>
            <p className="text-muted-foreground mb-4">
              Delivery times are estimates and not guaranteed. We are not liable for delays caused by shipping carriers or 
              circumstances beyond our control. Risk of loss and title for items purchased pass to you upon delivery to the carrier.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Returns and Refunds</h2>
            <p className="text-muted-foreground mb-4">
              Our return policy allows returns within 30 days of delivery for most items. Items must be in original condition 
              with all packaging. Custom-made items and clearance sales are final sale. Refunds will be issued to the original 
              payment method within 5-7 business days of receiving the returned item.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Intellectual Property</h2>
            <p className="text-muted-foreground mb-4">
              All content on this website, including text, graphics, logos, images, and software, is the property of Comfy Store 
              or its content suppliers and is protected by copyright and intellectual property laws. You may not reproduce, 
              distribute, or create derivative works without our written permission.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Limitation of Liability</h2>
            <p className="text-muted-foreground mb-4">
              To the fullest extent permitted by law, Comfy Store shall not be liable for any indirect, incidental, special, 
              or consequential damages arising out of or in connection with your use of our website or products.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Changes to Terms</h2>
            <p className="text-muted-foreground mb-4">
              We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to the website. 
              Your continued use of the website after changes are posted constitutes acceptance of the modified terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
            <p className="text-muted-foreground">
              If you have questions about these Terms and Conditions, please contact us at:
              <br />
              Email: legal@comfystore.com
              <br />
              Address: 123 Design Street, New York, NY 10001
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Terms;
