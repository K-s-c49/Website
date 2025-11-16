import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

export function RatingStars({ rating = 0, reviews = 0, className, size = 'md' }) {
  const stars = Array.from({ length: 5 }, (_, index) => index + 1);
  
  const sizeClasses = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  };

  return (
    <div className={cn('flex items-center gap-1 text-sm text-slate-500', className)}>
      {stars.map((value) => (
        <Star
          key={value}
          className={cn(
            sizeClasses[size],
            'fill-slate-200 text-slate-300',
            rating >= value && 'fill-brand text-brand-500',
            rating >= value - 0.5 && rating < value && 'fill-brand/60 text-brand',
          )}
        />
      ))}
      {size !== 'sm' && (
        <>
          <span className="ml-1 font-medium text-slate-700">{rating.toFixed(1)}</span>
          <span className="text-xs text-slate-400">({reviews} reviews)</span>
        </>
      )}
    </div>
  );
}






