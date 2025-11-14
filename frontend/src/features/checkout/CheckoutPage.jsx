import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { useAuth } from '@/features/auth/hooks/useAuth';
import {
  updateShippingAddress,
  setPaymentMethod,
  setShippingMethod,
  setOrderNotes,
  resetCheckout,
} from './checkoutSlice';
import { createOrder } from '@/features/orders/orderSlice';
import { clearCart, fetchCart, selectCartSummary } from '@/features/cart/cartSlice';
import { SHIPPING_OPTIONS, ROUTES } from '@/constants';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const defaultValues = {
  fullName: '',
  line1: '',
  line2: '',
  city: '',
  state: '',
  postalCode: '',
  country: '',
  paymentMethod: 'credit_card',
  shippingMethod: SHIPPING_OPTIONS[0].id,
  notes: '',
};

export function CheckoutPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAuth();
  const summary = useAppSelector(selectCartSummary);
  const cartItems = useAppSelector((state) => state.cart.items);
  const { register, handleSubmit, setValue, watch, reset } = useForm({ defaultValues });

  useEffect(() => {
    return () => {
      dispatch(resetCheckout());
    };
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCart());
    }
  }, [dispatch, isAuthenticated]);

  const onSubmit = (values) => {
    if (!cartItems.length) {
      toast.error('Your cart is empty', { description: 'Add products before placing an order.' });
      return;
    }

    dispatch(updateShippingAddress(values));
    dispatch(setPaymentMethod(values.paymentMethod));
    dispatch(setShippingMethod(values.shippingMethod));
    dispatch(setOrderNotes(values.notes));

    dispatch(
      createOrder({
        shippingAddress: values,
        paymentMethod: values.paymentMethod,
        shippingMethod: values.shippingMethod,
        notes: values.notes,
      }),
    )
      .unwrap()
      .then((order) => {
        toast.success('Order confirmed', {
          description: `Order ${order.reference ?? order.id} has been created successfully.`,
        });
        dispatch(clearCart());
        reset(defaultValues);
        navigate(ROUTES.orders);
      })
      .catch((error) => {
        toast.error('Unable to complete checkout', {
          description: error,
        });
      });
  };

  const handleSelectChange = (field) => (event) => {
    const value = event.target.value;
    setValue(field, value);
    if (field === 'paymentMethod') dispatch(setPaymentMethod(value));
    if (field === 'shippingMethod') dispatch(setShippingMethod(value));
  };

  return (
    <div className="container grid gap-12 py-12 lg:grid-cols-[1.6fr_1fr]">
      <form className="space-y-8" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="rounded-2xl border border-slate-200 bg-white p-8">
          <h2 className="text-xl font-semibold text-slate-900">Shipping information</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full name</Label>
              <Input id="fullName" {...register('fullName', { required: true })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="line1">Address line 1</Label>
              <Input id="line1" {...register('line1', { required: true })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="line2">Address line 2</Label>
              <Input id="line2" placeholder="Apartment, suite, etc." {...register('line2')} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input id="city" {...register('city', { required: true })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input id="state" {...register('state', { required: true })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="postalCode">Postal code</Label>
              <Input id="postalCode" {...register('postalCode', { required: true })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input id="country" defaultValue="USA" {...register('country', { required: true })} />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-8">
          <h2 className="text-xl font-semibold text-slate-900">Delivery & payment</h2>
          <div className="mt-6 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="shippingMethod">Shipping speed</Label>
              <Select id="shippingMethod" value={watch('shippingMethod')} onChange={handleSelectChange('shippingMethod')}>
                {SHIPPING_OPTIONS.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name} ({option.eta}) - {option.price ? `$${option.price}` : 'Free'}
                  </option>
                ))}
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="paymentMethod">Payment method</Label>
              <Select id="paymentMethod" value={watch('paymentMethod')} onChange={handleSelectChange('paymentMethod')}>
                <option value="credit_card">Credit / Debit card</option>
                <option value="paypal">PayPal</option>
                <option value="bank_transfer">Bank transfer</option>
                <option value="cod">Cash on delivery</option>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Order notes</Label>
              <Textarea id="notes" rows={4} placeholder="Add delivery instructions or gift messages" {...register('notes')} />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          <Button variant="outline" type="button" onClick={() => reset(defaultValues)}>
            Clear
          </Button>
          <Button type="submit" size="lg">
            Place order
          </Button>
        </div>
      </form>

      <aside className="h-fit space-y-6 rounded-2xl border border-slate-200 bg-white p-8">
        <h2 className="text-lg font-semibold text-slate-900">Order summary</h2>
        <dl className="space-y-4 text-sm">
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
        <p className="rounded-lg bg-slate-50 p-4 text-xs text-slate-500">
          Secure payments are processed through PCI-compliant providers with 3D Secure support.
        </p>
      </aside>
    </div>
  );
}

