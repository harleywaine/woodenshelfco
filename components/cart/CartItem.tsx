'use client';

import Image from 'next/image';
import { CartItem as CartItemType } from '@/lib/types/cart';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { useCart } from '@/lib/hooks/useCart';
import { formatPrice, formatDimensions } from '@/lib/utils/formatters';
import { Minus, Plus, Trash2 } from 'lucide-react';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          {/* Product Image */}
          <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-charcoal-100">
            <Image
              src={item.image_url}
              alt={item.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-playfair font-semibold text-charcoal-900 mb-1">
              {item.name}
            </h3>
            <p className="text-sm text-charcoal-600 capitalize mb-2">
              {item.wood_type} • {formatDimensions(item.length, item.depth)}
            </p>
            <p className="text-sm text-charcoal-500 mb-3">
              {item.finish} • {item.bracket}
            </p>

            {/* Quantity Controls */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="w-8 h-8 rounded-lg border border-charcoal-300 flex items-center justify-center hover:bg-charcoal-50 transition-colors"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-8 text-center font-medium">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="w-8 h-8 rounded-lg border border-charcoal-300 flex items-center justify-center hover:bg-charcoal-50 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <button
                onClick={() => removeItem(item.id)}
                className="text-charcoal-400 hover:text-red-600 transition-colors p-1"
                title="Remove item"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Price */}
          <div className="text-right">
            <p className="text-lg font-semibold text-charcoal-900">
              {formatPrice(item.total_price)}
            </p>
            <p className="text-sm text-charcoal-500">
              {formatPrice(item.unit_price)} each
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
