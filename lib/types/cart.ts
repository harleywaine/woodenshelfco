export interface CartItem {
  id: string;
  product_id: string;
  name: string;
  wood_type: string;
  finish: string;
  bracket: string;
  length: number;
  depth: number;
  quantity: number;
  unit_price: number;
  total_price: number;
  image_url: string;
}

export interface Cart {
  items: CartItem[];
  total_items: number;
  total_price: number;
}

export interface ShippingAddress {
  name: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}

export interface Order {
  id: string;
  user_id: string | null;
  stripe_payment_intent_id: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total_amount: number;
  shipping_address: ShippingAddress;
  items: CartItem[];
  created_at: string;
  updated_at: string;
}
