export default function DataTable({ rows, loading, error, emptyMessage = 'Belum ada data.' }) {
  if (loading) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center text-slate-300 shadow-soft">
        Memuat data dari Google Sheets...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-3xl border border-rose-500/30 bg-rose-500/10 p-8 text-center text-rose-200 shadow-soft">
        Terjadi kesalahan saat mengambil data. Silakan coba lagi.
      </div>
    );
  }

  if (!rows?.length) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center text-slate-300 shadow-soft">
        {emptyMessage}
      </div>
    );
  }

  const columns = Object.keys(rows[0]);

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 shadow-soft">
      <div className="overflow-auto scrollbar-thin">
        <table className="min-w-full divide-y divide-white/10 bg-midnight/40">
          <thead className="bg-white/5">
            <tr>
              {columns.map((column) => (
                <th
                  key={column}
                  scope="col"
                  className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-widest text-white/70"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-sm">
            {rows.map((row, idx) => (
              <tr key={idx} className="transition-colors duration-200 hover:bg-white/5">
                {columns.map((column) => (
                  <td key={column} className="px-6 py-4 text-slate-200/90">
                    {row[column] ?? '-'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
