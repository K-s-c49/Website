import { Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function QuantitySelector({ quantity = 1, onChange, min = 1, max = 10 }) {
  const decrement = () => {
    const updated = Math.max(min, quantity - 1);
    onChange?.(updated);
  };

  const increment = () => {
    const updated = Math.min(max, quantity + 1);
    onChange?.(updated);
  };

  return (
    <div className="inline-flex items-center rounded-full border border-slate-200 bg-white">
      <Button
        type="button"
        size="icon"
        variant="ghost"
        onClick={decrement}
        disabled={quantity <= min}
        aria-label="Decrease quantity"
        className="rounded-full"
      >
        <Minus className="h-4 w-4" />
      </Button>
      <span className="w-10 text-center text-sm font-semibold text-slate-700">{quantity}</span>
      <Button
        type="button"
        size="icon"
        variant="ghost"
        onClick={increment}
        disabled={quantity >= max}
        aria-label="Increase quantity"
        className="rounded-full"
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}




