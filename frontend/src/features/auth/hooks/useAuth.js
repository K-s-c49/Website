import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { login, logout, register, updateProfile } from '../authSlice';

export function useAuth() {
  const dispatch = useAppDispatch();
  const { user, status, error, isAuthenticated } = useAppSelector((state) => state.auth);

  return {
    user,
    status,
    error,
    isAuthenticated,
    login: (payload) => dispatch(login(payload)),
    register: (payload) => dispatch(register(payload)),
    logout: () => dispatch(logout()),
    updateProfile: (payload) => dispatch(updateProfile(payload)),
  };
}

