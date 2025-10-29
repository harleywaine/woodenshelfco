'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ChevronDown, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent } from '@/components/ui/Card';

const faqs = [
  {
    question: 'How long does it take to create a custom shelf?',
    answer: 'Custom shelves typically take 2-3 weeks to complete from order to shipment. This includes wood selection, cutting, sanding, finishing, and quality inspection. Rush orders may be available for an additional fee.',
  },
  {
    question: 'What wood types do you offer?',
    answer: 'We work with premium hardwoods including Walnut, Oak, Maple, Cherry, and Ash. Each wood type has unique grain patterns and characteristics. We also offer reclaimed wood options for a more rustic look.',
  },
  {
    question: 'Can I see the wood before it\'s cut?',
    answer: 'Yes! We provide photos of the actual wood pieces before cutting. For high-value orders, we can arrange a video call to show you the wood in detail and discuss the best cuts for your shelf.',
  },
  {
    question: 'What finishes are available?',
    answer: 'We offer several finish options including natural oil, clear polyurethane, and custom stain colors. All our finishes are eco-friendly and food-safe. We can also match existing wood tones in your home.',
  },
  {
    question: 'Do you offer installation services?',
    answer: 'We provide detailed installation instructions and hardware. For local customers in the Pacific Northwest, we can arrange professional installation. For other areas, we can recommend qualified installers.',
  },
  {
    question: 'What if my shelf doesn\'t fit perfectly?',
    answer: 'We guarantee a perfect fit. If your shelf doesn\'t meet your expectations, we\'ll work with you to make it right, including remaking the shelf if necessary. We\'re committed to your satisfaction.',
  },
  {
    question: 'How do I care for my wooden shelf?',
    answer: 'Simply dust regularly with a soft cloth and occasionally apply a light coat of furniture oil or wax. Avoid harsh chemicals and excessive moisture. With proper care, your shelf will last for generations.',
  },
  {
    question: 'Do you offer bulk discounts?',
    answer: 'Yes! We offer discounts for orders of 5 or more shelves. Contact us for a custom quote. We also work with interior designers and contractors on large projects.',
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="section-padding">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-playfair font-bold text-charcoal-900 mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-charcoal-600 max-w-3xl mx-auto">
            Find answers to common questions about our custom shelves, 
            ordering process, and care instructions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* FAQ Section */}
          <div className="lg:col-span-2">
            <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8 }}
              className="space-y-4"
            >
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  <Card>
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="w-full p-6 text-left flex items-center justify-between hover:bg-charcoal-50 transition-colors"
                    >
                      <h3 className="text-lg font-playfair font-semibold text-charcoal-900 pr-4">
                        {faq.question}
                      </h3>
                      <ChevronDown
                        className={`h-5 w-5 text-charcoal-500 transition-transform ${
                          openIndex === index ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {openIndex === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <CardContent className="pt-0 pb-6">
                          <p className="text-charcoal-600 leading-relaxed">
                            {faq.answer}
                          </p>
                        </CardContent>
                      </motion.div>
                    )}
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Contact Section */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-playfair font-bold text-charcoal-900 mb-6">
                    Still Have Questions?
                  </h2>
                  <p className="text-charcoal-600 mb-6">
                    We're here to help! Reach out to us with any questions about 
                    custom shelves, orders, or our process.
                  </p>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-walnut-700" />
                      <span className="text-charcoal-700">hello@woodenshelfco.com</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-walnut-700" />
                      <span className="text-charcoal-700">(555) 123-4567</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-5 w-5 text-walnut-700" />
                      <span className="text-charcoal-700">Seattle, WA</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-charcoal-900">Quick Contact</h3>
                    <form className="space-y-3">
                      <Input
                        placeholder="Your name"
                        type="text"
                      />
                      <Input
                        placeholder="Your email"
                        type="email"
                      />
                      <textarea
                        placeholder="Your message"
                        rows={4}
                        className="w-full px-4 py-3 border border-charcoal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-walnut-500 focus:border-transparent transition-colors duration-200 resize-none"
                      />
                      <Button className="w-full">
                        Send Message
                      </Button>
                    </form>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
