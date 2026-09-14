import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Logo, Avatar } from '../components/Brand.jsx';
import { CountUp } from '../components/CountUp.jsx';
import { KPIS, TRANSFER_EVENTS, SESSIONS } from '../data/mockData.js';

const toneStyles = {
  neutral: 'bg-white border-slate-200',
  amber: 'bg-amber-50 border-amber-200',
  green: 'bg-white border-slate-200',
};
const valueTone = {
  neutral: 'text-navy-900',
  amber: 'text-cement-600',
  green: 'text-cement-600',
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');
  const [liveIn, setLiveIn] = useState(962);
  const [liveOut, setLiveOut] = useState(885);

  // Simulate live counting increments
  useEffect(() => {
    const interval = setInterval(() => {
      const dir = Math.random() > 0.45 ? 'in' : 'out';
      if (dir === 'in') setLiveIn((p) => p + 1);
      else setLiveOut((p) => p + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const filteredEvents =
    filter === 'all'
      ? TRANSFER_EVENTS
      : TRANSFER_EVENTS.filter((e) => e.direction === filter.toUpperCase());

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center gap-1 text-sm">
              <span className="px-3 py-2 rounded-lg bg-slate-100 font-medium text-navy-900">Monitoring</span>
              <button
                onClick={() => navigate('/demo')}
                className="px-3 py-2 rounded-lg bg-amber-50 text-amber-800 hover:bg-amber-100 font-semibold border border-amber-200 transition flex items-center gap-1.5"
              >
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                Accurate Demo
              </button>
              <button
                onClick={() => navigate('/analytics')}
                className="px-3 py-2 rounded-lg text-slate-500 hover:text-navy-900 hover:bg-slate-50 font-medium transition"
              >
                Analytics
              </button>
            </nav>
            <Avatar name="Sumit A." initials="SA" />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-navy-900">Transfer Monitoring Center</h1>
            <p className="text-slate-500 text-sm mt-1">Live tracking · {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden sm:flex items-center gap-2 text-sm text-cement-600 font-medium">
              <span className="w-2 h-2 rounded-full bg-cement-500 animate-pulse2" /> AI Engine Online
            </span>
          </div>
        </div>

        {/* KPI grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
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
              <p className={`text-xs mt-2 flex items-center gap-1 ${k.trendUp ? 'text-cement-600' : 'text-amber-600'}`}>
                <span>{k.trendUp ? '▲' : '▼'}</span> {k.trend}
              </p>
            </div>
          ))}
        </div>

        {/* Video + Live Counting Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
          {/* CCTV Video Feed */}
          <div className="lg:col-span-2 bg-navy-900 rounded-xl border border-slate-700/60 overflow-hidden">
            <div className="px-5 py-3 border-b border-slate-700/60 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse2" />
                <span className="text-white font-medium text-sm">CCTV Feed — Loading Bay 1</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate('/demo')}
                  className="text-xs bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-semibold px-2.5 py-1 rounded-md border border-amber-500/30 transition flex items-center gap-1"
                >
                  Open Accurate Demo →
                </button>
                <span className="text-slate-500 text-xs">Camera 01 · 1080p</span>
              </div>
            </div>
            <div className="relative aspect-video bg-navy-800 flex items-center justify-center">
              {/* Live CCTV feed with real counting line & single-color AI detection overlay */}
              <video
                className="w-full h-full object-contain"
                src="/videos/0912_overlay_h264.mp4"
                autoPlay
                muted
                loop
                playsInline
              />
            </div>
          </div>

          {/* Live Counting Indicators */}
          <div className="flex flex-col gap-5">
            {/* In Count */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex-1 flex flex-col justify-center animate-slideUp" style={{ animationDelay: '100ms' }}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M12 19V5M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-slate-500">Bags In (Loading)</span>
              </div>
              <p className="text-4xl font-extrabold text-green-600">
                <CountUp value={liveIn} />
              </p>
              <p className="text-xs text-slate-400 mt-2">Storage → Truck</p>
            </div>

            {/* Out Count */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex-1 flex flex-col justify-center animate-slideUp" style={{ animationDelay: '200ms' }}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M12 5v14M19 12l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-slate-500">Bags Out (Dispatch)</span>
              </div>
              <p className="text-4xl font-extrabold text-blue-600">
                <CountUp value={liveOut} />
              </p>
              <p className="text-xs text-slate-400 mt-2">Truck → Destination</p>
            </div>

            {/* Total */}
            <div className="bg-navy-900 rounded-xl shadow-sm border border-slate-700/60 p-6 flex-1 flex flex-col justify-center animate-slideUp" style={{ animationDelay: '300ms' }}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-cement-500/20 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 text-cement-400" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-slate-400">Total Count</span>
              </div>
              <p className="text-4xl font-extrabold text-cement-400">
                <CountUp value={liveIn + liveOut} />
              </p>
              <p className="text-xs text-slate-500 mt-2">All transfers today</p>
            </div>
          </div>
        </div>

        {/* Active Sessions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
          {SESSIONS.map((s, i) => (
            <div
              key={s.id}
              className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 animate-slideUp cursor-pointer hover:shadow-md transition"
              style={{ animationDelay: `${i * 80}ms` }}
              onClick={() => navigate(`/inspect/${s.id}`)}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="font-bold text-navy-900">{s.truck}</p>
                  <p className="text-xs text-slate-500">{s.bay}</p>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${s.status === 'Active' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-slate-100 text-slate-600 border border-slate-200'}`}>
                  {s.status === 'Active' && <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5 animate-pulse2" />}
                  {s.status}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div>
                  <p className="text-xs text-slate-500">In</p>
                  <p className="text-lg font-bold text-green-600">{s.bagsIn}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Out</p>
                  <p className="text-lg font-bold text-blue-600">{s.bagsOut}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Accuracy</p>
                  <p className="text-lg font-bold text-cement-600">{s.confidence}%</p>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-slate-100 flex justify-between text-xs text-slate-400">
                <span>{s.startTime.split(' ')[1]} – {s.endTime.split(' ')[1]}</span>
                <span className="text-cement-600 font-medium">View Details →</span>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Transfer Events */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 flex flex-wrap gap-3 justify-between items-center">
            <h2 className="text-lg font-bold text-navy-900">Recent Transfer Events</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1.5 text-sm rounded-lg border transition ${filter === 'all' ? 'bg-navy-900 text-white border-navy-900' : 'bg-white border-slate-300 text-slate-600 hover:bg-slate-50'}`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('in')}
                className={`px-3 py-1.5 text-sm rounded-lg border font-medium transition ${filter === 'in' ? 'bg-green-100 text-green-800 border-green-200' : 'bg-white border-slate-300 text-slate-600 hover:bg-slate-50'}`}
              >
                In Only
              </button>
              <button
                onClick={() => setFilter('out')}
                className={`px-3 py-1.5 text-sm rounded-lg border font-medium transition ${filter === 'out' ? 'bg-blue-100 text-blue-800 border-blue-200' : 'bg-white border-slate-300 text-slate-600 hover:bg-slate-50'}`}
              >
                Out Only
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                  <th className="px-6 py-3 font-semibold">Event ID</th>
                  <th className="px-6 py-3 font-semibold">Timestamp</th>
                  <th className="px-6 py-3 font-semibold">Direction</th>
                  <th className="px-6 py-3 font-semibold">Bag Count</th>
                  <th className="px-6 py-3 font-semibold">Truck</th>
                  <th className="px-6 py-3 font-semibold">Bay</th>
                  <th className="px-6 py-3 font-semibold">Confidence</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {filteredEvents.map((e) => (
                  <tr key={e.id} className="border-t border-slate-100 hover:bg-slate-50/70 transition">
                    <td className="px-6 py-4 font-semibold text-cement-600">{e.id}</td>
                    <td className="px-6 py-4 text-slate-600 font-mono text-xs">{e.timestamp}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${e.direction === 'IN' ? 'bg-green-50 text-green-700' : 'bg-blue-50 text-blue-700'}`}>
                        {e.direction === 'IN' ? '↑' : '↓'} {e.direction}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold text-navy-900">{e.count}</td>
                    <td className="px-6 py-4 text-slate-700">{e.truck}</td>
                    <td className="px-6 py-4 text-slate-500">{e.worker}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 rounded-full bg-slate-200 overflow-hidden">
                          <div className="h-full bg-cement-500 rounded-full" style={{ width: `${e.confidence}%` }} />
                        </div>
                        <span className="text-xs text-slate-500">{e.confidence}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
