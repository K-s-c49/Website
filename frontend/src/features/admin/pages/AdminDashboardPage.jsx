import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { SectionHeader } from '@/components/common/SectionHeader';
import { fetchProducts } from '@/features/products/productSlice';
import { fetchAdminOrders } from '@/features/orders/orderSlice';
import { fetchAdminUsers } from '../adminSlice';

/**
 * High-level operational dashboard to illustrate admin experience.
 * Replace mock calculations with real analytics queries when backend is available.
 */
export function AdminDashboardPage() {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.items);
  const orders = useAppSelector((state) => state.orders.adminItems);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchAdminOrders());
    dispatch(fetchAdminUsers());
  }, [dispatch]);

  const stats = useMemo(() => {
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    const averageOrderValue = orders.length ? totalRevenue / orders.length : 0;
    const lowStock = products.filter((product) => product.stock < 20);
    const topProducts = [...products]
      .filter((product) => product.reviews)
      .sort((a, b) => (b.reviews ?? 0) - (a.reviews ?? 0))
      .slice(0, 5);
    return {
      totalRevenue,
      orderCount: orders.length,
      averageOrderValue,
      lowStock,
      topProducts,
    };
  }, [orders, products]);

  return (
    <div className="space-y-10">
      <SectionHeader
        eyebrow="Overview"
        title="Store performance snapshot"
        description="Monitor fulfillment velocity, catalogue health, and customer engagement at a glance."
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Total revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold text-slate-900">{formatCurrency(stats.totalRevenue)}</p>
            <p className="text-xs text-slate-500">Last 30 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold text-slate-900">{stats.orderCount}</p>
            <p className="text-xs text-slate-500">Completed since launch</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Average order value</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold text-slate-900">{formatCurrency(stats.averageOrderValue)}</p>
            <p className="text-xs text-slate-500">Calculated across all orders</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Low stock alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold text-slate-900">{stats.lowStock.length}</p>
            <p className="text-xs text-slate-500">Products below safety threshold</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Low inventory</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stats.lowStock.map((product) => (
                  <TableRow key={product.id ?? product._id}>
                    <TableCell className="font-medium text-slate-900">{product.name}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>
                      <Badge variant="outline">Reorder</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top rated products</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Reviews</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stats.topProducts.map((product) => (
                  <TableRow key={product.id ?? product._id}>
                    <TableCell className="font-medium text-slate-900">{product.name}</TableCell>
                    <TableCell>{product.rating.toFixed(1)}</TableCell>
                    <TableCell>{product.reviews}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

