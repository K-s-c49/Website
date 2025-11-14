import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { fetchProducts } from '@/features/products/productSlice';
import { ProductHero } from '@/components/common/ProductHero';
import { SectionHeader } from '@/components/common/SectionHeader';
import { ProductGrid } from '@/components/common/ProductGrid';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants';
import { Link } from 'react-router-dom';

export function HomePage() {
  const dispatch = useAppDispatch();
  const { featured, status } = useAppSelector((state) => state.products);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  return (
    <div className="container space-y-16">
      <ProductHero />

      <section className="space-y-6">
        <SectionHeader
          eyebrow="Featured"
          title="Bestsellers this season"
          description="Carefully curated picks with exceptional reviews, lightning-fast shipping, and limited availability."
          action={
            <Button asChild variant="outline">
              <Link to={ROUTES.products}>Explore catalog</Link>
            </Button>
          }
        />
        {status === 'loading' ? <LoadingSpinner label="Loading featured products..." /> : <ProductGrid products={featured} />}
      </section>

      <section className="grid gap-10 lg:grid-cols-2">
        <div className="rounded-3xl bg-white p-8 shadow-card">
          <SectionHeader
            eyebrow="Experience"
            title="A modern shopping journey"
            description="Delight your customers with seamless browsing, tailored recommendations, and effortless checkout."
          />
          <ul className="mt-6 space-y-4 text-sm text-slate-600">
            <li className="rounded-lg border border-slate-200 bg-slate-50/40 p-4">
              Intelligent search and dynamic filters to help shoppers find exactly what they need.
            </li>
            <li className="rounded-lg border border-slate-200 bg-slate-50/40 p-4">
              Personalized dashboards with order tracking, saved items, and exclusive offers.
            </li>
            <li className="rounded-lg border border-slate-200 bg-slate-50/40 p-4">
              Secure payments, real-time inventory visibility, and multi-channel fulfillment ready.
            </li>
          </ul>
        </div>
        <div className="rounded-3xl bg-gradient-to-br from-white via-slate-50 to-slate-100 p-8 shadow-card">
          <SectionHeader
            eyebrow="Admin control"
            title="Manage operations effortlessly"
            description="Keep your catalog fresh, oversee fulfillment, and respond to customers quickly with an intuitive back office."
          />
          <div className="mt-6 grid gap-4">
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <h3 className="text-sm font-semibold text-slate-900">Product lifecycle</h3>
              <p className="mt-2 text-sm text-slate-500">
                Create, update, and retire products with robust content fields and media management.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <h3 className="text-sm font-semibold text-slate-900">Customer insights</h3>
              <p className="mt-2 text-sm text-slate-500">
                Understand customer segments, analyze purchasing patterns, and drive retention campaigns.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}




