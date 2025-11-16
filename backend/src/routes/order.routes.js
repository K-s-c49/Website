import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth.middleware.js';
import { createOrder, getAllOrders, getMyOrders, updateOrder } from '../controllers/order.controller.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { createOrderValidation, updateOrderValidation } from '../validators/order.validator.js';

const router = Router();

router.use(authenticate);

router.post('/', createOrderValidation, validateRequest, createOrder);
router.get('/me', getMyOrders);

router.get('/', authorize('admin'), getAllOrders);
router.patch('/:id', authorize('admin'), updateOrderValidation, validateRequest, updateOrder);

export default router;






