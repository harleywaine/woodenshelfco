export interface Product {
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
}

export interface WoodType {
  id: string;
  name: string;
  description: string;
  color_hex: string;
  price_multiplier: number;
  image_url: string;
  created_at: string;
}

export interface Finish {
  id: string;
  name: string;
  description: string;
  price_modifier: number;
  image_url: string;
  created_at: string;
}

export interface Bracket {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  created_at: string;
}

export interface ProductConfiguration {
  length: number;
  depth: number;
  finish: string;
  bracket: string;
}

export interface ProductFilters {
  wood_type?: string;
  min_price?: number;
  max_price?: number;
  min_length?: number;
  max_length?: number;
  finish?: string;
  bracket?: string;
}
