'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/lib/hooks/useAuth';
import { createClient } from '@/lib/supabase/client';
import { Order } from '@/lib/types/cart';
import { formatDate, formatOrderStatus, formatPrice } from '@/lib/utils/formatters';

export default function AccountPage() {
  const { user, signOut, loading } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
      return;
    }

    if (user) {
      fetchOrders();
    }
  }, [user, loading, router]);

  const fetchOrders = async () => {
    if (!user?.id) {
      setOrdersLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setOrdersLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
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
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-playfair font-bold text-charcoal-900">
              My Account
            </h1>
            <p className="mt-2 text-charcoal-600">
              Manage your orders and account settings
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Account Info */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-charcoal-700">Email</p>
                    <p className="text-sm text-charcoal-600">{user.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-charcoal-700">Member since</p>
                    <p className="text-sm text-charcoal-600">
                      {formatDate(user.created_at)}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={handleSignOut}
                    className="w-full"
                  >
                    Sign out
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Order History */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Order History</CardTitle>
                  <CardDescription>
                    Track your custom shelf orders
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {ordersLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-walnut-700"></div>
                    </div>
                  ) : orders.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-charcoal-500 mb-4">No orders yet</p>
                      <Button asChild>
                        <a href="/shop">Start Shopping</a>
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div
                          key={order.id}
                          className="border border-charcoal-200 rounded-lg p-4"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <p className="font-medium text-charcoal-900">
                                Order #{order.id.slice(-8)}
                              </p>
                              <p className="text-sm text-charcoal-600">
                                {formatDate(order.created_at)}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium text-charcoal-900">
                                {formatPrice(order.total_amount)}
                              </p>
                              <p className="text-sm text-charcoal-600">
                                {formatOrderStatus(order.status)}
                              </p>
                            </div>
                          </div>
                          <div className="space-y-2">
                            {order.items.map((item, index) => (
                              <div key={index} className="flex justify-between text-sm">
                                <span className="text-charcoal-700">
                                  {item.name} ({item.wood_type})
                                </span>
                                <span className="text-charcoal-600">
                                  {item.quantity} × {formatPrice(item.unit_price)}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
