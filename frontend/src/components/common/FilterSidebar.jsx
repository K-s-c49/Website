import { useMemo } from 'react';
import { categories } from '@/mocks/data/products';
import { cn } from '@/lib/utils';

const priceRanges = [
  { label: 'Under ₹50', value: [0, 50] },
  { label: '₹50 - ₹150', value: [50, 150] },
  { label: '₹150 - ₹300', value: [150, 300] },
  { label: '₹300+', value: [300, 10_000] },
];

export function FilterSidebar({ activeFilters, onChange }) {
  const selectedCategory = activeFilters.category;
  const selectedPriceRange = activeFilters.priceRange;
  const selectedPriceKey = selectedPriceRange ? selectedPriceRange.join('-') : null;

  const filterBadge = useMemo(() => {
    const applied = [];
    if (selectedCategory) {
      applied.push(
        categories.find((category) => category.id === selectedCategory)?.name ?? 'Category',
      );
    }
    if (selectedPriceRange) {
      const match = priceRanges.find(
        (range) => range.value[0] === selectedPriceRange[0] && range.value[1] === selectedPriceRange[1],
      );
      if (match) applied.push(match.label);
    }
    return applied;
  }, [selectedCategory, selectedPriceRange]);

  return (
    <aside className="sticky top-28 hidden h-fit w-72 flex-shrink-0 rounded-xl border border-slate-200 bg-white p-6 lg:block">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-slate-900">Filters</h3>
        <button
          type="button"
          className="text-sm text-brand hover:underline"
          onClick={() => onChange({ ...activeFilters, category: null, priceRange: null })}
        >
          Clear
        </button>
      </div>

      <section className="mt-6 space-y-3">
        <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Category</h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              className={cn(
                'flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition hover:bg-slate-100',
                selectedCategory === category.id ? 'bg-brand/10 text-brand-700' : 'text-slate-600',
              )}
              onClick={() => onChange({ ...activeFilters, category: category.id })}
            >
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="mt-8 space-y-3">
        <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Price</h4>
        <div className="space-y-2">
          {priceRanges.map((range) => (
            <button
              key={range.label}
              type="button"
              className={cn(
                'w-full rounded-lg px-3 py-2 text-left text-sm transition hover:bg-slate-100',
                selectedPriceKey === range.value.join('-') ? 'bg-brand/10 text-brand-700' : 'text-slate-600',
              )}
              onClick={() => onChange({ ...activeFilters, priceRange: range.value })}
            >
              {range.label}
            </button>
          ))}
        </div>
      </section>

      {filterBadge.length > 0 && (
        <section className="mt-8 space-y-3">
          <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Active filters</h4>
          <div className="flex flex-wrap gap-2">
            {filterBadge.map((badge) => (
              <span key={badge} className="rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand-700">
                {badge}
              </span>
            ))}
          </div>
        </section>
      )}
    </aside>
  );
}

