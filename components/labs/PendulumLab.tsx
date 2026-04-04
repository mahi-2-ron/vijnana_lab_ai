
/**
 * PendulumLab — Fully interactive Simple Pendulum simulation
 * Features:
 *  - Slider for string length (L) and amplitude
 *  - Pause/Play oscillation
 *  - Data logging: accumulates L vs T² points
 *  - Live L–T² graph with regression giving g
 *  - Step-by-step guide
 *  - Scientific panel with uncertainty propagation
 *  - Environmental factors (altitude changes local g)
 */
import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, ChevronRight, ChevronLeft, Trash2 } from 'lucide-react';
import InteractiveGraph from '../InteractiveGraph';
import {
  pendulumPeriod, pendulumExperiment, DEFAULT_ENV, EnvironmentState,
  localGravity, gaussianNoise, linearRegression, gFromSlope,
} from '../../services/simulationEngine';

const STEPS = [
  { title: 'Prepare Setup',   desc: 'Clamp the support stand. Tie a thread and attach the bob. Ensure it hangs freely.', icon: '🔧' },
  { title: 'Measure Length',  desc: 'Use a metre scale to measure L from the pivot to the centre of the bob. Record with ±0.1cm uncertainty.', icon: '📏' },
  { title: 'Displace & Release', desc: 'Displace the bob <10° (SHM condition). Release without pushing.', icon: '🎯' },
  { title: 'Time 20 Oscillations', desc: 'Start stopwatch as bob crosses mean position. Count 20 oscillations. T = time/20.', icon: '⏱️' },
  { title: 'Repeat for 6 Lengths', desc: 'Log reading, then change L. Use 40cm to 200cm range for a good data spread.', icon: '🔁' },
  { title: 'Plot L vs T²',    desc: 'Click "Graph" tab. Slope = 4π²/g. Calculate g and compare to 9.81 m/s².', icon: '📈' },
];

interface LoggedPoint { L: number; T: number; T2: number; }

const PendulumLab: React.FC<{ hex: string }> = ({ hex }) => {
  const [L, setL] = useState(1.0);              // metres
  const [amplitude, setAmplitude] = useState(10); // degrees
  const [env, setEnv] = useState<EnvironmentState>(DEFAULT_ENV);
  const [running, setRunning] = useState(false);
  const [angle, setAngle] = useState(0);         // current angle (radians)
  const [time, setTime]     = useState(0);
  const [loggedPoints, setLoggedPoints] = useState<LoggedPoint[]>([]);
  const [tab, setTab]       = useState<'sim'|'graph'|'table'|'guide'>('sim');
  const [step, setStep]     = useState(0);

  const g_local = localGravity(env);
  const T_theory = pendulumPeriod(L, g_local);
  const result = pendulumExperiment(L, env);

  // Animation loop
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setTime(t => {
        const nt = t + 0.05;
        const w = Math.sqrt(g_local / L);
        setAngle((amplitude * Math.PI / 180) * Math.cos(w * nt));
        return nt;
      });
    }, 50);
    return () => clearInterval(id);
  }, [running, L, g_local, amplitude]);

  const logReading = useCallback(() => {
    // Add realistic noise to T measurement
    const T_meas = gaussianNoise(T_theory, 0.01);
    setLoggedPoints(prev => [...prev, { L, T: parseFloat(T_meas.toFixed(4)), T2: parseFloat((T_meas**2).toFixed(4)) }]);
  }, [L, T_theory]);

  const reset = () => { setRunning(false); setAngle(0); setTime(0); setLoggedPoints([]); };

  // Build graph series from logged data
  const graphSeries = loggedPoints.length >= 1 ? [{
    points: loggedPoints.map(p => ({ x: p.L, y: p.T2 })),
    color: '#6366f1',
    label: 'L vs T²',
  }] : [];

  // Regression for g
  const reg = loggedPoints.length >= 2
    ? linearRegression(loggedPoints.map(p => ({ x: p.L, y: p.T2 })))
    : null;
  const g_from_graph = reg ? gFromSlope(reg.slope) : null;

  // SVG pendulum dimensions
  const bobX = 150 + Math.sin(angle) * (L * 120);
  const bobY = 20  + Math.cos(angle) * (L * 120);

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-900 overflow-hidden">

      {/* ── TAB BAR ── */}
      <div className="flex border-b border-slate-200 dark:border-white/10 bg-white dark:bg-slate-950 shrink-0">
        {([
          { key: 'sim',   label: '🔵 Pendulum' },
          { key: 'graph', label: '📈 L–T² Graph' },
          { key: 'table', label: '📋 Data Table' },
          { key: 'guide', label: '📖 Guide' },
        ] as const).map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className={`px-4 py-2.5 text-xs font-bold transition-colors border-b-2 ${tab === t.key
              ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
              : 'border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-white'}`}>
            {t.label}
          </button>
        ))}
        <div className="flex-1" />
        <span className="flex items-center pr-4 text-xs font-mono text-indigo-500">{loggedPoints.length} pts</span>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* ── MAIN CONTENT ── */}
        <div className="flex-1 flex flex-col overflow-y-auto p-4 gap-4">

          {/* Pendulum Simulation */}
          {tab === 'sim' && (
            <svg width="100%" viewBox="0 0 300 340" className="rounded-xl bg-slate-900 dark:bg-black block" style={{ maxHeight: 340 }}>
              {/* Grid lines */}
              {[-60,-40,-20,0,20,40,60].map(x => (
                <line key={x} x1={150+x*2} y1="0" x2={150+x*2} y2="340"
                  stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
              ))}
              {/* Protractor arc */}
              <path d={`M 100,20 A 50,50 0 0,1 200,20`} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
              <text x="150" y="70" textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize="9">10°</text>

              {/* Support */}
              <rect x="110" y="0" width="80" height="12" rx="3" fill="#374151" />
              <line x1="150" y1="12" x2={bobX} y2={bobY} stroke="#94a3b8" strokeWidth="1.5" />

              {/* Angle arc indicator */}
              <path d={`M 150,20 L ${150 + Math.sin(angle) * 30},${20 + Math.cos(angle) * 30}`}
                stroke="#fbbf24" strokeWidth="1" fill="none" opacity="0.6" />

              {/* Bob */}
              <circle cx={bobX} cy={bobY} r="14"
                fill={`hsl(${240 + angle * 30},70%,55%)`}
                stroke="white" strokeWidth="2" style={{ filter: 'drop-shadow(0 0 8px rgba(99,102,241,0.8))' }} />

              {/* T label */}
              <text x="150" y="320" textAnchor="middle" fill="#6366f1" fontSize="11" fontWeight="bold">
                T = {T_theory.toFixed(3)} s   |   L = {L.toFixed(2)} m
              </text>
              <text x="150" y="336" textAnchor="middle" fill="#475569" fontSize="9">
                g_local = {g_local.toFixed(4)} m/s²  |  Amplitude = {amplitude}°
              </text>
            </svg>
          )}

          {/* Graph Tab */}
          {tab === 'graph' && (
            <div>
              {graphSeries.length > 0
                ? <>
                    <InteractiveGraph series={graphSeries} xLabel="Length L" yLabel="T²" xUnit="m" yUnit="s²"
                      title="Simple Pendulum — L vs T² Graph" />
                    {g_from_graph && (
                      <div className="mt-3 p-3 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-500/30 rounded-xl text-sm">
                        <div className="font-bold text-indigo-700 dark:text-indigo-300 mb-1">g from graph slope</div>
                        <div className="font-mono text-indigo-600 dark:text-indigo-400">
                          g = 4π² / slope = 4π² / {reg!.slope.toFixed(4)} = <strong>{g_from_graph} m/s²</strong>
                        </div>
                        <div className="text-xs text-indigo-500 mt-1">
                          R² = {reg!.r_squared.toFixed(5)} &nbsp;|&nbsp;
                          Error: {Math.abs(g_from_graph - g_local).toFixed(4)} m/s²
                          ({(Math.abs(g_from_graph - g_local) / g_local * 100).toFixed(2)}%)
                        </div>
                      </div>
                    )}
                  </>
                : <div className="flex flex-col items-center justify-center h-48 text-slate-400 gap-3">
                    <span className="text-3xl">📈</span>
                    <p className="text-sm">Log at least 2 readings with different L values</p>
                  </div>
              }
            </div>
          )}

          {/* Table Tab */}
          {tab === 'table' && (
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100 dark:bg-slate-800">
                    {['#','L (m)','T (s)', 'T² (s²)', 'Del'].map(h => (
                      <th key={h} className="px-3 py-2 text-left text-slate-500 dark:text-gray-400 font-bold uppercase">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {loggedPoints.length === 0 &&
                    <tr><td colSpan={5} className="text-center py-4 text-slate-400 italic">Log readings to build the table</td></tr>}
                  {loggedPoints.map((p, i) => (
                    <tr key={i} className={`border-b border-slate-100 dark:border-white/5 ${i%2===0?'bg-white dark:bg-slate-900':'bg-slate-50 dark:bg-slate-950'}`}>
                      <td className="px-3 py-1.5 font-mono text-slate-500">{i+1}</td>
                      <td className="px-3 py-1.5 font-mono text-indigo-600 dark:text-indigo-400">{p.L.toFixed(2)}</td>
                      <td className="px-3 py-1.5 font-mono text-green-600 dark:text-green-400">{p.T.toFixed(4)}</td>
                      <td className="px-3 py-1.5 font-mono font-bold text-slate-800 dark:text-white">{p.T2.toFixed(4)}</td>
                      <td className="px-3 py-1.5">
                        <button onClick={() => setLoggedPoints(ps => ps.filter((_,j)=>j!==i))} className="text-red-400 hover:text-red-600">
                          <Trash2 size={12} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Guide Tab */}
          {tab === 'guide' && (
            <div className="space-y-3">
              {STEPS.map((s, i) => (
                <div key={i} onClick={() => setStep(i)}
                  className={`flex gap-3 p-3 rounded-xl border cursor-pointer transition-all ${step === i
                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                    : 'border-slate-200 dark:border-white/10 bg-white dark:bg-slate-950 hover:border-indigo-300'}`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shrink-0
                    ${i<step?'bg-green-500 text-white':i===step?'bg-indigo-500 text-white':'bg-slate-200 dark:bg-slate-700 text-slate-500'}`}>
                    {i<step?'✓':i+1}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-700 dark:text-white mb-0.5">{s.icon} {s.title}</div>
                    <div className="text-xs text-slate-500 dark:text-gray-400 leading-relaxed">{s.desc}</div>
                  </div>
                </div>
              ))}
              <div className="flex gap-2 mt-2">
                <button onClick={() => setStep(s => Math.max(0, s-1))} className="flex items-center gap-1 px-3 py-1.5 text-xs rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-white">
                  <ChevronLeft size={12} /> Prev
                </button>
                <button onClick={() => setStep(s => Math.min(STEPS.length-1, s+1))} className="flex items-center gap-1 px-3 py-1.5 text-xs rounded-lg bg-indigo-500 text-white">
                  Next <ChevronRight size={12} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ── RIGHT CONTROLS ── */}
        <div className="w-64 shrink-0 border-l border-slate-200 dark:border-white/10 bg-white dark:bg-slate-950 flex flex-col overflow-y-auto p-4 gap-4">

          {/* Live display */}
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: 'T theory', val: T_theory.toFixed(3), unit: 's', color: '#6366f1' },
              { label: 'T measured', val: result.T_measured.toFixed(3), unit: 's', color: '#22c55e' },
              { label: 'g calculated', val: result.g_calculated.toFixed(3), unit: 'm/s²', color: '#f59e0b' },
              { label: '% Error', val: result.percentage_error.toFixed(2), unit: '%', color: result.percentage_error < 2 ? '#22c55e' : '#ef4444' },
            ].map(m => (
              <div key={m.label} className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-lg p-2 text-center">
                <div className="text-[9px] text-slate-400 uppercase font-bold mb-1">{m.label}</div>
                <div className="font-mono font-bold text-xs" style={{ color: m.color }}>{m.val}</div>
                <div className="text-[8px] text-slate-400">{m.unit}</div>
              </div>
            ))}
          </div>

          {/* Sliders */}
          <div className="space-y-3">
            {[
              { label: 'String Length (L)', key: 'L', min: 0.3, max: 2.0, step: 0.1, val: L, unit: 'm', color: 'bg-indigo-500', onChange: (v:number) => setL(v) },
              { label: 'Amplitude', key: 'A', min: 2, max: 10, step: 1, val: amplitude, unit: '°', color: 'bg-yellow-500', onChange: (v:number) => setAmplitude(v) },
              { label: 'Altitude (env)', key: 'alt', min: 0, max: 5000, step: 100, val: env.altitude_m, unit: 'm', color: 'bg-teal-500', onChange: (v:number) => setEnv(e=>({...e, altitude_m: v})) },
            ].map(s => (
              <div key={s.key}>
                <div className="flex justify-between items-end mb-2">
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">{s.label}</span>
                  <div className="flex bg-black/40 px-2 py-0.5 rounded-md border border-white/10">
                    <span className="font-mono text-[10px] text-white font-bold">{s.val}</span>
                    <span className="text-[9px] text-slate-500 ml-1">{s.unit}</span>
                  </div>
                </div>
                <div className="relative h-2 bg-[#0a0f1a] rounded-full border border-slate-200 dark:border-white/5 shadow-inner">
                  <div className={`absolute left-0 top-0 bottom-0 rounded-full ${s.color}`} style={{ width: `${((s.val - s.min) / (s.max - s.min)) * 100}%` }} />
                  <input type="range" min={s.min} max={s.max} step={s.step} value={s.val} onChange={e => s.onChange(parseFloat(e.target.value))} className="absolute inset-0 w-full opacity-0 cursor-ew-resize z-20" />
                  <motion.div className="absolute w-5 h-5 bg-white rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.5)] pointer-events-none z-10" style={{ top: -6, left: `calc(${((s.val - s.min) / (s.max - s.min)) * 100}% - 10px)` }} />
                </div>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-2">
            <button onClick={logReading}
              className="w-full py-2.5 rounded-xl text-xs font-bold text-white active:scale-95 transition-all"
              style={{ backgroundColor: hex, boxShadow: `0 6px 16px -6px ${hex}80` }}>
              + Log Reading (L={L}m)
            </button>
            <div className="flex gap-2">
              <button onClick={() => setRunning(r => !r)}
                className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 ${running ? 'bg-red-500 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-white'}`}>
                {running ? <><Pause size={12} /> Pause</> : <><Play size={12} /> Oscillate</>}
              </button>
              <button onClick={reset} className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-red-500 transition-colors">
                <RotateCcw size={12} />
              </button>
            </div>
          </div>

          {/* Formulae */}
          <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl p-3 space-y-1">
            <div className="text-[9px] font-bold text-slate-400 uppercase mb-2">Key Formulae</div>
            {['T = 2π√(L/g)', 'g = 4π²L/T²', 'Slope (L-T²) = g/4π²', 'δg/g = √[(δL/L)²+(2δT/T)²]'].map(f => (
              <div key={f} className="font-mono text-[9px] text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 px-2 py-1 rounded">{f}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendulumLab;
