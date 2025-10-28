import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe/server';
import { createClient } from '@/lib/supabase/server';
import { headers } from 'next/headers';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = headers().get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'No signature provided' },
      { status: 400 }
    );
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    console.error('Webhook signature verification failed:', error);
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    );
  }

  try {
    if (!stripe) {
      console.log('Stripe not configured, skipping webhook processing');
      return NextResponse.json({ received: true });
    }

    const supabase = createClient();

    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object;
        
        // Create order in Supabase
        const { data: order, error } = await supabase
          .from('orders')
          .insert({
            stripe_payment_intent_id: paymentIntent.id,
            status: 'processing',
            total_amount: paymentIntent.amount / 100,
            shipping_address: JSON.parse(paymentIntent.metadata.shipping_address || '{}'),
            items: [], // This would be populated with actual cart items
          })
          .select()
          .single();

        if (error) {
          console.error('Error creating order:', error);
          return NextResponse.json(
            { error: 'Failed to create order' },
            { status: 500 }
          );
        }

        console.log('Order created:', order);
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object;
        console.log('Payment failed:', paymentIntent.id);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook handler error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}
