'use client';

import { useCart } from '@/lib/hooks/useCart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { formatPrice } from '@/lib/utils/formatters';
import Link from 'next/link';

export function CartSummary() {
  const { cart, totalPrice, clearCart } = useCart();

  const shipping = totalPrice >= 200 ? 0 : 25;
  const tax = totalPrice * 0.08; // 8% tax
  const finalTotal = totalPrice + shipping + tax;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Price Breakdown */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-charcoal-600">Subtotal</span>
            <span className="text-charcoal-900">{formatPrice(totalPrice)}</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-charcoal-600">Shipping</span>
            <span className="text-charcoal-900">
              {shipping === 0 ? 'Free' : formatPrice(shipping)}
            </span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-charcoal-600">Tax</span>
            <span className="text-charcoal-900">{formatPrice(tax)}</span>
          </div>
          
          <div className="border-t border-charcoal-200 pt-2">
            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span className="text-walnut-700">{formatPrice(finalTotal)}</span>
            </div>
          </div>
        </div>

        {/* Shipping Info */}
        {shipping > 0 && (
          <div className="bg-walnut-50 rounded-lg p-3">
            <p className="text-sm text-walnut-800">
              Add {formatPrice(200 - totalPrice)} more for free shipping!
            </p>
          </div>
        )}

        {/* Checkout Button */}
        <Button className="w-full" size="lg" asChild>
          <Link href="/checkout">
            Proceed to Checkout
          </Link>
        </Button>

        {/* Clear Cart */}
        <Button
          variant="ghost"
          onClick={clearCart}
          className="w-full text-charcoal-500 hover:text-red-600"
        >
          Clear Cart
        </Button>

        {/* Trust Signals */}
        <div className="text-xs text-charcoal-500 text-center space-y-1 pt-4 border-t border-charcoal-100">
          <p>✓ Secure checkout</p>
          <p>✓ 30-day returns</p>
          <p>✓ Free shipping over $200</p>
        </div>
      </CardContent>
    </Card>
  );
}
