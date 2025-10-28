import { Product, WoodType, Finish, Bracket, ProductConfiguration } from '@/lib/types/product';

export function calculatePrice(
  product: Product,
  configuration: ProductConfiguration,
  woodType: WoodType,
  finish: Finish,
  bracket: Bracket
): number {
  // Base price calculation
  let price = product.base_price;
  
  // Apply wood type multiplier
  price *= woodType.price_multiplier;
  
  // Apply finish modifier
  price += finish.price_modifier;
  
  // Add bracket price
  price += bracket.price;
  
  // Calculate area-based pricing
  const area = configuration.length * configuration.depth;
  const baseArea = product.default_length * product.default_depth;
  const areaMultiplier = area / baseArea;
  
  // Apply area multiplier (minimum 0.5x, maximum 2x)
  const clampedMultiplier = Math.max(0.5, Math.min(2, areaMultiplier));
  price *= clampedMultiplier;
  
  return Math.round(price * 100) / 100; // Round to 2 decimal places
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
}

export function calculateShipping(length: number, depth: number): number {
  // Simple shipping calculation based on dimensions
  const area = length * depth;
  
  if (area <= 1000) {
    return 25; // Small shelf
  } else if (area <= 2500) {
    return 45; // Medium shelf
  } else {
    return 75; // Large shelf
  }
}
