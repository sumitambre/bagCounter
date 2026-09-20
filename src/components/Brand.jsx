// AscentiQ AI wordmark.
export function Logo({ dark = false, compact = false }) {
  return (
    <div className="flex items-center gap-2 select-none">
      <img src="/logo.png" alt="AscentiQ AI" className="w-8 h-8 rounded-lg shadow-sm object-contain" />
      {!compact && (
        <div className="leading-none">
          <span className={`text-lg font-extrabold tracking-tight ${dark ? 'text-white' : 'text-navy-900'}`}>
            Ascenti<span className="text-cement-500">Q AI</span>
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
