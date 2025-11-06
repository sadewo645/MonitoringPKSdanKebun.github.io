export default function DataCard({ title, value, description, trend }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-card p-6 shadow-soft transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative z-10 flex flex-col gap-3">
        <p className="text-sm font-medium uppercase tracking-widest text-white/60">{title}</p>
        <h3 className="text-3xl font-semibold text-white sm:text-4xl">{value}</h3>
        {description && <p className="text-sm text-slate-200/80">{description}</p>}
        {trend && (
          <div className="flex items-center gap-2 text-xs font-medium text-emerald-200">
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-300" />
            {trend}
          </div>
        )}
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
    </div>
  );
}
