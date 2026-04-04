
/**
 * TitrationLab3D — Visually stunning 3D acid-base titration simulation.
 *
 * Visuals:
 *  - CSS 3D perspective burette with translucent glass effect
 *  - Animated NaOH drops with particle trails
 *  - Flask color morphs through a real pH gradient
 *  - pH meter with color-coded LED display
 *  - Emission + bubble particles as reaction proceeds
 *  - Particle burst at endpoint neutralization
 *  - Real-time pH curve graph
 *  - Motion-blurred drop trail
 */
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, Droplets } from 'lucide-react';
import ParticleEngine, { Particle, createDrop, createBubble, createSpark, createMolecule } from './ParticleEngine';
import InteractiveGraph from '../InteractiveGraph';
import { titrationResult } from '../../services/simulationEngine';

// ─── pH COLOR MAP ─────────────────────────────────────────────────────────────
// Returns a CSS hsl color based on pH (0-14), mimicking universal indicator
function pHToColor(pH: number): string {
  if (pH < 3)  return `hsl(0,90%,45%)`;       // deep red
  if (pH < 5)  return `hsl(18,90%,50%)`;      // orange-red
  if (pH < 6)  return `hsl(36,90%,55%)`;      // orange
  if (pH < 7)  return `hsl(54,90%,55%)`;      // yellow
  if (pH < 7.5) return `hsl(90,80%,45%)`;     // yellow-green
  if (pH < 8)  return `hsl(120,70%,40%)`;     // green
  if (pH < 9)  return `hsl(160,75%,40%)`;     // blue-green
  if (pH < 11) return `hsl(220,75%,50%)`;     // blue
  if (pH < 12) return `hsl(260,70%,50%)`;     // indigo
  return `hsl(290,70%,45%)`;                   // violet
}

// ─── HENDERSON–HASSELBALCH APPROXIMATION ─────────────────────────────────────
// Strong acid (HCl, 0.1M, 20mL) + Strong base (NaOH, 0.1M)
function computepH(vol_NaOH: number): number {
  const V_acid = 20;  // mL
  const M_acid = 0.1; // mol/L
  const M_base = 0.1; // mol/L
  const moles_acid = M_acid * V_acid / 1000;
  const moles_base = M_base * vol_NaOH / 1000;
  const excess = moles_acid - moles_base;
  if (Math.abs(excess) < 1e-8) return 7.0; // equivalence pt
  if (excess > 0) {
    // Still acidic: [H+] = excess / total volume
    const V_total = (V_acid + vol_NaOH) / 1000;
    const H = excess / V_total;
    return parseFloat((-Math.log10(H)).toFixed(2));
  } else {
    // Excess base: [OH-] = |excess| / total volume
    const V_total = (V_acid + vol_NaOH) / 1000;
    const OH = Math.abs(excess) / V_total;
    const pOH = -Math.log10(OH);
    return parseFloat((14 - pOH).toFixed(2));
  }
}

// ─── 3D BEAKER COMPONENT ─────────────────────────────────────────────────────
const Beaker3D: React.FC<{ pH: number; fluidLevel: number; bubbling: boolean }> = ({ pH, fluidLevel, bubbling }) => {
  const color = pHToColor(pH);
  const glowColor = color.replace('hsl', 'hsla').replace(')', ',0.4)');

  return (
    <div className="relative" style={{ width: 160, height: 200, perspective: 600 }}>
      {/* 3D glass body */}
      <div style={{
        position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
        width: 120, height: 170,
        background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(148,163,184,0.08) 40%, rgba(255,255,255,0.05) 100%)',
        border: '2px solid rgba(255,255,255,0.25)',
        borderBottom: '3px solid rgba(255,255,255,0.3)',
        borderRadius: '4px 4px 24px 24px',
        backdropFilter: 'blur(4px)',
        boxShadow: `inset -8px 0 16px rgba(0,0,0,0.15), inset 8px 0 12px rgba(255,255,255,0.08), 0 0 30px ${glowColor}`,
        overflow: 'hidden',
      }}>
        {/* Fluid */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: `${fluidLevel}%`,
          background: `linear-gradient(180deg, ${color}55 0%, ${color}cc 40%, ${color}ee 100%)`,
          transition: 'height 0.3s ease, background 0.8s ease',
          borderRadius: '0 0 22px 22px',
        }}>
          {/* Surface shimmer */}
          <div style={{
            position: 'absolute', top: 0, left: '10%', right: '10%', height: 4,
            background: 'rgba(255,255,255,0.4)', borderRadius: 2,
            animation: 'shimmer 2s ease-in-out infinite',
          }} />
          {/* Bubbles */}
          {bubbling && [0.2, 0.5, 0.8].map((x, i) => (
            <div key={i} style={{
              position: 'absolute', bottom: `${i * 20 + 10}%`, left: `${x * 80 + 5}%`,
              width: 6, height: 6, borderRadius: '50%',
              border: `1.5px solid ${color}`,
              background: 'rgba(255,255,255,0.1)',
              animation: `rise-${i} ${0.8 + i * 0.3}s ease-out infinite`,
              animationDelay: `${i * 0.25}s`,
            }} />
          ))}
        </div>
        {/* Glass highlight (left) */}
        <div style={{
          position: 'absolute', top: '10%', left: '8%', width: '10%', height: '70%',
          background: 'linear-gradient(180deg, rgba(255,255,255,0.35), transparent)',
          borderRadius: 4,
        }} />
        {/* Measurement lines */}
        {[25, 50, 75].map(pct => (
          <div key={pct} style={{
            position: 'absolute', right: 8, bottom: `${pct}%`,
            width: 14, height: 1, background: 'rgba(255,255,255,0.3)',
          }}>
            <span style={{
              position: 'absolute', right: 16, top: -6,
              fontSize: 7, color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace'
            }}>{(pct / 100 * 100).toFixed(0)}</span>
          </div>
        ))}
      </div>
      {/* Base */}
      <div style={{
        position: 'absolute', bottom: -6, left: '50%', transform: 'translateX(-50%)',
        width: 130, height: 10, borderRadius: 6,
        background: 'rgba(148,163,184,0.3)', border: '1px solid rgba(255,255,255,0.15)',
      }} />
    </div>
  );
};

// ─── 3D BURETTE COMPONENT ─────────────────────────────────────────────────────
const Burette3D: React.FC<{ fluidLevel: number; dripping: boolean; dropY: number }> = ({ fluidLevel, dripping, dropY }) => (
  <div className="relative flex flex-col items-center" style={{ height: 320, width: 60 }}>
    {/* Clamp */}
    <div style={{
      width: 50, height: 14, background: 'linear-gradient(90deg,#374151,#6b7280)',
      borderRadius: 4, boxShadow: '0 2px 8px rgba(0,0,0,0.5)',
      border: '1px solid rgba(255,255,255,0.1)',
    }} />
    {/* Glass tube */}
    <div style={{
      width: 22, height: 220,
      background: 'linear-gradient(90deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.18) 25%, rgba(255,255,255,0.04) 100%)',
      border: '1.5px solid rgba(255,255,255,0.22)',
      borderTop: 'none',
      position: 'relative', overflow: 'hidden',
      boxShadow: 'inset -4px 0 8px rgba(0,0,0,0.2)',
    }}>
      {/* Fluid */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        height: `${100 - fluidLevel}%`,
        background: 'linear-gradient(180deg, #22d3ee88, #06b6d4dd)',
        transition: 'height 0.3s ease',
      }} />
      {/* Scale marks */}
      {[0, 10, 20, 30, 40, 50].map(i => (
        <div key={i} style={{
          position: 'absolute', top: `${i * 4}%`, right: 0,
          width: 8, height: 1, background: 'rgba(255,255,255,0.25)',
        }}>
          <span style={{ position: 'absolute', right: 10, top: -5, fontSize: 6, color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace' }}>{i}</span>
        </div>
      ))}
      {/* Highlight */}
      <div style={{ position: 'absolute', top: 0, left: '15%', width: '12%', height: '100%', background: 'rgba(255,255,255,0.12)', borderRadius: 2 }} />
    </div>
    {/* Stopcock */}
    <div style={{
      width: 40, height: 14, background: 'linear-gradient(90deg,#1e3a5f,#3b82f6,#1e3a5f)',
      borderRadius: 3, border: '1.5px solid rgba(59,130,246,0.5)',
      boxShadow: '0 0 10px rgba(59,130,246,0.3)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{ width: 10, height: 10, borderRadius: '50%', background: dripping ? '#06b6d4' : '#374151', transition: 'background 0.3s' }} />
    </div>
    {/* Nozzle tip */}
    <div style={{ width: 8, height: 30, background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '0 0 4px 4px' }} />
    {/* Animated drop */}
    {dripping && (
      <div style={{
        position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
        width: 8, height: 10,
        background: '#22d3ee',
        borderRadius: '50% 50% 60% 60%',
        boxShadow: '0 0 8px #22d3ee',
        top: `${dropY}px`,
        transition: 'top 0.05s linear',
        opacity: 0.9,
      }} />
    )}
  </div>
);

// ─── pH METER ─────────────────────────────────────────────────────────────────
const PHMeter: React.FC<{ pH: number }> = ({ pH }) => {
  const color = pHToColor(pH);
  const label = pH < 6.5 ? 'ACIDIC' : pH > 7.5 ? 'BASIC' : 'NEUTRAL';
  return (
    <div style={{
      background: '#0f172a', border: '2px solid rgba(255,255,255,0.1)',
      borderRadius: 12, padding: '12px 16px', minWidth: 120,
      boxShadow: `0 0 20px ${color.replace('hsl', 'hsla').replace(')', ',0.3)')}`,
    }}>
      <div style={{ fontSize: 9, color: '#64748b', fontWeight: 'bold', marginBottom: 4, letterSpacing: 2 }}>pH METER</div>
      <div style={{
        fontSize: 36, fontFamily: 'monospace', fontWeight: 'bold',
        color, textShadow: `0 0 12px ${color}`,
        transition: 'color 0.5s',
      }}>{pH.toFixed(2)}</div>
      <div style={{
        fontSize: 10, fontWeight: 'bold', color,
        background: color.replace('hsl', 'hsla').replace(')', ',0.15)'),
        borderRadius: 4, padding: '2px 6px', marginTop: 4, display: 'inline-block',
        border: `1px solid ${color}40`,
        transition: 'all 0.5s',
      }}>{label}</div>
      {/* Color bar */}
      <div style={{
        marginTop: 8, height: 6, borderRadius: 3,
        background: 'linear-gradient(90deg, #dc2626, #f97316, #eab308, #22c55e, #3b82f6, #8b5cf6)',
      }}>
        <div style={{
          width: 8, height: 8, borderRadius: '50%', background: 'white',
          marginTop: -1, border: '2px solid #0f172a',
          marginLeft: `${(pH / 14) * 100}%`,
          transform: 'translateX(-50%)',
          transition: 'margin-left 0.4s ease',
          boxShadow: `0 0 6px ${color}`,
        }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 2, fontSize: 7, color: '#475569' }}>
        <span>0</span><span>7</span><span>14</span>
      </div>
    </div>
  );
};

// ─── MAIN TITRATION LAB ───────────────────────────────────────────────────────
const TitrationLab3D: React.FC<{ hex: string }> = ({ hex }) => {
  const [volAdded, setVolAdded] = useState(0);
  const [running, setRunning] = useState(false);
  const [dropY, setDropY] = useState(0);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [phCurve, setPhCurve] = useState<{ x: number; y: number }[]>([]);
  const [tab, setTab] = useState<'lab'|'graph'|'theory'>('lab');
  const [endpointReached, setEndpointReached] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const pH = computepH(volAdded);
  const fluidLevel = Math.max(10, 50 + volAdded * 0.8);
  const buretteLevel = Math.max(0, 100 - volAdded * 2);
  const res = titrationResult(0.1, 20, 0.1);

  // Detect endpoint
  useEffect(() => {
    if (pH >= 8.0 && !endpointReached && volAdded > 0) {
      setEndpointReached(true);
      // Burst of sparks at endpoint
      setParticles(prev => [...prev,
        ...Array.from({ length: 30 }, () => createSpark(200, 220, '#a855f7')),
        ...Array.from({ length: 20 }, () => createMolecule(200, 220, '#22d3ee')),
      ]);
    }
  }, [pH, endpointReached, volAdded]);

  // Main simulation timer
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setVolAdded(v => {
        if (v >= 30) { setRunning(false); return v; }
        const next = parseFloat((v + 0.15).toFixed(2));
        // Add to pH curve
        setPhCurve(c => [...c, { x: next, y: computepH(next) }]);
        return next;
      });
      // Drop animation
      setDropY(y => (y > 260 ? 0 : y + 18));
      // Particles
      setParticles(prev => {
        const newPs = [...prev];
        // Drip from burette
        if (Math.random() > 0.5) {
          newPs.push(createDrop(200, 260, '#22d3ee'));
        }
        // Bubbles in flask
        if (Math.random() > 0.6) {
          newPs.push(createBubble(180 + Math.random() * 40, 360, pHToColor(computepH(volAdded))));
        }
        // Molecules swirling if near endpoint
        if (volAdded > 18 && Math.random() > 0.7) {
          newPs.push(createMolecule(160 + Math.random() * 80, 320 + Math.random() * 60, pHToColor(computepH(volAdded))));
        }
        return newPs.slice(-150); // cap for performance
      });
    }, 60);
    return () => clearInterval(id);
  }, [running, volAdded]);

  const reset = () => {
    setVolAdded(0); setRunning(false); setParticles([]);
    setPhCurve([]); setEndpointReached(false); setDropY(0);
  };

  const graphSeries = phCurve.length > 1 ? [{
    points: phCurve,
    color: '#a855f7',
    label: 'pH vs Volume NaOH',
    dashed: false,
  }] : [];

  return (
    <div className="flex flex-col h-full bg-slate-950 overflow-hidden">
      <style>{`
        @keyframes rise-0 { 0%{transform:translateY(0);opacity:0.7} 100%{transform:translateY(-60px);opacity:0} }
        @keyframes rise-1 { 0%{transform:translateY(0);opacity:0.6} 100%{transform:translateY(-80px);opacity:0} }
        @keyframes rise-2 { 0%{transform:translateY(0);opacity:0.5} 100%{transform:translateY(-50px);opacity:0} }
        @keyframes shimmer { 0%,100%{opacity:0.4} 50%{opacity:0.8} }
        @keyframes glow-pulse { 0%,100%{box-shadow:0 0 20px rgba(168,85,247,0.2)} 50%{box-shadow:0 0 40px rgba(168,85,247,0.6)} }
      `}</style>

      {/* Tab bar */}
      <div className="flex border-b border-white/10 bg-slate-900 shrink-0">
        {([
          { key: 'lab',    label: '🔬 3D Lab' },
          { key: 'graph',  label: '📈 pH Curve' },
          { key: 'theory', label: '📖 Theory' },
        ] as const).map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className={`px-4 py-2.5 text-xs font-bold transition-colors border-b-2 ${tab === t.key
              ? 'border-purple-500 text-purple-400' : 'border-transparent text-slate-500 hover:text-white'}`}>
            {t.label}
          </button>
        ))}
        {endpointReached && (
          <div className="ml-auto flex items-center pr-4">
            <span className="text-xs font-bold text-purple-400 animate-pulse">✨ ENDPOINT REACHED!</span>
          </div>
        )}
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* ── LAB STAGE ── */}
        {tab === 'lab' && (
          <div ref={containerRef} className="flex-1 relative flex items-center justify-center overflow-hidden"
            style={{ background: 'radial-gradient(ellipse at 50% 30%, #1e1b4b 0%, #0f0a1e 60%, #000 100%)' }}>

            {/* Particle canvas */}
            <ParticleEngine particles={particles} setParticles={setParticles} width={600} height={500} />

            {/* Retort stand */}
            <div style={{ position: 'absolute', left: '50%', top: 20, transform: 'translateX(-50%)', display:'flex', flexDirection:'column', alignItems:'center' }}>
              {/* Stand rod */}
              <div style={{ width: 8, height: 300, background: 'linear-gradient(180deg,#374151,#1f2937)', borderRadius: 4, boxShadow: '2px 0 6px rgba(0,0,0,0.5)' }} />
              {/* Ring clamp */}
              <div style={{ position: 'absolute', top: 10, left: 20, width: 70, height: 10, background: '#374151', borderRadius: 3 }} />
            </div>

            {/* Burette + drip area */}
            <div style={{ position: 'absolute', top: 30, left: '50%', transform: 'translateX(-20px)', zIndex: 10 }}>
              <Burette3D fluidLevel={buretteLevel} dripping={running} dropY={dropY} />
            </div>

            {/* Flask + beaker */}
            <div style={{ position: 'absolute', bottom: 60, left: '50%', transform: 'translateX(-80px)', zIndex: 5 }}>
              <Beaker3D pH={pH} fluidLevel={fluidLevel} bubbling={running && volAdded > 0} />
            </div>

            {/* Stirrer bar (magnetic) */}
            {running && (
              <div style={{
                position: 'absolute', bottom: 72, left: '50%', transform: 'translateX(-20px)',
                width: 40, height: 8, borderRadius: 4,
                background: 'linear-gradient(90deg,#dc2626,white,#dc2626)',
                animation: 'spin 0.5s linear infinite',
              }} />
            )}

            {/* pH Meter */}
            <div style={{ position: 'absolute', top: 40, right: 30 }}>
              <PHMeter pH={pH} />
            </div>

            {/* Endpoint glow overlay */}
            {endpointReached && (
              <div style={{
                position: 'absolute', inset: 0, pointerEvents: 'none',
                background: 'radial-gradient(ellipse at 50% 60%, rgba(168,85,247,0.12) 0%, transparent 70%)',
                animation: 'glow-pulse 2s ease-in-out infinite',
              }} />
            )}

            {/* Lab bench surface */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0, height: 60,
              background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
              borderTop: '2px solid rgba(255,255,255,0.05)',
            }} />
          </div>
        )}

        {/* ── pH CURVE ── */}
        {tab === 'graph' && (
          <div className="flex-1 flex flex-col p-4 gap-4 overflow-y-auto">
            {graphSeries.length > 1
              ? <InteractiveGraph series={graphSeries} xLabel="Volume NaOH" yLabel="pH" xUnit="mL" yUnit=""
                  title="Titration Curve — pH vs Volume NaOH" />
              : <div className="flex-1 flex flex-col items-center justify-center text-slate-500 gap-3">
                  <span className="text-4xl">📈</span>
                  <p className="text-sm">Start the titration to build the pH curve</p>
                </div>
            }
            {phCurve.length > 1 && (
              <div className="p-4 bg-slate-900 border border-white/10 rounded-xl text-sm text-slate-300 space-y-2">
                <div className="font-bold text-purple-400 mb-1">Key points on curve:</div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {[
                    ['Initial pH (0 mL)', computepH(0).toFixed(2)],
                    ['At 10 mL NaOH', computepH(10).toFixed(2)],
                    ['Equivalence pt (~20 mL)', computepH(res.V_base_measured).toFixed(2)],
                    ['At 25 mL NaOH', computepH(25).toFixed(2)],
                  ].map(([k,v]) => (
                    <div key={k} className="bg-slate-800 px-3 py-2 rounded-lg">
                      <div className="text-slate-500 text-[10px]">{k}</div>
                      <div className="font-mono text-purple-300 font-bold">{v}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── THEORY ── */}
        {tab === 'theory' && (
          <div className="flex-1 p-6 overflow-y-auto space-y-4 text-slate-300 text-sm">
            <h2 className="text-lg font-bold text-purple-300">Acid-Base Titration Theory</h2>
            {[
              { title: 'Neutralization Reaction', body: 'HCl(aq) + NaOH(aq) → NaCl(aq) + H₂O(l) — At the equivalence point, moles of acid = moles of base.' },
              { title: 'Quantitative Formula', body: 'M₁V₁ = M₂V₂  (for 1:1 stoichiometry). Means molarity × volume is conserved across equivalence.' },
              { title: 'pH Before Equivalence', body: '[H⁺] = excess moles of HCl / total volume (L). pH = −log[H⁺]. Solution is acidic (pH < 7).' },
              { title: 'pH At Equivalence Point', body: 'For strong acid + strong base: pH = 7.0 at 25°C. Salt NaCl is neutral. Solution changes from acidic → basic abruptly.' },
              { title: 'pH After Equivalence', body: '[OH⁻] = excess NaOH / total volume. pOH = −log[OH⁻]. pH = 14 − pOH. Solution is basic.' },
              { title: 'Indicator: Phenolphthalein', body: 'Colorless below pH 8.3, pink/magenta above pH 8.3. Endpoint = first permanent pink color. This slightly overshoots equivalence point.' },
              { title: 'Enthalpy of Neutralisation', body: 'ΔH = −57.1 kJ/mol for strong acid-strong base. Exothermic. Solution warms slightly as neutralization proceeds.' },
            ].map(s => (
              <div key={s.title} className="bg-slate-900 border border-white/10 rounded-xl p-4">
                <div className="font-bold text-purple-300 mb-1">{s.title}</div>
                <div className="text-slate-400 text-xs leading-relaxed">{s.body}</div>
              </div>
            ))}
          </div>
        )}

        {/* ── CONTROLS ── */}
        <div className="w-64 shrink-0 border-l border-white/10 bg-slate-900 flex flex-col p-4 gap-4 overflow-y-auto">

          {/* Meters */}
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: 'Vol NaOH', val: volAdded.toFixed(2), unit: 'mL', color: '#22d3ee' },
              { label: 'pH', val: pH.toFixed(2), unit: '', color: pHToColor(pH) },
              { label: 'Endpoint', val: `${res.V_base_theoretical.toFixed(1)}`, unit: 'mL', color: '#a855f7' },
              { label: 'M(HCl) calc', val: res.M_acid_back_calculated.toFixed(4), unit: 'M', color: '#22c55e' },
            ].map(m => (
              <div key={m.label} className="bg-slate-950 border border-white/10 rounded-lg p-2 text-center">
                <div className="text-[9px] text-slate-500 uppercase font-bold mb-1">{m.label}</div>
                <div className="font-mono font-bold text-xs" style={{ color: m.color }}>{m.val}</div>
                {m.unit && <div className="text-[8px] text-slate-500">{m.unit}</div>}
              </div>
            ))}
          </div>

          {/* Manual volume slider */}
          <div>
            <div className="flex justify-between items-end mb-2">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">NaOH Volume</span>
              <div className="flex bg-black/40 px-2 py-0.5 rounded-md border border-white/10">
                <span className="font-mono text-[10px] text-white font-bold">{volAdded.toFixed(2)}</span>
                <span className="text-[9px] text-cyan-400 ml-1">mL</span>
              </div>
            </div>
            
            <div className="relative h-2 bg-[#0a0f1a] rounded-full border border-white/5 shadow-inner mb-2">
              <div className="absolute left-0 top-0 bottom-0 rounded-full bg-purple-500" style={{ width: `${((volAdded - 0) / (30 - 0)) * 100}%` }} />
              <input type="range" min="0" max="30" step="0.1" value={volAdded}
                onChange={e => {
                  const v = parseFloat(e.target.value);
                  setVolAdded(v);
                  setPhCurve(c => {
                    const exists = c.find(p => Math.abs(p.x - v) < 0.15);
                    if (exists) return c;
                    return [...c, { x: v, y: computepH(v) }].sort((a,b)=>a.x-b.x);
                  });
                }}
                className="absolute inset-0 w-full opacity-0 cursor-ew-resize z-20" />
              <motion.div className="absolute w-5 h-5 bg-white rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.5)] pointer-events-none z-10" style={{ top: -6, left: `calc(${((volAdded - 0) / (30 - 0)) * 100}% - 10px)` }} />
            </div>
            
            <div className="flex justify-between text-[9px] text-slate-500 font-bold px-1">
              <span>0mL</span><span>EP≈{res.V_base_theoretical.toFixed(0)}mL</span><span>30mL</span>
            </div>
          </div>

          {/* Color indicator strip */}
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">pH Indicator Strip</div>
            <div className="w-full h-8 rounded-lg border border-white/10 transition-all duration-700"
              style={{ background: pHToColor(pH), boxShadow: `0 0 12px ${pHToColor(pH)}60` }} />
            <div className="flex justify-between text-[8px] text-slate-500 mt-0.5">
              <span>Acidic</span><span>Neutral</span><span>Basic</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-2">
            <button onClick={() => setRunning(r => !r)}
              className={`w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${running ? 'bg-red-500 text-white' : 'bg-purple-600 text-white'}`}
              style={{ boxShadow: running ? undefined : '0 6px 20px -6px rgba(168,85,247,0.7)' }}>
              {running ? <><Pause size={13}/> Stop Drip</> : <><Droplets size={13}/> Start Drip</>}
            </button>
            <button onClick={reset} className="w-full py-2 rounded-xl text-xs bg-slate-800 text-slate-300 flex items-center justify-center gap-1.5 hover:bg-red-900/30 hover:text-red-400 transition-colors">
              <RotateCcw size={12}/> Reset
            </button>
          </div>

          {/* Formula card */}
          <div className="bg-slate-950 border border-white/10 rounded-xl p-3 space-y-1.5">
            <div className="text-[9px] font-bold text-slate-500 uppercase">Formulae</div>
            {['HCl + NaOH → NaCl + H₂O', 'M₁V₁ = M₂V₂', 'pH = -log[H⁺]', 'pOH = -log[OH⁻]', 'pH + pOH = 14', 'ΔH = -57.1 kJ/mol'].map(f => (
              <div key={f} className="font-mono text-[9px] text-purple-400 bg-purple-900/20 px-2 py-1 rounded">{f}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TitrationLab3D;
