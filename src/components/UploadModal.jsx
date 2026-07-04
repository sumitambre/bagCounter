import { useState, useRef } from 'react';

const ANGLES = ['Front', 'Side', 'Hinge', 'Temple'];

// Demo-only "new claim" flow: pick images for the 4-angle matrix, run a
// simulated AI analysis, and show a mock result. No backend — purely for show.
export function UploadModal({ open, onClose }) {
  const [files, setFiles] = useState({}); // angle -> object URL
  const [stage, setStage] = useState('upload'); // upload | processing | done
  const inputs = useRef({});

  if (!open) return null;

  const onFile = (angle, e) => {
    const f = e.target.files?.[0];
    if (f) setFiles((p) => ({ ...p, [angle]: URL.createObjectURL(f) }));
  };
  const count = Object.keys(files).length;

  const analyze = () => {
    setStage('processing');
    setTimeout(() => setStage('done'), 1500);
  };

  const close = () => {
    Object.values(files).forEach((u) => URL.revokeObjectURL(u));
    setFiles({});
    setStage('upload');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-900/60 p-4 animate-fadeIn" onClick={close}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <div>
            <h2 className="text-lg font-bold text-navy-900">New Warranty Claim</h2>
            <p className="text-sm text-slate-500">Upload the 4-angle image matrix for AI analysis</p>
          </div>
          <button onClick={close} aria-label="Close" className="text-slate-400 hover:text-slate-700 text-xl leading-none">✕</button>
        </div>

        {/* Upload stage */}
        {stage === 'upload' && (
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4">
              {ANGLES.map((a) => (
                <div key={a}>
                  <input ref={(el) => (inputs.current[a] = el)} type="file" accept="image/*" className="hidden" onChange={(e) => onFile(a, e)} />
                  <button
                    onClick={() => inputs.current[a]?.click()}
                    className="w-full aspect-video rounded-xl border-2 border-dashed border-slate-300 hover:border-titan-500 hover:bg-titan-50/40 transition flex items-center justify-center overflow-hidden relative group"
                  >
                    {files[a] ? (
                      <>
                        <img src={files[a]} alt={`${a} view`} className="w-full h-full object-cover" />
                        <span className="absolute top-2 right-2 bg-titan-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">✓</span>
                        <span className="absolute inset-0 bg-navy-900/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white text-sm font-medium">Change</span>
                      </>
                    ) : (
                      <div className="flex flex-col items-center gap-1 text-slate-400">
                        <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.8">
                          <path d="M12 16V4M7 9l5-5 5 5M4 20h16" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="text-sm font-medium text-slate-600">{a}</span>
                        <span className="text-xs">Click to upload</span>
                      </div>
                    )}
                  </button>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between mt-6">
              <span className="text-sm text-slate-500">{count}/4 angles uploaded</span>
              <div className="flex gap-3">
                <button onClick={close} className="px-4 py-2 text-sm border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50 transition">Cancel</button>
                <button
                  onClick={analyze}
                  disabled={count === 0}
                  className="px-5 py-2 text-sm bg-titan-500 text-white rounded-lg font-medium hover:bg-titan-600 transition disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  Upload for Detection
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Processing stage */}
        {stage === 'processing' && (
          <div className="p-12 flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-titan-100 border-t-titan-500 rounded-full animate-spin" />
            <p className="font-semibold text-navy-900">Uploading {count} image{count > 1 ? 's' : ''}…</p>
            <p className="text-sm text-slate-500">Preparing for AI detection</p>
          </div>
        )}

        {/* Result stage */}
        {stage === 'done' && (
          <div className="p-12 flex flex-col items-center gap-4 text-center animate-slideUp">
            <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center text-green-500 mb-2">
              <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <h3 className="text-xl font-bold text-navy-900">Upload Successful</h3>
            <p className="text-slate-500 mb-6">Images have been successfully uploaded for detection.</p>
            <button onClick={close} className="px-8 py-2.5 bg-titan-500 text-white rounded-lg font-medium hover:bg-titan-600 transition shadow-sm">Done</button>
          </div>
        )}
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-slate-500">{label}</span>
      {value}
    </div>
  );
}
