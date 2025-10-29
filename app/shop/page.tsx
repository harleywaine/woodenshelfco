'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Grid, List, SlidersHorizontal } from 'lucide-react';

export default function ShopPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="section-padding">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-playfair font-bold text-charcoal-900 mb-4">
            Shop Shelves
          </h1>
          <p className="text-lg text-gray-600">
            Discover our collection of handcrafted live edge wooden shelves
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid'
                  ? 'bg-amber-800 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list'
                  ? 'bg-amber-800 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Coming Soon Message */}
        <div className="text-center py-16">
          <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-playfair font-semibold text-gray-900 mb-4">
              Coming Soon
            </h2>
            <p className="text-gray-600 mb-8">
              Our product catalog is being prepared. In the meantime, use our custom builder to design your perfect shelf.
            </p>
            <Button href="/builder" variant="primary" size="lg">
              Design Your Shelf
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}