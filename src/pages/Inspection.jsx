import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { SESSIONS } from '../data/mockData.js';

export default function Inspection() {
  const { id } = useParams();
  const navigate = useNavigate();
  const session = SESSIONS.find((s) => s.id === id) || SESSIONS[0];

  const [showBoxes, setShowBoxes] = useState(true);
  const [toast, setToast] = useState(null);

  const handleAction = useCallback(
    (action) => {
      setToast(action);
      setTimeout(() => navigate('/dashboard'), 1400);
    },
    [navigate]
  );

  // keyboard shortcuts
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') navigate('/dashboard');
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [navigate]);

  const totalBags = session.bagsIn + session.bagsOut;
  const duration = (() => {
    const start = new Date(session.startTime);
    const end = new Date(session.endTime);
    const mins = Math.round((end - start) / 60000);
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return `${h}h ${m}m`;
  })();

  return (
    <div className="min-h-screen bg-navy-900 text-slate-200 p-4 lg:p-6">
      {/* Toast */}
      {toast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 animate-toastIn">
          <div className="px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 text-white font-semibold bg-cement-500">
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Session {session.id} {toast} · returning to dashboard…
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-wrap gap-3 justify-between items-center mb-5">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/dashboard')} className="text-slate-400 hover:text-white flex items-center gap-1 transition">
            ← Back to Monitoring
          </button>
          <h1 className="text-xl font-bold text-white">Session: {session.id}</h1>
          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${session.status === 'Active' ? 'bg-green-500/15 text-green-300 border border-green-500/20' : 'bg-slate-500/15 text-slate-300 border border-slate-500/20'}`}>
            {session.status}
          </span>
        </div>
        <div className="text-sm text-slate-400 flex items-center gap-3">
          <span>Press <kbd className="bg-navy-800 px-2 py-1 rounded border border-slate-700 text-slate-300">Esc</kbd> to go back</span>
        </div>
      </div>

      {/* Split workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:h-[82vh]">
        {/* Video / Visualizer */}
        <div className="lg:col-span-8 bg-navy-800 rounded-xl border border-slate-700/60 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-slate-700/60 flex justify-between items-center">
            <span className="font-medium text-white">{session.truck} · {session.bay}</span>
            <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
              <input type="checkbox" checked={showBoxes} onChange={(e) => setShowBoxes(e.target.checked)} className="rounded bg-navy-900 border-slate-600 text-cement-500 focus:ring-cement-500" />
              <span>Show AI Detection Boxes</span>
            </label>
          </div>

          <div className="flex-1 bg-navy-900 min-h-[320px] relative flex items-center justify-center">
            {/* Video placeholder */}
            <div className="flex flex-col items-center gap-4 text-slate-500">
              <svg viewBox="0 0 24 24" className="w-20 h-20" fill="none" stroke="currentColor" strokeWidth="1">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <circle cx="12" cy="12" r="3" />
                <path d="M2 8h20" />
              </svg>
              <div className="text-center">
                <p className="text-sm font-medium text-slate-400">Transfer Session Recording</p>
                <p className="text-xs text-slate-600 mt-1">{session.startTime} – {session.endTime}</p>
              </div>
            </div>

            {/* Counting line overlay */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute left-[8%] right-[8%] top-[58%] border-t-2 border-dashed border-cement-400/50" />
              <span className="absolute left-[8%] top-[58%] -translate-y-6 text-cement-400 text-xs font-bold bg-navy-900/80 px-2 py-0.5 rounded">
                ← COUNTING LINE →
              </span>
            </div>

            {/* Bounding boxes */}
            {showBoxes && session.boxes.map((b, i) => (
              <div
                key={i}
                className="absolute border-2 border-cement-400 bg-cement-400/15 rounded animate-drawBox"
                style={{
                  left: `${b.x}%`,
                  top: `${b.y}%`,
                  width: `${b.width}%`,
                  height: `${b.height}%`,
                }}
              >
                <span className="absolute -top-6 left-0 whitespace-nowrap bg-cement-500 text-white text-xs px-2 py-0.5 rounded font-bold shadow-lg">
                  {b.label} ({b.confidence}%)
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Session Details panel */}
        <div className="lg:col-span-4 flex flex-col gap-5 overflow-y-auto scrollbar-thin">
          {/* Session info */}
          <div className="bg-navy-800 p-5 rounded-xl border border-slate-700/60">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Session Details</h3>
            <div className="space-y-2.5 text-sm">
              <Row label="Truck" value={session.truck} />
              <Row label="Loading Bay" value={session.bay} />
              <Row label="Start Time" value={session.startTime} />
              <Row label="End Time" value={session.endTime} />
              <Row label="Duration" value={duration} />
            </div>
          </div>

          {/* Counting results */}
          <div className="bg-navy-800 p-5 rounded-xl border border-slate-700/60 flex-1">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-cement-400" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinejoin="round" /></svg>
              Counting Results
            </h3>

            <div className="grid grid-cols-3 gap-3 mb-5">
              <div className="bg-navy-900/50 p-3 rounded-lg text-center">
                <p className="text-xs text-slate-400">In</p>
                <p className="text-2xl font-bold text-green-400">{session.bagsIn}</p>
              </div>
              <div className="bg-navy-900/50 p-3 rounded-lg text-center">
                <p className="text-xs text-slate-400">Out</p>
                <p className="text-2xl font-bold text-blue-400">{session.bagsOut}</p>
              </div>
              <div className="bg-navy-900/50 p-3 rounded-lg text-center">
                <p className="text-xs text-slate-400">Total</p>
                <p className="text-2xl font-bold text-cement-400">{totalBags}</p>
              </div>
            </div>

            <div className="mb-5">
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-slate-400">Detection Confidence</span>
                <span className="text-white font-semibold">{session.confidence}%</span>
              </div>
              <div className="w-full bg-navy-900 rounded-full h-2 overflow-hidden">
                <div className="bg-cement-500 h-2 rounded-full transition-all duration-1000 ease-out" style={{ width: `${session.confidence}%` }} />
              </div>
            </div>

            <div className="bg-navy-900/50 p-4 rounded-lg border border-slate-700/40">
              <p className="text-xs text-slate-400 mb-1.5">Transfer Summary</p>
              <p className="font-bold text-cement-400">
                {totalBags} bags counted in {duration}
              </p>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                {session.bagsIn > 0 ? `${session.bagsIn} bags loaded from storage to ${session.truck}.` : ''}
                {session.bagsOut > 0 ? ` ${session.bagsOut} bags dispatched from ${session.truck}.` : ''}
                {' '}Average confidence: {session.confidence}%.
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-navy-800 p-5 rounded-xl border border-slate-700/60">
            <div className="grid grid-cols-2 gap-3 mb-3">
              <button onClick={() => handleAction('Verified')} className="bg-cement-500 hover:bg-cement-600 text-white font-bold py-3 rounded-lg transition shadow-lg shadow-cement-900/30">
                Verify Count
              </button>
              <button onClick={() => handleAction('Flagged')} className="bg-rose-600 hover:bg-rose-500 text-white font-bold py-3 rounded-lg transition shadow-lg shadow-rose-900/30">
                Flag for Review
              </button>
            </div>
            <button className="w-full border border-slate-600 text-slate-300 hover:bg-navy-700 hover:text-white font-medium py-3 rounded-lg transition">
              Export Session Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-slate-400">{label}</span>
      <span className="font-medium text-white text-right">{value}</span>
    </div>
  );
}
