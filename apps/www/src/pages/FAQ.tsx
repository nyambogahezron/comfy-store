import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const FAQ = () => {
  const faqs = [
    {
      category: 'Orders & Shipping',
      questions: [
        {
          q: 'How long does shipping take?',
          a: 'Standard shipping typically takes 5-7 business days. Express shipping (2-3 business days) is available for an additional fee. Free shipping is offered on all orders over $500.',
        },
        {
          q: 'Do you ship internationally?',
          a: 'Currently, we only ship within the United States. We\'re working on expanding our shipping internationally in the near future.',
        },
        {
          q: 'Can I track my order?',
          a: 'Yes! Once your order ships, you\'ll receive a tracking number via email. You can also track your order status in your account dashboard.',
        },
      ],
    },
    {
      category: 'Returns & Exchanges',
      questions: [
        {
          q: 'What is your return policy?',
          a: 'We offer a 30-day return policy for most items. Products must be in original condition with all packaging. Some items like custom-made pieces are final sale.',
        },
        {
          q: 'How do I initiate a return?',
          a: 'Contact our customer service team at support@comfystore.com or through your account dashboard. We\'ll provide you with a return shipping label and instructions.',
        },
        {
          q: 'When will I receive my refund?',
          a: 'Refunds are processed within 5-7 business days after we receive your returned item. The refund will be issued to your original payment method.',
        },
      ],
    },
    {
      category: 'Products',
      questions: [
        {
          q: 'Are your products sustainably sourced?',
          a: 'Yes! We prioritize sustainability and work with suppliers who use responsibly sourced materials and ethical manufacturing practices.',
        },
        {
          q: 'Do you offer assembly services?',
          a: 'Some items require assembly. Detailed instructions are included with each product. Professional assembly services are available in select areas for an additional fee.',
        },
        {
          q: 'Can I see products in person before buying?',
          a: 'Visit our showroom at 123 Design Street, New York, NY 10001. Our design consultants are available to help you explore our collections.',
        },
      ],
    },
    {
      category: 'Payment',
      questions: [
        {
          q: 'What payment methods do you accept?',
          a: 'We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, and offer financing options through Affirm.',
        },
        {
          q: 'Is my payment information secure?',
          a: 'Absolutely. We use industry-standard SSL encryption to protect your payment information. We never store your full credit card details.',
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero */}
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-4">Frequently Asked Questions</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Find answers to common questions about our products, shipping, and policies
            </p>
          </div>
        </section>

        <section className="py-16 container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            {faqs.map((category, idx) => (
              <div key={idx}>
                <h2 className="text-2xl font-bold mb-6">{category.category}</h2>
                <Accordion type="single" collapsible className="space-y-4">
                  {category.questions.map((faq, qIdx) => (
                    <AccordionItem key={qIdx} value={`${idx}-${qIdx}`} className="border rounded-lg px-6">
                      <AccordionTrigger className="text-left font-semibold">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FAQ;
