import { useState } from 'react';
import { cn } from '@/lib/utils';

export function Tabs({ tabs = [], defaultValue, className, onChange }) {
  const [active, setActive] = useState(defaultValue ?? tabs[0]?.value);

  const handleChange = (value) => {
    setActive(value);
    onChange?.(value);
  };

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <div className="flex flex-wrap items-center gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            type="button"
            className={cn(
              'rounded-full border px-4 py-1.5 text-sm font-medium transition',
              active === tab.value
                ? 'border-transparent bg-brand text-white shadow'
                : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50',
            )}
            onClick={() => handleChange(tab.value)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div>
        {tabs.map(
          (tab) =>
            tab.value === active && (
              <div key={tab.value} role="tabpanel" aria-labelledby={tab.value}>
                {tab.content}
              </div>
            ),
        )}
      </div>
    </div>
  );
}






