import httpStatus from 'http-status';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { createOrderFromCart, listOrders, updateOrderStatus } from '../services/order.service.js';

export const createOrder = asyncHandler(async (req, res) => {
  const order = await createOrderFromCart(req.user, req.body);
  res.status(httpStatus.CREATED).json(new ApiResponse(httpStatus.CREATED, order, 'Order placed'));
});

export const getMyOrders = asyncHandler(async (req, res) => {
  const result = await listOrders({ user: req.user.id }, { page: req.query.page, limit: req.query.limit });
  res.status(httpStatus.OK).json(new ApiResponse(httpStatus.OK, result));
});

export const getAllOrders = asyncHandler(async (req, res) => {
  const result = await listOrders({}, { page: req.query.page, limit: req.query.limit });
  res.status(httpStatus.OK).json(new ApiResponse(httpStatus.OK, result));
});

export const updateOrder = asyncHandler(async (req, res) => {
  const order = await updateOrderStatus(req.params.id, req.body);
  res.status(httpStatus.OK).json(new ApiResponse(httpStatus.OK, order, 'Order updated'));
});






