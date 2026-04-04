import React, { useRef, useEffect, useState, useCallback } from 'react';
import { RotateCcw, CheckCircle } from 'lucide-react';

interface UnitCircleLabProps { hex: string; }

const STEPS = [
  { title: 'Unit Circle', instruction: 'A unit circle has radius = 1 centered at origin. Any point P(x, y) on the circle satisfies x² + y² = 1. This is the foundation of all trigonometry!', action: 'Start 📐' },
  { title: 'Drag the Point', instruction: 'Drag point P around the circle. Watch how sin θ = y-coordinate and cos θ = x-coordinate change. The angle θ is measured from positive x-axis.', action: 'Drag P 🖱️' },
  { title: 'Observe Sin & Cos', instruction: 'As you move P: X-coordinate = cos θ (horizontal), Y-coordinate = sin θ (vertical). When θ=0°, cos=1, sin=0. When θ=90°, cos=0, sin=1.', action: 'Track Values 👁️' },
  { title: 'Sin² + Cos² = 1', instruction: 'Pythagoras proves: (cos θ)² + (sin θ)² = x² + y² = 1² = 1. This is the most fundamental trig identity!', action: 'Verify Identity ✓' },
  { title: 'Quadrants', instruction: 'Q1: sin+, cos+. Q2: sin+, cos−. Q3: sin−, cos−. Q4: sin−, cos+. Remember "ASTC" — All, Sin, Tan, Cos positive per quadrant.', action: 'Learn Quadrants 🗺️' },
];

const UnitCircleLab: React.FC<UnitCircleLabProps> = ({ hex }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const timeRef = useRef(0);
  const [step, setStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [angle, setAngle] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [autoRotate, setAutoRotate] = useState(false);

  const cx = 180, cy = 170, r = 120;
  const px = cx + r * Math.cos(angle);
  const py = cy - r * Math.sin(angle);
  const sinVal = Math.sin(angle);
  const cosVal = Math.cos(angle);
  const tanVal = Math.tan(angle);
  const deg = ((angle * 180 / Math.PI) % 360 + 360) % 360;

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    timeRef.current += 0.02;
    if (autoRotate) setAngle(a => a + 0.02);
    const w = canvas.width, h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, w, h);

    // Grid
    ctx.strokeStyle = 'rgba(255,255,255,0.05)';
    ctx.lineWidth = 1;
    for (let gx = 0; gx < w; gx += 30) { ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, h); ctx.stroke(); }
    for (let gy = 0; gy < h; gy += 30) { ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(w, gy); ctx.stroke(); }

    // Axes
    ctx.beginPath(); ctx.moveTo(0, cy); ctx.lineTo(w, cy);
    ctx.moveTo(cx, 0); ctx.lineTo(cx, h);
    ctx.strokeStyle = 'rgba(148,163,184,0.5)'; ctx.lineWidth = 1.5; ctx.stroke();
    // Axis labels
    ctx.fillStyle = '#94a3b8'; ctx.font = '10px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('+x (cos)', cx + r + 20, cy - 6);
    ctx.fillText('-x', cx - r - 15, cy - 6);
    ctx.textAlign = 'right'; ctx.fillText('+y (sin)', cx - 5, cy - r - 5);
    ctx.fillText('-y', cx - 5, cy + r + 12);

    // Unit circle
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.strokeStyle = '#3b82f6'; ctx.lineWidth = 2.5; ctx.stroke();
    ctx.fillStyle = 'rgba(59,130,246,0.05)'; ctx.fill();

    // Quadrant labels
    const quadColors = ['#22c55e', '#f59e0b', '#ef4444', '#8b5cf6'];
    ['Q1 (All +)', 'Q2 (Sin +)', 'Q3 (Tan +)', 'Q4 (Cos +)'].forEach((label, i) => {
      const qx = [cx + 60, cx - 60, cx - 60, cx + 60][i];
      const qy = [cy - 70, cy - 70, cy + 80, cy + 80][i];
      ctx.fillStyle = quadColors[i] + '55';
      ctx.font = '9px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(label, qx, qy);
    });

    // Angle arc
    ctx.beginPath(); ctx.arc(cx, cy, 25, -angle, 0);
    ctx.strokeStyle = '#f59e0b'; ctx.lineWidth = 2; ctx.stroke();
    ctx.fillStyle = '#f59e0b'; ctx.font = 'bold 10px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText(`${Math.round(deg)}°`, cx + 35 * Math.cos(-angle / 2), cy - 35 * Math.sin(-angle / 2) + 4);

    // Sin line (vertical)
    ctx.beginPath(); ctx.moveTo(px, cy); ctx.lineTo(px, py);
    ctx.strokeStyle = '#10b981'; ctx.lineWidth = 2.5; ctx.setLineDash([4, 3]); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = '#10b981'; ctx.font = 'bold 10px';
    ctx.textAlign = px > cx ? 'left' : 'right';
    ctx.fillText(`sin=${sinVal.toFixed(2)}`, px + (px > cx ? 5 : -5), (cy + py) / 2);

    // Cos line (horizontal)
    ctx.beginPath(); ctx.moveTo(cx, py); ctx.lineTo(px, py);
    ctx.strokeStyle = '#f97316'; ctx.lineWidth = 2.5; ctx.setLineDash([4, 3]); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = '#f97316'; ctx.textAlign = 'center';
    ctx.fillText(`cos=${cosVal.toFixed(2)}`, (cx + px) / 2, py + (py < cy ? -6 : 16));

    // Radius line
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(px, py);
    ctx.strokeStyle = 'white'; ctx.lineWidth = 2.5; ctx.stroke();
    ctx.fillStyle = 'white'; ctx.textAlign = 'center';
    ctx.fillText('r=1', (cx + px) / 2 + 10, (cy + py) / 2 - 6);

    // Point P
    ctx.beginPath(); ctx.arc(px, py, 9, 0, Math.PI * 2);
    ctx.fillStyle = '#3b82f6'; ctx.fill();
    ctx.strokeStyle = 'white'; ctx.lineWidth = 2; ctx.stroke();
    ctx.fillStyle = 'white'; ctx.font = 'bold 10px sans-serif';
    ctx.textAlign = px > cx ? 'left' : 'right';
    ctx.fillText(`P(${cosVal.toFixed(2)}, ${sinVal.toFixed(2)})`, px + (px > cx ? 12 : -12), py - 10);

    // Origin
    ctx.beginPath(); ctx.arc(cx, cy, 4, 0, Math.PI * 2);
    ctx.fillStyle = 'white'; ctx.fill();

    animRef.current = requestAnimationFrame(animate);
  }, [angle, autoRotate, cx, cy, r, px, py, sinVal, cosVal, deg]);

  useEffect(() => {
    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [animate]);

  const getAngleFromMouse = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    const scaleX = canvasRef.current!.width / rect.width;
    const scaleY = canvasRef.current!.height / rect.height;
    const mx = (e.clientX - rect.left) * scaleX;
    const my = (e.clientY - rect.top) * scaleY;
    return Math.atan2(-(my - cy), mx - cx);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    const mx = (e.clientX - rect.left) * (canvasRef.current!.width / rect.width);
    const my = (e.clientY - rect.top) * (canvasRef.current!.height / rect.height);
    if (Math.sqrt((mx - px) ** 2 + (my - py) ** 2) < 20) { setDragging(true); setAutoRotate(false); }
  };
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => { if (dragging) { setAngle(getAngleFromMouse(e)); if (step < 1) setStep(1); } };
  const handleMouseUp = () => setDragging(false);

  const reset = () => { setAngle(0); setStep(0); setCompleted(false); setAutoRotate(false); timeRef.current = 0; };

  return (
    <div className="flex flex-col md:flex-row h-full w-full bg-slate-950">
      <div className="flex-1 flex items-center justify-center p-4 flex-col gap-3">
        <canvas ref={canvasRef} width={370} height={340} className="rounded-2xl border border-white/10 shadow-2xl cursor-crosshair"
          onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp} />
        <div className="flex gap-3 flex-wrap justify-center">
          <button onClick={() => setAutoRotate(!autoRotate)} className={`px-4 py-2 rounded-xl text-sm font-bold text-white transition-all ${autoRotate ? 'bg-red-600 hover:bg-red-500' : 'bg-blue-600 hover:bg-blue-500'}`}>
            {autoRotate ? '⏸ Stop' : '▶ Rotate'}
          </button>
          {[0, 30, 45, 60, 90, 180, 270].map(d => (
            <button key={d} onClick={() => setAngle(d * Math.PI / 180)} className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold">
              {d}°
            </button>
          ))}
        </div>
      </div>
      <div className="w-full md:w-72 bg-slate-900 border-l border-white/5 flex flex-col">
        <div className="p-5 border-b border-white/5">
          <p className="text-xs font-bold uppercase tracking-widest text-orange-400 mb-1">Math Lab — Unit Circle</p>
          <h2 className="text-xl font-bold text-white">{STEPS[Math.min(step, STEPS.length-1)].title}</h2>
        </div>
        <div className="flex-1 p-5 space-y-4 overflow-y-auto">
          <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-xl">
            <p className="text-orange-200 text-sm">{STEPS[Math.min(step, STEPS.length-1)].instruction}</p>
          </div>
          <div className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-2 font-mono text-sm">
            <div className="flex justify-between"><span className="text-gray-400">θ</span><span className="text-yellow-300">{deg.toFixed(1)}° ({angle.toFixed(3)} rad)</span></div>
            <div className="flex justify-between"><span className="text-green-400">sin θ</span><span className="text-white">{sinVal.toFixed(4)}</span></div>
            <div className="flex justify-between"><span style={{ color: '#f97316' }}>cos θ</span><span className="text-white">{cosVal.toFixed(4)}</span></div>
            <div className="flex justify-between"><span className="text-purple-400">tan θ</span><span className="text-white">{Math.abs(tanVal) > 999 ? '∞' : tanVal.toFixed(4)}</span></div>
            <div className="flex justify-between border-t border-white/10 pt-2"><span className="text-gray-400">sin²+cos²</span><span className="text-green-400 font-bold">{(sinVal**2 + cosVal**2).toFixed(6)}</span></div>
          </div>
          {step < STEPS.length - 1 ? (
            <button onClick={() => setStep(s => Math.min(s + 1, STEPS.length - 1))} className="w-full py-3 rounded-xl font-bold text-white bg-orange-700 hover:bg-orange-600 transition-all active:scale-95">
              Next Concept →
            </button>
          ) : (
            <button onClick={() => setCompleted(true)} className="w-full py-3 rounded-xl font-bold text-white bg-green-700 hover:bg-green-600 transition-all active:scale-95">✅ Complete</button>
          )}
          {completed && <div className="text-center"><CheckCircle size={28} className="mx-auto text-green-400 mb-1" /><p className="text-green-400 font-bold text-sm">Unit Circle Mastered!</p></div>}
          <button onClick={reset} className="w-full py-2 rounded-xl text-gray-500 hover:bg-white/5 text-sm flex items-center justify-center gap-1"><RotateCcw size={12} /> Reset</button>
          <div className="flex gap-1">
            {STEPS.map((_, idx) => <div key={idx} className="flex-1 h-1.5 rounded-full" style={{ backgroundColor: idx <= step ? '#f97316' : 'rgba(255,255,255,0.1)' }} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnitCircleLab;
