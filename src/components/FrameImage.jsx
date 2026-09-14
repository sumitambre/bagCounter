import { useState, useRef, useEffect, useCallback } from 'react';

// Shows a product/CCTV image, gracefully falling back to a labeled placeholder if
// the file isn't present yet. Bounding boxes are positioned against the ACTUAL
// rendered image rectangle (measured), so their percentages stay accurate for
// any image aspect ratio — square, landscape or portrait.
export function FrameImage({ src, angle, boxes = [], showBoxes = true }) {
  const [failed, setFailed] = useState(false);
  const containerRef = useRef(null);
  const imgRef = useRef(null);
  const [rect, setRect] = useState(null); // displayed image rect within the container (px)

  const measure = useCallback(() => {
    const img = imgRef.current;
    const cont = containerRef.current;
    if (!img || !cont || !img.naturalWidth) return;
    const ir = img.getBoundingClientRect();
    const cr = cont.getBoundingClientRect();
    setRect({ left: ir.left - cr.left, top: ir.top - cr.top, width: ir.width, height: ir.height });
  }, []);

  useEffect(() => {
    setRect(null); // reset when the image source changes
    const cont = containerRef.current;
    if (!cont) return;
    const ro = new ResizeObserver(measure);
    ro.observe(cont);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [measure, src]);

  return (
    <div ref={containerRef} className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {!failed ? (
        <>
          <img
            ref={imgRef}
            src={src}
            alt={`${angle} view`}
            onError={() => setFailed(true)}
            onLoad={measure}
            className="max-w-full max-h-full object-contain animate-fadeIn"
          />

          {/* AI bounding boxes — pinned to the measured image rectangle */}
          {showBoxes && rect &&
            boxes.map((b, i) => (
              <div
                key={i}
                className="absolute border-2 border-cement-400 bg-cement-400/20 rounded animate-drawBox cursor-crosshair"
                style={{
                  left: rect.left + (b.x / 100) * rect.width,
                  top: rect.top + (b.y / 100) * rect.height,
                  width: (b.width / 100) * rect.width,
                  height: (b.height / 100) * rect.height,
                }}
              >
                <span className="absolute -top-6 left-0 whitespace-nowrap bg-cement-500 text-white text-xs px-2 py-0.5 rounded font-bold shadow-lg">
                  {b.label} ({b.confidence}%)
                </span>
              </div>
            ))}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center text-slate-600 gap-3 animate-fadeIn">
          <svg viewBox="0 0 24 24" className="w-16 h-16 text-slate-700" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M6 20h12l-1.5-10h-9L6 20z" strokeLinejoin="round" />
            <path d="M9 10V8a3 3 0 0 1 6 0v2" strokeLinecap="round" />
            <path d="M9 14h6M9 17h6" strokeLinecap="round" />
          </svg>
          <div className="text-center">
            <p className="text-sm font-medium text-slate-400">{angle} View</p>
            <p className="text-xs text-slate-600 mt-1">Drop image at</p>
            <p className="text-xs text-slate-600 font-mono">{src}</p>
          </div>
        </div>
      )}
    </div>
  );
}
