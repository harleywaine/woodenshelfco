'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="section-padding bg-walnut-700 text-cream">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-playfair font-bold mb-6">
            Ready to Create Your Perfect Shelf?
          </h2>
          
          <p className="text-lg sm:text-xl text-walnut-100 mb-8 leading-relaxed">
            Start your custom shelf journey today. Our easy-to-use builder lets you 
            configure every detail, from dimensions to finish, and see your price 
            update in real-time.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/builder">
                Start Building
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/shop">
                Browse Collection
              </Link>
            </Button>
          </div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
          >
            <div>
              <div className="w-16 h-16 bg-walnut-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-cream" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-playfair text-lg font-semibold mb-2">Custom Dimensions</h3>
              <p className="text-walnut-200 text-sm">
                Cut to your exact specifications
              </p>
            </div>

            <div>
              <div className="w-16 h-16 bg-walnut-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-cream" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="font-playfair text-lg font-semibold mb-2">Handcrafted Quality</h3>
              <p className="text-walnut-200 text-sm">
                Each piece finished by skilled artisans
              </p>
            </div>

            <div>
              <div className="w-16 h-16 bg-walnut-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-cream" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="font-playfair text-lg font-semibold mb-2">Free Shipping</h3>
              <p className="text-walnut-200 text-sm">
                On all orders over $200
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
