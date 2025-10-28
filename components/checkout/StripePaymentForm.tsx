'use client';

import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/Button';

const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY && 
  !process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY.includes('placeholder')
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  : null;

interface StripePaymentFormProps {
  amount: number;
  shippingAddress: any;
  onSuccess: () => void;
  onError: (error: string) => void;
}

function PaymentForm({ amount, shippingAddress, onSuccess, onError }: StripePaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setMessage(null);

    try {
      // Create payment intent
      const response = await fetch('/api/stripe/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: Math.round(amount * 100), // Convert to cents
          shippingAddress,
        }),
      });

      const { clientSecret } = await response.json();

      if (!clientSecret) {
        throw new Error('Failed to create payment intent');
      }

      // Confirm payment
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/checkout/success`,
        },
        redirect: 'if_required',
      });

      if (error) {
        if (error.type === 'card_error' || error.type === 'validation_error') {
          setMessage(error.message || 'An error occurred');
        } else {
          setMessage('An unexpected error occurred');
        }
        onError(error.message || 'Payment failed');
      } else {
        onSuccess();
      }
    } catch (error) {
      console.error('Payment error:', error);
      setMessage('An error occurred while processing your payment');
      onError('Payment processing failed');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      
      {message && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-sm text-red-600">{message}</p>
        </div>
      )}

      <Button
        type="submit"
        className="w-full"
        size="lg"
        disabled={!stripe || !elements || isProcessing}
        isLoading={isProcessing}
      >
        {isProcessing ? 'Processing...' : `Pay ${new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(amount)}`}
      </Button>
    </form>
  );
}

export function StripePaymentForm(props: StripePaymentFormProps) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    if (!stripePromise) {
      props.onError('Stripe not configured');
      return;
    }

    // Create payment intent on mount
    fetch('/api/stripe/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: Math.round(props.amount * 100),
        shippingAddress: props.shippingAddress,
      }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))
      .catch((error) => {
        console.error('Error creating payment intent:', error);
        props.onError('Failed to initialize payment');
      });
  }, [props.amount, props.shippingAddress, props.onError]);

  if (!stripePromise) {
    return (
      <div className="text-center py-8">
        <p className="text-charcoal-600 mb-4">Payment processing not configured</p>
        <p className="text-sm text-charcoal-500">Please contact support to complete your order</p>
      </div>
    );
  }

  if (!clientSecret) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-walnut-700"></div>
      </div>
    );
  }

  const options = {
    clientSecret,
    appearance: {
      theme: 'stripe' as const,
      variables: {
        colorPrimary: '#6B4E34',
        colorBackground: '#F8F6F3',
        colorText: '#2F2F2F',
        colorDanger: '#ef4444',
        fontFamily: 'Inter, system-ui, sans-serif',
        spacingUnit: '4px',
        borderRadius: '8px',
      },
    },
  };

  return (
    <Elements options={options} stripe={stripePromise}>
      <PaymentForm {...props} />
    </Elements>
  );
}
