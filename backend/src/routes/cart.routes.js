import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware.js';
import { addToCart, clearCartController, getCart, removeFromCart, updateCart } from '../controllers/cart.controller.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { addToCartValidation, updateCartValidation, removeCartValidation } from '../validators/cart.validator.js';

const router = Router();

router.use(authenticate);

router.get('/', getCart);
router.post('/', addToCartValidation, validateRequest, addToCart);
router.patch('/', updateCartValidation, validateRequest, updateCart);
router.delete('/item/:productId', removeCartValidation, validateRequest, removeFromCart);
router.delete('/clear', clearCartController);

export default router;






