import httpStatus from 'http-status';
import { Cart } from '../models/Cart.js';
import { Product } from '../models/Product.js';
import { ApiError } from '../utils/ApiError.js';

export async function getOrCreateCart(userId) {
  let cart = await Cart.findOne({ user: userId });
  if (!cart) {
    cart = await Cart.create({ user: userId, items: [] });
  }
  await cart.populate('items.product');
  return cart;
}

export async function addItemToCart(userId, productId, quantity = 1) {
  const product = await Product.findById(productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }

  const cart = await getOrCreateCart(userId);
  const existing = cart.items.find((item) => item.product.toString() === productId);

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.items.push({ product: productId, quantity });
  }

  await cart.save();
  await cart.populate('items.product');
  return cart;
}

export async function updateCartItem(userId, productId, quantity) {
  const cart = await Cart.findOne({ user: userId });
  if (!cart) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cart not found');
  }

  const item = cart.items.find((entry) => entry.product.toString() === productId);
  if (!item) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Item not found in cart');
  }

  item.quantity = quantity;
  await cart.save();
  await cart.populate('items.product');
  return cart;
}

export async function removeCartItem(userId, productId) {
  const cart = await Cart.findOne({ user: userId });
  if (!cart) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cart not found');
  }

  cart.items = cart.items.filter((item) => item.product.toString() !== productId);
  await cart.save();
  await cart.populate('items.product');
  return cart;
}

export async function clearCart(userId) {
  await Cart.findOneAndUpdate({ user: userId }, { $set: { items: [] } });
}

