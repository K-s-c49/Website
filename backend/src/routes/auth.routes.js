import { Router } from 'express';
import {
  register,
  login,
  refreshToken,
  logout,
  forgotPassword,
  resetPasswordController,
  getProfile,
  updateProfileController,
} from '../controllers/auth.controller.js';
import {
  registerValidation,
  loginValidation,
  refreshValidation,
  forgotPasswordValidation,
  resetPasswordValidation,
  updateProfileValidation,
} from '../validators/auth.validator.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/register', registerValidation, validateRequest, register);
router.post('/login', loginValidation, validateRequest, login);
router.post('/refresh', refreshValidation, validateRequest, refreshToken);
router.post('/forgot-password', forgotPasswordValidation, validateRequest, forgotPassword);
router.post('/reset-password', resetPasswordValidation, validateRequest, resetPasswordController);

router.get('/me', authenticate, getProfile);
router.patch('/me', authenticate, updateProfileValidation, validateRequest, updateProfileController);
router.post('/logout', authenticate, logout);

export default router;




