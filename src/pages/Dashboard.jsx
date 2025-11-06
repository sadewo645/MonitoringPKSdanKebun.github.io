import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import PageHeader from '../components/PageHeader.jsx';
import DataCard from '../components/DataCard.jsx';
import ChartCard from '../components/ChartCard.jsx';
import { useSheetData } from '../hooks/useSheetData.js';
import { formatDateTime, formatNumber, toNumber } from '../utils/format.js';

const quickLinks = [
  {
    title: 'Monitoring Perkebunan',
    description: 'Pantau luas areal tanam, produksi, dan produktivitas kebun.',
    to: '/monitoring-perkebunan',
  },
  {
    title: 'Monitoring Pabrik',
    description: 'Lihat kapasitas olah, rendemen, dan downtime pabrik kelapa sawit.',
    to: '/monitoring-pabrik',
  },
  {
    title: 'Monitoring Perusahaan',
    description: 'Analisis kinerja operasional seluruh perusahaan pengelola.',
    to: '/monitoring-perusahaan',
  },
];

export default function Dashboard() {
  const { rows, loading, error, updatedAt } = useSheetData('Perkebunan');

  const totalAreal = useMemo(
    () => rows.reduce((sum, row) => sum + toNumber(row.Luas || row.Areal || row['Luas (Ha)']), 0),
    [rows]
  );
  const totalProduksi = useMemo(
    () => rows.reduce((sum, row) => sum + toNumber(row.Produksi || row['Produksi (Ton)']), 0),
    [rows]
  );
  const rataProduktivitas = rows.length ? totalProduksi / rows.length : 0;

  const chartData = useMemo(
    () =>
      rows.slice(0, 8).map((row, index) => ({
        name: row.Kebun || row.Wilayah || row.Perusahaan || `Data ${index + 1}`,
        produksi: toNumber(row.Produksi || row['Produksi (Ton)']),
      })),
    [rows]
  );

  return (
    <div className="space-y-10">
      <PageHeader
        title="Dashboard Utama"
        subtitle="Ringkasan cepat kondisi perkebunan kelapa sawit berdasarkan data Google Sheets."
      />

      <section className="grid gap-6 md:grid-cols-3">
        <DataCard title="Total Areal" value={`${formatNumber(totalAreal)} Ha`} description="Akumulasi luas lahan terdata." />
        <DataCard
          title="Total Produksi"
          value={`${formatNumber(totalProduksi)} Ton`}
          description="Total produksi kelapa sawit pada periode terbaru."
        />
        <DataCard
          title="Rata-rata Produktivitas"
          value={`${formatNumber(rataProduktivitas)} Ton`}
          description="Produktivitas rata-rata per entitas kebun."
        />
      </section>

      <section className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        <ChartCard
          title="Produksi Perkebunan"
          subtitle="Delapan entitas perkebunan terbaru dari Google Sheets."
          data={chartData}
          dataKey="produksi"
          nameKey="name"
          type="bar"
          color="#6366f1"
          height={360}
          seriesName="Produksi"
        />

        <div className="flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-white/5 p-6 shadow-soft">
          <div>
            <h3 className="text-lg font-semibold text-white">Status Sumber Data</h3>
            <p className="mt-2 text-sm text-slate-300">
              Data dashboard bersumber langsung dari Google Sheets dan diperbarui otomatis ketika Anda menekan tombol segarkan
              pada tiap halaman monitoring.
            </p>
          </div>
          <div className="mt-6 rounded-2xl border border-emerald-400/40 bg-emerald-500/10 p-4 text-sm text-emerald-100">
            <p className="font-semibold uppercase tracking-widest text-emerald-200">Terakhir Diperbarui</p>
            <p className="mt-2 text-base text-white">{formatDateTime(updatedAt)}</p>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h3 className="text-lg font-semibold text-white">Akses Cepat</h3>
        <div className="grid gap-6 md:grid-cols-3">
          {quickLinks.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="group flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-white/5 p-6 text-left shadow-soft transition-transform duration-300 hover:-translate-y-1 hover:bg-white/10"
            >
              <div>
                <h4 className="text-xl font-semibold text-white group-hover:text-white">{item.title}</h4>
                <p className="mt-3 text-sm text-slate-300">{item.description}</p>
              </div>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-aurora">
                Lihat detail
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 0 1 1.414 0l5 5a1 1 0 0 1 0 1.414l-5 5a1 1 0 1 1-1.414-1.414L13.586 11H4a1 1 0 1 1 0-2h9.586l-2.293-2.293a1 1 0 0 1 0-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {error && (
        <div className="rounded-3xl border border-rose-500/40 bg-rose-500/10 p-6 text-sm text-rose-100">
          Terjadi kesalahan memuat data ringkasan: {error.message}
        </div>
      )}

      {loading && (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-slate-300">
          Memuat ringkasan data terbaru...
        </div>
      )}
    </div>
  );
}
