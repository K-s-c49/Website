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
  const updates = { ...req.body };
  
  // Handle existing images from FormData
  let existingImages = [];
  if (updates.existingImages) {
    try {
      existingImages = JSON.parse(updates.existingImages);
      delete updates.existingImages; // Remove from updates object
    } catch (e) {
      // If parsing fails, ignore
    }
  }
  
  // If new images are uploaded, merge with existing images
  if (req.files && req.files.length > 0) {
    const newImages = req.files.map((file) => `/uploads/${file.filename}`);
    updates.images = [...existingImages, ...newImages];
  } else if (existingImages.length > 0) {
    // Only existing images, no new ones
    updates.images = existingImages;
  }
  
  const product = await updateProduct(req.params.id, updates);
  res.status(httpStatus.OK).json(new ApiResponse(httpStatus.OK, product, 'Product updated'));
});

export const deleteProductController = asyncHandler(async (req, res) => {
  await deleteProduct(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});






