'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { CheckCircle, Package, Home } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const paymentIntent = searchParams.get('payment_intent');

  useEffect(() => {
    // Track successful purchase
    if (paymentIntent) {
      // Analytics tracking would go here
      console.log('Payment successful:', paymentIntent);
    }
  }, [paymentIntent]);

  return (
    <div className="section-padding">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-playfair font-bold text-charcoal-900 mb-4">
              Order Confirmed!
            </h1>
            <p className="text-lg text-charcoal-600">
              Thank you for your order. We've received your payment and will begin 
              crafting your custom shelf right away.
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>What's Next?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-walnut-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-walnut-700 font-semibold text-sm">1</span>
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-charcoal-900">Order Processing</h3>
                  <p className="text-sm text-charcoal-600">
                    We'll review your order and begin wood selection within 24 hours.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-walnut-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-walnut-700 font-semibold text-sm">2</span>
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-charcoal-900">Crafting Begins</h3>
                  <p className="text-sm text-charcoal-600">
                    Our master craftsmen will cut, sand, and finish your shelf to perfection.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-walnut-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-walnut-700 font-semibold text-sm">3</span>
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-charcoal-900">Quality Check & Shipping</h3>
                  <p className="text-sm text-charcoal-600">
                    We'll inspect your shelf and ship it with care. You'll receive tracking information.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <p className="text-charcoal-600">
              You'll receive an email confirmation shortly with your order details and tracking information.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/account">
                  <Package className="h-4 w-4 mr-2" />
                  View Order History
                </Link>
              </Button>
              <Button variant="secondary" size="lg" asChild>
                <Link href="/">
                  <Home className="h-4 w-4 mr-2" />
                  Continue Shopping
                </Link>
              </Button>
            </div>
          </div>

          <div className="mt-12 p-6 bg-walnut-50 rounded-xl">
            <h3 className="font-playfair text-lg font-semibold text-charcoal-900 mb-2">
              Questions About Your Order?
            </h3>
            <p className="text-charcoal-600 mb-4">
              Our customer service team is here to help with any questions about your custom shelf.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:hello@woodenshelfco.com"
                className="text-walnut-700 hover:text-walnut-800 font-medium"
              >
                hello@woodenshelfco.com
              </a>
              <span className="hidden sm:block text-charcoal-400">•</span>
              <a
                href="tel:+15551234567"
                className="text-walnut-700 hover:text-walnut-800 font-medium"
              >
                (555) 123-4567
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
