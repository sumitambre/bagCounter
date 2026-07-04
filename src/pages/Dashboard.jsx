import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Logo, Avatar } from '../components/Brand.jsx';
import { CountUp } from '../components/CountUp.jsx';
import { KPIS, CLAIMS } from '../data/mockData.js';
import { UploadModal } from '../components/UploadModal.jsx';

const toneStyles = {
  neutral: 'bg-white border-slate-200',
  amber: 'bg-amber-50 border-amber-200',
  green: 'bg-white border-slate-200',
};
const valueTone = {
  neutral: 'text-navy-900',
  amber: 'text-amber-600',
  green: 'text-titan-600',
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('audit');
  const [uploadOpen, setUploadOpen] = useState(false);

  const visibleClaims =
    filter === 'audit' ? CLAIMS.filter((c) => c.status === 'Review Needed') : CLAIMS;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center gap-1 text-sm">
              <span className="px-3 py-2 rounded-lg bg-slate-100 font-medium text-navy-900">Command Center</span>
              <button
                onClick={() => navigate('/analytics')}
                className="px-3 py-2 rounded-lg text-slate-500 hover:text-navy-900 hover:bg-slate-50 font-medium transition"
              >
                Analytics
              </button>
            </nav>
            <div className="relative hidden sm:block">
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="7" /><path d="M21 21l-4-4" strokeLinecap="round" />
              </svg>
              <input
                placeholder="Search Claim ID…"
                className="pl-9 pr-4 py-2 text-sm border border-slate-300 rounded-lg w-56 focus:border-titan-500 focus:ring-2 focus:ring-titan-500/20 outline-none"
              />
            </div>
            <Avatar name="Farhan A." initials="FA" />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-navy-900">Warranty Automation Command Center</h1>
            <p className="text-slate-500 text-sm mt-1">Live queue · {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setUploadOpen(true)}
              className="hidden sm:flex items-center px-4 py-2 text-sm bg-titan-500 text-white rounded-lg font-medium hover:bg-titan-600 transition shadow-sm"
            >
              + New Claim
            </button>
            <span className="hidden sm:flex items-center gap-2 text-sm text-titan-600 font-medium">
              <span className="w-2 h-2 rounded-full bg-titan-500 animate-pulse" /> AI Engine online
            </span>
          </div>
        </div>

        {/* KPI grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
          {KPIS.map((k, i) => (
            <div
              key={k.label}
              className={`p-6 rounded-xl shadow-sm border ${toneStyles[k.tone]} animate-slideUp`}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <p className={`text-sm font-medium ${k.tone === 'amber' ? 'text-amber-700' : 'text-slate-500'}`}>{k.label}</p>
              <p className={`text-3xl font-extrabold mt-2 ${valueTone[k.tone]}`}>
                <CountUp value={k.value} decimals={k.suffix === '%' ? 1 : 0} suffix={k.suffix} />
              </p>
              <p className={`text-xs mt-2 flex items-center gap-1 ${k.trendUp ? 'text-titan-600' : 'text-amber-600'}`}>
                <span>{k.trendUp ? '▲' : '▼'}</span> {k.trend}
              </p>
            </div>
          ))}
        </div>

        {/* Queue */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 flex flex-wrap gap-3 justify-between items-center">
            <h2 className="text-lg font-bold text-navy-900">Active Review Queue</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1.5 text-sm rounded-lg border transition ${filter === 'all' ? 'bg-navy-900 text-white border-navy-900' : 'bg-white border-slate-300 text-slate-600 hover:bg-slate-50'}`}
              >
                All Claims
              </button>
              <button
                onClick={() => setFilter('audit')}
                className={`px-3 py-1.5 text-sm rounded-lg border font-medium transition ${filter === 'audit' ? 'bg-amber-100 text-amber-800 border-amber-200' : 'bg-white border-slate-300 text-slate-600 hover:bg-slate-50'}`}
              >
                Requires Audit
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                  <th className="px-6 py-3 font-semibold">Claim ID</th>
                  <th className="px-6 py-3 font-semibold">Date</th>
                  <th className="px-6 py-3 font-semibold">Frame Model</th>
                  <th className="px-6 py-3 font-semibold">AI Prediction</th>
                  <th className="px-6 py-3 font-semibold">Confidence</th>
                  <th className="px-6 py-3 font-semibold">Status</th>
                  <th className="px-6 py-3 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {visibleClaims.map((c) => (
                  <tr key={c.id} className="border-t border-slate-100 hover:bg-slate-50/70 transition">
                    <td className="px-6 py-4 font-semibold text-titan-600">{c.id}</td>
                    <td className="px-6 py-4 text-slate-600">{c.date}</td>
                    <td className="px-6 py-4 text-slate-700">{c.model}</td>
                    <td className="px-6 py-4 text-slate-700">{c.defect}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 rounded-full bg-slate-200 overflow-hidden">
                          <div className="h-full bg-titan-500 rounded-full" style={{ width: `${c.confidence}%` }} />
                        </div>
                        <span className="text-xs text-slate-500">{c.confidence}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${c.status === 'Review Needed' ? 'bg-amber-100 text-amber-800' : 'bg-titan-50 text-titan-700'}`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {c.status === 'Review Needed' ? (
                        <button
                          onClick={() => navigate(`/inspect/${c.id}`)}
                          className="text-titan-600 hover:text-titan-700 font-semibold flex items-center gap-1 group"
                        >
                          Inspect
                          <span className="group-hover:translate-x-0.5 transition">→</span>
                        </button>
                      ) : (
                        <span className="text-slate-400 text-xs">Cleared</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <UploadModal open={uploadOpen} onClose={() => setUploadOpen(false)} />
    </div>
  );
}
