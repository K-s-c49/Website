import * as React from 'react';
import { cn } from '@/lib/utils';

const Avatar = React.forwardRef(({ src, alt, fallback, className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-slate-200', className)}
    {...props}
  >
    {src ? (
      <img src={src} alt={alt} className="h-full w-full object-cover" loading="lazy" />
    ) : (
      <span className="flex h-full w-full items-center justify-center text-sm font-medium text-slate-600">
        {fallback}
      </span>
    )}
  </div>
));
Avatar.displayName = 'Avatar';

export { Avatar };




