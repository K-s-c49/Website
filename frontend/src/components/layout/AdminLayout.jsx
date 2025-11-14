import { NavLink, Outlet } from 'react-router-dom';
import { ROUTES } from '@/constants';
import { cn } from '@/lib/utils';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { Button } from '@/components/ui/button';

const adminLinks = [
  { label: 'Overview', path: ROUTES.admin },
  { label: 'Products', path: ROUTES.adminProducts },
  { label: 'Orders', path: ROUTES.adminOrders },
  { label: 'Users', path: ROUTES.adminUsers },
];

export function AdminLayout() {
  const { logout } = useAuth();

  return (
    <div className="flex min-h-screen bg-slate-50">
      <aside className="hidden w-64 flex-shrink-0 border-r border-slate-200 bg-white lg:block">
        <div className="space-y-8 px-6 py-10">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Admin Console</h2>
            <p className="text-sm text-slate-500">Manage catalog, orders, and customers.</p>
          </div>
          <nav className="space-y-2">
            {adminLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  cn(
                    'block rounded-lg px-4 py-2 text-sm font-medium transition hover:bg-slate-100',
                    isActive ? 'bg-brand text-white hover:bg-brand-700' : 'text-slate-600',
                  )
                }
                end
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          <Button variant="outline" onClick={logout} className="w-full">
            Sign out
          </Button>
        </div>
      </aside>
      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6">
            <h1 className="text-base font-semibold text-slate-900">Customize_23 Admin</h1>
            <Button asChild variant="outline" className="lg:hidden">
              <NavLink to={ROUTES.home}>Back to storefront</NavLink>
            </Button>
          </div>
        </header>
        <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}




