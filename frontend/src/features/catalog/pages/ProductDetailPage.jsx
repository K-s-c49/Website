import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { fetchProductById } from '@/features/products/productSlice';
import { addCartItem } from '@/features/cart/cartSlice';
import { QuantitySelector } from '@/components/common/QuantitySelector';
import { RatingStars } from '@/components/common/RatingStars';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatCurrency, getImageUrl } from '@/lib/utils';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { SectionHeader } from '@/components/common/SectionHeader';
import { ROUTES } from '@/constants';

export function ProductDetailPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { selectedProduct: product, status, error } = useAppSelector((state) => state.products);
  const { isAuthenticated } = useAuth();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    dispatch(fetchProductById(productId));
  }, [dispatch, productId]);

  if (status === 'loading' || !product) {
    return <LoadingSpinner label="Fetching product details..." />;
  }

  if (error) {
    return (
      <div className="container py-16">
        <div className="rounded-xl border border-red-200 bg-red-50 px-6 py-8 text-red-700">
          {error}
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast.info('Sign up required', { description: 'Please create an account to add items to your cart.' });
      navigate(ROUTES.register);
      return;
    }

    const productId = product.id ?? product._id;
    dispatch(addCartItem({ productId, quantity }))
      .unwrap()
      .then(() => {
        toast.success('Added to cart', { description: `${product.name} x${quantity}` });
      })
      .catch((err) => {
        toast.error('Unable to add to cart', { description: err.message || err });
      });
  };

  return (
    <div className="container space-y-16">
      <section className="grid gap-12 lg:grid-cols-[1.1fr_1fr]">
        <div className="grid gap-4">
          {product.images?.map((src) => (
            <img
              key={src}
              src={getImageUrl(src)}
              alt={product.name}
              className="h-[420px] w-full rounded-2xl object-cover"
              loading="lazy"
              onError={(e) => {
                // Fallback to a placeholder if image fails to load
                e.target.src = '/images/products/logo.jpg';
              }}
            />
          ))}
        </div>
        <div className="space-y-6">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              {product.badges?.map((badge) => (
                <Badge key={badge}>{badge}</Badge>
              ))}
              <span className="text-xs uppercase tracking-wider text-slate-500">{product.sku}</span>
            </div>
            <h1 className="mt-4 text-3xl font-semibold text-slate-900">{product.name}</h1>
            <RatingStars rating={product.rating} reviews={product.reviews} className="mt-3" />
          </div>
          <p className="text-base text-slate-600">{product.description}</p>
          <div className="flex items-center gap-4">
            <span className="text-3xl font-semibold text-slate-900">
              {formatCurrency(product.salePrice ?? product.price)}
            </span>
            {product.salePrice && (
              <span className="text-lg text-slate-400 line-through">{formatCurrency(product.price)}</span>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <QuantitySelector quantity={quantity} onChange={setQuantity} max={product.stock} />
            <Button size="lg" onClick={handleAddToCart} className="flex-1 min-w-[160px]">
              Add to cart
            </Button>
          </div>
          <div>
            <span className="text-sm text-slate-500">
              {product.stock > 10 ? 'In stock' : `Only ${product.stock} left`}
            </span>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Highlights
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              {product.highlights?.map((highlight) => (
                <li key={highlight}>• {highlight}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeader
          eyebrow="Details"
          title="Product specifications"
          description="Transparent specs, materials, and care instructions to set clear expectations."
        />
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
            <h4 className="text-sm font-semibold text-slate-900">Shipping</h4>
            <p className="mt-2">
              Fast, carbon-neutral delivery with real-time tracking, signature confirmation, and flexible delivery windows.
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
            <h4 className="text-sm font-semibold text-slate-900">Returns</h4>
            <p className="mt-2">
              30-day hassle-free returns. Print labels at home or schedule a pickup in select cities.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

