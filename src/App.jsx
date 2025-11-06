import { Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar.jsx';
import Dashboard from './pages/Dashboard.jsx';
import MonitoringPerkebunan from './pages/MonitoringPerkebunan.jsx';
import MonitoringPabrik from './pages/MonitoringPabrik.jsx';
import MonitoringPerusahaan from './pages/MonitoringPerusahaan.jsx';
import PanduanBudidaya from './pages/PanduanBudidaya.jsx';

export default function App() {
  return (
    <div className="flex min-h-screen bg-midnight">
      <Sidebar />
      <main className="flex-1 md:ml-72">
        <div className="relative min-h-screen bg-gradient-to-br from-midnight via-slate-900 to-royal/70 px-6 pb-16 pt-24 sm:px-10">
          <div className="mx-auto max-w-6xl">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/monitoring-perkebunan" element={<MonitoringPerkebunan />} />
              <Route path="/monitoring-pabrik" element={<MonitoringPabrik />} />
              <Route path="/monitoring-perusahaan" element={<MonitoringPerusahaan />} />
              <Route path="/panduan-budidaya" element={<PanduanBudidaya />} />
            </Routes>
          </div>
        </div>
      </main>
    </div>
  );
}
