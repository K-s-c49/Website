import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { AuthForm } from '../components/AuthForm';
import { useAuth } from '../hooks/useAuth';
import { ROUTES } from '@/constants';

function RegisterForm() {
  const navigate = useNavigate();
  const { register: registerUser, status, error } = useAuth();

  const handleSubmit = (values) => {
    const { confirmPassword, ...payload } = values;
    registerUser(payload)
      .unwrap()
      .then(() => {
        toast.success('Account created', {
          description: 'Welcome aboard! You can now explore the full experience.',
        });
        navigate(ROUTES.home, { replace: true });
      })
      .catch((err) => {
        toast.error('Registration failed', { description: err });
      });
  };

  return (
    <AuthForm
      mode="register"
      onSubmit={handleSubmit}
      isSubmitting={status === 'loading'}
      serverError={error}
    />
  );
}

function RegisterBottomLink() {
  return (
    <p className="text-sm text-slate-500">
      Already have an account?{' '}
      <Link to={ROUTES.login} className="font-semibold text-brand hover:underline">
        Sign in
      </Link>
    </p>
  );
}

export const RegisterPage = {
  Form: RegisterForm,
  BottomLink: RegisterBottomLink,
};

