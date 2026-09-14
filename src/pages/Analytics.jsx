import { useNavigate } from 'react-router-dom';
import { Logo, Avatar } from '../components/Brand.jsx';
import { CountUp } from '../components/CountUp.jsx';
import { HOURLY_TREND, DIRECTION_MIX, ACCURACY_TREND, DAILY_SUMMARY } from '../data/mockData.js';

export default function Analytics() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center gap-1 text-sm">
              <button onClick={() => navigate('/dashboard')} className="px-3 py-2 rounded-lg text-slate-500 hover:text-navy-900 hover:bg-slate-50 font-medium transition">
                Monitoring
              </button>
              <button onClick={() => navigate('/demo')} className="px-3 py-2 rounded-lg bg-amber-50 text-amber-800 hover:bg-amber-100 font-semibold border border-amber-200 transition flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                Accurate Demo
              </button>
              <span className="px-3 py-2 rounded-lg bg-slate-100 font-medium text-navy-900">Analytics</span>
            </nav>
            <Avatar name="Sumit A." initials="SA" />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-wrap gap-3 items-end justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-navy-900">Transfer Analytics</h1>
            <p className="text-slate-500 text-sm mt-1">Bag counting performance · Last 6 weeks</p>
          </div>
          <select className="text-sm border border-slate-300 rounded-lg px-3 py-2 bg-white text-slate-600">
            <option>Today</option>
            <option>Last 7 days</option>
            <option>Last 30 days</option>
          </select>
        </div>

        {/* Hero stat tiles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          <div className="bg-navy-900 text-white p-7 rounded-2xl shadow-sm relative overflow-hidden animate-slideUp">
            <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-cement-500/10" />
            <p className="text-slate-400 text-sm font-medium">Total Bags This Month</p>
            <div className="flex items-baseline gap-3 mt-3">
              <span className="text-5xl font-extrabold text-cement-400">
                <CountUp value={DAILY_SUMMARY.totalThisMonth} />
              </span>
            </div>
            <p className="text-slate-400 text-sm mt-3">{DAILY_SUMMARY.activeTrucks} trucks · {DAILY_SUMMARY.activeLines} active bays</p>
          </div>

          <div className="bg-cement-500 text-white p-7 rounded-2xl shadow-sm relative overflow-hidden animate-slideUp" style={{ animationDelay: '80ms' }}>
            <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-white/10" />
            <p className="text-cement-100/90 text-sm font-medium">Peak Throughput</p>
            <div className="flex items-baseline gap-2 mt-3">
              <span className="text-5xl font-extrabold">
                <CountUp value={DAILY_SUMMARY.peakCount} />
              </span>
              <span className="text-xl text-cement-100/80">bags/hr</span>
            </div>
            <p className="text-cement-100/90 text-sm mt-3">Peak hour: {DAILY_SUMMARY.peakHour} · Avg {DAILY_SUMMARY.avgPerHour} bags/hr</p>
          </div>
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
          <ChartCard title="Hourly Bag Count" subtitle="In vs Out transfers" className="lg:col-span-2">
            <LineChart data={HOURLY_TREND} />
            <div className="flex gap-5 mt-4 text-xs">
              <Legend color="#16a34a" label="Bags In (Loading)" />
              <Legend color="#2563eb" label="Bags Out (Dispatch)" />
            </div>
          </ChartCard>

          <ChartCard title="Transfer Direction" subtitle="In vs Out distribution">
            <Donut data={DIRECTION_MIX} />
          </ChartCard>
        </div>

        {/* Accuracy trend */}
        <ChartCard title="Detection Accuracy — Continuous Learning" subtitle="AI counting accuracy improving over time with model updates">
          <AccuracyChart data={ACCURACY_TREND} />
        </ChartCard>

        {/* System status callout */}
        <div className="mt-6 bg-white border border-slate-200 rounded-xl p-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-lg bg-cement-50 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-cement-600" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4v6h6M20 20v-6h-6" strokeLinecap="round" strokeLinejoin="round" /><path d="M20 10a8 8 0 00-14.9-3M4 14a8 8 0 0014.9 3" strokeLinecap="round" /></svg>
            </div>
            <div>
              <p className="font-semibold text-navy-900">Model re-training pipeline active</p>
              <p className="text-sm text-slate-500">238 corrections logged · next model update in 4 days</p>
            </div>
          </div>
          <span className="px-3 py-1.5 rounded-full bg-cement-50 text-cement-700 text-sm font-medium">Self-improving</span>
        </div>
      </main>
    </div>
  );
}

function ChartCard({ title, subtitle, children, className = '' }) {
  return (
    <div className={`bg-white rounded-xl shadow-sm border border-slate-200 p-6 ${className}`}>
      <h3 className="font-bold text-navy-900">{title}</h3>
      {subtitle && <p className="text-sm text-slate-500 mt-0.5 mb-5">{subtitle}</p>}
      {children}
    </div>
  );
}

function Legend({ color, label }) {
  return (
    <span className="flex items-center gap-1.5 text-slate-500">
      <span className="w-3 h-3 rounded-sm" style={{ background: color }} /> {label}
    </span>
  );
}

// --- Line chart (in vs out bags) -------------------------------------------
function LineChart({ data }) {
  const w = 560, h = 234;
  const padL = 50, padR = 40, padT = 30, padB = 30;
  const max = 200;
  const ticks = [0, 50, 100, 150, 200];
  const x = (i) => padL + (i * (w - padL - padR)) / (data.length - 1);
  const y = (v) => h - padB - (v / max) * (h - padT - padB);
  const path = (key) => data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${x(i)} ${y(d[key])}`).join(' ');
  const area = `${path('bagsIn')} L ${x(data.length - 1)} ${h - padB} L ${x(0)} ${h - padB} Z`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full">
      {ticks.map((t) => (
        <g key={t}>
          <line x1={padL} x2={w - padR} y1={y(t)} y2={y(t)} stroke="#f1f5f9" strokeWidth="1" />
          <text x={padL - 8} y={y(t) + 3} textAnchor="end" className="fill-slate-400" fontSize="10">{t}</text>
        </g>
      ))}
      <path d={area} fill="#16a34a" opacity="0.06" />
      <path d={path('bagsIn')} fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d={path('bagsOut')} fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {data.map((d, i) => (
        <g key={d.hour}>
          <text x={x(i)} y={y(d.bagsIn) - 9} textAnchor="middle" className="fill-green-700" fontSize="9.5" fontWeight="600">{d.bagsIn}</text>
          <circle cx={x(i)} cy={y(d.bagsIn)} r="3.5" fill="#16a34a" />
          <circle cx={x(i)} cy={y(d.bagsOut)} r="3.5" fill="#2563eb" />
          <text x={x(i)} y={h - 8} textAnchor="middle" className="fill-slate-400" fontSize="11">{d.hour}</text>
        </g>
      ))}
    </svg>
  );
}

// --- Donut -----------------------------------------------------------------
function Donut({ data }) {
  const total = data.reduce((s, d) => s + d.value, 0);
  const r = 70, cx = 90, cy = 90, stroke = 26;
  const circ = 2 * Math.PI * r;
  let offset = 0;

  return (
    <div className="flex items-center gap-6">
      <svg viewBox="0 0 180 180" className="w-40 h-40 -rotate-90 shrink-0">
        {data.map((d) => {
          const len = (d.value / total) * circ;
          const seg = (
            <circle key={d.label} cx={cx} cy={cy} r={r} fill="none" stroke={d.color} strokeWidth={stroke} strokeDasharray={`${len} ${circ - len}`} strokeDashoffset={-offset} />
          );
          offset += len;
          return seg;
        })}
      </svg>
      <div className="space-y-2 text-sm">
        {data.map((d) => (
          <div key={d.label} className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-sm" style={{ background: d.color }} />
            <span className="text-slate-600 flex-1">{d.label}</span>
            <span className="font-semibold text-navy-900">{d.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- Accuracy area chart ----------------------------------------------------
function AccuracyChart({ data }) {
  const w = 900, h = 210;
  const padL = 48, padR = 40, padT = 30, padB = 30;
  const min = 92, max = 100;
  const ticks = [93, 95, 97, 99, 100];
  const x = (i) => padL + (i * (w - padL - padR)) / (data.length - 1);
  const y = (v) => h - padB - ((v - min) / (max - min)) * (h - padT - padB);
  const line = data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${x(i)} ${y(d.accuracy)}`).join(' ');
  const area = `${line} L ${x(data.length - 1)} ${h - padB} L ${x(0)} ${h - padB} Z`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full">
      {ticks.map((t) => (
        <g key={t}>
          <line x1={padL} x2={w - padR} y1={y(t)} y2={y(t)} stroke="#f1f5f9" strokeWidth="1" />
          <text x={padL - 8} y={y(t) + 3} textAnchor="end" className="fill-slate-400" fontSize="10">{t}%</text>
        </g>
      ))}
      {/* 98% target line */}
      <line x1={padL} x2={w - padR} y1={y(98)} y2={y(98)} stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="5 5" />
      <text x={w - padR} y={y(98) - 6} textAnchor="end" className="fill-amber-500" fontSize="11">98% target</text>
      <path d={area} fill="#d97706" opacity="0.08" />
      <path d={line} fill="none" stroke="#d97706" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      {data.map((d, i) => (
        <g key={d.week}>
          <circle cx={x(i)} cy={y(d.accuracy)} r="4" fill="#d97706" />
          <text x={x(i)} y={y(d.accuracy) - 12} textAnchor="middle" className="fill-navy-900" fontSize="11" fontWeight="600">{d.accuracy}%</text>
          <text x={x(i)} y={h - 10} textAnchor="middle" className="fill-slate-400" fontSize="11">{d.week}</text>
        </g>
      ))}
    </svg>
  );
}
