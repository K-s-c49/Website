import * as React from 'react';
import { cn } from '@/lib/utils';

const DialogContext = React.createContext({
  open: false,
  onOpenChange: () => {},
});

export function Dialog({ open, onOpenChange, children }) {
  const contextValue = React.useMemo(() => ({ open, onOpenChange }), [open, onOpenChange]);

  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  return (
    <DialogContext.Provider value={contextValue}>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="fixed inset-0 bg-black/50" onClick={() => onOpenChange(false)} />
        <div className="relative z-50">{children}</div>
      </div>
    </DialogContext.Provider>
  );
}

export function DialogContent({ className, children, ...props }) {
  const { onOpenChange } = React.useContext(DialogContext);

  return (
    <div
      className={cn(
        'relative w-full max-w-lg rounded-xl border border-slate-200 bg-white p-6 shadow-lg',
        className,
      )}
      onClick={(e) => e.stopPropagation()}
      {...props}
    >
      {children}
    </div>
  );
}

export function DialogHeader({ className, ...props }) {
  return <div className={cn('flex flex-col gap-2 mb-4', className)} {...props} />;
}

export function DialogTitle({ className, ...props }) {
  return <h2 className={cn('text-xl font-semibold text-slate-900', className)} {...props} />;
}

export function DialogDescription({ className, ...props }) {
  return <p className={cn('text-sm text-slate-500', className)} {...props} />;
}

export function DialogFooter({ className, ...props }) {
  return <div className={cn('flex items-center justify-end gap-3 mt-6', className)} {...props} />;
}

