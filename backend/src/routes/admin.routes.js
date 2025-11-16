import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth.middleware.js';
import { getUsers, toggleUserStatus } from '../controllers/admin.controller.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { param } from 'express-validator';

const router = Router();

router.use(authenticate, authorize('admin'));

router.get('/users', getUsers);
router.patch('/users/:userId/status', param('userId').isMongoId(), validateRequest, toggleUserStatus);

export default router;






