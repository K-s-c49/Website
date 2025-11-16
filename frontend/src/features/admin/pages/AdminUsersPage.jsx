import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { fetchAdminUsers, toggleAdminUserStatus } from '../adminSlice';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { toast } from 'sonner';
import { ROUTES } from '@/constants';

export function AdminUsersPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { users, status } = useAppSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchAdminUsers());
  }, [dispatch]);

  const handleViewUser = (userId) => {
    navigate(ROUTES.adminUserDetail(userId));
  };

  const handleToggleStatus = (user) => {
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
    return <LoadingSpinner label="Loading users..." />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Customers & team</h1>
        <p className="text-sm text-slate-500">
          Manage customer accounts, permissions, and internal team roles from a centralized hub.
        </p>
      </div>
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Location</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id ?? user._id}>
                <TableCell className="font-medium text-slate-900">
                  {user.firstName} {user.lastName}
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge variant={user.role === 'admin' ? 'default' : 'outline'} className="capitalize">
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={user.isActive ? 'secondary' : 'outline'}>
                    {user.isActive ? 'Active' : 'Disabled'}
                  </Badge>
                </TableCell>
                <TableCell>{user.address ? `${user.address.city}, ${user.address.state}` : '—'}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewUser(user.id ?? user._id)}
                    >
                      View
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleToggleStatus(user)}
                      className="text-red-500 hover:text-red-600"
                    >
                      {user.isActive ? 'Disable' : 'Activate'}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

