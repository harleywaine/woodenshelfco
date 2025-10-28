'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { ProductImages } from '@/components/product/ProductImages';
import { ProductDetails } from '@/components/product/ProductDetails';
import { Product, WoodType, Finish, Bracket } from '@/lib/types/product';
import { createClient } from '@/lib/supabase/client';

export default function ProductPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [product, setProduct] = useState<Product | null>(null);
  const [woodTypes, setWoodTypes] = useState<WoodType[]>([]);
  const [finishes, setFinishes] = useState<Finish[]>([]);
  const [brackets, setBrackets] = useState<Bracket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const supabase = createClient();

  useEffect(() => {
    fetchProduct();
  }, [slug]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch product
      const { data: productData, error: productError } = await supabase
        .from('products')
        .select('*')
        .eq('slug', slug)
        .eq('is_active', true)
        .single();

      if (productError) {
        if (productError.code === 'PGRST116') {
          setError('Product not found');
        } else {
          throw productError;
        }
        return;
      }

      setProduct(productData);

      // Fetch related data
      const [woodTypesRes, finishesRes, bracketsRes] = await Promise.all([
        supabase.from('wood_types').select('*'),
        supabase.from('finishes').select('*'),
        supabase.from('brackets').select('*'),
      ]);

      if (woodTypesRes.error) throw woodTypesRes.error;
      if (finishesRes.error) throw finishesRes.error;
      if (bracketsRes.error) throw bracketsRes.error;

      setWoodTypes(woodTypesRes.data || []);
      setFinishes(finishesRes.data || []);
      setBrackets(bracketsRes.data || []);
    } catch (err) {
      console.error('Error fetching product:', err);
      setError('Failed to load product');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="animate-pulse">
              <div className="aspect-square bg-charcoal-100 rounded-xl" />
            </div>
            <div className="space-y-6">
              <div className="h-8 bg-charcoal-200 rounded w-3/4" />
              <div className="h-4 bg-charcoal-200 rounded w-1/2" />
              <div className="h-6 bg-charcoal-200 rounded w-1/3" />
              <div className="space-y-4">
                <div className="h-4 bg-charcoal-200 rounded w-full" />
                <div className="h-4 bg-charcoal-200 rounded w-5/6" />
                <div className="h-4 bg-charcoal-200 rounded w-4/6" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="section-padding">
        <div className="container-custom">
          <div className="text-center py-12">
            <h1 className="text-2xl font-playfair font-bold text-charcoal-900 mb-4">
              {error || 'Product not found'}
            </h1>
            <p className="text-charcoal-600 mb-8">
              The product you're looking for doesn't exist or has been removed.
            </p>
            <a
              href="/shop"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-walnut-700 hover:bg-walnut-800"
            >
              Back to Shop
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="section-padding">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ProductImages images={product.image_urls} name={product.name} />
          <ProductDetails
            product={product}
            woodTypes={woodTypes}
            finishes={finishes}
            brackets={brackets}
          />
        </div>
      </div>
    </div>
  );
}
