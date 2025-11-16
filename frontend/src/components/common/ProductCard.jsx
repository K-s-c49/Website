import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants';
import { formatCurrency, getImageUrl } from '@/lib/utils';
import { RatingStars } from './RatingStars';

export function ProductCard({ product, onAddToCart }) {
  const productId = product.id ?? product._id;
  return (
    <Card className="group flex h-full flex-col overflow-hidden transition-all hover:shadow-lg">
      {/* Image Section */}
      <div className="relative overflow-hidden bg-slate-100">
        <img
          src={getImageUrl(product.images?.[0])}
          alt={product.name}
          className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            // Fallback to a placeholder if image fails to load
            e.target.src = '/images/products/iphone2.jpg';
          }}
        />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          {product.badges?.map((badge) => (
            <Badge key={badge} variant="default" className="shadow-md">
              {badge}
            </Badge>
          ))}
        </div>
        {product.stock <= 5 && product.stock > 0 && (
          <div className="absolute bottom-4 right-4">
            <Badge variant="secondary" className="text-xs">
              Only {product.stock} left
            </Badge>
          </div>
        )}
      </div>

      {/* Content Section */}
      <CardContent className="flex flex-1 flex-col gap-3 pt-6">
        {/* Product Info */}
        <div className="flex-1 space-y-2">
          <Link
            to={ROUTES.product(productId)}
            className="line-clamp-2 text-base font-semibold text-slate-900 transition-colors hover:text-brand"
          >
            {product.name}
          </Link>
          <p className="line-clamp-2 text-sm text-slate-500">{product.description}</p>
        </div>

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center gap-1">
            <RatingStars rating={product.rating} reviews={product.reviews} size="sm" />
          </div>
        )}

        {/* Price Section */}
        <div className="space-y-3 border-t border-slate-100 pt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-slate-900">
              {formatCurrency(product.salePrice ?? product.price)}
            </span>
            {product.salePrice && (
              <span className="text-sm text-slate-400 line-through">
                {formatCurrency(product.price)}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <Button
            onClick={() => onAddToCart?.(product)}
            className="w-full transition-all duration-200"
            size="lg"
          >
            Add to cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}


