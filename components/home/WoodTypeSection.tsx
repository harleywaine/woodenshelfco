'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

const woodTypes = [
  {
    name: 'Walnut',
    description: 'Rich, dark grain with natural character',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    color: 'from-walnut-800 to-walnut-600',
  },
  {
    name: 'Oak',
    description: 'Classic strength with beautiful grain patterns',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    color: 'from-amber-800 to-amber-600',
  },
  {
    name: 'Maple',
    description: 'Light, clean aesthetic with subtle figuring',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    color: 'from-yellow-800 to-yellow-600',
  },
  {
    name: 'Cherry',
    description: 'Warm reddish tones that deepen over time',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    color: 'from-red-800 to-red-600',
  },
];

export function WoodTypeSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="section-padding bg-cream">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-playfair font-bold text-charcoal-900 mb-6">
            Premium Wood Types
          </h2>
          <p className="text-lg text-charcoal-600 max-w-2xl mx-auto">
            Each wood species brings its own unique character and beauty. 
            Choose the perfect wood to match your style and space.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {woodTypes.map((wood, index) => (
            <motion.div
              key={wood.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-xl shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                <div className="aspect-square">
                  <img
                    src={wood.image}
                    alt={wood.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${wood.color} opacity-60`} />
                </div>
                
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <h3 className="text-xl font-playfair font-semibold text-white mb-2">
                    {wood.name}
                  </h3>
                  <p className="text-walnut-100 text-sm mb-4">
                    {wood.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-12"
        >
          <Button size="lg" href="/shop">
            Explore All Wood Types
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
