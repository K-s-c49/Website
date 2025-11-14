import slugify from 'slugify';
import httpStatus from 'http-status';
import { Product } from '../models/Product.js';
import { ApiError } from '../utils/ApiError.js';

export async function listProducts({ page = 1, limit = 12, search, category }) {
  const query = {};
  if (search) {
    query.$text = { $search: search };
  }
  if (category) {
    query.category = category;
  }

  const skip = (page - 1) * limit;
  const [items, total] = await Promise.all([
    Product.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Product.countDocuments(query),
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

export async function getProductById(id) {
  const product = await Product.findById(id);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  return product;
}

export async function createProduct(data) {
  const payload = { ...data };
  payload.slug = data.slug ?? slugify(data.name, { lower: true, strict: true });
  const product = await Product.create(payload);
  return product;
}

export async function updateProduct(id, updates) {
  if (updates.name && !updates.slug) {
    updates.slug = slugify(updates.name, { lower: true, strict: true });
  }
  const product = await Product.findByIdAndUpdate(id, updates, { new: true });
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  return product;
}

export async function deleteProduct(id) {
  const product = await Product.findByIdAndDelete(id);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  return product;
}




