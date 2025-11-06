import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LabelList,
} from 'recharts';

import { formatNumber } from '../utils/format.js';

const chartComponents = {
  line: LineChart,
  bar: BarChart,
};

export default function ChartCard({
  title,
  subtitle,
  data,
  dataKey,
  nameKey = 'name',
  type = 'line',
  color = '#7c3aed',
  height = 320,
  seriesName = 'Nilai',
}) {
  const ChartComponent = chartComponents[type] ?? LineChart;

  const renderChartContent = () => {
    if (type === 'bar') {
      return (
        <Bar dataKey={dataKey} fill={color} radius={[12, 12, 0, 0]} name={seriesName}>
          <LabelList dataKey={dataKey} position="top" formatter={formatNumber} fill="#fff" style={{ fontSize: 12 }} />
        </Bar>
      );
    }

    return (
      <Line
        type="monotone"
        dataKey={dataKey}
        stroke={color}
        strokeWidth={3}
        dot={{ r: 6, strokeWidth: 2, stroke: '#c4b5fd', fill: color }}
        activeDot={{ r: 8 }}
        name={seriesName}
      >
        <LabelList dataKey={dataKey} position="top" formatter={formatNumber} fill="#fff" style={{ fontSize: 12 }} />
      </Line>
    );
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-soft backdrop-blur">
      <div className="mb-6 flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        {subtitle && <p className="text-sm text-slate-300">{subtitle}</p>}
      </div>
      <div className="w-full" style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <ChartComponent data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.2)" />
            <XAxis dataKey={nameKey} stroke="rgba(226, 232, 240, 0.7)" tick={{ fill: '#e2e8f0' }} />
            <YAxis stroke="rgba(226, 232, 240, 0.7)" tickFormatter={formatNumber} tick={{ fill: '#e2e8f0' }} />
            <Tooltip
              cursor={{ stroke: 'rgba(148, 163, 184, 0.3)', strokeWidth: 2 }}
              contentStyle={{
                background: 'rgba(15, 23, 42, 0.95)',
                borderRadius: '16px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#e2e8f0',
              }}
              formatter={(value) => formatNumber(value)}
            />
            <Legend wrapperStyle={{ color: '#e2e8f0' }} />
            {renderChartContent()}
          </ChartComponent>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
