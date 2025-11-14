import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { fetchProducts, setFilters } from '@/features/products/productSlice';
import { FilterSidebar } from '@/components/common/FilterSidebar';
import { ProductGrid } from '@/components/common/ProductGrid';
import { SectionHeader } from '@/components/common/SectionHeader';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/common/ProductCard';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { addCartItem } from '@/features/cart/cartSlice';
import { ROUTES } from '@/constants';

/**
 * Dynamic product listing page with faceted filters, search, and cart integration.
 * Demonstrates how feature slices, mock APIs, and UI primitives compose together.
 */
export function ProductListingPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { items, status, filters } = useAppSelector((state) => state.products);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const searchTerm = searchParams.get('q') ?? '';
    const category = searchParams.get('category');
    const priceParam = searchParams.get('price');
    const priceRange = priceParam ? priceParam.split('-').map(Number) : null;
    const appliedFilters = { searchTerm, category, priceRange };
    dispatch(setFilters(appliedFilters));
    dispatch(fetchProducts(appliedFilters));
  }, [dispatch, searchParams]);

  const handleSearch = (event) => {
    const value = event.target.value;
    dispatch(setFilters({ searchTerm: value }));
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (value) next.set('q', value);
      else next.delete('q');
      return next;
    });
    dispatch(fetchProducts({ ...filters, searchTerm: value }));
  };

  const handleFilterChange = (nextFilters) => {
    dispatch(setFilters(nextFilters));
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (nextFilters.category) next.set('category', nextFilters.category);
      else next.delete('category');
      if (nextFilters.priceRange) next.set('price', nextFilters.priceRange.join('-'));
      else next.delete('price');
      if (nextFilters.searchTerm) next.set('q', nextFilters.searchTerm);
      return next;
    });
    dispatch(fetchProducts(nextFilters));
  };

  const handleAddToCart = (product) => {
    if (!isAuthenticated) {
      toast.info('Sign up required', { description: 'Please create an account to add items to your cart.' });
      navigate(ROUTES.register);
      return;
    }

    const productId = product.id ?? product._id;
    dispatch(addCartItem({ productId, quantity: 1 }))
      .unwrap()
      .then(() => {
        toast.success('Added to cart', { description: `${product.name} is now in your cart.` });
      })
      .catch((error) => {
        toast.error('Add to cart failed', { description: error.message || error });
      });
  };

  return (
    <div className="container flex gap-10">
      <FilterSidebar activeFilters={filters} onChange={handleFilterChange} />
      <div className="flex flex-1 flex-col gap-8">
        <SectionHeader
          eyebrow="Catalog"
          title="All products"
          description="Discover versatile, high-quality goods with transparent pricing and curated recommendations."
          action={
            <div className="flex gap-3">
              <Input
                type="search"
                placeholder="Search products"
                value={filters.searchTerm}
                onChange={handleSearch}
                className="w-64"
              />
              <Button variant="outline" onClick={() => handleFilterChange({ category: null, priceRange: null, searchTerm: '' })}>
                Reset
              </Button>
            </div>
          }
        />
        {status === 'loading' ? (
          <LoadingSpinner label="Loading catalog..." />
        ) : (
          <ProductGrid
            products={items}
            onAddToCart={handleAddToCart}
            renderItem={(product) => (
              <ProductCard key={product.id ?? product._id} product={product} onAddToCart={handleAddToCart} />
            )}
          />
        )}
      </div>
    </div>
  );
}

