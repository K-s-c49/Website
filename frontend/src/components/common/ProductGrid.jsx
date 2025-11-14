import { ProductCard } from './ProductCard';

export function ProductGrid({ products, onAddToCart, renderItem }) {
  if (!products?.length) {
    return (
      <div className="rounded-lg border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500">
        No products found. Adjust your filters or try a different search.
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) =>
        renderItem ? (
          renderItem(product)
        ) : (
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
        ),
      )}
    </div>
  );
}

