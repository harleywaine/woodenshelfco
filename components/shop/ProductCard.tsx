'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Product } from '@/lib/types/product';
import { formatPrice, formatDimensions } from '@/lib/utils/formatters';

interface ProductCardProps {
  product: Product;
  onQuickAdd?: (product: Product) => void;
}

export function ProductCard({ product, onQuickAdd }: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group"
    >
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="relative aspect-square overflow-hidden">
          <Link href={`/shop/${product.slug}`}>
            <Image
              src={product.image_urls[0] || '/placeholder-shelf.jpg'}
              alt={product.name}
              fill
              className={`object-cover group-hover:scale-105 transition-transform duration-500 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
            />
            {!imageLoaded && (
              <div className="absolute inset-0 bg-charcoal-100 animate-pulse" />
            )}
          </Link>
          
          {/* Quick Add Button */}
          {onQuickAdd && (
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button
                size="sm"
                onClick={(e) => {
                  e.preventDefault();
                  onQuickAdd(product);
                }}
                className="bg-white/90 hover:bg-white text-charcoal-900 shadow-lg"
              >
                Quick Add
              </Button>
            </div>
          )}
        </div>

        <CardContent className="p-6">
          <div className="space-y-3">
            <div>
              <h3 className="font-playfair text-lg font-semibold text-charcoal-900 group-hover:text-walnut-700 transition-colors">
                <Link href={`/shop/${product.slug}`}>
                  {product.name}
                </Link>
              </h3>
              <p className="text-sm text-charcoal-600 capitalize">
                {product.wood_type}
              </p>
            </div>

            <p className="text-sm text-charcoal-600 line-clamp-2">
              {product.description}
            </p>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-semibold text-charcoal-900">
                  From {formatPrice(product.base_price)}
                </p>
                <p className="text-xs text-charcoal-500">
                  {formatDimensions(product.default_length, product.default_depth)}
                </p>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                asChild
              >
                <Link href={`/shop/${product.slug}`}>
                  Customize
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
