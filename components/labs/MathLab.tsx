import React, { useRef, useEffect, useState, useCallback } from 'react';
import { RotateCcw } from 'lucide-react';
import DraggableSlider from './DraggableSlider';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Box, Environment, ContactShadows, Cone, Plane, Sphere, Grid } from '@react-three/drei';
import * as THREE from 'three';


// Combines math labs m1 (Graphing), m2 (Integration), m4 (Conics), m5 (Vectors) into one universal math lab
// routed by labId prop

interface MathLabProps { hex: string; labId: string; }

// ====== GRAPHING LAB (m1) ======
const GraphingLab: React.FC<{ hex: string }> = ({ hex }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const [fn, setFn] = useState('x*x');
  const [error, setError] = useState('');
  const [traceX, setTraceX] = useState(1);
  const [zoom, setZoom] = useState(30);
  const [step, setStep] = useState(0);

  const STEPS = [
    { title: 'Graphing Lab', instruction: 'Plot mathematical functions in real-time. The x-axis and y-axis define the coordinate plane. Enter any function of x!' },
    { title: 'Read the Graph', instruction: 'The red dot traces y = f(x) at your chosen x. Drag the X slider to values and read the corresponding y.' },
    { title: 'Shape of Functions', instruction: 'x*x = Parabola, Math.sin(x) = Sine wave, x = Line. What shape does x*x*x give?' },
  ];

  const plotFn = useCallback((x: number): number | null => {
    try {
      // eslint-disable-next-line no-new-func
      return Function('x', `"use strict"; return (${fn})`)(x);
    } catch { return null; }
  }, [fn]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const w = canvas.width, h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, w, h);

    const cx = w / 2, cy = h / 2;
    const scale = zoom;

    // Grid
    const gridCount = Math.floor(Math.max(w, h) / scale) + 2;
    for (let gx = -gridCount; gx <= gridCount; gx++) {
      const sx = cx + gx * scale;
      ctx.beginPath(); ctx.moveTo(sx, 0); ctx.lineTo(sx, h);
      ctx.strokeStyle = gx === 0 ? 'rgba(148,163,184,0.6)' : 'rgba(255,255,255,0.05)';
      ctx.lineWidth = gx === 0 ? 1.5 : 1; ctx.stroke();
      if (gx !== 0 && gx % 2 === 0) {
        ctx.fillStyle = '#475569'; ctx.font = '9px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(String(gx), sx, cy + 14);
      }
    }
    for (let gy = -gridCount; gy <= gridCount; gy++) {
      const sy = cy - gy * scale;
      ctx.beginPath(); ctx.moveTo(0, sy); ctx.lineTo(w, sy);
      ctx.strokeStyle = gy === 0 ? 'rgba(148,163,184,0.6)' : 'rgba(255,255,255,0.05)';
      ctx.lineWidth = gy === 0 ? 1.5 : 1; ctx.stroke();
      if (gy !== 0 && gy % 2 === 0) {
        ctx.fillStyle = '#475569'; ctx.font = '9px sans-serif'; ctx.textAlign = 'right';
        ctx.fillText(String(gy), cx - 5, sy + 3);
      }
    }

    // Plot function
    let started = false;
    ctx.beginPath();
    for (let px = 0; px < w; px++) {
      const x = (px - cx) / scale;
      const y = plotFn(x);
      if (y === null || !isFinite(y) || isNaN(y) || Math.abs(y) > 1000) { started = false; continue; }
      const py = cy - y * scale;
      if (!started) { ctx.moveTo(px, py); started = true; }
      else ctx.lineTo(px, py);
    }
    ctx.strokeStyle = '#60a5fa'; ctx.lineWidth = 2.5; ctx.stroke();

    // Trace point
    const ty = plotFn(traceX);
    if (ty !== null && isFinite(ty)) {
      const px = cx + traceX * scale, py2 = cy - ty * scale;
      ctx.beginPath(); ctx.moveTo(px, cy); ctx.lineTo(px, py2); ctx.strokeStyle = 'rgba(251,146,60,0.4)'; ctx.lineWidth = 1; ctx.setLineDash([4,3]); ctx.stroke(); ctx.setLineDash([]);
      ctx.beginPath(); ctx.moveTo(cx, py2); ctx.lineTo(px, py2); ctx.strokeStyle = 'rgba(34,197,94,0.4)'; ctx.lineWidth = 1; ctx.setLineDash([4,3]); ctx.stroke(); ctx.setLineDash([]);
      ctx.beginPath(); ctx.arc(px, py2, 6, 0, Math.PI * 2); ctx.fillStyle = '#ef4444'; ctx.fill();
      ctx.fillStyle = 'white'; ctx.font = 'bold 10px sans-serif'; ctx.textAlign = 'left';
      ctx.fillText(`f(${traceX})=${ty.toFixed(2)}`, px + 10, py2 - 8);
    }

    ctx.fillStyle = '#3b82f6'; ctx.font = 'bold 12px sans-serif'; ctx.textAlign = 'left';
    ctx.fillText(`y = ${fn}`, 10, 20);

    animRef.current = requestAnimationFrame(draw);
  }, [fn, traceX, zoom, plotFn]);

  useEffect(() => { animRef.current = requestAnimationFrame(draw); return () => cancelAnimationFrame(animRef.current); }, [draw]);

  const handleFnChange = (val: string) => {
    setFn(val);
    try { Function('x', `"use strict"; return (${val})`); setError(''); } catch (e) { setError('⚠️ Invalid expression'); }
  };

  return (
    <div className="flex flex-col md:flex-row h-full w-full bg-slate-950">
      <div className="flex-1 flex items-center justify-center p-3">
        <canvas ref={canvasRef} width={400} height={340} className="rounded-2xl border border-white/10 shadow-2xl w-full max-w-[450px]" />
      </div>
      <div className="w-full md:w-72 bg-slate-900 border-l border-white/5 flex flex-col">
        <div className="p-4 border-b border-white/5">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-1">Math Lab — Graphing</p>
          <h2 className="text-lg font-bold text-white">{STEPS[Math.min(step, STEPS.length-1)].title}</h2>
        </div>
        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
          <div className="bg-blue-500/10 border border-blue-500/30 p-3 rounded-xl">
            <p className="text-blue-200 text-xs">{STEPS[Math.min(step, STEPS.length-1)].instruction}</p>
          </div>
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase mb-1 block">f(x) =</label>
            <input value={fn} onChange={e => handleFnChange(e.target.value)} className="w-full bg-white/5 border border-white/20 rounded-xl px-3 py-2 text-white font-mono text-sm focus:outline-none focus:border-blue-400" placeholder="e.g. x*x" />
            {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
          </div>
          <div className="grid grid-cols-2 gap-2">
            {['x*x', 'Math.sin(x)*5', 'Math.abs(x)', 'x*x*x/10'].map(f => (
              <button key={f} onClick={() => handleFnChange(f)} className="py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono text-gray-300 border border-white/10 transition-all">{f}</button>
            ))}
          </div>
          <DraggableSlider label="Trace x" min={-10} max={10} step={0.5} value={traceX} onChange={setTraceX} color="#ef4444" formatValue={v => `${v}`} />

          <DraggableSlider label="Zoom" min={10} max={80} value={zoom} onChange={setZoom} color="#3b82f6" unit="px" />

          <div className="flex gap-1">
            {STEPS.map((_, idx) => <div key={idx} className="flex-1 h-1.5 rounded-full" style={{ backgroundColor: idx <= step ? '#3b82f6' : 'rgba(255,255,255,0.1)' }} onClick={() => setStep(idx)} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

// ====== INTEGRATION LAB (m2) ======
const IntegrationLab: React.FC<{ hex: string }> = ({ hex }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const [n, setN] = useState(5);
  const [a, setA] = useState(0);
  const [b, setB] = useState(3);
  const [step, setStep] = useState(0);

  const STEPS = [
    { title: 'Riemann Sum', instruction: 'Integration finds the area under a curve. We approximate it by summing thin rectangles (Riemann Sum). More rectangles = better approximation!' },
    { title: 'Adjust Strips', instruction: 'Use the slider to increase the number of strips (n). Watch how the approximation improves! At n→∞, we get the exact integral.' },
    { title: 'Read the Area', instruction: 'The calculated area is the Riemann sum. Compare with the exact value of ∫x²dx from a to b = [x³/3].' },
  ];

  const f = (x: number) => x * x;

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const w = canvas.width, h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, w, h);

    const margin = 40, plotW = w - margin * 2, plotH = h - margin * 2;
    const scale = plotW / (b - a || 1);
    const yMax = Math.max(...Array.from({ length: 100 }, (_, i) => f(a + (b - a) * i / 100))) * 1.2;
    const yScale = plotH / (yMax || 1);

    const toCanvasX = (x: number) => margin + (x - a) * scale;
    const toCanvasY = (y: number) => h - margin - y * yScale;

    // Grid
    ctx.strokeStyle = 'rgba(255,255,255,0.05)'; ctx.lineWidth = 1;
    for (let gx = 0; gx <= 5; gx++) { const x = margin + gx * plotW / 5; ctx.beginPath(); ctx.moveTo(x, margin); ctx.lineTo(x, h - margin); ctx.stroke(); }
    for (let gy = 0; gy <= 4; gy++) { const y = h - margin - gy * plotH / 4; ctx.beginPath(); ctx.moveTo(margin, y); ctx.lineTo(w - margin, y); ctx.stroke(); }

    // Rectangles
    const dx = (b - a) / n;
    let sum = 0;
    for (let k = 0; k < n; k++) {
      const x0 = a + k * dx;
      const y0 = f(x0 + dx / 2);
      sum += y0 * dx;
      const rx = toCanvasX(x0), rw = dx * scale, ry = toCanvasY(y0), rh = toCanvasY(0) - ry;
      ctx.fillStyle = `rgba(99,102,241,${0.3 + 0.3 * (y0 / yMax)})`;
      ctx.fillRect(rx, ry, rw, rh);
      ctx.strokeStyle = '#6366f1';
      ctx.lineWidth = 0.8;
      ctx.strokeRect(rx, ry, rw, rh);
    }

    // Exact curve
    ctx.beginPath();
    for (let px = margin; px <= w - margin; px++) {
      const x = a + (px - margin) * (b - a) / plotW;
      const y = f(x);
      ctx.lineTo(px, toCanvasY(y));
    }
    ctx.strokeStyle = '#60a5fa'; ctx.lineWidth = 2.5; ctx.stroke();

    // Exact area fill
    ctx.beginPath();
    ctx.moveTo(toCanvasX(a), toCanvasY(0));
    for (let px = 0; px <= 100; px++) { const x = a + (b - a) * px / 100; ctx.lineTo(toCanvasX(x), toCanvasY(f(x))); }
    ctx.lineTo(toCanvasX(b), toCanvasY(0));
    ctx.fillStyle = 'rgba(96,165,250,0.08)'; ctx.fill();

    // Axes
    ctx.strokeStyle = 'rgba(148,163,184,0.6)'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(margin, h - margin); ctx.lineTo(w - margin, h - margin); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(margin, margin); ctx.lineTo(margin, h - margin); ctx.stroke();

    // Axis labels
    ctx.fillStyle = '#94a3b8'; ctx.font = '10px sans-serif'; ctx.textAlign = 'center';
    [a, (a+b)/2, b].forEach(x => ctx.fillText(x.toFixed(1), toCanvasX(x), h - margin + 14));

    const exact = (Math.pow(b, 3) - Math.pow(a, 3)) / 3;
    ctx.fillStyle = '#60a5fa'; ctx.font = 'bold 11px sans-serif'; ctx.textAlign = 'left';
    ctx.fillText(`Approx Area ≈ ${sum.toFixed(4)}`, margin + 5, 18);
    ctx.fillStyle = '#4ade80'; ctx.fillText(`Exact ∫x²dx = ${exact.toFixed(4)}`, margin + 5, 32);
    ctx.fillStyle = '#f59e0b'; ctx.fillText(`n=${n} strips, error=${Math.abs(sum - exact).toFixed(4)}`, margin + 5, h - margin - 5);

    animRef.current = requestAnimationFrame(draw);
  }, [n, a, b]);

  useEffect(() => { animRef.current = requestAnimationFrame(draw); return () => cancelAnimationFrame(animRef.current); }, [draw]);

  return (
    <div className="flex flex-col md:flex-row h-full w-full bg-slate-950">
      <div className="flex-1 flex items-center justify-center p-3">
        <canvas ref={canvasRef} width={400} height={320} className="rounded-2xl border border-white/10 shadow-2xl w-full max-w-[450px]" />
      </div>
      <div className="w-full md:w-72 bg-slate-900 border-l border-white/5 flex flex-col">
        <div className="p-4 border-b border-white/5">
          <p className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-1">Math Lab — Integration</p>
          <h2 className="text-lg font-bold text-white">{STEPS[Math.min(step, STEPS.length-1)].title}</h2>
        </div>
        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
          <div className="bg-indigo-500/10 border border-indigo-500/30 p-3 rounded-xl">
            <p className="text-indigo-200 text-xs">{STEPS[Math.min(step, STEPS.length-1)].instruction}</p>
          </div>
            <DraggableSlider label="Lower limit a" min={0} max={3} step={0.5} value={a} onChange={setA} color="#6366f1" />
            <DraggableSlider label="Upper limit b" min={1} max={6} step={0.5} value={b} onChange={setB} color="#6366f1" />
            <DraggableSlider label="Strips n" min={1} max={50} value={n} onChange={v => { setN(v); if (step < 1) setStep(1); }} color="#8b5cf6" />

          <div className="bg-white/5 p-3 rounded-xl text-xs space-y-1">
            <p className="text-gray-400">Function: <span className="text-white font-mono">f(x) = x²</span></p>
            <p className="text-gray-400">Exact: <span className="text-green-400 font-mono">{((b**3 - a**3)/3).toFixed(4)}</span></p>
            <p className="text-gray-400">Formula: <span className="text-white font-mono">∫x²dx = x³/3</span></p>
          </div>
          <div className="flex gap-1">
            {STEPS.map((_, idx) => <div key={idx} className="flex-1 h-1.5 rounded-full cursor-pointer" style={{ backgroundColor: idx <= step ? '#6366f1' : 'rgba(255,255,255,0.1)' }} onClick={() => setStep(idx)} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

// ====== CONICS LAB 3D (m4) ======
const Conics3DScene: React.FC<{ type: string }> = ({ type }) => {
  const planeRef = useRef<THREE.Mesh>(null);
  
  useFrame((state, delta) => {
    if (planeRef.current) {
      let targetRotX = 0;
      let targetRotZ = 0;
      let targetPosY = 0;

      // The Cone has an angle. Let's assume height 6, radius 3 -> angle is atan(3/6) ~ 26 deg
      // Parabola: parallel to a generator -> angle ~ 26.5 deg (approx 0.46 rad)
      if (type === 'parabola') {
        targetRotX = 0.463; // atan(1/2) parallel to side
        targetPosY = 1.5;
      } else if (type === 'hyperbola') {
        targetRotX = Math.PI / 2; // Vertical slice
        targetPosY = 0;
      } else {
        // Ellipse
        targetRotX = 0.2; // Slight tilt
        targetPosY = 2; // Cut upper cone completely
      }

      planeRef.current.rotation.x = THREE.MathUtils.lerp(planeRef.current.rotation.x, targetRotX, delta * 5);
      planeRef.current.rotation.z = THREE.MathUtils.lerp(planeRef.current.rotation.z, targetRotZ, delta * 5);
      planeRef.current.position.y = THREE.MathUtils.lerp(planeRef.current.position.y, targetPosY, delta * 5);
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Upper Nappe */}
      <Cone args={[3, 6, 64]} position={[0, 3.01, 0]} rotation={[0, 0, 0]}>
        <meshPhysicalMaterial color="#8b5cf6" transmission={0.9} opacity={1} transparent roughness={0.1} side={THREE.DoubleSide} />
      </Cone>
      {/* Lower Nappe */}
      <Cone args={[3, 6, 64]} position={[0, -3.01, 0]} rotation={[Math.PI, 0, 0]}>
        <meshPhysicalMaterial color="#8b5cf6" transmission={0.9} opacity={1} transparent roughness={0.1} side={THREE.DoubleSide} />
      </Cone>

      {/* Intersecting Plane */}
      <Plane ref={planeRef} args={[8, 8, 32, 32]}>
        <meshPhysicalMaterial color="#3b82f6" emissive="#1d4ed8" emissiveIntensity={0.5} transparent opacity={0.6} side={THREE.DoubleSide} depthWrite={false} />
      </Plane>
    </group>
  );
};

const ConicsLab: React.FC<{ hex: string }> = ({ hex }) => {
  const [type, setType] = useState<'parabola'|'ellipse'|'hyperbola'>('parabola');
  const [step, setStep] = useState(0);

  const STEPS = [
    { title: 'Conic Sections in 3D', instruction: 'Conic sections are formed by intersecting a flat plane with a double-nappe right circular cone. Rotate the 3D scene to explore!' },
    { title: 'Ellipse & Circle', instruction: 'An ellipse is formed when the plane cuts entirely through one cone at a slight angle. If the plane is perfectly horizontal, it forms a Circle.' },
    { title: 'Parabola', instruction: 'A parabola forms when the cutting plane is exactly parallel to the slanted side (generator) of the cone, cutting only one nappe.' },
    { title: 'Hyperbola', instruction: 'A hyperbola forms when the vertical plane intersects BOTH cones (nappes), creating two separate distinct curves.' },
  ];

  return (
    <div className="flex flex-col md:flex-row h-full w-full bg-[#030712]">
      {/* 3D Viewport */}
      <div className="flex-1 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#1e1b4b,#0f172a)] z-0" />
        <div className="absolute inset-0 z-10">
          <Canvas shadows camera={{ position: [8, 5, 8], fov: 45 }}>
            <color attach="background" args={['#0f172a']} />
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
            <pointLight position={[-10, -10, -10]} intensity={2} color="#a855f7" />
            <Environment preset="city" />
            
            <group position={[0, 0, 0]}>
              <Grid infiniteGrid fadeDistance={20} sectionColor="#475569" cellColor="#1e293b" />
              <Conics3DScene type={type} />
            </group>

            <OrbitControls minPolarAngle={0} maxPolarAngle={Math.PI / 2 + 0.1} minDistance={5} maxDistance={25} autoRotate autoRotateSpeed={1} />
          </Canvas>
          <div className="absolute top-4 left-4 text-xs text-white/50 font-bold uppercase tracking-widest bg-black/40 px-3 py-1 rounded-full backdrop-blur-md z-20">
            Drag to Rotate • Scroll to Zoom
          </div>
        </div>
      </div>

      <div className="w-full md:w-80 bg-slate-900 border-l border-white/5 flex flex-col z-20 shrink-0 shadow-[-20px_0_50px_rgba(0,0,0,0.5)]">
        <div className="p-5 border-b border-white/5 bg-slate-950">
          <p className="text-xs font-bold uppercase tracking-widest text-violet-400 mb-1">Math Lab — Conics</p>
          <h2 className="text-xl font-bold text-white">{STEPS[Math.min(step, STEPS.length-1)].title}</h2>
        </div>
        <div className="flex-1 p-5 space-y-5 overflow-y-auto">
          <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-xl shadow-inner">
            <p className="text-violet-200 text-sm leading-relaxed">{STEPS[Math.min(step, STEPS.length-1)].instruction}</p>
          </div>
          
          <div className="space-y-3">
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Select Intersecting Plane</p>
            <div className="flex flex-col gap-2">
              {(['parabola', 'ellipse', 'hyperbola'] as const).map((t, idx) => (
                <button key={t} onClick={() => { setType(t); setStep(idx + 1); }}
                  className={`p-3 rounded-xl text-sm font-bold capitalize transition-all border text-left flex justify-between items-center ${type === t ? 'border-violet-500 bg-violet-600/20 text-white shadow-[0_0_15px_rgba(139,92,246,0.2)]' : 'border-white/10 text-slate-400 hover:bg-white/5'}`}>
                  {t}
                  <span className={`w-2 h-2 rounded-full ${type === t ? 'bg-violet-400 animate-pulse' : 'bg-transparent'}`} />
                </button>
              ))}
            </div>
          </div>

          <div className="bg-black/40 border border-white/5 p-4 rounded-xl">
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-3">Geometric Equations</p>
            <div className="space-y-2 font-mono text-xs text-slate-300">
              {type === 'ellipse' && <p>x²/a² + y²/b² = 1</p>}
              {type === 'parabola' && <p>y = ax² + bx + c</p>}
              {type === 'hyperbola' && <p>x²/a² - y²/b² = 1</p>}
            </div>
          </div>

          <div className="pt-2">
            <p className="text-[10px] text-slate-500 font-bold uppercase mb-2 flex justify-between">
              <span>Progress</span> <span>{step+1}/{STEPS.length}</span>
            </p>
            <div className="flex gap-1">
              {STEPS.map((_, idx) => <div key={idx} className="flex-1 h-1.5 rounded-full cursor-pointer" style={{ backgroundColor: idx <= step ? '#8b5cf6' : 'rgba(255,255,255,0.1)' }} onClick={() => setStep(idx)} />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ====== VECTORS LAB (m5) ======
const VectorsLab: React.FC<{ hex: string }> = ({ hex }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const [ax, setAx] = useState(3); const [ay, setAy] = useState(2);
  const [bx, setBx] = useState(1); const [by, setBy] = useState(-2);
  const [step, setStep] = useState(0);

  const cx = 200, cy = 180, scale = 30;
  const dot = ax*bx + ay*by;
  const magA = Math.sqrt(ax*ax + ay*ay);
  const magB = Math.sqrt(bx*bx + by*by);
  const cross = ax*by - ay*bx;
  const angle = Math.acos(Math.min(1, Math.max(-1, dot / (magA * magB)))) * 180 / Math.PI;

  const STEPS = [
    { title: 'Vectors Lab', instruction: 'A vector has magnitude AND direction. Modify vectors A and B with sliders. Watch dot product, cross product, and angle update live!' },
    { title: 'Dot Product', instruction: 'A·B = |A||B|cosθ = AxBx + AyBy. If dot=0, vectors are perpendicular. If positive, angle < 90°. If negative, angle > 90°.' },
    { title: 'Cross Product', instruction: 'A×B = AxBy - AyBx (z-component in 2D). If cross=0, vectors are parallel or anti-parallel. |A×B| = |A||B|sinθ = area of parallelogram.' },
  ];

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const w = canvas.width, h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#0f172a'; ctx.fillRect(0, 0, w, h);
    // Grid
    ctx.strokeStyle = 'rgba(255,255,255,0.05)'; ctx.lineWidth = 1;
    for (let gx = -7; gx <= 7; gx++) { const sx = cx + gx*scale; ctx.beginPath(); ctx.moveTo(sx, 0); ctx.lineTo(sx, h); ctx.stroke(); }
    for (let gy = -5; gy <= 5; gy++) { const sy = cy + gy*scale; ctx.beginPath(); ctx.moveTo(0, sy); ctx.lineTo(w, sy); ctx.stroke(); }
    // Axes
    ctx.strokeStyle = 'rgba(148,163,184,0.4)'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(0, cy); ctx.lineTo(w, cy); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx, 0); ctx.lineTo(cx, h); ctx.stroke();

    const drawArrow = (x: number, y: number, color: string, label: string) => {
      const ex = cx + x * scale, ey = cy - y * scale;
      const angle2 = Math.atan2(-y, x);
      ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(ex, ey);
      ctx.strokeStyle = color; ctx.lineWidth = 3; ctx.stroke();
      // Arrowhead
      ctx.beginPath();
      ctx.moveTo(ex, ey);
      ctx.lineTo(ex - 10 * Math.cos(angle2 - 0.35), ey + 10 * Math.sin(angle2 - 0.35));
      ctx.lineTo(ex - 10 * Math.cos(angle2 + 0.35), ey + 10 * Math.sin(angle2 + 0.35));
      ctx.closePath(); ctx.fillStyle = color; ctx.fill();
      // Label
      ctx.fillStyle = color; ctx.font = 'bold 13px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText(label, ex + 15 * Math.cos(angle2), ey - 15 * Math.sin(angle2));
    };

    drawArrow(ax, ay, '#60a5fa', `A(${ax},${ay})`);
    drawArrow(bx, by, '#f87171', `B(${bx},${by})`);
    // Resultant
    drawArrow(ax + bx, ay + by, '#4ade80', 'A+B');
    // Parallelogram
    ctx.beginPath();
    ctx.moveTo(cx + ax*scale, cy - ay*scale);
    ctx.lineTo(cx + (ax+bx)*scale, cy - (ay+by)*scale);
    ctx.lineTo(cx + bx*scale, cy - by*scale);
    ctx.strokeStyle = 'rgba(168,85,247,0.3)'; ctx.lineWidth = 1; ctx.setLineDash([4,3]); ctx.stroke(); ctx.setLineDash([]);

    // Angle arc
    const angRad = Math.atan2(-ay, ax);
    const angRad2 = Math.atan2(-by, bx);
    ctx.beginPath(); ctx.arc(cx, cy, 25, angRad, angRad2, angRad > angRad2);
    ctx.strokeStyle = '#f59e0b'; ctx.lineWidth = 1.5; ctx.stroke();
    ctx.fillStyle = '#f59e0b'; ctx.font = '9px'; ctx.textAlign = 'center';
    ctx.fillText(`${angle.toFixed(0)}°`, cx + 35 * Math.cos((angRad + angRad2)/2), cy - 35 * Math.sin((angRad + angRad2)/2));

    animRef.current = requestAnimationFrame(draw);
  }, [ax, ay, bx, by]);

  useEffect(() => { animRef.current = requestAnimationFrame(draw); return () => cancelAnimationFrame(animRef.current); }, [draw]);

  return (
    <div className="flex flex-col md:flex-row h-full w-full bg-slate-950">
      <div className="flex-1 flex items-center justify-center p-3">
        <canvas ref={canvasRef} width={400} height={360} className="rounded-2xl border border-white/10 shadow-2xl w-full max-w-[450px]" />
      </div>
      <div className="w-full md:w-72 bg-slate-900 border-l border-white/5 flex flex-col">
        <div className="p-4 border-b border-white/5">
          <p className="text-xs font-bold uppercase tracking-widest text-pink-400 mb-1">Math Lab — Vectors</p>
          <h2 className="text-lg font-bold text-white">{STEPS[Math.min(step, STEPS.length-1)].title}</h2>
        </div>
        <div className="flex-1 p-4 space-y-3 overflow-y-auto">
          <div className="bg-pink-500/10 border border-pink-500/30 p-3 rounded-xl">
            <p className="text-pink-200 text-xs">{STEPS[Math.min(step, STEPS.length-1)].instruction}</p>
          </div>
          <div className="bg-white/5 p-3 rounded-xl border border-white/10 space-y-2 text-sm font-mono">
            <p className="text-gray-400">A = <span className="text-blue-400">({ax}, {ay})</span> |A|={magA.toFixed(2)}</p>
            <p className="text-gray-400">B = <span className="text-red-400">({bx}, {by})</span> |B|={magB.toFixed(2)}</p>
            <p className="text-gray-400">A·B = <span className={`font-bold ${dot >= 0 ? 'text-green-400' : 'text-red-400'}`}>{dot}</span> {dot === 0 ? '(⊥ perpendicular!)' : ''}</p>
            <p className="text-gray-400">A×B = <span className="text-purple-300">{cross.toFixed(2)}</span></p>
            <p className="text-gray-400">θ = <span className="text-yellow-300">{angle.toFixed(1)}°</span></p>
          </div>
          {[['A', ax, ay, setAx, setAy, '#60a5fa', '#f87171'], ['B', bx, by, setBx, setBy, '#60a5fa', '#f87171']].map(([label, vx, vy, setX, setY, cX, cY]: any) => (
            <div key={label} className="space-y-1">
              <p className="text-xs font-bold text-gray-400">Vector {label} = ({vx}, {vy})</p>
              <DraggableSlider label={`${label}x`} min={-5} max={5} value={vx} onChange={v => { setX(v); if (step < 1) setStep(1); }} color={cX} />
              <DraggableSlider label={`${label}y`} min={-4} max={4} value={vy} onChange={v => { setY(v); if (step < 2) setStep(2); }} color={cY} />
            </div>
          ))}

          <div className="flex gap-1">{STEPS.map((_, idx) => <div key={idx} className="flex-1 h-1.5 rounded-full cursor-pointer" style={{ backgroundColor: idx <= step ? '#ec4899' : 'rgba(255,255,255,0.1)' }} onClick={() => setStep(idx)} />)}</div>
        </div>
      </div>
    </div>
  );
};

// Router
const MathLab: React.FC<MathLabProps> = ({ hex, labId }) => {
  if (labId === 'm1') return <GraphingLab hex={hex} />;
  if (labId === 'm2') return <IntegrationLab hex={hex} />;
  if (labId === 'm4') return <ConicsLab hex={hex} />;
  if (labId === 'm5') return <VectorsLab hex={hex} />;
  return <div className="flex items-center justify-center h-full text-gray-400">Math lab coming soon</div>;
};

export default MathLab;
