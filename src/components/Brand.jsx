// Titan Eye+ wordmark. Swap the <span> for an <img src="/images/logo.svg"/> once
// you have the official logo asset.
export function Logo({ dark = false, compact = false }) {
  return (
    <div className="flex items-center gap-2 select-none">
      <div className="w-8 h-8 rounded-lg bg-titan-500 flex items-center justify-center shadow-sm">
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="7" cy="14" r="3.5" />
          <circle cx="17" cy="14" r="3.5" />
          <path d="M10.5 14h3M3.5 14C3 11 4 9 6 9M20.5 14c.5-3-.5-5-2.5-5" strokeLinecap="round" />
        </svg>
      </div>
      {!compact && (
        <div className="leading-none">
          <span className={`text-lg font-extrabold tracking-tight ${dark ? 'text-white' : 'text-navy-900'}`}>
            Titan Eye
            <span className="text-titan-500">+</span>
          </span>
          <span className={`block text-[10px] font-medium tracking-wider uppercase ${dark ? 'text-slate-400' : 'text-slate-400'}`}>
            Warranty AI
          </span>
        </div>
      )}
    </div>
  );
}

export function Avatar({ initials = 'FA', name }) {
  return (
    <div className="flex items-center gap-2">
      {name && <span className="text-sm text-slate-600 hidden sm:block">{name}</span>}
      <div className="w-9 h-9 bg-navy-800 text-white rounded-full flex items-center justify-center text-xs font-bold">
        {initials}
      </div>
    </div>
  );
}
