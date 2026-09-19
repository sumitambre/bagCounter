import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Logo, Avatar } from '../components/Brand.jsx';
import { DEMO_VIDEO, BAG_LOADING_EVENTS, TOTAL_BAGS_IN_SESSION } from '../data/videoDemoData.js';

function playChime() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1320, ctx.currentTime + 0.12);
    gain.gain.setValueAtTime(0.25, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.42);
  } catch (e) {}
}

function formatTime(seconds) {
  if (isNaN(seconds) || seconds < 0) return '00:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return String(m).padStart(2,'0') + ':' + String(s).padStart(2,'0');
}

export default function Demo() {
  const navigate = useNavigate();
  const videoRef = useRef(null);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(DEMO_VIDEO.duration);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [soundAlerts, setSoundAlerts] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [lastCount, setLastCount] = useState(1);
  const [justLoadedId, setJustLoadedId] = useState(null);

  const loadedBags = BAG_LOADING_EVENTS.filter((b) => currentTime >= b.t);
  const count = loadedBags.length;

  const activeBagInTransit = BAG_LOADING_EVENTS.find(
    (b) => b.id > 1 && currentTime >= b.t - 2.5 && currentTime < b.t
  );

  useEffect(() => {
    if (count > lastCount) {
      const newest = loadedBags[loadedBags.length - 1];
      if (newest && newest.id > 1) {
        setJustLoadedId(newest.id);
        if (soundAlerts) playChime();
        setTimeout(() => setJustLoadedId(null), 2500);
      }
    }
    setLastCount(count);
  }, [count]); // eslint-disable-line

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      if (videoRef.current.duration && !isNaN(videoRef.current.duration)) {
        setDuration(videoRef.current.duration);
      }
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) { videoRef.current.play(); setIsPlaying(true); }
    else { videoRef.current.pause(); setIsPlaying(false); }
  };

  const handleSeek = (newTime) => {
    if (videoRef.current) { videoRef.current.currentTime = newTime; setCurrentTime(newTime); }
  };

  const changePlaybackRate = (rate) => {
    if (videoRef.current) { videoRef.current.playbackRate = rate; setPlaybackRate(rate); }
  };

  const jumpToBag = (bagEvent) => {
    const jumpTime = bagEvent.id === 1 ? 0 : Math.max(0, bagEvent.t - 2.2);
    handleSeek(jumpTime);
    if (videoRef.current && videoRef.current.paused) { videoRef.current.play(); setIsPlaying(true); }
  };

  const jumpToNextBag = () => {
    const next = BAG_LOADING_EVENTS.find((b) => b.t > currentTime + 0.5);
    jumpToBag(next || BAG_LOADING_EVENTS[0]);
  };

  const progressPct = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;
  const targetPct = Math.round((count / TOTAL_BAGS_IN_SESSION) * 100);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      <header className="bg-slate-950/80 backdrop-blur border-b border-slate-800 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Logo dark />
            <div className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              Live Demo Mode · Real Video Sync
            </div>
          </div>
          <div className="flex items-center gap-4">
            <nav className="hidden sm:flex items-center gap-1 text-sm">
              <button onClick={() => navigate('/dashboard')} className="px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 font-medium transition">Monitoring</button>
              <button onClick={() => navigate('/demo')} className="px-3 py-2 rounded-lg bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30 transition">Accurate Demo</button>
              <button onClick={() => navigate('/analytics')} className="px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 font-medium transition">Analytics</button>
            </nav>
            <Avatar name="Sumit A." initials="SA" />
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-950/50 p-4 rounded-xl border border-slate-800">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">Live Video Bag Counting Verification</h1>
              <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 rounded-full text-xs font-medium">100% Video Accurate</span>
            </div>
            <p className="text-slate-400 text-sm mt-1">
              Feed: <span className="text-slate-200 font-medium">{DEMO_VIDEO.bay}</span> · Target: <span className="text-amber-400 font-semibold">{DEMO_VIDEO.truckId}</span> · Model: <span className="text-slate-300">YOLO-11x ChuteZone</span>
            </p>
          </div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <button onClick={jumpToNextBag} className="px-3.5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition shadow-lg shadow-amber-500/20 flex items-center gap-2">
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M5 4l10 8-10 8V4zm11 0h3v16h-3V4z" /></svg>
              Next Bag
            </button>
            <button onClick={() => handleSeek(0)} className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-medium text-sm transition border border-slate-700">Reset 0:00</button>
            <button
              onClick={() => setSoundAlerts(!soundAlerts)}
              className={"px-3 py-2 rounded-lg font-medium text-sm transition border flex items-center gap-1.5 " + (soundAlerts ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200')}
            >
              {soundAlerts ? '🔊 Chime On' : '🔇 Chime Off'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-8 flex flex-col gap-3">
            <div className="relative aspect-video bg-black rounded-2xl overflow-hidden border border-slate-800 shadow-2xl group">
              <video
                ref={videoRef}
                src={DEMO_VIDEO.src}
                className="w-full h-full object-contain cursor-pointer"
                playsInline autoPlay muted={isMuted} loop
                onTimeUpdate={handleTimeUpdate}
                onClick={togglePlay}
              />

              {justLoadedId && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 bg-emerald-500/95 text-slate-950 px-5 py-2 rounded-full font-extrabold text-sm shadow-xl flex items-center gap-2.5 animate-bounce pointer-events-none">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-950" />
                  BAG #{justLoadedId} LOADED INTO TRUCK (+1)
                </div>
              )}
              {activeBagInTransit && !justLoadedId && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 bg-amber-500/90 text-slate-950 px-4 py-1.5 rounded-full font-bold text-xs tracking-wide shadow-lg flex items-center gap-2 animate-pulse pointer-events-none">
                  <span className="w-2 h-2 rounded-full bg-slate-950" />
                  BAG IN CHUTE TRANSIT (APPROACHING LINE)
                </div>
              )}

              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent p-4 flex flex-col gap-2 opacity-95 group-hover:opacity-100 transition">
                <div className="relative w-full h-4 flex items-center">
                  <input
                    type="range" min={0} max={duration || DEMO_VIDEO.duration} step={0.1} value={currentTime}
                    onChange={(e) => handleSeek(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-slate-700/80 rounded-lg appearance-none cursor-pointer accent-amber-500 z-10"
                  />
                  {BAG_LOADING_EVENTS.map((bag) => {
                    const dotPct = (bag.t / (duration || DEMO_VIDEO.duration)) * 100;
                    const isPassed = currentTime >= bag.t;
                    return (
                      <button key={bag.id} onClick={() => jumpToBag(bag)} style={{ left: dotPct + '%' }}
                        className={"absolute -translate-x-1/2 z-20 w-3 h-3 rounded-full border-2 transition hover:scale-150 " + (isPassed ? 'bg-emerald-400 border-slate-900 shadow-md shadow-emerald-500/50' : 'bg-amber-400 border-slate-900')}
                        title={"Bag #" + bag.id + " (" + bag.timestamp + ") - Click to jump"}
                      />
                    );
                  })}
                </div>
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <div className="flex items-center gap-3">
                    <button onClick={togglePlay} className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition">
                      {isPlaying
                        ? <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
                        : <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><polygon points="5 3 19 12 5 21 5 3"/></svg>}
                    </button>
                    <button onClick={() => setIsMuted(!isMuted)} className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition">
                      {isMuted ? '🔇' : '🔊'}
                    </button>
                    <span className="font-mono text-slate-200">{formatTime(currentTime)} / {formatTime(duration || DEMO_VIDEO.duration)}</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-slate-900/80 px-2 py-1 rounded-lg border border-slate-800">
                    <span className="text-[10px] text-slate-400 mr-1 font-semibold uppercase">Speed</span>
                    {[0.5, 1, 1.5, 2].map((rate) => (
                      <button key={rate} onClick={() => changePlaybackRate(rate)}
                        className={"px-1.5 py-0.5 rounded text-[11px] font-bold transition " + (playbackRate === rate ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white')}>
                        {rate}x
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800 flex items-center gap-2 overflow-x-auto">
              <span className="text-xs font-bold text-slate-400 whitespace-nowrap px-1">Jump to Bag:</span>
              {BAG_LOADING_EVENTS.map((bag) => {
                const isPassed = currentTime >= bag.t;
                return (
                  <button key={bag.id} onClick={() => jumpToBag(bag)}
                    className={"px-2.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition border " + (isPassed ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30' : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700')}>
                    #{bag.id} <span className="font-normal text-[10px] text-slate-500">{bag.id === 1 ? '(In Truck)' : '(' + bag.timestamp + ')'}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-950 to-slate-900 border border-slate-800 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-bold tracking-wider uppercase text-amber-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Accurate Count
                </span>
                <span className="text-xs text-slate-500 font-mono">{TOTAL_BAGS_IN_SESSION} total in clip</span>
              </div>
              <div className="flex items-baseline gap-3 my-2">
                <span className="text-6xl font-black tracking-tight text-white transition-all duration-300">{count}</span>
                <span className="text-2xl font-bold text-slate-500">/ {TOTAL_BAGS_IN_SESSION}</span>
                <span className="ml-auto text-sm font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">{targetPct}%</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">Cement Bags loaded through Bay 1 Chute into {DEMO_VIDEO.truckId}</p>
              <div className="w-full h-2 bg-slate-800 rounded-full mt-4 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 transition-all duration-300 rounded-full" style={{ width: targetPct + '%' }} />
              </div>
              <div className="grid grid-cols-2 gap-3 mt-5 pt-4 border-t border-slate-800/80">
                <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800/50">
                  <span className="text-[11px] text-slate-400 font-medium">Net Weight</span>
                  <p className="text-lg font-bold text-white mt-0.5">{(count * 50).toLocaleString()} <span className="text-xs text-slate-400 font-normal">kg</span></p>
                </div>
                <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800/50">
                  <span className="text-[11px] text-slate-400 font-medium">Avg Confidence</span>
                  <p className="text-lg font-bold text-emerald-400 mt-0.5">98.8%</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-950 rounded-2xl border border-slate-800 shadow-xl flex flex-col flex-1 overflow-hidden max-h-[420px]">
              <div className="px-5 py-3.5 border-b border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <h3 className="text-sm font-bold text-white">Chute Crossing Audit Log</h3>
                </div>
                <span className="text-[11px] text-slate-400 font-mono">{loadedBags.length} events</span>
              </div>
              <div className="p-3 overflow-y-auto flex flex-col gap-2 flex-1 divide-y divide-slate-800/40">
                {loadedBags.length === 0 ? (
                  <div className="py-12 text-center text-slate-500 text-sm"><p>No bags loaded yet.</p></div>
                ) : (
                  [...loadedBags].reverse().map((bag) => (
                    <div key={bag.id} onClick={() => jumpToBag(bag)}
                      className={"pt-2.5 pb-1 px-3 rounded-lg cursor-pointer transition flex items-center justify-between hover:bg-slate-900 " + (bag.id === justLoadedId ? 'bg-emerald-950/40 border border-emerald-500/40' : '')}>
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs border border-amber-500/30">#{bag.id}</div>
                        <div>
                          <p className="text-xs font-semibold text-slate-200">Cement Bag (50kg)</p>
                          <p className="text-[10px] text-slate-500 font-mono">{bag.id === 1 ? 'Pre-loaded in Truck Bed' : 'Time ' + bag.timestamp + ' · Track #' + bag.trackId}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">{bag.confidence}% Conf</span>
                        <p className="text-[10px] text-slate-400 mt-0.5 font-medium">{bag.status}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
