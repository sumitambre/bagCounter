import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { FrameImage } from '../components/FrameImage.jsx';
import { CLAIMS, ANGLES, angleSrc } from '../data/mockData.js';

const recStyles = {
  APPROVE: { text: 'text-titan-600', label: 'APPROVE — Covered under warranty' },
  REJECT: { text: 'text-rose-400', label: 'REJECT — Non-warranty wear & tear' },
  REVIEW: { text: 'text-amber-400', label: 'REVIEW — Human context required' },
};

export default function Inspection() {
  const { id } = useParams();
  const navigate = useNavigate();
  const claim = CLAIMS.find((c) => c.id === id) || CLAIMS[0];

  const [activeAngle, setActiveAngle] = useState(claim.activeAngle || 'Front');
  const [showBoxes, setShowBoxes] = useState(true);
  const [toast, setToast] = useState(null);
  const [barWidth, setBarWidth] = useState(0);

  // animate the confidence bar on mount
  useEffect(() => {
    const t = setTimeout(() => setBarWidth(claim.confidence), 300);
    return () => clearTimeout(t);
  }, [claim.confidence]);

  const decide = useCallback(
    (decision) => {
      setToast(decision);
      setTimeout(() => navigate('/dashboard'), 1400);
    },
    [navigate]
  );

  // keyboard-first workflow
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Enter') decide('approve');
      else if (e.key.toLowerCase() === 'r') decide('reject');
      else if (e.key === 'Escape') navigate('/dashboard');
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [decide, navigate]);

  const rec = recStyles[claim.recommendation] || recStyles.REVIEW;
  const boxes = claim.boxes[activeAngle] || [];
  const angles = claim.angles || ANGLES;

  return (
    <div className="min-h-screen bg-navy-900 text-slate-200 p-4 lg:p-6">
      {/* Toast */}
      {toast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 animate-toastIn">
          <div className={`px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 text-white font-semibold ${toast === 'approve' ? 'bg-titan-500' : 'bg-rose-500'}`}>
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5">
              {toast === 'approve' ? <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" /> : <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />}
            </svg>
            Claim {claim.id} {toast === 'approve' ? 'Approved' : 'Rejected'} · returning to queue…
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-wrap gap-3 justify-between items-center mb-5">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/dashboard')} className="text-slate-400 hover:text-white flex items-center gap-1 transition">
            ← Back to Queue
          </button>
          <h1 className="text-xl font-bold text-white">Inspecting: {claim.id}</h1>
          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-amber-500/15 text-amber-300 border border-amber-500/20">
            {claim.defect}
          </span>
        </div>
        <div className="text-sm text-slate-400 flex items-center gap-3">
          <span>Press <kbd className="bg-navy-800 px-2 py-1 rounded border border-slate-700 text-slate-300">Enter</kbd> to approve</span>
          <span><kbd className="bg-navy-800 px-2 py-1 rounded border border-slate-700 text-slate-300">R</kbd> to reject</span>
        </div>
      </div>

      {/* Split workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:h-[82vh]">
        {/* Visualizer */}
        <div className="lg:col-span-8 bg-navy-800 rounded-xl border border-slate-700/60 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-slate-700/60 flex justify-between items-center">
            <span className="font-medium text-white">Angle: {activeAngle}</span>
            <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
              <input type="checkbox" checked={showBoxes} onChange={(e) => setShowBoxes(e.target.checked)} className="rounded bg-navy-900 border-slate-600 text-titan-500 focus:ring-titan-500" />
              <span>Show AI Bounding Boxes</span>
            </label>
          </div>

          <div className="flex-1 bg-navy-900 min-h-[320px] relative">
            <FrameImage
              key={activeAngle}
              src={angleSrc(claim, activeAngle)}
              angle={activeAngle}
              boxes={boxes}
              showBoxes={showBoxes}
            />
          </div>

          {/* Thumbnail strip */}
          <div className="h-24 bg-navy-900/60 border-t border-slate-700/60 flex p-2 gap-2">
            {angles.map((angle) => {
              const hasDefect = (claim.boxes[angle] || []).length > 0;
              return (
                <button
                  key={angle}
                  onClick={() => setActiveAngle(angle)}
                  className={`relative flex-1 rounded-lg border-2 flex items-center justify-center text-xs font-medium transition ${activeAngle === angle ? 'border-titan-500 bg-navy-800 text-white' : 'border-transparent bg-navy-800/50 text-slate-500 hover:bg-navy-800'}`}
                >
                  {angle}
                  {hasDefect && <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Assessment stack */}
        <div className="lg:col-span-4 flex flex-col gap-5 overflow-y-auto scrollbar-thin">
          {/* Claim details */}
          <div className="bg-navy-800 p-5 rounded-xl border border-slate-700/60">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Claim Details</h3>
            <div className="space-y-2.5 text-sm">
              <Row label="Customer" value={claim.customer} />
              <Row label="Model" value={claim.model} />
              <Row label="SKU" value={claim.sku} />
              <Row label="Purchase Date" value={claim.purchaseDate} />
            </div>
          </div>

          {/* AI diagnostic */}
          <div className="bg-navy-800 p-5 rounded-xl border border-slate-700/60 flex-1">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-titan-400" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinejoin="round" /></svg>
              AI Diagnostic
            </h3>

            <div className="flex items-center justify-between mb-4">
              <span className="text-2xl font-bold text-rose-400">{claim.defect}</span>
              <span className="px-2.5 py-1 bg-rose-500/15 text-rose-300 text-xs font-bold rounded">{claim.part}</span>
            </div>

            <div className="mb-5">
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-slate-400">Confidence Score</span>
                <span className="text-white font-semibold">{claim.confidence}%</span>
              </div>
              <div className="w-full bg-navy-900 rounded-full h-2 overflow-hidden">
                <div className="bg-titan-500 h-2 rounded-full transition-all duration-1000 ease-out" style={{ width: `${barWidth}%` }} />
              </div>
            </div>

            <div className="bg-navy-900/50 p-4 rounded-lg border border-slate-700/40">
              <p className="text-xs text-slate-400 mb-1.5">System Recommendation</p>
              <p className={`font-bold ${rec.text}`}>{rec.label}</p>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">{claim.recommendationReason}</p>
            </div>
          </div>

          {/* Action matrix */}
          <div className="bg-navy-800 p-5 rounded-xl border border-slate-700/60">
            <div className="grid grid-cols-2 gap-3 mb-3">
              <button onClick={() => decide('approve')} className="bg-titan-500 hover:bg-titan-600 text-white font-bold py-3 rounded-lg transition shadow-lg shadow-titan-900/30">
                Approve Claim
              </button>
              <button onClick={() => decide('reject')} className="bg-rose-600 hover:bg-rose-500 text-white font-bold py-3 rounded-lg transition shadow-lg shadow-rose-900/30">
                Reject Claim
              </button>
            </div>
            <button className="w-full border border-slate-600 text-slate-300 hover:bg-navy-700 hover:text-white font-medium py-3 rounded-lg transition">
              Request Physical Inspection
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
