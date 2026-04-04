import React, { useState, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Box, Cylinder, Sphere, ContactShadows, Environment, Text } from '@react-three/drei';
import * as THREE from 'three';
import ParticleEngine, { Particle, createSpark } from './ParticleEngine';
import { vernierReading, sphereVolume, analyzeReadings } from '../../services/simulationEngine';

const LC = 0.01; // cm = 0.1mm
const MAIN_SCALE_DIVS = 20; 
const VERNIER_DIVS = 10;

// ─── 2D HUD SCALES FOR EXACT READING ──────────────────────────────────────────
const MainScale2D: React.FC<{ offset: number }> = ({ offset }) => {
  const total = MAIN_SCALE_DIVS + 5;
  return (
    <div className="relative h-12 overflow-hidden" style={{ width: '100%' }}>
      <div className="absolute top-0 h-full flex items-end"
        style={{ left: `-${offset * 36}px`, transition: 'left 0.2s ease' }}>
        {Array.from({ length: total * 10 }, (_, i) => {
          const isMm = i % 10 === 0;
          const val = i / 10;
          return (
            <div key={i} className="flex-shrink-0 flex flex-col items-center" style={{ width: 36 / 10 }}>
              <div style={{ width: 1, height: isMm ? 24 : 12, background: isMm ? '#e2e8f0' : '#475569', marginBottom: 2 }} />
              {(i % 10 === 0) && (
                <span style={{ fontSize: 9, color: '#94a3b8', fontFamily: 'monospace', marginTop: 2 }}>{val.toFixed(0)}</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const VernierScale2D: React.FC<{ coinciding: number }> = ({ coinciding }) => {
  const vernierDivWidthPx = 36 * 0.9 / 10;
  return (
    <div className="relative h-10 bg-violet-900/20 border border-violet-500/30 rounded overflow-hidden" style={{ width: 180 }}>
      <div className="absolute top-0 flex h-full items-end">
        {Array.from({ length: VERNIER_DIVS + 1 }, (_, i) => (
          <div key={i} className="flex-shrink-0 relative flex flex-col items-center" style={{ width: vernierDivWidthPx }}>
            <div style={{ width: i === coinciding ? 2 : 1, height: i === coinciding ? 28 : 14, background: i === coinciding ? '#a855f7' : '#64748b', boxShadow: i === coinciding ? '0 0 6px #a855f7' : 'none', transition: 'all 0.3s' }} />
            <span style={{ fontSize: 8, color: i === coinciding ? '#a855f7' : '#475569', fontFamily: 'monospace' }}>{i}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── 3D CALIPER SCENE ─────────────────────────────────────────────────────────

const Caliper3D: React.FC<{ openingMm: number; zeroError: number }> = ({ openingMm, zeroError }) => {
  const slidingJawRef = useRef<THREE.Group>(null);
  
  // Real world unit scaling: let's map 10mm to 1 unit in 3D space
  const correctedMm = Math.max(0, openingMm - zeroError);
  const targetX = correctedMm / 10; 

  useFrame((state, delta) => {
    if (slidingJawRef.current) {
      slidingJawRef.current.position.x += (targetX - slidingJawRef.current.position.x) * 15 * delta;
    }
  });

  const steelMat = <meshStandardMaterial color="#cbd5e1" metalness={0.8} roughness={0.3} />;
  const darkSteelMat = <meshStandardMaterial color="#64748b" metalness={0.7} roughness={0.4} />;
  const blueSteelMat = <meshStandardMaterial color="#475569" metalness={0.9} roughness={0.1} />;

  return (
    <group position={[-1, 0, 0]}>
      {/* ─── FIXED PART (Main Scale Beam, Upper & Lower Fixed Jaws) ─── */}
      <group>
        {/* Main Beam */}
        <Box args={[12, 0.4, 0.1]} position={[4, 0, 0]} castShadow receiveShadow>
          {steelMat}
        </Box>
        {/* Lower Fixed Jaw (Outside measurements) */}
        <Box args={[0.6, 2.5, 0.1]} position={[-1.7, -1.25, 0]} castShadow>
          {steelMat}
        </Box>
        {/* Jaw Bevel Inside */}
        <Box args={[0.2, 2.5, 0.12]} position={[-1.4, -1.25, 0]} castShadow>
          {darkSteelMat}
        </Box>
        {/* Upper Fixed Jaw (Inside measurements) */}
        <Box args={[0.4, 1.2, 0.1]} position={[-1.8, 0.8, 0]} castShadow>
          {steelMat}
        </Box>
        {/* Ruler Text Markers purely for visual flair */}
        {Array.from({ length: 10 }).map((_, i) => (
          <Text key={i} position={[i - 1.2, 0.1, 0.06]} fontSize={0.15} color="#1e293b" anchorX="center" anchorY="bottom">
            {i}
          </Text>
        ))}
      </group>

      {/* ─── SLIDING PART ─── */}
      <group ref={slidingJawRef} position={[0, 0, 0.05]} castShadow>
        {/* Slider Body enveloping the main scale */}
        <Box args={[1.5, 0.5, 0.15]} position={[-0.8, 0, 0]} castShadow>
          {blueSteelMat}
        </Box>
        {/* Lower Sliding Jaw */}
        <Box args={[0.6, 2.5, 0.15]} position={[-1.3, -1.25, 0]} castShadow>
          {blueSteelMat}
        </Box>
        {/* Jaw Bevel Inside */}
        <Box args={[0.2, 2.5, 0.17]} position={[-1.6, -1.25, 0]} castShadow>
          <meshStandardMaterial color="#3b82f6" metalness={0.9} roughness={0.1} />
        </Box>
        {/* Upper Sliding Jaw */}
        <Box args={[0.4, 1.2, 0.15]} position={[-1.2, 0.8, 0]} castShadow>
          {blueSteelMat}
        </Box>
        {/* Thumb Grip Screw */}
        <Cylinder args={[0.15, 0.15, 0.1]} position={[-0.5, -0.25, 0.1]} rotation={[Math.PI/2, 0, 0]} castShadow>
          <meshStandardMaterial color="#fbbf24" metalness={0.9} roughness={0.2} />
        </Cylinder>
        {/* Vernier scale indicator window */}
        <Box args={[0.6, 0.15, 0.16]} position={[-0.8, -0.15, 0]} castShadow>
          <meshStandardMaterial color="#e2e8f0" />
        </Box>
      </group>

      {/* ─── OBJECT BEING MEASURED (Sphere) ─── */}
      <group position={[-1.5 + (targetX / 2), -1.5, 0]}>
        {targetX > 0.05 && (
          <Sphere args={[targetX / 2, 32, 32]} castShadow receiveShadow>
            <meshPhysicalMaterial color="#3b82f6" transmission={0.2} opacity={0.9} transparent roughness={0.2} metalness={0.1} />
          </Sphere>
        )}
      </group>
    </group>
  );
};

// ─── READING DISPLAY ──────────────────────────────────────────────────────────
const ReadingDisplay: React.FC<{ msr: number; vsd: number; zeroError: number; lc: number }> = ({ msr, vsd, zeroError, lc }) => {
  const raw = msr + vsd * lc;
  const corrected = raw - zeroError;
  const isNegativeZE = zeroError < 0;

  return (
    <div className="bg-[#0b101e] border-2 border-white/5 rounded-2xl p-4 font-mono shadow-inner">
      <div className="text-[10px] text-slate-500 mb-3 tracking-widest font-bold uppercase">Digital Readout (Simulated)</div>
      <div className="space-y-2">
        {[
          { label: 'Main Scale (MSR)', val: msr.toFixed(1), unit: 'mm', color: '#60a5fa' },
          { label: `Vernier (VSD) (${vsd}×${lc})`, val: (vsd * lc).toFixed(2), unit: 'mm', color: '#a855f7' },
          { label: 'Raw Reading', val: raw.toFixed(2), unit: 'mm', color: '#f59e0b' },
          { label: 'Zero Error', val: zeroError.toFixed(2), unit: 'mm', color: zeroError !== 0 ? '#ef4444' : '#475569' },
        ].map(r => (
          <div key={r.label} className="flex justify-between items-baseline text-xs">
            <span className="text-slate-400">{r.label}</span>
            <span><span style={{ color: r.color, fontWeight: 'bold' }}>{r.val}</span> <span className="text-[10px] text-slate-600">{r.unit}</span></span>
          </div>
        ))}
        <div className="pt-2 mt-2 border-t border-white/10 flex justify-between items-center bg-green-500/10 -mx-2 px-2 py-2 rounded-lg">
          <span className="text-slate-300 font-bold uppercase text-[10px]">Corrected Result</span>
          <span className="text-xl font-bold text-green-400 shadow-green-500 drop-shadow-md">{corrected.toFixed(2)} <span className="text-xs text-green-700">mm</span></span>
        </div>
      </div>
    </div>
  );
};

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
const VernierCalipersLab3D: React.FC<{ hex: string; onLog?: (data: any) => void }> = ({ hex, onLog }) => {
  const [diameter, setDiameter] = useState(25.0); // mm
  const [zeroError, setZeroError] = useState(0.0);   // mm
  const [readings, setReadings] = useState<number[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [tab, setTab] = useState<'caliper' | 'table' | 'guide'>('caliper');

  const result = vernierReading(diameter / 10, zeroError / 10); 
  const raw_displayed_mm = result.displayed_value * 10;          
  const msr = Math.floor(raw_displayed_mm * 10) / 10;            
  const vsd = Math.round((raw_displayed_mm - msr) / (LC * 10));  
  const coinciding = Math.max(0, Math.min(10, vsd));
  const corrected = parseFloat((raw_displayed_mm - zeroError).toFixed(2)); 

  const logReading = useCallback(() => {
    setReadings(prev => [...prev, corrected]);
    onLog?.({ id: readings.length + 1, diameter: corrected, uncertainty: 0.05 });
    setParticles(prev => [...prev, ...Array.from({ length: 12 }, () => createSpark(160, 100, hex))]);
  }, [corrected, readings.length, onLog, hex]);

  const stats = readings.length >= 2 ? analyzeReadings(readings) : null;
  const volume = readings.length > 0 ? sphereVolume(readings.reduce((a, b) => a + b, 0) / readings.length / 10) : null;

  const GUIDE_STEPS = [
    { icon: '🔧', title: 'Check Zero Error', desc: 'Close the jaws completely. If the 0 of vernier doesn\'t coincide with 0 of main scale, note the error.' },
    { icon: '📏', title: 'Place Object', desc: 'Place the sphere between the lower jaws.' },
    { icon: '👁️', title: 'Read MSR', desc: 'Note the main scale reading — the last visible division before the vernier zero.' },
    { icon: '🔍', title: 'Read VSD', desc: 'Find which vernier division coincides exactly with a main scale division.' },
    { icon: '📋', title: 'Log Reading', desc: 'Apply: Reading = MSR + VSD × LC − Zero Error.' }
  ];

  const [guideStep, setGuideStep] = useState(0);

  return (
    <div className="flex flex-col h-full bg-slate-950 overflow-hidden text-slate-200">
      <div className="flex border-b border-white/5 bg-[#030712] shrink-0">
        {([
          { key: 'caliper', label: '📐 3D Caliper' },
          { key: 'table',   label: '📋 Readings Table' },
          { key: 'guide',   label: '📖 Procedure' },
        ] as const).map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className={`px-5 py-3 text-xs font-bold transition-all border-b-2 ${tab === t.key
              ? 'border-violet-500 text-violet-400 bg-white/[0.02]' : 'border-transparent text-slate-500 hover:text-white'}`}>
            {t.label}
          </button>
        ))}
        <div className="flex-1" />
        <span className="flex items-center pr-5 text-xs font-mono text-violet-400 font-bold">{readings.length} Logged</span>
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        {/* MAIN VISUAL CONTENT */}
        <div className="flex-1 flex flex-col relative bg-[radial-gradient(ellipse_at_center,#1e1b4b,#0f0a1e,#000)]">
          <ParticleEngine particles={particles} setParticles={setParticles} width={500} height={300} />

          {tab === 'caliper' && (
            <>
              {/* 3D WebGL Area */}
              <div className="absolute inset-0 z-0 h-3/5 border-b border-white/5">
                <Canvas shadows camera={{ position: [0, 0, 8], fov: 40 }}>
                  <ambientLight intensity={0.6} />
                  <directionalLight position={[5, 10, 5]} intensity={1.5} castShadow shadow-bias={-0.0001} />
                  <pointLight position={[-10, -10, 5]} intensity={1} color="#a855f7" />
                  <Environment preset="studio" />
                  
                  <Caliper3D openingMm={diameter} zeroError={zeroError} />
                  
                  <ContactShadows position={[0, -2.5, 0]} opacity={0.6} scale={15} blur={2.5} />
                  <OrbitControls enablePan={true} minPolarAngle={Math.PI/4} maxPolarAngle={Math.PI - Math.PI/4} minDistance={3} maxDistance={15} />
                </Canvas>
              </div>

              {/* HUD Scaler Overlays */}
              <div className="absolute bottom-0 left-0 w-full h-2/5 p-6 flex items-center justify-center gap-8 bg-black/60 backdrop-blur-xl shrink-0 pointer-events-auto z-10 border-t border-white/10">
                <div className="space-y-4">
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 drop-shadow-md">Main Scale (mm details)</div>
                    <div className="bg-slate-900 rounded-xl p-2 border border-white/10 shadow-inner">
                      <MainScale2D offset={Math.floor(diameter / 10)} />
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="text-[10px] font-bold text-violet-400 uppercase tracking-widest mb-1.5 drop-shadow-md flex justify-between">
                      Vernier Scale <span className="text-violet-300">Division {coinciding} coincides</span>
                    </div>
                    <VernierScale2D coinciding={coinciding} />
                  </div>
                </div>

                <div className="w-80 border-l border-white/10 pl-8 space-y-4">
                   <ReadingDisplay msr={msr} vsd={vsd} zeroError={zeroError} lc={LC * 10} />
                </div>
              </div>
            </>
          )}

          {tab === 'table' && (
            <div className="p-8 space-y-6 w-full max-w-4xl mx-auto overflow-y-auto">
              <div className="bg-black/40 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-xl">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-white/5 border-b border-white/10 text-slate-400">
                      <th className="px-6 py-4 text-left font-bold uppercase tracking-wider text-[10px]">#</th>
                      <th className="px-6 py-4 text-left font-bold uppercase tracking-wider text-[10px]">Diameter (mm)</th>
                      <th className="px-6 py-4 text-left font-bold uppercase tracking-wider text-[10px]">Deviation</th>
                      <th className="px-6 py-4 text-left"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {readings.length === 0 &&
                      <tr><td colSpan={4} className="text-center py-12 text-slate-600 italic">No readings logged. Use the caliper to measure!</td></tr>}
                    {readings.map((r, i) => {
                      const mean = readings.reduce((a,b)=>a+b,0)/readings.length;
                      const dev = r - mean;
                      return (
                        <tr key={i} className={`border-b border-white/5 ${i%2===0?'bg-transparent':'bg-white/[0.02]'}`}>
                          <td className="px-6 py-4 font-mono text-slate-500 font-bold">{i+1}</td>
                          <td className="px-6 py-4 font-mono text-violet-400 font-black text-lg">{r.toFixed(2)}</td>
                          <td className="px-6 py-4 font-mono text-sm" style={{ color: Math.abs(dev) < 0.05 ? '#22c55e' : '#f59e0b' }}>
                            {dev >= 0 ? '+' : ''}{dev.toFixed(3)}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button onClick={() => setReadings(rs => rs.filter((_,j)=>j!==i))} className="p-2 text-red-500 hover:bg-red-500/20 rounded-lg transition-colors">
                              <Trash2 size={16}/>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {stats && (
                <div className="bg-gradient-to-br from-violet-900/40 to-[#030712] border border-violet-500/30 rounded-2xl p-8 grid grid-cols-2 gap-8 shadow-[0_10px_30px_rgba(139,92,246,0.1)]">
                  <div>
                    <h3 className="text-xs font-bold text-violet-300 uppercase tracking-widest mb-4">Statistical Analysis</h3>
                    <div className="space-y-3">
                      {[
                        ['n', `${readings.length}`],
                        ['Mean (d̄)', `${stats.mean.toFixed(3)} mm`],
                        ['Std Dev (σ)', `±${stats.std_deviation.toFixed(3)} mm`]
                      ].map(([k,v]) => (
                        <div key={k} className="flex justify-between text-sm border-b border-white/5 pb-2">
                          <span className="text-slate-400">{k}</span>
                          <span className="font-mono font-bold text-white">{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col justify-center items-center text-center bg-black/40 rounded-xl p-6 border border-white/5">
                    <div className="text-[10px] text-slate-500 uppercase font-bold mb-2">Final Reported Cylinder Diameter</div>
                    <div className="text-3xl font-black text-white">{stats.mean.toFixed(2)} <span className="text-lg text-slate-500">± {stats.absolute_uncertainty.toFixed(2)}</span></div>
                    
                    {volume && (
                      <div className="mt-4 pt-4 border-t border-white/10 w-full">
                        <div className="text-[10px] text-violet-400 uppercase font-bold mb-1">Calculated Volume (Sphere)</div>
                        <div className="font-mono text-xl text-violet-200">
                          {volume.volume.toFixed(2)} <span className="text-sm">{volume.unit}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {tab === 'guide' && (
            <div className="p-8 max-w-3xl mx-auto space-y-4">
              <h2 className="text-2xl font-bold text-white mb-6">Simulation Procedure</h2>
              {GUIDE_STEPS.map((s, i) => (
                <div key={i} onClick={() => setGuideStep(i)} className={`flex gap-6 p-6 rounded-2xl border cursor-pointer transition-all ${guideStep===i ? 'border-violet-500 bg-violet-900/20 shadow-[0_0_20px_rgba(139,92,246,0.2)]' : 'border-white/10 bg-black/40 hover:border-white/30'}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-black shrink-0 ${i<guideStep?'bg-green-500 text-white':i===guideStep?'bg-violet-500 text-white':'bg-slate-800 text-slate-500'}`}>
                    {i<guideStep?'✓':i+1}
                  </div>
                  <div>
                    <div className="text-lg font-bold text-white mb-2">{s.icon} {s.title}</div>
                    <div className="text-sm text-slate-400 leading-relaxed">{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT CONTROLS */}
        <div className="w-72 shrink-0 border-l border-white/5 bg-[#030712] flex flex-col z-20 shadow-[-20px_0_50px_rgba(0,0,0,0.5)]">
          <div className="p-6 border-b border-white/5 space-y-1">
             <div className="text-[10px] font-bold text-violet-500 uppercase tracking-widest flex justify-between">
                Physics Lab P1 <span className="bg-violet-500/20 text-violet-300 px-2 rounded-full">Interactive</span>
             </div>
             <h2 className="text-xl font-bold text-white drop-shadow-md">Vernier Calipers</h2>
          </div>
          <div className="p-6 flex flex-col gap-6 overflow-y-auto w-full">
            
            {/* Sliders */}
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-end mb-3">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Target Object Size</span>
                  <div className="flex bg-white/5 px-3 py-1 rounded-md border border-white/10 shadow-inner">
                    <span className="font-mono text-xs text-white font-bold">{diameter.toFixed(1)}</span>
                    <span className="text-[10px] text-slate-500 ml-1">mm</span>
                  </div>
                </div>
                <input type="range" min="5" max="50" step="0.5" value={diameter} onChange={e => setDiameter(parseFloat(e.target.value))} 
                  className="w-full appearance-none h-2 bg-slate-800 rounded-full outline-none focus:ring-2 focus:ring-violet-500/50 cursor-pointer" 
                  style={{ backgroundImage: `linear-gradient(to right, #8b5cf6 ${(diameter-5)/(45)*100}%, transparent 0)`}} />
              </div>

              <div>
                <div className="flex justify-between items-end mb-3">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Calibration: Zero Error</span>
                  <div className="flex bg-white/5 px-3 py-1 rounded-md border border-white/10 shadow-inner">
                    <span className={`font-mono text-xs font-bold ${zeroError>0?'text-red-400':zeroError<0?'text-blue-400':'text-green-400'}`}>
                      {zeroError>=0?'+':''}{zeroError.toFixed(2)}
                    </span>
                    <span className="text-[10px] text-slate-500 ml-1">mm</span>
                  </div>
                </div>
                <input type="range" min="-0.5" max="0.5" step="0.05" value={zeroError} onChange={e => setZeroError(parseFloat(e.target.value))} 
                   className="w-full appearance-none h-2 bg-slate-800 rounded-full outline-none focus:ring-2 focus:ring-red-500/50 cursor-pointer" 
                   style={{ backgroundImage: `linear-gradient(to right, ${zeroError<0?'#3b82f6':'#ef4444'} ${(zeroError+0.5)/(1)*100}%, transparent 0)`}} />
                <div className="flex justify-between text-[9px] mt-2 px-1 font-bold">
                  <span className="text-blue-400/70">−ve Error</span>
                  <span className="text-green-400/70">Perfect Zero</span>
                  <span className="text-red-400/70">+ve Error</span>
                </div>
              </div>
            </div>

            <div className="w-full h-px bg-white/5 my-2" />

            {/* Actions */}
            <div className="flex flex-col gap-3 mt-auto">
              <button onClick={logReading}
                className="w-full py-4 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 transition-all active:scale-95 group shadow-[0_10px_20px_rgba(139,92,246,0.3)]"
                style={{ backgroundImage: `linear-gradient(135deg, ${hex}, #4c1d95)` }}>
                <Plus size={16} className="group-hover:rotate-90 transition-transform"/> Log Measurement
              </button>
              <button onClick={() => setReadings([])}
                className="w-full py-3 rounded-xl text-xs bg-white/[0.03] text-slate-400 flex items-center justify-center gap-2 border border-white/5 hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400 transition-all">
                <RotateCcw size={14}/> Clear Readings
              </button>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default VernierCalipersLab3D;
