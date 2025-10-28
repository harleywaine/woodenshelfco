'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/hooks/useCart';
import { StripePaymentForm } from '@/components/checkout/StripePaymentForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { formatPrice } from '@/lib/utils/formatters';
import Link from 'next/link';
import { ArrowLeft, Lock } from 'lucide-react';

export default function CheckoutPage() {
  const { cart, totalPrice, clearCart } = useCart();
  const [shippingAddress, setShippingAddress] = useState({
    name: '',
    line1: '',
    line2: '',
    city: '',
    state: '',
    postal_code: '',
    country: 'US',
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (cart.items.length === 0) {
      router.push('/cart');
    }
  }, [cart.items.length, router]);

  const shipping = totalPrice >= 200 ? 0 : 25;
  const tax = totalPrice * 0.08;
  const finalTotal = totalPrice + shipping + tax;

  const handleOrderSuccess = () => {
    clearCart();
    router.push('/account?success=true');
  };

  if (cart.items.length === 0) {
    return null;
  }

  return (
    <div className="section-padding">
      <div className="container-custom">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link href="/cart">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Cart
              </Link>
            </Button>
            <h1 className="text-3xl font-playfair font-bold text-charcoal-900">
              Checkout
            </h1>
          </div>
          <div className="flex items-center space-x-2 text-charcoal-600">
            <Lock className="h-4 w-4" />
            <span className="text-sm">Secure checkout</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div className="space-y-8">
            {/* Shipping Address */}
            <Card>
              <CardHeader>
                <CardTitle>Shipping Address</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={shippingAddress.name}
                    onChange={(e) => setShippingAddress(prev => ({ ...prev, name: e.target.value }))}
                    className="input-field"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="input-field"
                    required
                  />
                </div>
                <input
                  type="text"
                  placeholder="Address Line 1"
                  value={shippingAddress.line1}
                  onChange={(e) => setShippingAddress(prev => ({ ...prev, line1: e.target.value }))}
                  className="input-field"
                  required
                />
                <input
                  type="text"
                  placeholder="Address Line 2 (Optional)"
                  value={shippingAddress.line2}
                  onChange={(e) => setShippingAddress(prev => ({ ...prev, line2: e.target.value }))}
                  className="input-field"
                />
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <input
                    type="text"
                    placeholder="City"
                    value={shippingAddress.city}
                    onChange={(e) => setShippingAddress(prev => ({ ...prev, city: e.target.value }))}
                    className="input-field"
                    required
                  />
                  <input
                    type="text"
                    placeholder="State"
                    value={shippingAddress.state}
                    onChange={(e) => setShippingAddress(prev => ({ ...prev, state: e.target.value }))}
                    className="input-field"
                    required
                  />
                  <input
                    type="text"
                    placeholder="ZIP Code"
                    value={shippingAddress.postal_code}
                    onChange={(e) => setShippingAddress(prev => ({ ...prev, postal_code: e.target.value }))}
                    className="input-field"
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Payment */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Information</CardTitle>
              </CardHeader>
              <CardContent>
                <StripePaymentForm
                  amount={finalTotal}
                  shippingAddress={shippingAddress}
                  onSuccess={handleOrderSuccess}
                  onError={(error) => console.error('Payment error:', error)}
                />
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Cart Items */}
                  <div className="space-y-3">
                    {cart.items.map((item) => (
                      <div key={item.id} className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-charcoal-100 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={item.image_url}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-charcoal-900 truncate">
                            {item.name}
                          </p>
                          <p className="text-xs text-charcoal-500">
                            {item.wood_type} • {item.finish}
                          </p>
                        </div>
                        <div className="text-sm text-charcoal-900">
                          {formatPrice(item.total_price)}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Price Breakdown */}
                  <div className="border-t border-charcoal-200 pt-4 space-y-2">
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
                </div>
              </CardContent>
            </Card>

            {/* Trust Signals */}
            <div className="text-center text-sm text-charcoal-500 space-y-2">
              <p>🔒 Your payment information is secure and encrypted</p>
              <p>✓ 30-day return guarantee</p>
              <p>✓ Handcrafted in the USA</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
