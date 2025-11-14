import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { ShoppingCart } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { useAuth } from '@/features/auth/hooks/useAuth';
import {
  fetchCart,
  updateCartItem,
  removeCartItem,
  clearCart,
  selectCartSummary,
} from './cartSlice';
import { QuantitySelector } from '@/components/common/QuantitySelector';
import { EmptyState } from '@/components/common/EmptyState';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

export function CartPage() {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAuth();
  const cartState = useAppSelector((state) => state.cart);
  const summary = useAppSelector(selectCartSummary);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCart());
    }
  }, [dispatch, isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="container py-16">
        <EmptyState
          icon={ShoppingCart}
          title="Sign in to view your cart"
          description="Create an account or sign in to keep your cart in sync across devices."
          action={{ label: 'Go to login', to: ROUTES.login }}
        />
      </div>
    );
  }

  if (cartState.status === 'loading') {
    return <LoadingSpinner label="Loading cart..." />;
  }

  if (!cartState.items.length) {
    return (
      <div className="container py-16">
        <EmptyState
          icon={ShoppingCart}
          title="Your cart is empty"
          description="Browse the catalog and add items to your cart to see them here."
          action={{ label: 'Start shopping', to: ROUTES.products }}
        />
      </div>
    );
  }

  const handleQuantityChange = (productId, quantity) => {
    dispatch(updateCartItem({ productId, quantity }))
      .unwrap()
      .catch((error) => {
        toast.error('Unable to update quantity', { description: error.message || error });
      });
  };

  const handleRemove = (productId, name) => {
    dispatch(removeCartItem(productId))
      .unwrap()
      .then(() => {
        toast.success('Removed from cart', { description: `${name} removed` });
      })
      .catch((error) => {
        toast.error('Unable to remove item', { description: error.message || error });
      });
  };

  const handleClear = () => {
    dispatch(clearCart())
      .unwrap()
      .then(() => toast.success('Cart cleared'))
      .catch((error) => toast.error('Unable to clear cart', { description: error.message || error }));
  };

  return (
    <div className="container grid gap-10 py-10 lg:grid-cols-[1.8fr_1fr]">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-slate-900">Shopping Cart</h1>
          <Button variant="ghost" onClick={handleClear} className="text-sm text-slate-500 hover:text-red-500">
            Clear cart
          </Button>
        </div>
        <div className="space-y-4">
          {cartState.items.map((item) => {
            const product = item.product ?? {};
            const productId = product.id ?? product._id ?? item.productId;
            const unitPrice = product.salePrice ?? product.price ?? 0;
            const maxQuantity = product.stock ?? 99;
            const productName = product.name ?? 'Item';
            return (
              <div
                key={productId}
                className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-6 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">{productName}</h2>
                  <p className="text-sm text-slate-500">
                    ${unitPrice.toFixed(2)} each • {item.quantity} pcs
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  <QuantitySelector
                    quantity={item.quantity}
                    onChange={(quantity) => handleQuantityChange(productId, quantity)}
                    max={maxQuantity}
                  />
                  <Button
                    variant="ghost"
                    onClick={() => handleRemove(productId, productName)}
                    className="text-sm text-red-500 hover:text-red-600"
                  >
                    Remove
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <aside className="h-fit rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">Order summary</h2>
        <dl className="mt-6 space-y-4 text-sm">
          <div className="flex items-center justify-between">
            <dt className="text-slate-500">Subtotal</dt>
            <dd className="text-slate-900 font-medium">{summary.subtotalFormatted}</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-slate-500">Shipping</dt>
            <dd className="text-slate-900 font-medium">{summary.shippingFormatted}</dd>
          </div>
          <div className="flex items-center justify-between border-t border-slate-200 pt-4 text-base font-semibold">
            <dt>Total</dt>
            <dd>{summary.totalFormatted}</dd>
          </div>
        </dl>
        <Button asChild className="mt-6 w-full">
          <Link to={ROUTES.checkout}>Proceed to checkout</Link>
        </Button>
      </aside>
    </div>
  );
}
