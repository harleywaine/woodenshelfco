export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string;
          name: string;
          slug: string;
          wood_type: string;
          description: string;
          base_price: number;
          default_length: number;
          default_depth: number;
          default_finish: string;
          default_bracket: string;
          min_length: number;
          max_length: number;
          min_depth: number;
          max_depth: number;
          image_urls: string[];
          stock_count: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          wood_type: string;
          description: string;
          base_price: number;
          default_length: number;
          default_depth: number;
          default_finish: string;
          default_bracket: string;
          min_length: number;
          max_length: number;
          min_depth: number;
          max_depth: number;
          image_urls: string[];
          stock_count: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          wood_type?: string;
          description?: string;
          base_price?: number;
          default_length?: number;
          default_depth?: number;
          default_finish?: string;
          default_bracket?: string;
          min_length?: number;
          max_length?: number;
          min_depth?: number;
          max_depth?: number;
          image_urls?: string[];
          stock_count?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      wood_types: {
        Row: {
          id: string;
          name: string;
          description: string;
          color_hex: string;
          price_multiplier: number;
          image_url: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description: string;
          color_hex: string;
          price_multiplier: number;
          image_url: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string;
          color_hex?: string;
          price_multiplier?: number;
          image_url?: string;
          created_at?: string;
        };
      };
      finishes: {
        Row: {
          id: string;
          name: string;
          description: string;
          price_modifier: number;
          image_url: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description: string;
          price_modifier: number;
          image_url: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string;
          price_modifier?: number;
          image_url?: string;
          created_at?: string;
        };
      };
      brackets: {
        Row: {
          id: string;
          name: string;
          description: string;
          price: number;
          image_url: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description: string;
          price: number;
          image_url: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string;
          price?: number;
          image_url?: string;
          created_at?: string;
        };
      };
      orders: {
        Row: {
          id: string;
          user_id: string | null;
          stripe_payment_intent_id: string;
          status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
          total_amount: number;
          shipping_address: {
            name: string;
            line1: string;
            line2?: string;
            city: string;
            state: string;
            postal_code: string;
            country: string;
          };
          items: {
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
          }[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          stripe_payment_intent_id: string;
          status?: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
          total_amount: number;
          shipping_address: {
            name: string;
            line1: string;
            line2?: string;
            city: string;
            state: string;
            postal_code: string;
            country: string;
          };
          items: {
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
          }[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          stripe_payment_intent_id?: string;
          status?: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
          total_amount?: number;
          shipping_address?: {
            name: string;
            line1: string;
            line2?: string;
            city: string;
            state: string;
            postal_code: string;
            country: string;
          };
          items?: {
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
          }[];
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
