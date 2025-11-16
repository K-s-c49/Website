import { body, param } from 'express-validator';

export const createOrderValidation = [
  body('shippingAddress').isObject().withMessage('Shipping address required'),
  body('shippingAddress.fullName').isString().notEmpty(),
  body('shippingAddress.line1').isString().notEmpty(),
  body('shippingAddress.city').isString().notEmpty(),
  body('shippingAddress.postalCode').isString().notEmpty(),
  body('shippingAddress.country').isString().notEmpty(),
  body('shipping').optional().isFloat({ min: 0 }),
  body('tax').optional().isFloat({ min: 0 }),
];

export const updateOrderValidation = [
  param('id').isMongoId(),
  body('paymentStatus').optional().isIn(['pending', 'paid', 'failed', 'refunded']),
  body('fulfillmentStatus').optional().isIn(['pending', 'processing', 'shipped', 'delivered', 'cancelled']),
];






