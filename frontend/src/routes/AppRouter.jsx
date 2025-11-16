import { Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from '@/constants';
import { MainLayout } from '@/components/layout/MainLayout';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { ProtectedRoute, AdminRoute } from '@/components/common/ProtectedRoute';

// Public Pages
import { HomePage } from '@/features/catalog/pages/HomePage';
import { ProductListingPage } from '@/features/catalog/pages/ProductListingPage';
import { ProductDetailPage } from '@/features/catalog/pages/ProductDetailPage';
import { AboutUsPage } from '@/features/catalog/pages/AboutUsPage';
import { NotFoundPage } from '@/features/catalog/pages/NotFoundPage';

// Auth Pages
import { LoginPage } from '@/features/auth/pages/LoginPage';
import { RegisterPage } from '@/features/auth/pages/RegisterPage';
import { ResetPasswordPage } from '@/features/auth/pages/ResetPasswordPage';

// Protected Pages
import { CartPage } from '@/features/cart/CartPage';
import { CheckoutPage } from '@/features/checkout/CheckoutPage';
import { OrderHistoryPage } from '@/features/orders/OrderHistoryPage';

// Admin Pages
import { AdminDashboardPage } from '@/features/admin/pages/AdminDashboardPage';
import { AdminProductsPage } from '@/features/admin/pages/AdminProductsPage';
import { AdminOrdersPage } from '@/features/admin/pages/AdminOrdersPage';
import { AdminOrderDetailPage } from '@/features/admin/pages/AdminOrderDetailPage';
import { AdminUsersPage } from '@/features/admin/pages/AdminUsersPage';
import { AdminUserDetailPage } from '@/features/admin/pages/AdminUserDetailPage';

export function AppRouter() {
  return (
    <Routes>
      {/* Public Routes with Main Layout */}
      <Route element={<MainLayout />}>
        <Route path={ROUTES.home} element={<HomePage />} />
        <Route path={ROUTES.products} element={<ProductListingPage />} />
        <Route path={ROUTES.product()} element={<ProductDetailPage />} />
        <Route path={ROUTES.about} element={<AboutUsPage />} />
      </Route>

      {/* Auth Routes with Auth Layout */}
      <Route
        path={ROUTES.login}
        element={
          <AuthLayout
            title="Welcome back"
            description="Sign in to your account to continue shopping"
            bottomLink={<LoginPage.BottomLink />}
          >
            <LoginPage.Form />
          </AuthLayout>
        }
      />
      <Route
        path={ROUTES.register}
        element={
          <AuthLayout
            title="Create an account"
            description="Join Customize_23 and start shopping today"
            bottomLink={<RegisterPage.BottomLink />}
          >
            <RegisterPage.Form />
          </AuthLayout>
        }
      />
      <Route
        path={ROUTES.resetPassword}
        element={
          <AuthLayout
            title="Reset password"
            description="Enter your email to reset your password"
            bottomLink={<ResetPasswordPage.BottomLink />}
          >
            <ResetPasswordPage.Form />
          </AuthLayout>
        }
      />

      {/* Protected Routes with Main Layout */}
      <Route element={<MainLayout />}>
        <Route element={<ProtectedRoute />}>
          <Route path={ROUTES.cart} element={<CartPage />} />
          <Route path={ROUTES.checkout} element={<CheckoutPage />} />
          <Route path={ROUTES.orders} element={<OrderHistoryPage />} />
        </Route>
      </Route>

      {/* Admin Routes with Admin Layout */}
      <Route element={<AdminLayout />}>
        <Route element={<AdminRoute />}>
          <Route path={ROUTES.admin} element={<AdminDashboardPage />} />
          <Route path={ROUTES.adminProducts} element={<AdminProductsPage />} />
          <Route path={ROUTES.adminOrders} element={<AdminOrdersPage />} />
          <Route path={ROUTES.adminOrderDetail()} element={<AdminOrderDetailPage />} />
          <Route path={ROUTES.adminUsers} element={<AdminUsersPage />} />
          <Route path={ROUTES.adminUserDetail()} element={<AdminUserDetailPage />} />
        </Route>
      </Route>

      {/* 404 Not Found */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

