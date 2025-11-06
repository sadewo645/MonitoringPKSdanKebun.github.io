export default function PageHeader({ title, subtitle, action }) {
  return (
    <header className="mb-8 flex flex-col gap-4 rounded-3xl border border-white/5 bg-gradient-to-r from-royal/40 via-aurora/30 to-royal/20 p-8 shadow-soft backdrop-blur">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-white/60">Sistem Monitoring Sawit</p>
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">{title}</h2>
        </div>
        {action && <div className="flex items-center gap-3">{action}</div>}
      </div>
      {subtitle && <p className="max-w-3xl text-base text-slate-300">{subtitle}</p>}
    </header>
  );
}
