import PageHeader from '../components/PageHeader.jsx';

const guides = [
  {
    title: 'Persiapan Lahan & Bibit',
    description:
      'Lakukan analisis kesuburan tanah, gunakan bibit unggul bersertifikat, dan terapkan sistem pembibitan berjenjang untuk memastikan pertumbuhan optimal.',
  },
  {
    title: 'Pemeliharaan Tanaman',
    description:
      'Terapkan pemupukan berimbang berdasarkan rekomendasi analisis daun, lakukan pemangkasan teratur, serta pengendalian gulma ramah lingkungan.',
  },
  {
    title: 'Pengendalian Hama & Penyakit',
    description:
      'Monitoring rutin menggunakan metode sensus, gunakan agen hayati, dan hanya gunakan pestisida kimia sebagai pilihan terakhir.',
  },
  {
    title: 'Panen & Pascapanen',
    description:
      'Panen berdasarkan standar kematangan buah, minimalkan kehilangan brondolan, dan atur rantai pasok ke pabrik untuk menjaga kualitas CPO.',
  },
];

export default function PanduanBudidaya() {
  return (
    <div className="space-y-10">
      <PageHeader
        title="Panduan Budidaya Kelapa Sawit"
        subtitle="Rangkaian praktik terbaik untuk meningkatkan produktivitas dan keberlanjutan kebun kelapa sawit."
      />

      <section className="grid gap-6 md:grid-cols-2">
        {guides.map((guide) => (
          <div
            key={guide.title}
            className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-soft transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <h3 className="text-xl font-semibold text-white">{guide.title}</h3>
            <p className="mt-3 text-sm text-slate-300">{guide.description}</p>
          </div>
        ))}
      </section>

      <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-royal/60 to-aurora/60 p-8 shadow-soft">
        <h3 className="text-2xl font-semibold text-white">Tips Monitoring Lapangan</h3>
        <ul className="mt-4 list-disc space-y-2 pl-6 text-sm text-slate-100/90">
          <li>Gunakan aplikasi mobile untuk input data lapangan secara real-time.</li>
          <li>Sinkronkan data inspeksi dengan Google Sheets agar visualisasi selalu terbarui.</li>
          <li>Kolaborasikan tim agronomi, pabrik, dan manajemen dalam satu dashboard terpadu.</li>
        </ul>
      </section>
    </div>
  );
}
