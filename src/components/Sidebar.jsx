import { NavLink } from 'react-router-dom';
import { useState } from 'react';

const icons = {
  dashboard: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M3.75 5.25h6v6h-6zm10.5 0h6v4.5h-6zm0 9h6v4.5h-6zm-10.5 0h6v6h-6z"
      />
    </svg>
  ),
  estate: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 21h18M3 10l9-7 9 7" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.5 21V9.5L12 4l7.5 5.5V21" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 21v-6h6v6" />
    </svg>
  ),
  factory: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M4.5 21V9l5.25 3V9l5.25 3V4.5L19.5 7.5V21z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 21v-3m3 3v-3m3 3v-3" />
    </svg>
  ),
  company: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.5 21V4.5h8.25V21" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12.75 21V9H19.5v12" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7.5 8.25h2.25m-2.25 4.5h2.25m5.25 0H18" />
    </svg>
  ),
  guide: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.5 5.25h9M4.5 9.75h9" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 4.5v15a1.5 1.5 0 0 0 1.5 1.5h11.25" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15.75 3.75H18a1.5 1.5 0 0 1 1.5 1.5V21L15.75 18.75" />
    </svg>
  ),
};

const links = [
  { to: '/', label: 'Dashboard', icon: icons.dashboard },
  { to: '/monitoring-perkebunan', label: 'Monitoring Perkebunan', icon: icons.estate },
  { to: '/monitoring-pabrik', label: 'Monitoring Pabrik', icon: icons.factory },
  { to: '/monitoring-perusahaan', label: 'Monitoring Perusahaan', icon: icons.company },
  { to: '/panduan-budidaya', label: 'Panduan Budidaya', icon: icons.guide },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="md:hidden fixed top-4 left-4 z-40 rounded-full bg-gradient-aurora p-2 shadow-soft"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Toggle menu"
      >
        <span className="mb-1 block h-0.5 w-6 bg-white" />
        <span className="mb-1 block h-0.5 w-6 bg-white" />
        <span className="block h-0.5 w-6 bg-white" />
      </button>

      <aside
        className={`fixed left-0 top-0 z-30 flex h-full w-72 flex-col border-r border-white/5 bg-midnight/95 backdrop-blur-md transition-transform duration-500 ease-out shadow-xl ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="flex items-center gap-3 border-b border-white/5 bg-gradient-aurora px-8 py-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
            <span className="text-2xl font-semibold text-white">PKS</span>
          </div>
          <div>
            <p className="text-sm uppercase tracking-wide text-white/70">Sistem Monitoring</p>
            <h1 className="text-lg font-semibold text-white">Kelapa Sawit</h1>
          </div>
        </div>

        <nav className="scrollbar-thin flex-1 space-y-1 overflow-y-auto px-4 py-6">
          {links.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors duration-300 ${
                  isActive
                    ? 'bg-gradient-card text-white shadow-soft'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              <span className="text-slate-200">{icon}</span>
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-white/5 px-6 py-6 text-xs text-slate-400">
          <p className="font-semibold text-white/70">Terakhir diperbarui</p>
          <p>Sumber data: Google Sheets</p>
        </div>
      </aside>
    </>
  );
}
