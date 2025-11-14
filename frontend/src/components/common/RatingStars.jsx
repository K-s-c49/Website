import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

export function RatingStars({ rating = 0, reviews = 0, className }) {
  const stars = Array.from({ length: 5 }, (_, index) => index + 1);

  return (
    <div className={cn('flex items-center gap-1 text-sm text-slate-500', className)}>
      {stars.map((value) => (
        <Star
          key={value}
          className={cn(
            'h-4 w-4 fill-slate-200 text-slate-300',
            rating >= value && 'fill-brand text-brand-500',
            rating >= value - 0.5 && rating < value && 'fill-brand/60 text-brand',
          )}
        />
      ))}
      <span className="ml-1 font-medium text-slate-700">{rating.toFixed(1)}</span>
      <span className="text-xs text-slate-400">({reviews} reviews)</span>
    </div>
  );
}




