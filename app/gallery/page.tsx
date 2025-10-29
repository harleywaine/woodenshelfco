'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

const galleryImages = [
  {
    src: '/Gallery/Living room.png',
    alt: 'Modern living room with live edge shelf',
    title: 'Modern Living Room',
    description: 'A beautiful walnut live edge shelf showcasing books and decor',
  },
  {
    src: '/Gallery/Bathroom 1.png',
    alt: 'Bathroom with floating wooden shelves',
    title: 'Bathroom Storage',
    description: 'Water-resistant finish on oak shelves for bathroom storage',
  },
  {
    src: '/Gallery/Office1.png',
    alt: 'Office space with custom shelf display',
    title: 'Home Office',
    description: 'Cherry wood shelves creating an organized workspace',
  },
  {
    src: '/Gallery/Bedroom 1.png',
    alt: 'Bedroom with minimalist shelf design',
    title: 'Bedroom Elegance',
    description: 'Minimalist maple shelves adding warmth to a bedroom',
  },
  {
    src: '/Gallery/Dining room 1.png',
    alt: 'Dining room with statement shelf',
    title: 'Dining Room Statement',
    description: 'A dramatic live edge shelf as a focal point in the dining room',
  },
  {
    src: '/Gallery/Library 1.png',
    alt: 'Library with extensive shelving',
    title: 'Home Library',
    description: 'Custom-built shelving system for a home library',
  },
  {
    src: '/Gallery/Outdoor.png',
    alt: 'Outdoor covered area with shelves',
    title: 'Outdoor Living',
    description: 'Weather-treated shelves for covered outdoor spaces',
  },
];

export default function GalleryPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div className="py-24">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-playfair font-bold text-gray-900 mb-6">
            Gallery
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            See how our custom shelves transform spaces. From modern living rooms 
            to cozy bedrooms, discover the perfect shelf for your home.
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="aspect-[4/3] relative">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-xl font-playfair font-semibold text-white mb-2">
                  {image.title}
                </h3>
                <p className="text-amber-200 text-sm">
                  {image.description}
                </p>
              </div>

              {/* Hover overlay with title always visible on mobile */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-gray-900/80 to-transparent md:hidden">
                <h3 className="text-lg font-playfair font-semibold text-white">
                  {image.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-16"
        >
          <div className="bg-amber-50 rounded-2xl p-8 md:p-12">
            <h2 className="text-2xl sm:text-3xl font-playfair font-bold text-gray-900 mb-4">
              Inspired to Create Your Own?
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Use our custom builder to design a shelf that perfectly fits your space 
              and style. Every detail is customizable.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/builder"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-amber-800 hover:bg-amber-900 transition-colors duration-200"
              >
                Start Building
              </a>
              <a
                href="/shop"
                className="inline-flex items-center px-6 py-3 border border-amber-800 text-base font-medium rounded-lg text-amber-800 bg-transparent hover:bg-amber-800 hover:text-white transition-colors duration-200"
              >
                Browse Collection
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
