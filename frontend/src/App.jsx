import { Suspense, useEffect } from 'react';
import { useAppDispatch } from '@/app/hooks';
import { AppRouter } from '@/routes/AppRouter';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { fetchCurrentUser } from '@/features/auth/authSlice';

export function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem('cc_access_token');
    if (token) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch]);

  return (
    <Suspense fallback={<LoadingSpinner label="Preparing storefront..." />}>
      <AppRouter />
    </Suspense>
  );
}

