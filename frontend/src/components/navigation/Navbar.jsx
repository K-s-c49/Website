import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, LogOut, Package, Settings } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { fetchOrders } from '@/features/orders/orderSlice';
import { ROUTES, USER_ROLES } from '@/constants';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, logout } = useAuth();
  const cartItems = useAppSelector((state) => state.cart.items);
  const orders = useAppSelector((state) => state.orders.items);
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Calculate pending/active orders count (pending, processing, shipped - not delivered or cancelled)
  const activeOrderCount = orders.filter(
    (order) =>
      order.fulfillmentStatus &&
      ['pending', 'processing', 'shipped'].includes(order.fulfillmentStatus) &&
      order.paymentStatus !== 'failed'
  ).length;

  const handleLogout = async () => {
    await logout();
    setIsUserMenuOpen(false);
    navigate(ROUTES.home);
  };

  // Fetch orders when authenticated (silently fail if backend is not available)
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchOrders()).catch(() => {
        // Silently handle network errors - backend might not be running
      });
    }
  }, [dispatch, isAuthenticated]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [navigate]);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isUserMenuOpen && !event.target.closest('.user-menu-container')) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isUserMenuOpen]);

  const navLinks = [
    { label: 'Home', to: ROUTES.home },
    { label: 'Products', to: ROUTES.products },
    { label: 'About Us', to: ROUTES.about },
  ];

  const userMenuItems = [
    ...(user?.role === USER_ROLES.admin
      ? [
          {
            label: 'Admin Dashboard',
            to: ROUTES.admin,
            icon: Settings,
          },
        ]
      : []),
    {
      label: 'My Orders',
      to: ROUTES.orders,
      icon: Package,
    },
    {
      label: 'Logout',
      onClick: handleLogout,
      icon: LogOut,
      variant: 'destructive',
    },
  ];

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-slate-200 bg-white shadow-sm">
      <div className="container">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to={ROUTES.home} className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand text-white shadow">
              C23
            </span>
            <span className="text-lg font-semibold text-slate-900">Customize_23</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm font-medium text-slate-600 transition-colors hover:text-brand"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* Orders Icon - Only show when authenticated */}
            {isAuthenticated && (
              <Link
                to={ROUTES.orders}
                className="relative flex items-center justify-center rounded-full p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-brand"
                aria-label="My orders"
              >
                <Package className="h-5 w-5" />
                {activeOrderCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white">
                    {activeOrderCount > 99 ? '99+' : activeOrderCount}
                  </span>
                )}
              </Link>
            )}

            {/* Cart Icon */}
            <Link
              to={ROUTES.cart}
              className="relative flex items-center justify-center rounded-full p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-brand"
              aria-label="Shopping cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs font-semibold text-white">
                  {cartItemCount > 99 ? '99+' : cartItemCount}
                </span>
              )}
            </Link>

            {/* User Menu / Auth Buttons */}
            {isAuthenticated ? (
              <div className="relative user-menu-container">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 rounded-full p-1 transition-colors hover:bg-slate-100"
                  aria-label="User menu"
                >
                  <Avatar
                    src={user?.avatar}
                    alt={user?.name || 'User'}
                    fallback={user?.name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || 'U'}
                  />
                </button>

                {/* User Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-lg border border-slate-200 bg-white shadow-lg">
                    <div className="border-b border-slate-200 px-4 py-3">
                      <p className="text-sm font-semibold text-slate-900">{user?.name || 'User'}</p>
                      <p className="text-xs text-slate-500">{user?.email}</p>
                    </div>
                    <div className="py-1">
                      {userMenuItems.map((item, index) => {
                        const Icon = item.icon;
                        const isOrdersLink = item.to === ROUTES.orders;
                        if (item.to) {
                          return (
                            <Link
                              key={index}
                              to={item.to}
                              onClick={() => setIsUserMenuOpen(false)}
                              className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-100"
                            >
                              <Icon className="h-4 w-4" />
                              <span className="flex-1">{item.label}</span>
                              {isOrdersLink && activeOrderCount > 0 && (
                                <span className="rounded-full bg-blue-600 px-2 py-0.5 text-xs font-semibold text-white">
                                  {activeOrderCount}
                                </span>
                              )}
                            </Link>
                          );
                        }
                        return (
                          <button
                            key={index}
                            onClick={() => {
                              item.onClick?.();
                              setIsUserMenuOpen(false);
                            }}
                            className={`flex w-full items-center gap-3 px-4 py-2 text-sm transition-colors hover:bg-slate-100 ${
                              item.variant === 'destructive' ? 'text-red-600 hover:text-red-700' : 'text-slate-700'
                            }`}
                          >
                            <Icon className="h-4 w-4" />
                            {item.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden items-center gap-2 md:flex">
                <Button variant="ghost" asChild size="sm">
                  <Link to={ROUTES.login}>Login</Link>
                </Button>
                <Button asChild size="sm">
                  <Link to={ROUTES.register}>Sign Up</Link>
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="rounded-md p-2 text-slate-600 transition-colors hover:bg-slate-100 md:hidden"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="border-t border-slate-200 py-4 md:hidden">
            <div className="space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="block rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-brand"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              {!isAuthenticated && (
                <>
                  <Link
                    to={ROUTES.login}
                    className="block rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-brand"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to={ROUTES.register}
                    className="block rounded-md px-3 py-2 text-sm font-medium text-brand transition-colors hover:bg-slate-100"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
              {isAuthenticated && (
                <>
                  <div className="border-t border-slate-200 pt-2">
                    <div className="px-3 py-2">
                      <p className="text-sm font-semibold text-slate-900">{user?.name || 'User'}</p>
                      <p className="text-xs text-slate-500">{user?.email}</p>
                    </div>
                  </div>
                  {user?.role === USER_ROLES.admin && (
                    <Link
                      to={ROUTES.admin}
                      className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-brand"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Settings className="h-4 w-4" />
                      Admin Dashboard
                    </Link>
                  )}
                  <Link
                    to={ROUTES.orders}
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-brand"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Package className="h-4 w-4" />
                    <span>My Orders</span>
                    {activeOrderCount > 0 && (
                      <span className="ml-auto rounded-full bg-blue-600 px-2 py-0.5 text-xs font-semibold text-white">
                        {activeOrderCount}
                      </span>
                    )}
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-slate-100 hover:text-red-700"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

