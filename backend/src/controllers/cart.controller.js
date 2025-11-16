import httpStatus from 'http-status';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import {
  addItemToCart,
  clearCart,
  getOrCreateCart,
  removeCartItem,
  updateCartItem,
} from '../services/cart.service.js';

export const getCart = asyncHandler(async (req, res) => {
  const cart = await getOrCreateCart(req.user.id);
  res.status(httpStatus.OK).json(new ApiResponse(httpStatus.OK, cart));
});

export const addToCart = asyncHandler(async (req, res) => {
  const cart = await addItemToCart(req.user.id, req.body.productId, req.body.quantity);
  res.status(httpStatus.OK).json(new ApiResponse(httpStatus.OK, cart, 'Item added to cart'));
});

export const updateCart = asyncHandler(async (req, res) => {
  const cart = await updateCartItem(req.user.id, req.body.productId, req.body.quantity);
  res.status(httpStatus.OK).json(new ApiResponse(httpStatus.OK, cart, 'Cart updated'));
});

export const removeFromCart = asyncHandler(async (req, res) => {
  const cart = await removeCartItem(req.user.id, req.params.productId);
  res.status(httpStatus.OK).json(new ApiResponse(httpStatus.OK, cart, 'Item removed'));
});

export const clearCartController = asyncHandler(async (req, res) => {
  await clearCart(req.user.id);
  res.status(httpStatus.OK).json(new ApiResponse(httpStatus.OK, null, 'Cart cleared'));
});






