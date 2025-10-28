'use client';

import { useCart } from '@/lib/hooks/useCart';
import { CartItem } from '@/components/cart/CartItem';
import { CartSummary } from '@/components/cart/CartSummary';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { ShoppingCart, ArrowLeft } from 'lucide-react';

export default function CartPage() {
  const { cart, totalItems, totalPrice } = useCart();

  if (totalItems === 0) {
    return (
      <div className="section-padding">
        <div className="container-custom">
          <div className="text-center py-16">
            <div className="text-charcoal-400 mb-6">
              <ShoppingCart className="mx-auto h-16 w-16" />
            </div>
            <h1 className="text-2xl font-playfair font-bold text-charcoal-900 mb-4">
              Your cart is empty
            </h1>
            <p className="text-charcoal-600 mb-8 max-w-md mx-auto">
              Start building your perfect shelf collection. Browse our collection 
              or use our custom builder to create something unique.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/shop">
                  Browse Collection
                </Link>
              </Button>
              <Button variant="secondary" size="lg" asChild>
                <Link href="/builder">
                  Custom Builder
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="section-padding">
      <div className="container-custom">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link href="/shop">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Continue Shopping
              </Link>
            </Button>
            <h1 className="text-3xl font-playfair font-bold text-charcoal-900">
              Shopping Cart
            </h1>
          </div>
          <p className="text-charcoal-600">
            {totalItems} {totalItems === 1 ? 'item' : 'items'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cart.items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <CartSummary />
          </div>
        </div>
      </div>
    </div>
  );
}
