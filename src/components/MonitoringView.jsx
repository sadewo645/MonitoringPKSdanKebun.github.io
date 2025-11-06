import { useEffect, useMemo, useState } from 'react';
import PageHeader from './PageHeader.jsx';
import ChartCard from './ChartCard.jsx';
import DataTable from './DataTable.jsx';
import DataCard from './DataCard.jsx';
import { useSheetData } from '../hooks/useSheetData.js';
import { formatDateTime, formatNumber, toNumber } from '../utils/format.js';

export default function MonitoringView({
  title,
  subtitle,
  sheetName,
  primaryColor = '#7c3aed',
}) {
  const { rows, loading, error, updatedAt, refresh } = useSheetData(sheetName);

  const columns = useMemo(() => (rows[0] ? Object.keys(rows[0]) : []), [rows]);

  const labelColumn = useMemo(() => {
    if (!columns.length) return 'Data';
    const candidate = columns.find((key) => {
      const sample = rows.find((row) => row[key]);
      if (!sample) return false;
      const numeric = !Number.isNaN(toNumber(sample[key])) && sample[key] !== '';
      return !numeric;
    });
    return candidate ?? columns[0];
  }, [columns, rows]);

  const numericColumns = useMemo(() => {
    if (!columns.length) return [];
    return columns.filter((key) =>
      rows.some((row) => {
        const raw = row[key];
        if (raw === null || raw === undefined || raw === '') return false;
        const value = toNumber(raw);
        return !Number.isNaN(value) && value !== 0;
      })
    );
  }, [columns, rows]);

  const [selectedMetric, setSelectedMetric] = useState('');

  useEffect(() => {
    if (!selectedMetric && numericColumns.length > 0) {
      setSelectedMetric(numericColumns[0]);
    }
  }, [numericColumns, selectedMetric]);

  const chartData = useMemo(() => {
    if (!rows.length || !selectedMetric) return [];
    return rows.map((row, index) => ({
      name: row[labelColumn] || `Data ${index + 1}`,
      value: toNumber(row[selectedMetric]),
    }));
  }, [rows, labelColumn, selectedMetric]);

  const totalEntries = rows.length;
  const totalValue = useMemo(() => {
    if (!selectedMetric) return 0;
    return rows.reduce((sum, row) => sum + toNumber(row[selectedMetric]), 0);
  }, [rows, selectedMetric]);

  const averageValue = totalEntries ? totalValue / totalEntries : 0;

  return (
    <div className="space-y-10">
      <PageHeader
        title={title}
        subtitle={subtitle}
        action={
          <button
            type="button"
            onClick={refresh}
            className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/20"
          >
            Segarkan Data
          </button>
        }
      />

      <section className="grid gap-6 md:grid-cols-3">
        <DataCard title="Total Entri" value={formatNumber(totalEntries)} description="Jumlah baris data yang tersedia." />
        <DataCard
          title={`Total ${selectedMetric || ''}`.trim()}
          value={formatNumber(totalValue)}
          description={`Akumulasi nilai untuk kolom ${selectedMetric || 'yang dipilih'}.`}
        />
        <DataCard
          title={`Rata-rata ${selectedMetric || ''}`.trim()}
          value={formatNumber(averageValue)}
          description="Nilai rata-rata dari data yang dipilih."
        />
      </section>

      <section className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-white">Visualisasi Data</h3>
            <p className="text-sm text-slate-300">
              Pilih metrik yang ingin divisualisasikan dari Google Sheets untuk mendapatkan insight cepat.
            </p>
          </div>
          {numericColumns.length > 0 && (
            <select
              value={selectedMetric}
              onChange={(event) => setSelectedMetric(event.target.value)}
              className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-white outline-none transition focus:border-white/40"
            >
              {numericColumns.map((column) => (
                <option key={column} value={column} className="bg-slate-900 text-white">
                  {column}
                </option>
              ))}
            </select>
          )}
        </div>

        <ChartCard
          title={`Tren ${selectedMetric || labelColumn}`}
          subtitle={`Perbandingan nilai ${selectedMetric || labelColumn} per ${labelColumn}.`}
          data={chartData}
          dataKey="value"
          nameKey="name"
          type={numericColumns.length > 2 ? 'line' : 'bar'}
          color={primaryColor}
          seriesName={selectedMetric || 'Nilai'}
        />
      </section>

      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-lg font-semibold text-white">Data Lengkap</h3>
          <p className="text-sm text-slate-400">
            Diperbarui {formatDateTime(updatedAt)} — {totalEntries} entri dari Google Sheets.
          </p>
        </div>
        <DataTable rows={rows} loading={loading} error={error} />
      </section>
    </div>
  );
}
