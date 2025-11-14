import { useNavigate, useLocation, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { AuthForm } from '../components/AuthForm';
import { useAuth } from '../hooks/useAuth';
import { ROUTES } from '@/constants';

function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, status, error } = useAuth();

  const handleSubmit = (values) => {
    login(values)
      .unwrap()
      .then(() => {
        toast.success('Welcome back! 👋', { description: 'You are now signed in.' });
        const redirect = location.state?.from?.pathname ?? ROUTES.home;
        navigate(redirect, { replace: true });
      })
      .catch((err) => {
        toast.error('Login failed', { description: err });
      });
  };

  return <AuthForm mode="login" onSubmit={handleSubmit} isSubmitting={status === 'loading'} serverError={error} />;
}

function LoginBottomLink() {
  return (
    <p className="text-sm text-slate-500">
      New to Customize_23?{' '}
      <Link to={ROUTES.register} className="font-semibold text-brand hover:underline">
        Create your account
      </Link>
    </p>
  );
}

export const LoginPage = {
  Form: LoginForm,
  BottomLink: LoginBottomLink,
};




