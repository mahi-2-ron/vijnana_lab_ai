import React, { useRef, useEffect, useState, useMemo } from 'react';
import { RotateCcw, Trash2 } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Html, Cylinder } from '@react-three/drei';
import * as THREE from 'three';
import DraggableSlider from './DraggableSlider';

interface Props { hex: string; }
interface Reading { mass: number; freq: number; T: number; sqrtT: number; }

const VibratingString = ({ length, freq }: { length: number; freq: number }) => {
  const segments = 100;
  const b1x = -4;

  const points = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= segments; i++) pts.push(new THREE.Vector3(0, 0, 0));
    return pts;
  }, []);

  const geo = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points]);
  const mat = useMemo(() => new THREE.LineBasicMaterial({ color: '#fbbf24', transparent: true, opacity: 0.8 }), []);
  const lineObj = useMemo(() => new THREE.Line(geo, mat), [geo, mat]);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const b2x = b1x + (length / 10);
    const pos = lineObj.geometry.attributes.position;
    
    // Animate standing wave
    for(let i = 0; i <= segments; i++) {
      const frac = i / segments;
      const x = b1x + frac * (b2x - b1x);
      const visualFreq = Math.min(freq * 0.1, 40); 
      const amp = 0.15 * Math.sin(Math.PI * frac) * Math.sin(t * visualFreq);
      pos.setXYZ(i, x, 0.5 + amp, 0); 
    }
    pos.needsUpdate = true;
  });

  return <primitive object={lineObj} />;
};

const StaticStringSegment = ({ p1, p2 }: { p1: [number, number, number], p2: [number, number, number] }) => {
  const geo = useMemo(() => new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(...p1), new THREE.Vector3(...p2)]), [p1, p2]);
  const mat = useMemo(() => new THREE.LineBasicMaterial({ color: '#fbbf24' }), []);
  const lineObj = useMemo(() => new THREE.Line(geo, mat), [geo, mat]);
  return <primitive object={lineObj} />;
};

const SonometerScene = ({ length, mass, freq, hex }: { length: number; mass: number; freq: number; hex: string }) => {
  const b1x = -4;
  const b2x = b1x + (length / 10);
  const pulleyX = 5;

  return (
    <group position={[0, -1, 0]}>
      {/* Sonometer Wooden Box */}
      <mesh position={[0, -0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[11, 1, 1.5]} />
        <meshStandardMaterial color="#78350f" roughness={0.9} />
      </mesh>

      {/* Bridge 1 (Fixed) */}
      <mesh position={[b1x, 0.25, 0]} castShadow>
        <cylinderGeometry args={[0, 0.3, 0.5, 3]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.6} roughness={0.2} />
      </mesh>
      <Html position={[b1x, 0.8, 0]} center>
        <div className="text-[9px] text-green-400 font-bold uppercase tracking-widest bg-black/50 px-1 rounded backdrop-blur">Node</div>
      </Html>

      {/* Bridge 2 (Movable) */}
      <mesh position={[b2x, 0.25, 0]} castShadow>
        <cylinderGeometry args={[0, 0.3, 0.5, 3]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.6} roughness={0.2} />
      </mesh>
      <Html position={[b2x, 0.8, 0]} center>
        <div className="text-[9px] text-green-400 font-bold uppercase tracking-widest bg-black/50 px-1 rounded backdrop-blur">Node</div>
      </Html>

      {/* Antinode Label */}
      <Html position={[(b1x + b2x)/2, 1, 0]} center>
        <div className="text-[10px] text-pink-400 font-bold uppercase tracking-widest bg-black/50 px-1 rounded backdrop-blur border border-pink-500/30">Antinode</div>
      </Html>

      {/* Pulley */}
      <mesh position={[pulleyX, 0.5, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.2, 0.1, 16]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.8} />
      </mesh>

      {/* Strings */}
      <StaticStringSegment p1={[-5, 0.5, 0]} p2={[b1x, 0.5, 0]} />
      <VibratingString length={length} freq={freq} />
      <StaticStringSegment p1={[b2x, 0.5, 0]} p2={[pulleyX, 0.5, 0]} />
      <StaticStringSegment p1={[pulleyX + 0.2, 0.5, 0]} p2={[pulleyX + 0.2, -3, 0]} />

      {/* Weight Hanger & Weights */}
      <group position={[pulleyX + 0.2, -3.2, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.05, 0.05, 0.5, 8]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.8} />
        </mesh>
        {/* Base plate */}
        <mesh position={[0, -0.25, 0]} castShadow>
          <cylinderGeometry args={[0.4, 0.4, 0.05, 16]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.8} />
        </mesh>
        
        {/* Slotted weights — dynamic based on mass. 50g hanger + 50g slots */}
        {Array.from({ length: Math.floor((mass - 50) / 50) }).map((_, i) => (
          <mesh key={i} position={[0, -0.2 + i * 0.08, 0]} castShadow>
            <cylinderGeometry args={[0.35, 0.35, 0.07, 16]} />
            <meshStandardMaterial color="#3b82f6" roughness={0.3} metalness={0.4} />
          </mesh>
        ))}

        <Html position={[0.7, 0, 0]}>
          <div className="text-white font-bold bg-blue-900/80 px-2 py-0.5 rounded border border-blue-500/50 text-xs backdrop-blur whitespace-nowrap">
            {mass} g
          </div>
        </Html>
      </group>

      {/* Live HUD Floating over Sonometer */}
      <Html position={[0, 2, 0]} center>
        <div className="bg-slate-900/80 border border-yellow-500/50 rounded-xl p-3 backdrop-blur-md shadow-2xl flex flex-col items-center min-w-[140px]">
          <p className="text-[10px] text-yellow-400/80 uppercase font-bold tracking-widest mb-1">Resonant Freq</p>
          <p className="font-mono text-2xl font-bold text-yellow-400 shadow-yellow-500/50 drop-shadow-lg">{freq.toFixed(1)} Hz</p>
        </div>
      </Html>
    </group>
  );
};

const SonometerLab: React.FC<Props> = ({ hex }) => {
  const [mass, setMass] = useState(200); // g (min 50g hanger)
  const [length, setLength] = useState(50); // cm
  const [readings, setReadings] = useState<Reading[]>([]);
  const mu = 0.003; // kg/m
  const g = 9.8;

  const T = (mass / 1000) * g; // Tension in N
  const freq = (1 / (2 * length / 100)) * Math.sqrt(T / mu);
  const sqrtT = Math.sqrt(T);

  const logReading = () => setReadings(prev => [...prev, { mass, freq, T, sqrtT }]);

  return (
    <div className="flex flex-col md:flex-row h-full w-full bg-slate-950">
      <div className="flex-1 relative rounded-2xl overflow-hidden m-4 border border-white/10 shadow-2xl">
        <Canvas camera={{ position: [0, 2, 12], fov: 45 }}>
          <Environment preset="night" />
          <ambientLight intensity={0.6} />
          <pointLight position={[0, 5, 0]} intensity={1} color="#fef08a" />
          <pointLight position={[5, -5, 5]} intensity={0.8} color="#93c5fd" />
          
          <SonometerScene length={length} mass={mass} freq={freq} hex={hex} />
          
          <ContactShadows position={[0, -4.5, 0]} opacity={0.5} scale={20} blur={2.5} far={4} color="#000000" />
          <OrbitControls enablePan={true} enableZoom={true} maxPolarAngle={Math.PI / 2} minPolarAngle={0} target={[0,-1,0]} />
        </Canvas>

        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3 shadow-xl max-w-xs">
          <p className="text-[10px] font-bold uppercase tracking-widest text-yellow-500 mb-1">Physics Lab — p11</p>
          <p className="text-white font-bold text-sm">3D Sonometer</p>
          <p className="text-xs text-slate-400 mt-1">Verify string formulas. Drag to explore resonant nodes & tension weights.</p>
        </div>
      </div>

      <div className="w-full md:w-72 bg-slate-900 border-l border-white/5 flex flex-col z-10">
        <div className="p-5 border-b border-white/5">
          <h2 className="text-lg font-black text-white">Controls</h2>
        </div>
        <div className="flex-1 p-5 space-y-4 overflow-y-auto">
          <div className="bg-yellow-500/10 border border-yellow-500/30 p-3 rounded-xl shadow-inner">
            <p className="text-yellow-200 text-xs">Vary the hanging mass to change Tension (T), and shift the bridge to change Length (l). Log reading to see n vs √T linear relation.</p>
          </div>

          <DraggableSlider label="Hanging Mass (m)" min={50} max={1000} step={50} value={mass} onChange={setMass} color="#f59e0b" unit="g" />
          <DraggableSlider label="Vibrating Length (l)" min={20} max={80} value={length} onChange={setLength} color="#a78bfa" unit="cm" />

          <div className="grid grid-cols-2 gap-2">
            {[
              { label: 'Tension (T)', val: `${T.toFixed(2)} N`, color: '#fbbf24' },
              { label: '√T', val: sqrtT.toFixed(3), color: '#fb923c' },
              { label: 'Length (l)', val: `${length} cm`, color: '#a78bfa' },
              { label: 'Freq (n)', val: `${freq.toFixed(1)} Hz`, color: '#4ade80' },
            ].map(m => (
              <div key={m.label} className="bg-slate-950/50 border border-white/5 rounded-xl p-2.5 text-center shadow-sm">
                <div className="text-[9px] text-slate-500 uppercase font-bold tracking-wider mb-1">{m.label}</div>
                <div className="font-mono font-bold text-sm" style={{ color: m.color }}>{m.val}</div>
              </div>
            ))}
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-white/5 shadow-inner text-xs space-y-1.5">
            <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-2 border-b border-white/5 pb-1">Formula</p>
            <p className="font-mono text-yellow-400">n = (1/2l) × √(T/μ)</p>
            <p className="font-mono text-yellow-400/70">n ∝ √T at constant l</p>
            <p className="font-mono text-yellow-400/70">n ∝ 1/l at constant T</p>
          </div>

          <div className="flex gap-2 pt-2">
            <button onClick={logReading}
              className="flex-1 py-3 rounded-xl text-sm font-bold text-white transition-all active:scale-95 shadow-lg shadow-yellow-600/20"
              style={{ backgroundColor: hex }}>
              Log Reading
            </button>
            <button onClick={() => setReadings([])}
              className="px-4 py-3 rounded-xl bg-slate-800 text-red-400 hover:bg-red-900/30 hover:text-red-300 transition-colors">
              <RotateCcw size={16} />
            </button>
          </div>

          {readings.length > 0 && (
            <div className="overflow-x-auto text-xs bg-slate-950 rounded-xl border border-white/5 shadow-inner">
              <table className="w-full border-collapse">
                <thead><tr className="bg-slate-900/80 border-b border-white/10">
                  {['#', 'm(g)', '√T', 'n(Hz)', ''].map(h => <th key={h} className="px-3 py-2 text-slate-400 text-left font-semibold">{h}</th>)}
                </tr></thead>
                <tbody>{readings.map((r, i) => (
                  <tr key={i} className="border-b border-white/5 last:border-b-0 hover:bg-white/5 transition-colors">
                    <td className="px-3 py-2 text-slate-500">{i + 1}</td>
                    <td className="px-3 py-2 font-mono text-yellow-400/90">{r.mass}</td>
                    <td className="px-3 py-2 font-mono text-orange-400/90">{r.sqrtT.toFixed(3)}</td>
                    <td className="px-3 py-2 font-mono text-green-400 font-bold">{r.freq.toFixed(1)}</td>
                    <td className="px-3 py-2 text-right">
                      <button onClick={() => setReadings(p => p.filter((_, j) => j !== i))} className="text-slate-600 hover:text-red-400 transition-colors">
                        <Trash2 size={12} />
                      </button>
                    </td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SonometerLab;
