import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function EmptyState({ icon, title, description, action }) {
  const Icon = icon;

  return (
    <div className="flex flex-col items-center gap-4 rounded-xl border border-dashed border-slate-300 bg-white px-10 py-16 text-center">
      {Icon && <Icon className="h-10 w-10 text-brand" />}
      <div>
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        {description && <p className="mt-2 max-w-md text-sm text-slate-500">{description}</p>}
      </div>
      {action &&
        (action.to ? (
          <Button asChild>
            <Link to={action.to}>{action.label}</Link>
          </Button>
        ) : (
          <Button onClick={action.onClick}>{action.label}</Button>
        ))}
    </div>
  );
}

