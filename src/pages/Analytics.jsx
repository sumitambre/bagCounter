import { useNavigate } from 'react-router-dom';
import { Logo, Avatar } from '../components/Brand.jsx';
import { CountUp } from '../components/CountUp.jsx';
import { CLAIMS_TREND, DEFECT_MIX, ACCURACY_TREND } from '../data/mockData.js';

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
                Command Center
              </button>
              <span className="px-3 py-2 rounded-lg bg-slate-100 font-medium text-navy-900">Analytics</span>
            </nav>
            <Avatar name="Farhan A." initials="FA" />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-wrap gap-3 items-end justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-navy-900">Performance &amp; Impact</h1>
            <p className="text-slate-500 text-sm mt-1">Warranty automation results · Last 6 weeks</p>
          </div>
          <select className="text-sm border border-slate-300 rounded-lg px-3 py-2 bg-white text-slate-600">
            <option>Last 7 days</option>
            <option>Last 6 weeks</option>
            <option>Last quarter</option>
          </select>
        </div>

        {/* Hero stat tiles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          <div className="bg-navy-900 text-white p-7 rounded-2xl shadow-sm relative overflow-hidden animate-slideUp">
            <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-titan-500/10" />
            <p className="text-slate-400 text-sm font-medium">Average Claim Turnaround</p>
            <div className="flex items-baseline gap-3 mt-3">
              <span className="text-slate-500 line-through text-2xl">6 hrs</span>
              <span className="text-titan-400 text-lg">→</span>
              <span className="text-5xl font-extrabold text-titan-400">15 sec</span>
            </div>
            <p className="text-slate-400 text-sm mt-3">99.9% faster with AI auto-processing</p>
          </div>

          <div className="bg-titan-500 text-white p-7 rounded-2xl shadow-sm relative overflow-hidden animate-slideUp" style={{ animationDelay: '80ms' }}>
            <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-white/10" />
            <p className="text-titan-50/90 text-sm font-medium">Estimated Monthly Cost Saved</p>
            <p className="text-5xl font-extrabold mt-3">
              ₹<CountUp value={18.4} decimals={1} /> L
            </p>
            <p className="text-titan-50/90 text-sm mt-3">Based on ~35,000 auto-processed claims / month</p>
          </div>
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
          <ChartCard title="Claims Volume" subtitle="Total vs AI auto-processed" className="lg:col-span-2">
            <LineChart data={CLAIMS_TREND} />
            <div className="flex gap-5 mt-4 text-xs">
              <Legend color="#0f2544" label="Total claims" />
              <Legend color="#00a651" label="AI auto-processed" />
            </div>
          </ChartCard>

          <ChartCard title="Defect Mix" subtitle="Share of flagged claims">
            <Donut data={DEFECT_MIX} />
          </ChartCard>
        </div>

        {/* Accuracy trend */}
        <ChartCard title="AI Accuracy — Continuous Learning" subtitle="Model accuracy climbing past the 90% target as it learns from auditor feedback">
          <AccuracyChart data={ACCURACY_TREND} />
        </ChartCard>

        {/* Feedback loop callout */}
        <div className="mt-6 bg-white border border-slate-200 rounded-xl p-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-lg bg-titan-50 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-titan-600" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4v6h6M20 20v-6h-6" strokeLinecap="round" strokeLinejoin="round" /><path d="M20 10a8 8 0 00-14.9-3M4 14a8 8 0 0014.9 3" strokeLinecap="round" /></svg>
            </div>
            <div>
              <p className="font-semibold text-navy-900">In-app feedback loop is active</p>
              <p className="text-sm text-slate-500">142 auditor corrections logged this cycle · next model update in 6 days</p>
            </div>
          </div>
          <span className="px-3 py-1.5 rounded-full bg-titan-50 text-titan-700 text-sm font-medium">Self-improving</span>
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

// --- Line chart (total vs auto) --------------------------------------------
function LineChart({ data }) {
  const w = 560, h = 220, pad = 30;
  const max = Math.max(...data.map((d) => d.claims)) * 1.1;
  const x = (i) => pad + (i * (w - pad * 2)) / (data.length - 1);
  const y = (v) => h - pad - (v / max) * (h - pad * 2);
  const path = (key) => data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${x(i)} ${y(d[key])}`).join(' ');
  const area = `${path('claims')} L ${x(data.length - 1)} ${h - pad} L ${x(0)} ${h - pad} Z`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full">
      {[0.25, 0.5, 0.75, 1].map((g) => (
        <line key={g} x1={pad} x2={w - pad} y1={y(max * g)} y2={y(max * g)} stroke="#f1f5f9" strokeWidth="1" />
      ))}
      <path d={area} fill="#0f2544" opacity="0.04" />
      <path d={path('claims')} fill="none" stroke="#0f2544" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d={path('auto')} fill="none" stroke="#00a651" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {data.map((d, i) => (
        <g key={d.day}>
          <circle cx={x(i)} cy={y(d.claims)} r="3.5" fill="#0f2544" />
          <circle cx={x(i)} cy={y(d.auto)} r="3.5" fill="#00a651" />
          <text x={x(i)} y={h - 8} textAnchor="middle" className="fill-slate-400" fontSize="11">{d.day}</text>
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
  const w = 900, h = 200, pad = 34;
  const min = 78, max = 100;
  const x = (i) => pad + (i * (w - pad * 2)) / (data.length - 1);
  const y = (v) => h - pad - ((v - min) / (max - min)) * (h - pad * 2);
  const line = data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${x(i)} ${y(d.accuracy)}`).join(' ');
  const area = `${line} L ${x(data.length - 1)} ${h - pad} L ${x(0)} ${h - pad} Z`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full">
      {/* 90% target line */}
      <line x1={pad} x2={w - pad} y1={y(90)} y2={y(90)} stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="5 5" />
      <text x={w - pad} y={y(90) - 6} textAnchor="end" className="fill-amber-500" fontSize="11">90% target</text>
      <path d={area} fill="#00a651" opacity="0.08" />
      <path d={line} fill="none" stroke="#00a651" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      {data.map((d, i) => (
        <g key={d.week}>
          <circle cx={x(i)} cy={y(d.accuracy)} r="4" fill="#00a651" />
          <text x={x(i)} y={y(d.accuracy) - 12} textAnchor="middle" className="fill-navy-900" fontSize="11" fontWeight="600">{d.accuracy}%</text>
          <text x={x(i)} y={h - 10} textAnchor="middle" className="fill-slate-400" fontSize="11">{d.week}</text>
        </g>
      ))}
    </svg>
  );
}
