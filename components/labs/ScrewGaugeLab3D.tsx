import React, { useState, useCallback, useRef } from 'react';
import { Trash2, RotateCcw } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Box, Cylinder, ContactShadows, Environment, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import ParticleEngine, { Particle, createSpark } from './ParticleEngine';
import { screwGaugeReading, analyzeReadings } from '../../services/simulationEngine';

const PITCH = 0.5; // mm
const DIVS = 50; 
const LC = 0.01; // mm

// ─── 3D SCREW GAUGE SCENE ─────────────────────────────────────────────────────
const ScrewGauge3D: React.FC<{ displayedMm: number; zeroError: number }> = ({ displayedMm, zeroError }) => {
  const spindleRef = useRef<THREE.Group>(null);
  const thimbleRef = useRef<THREE.Group>(null);
  
  const corrected = Math.max(0, displayedMm - zeroError);
  const maxTravelMm = 10;
  const gapUnit = (corrected / maxTravelMm) * 3; // map 0-10mm to 0-3 units for rendering gaps

  useFrame((state, delta) => {
    if (spindleRef.current && thimbleRef.current) {
      // Linear translation
      spindleRef.current.position.x = THREE.MathUtils.lerp(spindleRef.current.position.x, gapUnit, 10 * delta);
      thimbleRef.current.position.x = THREE.MathUtils.lerp(thimbleRef.current.position.x, gapUnit, 10 * delta);
      
      // Rotational movement based on pitch
      // One full rotation = 1 PITCH mm translation
      // Angle = (translation / pitch) * 2 PI
      const rotationAngle = (corrected / PITCH) * Math.PI * 2;
      thimbleRef.current.rotation.x = THREE.MathUtils.lerp(thimbleRef.current.rotation.x, rotationAngle, 10 * delta);
    }
  });

  const bodyMat = <meshStandardMaterial color="#475569" metalness={0.5} roughness={0.6} />;
  const steelMat = <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.2} />;
  const knurlMat = <meshStandardMaterial color="#1e293b" metalness={0.4} roughness={0.8} />;

  return (
    <group position={[-1, 0, 0]}>
      {/* ─── FIXED U-FRAME ─── */}
      <group position={[0, -1.5, 0]}>
        <Box args={[1, 3, 0.8]} position={[-2.5, 0, 0]} castShadow receiveShadow>
          {bodyMat}
        </Box>
        <Box args={[5, 1, 0.8]} position={[0, -1, 0]} castShadow receiveShadow>
          {bodyMat}
        </Box>
        <Box args={[1, 2, 0.8]} position={[2.5, -0.5, 0]} castShadow receiveShadow>
          {bodyMat}
        </Box>
      </group>

      {/* ─── FIXED ANVIL ─── */}
      <Cylinder args={[0.25, 0.25, 0.5]} position={[-2, 0, 0]} rotation={[0, 0, Math.PI/2]} castShadow>
        {steelMat}
      </Cylinder>

      {/* ─── FIXED SLEEVE (Internal barrel with main scale) ─── */}
      <Cylinder args={[0.3, 0.3, 3]} position={[3.5, 0, 0]} rotation={[0, 0, Math.PI/2]} castShadow>
        {steelMat}
      </Cylinder>
      {/* Sleeve line (Index line) */}
      <Box args={[3, 0.02, 0.02]} position={[3.5, 0.31, 0]}>
        <meshBasicMaterial color="#1e293b" />
      </Box>

      {/* ─── MOVING SPINDLE ─── */}
      <group ref={spindleRef} position={[0, 0, 0]}>
        <Cylinder args={[0.25, 0.25, 4]} position={[0.5, 0, 0]} rotation={[0, 0, Math.PI/2]} castShadow receiveShadow>
          {steelMat}
        </Cylinder>
      </group>

      {/* ─── ROTATING THIMBLE ─── */}
      <group ref={thimbleRef} position={[0, 0, 0]}>
        <Cylinder args={[0.4, 0.4, 2]} position={[3, 0, 0]} rotation={[0, 0, Math.PI/2]} castShadow receiveShadow>
          {knurlMat}
        </Cylinder>
        {/* Ratchet Knob */}
        <Cylinder args={[0.3, 0.3, 0.5]} position={[4.25, 0, 0]} rotation={[0, 0, Math.PI/2]} castShadow>
          {bodyMat}
        </Cylinder>
        {/* Simulated Circular Scale Lines wrapper */}
        {Array.from({ length: 10 }).map((_, i) => (
          <Box key={i} args={[2, 0.01, 0.82]} position={[3, 0, 0]} rotation={[i * (Math.PI/10), 0, 0]}>
            <meshBasicMaterial color="rgba(255,255,255,0.05)" />
          </Box>
        ))}
      </group>

      {/* ─── TARGET OBJECT (Wire/Sheet) ─── */}
      {gapUnit > 0.05 && (
        <Sphere args={[gapUnit / 2, 32, 32]} position={[-2 + gapUnit / 2 + 0.25, 0, 0]} castShadow receiveShadow>
          <meshPhysicalMaterial color="#3b82f6" transmission={0.2} opacity={0.9} transparent roughness={0.2} metalness={0.5} />
        </Sphere>
      )}
    </group>
  );
};

// ─── 2D HUD FOR ROTATION SCALE ───
const ThimbleScale2D: React.FC<{ reading: number }> = ({ reading }) => {
  const scrollY = (reading % DIVS) * 6; // 6px per div mapping
  return (
    <div className="relative h-24 w-24 bg-slate-900 border-2 border-slate-700/50 rounded-xl overflow-hidden shadow-inner flex shrink-0">
      <div className="w-[2px] h-full bg-red-500 absolute left-12 top-0 shadow-[0_0_8px_#ef4444] z-20" />
      <div className="absolute left-6 w-full flex flex-col pr-1 transition-all duration-75"
        style={{ transform: `translateY(${-scrollY + 48}px)` }}>
        {Array.from({ length: DIVS * 3 }, (_, i) => {
          const val = (i % DIVS);
          return (
            <div key={i} className="flex items-center gap-2 shrink-0" style={{ height: 6 }}>
              <div style={{ width: val % 5 === 0 ? 12 : 6, height: 1.5, background: val % 5 === 0 ? '#cbd5e1' : '#64748b' }} />
              {val % 5 === 0 && <span className="text-[9px] font-mono leading-none text-slate-400 font-bold">{val}</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
const ScrewGaugeLab3D: React.FC<{ hex: string; onLog?: (data: any) => void }> = ({ hex, onLog }) => {
  const [diameter, setDiameter] = useState(2.25); // mm
  const [zeroError, setZeroError] = useState(0.0); // mm
  const [readings, setReadings] = useState<number[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [tab, setTab] = useState<'gauge' | 'table' | 'guide'>('gauge');

  // Screw gauge: Total Reading = MSR + (CSR * LC) - Zero Error
  const result = screwGaugeReading(diameter, zeroError);
  const { displayed_value } = result;
  
  const msr = Math.floor(displayed_value / PITCH) * PITCH;
  const csr = Math.round((displayed_value - msr) / LC);
  
  const logReading = useCallback(() => {
    const val = displayed_value - zeroError;
    setReadings(prev => [...prev, val]);
    setParticles(prev => [...prev, ...Array.from({ length: 15 }, () => createSpark(80, 150, hex))]);
    
    if (onLog) {
      onLog({ id: readings.length + 1, thickness: parseFloat(val.toFixed(3)), msr: msr, csr: csr });
    }
  }, [displayed_value, zeroError, onLog, readings.length, msr, csr, hex]);

  const stats = readings.length >= 2 ? analyzeReadings(readings) : null;

  const GUIDE = [
    { icon: '🔧', title: 'Find Zero Error', desc: 'Screw the spindle until it touches anvil. Note the circular scale reading against index line.' },
    { icon: '🔩', title: 'Insert Object', desc: 'Place the wire or metal sheet in the gap. Rotate thimble until spindle touches it.' },
    { icon: '⚙️', title: 'Use Ratchet', desc: 'Always use the ratchet (end knob) for final tightening to ensure uniform pressure and prevent damage.' },
    { icon: '👁️', title: 'Read Scale', desc: 'MSR is the last visible mark on sleeve. CSR is the thimble division coinciding with index line.' },
    { icon: '📋', title: 'Log Reading', desc: 'Apply: Reading = MSR + (CSR × LC) - ZE. Take readings at different spots.' },
  ];

  return (
    <div className="flex flex-col h-full bg-[#030712] overflow-hidden text-slate-200">
      <div className="flex border-b border-white/5 bg-black/40 shrink-0">
        {([
          { key: 'gauge', label: '🔩 3D Micrometer' },
          { key: 'table', label: '📋 Measurements' },
          { key: 'guide', label: '📖 Guide' },
        ] as const).map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className={`px-5 py-3 text-xs font-bold border-b-2 transition-all ${tab === t.key
              ? 'border-blue-500 text-blue-400 bg-white/[0.02]' : 'border-transparent text-slate-500 hover:text-white'}`}>
            {t.label}
          </button>
        ))}
        <div className="flex-1" />
        <span className="flex items-center pr-5 text-xs font-mono text-blue-400 font-bold">{readings.length} Recorded</span>
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        <div className="flex-1 flex flex-col relative bg-[radial-gradient(ellipse_at_center,#0c1a3a,#020617,#000)]">
          <ParticleEngine particles={particles} setParticles={setParticles} width={500} height={300} />

          {tab === 'gauge' && (
            <>
              {/* 3D WebGL Area */}
              <div className="absolute inset-0 z-0 h-[55%] border-b border-white/5">
                <Canvas shadows camera={{ position: [0, 4, 10], fov: 35 }}>
                  <ambientLight intensity={0.5} />
                  <directionalLight position={[5, 10, 5]} intensity={1.5} castShadow shadow-bias={-0.0001} />
                  <pointLight position={[-10, 5, -10]} intensity={1} color="#3b82f6" />
                  <Environment preset="night" />
                  
                  <ScrewGauge3D displayedMm={displayed_value} zeroError={zeroError} />
                  
                  <ContactShadows position={[0, -2.5, 0]} opacity={0.6} scale={15} blur={2.5} />
                  <OrbitControls enablePan={true} minPolarAngle={0} maxPolarAngle={Math.PI / 2 + 0.1} minDistance={5} maxDistance={20} />
                </Canvas>
              </div>

              {/* HUD Scaler Overlays */}
              <div className="absolute bottom-0 left-0 w-full h-[45%] flex">
                <div className="flex-1 p-8 flex items-center justify-center gap-10 bg-black/60 backdrop-blur-md">
                   <div className="flex flex-col items-center">
                     <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 drop-shadow-md">Circular Scale (CSR)</span>
                     <ThimbleScale2D reading={csr} />
                     <span className="mt-3 text-xs font-mono text-blue-400 bg-blue-900/20 px-3 py-1 rounded-full border border-blue-500/30">
                       Div {csr} coincides
                     </span>
                   </div>
                   
                   <div className="bg-[#0b101e] border border-white/10 rounded-2xl p-6 shadow-2xl space-y-3 w-72">
                     <div className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-4 border-b border-white/10 pb-2">Measurement Breakdown</div>
                     {[
                        { label: 'Main (MSR)', val: msr.toFixed(1), unit: 'mm' },
                        { label: 'Circular (CSR)', val: csr, unit: `x ${LC}` },
                        { label: 'Zero Error', val: zeroError.toFixed(2), unit: 'mm' },
                     ].map(r => (
                       <div key={r.label} className="flex justify-between text-xs font-mono">
                         <span className="text-slate-400">{r.label}</span>
                         <span className="text-white font-bold">{r.val} <small className="text-slate-600 ml-1">{r.unit}</small></span>
                       </div>
                     ))}
                     <div className="pt-3 mt-3 border-t border-white/10 flex justify-between items-center text-sm font-mono bg-blue-900/20 -mx-3 px-3 py-2 rounded-xl border border-blue-500/20">
                       <span className="text-slate-300 font-bold uppercase text-[10px]">Net Result</span>
                       <span className="font-bold text-blue-400 text-lg">{(displayed_value - zeroError).toFixed(3)} mm</span>
                     </div>
                   </div>
                </div>
              </div>
            </>
          )}

          {tab === 'table' && (
            <div className="p-8 max-w-4xl mx-auto space-y-6 overflow-y-auto">
              <div className="bg-black/40 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-xl">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-white/5 border-b border-white/10 text-slate-400">
                      <th className="px-6 py-4 text-left font-bold uppercase tracking-wider text-[10px]">Trial</th>
                      <th className="px-6 py-4 text-left font-bold uppercase tracking-wider text-[10px]">Thickness (mm)</th>
                      <th className="px-6 py-4 text-left font-bold uppercase tracking-wider text-[10px]">Deviation</th>
                      <th className="px-6 py-4"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {readings.length === 0 && <tr><td colSpan={4} className="text-center py-12 text-slate-600 italic">No trials recorded.</td></tr>}
                    {readings.map((r, i) => (
                      <tr key={i} className={`border-b border-white/5 ${i%2===0?'bg-transparent':'bg-white/[0.02]'}`}>
                        <td className="px-6 py-4 text-slate-500 font-mono font-bold">{i + 1}</td>
                        <td className="px-6 py-4 text-blue-400 font-mono font-black text-lg">{r.toFixed(3)}</td>
                        <td className="px-6 py-4 text-slate-400 font-mono text-sm">
                          {stats ? (r - stats.mean >= 0 ? '+' : '') + (r - stats.mean).toFixed(4) : '--'}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button onClick={() => setReadings(rx => rx.filter((_, idx) => idx !== i))} className="p-2 text-red-500 hover:bg-red-500/20 rounded-lg transition-colors">
                             <Trash2 size={16}/>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {stats && (
                <div className="bg-gradient-to-br from-blue-900/40 to-[#030712] border border-blue-500/30 rounded-2xl p-8 flex justify-between items-center shadow-lg">
                  <div className="space-y-2 flex-1">
                    <h3 className="text-[10px] uppercase font-bold text-blue-400 tracking-widest mb-4">Precision Analysis</h3>
                    <div className="font-mono text-sm text-slate-300">Mean: <strong className="text-white ml-2">{stats.mean.toFixed(4)} mm</strong></div>
                    <div className="font-mono text-sm text-slate-400">σ: <span className="ml-2">±{stats.std_deviation.toFixed(4)} mm</span></div>
                  </div>
                  <div className="bg-black/50 p-6 rounded-2xl border border-white/10 text-center flex-1">
                     <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest block mb-2">Final Dimension Definition</span>
                     <span className="text-4xl font-black text-white">{stats.mean.toFixed(3)}</span>
                     <span className="text-lg text-slate-500 font-medium ml-2">± {stats.absolute_uncertainty.toFixed(3)}</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {tab === 'guide' && (
            <div className="p-8 max-w-3xl mx-auto space-y-4">
              <h2 className="text-2xl font-bold text-white mb-6">Micrometer Screw Gauge Manual</h2>
              {GUIDE.map((g, i) => (
                <div key={i} className="bg-black/40 border border-white/10 rounded-2xl p-6 flex gap-6 hover:border-white/30 transition-colors">
                  <span className="text-3xl bg-blue-900/30 w-12 h-12 flex items-center justify-center rounded-full shrink-0 border border-blue-500/30">{g.icon}</span>
                  <div>
                    <div className="text-lg font-bold text-white mb-2">{g.title}</div>
                    <p className="text-sm text-slate-400 leading-relaxed">{g.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="w-72 shrink-0 border-l border-white/5 bg-[#030712] p-6 flex flex-col gap-6 overflow-y-auto shadow-[-20px_0_50px_rgba(0,0,0,0.5)] z-20">
          <div className="space-y-1 pb-4 border-b border-white/5">
             <div className="text-[10px] font-bold text-blue-500 uppercase tracking-widest flex justify-between">
                Physics Lab P3 <span className="bg-blue-500/20 text-blue-300 px-2 rounded-full">Pro</span>
             </div>
             <h2 className="text-xl font-bold text-white drop-shadow-md">Micrometer</h2>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-end mb-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Wire Thickness</span>
                <div className="flex bg-white/5 px-3 py-1 rounded-md border border-white/10">
                  <span className="font-mono text-xs text-white font-bold">{diameter.toFixed(3)}</span>
                  <span className="text-[10px] text-slate-500 ml-1">mm</span>
                </div>
              </div>
              <input type="range" min="0" max="10" step="0.01" value={diameter} onChange={e => setDiameter(parseFloat(e.target.value))} 
                className="w-full appearance-none h-2 bg-slate-800 rounded-full outline-none focus:ring-2 focus:ring-blue-500/50 cursor-pointer" 
                style={{ backgroundImage: `linear-gradient(to right, #3b82f6 ${(diameter)/(10)*100}%, transparent 0)`}} />
            </div>

            <div className="bg-white/[0.02] -mx-6 px-6 py-4 border-y border-white/5">
              <div className="flex justify-between items-end mb-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Zero Error</span>
                <div className="flex bg-black/40 px-3 py-1 rounded-md border border-white/10">
                  <span className={`font-mono text-xs font-bold ${zeroError !== 0 ? 'text-red-400' : 'text-green-400'}`}>
                    {zeroError>=0?'+':''}{zeroError.toFixed(2)}
                  </span>
                  <span className="text-[10px] text-slate-500 ml-1">mm</span>
                </div>
              </div>
              <input type="range" min="-0.05" max="0.05" step="0.01" value={zeroError} onChange={e => setZeroError(parseFloat(e.target.value))} 
                 className="w-full appearance-none h-2 bg-slate-800 rounded-full outline-none focus:ring-2 focus:ring-red-500/50 cursor-pointer" 
                 style={{ backgroundImage: `linear-gradient(to right, ${zeroError<0?'#3b82f6':'#ef4444'} ${(zeroError+0.05)/(0.1)*100}%, transparent 0)`}} />
              <div className="flex justify-between text-[8px] mt-2 text-slate-500 font-bold uppercase tracking-widest">
                 <span>−ve</span><span>Neutral</span><span>+ve</span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button onClick={logReading}
                className="w-full py-4 rounded-xl text-sm font-bold text-white shadow-xl transition-all active:scale-95 group"
                style={{ backgroundImage: `linear-gradient(135deg, ${hex}, #1e3a8a)` }}>
                Log <span className="font-mono bg-black/20 px-2 py-0.5 rounded ml-1 group-hover:bg-black/30 transition-colors">{(displayed_value - zeroError).toFixed(3)} mm</span>
              </button>

              <button onClick={() => setReadings([])}
                className="w-full py-3 rounded-xl text-xs bg-transparent border border-white/10 text-slate-400 flex items-center justify-center gap-2 hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400 transition-all">
                <RotateCcw size={14}/> Wipe History
              </button>
            </div>
          </div>

          <div className="mt-auto bg-[#0b101e] border border-white/5 rounded-2xl p-4 space-y-3">
            <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest border-b border-light pb-2">Hardware Spec limits</div>
            <div className="flex justify-between text-[11px]">
              <span className="text-slate-500 font-medium">Pitch</span>
              <span className="text-white font-mono font-bold">{PITCH} mm</span>
            </div>
            <div className="flex justify-between text-[11px]">
              <span className="text-slate-500 font-medium">Divisions</span>
              <span className="text-white font-mono font-bold">{DIVS}</span>
            </div>
            <div className="flex justify-between text-[11px]">
              <span className="text-slate-500 font-medium">Least Count</span>
              <span className="text-blue-400 font-mono font-bold">{LC} mm</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrewGaugeLab3D;
