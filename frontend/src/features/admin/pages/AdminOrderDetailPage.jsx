import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { formatCurrency, formatDate } from '@/lib/utils';
import { fetchAdminOrders } from '@/features/orders/orderSlice';
import { ROUTES } from '@/constants';

const statusConfig = {
  pending: { label: 'Pending', variant: 'outline' },
  processing: { label: 'Processing', variant: 'default' },
  shipped: { label: 'Shipped', variant: 'default' },
  delivered: { label: 'Delivered', variant: 'secondary' },
  cancelled: { label: 'Cancelled', variant: 'outline' },
};

export function AdminOrderDetailPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { adminItems, adminStatus } = useAppSelector((state) => state.orders);

  useEffect(() => {
    if (adminItems.length === 0) {
      dispatch(fetchAdminOrders());
    }
  }, [dispatch, adminItems.length]);

  const order = adminItems.find((o) => (o.id ?? o._id) === orderId);

  if (adminStatus === 'loading') {
    return <LoadingSpinner label="Loading order..." />;
  }

  if (!order) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate(ROUTES.adminOrders)}>
            ← Back to Orders
          </Button>
        </div>
        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
          <p className="text-sm text-red-600">Order not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Button variant="ghost" size="sm" onClick={() => navigate(ROUTES.adminOrders)}>
            ← Back to Orders
          </Button>
          <h1 className="mt-4 text-2xl font-semibold text-slate-900">Order {order.reference ?? order.id ?? order._id}</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Order Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Status Card */}
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Order Status</h2>
            <div className="flex items-center gap-4">
              <Badge variant={statusConfig[order.fulfillmentStatus]?.variant}>
                {statusConfig[order.fulfillmentStatus]?.label ?? order.fulfillmentStatus}
              </Badge>
              <p className="text-sm text-slate-600">Placed on {formatDate(order.createdAt)}</p>
            </div>
          </div>

          {/* Items Card */}
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Items</h2>
            <div className="space-y-4">
              {order.items?.map((item) => (
                <div key={item.id ?? item._id} className="flex items-center justify-between border-b border-slate-200 pb-4 last:border-0">
                  <div className="flex-1">
                    <p className="font-medium text-slate-900">{item.name}</p>
                    <p className="text-sm text-slate-600">Quantity: {item.quantity}</p>
                  </div>
                  <p className="font-semibold text-slate-900">{formatCurrency(item.price * item.quantity)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Pricing Summary */}
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-900 mb-4">Pricing</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Subtotal</span>
                <span className="text-slate-900">{formatCurrency(order.subtotal ?? 0)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Shipping</span>
                <span className="text-slate-900">{formatCurrency(order.shippingCost ?? 0)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Tax</span>
                <span className="text-slate-900">{formatCurrency(order.tax ?? 0)}</span>
              </div>
              <div className="border-t border-slate-200 pt-2 flex justify-between">
                <span className="font-semibold text-slate-900">Total</span>
                <span className="font-semibold text-slate-900">{formatCurrency(order.total)}</span>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          {order.shippingAddress && (
            <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-900 mb-3">Shipping Address</h3>
              <address className="not-italic text-sm text-slate-600 space-y-1">
                <p className="font-medium text-slate-900">{order.shippingAddress.fullName}</p>
                <p>{order.shippingAddress.streetAddress}</p>
                {order.shippingAddress.streetAddress2 && <p>{order.shippingAddress.streetAddress2}</p>}
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                </p>
                <p>{order.shippingAddress.country}</p>
              </address>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
