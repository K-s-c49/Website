import { Router } from 'express';
import {
  getProducts,
  getProduct,
  createProductController,
  updateProductController,
  deleteProductController,
} from '../controllers/product.controller.js';
import { authenticate, authorize } from '../middleware/auth.middleware.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { createProductValidation, updateProductValidation } from '../validators/product.validator.js';
import { upload } from '../providers/multer.js';

const router = Router();

router.get('/', getProducts);
router.get('/:id', getProduct);

router.post(
  '/',
  authenticate,
  authorize('admin'),
  upload.array('images', 5),
  createProductValidation,
  validateRequest,
  createProductController,
);

router.patch('/:id', authenticate, authorize('admin'), updateProductValidation, validateRequest, updateProductController);
router.delete('/:id', authenticate, authorize('admin'), deleteProductController);

export default router;




