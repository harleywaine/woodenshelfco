'use client';

import { useState } from 'react';
import { Product, WoodType, Finish, Bracket } from '@/lib/types/product';
import { ProductConfiguration } from '@/lib/types/product';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { formatPrice, formatDimensions } from '@/lib/utils/formatters';
import { calculatePrice } from '@/lib/utils/pricing';
import { useCart } from '@/lib/hooks/useCart';

interface ProductDetailsProps {
  product: Product;
  woodTypes: WoodType[];
  finishes: Finish[];
  brackets: Bracket[];
}

export function ProductDetails({ product, woodTypes, finishes, brackets }: ProductDetailsProps) {
  const [configuration, setConfiguration] = useState<ProductConfiguration>({
    length: product.default_length,
    depth: product.default_depth,
    finish: product.default_finish,
    bracket: product.default_bracket,
  });

  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  const selectedWoodType = woodTypes.find(wt => wt.id === product.wood_type);
  const selectedFinish = finishes.find(f => f.id === configuration.finish);
  const selectedBracket = brackets.find(b => b.id === configuration.bracket);

  const currentPrice = selectedWoodType && selectedFinish && selectedBracket
    ? calculatePrice(product, configuration, selectedWoodType, selectedFinish, selectedBracket)
    : product.base_price;

  const handleAddToCart = () => {
    addItem(product, configuration, quantity);
  };

  const updateConfiguration = (key: keyof ProductConfiguration, value: string | number) => {
    setConfiguration(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const finishOptions = finishes.map(finish => ({
    value: finish.id,
    label: `${finish.name} (${finish.price_modifier >= 0 ? '+' : ''}${formatPrice(finish.price_modifier)})`
  }));

  const bracketOptions = brackets.map(bracket => ({
    value: bracket.id,
    label: `${bracket.name} (${formatPrice(bracket.price)})`
  }));

  return (
    <div className="space-y-8">
      {/* Product Info */}
      <div>
        <h1 className="text-3xl font-playfair font-bold text-charcoal-900 mb-4">
          {product.name}
        </h1>
        
        <div className="flex items-center space-x-4 mb-4">
          <span className="text-lg font-semibold text-walnut-700 capitalize">
            {selectedWoodType?.name || product.wood_type}
          </span>
          <span className="text-charcoal-400">•</span>
          <span className="text-charcoal-600">
            {formatDimensions(configuration.length, configuration.depth)}
          </span>
        </div>

        <p className="text-charcoal-600 leading-relaxed mb-6">
          {product.description}
        </p>

        <div className="text-3xl font-bold text-charcoal-900 mb-8">
          {formatPrice(currentPrice)}
        </div>
      </div>

      {/* Configuration */}
      <div className="space-y-6">
        <h3 className="text-xl font-playfair font-semibold text-charcoal-900">
          Customize Your Shelf
        </h3>

        {/* Dimensions */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-charcoal-700 mb-2">
              Length (inches)
            </label>
            <input
              type="range"
              min={product.min_length}
              max={product.max_length}
              value={configuration.length}
              onChange={(e) => updateConfiguration('length', Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-charcoal-500 mt-1">
              <span>{product.min_length}"</span>
              <span className="font-medium">{configuration.length}"</span>
              <span>{product.max_length}"</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal-700 mb-2">
              Depth (inches)
            </label>
            <input
              type="range"
              min={product.min_depth}
              max={product.max_depth}
              value={configuration.depth}
              onChange={(e) => updateConfiguration('depth', Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-charcoal-500 mt-1">
              <span>{product.min_depth}"</span>
              <span className="font-medium">{configuration.depth}"</span>
              <span>{product.max_depth}"</span>
            </div>
          </div>
        </div>

        {/* Finish Selection */}
        <div>
          <Select
            label="Finish"
            value={configuration.finish}
            onChange={(e) => updateConfiguration('finish', e.target.value)}
            options={finishOptions}
          />
          {selectedFinish && (
            <p className="text-sm text-charcoal-600 mt-1">
              {selectedFinish.description}
            </p>
          )}
        </div>

        {/* Bracket Selection */}
        <div>
          <Select
            label="Bracket Style"
            value={configuration.bracket}
            onChange={(e) => updateConfiguration('bracket', e.target.value)}
            options={bracketOptions}
          />
          {selectedBracket && (
            <p className="text-sm text-charcoal-600 mt-1">
              {selectedBracket.description}
            </p>
          )}
        </div>

        {/* Quantity */}
        <div>
          <label className="block text-sm font-medium text-charcoal-700 mb-2">
            Quantity
          </label>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-10 h-10 rounded-lg border border-charcoal-300 flex items-center justify-center hover:bg-charcoal-50"
            >
              -
            </button>
            <span className="w-12 text-center font-medium">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-10 h-10 rounded-lg border border-charcoal-300 flex items-center justify-center hover:bg-charcoal-50"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Add to Cart */}
      <div className="space-y-4">
        <Button
          onClick={handleAddToCart}
          className="w-full"
          size="lg"
        >
          Add to Cart - {formatPrice(currentPrice * quantity)}
        </Button>

        <div className="text-sm text-charcoal-600 text-center">
          <p>✓ Free shipping on orders over $200</p>
          <p>✓ 30-day return guarantee</p>
          <p>✓ Handcrafted in the USA</p>
        </div>
      </div>
    </div>
  );
}
