import React, { useState, useMemo, useRef } from 'react';
import { RotateCcw, Trash2 } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Html, Line } from '@react-three/drei';
import * as THREE from 'three';
import DraggableSlider from './DraggableSlider';

interface Props { hex: string; }
interface Reading { mass: number; F: number; x: number; }

class SpringCurve extends THREE.Curve<THREE.Vector3> {
  constructor(private scale: number, private coils: number, private extension: number) {
    super();
  }
  getPoint(t: number, optionalTarget = new THREE.Vector3()) {
    const x = this.scale * Math.cos(this.coils * 2 * Math.PI * t);
    const z = this.scale * Math.sin(this.coils * 2 * Math.PI * t);
    const y = -t * (2 + this.extension); // Natural length is 2 units downwards
    return optionalTarget.set(x, y, z);
  }
}

const HookesLawScene = ({ mass, extension }: { mass: number; extension: number }) => {
  // Use a ref to animate to the new extension value for elasticity effect
  const [currentExt, setCurrentExt] = useState(extension);
  
  useFrame(() => {
    // Overdamped spring interpolation for smooth visual updates
    setCurrentExt(Math.max(0, currentExt + (extension - currentExt) * 0.1));
  });

  const curve = useMemo(() => new SpringCurve(0.4, 12, currentExt), [currentExt]);
  const springGeo = useMemo(() => new THREE.TubeGeometry(curve, 150, 0.04, 12, false), [curve]);

  const hangerY = -(2 + currentExt); // Bottom of the spring
  const numWeights = Math.max(0, Math.floor((mass - 50) / 50)); // Assuming 50g base hanger

  return (
    <group position={[0, 2.5, 0]}>
      {/* Ceiling Mount */}
      <mesh position={[0, 0.2, 0]} castShadow>
        <boxGeometry args={[2, 0.2, 1.5]} />
        <meshStandardMaterial color="#334155" roughness={0.8} />
      </mesh>
      
      {/* Spring Hook top */}
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.2, 16]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.8} />
      </mesh>

      {/* 3D Spring */}
      <mesh geometry={springGeo} castShadow>
        <meshStandardMaterial color="#60a5fa" metalness={0.6} roughness={0.3} />
      </mesh>

      {/* Weight Hanger & Slotted Weights */}
      <group position={[0, hangerY, 0]}>
        {/* Hook */}
        <mesh position={[0, -0.1, 0]}>
           <cylinderGeometry args={[0.04, 0.04, 0.2, 8]} />
           <meshStandardMaterial color="#94a3b8" metalness={0.8} />
        </mesh>
        
        {/* Central Rod */}
        <mesh position={[0, -0.7, 0]} castShadow>
           <cylinderGeometry args={[0.06, 0.06, 1.2, 12]} />
           <meshStandardMaterial color="#cbd5e1" metalness={0.8} />
        </mesh>

        {/* Hanger Base */}
        <mesh position={[0, -1.3, 0]} castShadow>
            <cylinderGeometry args={[0.45, 0.45, 0.05, 16]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.8} />
        </mesh>

        {/* Weights */}
        {Array.from({ length: numWeights }).map((_, i) => (
          <mesh key={i} position={[0, -1.25 + i * 0.12, 0]} castShadow>
            <cylinderGeometry args={[0.4, 0.4, 0.1, 16]} />
            <meshStandardMaterial color="#2563eb" metalness={0.4} roughness={0.5} />
          </mesh>
        ))}

        <Html position={[0.7, -0.6, 0]}>
          <div className="text-white font-bold bg-blue-900/80 px-2 py-1 rounded border border-blue-500/50 text-xs backdrop-blur whitespace-nowrap">
            {mass} g
          </div>
        </Html>
      </group>

      {/* Extension Arrow / Ruler */}
      <group position={[1.5, 0, 0]}>
        {/* Line for natural length */}
        <Line points={[[-0.2, -2, 0], [0.5, -2, 0]]} color="#94a3b8" lineWidth={1} dashed />
        <Html position={[0.6, -2, 0]}>
          <div className="text-[10px] text-slate-400 whitespace-nowrap">Natural Length</div>
        </Html>

        {/* Line for current displacement */}
        {currentExt > 0.05 && (
          <>
            <Line points={[[0.2, -2, 0], [0.2, hangerY, 0]]} color="#f87171" lineWidth={2} />
            <Line points={[[-0.2, hangerY, 0], [0.5, hangerY, 0]]} color="#f87171" lineWidth={1} dashed />
            <Html position={[0.4, hangerY / 2 - 1, 0]}>
               <div className="text-[10px] text-red-400 font-bold bg-black/40 px-1 rounded whitespace-nowrap">
                 x = {(currentExt/2 * 10).toFixed(2)} cm
               </div>
            </Html>
          </>
        )}
      </group>
    </group>
  );
};

const HookesLawLab: React.FC<Props> = ({ hex }) => {
  const [mass, setMass] = useState(100); 
  const [k, setK] = useState(5); 
  const [readings, setReadings] = useState<Reading[]>([]);
  const [showGraph, setShowGraph] = useState(false);

  const g = 9.8;
  const F = (mass / 1000) * g; 
  const x = F / k; // displacement in m
  const x_cm = x * 100; // cm
  const visualExtension = x * 20; // Scale visual extension proportionally

  return (
    <div className="flex flex-col md:flex-row h-full w-full bg-slate-950">
      <div className="flex-1 relative rounded-2xl overflow-hidden m-4 border border-white/10 shadow-2xl">
        <Canvas camera={{ position: [0, 0, 7], fov: 50 }}>
          <Environment preset="city" />
          <ambientLight intensity={0.6} />
          <pointLight position={[5, 5, 5]} intensity={1.2} color="#bfdbfe" />
          <pointLight position={[-5, -2, 2]} intensity={0.8} />
          
          <HookesLawScene mass={mass} extension={visualExtension} />
          
          <ContactShadows position={[0, -3.5, 0]} opacity={0.5} scale={10} blur={2.5} far={4} color="#000000" />
          <OrbitControls enablePan={true} enableZoom={true} target={[0, -0.5, 0]} />
        </Canvas>

        {showGraph && readings.length > 1 && (
          <div className="absolute bottom-4 left-4 right-4 bg-slate-900/95 border border-blue-500/30 rounded-xl p-4 shadow-xl backdrop-blur-md h-40">
             <div className="h-full w-full relative">
               <svg viewBox="0 0 100 100" className="w-full h-full preserve-3d" preserveAspectRatio="none">
                 {/* Graph Grid */}
                 <rect width="100" height="100" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                 {/* Dynamic SVG plotting of F vs x */}
                 {(() => {
                   const maxX = Math.max(...readings.map(r => r.x), 0.1);
                   const maxF = Math.max(...readings.map(r => r.F), 0.1);
                   const pts = readings.map(r => `${(r.x / maxX) * 90 + 5},${90 - (r.F / maxF) * 80}`).join(' L ');
                   return (
                     <>
                       <path d={`M ${pts}`} fill="none" stroke="#60a5fa" strokeWidth="2" />
                       {readings.map((r, i) => (
                         <circle key={i} cx={(r.x / maxX) * 90 + 5} cy={90 - (r.F / maxF) * 80} r="1.5" fill="#3b82f6" />
                       ))}
                     </>
                   );
                 })()}
               </svg>
               <div className="absolute top-0 right-0 p-1 text-[9px] text-slate-400">F vs x Plot</div>
             </div>
          </div>
        )}

        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3 shadow-xl max-w-xs">
          <p className="text-[10px] font-bold uppercase tracking-widest text-blue-400 mb-1">Physics Lab — p15</p>
          <p className="text-white font-bold text-sm">3D Hooke's Law</p>
          <p className="text-xs text-slate-400 mt-1">F = kx. Watch the spring stretch under load.</p>
        </div>
      </div>

      <div className="w-full md:w-72 bg-slate-900 border-l border-white/5 flex flex-col z-10">
        <div className="p-5 border-b border-white/5">
           <h2 className="text-lg font-black text-white">Controls</h2>
        </div>
        <div className="flex-1 p-5 space-y-4 overflow-y-auto">
          <div className="bg-blue-500/10 border border-blue-500/30 p-3 rounded-xl shadow-inner">
            <p className="text-blue-200 text-xs leading-relaxed">Increase mass to stretch the spring. Log readings to plot F vs x line, whose slope determines k.</p>
          </div>

          <DraggableSlider label="Total Mass (m)" min={50} max={1000} step={50} value={mass} onChange={setMass} color="#60a5fa" unit="g" />
          <DraggableSlider label="Spring Constant (k)" min={1} max={20} value={k} onChange={setK} color="#f59e0b" unit="N/m" />

          <div className="grid grid-cols-2 gap-2">
            {[
              { label: 'Mass', val: `${mass}g`, color: '#60a5fa' },
              { label: 'Force (F)', val: `${F.toFixed(3)} N`, color: '#fbbf24' },
              { label: 'Extension (x)', val: `${x_cm.toFixed(2)} cm`, color: '#f87171' },
              { label: 'k Calc', val: `${(F / (x || 0.001)).toFixed(2)} N/m`, color: '#4ade80' },
            ].map(m => (
              <div key={m.label} className="bg-slate-950/50 border border-white/5 rounded-xl p-2.5 text-center shadow-sm">
                <div className="text-[9px] text-slate-500 uppercase font-bold tracking-wider mb-1">{m.label}</div>
                <div className="font-mono font-bold text-sm" style={{ color: m.color }}>{m.val}</div>
              </div>
            ))}
          </div>

          <div className="flex gap-2 pt-2">
            <button onClick={() => setReadings(prev => [...prev, { mass, F, x: x_cm }])}
              className="flex-1 py-3 rounded-xl text-sm font-bold text-white transition-all active:scale-95 shadow-lg shadow-blue-500/20"
              style={{ backgroundColor: hex }}>
              Log Reading
            </button>
            <button onClick={() => setShowGraph(s => !s)}
              className={`px-4 py-3 rounded-xl text-xs font-bold transition-all shadow-md ${showGraph ? 'bg-blue-600 text-white shadow-blue-500/20' : 'bg-slate-800 text-slate-300'}`}>
              Plot
            </button>
          </div>

          {readings.length > 0 && (
            <div className="overflow-x-auto text-[10px] bg-slate-950 rounded-xl border border-white/5 mt-2">
              <table className="w-full border-collapse">
                <thead><tr className="bg-slate-900/80 border-b border-white/10">
                  {['#', 'm(g)', 'F(N)', 'x(cm)', ''].map(h => <th key={h} className="px-3 py-2 text-slate-400 text-left font-semibold">{h}</th>)}
                </tr></thead>
                <tbody>{readings.map((r, i) => (
                  <tr key={i} className="border-b border-white/5 last:border-b-0 hover:bg-white/5 transition-colors">
                    <td className="px-3 py-2 text-slate-500">{i + 1}</td>
                    <td className="px-3 py-2 font-mono text-blue-400">{r.mass}</td>
                    <td className="px-3 py-2 font-mono text-yellow-400">{r.F.toFixed(3)}</td>
                    <td className="px-3 py-2 font-mono text-red-400 font-bold">{r.x.toFixed(2)}</td>
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
          <button onClick={() => { setReadings([]); setMass(100); setShowGraph(false); }}
             className="w-full py-2.5 rounded-xl text-xs bg-slate-800 text-slate-300 flex items-center justify-center gap-1.5 hover:bg-red-900/40 hover:text-red-300 transition-colors mt-2">
             <RotateCcw size={12} /> Reset Canvas
          </button>
        </div>
      </div>
    </div>
  );
};

export default HookesLawLab;
