import { Link } from 'react-router-dom';
import { useState } from 'react';
import { AuthForm } from '../components/AuthForm';
import { ROUTES } from '@/constants';
import { toast } from 'sonner';
import { authApi } from '@/services/api/auth.js';
import { getErrorMessage } from '@/lib/utils.js';

function ResetPasswordForm() {
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (values) => {
    setSubmitting(true);
    authApi
      .forgotPassword({ email: values.email })
      .then(() => {
        toast.info('Password reset link sent', {
          description: `We have sent a secure link to ${values.email}. It expires in 15 minutes.`,
        });
      })
      .catch((error) => {
        toast.error('Unable to send reset link', { description: getErrorMessage(error) });
      })
      .finally(() => setSubmitting(false));
  };

  return <AuthForm mode="reset" onSubmit={handleSubmit} isSubmitting={submitting} />;
}

function ResetPasswordBottomLink() {
  return (
    <p className="text-sm text-slate-500">
      Remember your password?{' '}
      <Link to={ROUTES.login} className="font-semibold text-brand hover:underline">
        Return to sign in
      </Link>
    </p>
  );
}

export const ResetPasswordPage = {
  Form: ResetPasswordForm,
  BottomLink: ResetPasswordBottomLink,
};

