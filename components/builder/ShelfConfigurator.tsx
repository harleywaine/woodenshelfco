'use client';

import { useState, useEffect } from 'react';
import { WoodType, Finish, Bracket } from '@/lib/types/product';
import { ProductConfiguration } from '@/lib/types/product';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { formatPrice, formatDimensions } from '@/lib/utils/formatters';
import { calculatePrice } from '@/lib/utils/pricing';
import { useCart } from '@/lib/hooks/useCart';
import { createClient } from '@/lib/supabase/client';

interface ShelfConfiguratorProps {
  onPriceUpdate?: (price: number) => void;
}

export function ShelfConfigurator({ onPriceUpdate }: ShelfConfiguratorProps) {
  const [woodTypes, setWoodTypes] = useState<WoodType[]>([]);
  const [finishes, setFinishes] = useState<Finish[]>([]);
  const [brackets, setBrackets] = useState<Bracket[]>([]);
  const [configuration, setConfiguration] = useState<ProductConfiguration>({
    length: 48,
    depth: 12,
    finish: '',
    bracket: '',
  });
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  const { addItem } = useCart();
  const supabase = createClient();

  useEffect(() => {
    fetchOptions();
  }, []);

  useEffect(() => {
    if (woodTypes.length > 0 && finishes.length > 0 && brackets.length > 0) {
      // Set default selections
      setConfiguration(prev => ({
        ...prev,
        finish: finishes[0]?.id || '',
        bracket: brackets[0]?.id || '',
      }));
    }
  }, [woodTypes, finishes, brackets]);

  useEffect(() => {
    calculateCurrentPrice();
  }, [configuration, woodTypes, finishes, brackets]);

  const fetchOptions = async () => {
    try {
      const [woodTypesRes, finishesRes, bracketsRes] = await Promise.all([
        supabase.from('wood_types').select('*'),
        supabase.from('finishes').select('*'),
        supabase.from('brackets').select('*'),
      ]);

      if (woodTypesRes.error) throw woodTypesRes.error;
      if (finishesRes.error) throw finishesRes.error;
      if (bracketsRes.error) throw bracketsRes.error;

      setWoodTypes(woodTypesRes.data || []);
      setFinishes(finishesRes.data || []);
      setBrackets(bracketsRes.data || []);
    } catch (error) {
      console.error('Error fetching options:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateCurrentPrice = () => {
    if (!configuration.finish || !configuration.bracket || woodTypes.length === 0) return;

    // Use first wood type as default for pricing calculation
    const woodType = woodTypes[0];
    const finish = finishes.find(f => f.id === configuration.finish);
    const bracket = brackets.find(b => b.id === configuration.bracket);

    if (woodType && finish && bracket) {
      // Create a mock product for pricing calculation
      const mockProduct = {
        id: 'custom',
        name: 'Custom Shelf',
        slug: 'custom-shelf',
        wood_type: woodType.id,
        description: 'Custom built shelf',
        base_price: 100, // Base price for custom shelf
        default_length: configuration.length,
        default_depth: configuration.depth,
        default_finish: configuration.finish,
        default_bracket: configuration.bracket,
        min_length: 12,
        max_length: 120,
        min_depth: 6,
        max_depth: 24,
        image_urls: [],
        stock_count: 999,
        is_active: true,
        created_at: '',
        updated_at: '',
      };

      const price = calculatePrice(mockProduct, configuration, woodType, finish, bracket);
      onPriceUpdate?.(price);
    }
  };

  const updateConfiguration = (key: keyof ProductConfiguration, value: string | number) => {
    setConfiguration(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleAddToCart = () => {
    if (!configuration.finish || !configuration.bracket) return;

    const woodType = woodTypes[0]; // Use first wood type as default
    const finish = finishes.find(f => f.id === configuration.finish);
    const bracket = brackets.find(b => b.id === configuration.bracket);

    if (woodType && finish && bracket) {
      // Create a mock product for cart
      const mockProduct = {
        id: 'custom',
        name: 'Custom Shelf',
        slug: 'custom-shelf',
        wood_type: woodType.id,
        description: 'Custom built shelf',
        base_price: 100,
        default_length: configuration.length,
        default_depth: configuration.depth,
        default_finish: configuration.finish,
        default_bracket: configuration.bracket,
        min_length: 12,
        max_length: 120,
        min_depth: 6,
        max_depth: 24,
        image_urls: [],
        stock_count: 999,
        is_active: true,
        created_at: '',
        updated_at: '',
      };

      addItem(mockProduct, configuration, quantity);
    }
  };

  const finishOptions = finishes.map(finish => ({
    value: finish.id,
    label: `${finish.name} (${finish.price_modifier >= 0 ? '+' : ''}${formatPrice(finish.price_modifier)})`
  }));

  const bracketOptions = brackets.map(bracket => ({
    value: bracket.id,
    label: `${bracket.name} (${formatPrice(bracket.price)})`
  }));

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-charcoal-200 rounded w-1/3 mb-4" />
          <div className="space-y-4">
            <div className="h-4 bg-charcoal-200 rounded w-full" />
            <div className="h-4 bg-charcoal-200 rounded w-5/6" />
            <div className="h-4 bg-charcoal-200 rounded w-4/6" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-playfair font-bold text-charcoal-900 mb-2">
          Configure Your Shelf
        </h2>
        <p className="text-charcoal-600">
          Customize every detail to create your perfect shelf
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Configuration Options */}
        <div className="space-y-6">
          {/* Dimensions */}
          <Card>
            <CardHeader>
              <CardTitle>Dimensions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-charcoal-700 mb-2">
                  Length: {configuration.length}" 
                  <span className="text-charcoal-500 font-normal">(12" - 120")</span>
                </label>
                <input
                  type="range"
                  min="12"
                  max="120"
                  value={configuration.length}
                  onChange={(e) => updateConfiguration('length', Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-charcoal-500 mt-1">
                  <span>12"</span>
                  <span>120"</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal-700 mb-2">
                  Depth: {configuration.depth}" 
                  <span className="text-charcoal-500 font-normal">(6" - 24")</span>
                </label>
                <input
                  type="range"
                  min="6"
                  max="24"
                  value={configuration.depth}
                  onChange={(e) => updateConfiguration('depth', Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-charcoal-500 mt-1">
                  <span>6"</span>
                  <span>24"</span>
                </div>
              </div>

              <div className="text-center p-4 bg-charcoal-50 rounded-lg">
                <p className="text-sm text-charcoal-600">Total Area</p>
                <p className="text-lg font-semibold text-charcoal-900">
                  {formatDimensions(configuration.length, configuration.depth)}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Finish Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Finish</CardTitle>
            </CardHeader>
            <CardContent>
              <Select
                value={configuration.finish}
                onChange={(e) => updateConfiguration('finish', e.target.value)}
                options={finishOptions}
                placeholder="Select a finish"
              />
              {configuration.finish && (
                <p className="text-sm text-charcoal-600 mt-2">
                  {finishes.find(f => f.id === configuration.finish)?.description}
                </p>
              )}
            </CardContent>
          </Card>

          {/* Bracket Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Bracket Style</CardTitle>
            </CardHeader>
            <CardContent>
              <Select
                value={configuration.bracket}
                onChange={(e) => updateConfiguration('bracket', e.target.value)}
                options={bracketOptions}
                placeholder="Select bracket style"
              />
              {configuration.bracket && (
                <p className="text-sm text-charcoal-600 mt-2">
                  {brackets.find(b => b.id === configuration.bracket)?.description}
                </p>
              )}
            </CardContent>
          </Card>

          {/* Quantity */}
          <Card>
            <CardHeader>
              <CardTitle>Quantity</CardTitle>
            </CardHeader>
            <CardContent>
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
            </CardContent>
          </Card>
        </div>

        {/* Summary */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-charcoal-600">Wood Type:</span>
                  <span className="font-medium">{woodTypes[0]?.name || 'Walnut'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal-600">Dimensions:</span>
                  <span className="font-medium">
                    {formatDimensions(configuration.length, configuration.depth)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal-600">Finish:</span>
                  <span className="font-medium">
                    {finishes.find(f => f.id === configuration.finish)?.name || 'Not selected'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal-600">Brackets:</span>
                  <span className="font-medium">
                    {brackets.find(b => b.id === configuration.bracket)?.name || 'Not selected'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal-600">Quantity:</span>
                  <span className="font-medium">{quantity}</span>
                </div>
              </div>

              <div className="border-t border-charcoal-200 pt-4">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total:</span>
                  <span className="text-walnut-700">
                    {configuration.finish && configuration.bracket ? 
                      formatPrice(calculatePrice(
                        { base_price: 100 } as any,
                        configuration,
                        woodTypes[0],
                        finishes.find(f => f.id === configuration.finish)!,
                        brackets.find(b => b.id === configuration.bracket)!
                      ) * quantity) : 
                      'Select options'
                    }
                  </span>
                </div>
              </div>

              <Button
                onClick={handleAddToCart}
                className="w-full"
                size="lg"
                disabled={!configuration.finish || !configuration.bracket}
              >
                Add to Cart
              </Button>

              <div className="text-sm text-charcoal-600 text-center space-y-1">
                <p>✓ Free shipping on orders over $200</p>
                <p>✓ 30-day return guarantee</p>
                <p>✓ Handcrafted to order</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
