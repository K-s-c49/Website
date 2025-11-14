import httpStatus from 'http-status';
import { Order } from '../models/Order.js';
import { Cart } from '../models/Cart.js';
import { ApiError } from '../utils/ApiError.js';

export async function createOrderFromCart(user, payload) {
  const cart = await Cart.findOne({ user: user.id }).populate('items.product');
  if (!cart || cart.items.length === 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Cart is empty');
  }

  const items = cart.items.map((item) => ({
    product: item.product.id,
    name: item.product.name,
    quantity: item.quantity,
    price: item.product.salePrice ?? item.product.price,
    image: item.product.images?.[0],
  }));

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = payload.shipping ?? 0;
  const tax = payload.tax ?? 0;
  const total = subtotal + shipping + tax;

  const order = await Order.create({
    user: user.id,
    items,
    subtotal,
    shipping,
    tax,
    total,
    paymentStatus: 'pending',
    fulfillmentStatus: 'pending',
    shippingAddress: payload.shippingAddress,
    notes: payload.notes,
  });

  await Cart.updateOne({ user: user.id }, { $set: { items: [] } });

  return order;
}

export async function listOrders(query = {}, options = {}) {
  const { page = 1, limit = 10 } = options;
  const skip = (page - 1) * limit;

  const [items, total] = await Promise.all([
    Order.find(query).populate('user', 'firstName lastName email').sort({ createdAt: -1 }).skip(skip).limit(limit),
    Order.countDocuments(query),
  ]);

  return {
    items,
    pagination: {
      total,
      page,
      pages: Math.ceil(total / limit),
    },
  };
}

export async function updateOrderStatus(id, updates) {
  const order = await Order.findByIdAndUpdate(id, updates, { new: true });
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  }
  return order;
}




