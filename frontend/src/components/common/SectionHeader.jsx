export function SectionHeader({ eyebrow, title, description, action }) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <div className="space-y-2">
        {eyebrow && (
          <span className="text-xs font-semibold uppercase tracking-widest text-brand">
            {eyebrow}
          </span>
        )}
        <h2 className="text-2xl font-semibold text-slate-900">{title}</h2>
        {description && <p className="max-w-2xl text-sm text-slate-500">{description}</p>}
      </div>
      {action && <div className="flex items-center">{action}</div>}
    </div>
  );
}




