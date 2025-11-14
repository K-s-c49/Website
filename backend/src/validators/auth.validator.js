import { body } from 'express-validator';

export const registerValidation = [
  body('firstName').isString().trim().notEmpty(),
  body('lastName').isString().trim().notEmpty(),
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 8 }),
];

export const loginValidation = [
  body('email').isEmail().normalizeEmail(),
  body('password').isString().notEmpty(),
];

export const refreshValidation = [body('refreshToken').isString().notEmpty()];

export const forgotPasswordValidation = [body('email').isEmail()];

export const resetPasswordValidation = [
  body('token').isString().notEmpty(),
  body('password').isLength({ min: 8 }),
];

export const updateProfileValidation = [
  body('firstName').optional().isString(),
  body('lastName').optional().isString(),
  body('address').optional().isObject(),
];




