'use client';

import { useState, useEffect } from 'react';
import { ProductGrid } from '@/components/shop/ProductGrid';
import { ProductFiltersComponent } from '@/components/shop/ProductFilters';
import { Product, ProductFilters, WoodType, Finish, Bracket } from '@/lib/types/product';
import { createClient } from '@/lib/supabase/client';
import { useCart } from '@/lib/hooks/useCart';
import { Button } from '@/components/ui/Button';
import { Grid, List, SlidersHorizontal } from 'lucide-react';

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [woodTypes, setWoodTypes] = useState<WoodType[]>([]);
  const [finishes, setFinishes] = useState<Finish[]>([]);
  const [brackets, setBrackets] = useState<Bracket[]>([]);
  const [filters, setFilters] = useState<ProductFilters>({});
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  
  const { addItem } = useCart();
  const supabase = createClient();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const fetchData = async () => {
    try {
      const [productsRes, woodTypesRes, finishesRes, bracketsRes] = await Promise.all([
        supabase.from('products').select('*').eq('is_active', true),
        supabase.from('wood_types').select('*'),
        supabase.from('finishes').select('*'),
        supabase.from('brackets').select('*'),
      ]);

      if (productsRes.error) throw productsRes.error;
      if (woodTypesRes.error) throw woodTypesRes.error;
      if (finishesRes.error) throw finishesRes.error;
      if (bracketsRes.error) throw bracketsRes.error;

      setProducts(productsRes.data || []);
      setWoodTypes(woodTypesRes.data || []);
      setFinishes(finishesRes.data || []);
      setBrackets(bracketsRes.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('products')
        .select('*')
        .eq('is_active', true);

      if (filters.wood_type) {
        query = query.eq('wood_type', filters.wood_type);
      }
      if (filters.min_price) {
        query = query.gte('base_price', filters.min_price);
      }
      if (filters.max_price) {
        query = query.lte('base_price', filters.max_price);
      }
      if (filters.min_length) {
        query = query.gte('min_length', filters.min_length);
      }
      if (filters.max_length) {
        query = query.lte('max_length', filters.max_length);
      }

      const { data, error } = await query;

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickAdd = (product: Product) => {
    // For quick add, use default configuration
    const configuration = {
      length: product.default_length,
      depth: product.default_depth,
      finish: product.default_finish,
      bracket: product.default_bracket,
    };
    
    addItem(product, configuration, 1);
  };

  const filteredProducts = products.filter(product => {
    if (filters.finish && product.default_finish !== filters.finish) return false;
    if (filters.bracket && product.default_bracket !== filters.bracket) return false;
    return true;
  });

  return (
    <div className="section-padding">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-playfair font-bold text-charcoal-900 mb-4">
            Shop Shelves
          </h1>
          <p className="text-lg text-charcoal-600">
            Discover our collection of handcrafted live edge wooden shelves
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="lg:hidden mb-4">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="w-full"
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </Button>
            </div>
            
            <div className={`${showFilters ? 'block' : 'hidden'} lg:block`}>
              <ProductFiltersComponent
                filters={filters}
                onFiltersChange={setFilters}
                woodTypes={woodTypes}
                finishes={finishes}
                brackets={brackets}
              />
            </div>
          </div>

          {/* Products */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-charcoal-600">
                {loading ? 'Loading...' : `${filteredProducts.length} products found`}
              </p>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === 'grid' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Product Grid */}
            <ProductGrid
              products={filteredProducts}
              onQuickAdd={handleQuickAdd}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
