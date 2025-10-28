'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/lib/hooks/useAuth';
import { createClient } from '@/lib/supabase/client';
import { Product } from '@/lib/types/product';
import { formatPrice } from '@/lib/utils/formatters';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';

export default function AdminProductsPage() {
  const { user, loading } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
      return;
    }

    if (user) {
      fetchProducts();
    }
  }, [user, loading, router]);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoadingProducts(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const toggleProductStatus = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('products')
        .update({ is_active: !currentStatus })
        .eq('id', id);

      if (error) throw error;
      fetchProducts();
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-walnut-700"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="section-padding">
      <div className="container-custom">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-playfair font-bold text-charcoal-900 mb-2">
              Product Management
            </h1>
            <p className="text-charcoal-600">
              Manage your product catalog
            </p>
          </div>
          <Button asChild>
            <a href="/admin/products/new">
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </a>
          </Button>
        </div>

        {loadingProducts ? (
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="h-20 bg-charcoal-100 rounded-lg" />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {products.map((product) => (
              <Card key={product.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-charcoal-100 rounded-lg overflow-hidden flex-shrink-0">
                        {product.image_urls[0] && (
                          <img
                            src={product.image_urls[0]}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-charcoal-900">
                          {product.name}
                        </h3>
                        <p className="text-sm text-charcoal-600 capitalize">
                          {product.wood_type} • {product.slug}
                        </p>
                        <p className="text-sm text-charcoal-500">
                          Stock: {product.stock_count} • 
                          Status: <span className={product.is_active ? 'text-green-600' : 'text-red-600'}>
                            {product.is_active ? 'Active' : 'Inactive'}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-lg font-semibold text-charcoal-900">
                          {formatPrice(product.base_price)}
                        </p>
                        <p className="text-sm text-charcoal-500">
                          {product.default_length}" × {product.default_depth}"
                        </p>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => window.open(`/shop/${product.slug}`, '_blank')}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleProductStatus(product.id, product.is_active)}
                        >
                          {product.is_active ? 'Deactivate' : 'Activate'}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => window.open(`/admin/products/${product.id}/edit`, '_blank')}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteProduct(product.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {products.length === 0 && (
              <div className="text-center py-12">
                <p className="text-charcoal-500 mb-4">No products found</p>
                <Button asChild>
                  <a href="/admin/products/new">Add your first product</a>
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
