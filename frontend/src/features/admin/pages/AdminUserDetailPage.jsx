import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { fetchAdminUsers, toggleAdminUserStatus } from '../adminSlice';
import { ROUTES } from '@/constants';
import { toast } from 'sonner';

export function AdminUserDetailPage() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { users, status } = useAppSelector((state) => state.admin);

  useEffect(() => {
    if (users.length === 0) {
      dispatch(fetchAdminUsers());
    }
  }, [dispatch, users.length]);

  const user = users.find((u) => (u.id ?? u._id) === userId);

  const handleToggleStatus = () => {
    dispatch(toggleAdminUserStatus(user.id ?? user._id))
      .unwrap()
      .then((updated) => {
        toast.success(updated.isActive ? 'User activated' : 'User deactivated', {
          description: `${updated.firstName} ${updated.lastName}`,
        });
      })
      .catch((error) => {
        toast.error('Unable to update user', { description: error.message || error });
      });
  };

  if (status === 'loading') {
    return <LoadingSpinner label="Loading user..." />;
  }

  if (!user) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate(ROUTES.adminUsers)}>
            ← Back to Users
          </Button>
        </div>
        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
          <p className="text-sm text-red-600">User not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Button variant="ghost" size="sm" onClick={() => navigate(ROUTES.adminUsers)}>
            ← Back to Users
          </Button>
          <h1 className="mt-4 text-2xl font-semibold text-slate-900">
            {user.firstName} {user.lastName}
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* User Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Personal Information</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-slate-600">Full Name</p>
                <p className="text-slate-900">
                  {user.firstName} {user.lastName}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600">Email</p>
                <p className="text-slate-900">{user.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600">Phone</p>
                <p className="text-slate-900">{user.phone ?? '—'}</p>
              </div>
            </div>
          </div>

          {/* Address Information */}
          {user.address && (
            <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Address</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-slate-600">Street</p>
                  <p className="text-slate-900">{user.address.streetAddress ?? '—'}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-slate-600">City</p>
                    <p className="text-slate-900">{user.address.city ?? '—'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-600">State</p>
                    <p className="text-slate-900">{user.address.state ?? '—'}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Zip Code</p>
                    <p className="text-slate-900">{user.address.zipCode ?? '—'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-600">Country</p>
                    <p className="text-slate-900">{user.address.country ?? '—'}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Account Status */}
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-900 mb-4">Account Status</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-slate-600 mb-1">Status</p>
                <Badge variant={user.isActive ? 'secondary' : 'outline'}>
                  {user.isActive ? 'Active' : 'Disabled'}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-slate-600 mb-1">Role</p>
                <Badge variant={user.role === 'admin' ? 'default' : 'outline'} className="capitalize">
                  {user.role}
                </Badge>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleToggleStatus}
                className="w-full text-red-500 hover:text-red-600"
              >
                {user.isActive ? 'Disable User' : 'Activate User'}
              </Button>
            </div>
          </div>

          {/* Account Created */}
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-900 mb-3">Account Information</h3>
            <div className="text-sm text-slate-600">
              {user.createdAt && (
                <p>
                  Joined: {new Date(user.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
