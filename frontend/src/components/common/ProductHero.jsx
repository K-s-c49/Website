import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants';

export function ProductHero() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand to-slate-900 px-10 py-16 text-white shadow-card">
      <div className="max-w-xl space-y-4">
        <span className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider">
          Holiday Collection
        </span>
        <h1 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
          Elevate every moment with curated essentials crafted for modern living.
        </h1>
        <p className="text-base text-white/80">
          Explore a selection of products designed to create memorable experiences. Fast shipping, easy returns, and exceptional support.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Button asChild size="lg">
            <Link to={ROUTES.products}>Shop new arrivals</Link>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <Link to={ROUTES.products}>Browse bestsellers</Link>
          </Button>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-10 bottom-0 h-32 rounded-full bg-white/5 blur-3xl" />
    </section>
  );
}




