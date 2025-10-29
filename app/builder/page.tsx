'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';

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

        {/* Coming Soon Message */}
        <div className="text-center py-16">
          <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-playfair font-semibold text-gray-900 mb-4">
              Builder Coming Soon
            </h2>
            <p className="text-gray-600 mb-8">
              Our interactive shelf builder is being developed. Contact us to discuss your custom shelf requirements.
            </p>
            <Button href="/faq#contact" variant="primary" size="lg">
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}