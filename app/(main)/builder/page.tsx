'use client';

import { useState } from 'react';
import { ShelfConfigurator } from '@/components/builder/ShelfConfigurator';

export default function BuilderPage() {
  const [currentPrice, setCurrentPrice] = useState(0);

  return (
    <div className="section-padding">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-playfair font-bold text-charcoal-900 mb-6">
            Custom Shelf Builder
          </h1>
          <p className="text-lg text-charcoal-600 max-w-3xl mx-auto">
            Design your perfect shelf with our interactive builder. Choose dimensions, 
            wood type, finish, and bracket style. See your price update in real-time 
            as you customize every detail.
          </p>
        </div>

        <ShelfConfigurator onPriceUpdate={setCurrentPrice} />
      </div>
    </div>
  );
}
