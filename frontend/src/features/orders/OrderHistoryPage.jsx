import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { fetchOrders } from './orderSlice';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { EmptyState } from '@/components/common/EmptyState';
import { ShoppingCart } from 'lucide-react';
import { ROUTES } from '@/constants';

const statusMap = {
  pending: { label: 'Pending', variant: 'outline' },
  processing: { label: 'Processing', variant: 'default' },
  shipped: { label: 'Shipped', variant: 'default' },
  delivered: { label: 'Delivered', variant: 'secondary' },
  cancelled: { label: 'Cancelled', variant: 'outline' },
};

export function OrderHistoryPage() {
  const dispatch = useAppDispatch();
  const { items, status } = useAppSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  if (status === 'loading') {
    return <LoadingSpinner label="Loading your orders..." />;
  }

  if (!items.length) {
    return (
      <div className="container py-16">
        <EmptyState
          icon={ShoppingCart}
          title="No orders yet"
          description="Place your first order to see it appear here."
          action={{ label: 'Shop products', to: ROUTES.products }}
        />
      </div>
    );
  }

  return (
    <div className="container space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Order history</h1>
        <p className="text-sm text-slate-500">Track fulfillment status and download invoices.</p>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((order) => (
            <TableRow key={order.id ?? order._id}>
              <TableCell className="font-medium text-slate-900">{order.reference ?? order.id ?? order._id}</TableCell>
              <TableCell>{formatDate(order.createdAt)}</TableCell>
              <TableCell>
                <Badge variant={statusMap[order.fulfillmentStatus]?.variant}>
                  {statusMap[order.fulfillmentStatus]?.label ?? order.fulfillmentStatus}
                </Badge>
              </TableCell>
              <TableCell>{order.items.length}</TableCell>
              <TableCell>{formatCurrency(order.total)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

