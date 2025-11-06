# Monitoring PKS dan Kebun Dashboard

Aplikasi dashboard interaktif berbasis **React + Vite + Tailwind CSS + Recharts** untuk memantau data kelapa sawit yang tersimpan di Google Sheets. Sidebar kiri bersifat tetap sehingga navigasi tetap mudah diakses, sementara area konten utama dapat di-scroll secara vertikal.

## Fitur Utama
- Integrasi data langsung dari Google Sheets melalui Google Apps Script endpoint.
- Halaman monitoring untuk Perkebunan, Pabrik, dan Perusahaan dengan tabel dan grafik interaktif.
- Komponen grafik Recharts dengan LabelList agar nilai data tampil di atas setiap bar/titik.
- Tampilan modern bernuansa gradasi biru-ungu dengan font Inter dan soft shadow pada setiap kartu.
- Struktur folder modular: `components`, `pages`, `hooks`, `styles`, dan `utils`.

## Pengembangan
1. Instal dependensi:
   ```bash
   npm install
   ```
2. Jalankan mode pengembangan:
   ```bash
   npm run dev
   ```
3. Build untuk produksi:
   ```bash
   npm run build
   ```

Pastikan endpoint Google Sheets tersedia secara publik agar data dapat dimuat tanpa autentikasi tambahan.

## Deploy
Proyek dapat langsung di-deploy ke platform seperti **Vercel**. Pastikan proses build menjalankan `npm run build`.
