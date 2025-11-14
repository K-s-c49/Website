import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, registerSchema, resetPasswordSchema } from '../validators';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

const schemaForMode = {
  login: loginSchema,
  register: registerSchema,
  reset: resetPasswordSchema,
};

const defaultValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

/**
 * Shared authentication form wrapper to keep markup consistent
 * between login, register, and password reset flows.
 */
export function AuthForm({ mode = 'login', onSubmit, isSubmitting, serverError, footer }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schemaForMode[mode]),
    defaultValues,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [mode, reset]);

  const renderField = (name, label, type = 'text', placeholder = '') => (
    <div className="flex flex-col gap-2">
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} type={type} placeholder={placeholder} {...register(name)} />
      {errors[name] && <p className="text-sm text-red-600">{errors[name].message}</p>}
    </div>
  );

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)} noValidate>
      {mode === 'register' && (
        <div className="grid gap-4 sm:grid-cols-2">
          {renderField('firstName', 'First name', 'text', 'Alex')}
          {renderField('lastName', 'Last name', 'text', 'Johnson')}
        </div>
      )}
      {renderField('email', 'Email address', 'email', 'you@example.com')}
      {mode !== 'reset' && renderField('password', 'Password', 'password', '••••••••')}
      {mode === 'register' && renderField('confirmPassword', 'Confirm password', 'password', '••••••••')}
      {serverError && <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">{serverError}</p>}
      <Button type="submit" disabled={isSubmitting} className={cn(isSubmitting && 'animate-pulse')}>
        {mode === 'login' && (isSubmitting ? 'Signing in...' : 'Sign in')}
        {mode === 'register' && (isSubmitting ? 'Creating account...' : 'Create account')}
        {mode === 'reset' && (isSubmitting ? 'Sending instructions...' : 'Send reset link')}
      </Button>
      {footer}
    </form>
  );
}

