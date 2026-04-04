import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { RotateCcw, Crosshair, Sparkles } from 'lucide-react';

interface ConvexLensLabProps {
  hex: string;
}

// Mirror formula for lens: 1/v - 1/u = 1/f
// Sign convention: Light travels L->R. Optical center at 0.
// Object is on left -> u is negative.
// Focal point of convex lens is real (on right) -> f is positive.

const W = 800;
const H = 400;
const OPTICAL_CENTER = W / 2;
const AXIS_Y = H / 2;
const CM_TO_PX = 8; // scale factor

export default function ConvexLensLab3D({ hex }: ConvexLensLabProps) {
  // We use Framer Motion springs for Apple-level buttery smooth animations
  const [u_cm, setUCm] = useState(-30); // Object distance (negative)
  const [f_cm, setFCm] = useState(15);  // Focal length (positive)
  const [objH_cm, setObjHCm] = useState(10); // Object height

  // Spring configurations for physics-based fluid motion
  const springConfig = { damping: 20, stiffness: 120, mass: 0.8 };
  
  const animatedU = useSpring(u_cm, springConfig);
  const animatedF = useSpring(f_cm, springConfig);
  const animatedH = useSpring(objH_cm, springConfig);

  // Calculated values for React state to drive UI
  const [v_cm, setVCm] = useState(0);
  const [mag, setMag] = useState(0);

  useEffect(() => {
    // 1/v = 1/f + 1/u
    if (Math.abs(u_cm + f_cm) < 0.1 && u_cm === -f_cm) {
      setVCm(Infinity);
      setMag(Infinity);
      return;
    }
    const invV = (1 / f_cm) + (1 / u_cm);
    if (Math.abs(invV) < 0.0001) {
      setVCm(Infinity);
      setMag(Infinity);
    } else {
      const v = 1 / invV;
      setVCm(v);
      setMag(v / u_cm);
    }
    // Update spring targets
    animatedU.set(u_cm);
    animatedF.set(f_cm);
    animatedH.set(objH_cm);
  }, [u_cm, f_cm, objH_cm, animatedU, animatedF, animatedH]);

  // Framer motion transformed values for SVG path drawing
  const svX = useTransform(animatedU, u => OPTICAL_CENTER + (u * CM_TO_PX));
  const svY = useTransform(animatedH, h => AXIS_Y - (h * CM_TO_PX));
  
  const svF1X = useTransform(animatedF, f => OPTICAL_CENTER - (f * CM_TO_PX));
  const svF2X = useTransform(animatedF, f => OPTICAL_CENTER + (f * CM_TO_PX));

  const svImageX = useTransform([animatedU, animatedF], ([u, f]: any) => {
    const invV = (1 / f) + (1 / u);
    if (Math.abs(invV) < 0.0001) return 10000; // Infinity
    return OPTICAL_CENTER + ((1 / invV) * CM_TO_PX);
  });

  const svImageY = useTransform([animatedU, animatedF, animatedH], ([u, f, h]: any) => {
    const invV = (1 / f) + (1 / u);
    if (Math.abs(invV) < 0.0001) return AXIS_Y;
    const v = 1 / invV;
    const m = v / u;
    return AXIS_Y - (h * m * CM_TO_PX); // inverted y-axis in SVG
  });

  // Animated Ray Paths
  // Ray 1: Parallel to axis, refracts through F2
  const ray1D = useTransform([svX, svY, svF2X], ([ox, oy, f2x]: any) => {
    // Extend ray past F2
    const slope = (AXIS_Y - oy) / (f2x - OPTICAL_CENTER);
    const endX = OPTICAL_CENTER + 800;
    const endY = AXIS_Y + slope * (endX - f2x);
    return `M ${ox},${oy} L ${OPTICAL_CENTER},${oy} L ${f2x},${AXIS_Y} L ${endX},${endY}`;
  });

  // Ray 2: Through optical center, passes undeviated
  const ray2D = useTransform([svX, svY], ([ox, oy]: any) => {
    const slope = (AXIS_Y - oy) / (OPTICAL_CENTER - ox);
    const endX = ox > OPTICAL_CENTER ? -800 : 1600;
    const endY = oy + slope * (endX - ox);
    return `M ${ox},${oy} L ${OPTICAL_CENTER},${AXIS_Y} L ${endX},${endY}`;
  });

  // Ray 3: Through F1, refracts parallel to axis
  const ray3D = useTransform([svX, svY, svF1X], ([ox, oy, f1x]: any) => {
    // Top to F1 to Lens to Parallel
    const slope = (AXIS_Y - oy) / (f1x - ox);
    const lensHitY = oy + slope * (OPTICAL_CENTER - ox);
    return `M ${ox},${oy} L ${f1x},${AXIS_Y} L ${OPTICAL_CENTER},${lensHitY} L ${2000},${lensHitY}`;
  });

  const isVirtual = v_cm < 0;

  return (
    <div className="flex flex-col h-full w-full bg-[#030712] overflow-hidden font-sans text-slate-200">
      
      {/* HEADER */}
      <div className="flex shrink-0 items-center justify-between px-6 py-4 border-b border-white/5 bg-white/[0.02] backdrop-blur-xl z-20">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-white flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400"><Crosshair size={16} /></span>
            Convex Lens Simulation
          </h2>
          <p className="text-sm text-slate-500 font-medium tracking-wide">Optical Ray Tracing & Focal Point Analysis</p>
        </div>
        
        {/* Apple-styled Glass Readout Card */}
        <motion.div 
          className="flex gap-6 px-5 py-2.5 rounded-2xl bg-white/5 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-2xl"
          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex flex-col"><span className="text-[10px] uppercase font-semibold text-slate-400">Object (u)</span><span className="font-mono text-sm font-semibold text-white">{u_cm} cm</span></div>
          <div className="flex flex-col"><span className="text-[10px] uppercase font-semibold text-slate-400">Focal (f)</span><span className="font-mono text-sm font-semibold text-amber-400">{f_cm} cm</span></div>
          <div className="flex flex-col"><span className="text-[10px] uppercase font-semibold text-slate-400">Image (v)</span><span className="font-mono text-sm font-semibold" style={{color: isVirtual?'#f87171':'#34d399'}}>{isFinite(v_cm) ? v_cm.toFixed(1) : '∞'} cm</span></div>
          <div className="flex flex-col"><span className="text-[10px] uppercase font-semibold text-slate-400">Mag (m)</span><span className="font-mono text-sm font-semibold text-blue-300">{isFinite(mag) ? Math.abs(mag).toFixed(2) : '∞'}×</span></div>
        </motion.div>
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        
        {/* MAIN CANVAS PORTRAIT */}
        <div className="flex-1 relative overflow-hidden bg-gradient-to-b from-[#0a0f1c] to-[#02040a]">
          {/* Subtle grid background */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '40px 40px', backgroundPosition: 'center center' }} />

          {/* SVG Rendering Layer */}
          <svg width="100%" height="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" className="absolute inset-0 drop-shadow-xl z-10">
            <defs>
              <linearGradient id="lensGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="rgba(56, 189, 248, 0.1)" />
                <stop offset="50%" stopColor="rgba(56, 189, 248, 0.4)" />
                <stop offset="100%" stopColor="rgba(56, 189, 248, 0.1)" />
              </linearGradient>
              <radialGradient id="glowPoint" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(251, 191, 36, 1)" />
                <stop offset="40%" stopColor="rgba(251, 191, 36, 0.4)" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
              <filter id="blurNeon">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
            </defs>

            {/* Principal Axis */}
            <line x1="0" y1={AXIS_Y} x2={W} y2={AXIS_Y} stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeDasharray="8 6" />
            <text x="20" y={AXIS_Y - 10} fill="rgba(255,255,255,0.3)" fontSize="10" fontWeight="600" letterSpacing="1">PRINCIPAL AXIS</text>

            {/* F1, F2, 2F1, 2F2 Markers */}
            {[
              { x: OPTICAL_CENTER - (f_cm * CM_TO_PX), lbl: 'F₁' },
              { x: OPTICAL_CENTER + (f_cm * CM_TO_PX), lbl: 'F₂' },
              { x: OPTICAL_CENTER - (2 * f_cm * CM_TO_PX), lbl: '2F₁' },
              { x: OPTICAL_CENTER + (2 * f_cm * CM_TO_PX), lbl: '2F₂' }
            ].map((p, i) => (
              <g key={i}>
                <circle cx={p.x} cy={AXIS_Y} r="4" fill="#fbbf24" filter="url(#blurNeon)" />
                <text x={p.x} y={AXIS_Y + 18} fill="#fcd34d" fontSize="11" fontWeight="bold" textAnchor="middle">{p.lbl}</text>
              </g>
            ))}

            {/* The Glass Convex Lens (Smooth bezier curve) */}
            <path 
              d={`M ${OPTICAL_CENTER}, ${AXIS_Y - 120} Q ${OPTICAL_CENTER + 25}, ${AXIS_Y} ${OPTICAL_CENTER}, ${AXIS_Y + 120} Q ${OPTICAL_CENTER - 25}, ${AXIS_Y} ${OPTICAL_CENTER}, ${AXIS_Y - 120} Z`}
              fill="url(#lensGrad)"
              stroke="rgba(56, 189, 248, 0.6)"
              strokeWidth="2"
              className="backdrop-blur-sm"
              style={{ filter: 'drop-shadow(0 0 15px rgba(56,189,248,0.2))' }}
            />
            {/* Optical Center crosshair */}
            <line x1={OPTICAL_CENTER} y1={AXIS_Y - 140} x2={OPTICAL_CENTER} y2={AXIS_Y + 140} stroke="rgba(56,189,248,0.3)" strokeWidth="1" strokeDasharray="4 4" />

            {/* --- RAYS --- */}
            {/* Ray 1 (Yellow) */}
            <motion.path d={ray1D} fill="none" stroke="#fde047" strokeWidth="2" strokeOpacity={0.8} filter="url(#blurNeon)" />
            {/* Ray 2 (Green) */}
            <motion.path d={ray2D} fill="none" stroke="#4ade80" strokeWidth="2" strokeOpacity={0.8} filter="url(#blurNeon)" />
            {/* Ray 3 (Purple) */}
            <motion.path d={ray3D} fill="none" stroke="#d8b4fe" strokeWidth="2" strokeOpacity={0.8} filter="url(#blurNeon)" />

            {/* Dotted lines for virtual rays backwards */}
            {isVirtual && (
              <>
                <motion.line x1={OPTICAL_CENTER} y1={svY} x2={svImageX} y2={svImageY} stroke="#fde047" strokeWidth="1.5" strokeDasharray="4 4" strokeOpacity="0.5" />
                <motion.line x1={OPTICAL_CENTER} y1={AXIS_Y} x2={svImageX} y2={svImageY} stroke="#4ade80" strokeWidth="1.5" strokeDasharray="4 4" strokeOpacity="0.5" />
              </>
            )}

            {/* Animated Object Arrow */}
            <motion.g>
              <motion.line x1={svX} y1={AXIS_Y} x2={svX} y2={svY} stroke="#e2e8f0" strokeWidth="4" strokeLinecap="round" />
              <motion.polygon 
                points={`0,0 -8,12 8,12`} 
                fill="#f8fafc"
                style={{ translateX: svX, translateY: svY }}
              />
              <motion.text style={{ x: svX, y: useTransform(svY, y => y - 10) }} fill="white" fontSize="12" fontWeight="bold" textAnchor="middle">O</motion.text>
            </motion.g>

            {/* Animated Image Arrow */}
            {isFinite(v_cm) && (
              <motion.g style={{ opacity: Math.abs(v_cm) > 1000 ? 0 : 1 }}>
                <motion.line x1={svImageX} y1={AXIS_Y} x2={svImageX} y2={svImageY} stroke={isVirtual ? "#f87171" : "#34d399"} strokeWidth="4" strokeLinecap="round" strokeDasharray={isVirtual ? "6 4" : "none"} />
                <motion.polygon 
                  points={mag > 0 ? `0,0 -8,12 8,12` : `0,0 -8,-12 8,-12`} 
                  fill={isVirtual ? "#f87171" : "#34d399"}
                  style={{ translateX: svImageX, translateY: svImageY }}
                />
                <motion.text style={{ x: svImageX, y: useTransform([svImageY, animatedH], ([y, h]: any) => y + (mag > 0 ? -12 : 20)) }} fill={isVirtual ? "#f87171" : "#34d399"} fontSize="12" fontWeight="bold" textAnchor="middle">I</motion.text>
              </motion.g>
            )}

            {/* Focal glow overlay at Focus 2 to make it feel magical */}
            <motion.circle cx={svF2X} cy={AXIS_Y} r="30" fill="url(#glowPoint)" />

          </svg>
        </div>

        {/* RIGHT CONTROL PANEL - Apple Glass Style */}
        <div className="w-80 shrink-0 bg-white/[0.01] backdrop-blur-2xl border-l border-white/5 flex flex-col z-20 shadow-[-10px_0_30px_rgba(0,0,0,0.5)]">
          <div className="p-6 flex-1 overflow-y-auto space-y-8">
            
            {/* Control: Object Distance */}
            <div className="space-y-3">
              <div className="flex justify-between items-baseline">
                <label className="text-sm font-semibold text-slate-200">Object Dist (u)</label>
                <span className="text-xs font-mono px-2 py-1 rounded-md bg-white/10 text-slate-100">{u_cm} cm</span>
              </div>
              {/* Apple-style custom slider */}
              <div className="relative h-6 flex items-center group">
                <div className="absolute w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: `${((u_cm + 80) / 75) * 100}%` }} />
                </div>
                <input type="range" min="-80" max="-5" value={u_cm} onChange={e => setUCm(parseInt(e.target.value))} className="absolute w-full h-full opacity-0 cursor-pointer" />
                <motion.div 
                  className="w-5 h-5 rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.4)] absolute pointer-events-none transition-transform group-active:scale-125 group-active:shadow-[0_0_15px_rgba(59,130,246,0.6)]"
                  style={{ left: `calc(${((u_cm + 80) / 75) * 100}% - 10px)` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-slate-500 font-medium"><span>-80cm</span><span>-5cm</span></div>
            </div>

            {/* Control: Focal Length */}
            <div className="space-y-3">
              <div className="flex justify-between items-baseline">
                <label className="text-sm font-semibold text-slate-200">Focal Length (f)</label>
                <span className="text-xs font-mono px-2 py-1 rounded-md bg-white/10 text-amber-300">{f_cm} cm</span>
              </div>
              <div className="relative h-6 flex items-center group">
                <div className="absolute w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: `${((f_cm - 10) / 30) * 100}%` }} />
                </div>
                <input type="range" min="10" max="40" value={f_cm} onChange={e => setFCm(parseInt(e.target.value))} className="absolute w-full h-full opacity-0 cursor-pointer" />
                <motion.div 
                  className="w-5 h-5 rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.4)] absolute pointer-events-none transition-transform group-active:scale-125 group-active:shadow-[0_0_15px_rgba(245,158,11,0.6)]"
                  style={{ left: `calc(${((f_cm - 10) / 30) * 100}% - 10px)` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-slate-500 font-medium"><span>10cm</span><span>40cm</span></div>
            </div>

            {/* Observation Card */}
            <div className="relative overflow-hidden rounded-2xl p-[1px] bg-gradient-to-b from-white/20 to-white/5">
              <div className="bg-[#0b1120] rounded-[15px] p-5 h-full relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4 flex items-center gap-2"><Sparkles size={12}/> Analysis</h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="text-[10px] uppercase text-slate-500 mb-1">Image Nature</div>
                    <div className="text-sm font-medium text-white">
                      {!isFinite(v_cm) ? 'Formed at Infinity (Parallel Rays)' : isVirtual ? 'Virtual & Erect (Behind object)' : 'Real & Inverted (On screen)'}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase text-slate-500 mb-1">Magnification</div>
                    <div className="text-sm font-medium text-white flex items-end gap-2">
                      <span className="text-2xl font-light">{isFinite(mag) ? Math.abs(mag).toFixed(2) : '∞'}x</span>
                      <span className="text-xs pb-1 text-slate-400">{isFinite(mag) ? (Math.abs(mag) > 1 ? 'Magnified' : Math.abs(mag) < 1 ? 'Diminished' : 'Same Size') : ''}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Presets */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">Optical Cases</h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { lbl: 'At Infinity', u: -80, f: 15 },
                  { lbl: 'Beyond 2F', u: -45, f: 15 },
                  { lbl: 'At 2F', u: -30, f: 15 },
                  { lbl: 'Between F & 2F', u: -20, f: 15 },
                  { lbl: 'At F', u: -15, f: 15 },
                  { lbl: 'Within F', u: -10, f: 15 },
                ].map(p => (
                  <button 
                    key={p.lbl}
                    onClick={() => { setUCm(p.u); setFCm(p.f); }}
                    className={`px-3 py-2 rounded-xl text-[10px] font-semibold transition-all active:scale-95 border
                      ${u_cm === p.u && f_cm === p.f 
                        ? 'bg-blue-500/20 border-blue-500/50 text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.3)]' 
                        : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10 hover:text-white'}`}
                  >
                    {p.lbl}
                  </button>
                ))}
              </div>
            </div>
            
          </div>
          
          <div className="p-4 border-t border-white/5 shrink-0">
            <button 
              onClick={() => { setUCm(-30); setFCm(15); }}
              className="w-full py-3 flex items-center justify-center gap-2 rounded-xl bg-white/5 hover:bg-white/10 text-sm font-medium text-slate-300 transition-colors"
            >
              <RotateCcw size={16} /> Reset Lab
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
