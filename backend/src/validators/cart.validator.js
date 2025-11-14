import { body, param } from 'express-validator';

export const addToCartValidation = [
  body('productId').isMongoId(),
  body('quantity').optional().isInt({ min: 1 }),
];

export const updateCartValidation = [
  body('productId').isMongoId(),
  body('quantity').isInt({ min: 1 }),
];

export const removeCartValidation = [param('productId').isMongoId()];




