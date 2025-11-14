import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants';
import { formatCurrency } from '@/lib/utils';

export function ProductCard({ product, onAddToCart }) {
  const productId = product.id ?? product._id;
  return (
    <Card className="flex h-full flex-col overflow-hidden">
      <div className="relative">
        <img
          src={product.images?.[0]}
          alt={product.name}
          className="h-64 w-full object-cover"
          loading="lazy"
        />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          {product.badges?.map((badge) => (
            <Badge key={badge} variant="default">
              {badge}
            </Badge>
          ))}
        </div>
      </div>
      <CardContent className="flex flex-1 flex-col gap-4">
        <div className="space-y-1">
          <Link to={ROUTES.product(productId)} className="text-base font-semibold text-slate-900">
            {product.name}
          </Link>
          <p className="text-sm text-slate-500">{product.description}</p>
        </div>
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-semibold text-slate-900">
              {formatCurrency(product.salePrice ?? product.price)}
            </span>
            {product.salePrice && (
              <span className="text-sm text-slate-400 line-through">{formatCurrency(product.price)}</span>
            )}
          </div>
          <Button onClick={() => onAddToCart?.(product)}>Add to cart</Button>
        </div>
      </CardContent>
    </Card>
  );
}

