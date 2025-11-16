import { body, param } from 'express-validator';

export const createProductValidation = [
  body('name').isString().notEmpty(),
  body('description').isString().notEmpty(),
  body('price').isFloat({ gt: 0 }),
  body('stock').optional().isInt({ min: 0 }),
];

export const updateProductValidation = [
  param('id').isMongoId(),
  body('name').optional().isString(),
  body('description').optional().isString(),
  body('price').optional().isFloat({ gt: 0 }),
  body('stock').optional().isInt({ min: 0 }),
];






