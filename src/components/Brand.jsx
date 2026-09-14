// CementFlow wordmark with industrial bag icon.
export function Logo({ dark = false, compact = false }) {
  return (
    <div className="flex items-center gap-2 select-none">
      <div className="w-8 h-8 rounded-lg bg-cement-500 flex items-center justify-center shadow-sm">
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 20h12l-1.5-10h-9L6 20z" strokeLinejoin="round" />
          <path d="M9 10V8a3 3 0 0 1 6 0v2" strokeLinecap="round" />
          <path d="M9 14h6M9 17h6" strokeLinecap="round" />
        </svg>
      </div>
      {!compact && (
        <div className="leading-none">
          <span className={`text-lg font-extrabold tracking-tight ${dark ? 'text-white' : 'text-navy-900'}`}>
            Cement<span className="text-cement-500">Flow</span>
          </span>
          <span className={`block text-[10px] font-medium tracking-wider uppercase ${dark ? 'text-slate-400' : 'text-slate-400'}`}>
            Bag Monitoring
          </span>
        </div>
      )}
    </div>
  );
}

export function Avatar({ initials = 'SA', name }) {
  return (
    <div className="flex items-center gap-2">
      {name && <span className="text-sm text-slate-600 hidden sm:block">{name}</span>}
      <div className="w-9 h-9 bg-navy-800 text-white rounded-full flex items-center justify-center text-xs font-bold">
        {initials}
      </div>
    </div>
  );
}
