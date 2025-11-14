import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatCurrency, formatDate } from '@/lib/utils';
import { fetchAdminOrders } from '@/features/orders/orderSlice';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

const statusConfig = {
  pending: { label: 'Pending', variant: 'outline' },
  processing: { label: 'Processing', variant: 'default' },
  shipped: { label: 'Shipped', variant: 'default' },
  delivered: { label: 'Delivered', variant: 'secondary' },
  cancelled: { label: 'Cancelled', variant: 'outline' },
};

export function AdminOrdersPage() {
  const dispatch = useAppDispatch();
  const { adminItems, adminStatus } = useAppSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchAdminOrders());
  }, [dispatch]);

  if (adminStatus === 'loading') {
    return <LoadingSpinner label="Loading orders..." />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Orders</h1>
        <p className="text-sm text-slate-500">Track fulfillment workflows and proactively resolve delivery issues.</p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Total</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {adminItems.map((order) => (
              <TableRow key={order.id ?? order._id}>
                <TableCell className="font-medium text-slate-900">{order.reference ?? order.id ?? order._id}</TableCell>
                <TableCell>{formatDate(order.createdAt)}</TableCell>
                <TableCell>
                  <Badge variant={statusConfig[order.fulfillmentStatus]?.variant}>
                    {statusConfig[order.fulfillmentStatus]?.label ?? order.fulfillmentStatus}
                  </Badge>
                </TableCell>
                <TableCell className="text-slate-600">
                  {order.shippingAddress?.fullName ?? 'Guest checkout'}
                </TableCell>
                <TableCell>{formatCurrency(order.total)}</TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

