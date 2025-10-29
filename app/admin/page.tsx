'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/lib/hooks/useAuth';
import { createClient } from '@/lib/supabase/client';
import { Package, Users, ShoppingCart, DollarSign } from 'lucide-react';
import { Database } from '@/lib/types/database';

type Order = Database['public']['Tables']['orders']['Row'];

export default function AdminDashboard() {
  const { user, loading } = useAuth();
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    totalUsers: 0,
  });
  const [loadingStats, setLoadingStats] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
      return;
    }

    if (user) {
      fetchStats();
    }
  }, [user, loading, router]);

  const fetchStats = async () => {
    try {
      const [productsRes, ordersRes, usersRes] = await Promise.all([
        supabase.from('products').select('id', { count: 'exact' }),
        supabase.from('orders').select('id, total_amount', { count: 'exact' }),
        supabase.auth.admin.listUsers(),
      ]);

      const totalProducts = productsRes.count || 0;
      const totalOrders = ordersRes.count || 0;
      const totalRevenue = (ordersRes.data as Order[] | null)?.reduce((sum: number, order: Order) => sum + order.total_amount, 0) || 0;
      const totalUsers = usersRes.data?.users?.length || 0;

      setStats({
        totalProducts,
        totalOrders,
        totalRevenue,
        totalUsers,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoadingStats(false);
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
        <div className="mb-8">
          <h1 className="text-3xl font-playfair font-bold text-charcoal-900 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-charcoal-600">
            Manage your store and track performance
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-walnut-100 rounded-lg">
                  <Package className="h-6 w-6 text-walnut-700" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-charcoal-600">Products</p>
                  <p className="text-2xl font-bold text-charcoal-900">
                    {loadingStats ? '...' : stats.totalProducts}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-walnut-100 rounded-lg">
                  <ShoppingCart className="h-6 w-6 text-walnut-700" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-charcoal-600">Orders</p>
                  <p className="text-2xl font-bold text-charcoal-900">
                    {loadingStats ? '...' : stats.totalOrders}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-walnut-100 rounded-lg">
                  <DollarSign className="h-6 w-6 text-walnut-700" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-charcoal-600">Revenue</p>
                  <p className="text-2xl font-bold text-charcoal-900">
                    {loadingStats ? '...' : `$${stats.totalRevenue.toLocaleString()}`}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-walnut-100 rounded-lg">
                  <Users className="h-6 w-6 text-walnut-700" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-charcoal-600">Users</p>
                  <p className="text-2xl font-bold text-charcoal-900">
                    {loadingStats ? '...' : stats.totalUsers}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Product Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-charcoal-600 mb-4">
                Add, edit, and manage your product catalog
              </p>
              <Button asChild>
                <a href="/admin/products">Manage Products</a>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Order Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-charcoal-600 mb-4">
                View and process customer orders
              </p>
              <Button variant="secondary">
                View Orders
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-charcoal-600 mb-4">
                Track sales performance and customer insights
              </p>
              <Button variant="secondary">
                View Analytics
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
