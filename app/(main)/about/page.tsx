'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function AboutPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-8 font-serif">
              Our Story
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Each live edge shelf tells the story of a tree that stood for centuries.
              We preserve that legacy through meticulous handcrafting, creating functional art
              that brings the soul of the forest into your home.
            </p>
          </div>
        </div>
      </section>

      {/* New Forest Heritage Section */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0 z-0">
          <img
            src="/NewForest1.jpg"
            alt="Ancient New Forest woodland with majestic oak trees"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-white">
          <div className="max-w-2xl">
            <h2 className="text-5xl font-bold mb-8 font-serif">
              From the New Forest
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Our wood comes from the legendary New Forest of England – a 1,000-year-old royal hunting ground
              established by William the Conqueror in 1079. This isn't just timber; it's living history.
            </p>
            <p className="text-lg text-white/80 mb-10 leading-relaxed">
              Each piece of wood we source carries the weight of history. From the mighty oaks
              that have stood for centuries to the elegant beeches that have witnessed countless
              seasons, every grain tells a story of endurance, strength, and natural beauty.
            </p>
          </div>
        </div>
      </section>

      {/* Craftsmanship Section */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6 font-serif">
                Cut to Your Exact Specification
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Our master craftsmen work with precision tools and decades of experience to cut
                each shelf to your exact dimensions. No approximations, no compromises – just
                perfect craftsmanship.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Every measurement is double-checked, every cut is made with care, and every edge
                is finished by hand. This attention to detail ensures your shelf fits perfectly
                in your space and will last for generations.
              </p>
            </div>

            <div className="relative">
              <img
                src="/Sawmill2.png"
                alt="Master craftsman working at sawmill, cutting wood to exact specifications"
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Installation Section */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img
                src="/Shelf1.png"
                alt="Beautiful wooden shelf installed in modern home interior"
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </div>

            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6 font-serif">
                Add a Bespoke Feel to Your Home
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Transform any space with a handcrafted wooden shelf that's been cut to your exact
                specifications. Each piece is designed to complement your home's unique character
                and enhance your living experience.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                From modern minimalist spaces to traditional country homes, our shelves adapt to
                any interior style. The natural beauty of the wood grain and live edges create
                a focal point that draws the eye and adds warmth to your space.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Customization Process Section */}
      <section className="relative py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="absolute inset-0 z-0">
          <img
            src="/Staining.png"
            alt="Wood staining and finishing process"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="text-center mb-24">
            <div className="inline-block px-6 py-2 bg-amber-100 text-amber-800 text-sm font-medium tracking-wider uppercase rounded-full mb-8">
              Bespoke Craftsmanship
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-8 font-serif leading-tight">
              Crafted Exclusively for You
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Every shelf is a unique creation, meticulously crafted to your exact specifications.
              From wood selection to final dimensions, every detail is tailored to your vision.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="w-8 h-8 bg-amber-800 rounded"></div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 font-serif">
                Choose Your Wood
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Select from our curated collection of premium wood types, each with its own unique character and grain pattern.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="w-8 h-8 bg-amber-800 rounded"></div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 font-serif">
                Set Your Dimensions
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Choose from preset sizes or enter your exact measurements. Every shelf is cut to your precise specifications.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="w-8 h-8 bg-amber-800 rounded"></div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 font-serif">
                Select Bracket Style
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Complete your shelf with the perfect bracket style to match your door and interior design preferences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-amber-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6 font-serif">
            Ready to Create Your Legacy?
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Join thousands of customers who have transformed their spaces with our handcrafted shelves.
            Each piece tells a story – what will yours be?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" href="/builder">
              Design Your Shelf
            </Button>
            <Button variant="secondary" size="lg" href="/gallery">
              See Our Stories
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
