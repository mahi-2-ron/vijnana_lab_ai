import React, { useState, useCallback, useEffect } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { RotateCcw, ChevronLeft, ChevronRight, Activity } from 'lucide-react';
import ParticleEngine, { Particle, createSpark } from './ParticleEngine';

interface ConcaveMirrorLab3DProps { hex: string; }

const W = 700, H = 300;
const MIRROR_X = 560; // mirror at right
const AXIS_Y = H / 2; // principal axis
const SCALE = 5;      // Scale: 1 cm = 5 px

function toSvgX(cmFromPole: number): number {
  return MIRROR_X - cmFromPole * SCALE;
}

function mirrorCalc(u_abs: number, f: number): { v: number; m: number } {
  const u = -u_abs; // Object is left → negative in cartesian
  if (Math.abs(u) < 0.01) return { v: Infinity, m: Infinity };
  const v = 1 / (1 / f - 1 / u); // Mirror formula: 1/v = 1/f - 1/u
  const m = -(v / u);
  return { v, m };
}

function imageNature(v: number, m: number) {
  if (!isFinite(v) || Math.abs(v) > 9999) return { pos: '∞ (parallel reflected)', nature: 'No image formed', size: '—', color: '#94a3b8' };
  const pos = v < 0 ? 'Real (same side as object)' : 'Virtual (behind mirror)';
  const nature = v < 0 ? 'Real & Inverted' : 'Virtual & Erect';
  const size = Math.abs(m) > 1.05 ? 'Magnified' : Math.abs(m) < 0.95 ? 'Diminished' : 'Same size';
  const color = v < 0 ? '#f87171' : '#34d399';
  return { pos, nature, size, color };
}

function getRegionLabel(u: number, f: number) {
  if (u > 2 * f) return { label: 'Beyond C (u > 2f)', color: '#f87171', desc: 'Image: real, inverted, diminished, between F and C' };
  if (Math.abs(u - 2 * f) < 1) return { label: 'At C (u = 2f)', color: '#fb923c', desc: 'Image: real, inverted, same size, at C' };
  if (u > f) return { label: 'Between F & C', color: '#fbbf24', desc: 'Image: real, inverted, magnified, beyond C' };
  if (Math.abs(u - f) < 1) return { label: 'At F (u = f)', color: '#a78bfa', desc: 'Image: at infinity (parallel rays)' };
  return { label: 'Within F (u < f)', color: '#34d399', desc: 'Image: virtual, erect, magnified (behind mirror)' };
}

export default function ConcaveMirrorLab3D({ hex }: ConcaveMirrorLab3DProps) {
  const [u_abs, setUAbs] = useState(60);
  const [f, setF] = useState(20);
  const [objH, setObjH] = useState(40);
  
  const [particles, setParticles] = useState<Particle[]>([]);
  const [tab, setTab] = useState<'diagram' | 'readings'>('diagram');
  const [recordings, setRecordings] = useState<{ u: number; v: number; f_calc: number }[]>([]);

  // Apple-grade Framer Motion Springs for buttery smooth math calculations
  const springCfg = { stiffness: 120, damping: 20, mass: 0.5 };
  const s_u = useSpring(u_abs, springCfg);
  const s_f = useSpring(f, springCfg);
  const s_h = useSpring(objH, springCfg);

  useEffect(() => { s_u.set(u_abs); }, [u_abs, s_u]);
  useEffect(() => { s_f.set(f); }, [f, s_f]);
  useEffect(() => { s_h.set(objH); }, [objH, s_h]);

  const { v, m } = mirrorCalc(u_abs, f);
  const region = getRegionLabel(u_abs, f);
  const nature = imageNature(v, m);
  const fX = toSvgX(f);
  const cX = toSvgX(2 * f);

  const logReading = useCallback(() => {
    if (!isFinite(v)) return;
    const f_calc = 1 / (1 / v + 1 / (-u_abs));
    setRecordings(r => [...r, { u: u_abs, v: parseFloat(v.toFixed(2)), f_calc: parseFloat(Math.abs(f_calc).toFixed(2)) }]);
    setParticles(p => [...p, ...Array.from({ length: 20 }, () => createSpark(fX, AXIS_Y, '#fbbf24'))]);
  }, [v, u_abs, fX]);

  // Framer Motion transforms for SVGs
  const oX_spring = useTransform(s_u, val => toSvgX(val));
  const fX_spring = useTransform(s_f, val => toSvgX(val));
  const cX_spring = useTransform(s_f, val => toSvgX(2 * val));
  
  const iX_spring = useTransform(() => {
    const curU = s_u.get();
    const curF = s_f.get();
    const { v: curV } = mirrorCalc(curU, curF);
    return isFinite(curV) && Math.abs(curV) < 800 ? toSvgX(Math.abs(curV)) : toSvgX(800);
  });
  
  const iH_spring = useTransform(() => {
    const curU = s_u.get();
    const curF = s_f.get();
    const curH = s_h.get();
    const { m: curM } = mirrorCalc(curU, curF);
    return isFinite(curM) ? Math.abs(curH * curM) : 0;
  });

  const isReal_spring = useTransform(() => {
    const { v: curV } = mirrorCalc(s_u.get(), s_f.get());
    return curV < 0;
  });

  // Animated Ray Paths
  const ray1Path = useTransform(() => `M ${oX_spring.get()},${AXIS_Y - s_h.get()} L ${MIRROR_X},${AXIS_Y - s_h.get()} L ${fX_spring.get()},${AXIS_Y}`);
  const ray2Path = useTransform(() => {
    const u = s_u.get(), fv = s_f.get(), h = s_h.get();
    if (Math.abs(u - fv) < 0.5) return ""; // Ray through F undefined when object is at F
    return `M ${oX_spring.get()},${AXIS_Y - h} L ${fX_spring.get()},${AXIS_Y} L ${MIRROR_X},${AXIS_Y + h * (fv / (u - fv))} L 0,${AXIS_Y + h * (fv / (u - fv))}`;
  });
  const ray3Path = useTransform(() => `M ${oX_spring.get()},${AXIS_Y - s_h.get()} L ${cX_spring.get()},${AXIS_Y} L ${MIRROR_X},${AXIS_Y + s_h.get() * (2*s_f.get()/(s_u.get()-2*s_f.get()))}`);

  return (
    <div className="flex flex-col h-full w-full bg-[#030712] overflow-hidden font-sans text-slate-200 select-none">
      <style>{`
        @keyframes flow { to { stroke-dashoffset: -20; } }
      `}</style>
      
      {/* HEADER: Glassmorphic premium */}
      <div className="flex shrink-0 items-center justify-between px-6 py-4 border-b border-white/[0.05] bg-white/[0.01] backdrop-blur-2xl z-20 shadow-lg">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400"><RotateCcw size={18} /></span>
            Concave Mirror Simulation
          </h2>
          <p className="text-[11px] font-medium text-slate-500 uppercase tracking-widest mt-1">Optical Ray Tracing & Focal Point Analysis</p>
        </div>
        <div className="flex bg-[#0a0a0a] p-1 rounded-xl border border-white/5 shadow-inner">
          <button onClick={() => setTab('diagram')} className={`relative px-6 py-2 rounded-lg text-xs font-bold transition-colors ${tab === 'diagram' ? 'text-white' : 'text-slate-500'}`}>
            {tab === 'diagram' && <motion.div layoutId="t1" className="absolute inset-0 bg-blue-600 rounded-lg shadow-md" />}
            <span className="relative z-10">Ray Diagram</span>
          </button>
          <button onClick={() => setTab('readings')} className={`relative px-6 py-2 rounded-lg text-xs font-bold transition-colors ${tab === 'readings' ? 'text-white' : 'text-slate-500'}`}>
            {tab === 'readings' && <motion.div layoutId="t1" className="absolute inset-0 bg-blue-600 rounded-lg shadow-md" />}
            <span className="relative z-10">Readings</span>
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        <div className="flex-1 flex flex-col items-center bg-[radial-gradient(ellipse_at_top,#0e1526,#000000_80%)] relative p-8">
          
          <ParticleEngine particles={particles} setParticles={setParticles} width={W} height={H} />

          {tab === 'diagram' && (
            <div className="relative w-full max-w-4xl h-[400px] border border-white/10 flex flex-col items-center justify-center rounded-[30px] shadow-[inset_0_0_50px_rgba(0,0,0,0.8)] bg-black/40 backdrop-blur-md z-10 overflow-hidden">
              <svg width="100%" height="100%" viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 overflow-visible">
                <defs>
                  <filter id="glowF"><feGaussianBlur stdDeviation="3" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                </defs>

                {/* Grid */}
                <g opacity={0.05}>
                  {Array.from({length: 20}).map((_,i) => <line key={`gx${i}`} x1={i*40} y1={0} x2={i*40} y2={H} stroke="white" strokeWidth="1" />)}
                  {Array.from({length: 10}).map((_,i) => <line key={`gy${i}`} x1={0} y1={i*40} x2={W} y2={i*40} stroke="white" strokeWidth="1" />)}
                </g>

                {/* Principal Axis */}
                <line x1={0} y1={AXIS_Y} x2={W} y2={AXIS_Y} stroke="#334155" strokeWidth="1.5" strokeDasharray="6,4" />

                {/* Mirror Path */}
                <path d={`M ${MIRROR_X},${AXIS_Y - 120} Q ${MIRROR_X - 30},${AXIS_Y} ${MIRROR_X},${AXIS_Y + 120}`} fill="none" stroke="#60a5fa" strokeWidth="5" style={{ filter: 'drop-shadow(0 0 10px rgba(96,165,250,0.5))' }} />
                <path d={`M ${MIRROR_X},${AXIS_Y - 120} Q ${MIRROR_X - 30},${AXIS_Y} ${MIRROR_X},${AXIS_Y + 120}`} fill="none" stroke="#fff" strokeWidth="1" />
                {Array.from({ length: 10 }, (_, i) => {
                  const y = AXIS_Y - 100 + i * 22;
                  return <line key={i} x1={MIRROR_X-2} y1={y} x2={MIRROR_X + 10} y2={y + 8} stroke="#1e3a5f" strokeWidth="2" />;
                })}

                {/* Points */}
                <motion.g style={{ x: fX_spring, y: AXIS_Y }}>
                  <circle r={5} fill="#fbbf24" filter="url(#glowF)" />
                  <circle r={15} fill="#fbbf24" opacity={0.2} />
                  <text y={20} fill="#fbbf24" fontSize="12" fontWeight="bold" textAnchor="middle">F</text>
                </motion.g>
                <motion.g style={{ x: cX_spring, y: AXIS_Y }}>
                  <circle r={4} fill="#a78bfa" />
                  <text y={20} fill="#a78bfa" fontSize="12" fontStyle="italic" textAnchor="middle">C</text>
                </motion.g>

                {/* Principal Rays */}
                <motion.path d={ray1Path} fill="none" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="6,4" style={{ animation: 'flow 1s linear infinite' }} />
                <motion.path d={ray2Path} fill="none" stroke="#22d3ee" strokeWidth="1.5" strokeDasharray="6,4" style={{ animation: 'flow 1s linear infinite reverse' }} />
                <motion.path d={ray3Path} fill="none" stroke="#a78bfa" strokeWidth="1.5" strokeDasharray="6,4" style={{ animation: 'flow 1.5s linear infinite' }} />

                {/* Object */}
                <motion.g style={{ x: oX_spring, y: AXIS_Y }}>
                  <motion.line x1={0} y1={0} x2={0} y2={useTransform(s_h, h => -h)} stroke="#22c55e" strokeWidth="3" />
                  <motion.polygon points="0,0 -8,12 8,12" fill="#22c55e" style={{ y: useTransform(s_h, h => -h) }} />
                </motion.g>

                {/* Image */}
                {isFinite(v) && Math.abs(v) < 800 && (
                  <motion.g style={{ x: iX_spring, y: AXIS_Y }}>
                    <motion.line x1={0} y1={0} x2={0} y2={useTransform(() => isReal_spring.get() ? iH_spring.get() : -iH_spring.get())} 
                      stroke={useTransform(() => isReal_spring.get() ? '#f87171' : '#34d399')} strokeWidth="3" 
                      strokeDasharray={useTransform(() => isReal_spring.get() ? 'none' : '4,4')} />
                    <motion.polygon points="0,0 -8,-12 8,-12" 
                      fill={useTransform(() => isReal_spring.get() ? '#f87171' : '#34d399')} 
                      style={{ 
                        y: useTransform(() => isReal_spring.get() ? iH_spring.get() : -iH_spring.get()), 
                        rotate: useTransform(() => isReal_spring.get() ? 0 : 180) 
                      }} />
                  </motion.g>
                )}
              </svg>
            </div>
          )}

          {tab === 'readings' && (
             <div className="w-full max-w-3xl bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
               <h3 className="text-sm font-bold text-white mb-4">Experimental Log</h3>
               <table className="w-full text-xs text-left">
                 <thead className="bg-[#0b1120]">
                   <tr>
                     <th className="p-3 text-slate-400">#</th>
                     <th className="p-3 text-slate-400">Object Dist (u)</th>
                     <th className="p-3 text-slate-400">Image Dist (v)</th>
                     <th className="p-3 text-purple-400">Calculated (f)</th>
                     <th className="p-3 text-slate-400">Nature</th>
                   </tr>
                 </thead>
                 <tbody>
                   {recordings.map((r, i) => (
                     <tr key={i} className="border-t border-white/5 hover:bg-white/5">
                       <td className="p-3 text-slate-600">{i+1}</td>
                       <td className="p-3 font-mono text-green-400">{r.u.toFixed(1)} cm</td>
                       <td className="p-3 font-mono text-red-400">{r.v.toFixed(1)} cm</td>
                       <td className="p-3 font-mono font-bold text-purple-400">{r.f_calc.toFixed(2)} cm</td>
                       <td className="p-3" style={{color: r.v<0?'#f87171':'#34d399'}}>{r.v<0?'Real':'Virtual'}</td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
          )}

          <div className="absolute top-8 left-8 p-3 rounded-xl border backdrop-blur-md" style={{ background: `${region.color}15`, border: `1px solid ${region.color}40` }}>
            <div className="text-[10px] font-bold tracking-widest uppercase mb-1" style={{ color: region.color }}>{region.label}</div>
            <div className="text-[11px] text-slate-300">{region.desc}</div>
          </div>
        </div>

        {/* RIGHT CONTROL PANEL */}
        <div className="w-[320px] shrink-0 bg-white/[0.01] backdrop-blur-3xl border-l border-white/5 flex flex-col z-20 shadow-[-10px_0_30px_rgba(0,0,0,0.5)]">
          <div className="p-6 flex-1 overflow-y-auto space-y-8">
            
            {/* Real-time Apple-style controls */}
            <div className="space-y-6">
              {[
                { label: 'Object Dist (u)', val: u_abs, set: setUAbs, min: 5, max: 100, unit: 'cm', color: 'bg-slate-300' },
                { label: 'Focal Length (f)', val: f, set: setF, min: 10, max: 40, unit: 'cm', color: 'bg-amber-500' },
                { label: 'Object Height', val: objH, set: setObjH, min: 20, max: 80, unit: 'px', color: 'bg-green-500' }
              ].map(ctrl => (
                <div key={ctrl.label}>
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">{ctrl.label}</span>
                    <div className="flex bg-black/40 px-2 py-0.5 rounded-md border border-white/10">
                      <span className="font-mono text-[10px] text-white font-bold">{ctrl.val}</span>
                      <span className="text-[9px] text-slate-500 ml-1">{ctrl.unit}</span>
                    </div>
                  </div>
                  <div className="relative h-2 bg-[#0a0f1a] rounded-full border border-white/5 shadow-inner">
                    <div className={`absolute left-0 top-0 bottom-0 rounded-full ${ctrl.color}`} style={{ width: `${((ctrl.val - ctrl.min) / (ctrl.max - ctrl.min)) * 100}%` }} />
                    <input type="range" min={ctrl.min} max={ctrl.max} value={ctrl.val} onChange={e => ctrl.set(Number(e.target.value))} className="absolute inset-0 w-full opacity-0 cursor-ew-resize z-20" />
                    <motion.div className="absolute w-5 h-5 bg-white rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.5)] pointer-events-none z-10" style={{ top: -6, left: `calc(${((ctrl.val - ctrl.min) / (ctrl.max - ctrl.min)) * 100}% - 10px)` }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-[#0b1120] rounded-2xl p-5 border border-white/5 shadow-inner">
              <h3 className="text-[10px] font-bold uppercase text-slate-500 tracking-widest mb-3 flex items-center gap-2"><Activity size={12}/> Analysis</h3>
              <div className="space-y-3">
                <div>
                  <div className="text-[9px] text-slate-500 uppercase">Image Nature</div>
                  <div className="text-sm font-bold text-white tracking-wide" style={{color: nature.color}}>{nature.nature}</div>
                </div>
                <div className="flex gap-4">
                  <div>
                    <div className="text-[9px] text-slate-500 uppercase">Magnification</div>
                    <div className="text-lg font-mono font-bold text-blue-400">{isFinite(m) ? Math.abs(m).toFixed(2) + 'x' : '∞'}</div>
                    <div className="text-[10px] text-slate-400">{nature.size}</div>
                  </div>
                  <div>
                    <div className="text-[9px] text-slate-500 uppercase">Image Dist (v)</div>
                    <div className="text-lg font-mono font-bold" style={{color: nature.color}}>{isFinite(v) ? v.toFixed(1) + ' cm' : '∞'}</div>
                  </div>
                </div>
              </div>
            </div>

            <button onClick={logReading} disabled={!isFinite(v)} className="w-full py-3.5 rounded-xl text-sm font-bold text-white active:scale-95 transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.4)] disabled:opacity-50 disabled:active:scale-100" style={{ background: 'linear-gradient(135deg, #2563eb, #3b82f6)' }}>
              Log Data Point
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
