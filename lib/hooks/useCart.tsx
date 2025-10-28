'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Cart, CartItem } from '@/lib/types/cart';
import { Product, ProductConfiguration } from '@/lib/types/product';
import { createClient } from '@/lib/supabase/client';

interface CartContextType {
  cart: Cart;
  addItem: (product: Product, configuration: ProductConfiguration, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<Cart>({
    items: [],
    total_items: 0,
    total_price: 0,
  });

  const supabase = createClient();

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('wooden-shelf-cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCart(parsedCart);
      } catch (error) {
        console.error('Error parsing saved cart:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('wooden-shelf-cart', JSON.stringify(cart));
  }, [cart]);

  const generateItemId = (product: Product, configuration: ProductConfiguration): string => {
    return `${product.id}-${configuration.length}-${configuration.depth}-${configuration.finish}-${configuration.bracket}`;
  };

  const addItem = (product: Product, configuration: ProductConfiguration, quantity = 1) => {
    setCart((prevCart) => {
      const itemId = generateItemId(product, configuration);
      const existingItemIndex = prevCart.items.findIndex((item) => item.id === itemId);

      if (existingItemIndex > -1) {
        // Update existing item quantity
        const updatedItems = [...prevCart.items];
        updatedItems[existingItemIndex].quantity += quantity;
        updatedItems[existingItemIndex].total_price = 
          updatedItems[existingItemIndex].unit_price * updatedItems[existingItemIndex].quantity;

        const total_items = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
        const total_price = updatedItems.reduce((sum, item) => sum + item.total_price, 0);

        return {
          items: updatedItems,
          total_items,
          total_price,
        };
      } else {
        // Add new item
        const newItem: CartItem = {
          id: itemId,
          product_id: product.id,
          name: product.name,
          wood_type: product.wood_type,
          finish: configuration.finish,
          bracket: configuration.bracket,
          length: configuration.length,
          depth: configuration.depth,
          quantity,
          unit_price: product.base_price, // This should be calculated with actual pricing
          total_price: product.base_price * quantity,
          image_url: product.image_urls[0] || '',
        };

        const updatedItems = [...prevCart.items, newItem];
        const total_items = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
        const total_price = updatedItems.reduce((sum, item) => sum + item.total_price, 0);

        return {
          items: updatedItems,
          total_items,
          total_price,
        };
      }
    });
  };

  const removeItem = (itemId: string) => {
    setCart((prevCart) => {
      const updatedItems = prevCart.items.filter((item) => item.id !== itemId);
      const total_items = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
      const total_price = updatedItems.reduce((sum, item) => sum + item.total_price, 0);

      return {
        items: updatedItems,
        total_items,
        total_price,
      };
    });
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }

    setCart((prevCart) => {
      const updatedItems = prevCart.items.map((item) =>
        item.id === itemId
          ? { ...item, quantity, total_price: item.unit_price * quantity }
          : item
      );

      const total_items = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
      const total_price = updatedItems.reduce((sum, item) => sum + item.total_price, 0);

      return {
        items: updatedItems,
        total_items,
        total_price,
      };
    });
  };

  const clearCart = () => {
    setCart({
      items: [],
      total_items: 0,
      total_price: 0,
    });
  };

  const value: CartContextType = {
    cart,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems: cart.total_items,
    totalPrice: cart.total_price,
  };

  return React.createElement(CartContext.Provider, { value }, children);
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
