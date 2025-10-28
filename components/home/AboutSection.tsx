'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl font-playfair font-bold text-gray-900 mb-6">
              Crafted with Passion, 
              <span className="text-amber-800"> Built to Last</span>
            </h2>
            
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              For over a decade, we've been transforming raw, beautiful wood into 
              functional art. Each live edge shelf tells a story of the tree it came from, 
              preserving nature's unique patterns and character.
            </p>
            
            <p className="text-gray-600 mb-8 leading-relaxed">
              Our master craftsmen carefully select each piece of wood, considering grain 
              patterns, natural edges, and structural integrity. Every shelf is hand-finished 
              with eco-friendly stains and sealants, ensuring both beauty and durability.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button href="/about">
                Our Story
              </Button>
              <Button variant="secondary" href="/gallery">
                View Gallery
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Craftsman working on wooden shelf"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Floating stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-6"
            >
              <div className="text-center">
                <div className="text-2xl font-playfair font-bold text-amber-800">500+</div>
                <div className="text-sm text-gray-600">Shelves Crafted</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="absolute -top-6 -right-6 bg-amber-800 text-white rounded-xl shadow-lg p-6"
            >
              <div className="text-center">
                <div className="text-2xl font-playfair font-bold">10+</div>
                <div className="text-sm text-amber-200">Years Experience</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
