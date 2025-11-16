import { formatCurrency } from '@/lib/utils';

export const orders = [
  {
    id: 'ord-1001',
    reference: 'CC-23948',
    userId: 'user-1',
    status: 'delivered',
    total: 378.0,
    createdAt: '2025-11-01T14:32:00.000Z',
    paymentMethod: 'credit_card',
    shippingMethod: 'express',
    items: [
      { productId: 'prod-1', name: 'Noise Cancelling Headphones', quantity: 1, price: 249 },
      { productId: 'prod-3', name: 'Smart Home Speaker', quantity: 1, price: 129 },
    ],
    shippingAddress: {
      fullName: 'Alex Johnson',
      line1: '123 Market Street',
      city: 'San Francisco',
      state: 'CA',
      postalCode: '94105',
      country: 'USA',
    },
  },
  {
    id: 'ord-1002',
    reference: 'CC-23949',
    userId: 'user-2',
    status: 'processing',
    total: 109.0,
    createdAt: '2025-11-07T09:24:00.000Z',
    paymentMethod: 'paypal',
    shippingMethod: 'standard',
    items: [
      { productId: 'prod-5', name: 'Premium Skincare Set', quantity: 1, price: 109 },
    ],
    shippingAddress: {
      fullName: 'Priya Patel',
      line1: '678 Ocean Avenue',
      city: 'Miami',
      state: 'FL',
      postalCode: '33101',
      country: 'USA',
    },
  },
];

export const summarizeOrder = (order) => ({
  id: order.id,
  reference: order.reference,
  status: order.status,
  total: formatCurrency(order.total),
  createdAt: order.createdAt,
  items: order.items.length,
});






