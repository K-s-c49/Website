import httpStatus from 'http-status';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import {
  createProduct,
  deleteProduct,
  getProductById,
  listProducts,
  updateProduct,
} from '../services/product.service.js';

export const getProducts = asyncHandler(async (req, res) => {
  const result = await listProducts({
    page: Number(req.query.page) || 1,
    limit: Number(req.query.limit) || 12,
    search: req.query.search,
    category: req.query.category,
  });
  res.status(httpStatus.OK).json(new ApiResponse(httpStatus.OK, result));
});

export const getProduct = asyncHandler(async (req, res) => {
  const product = await getProductById(req.params.id);
  res.status(httpStatus.OK).json(new ApiResponse(httpStatus.OK, product));
});

export const createProductController = asyncHandler(async (req, res) => {
  const product = await createProduct({
    ...req.body,
    images: req.files?.map((file) => `/uploads/${file.filename}`) ?? [],
  });
  res.status(httpStatus.CREATED).json(new ApiResponse(httpStatus.CREATED, product, 'Product created'));
});

export const updateProductController = asyncHandler(async (req, res) => {
  const product = await updateProduct(req.params.id, req.body);
  res.status(httpStatus.OK).json(new ApiResponse(httpStatus.OK, product, 'Product updated'));
});

export const deleteProductController = asyncHandler(async (req, res) => {
  await deleteProduct(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});




