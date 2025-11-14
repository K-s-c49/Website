import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const registerSchema = loginSchema.extend({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  confirmPassword: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .refine((value, ctx) => value === ctx.parent.password, {
      message: 'Passwords do not match',
    }),
});

export const resetPasswordSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
});




