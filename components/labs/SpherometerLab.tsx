import React, { useRef, useState } from 'react';
import { RotateCcw, Trash2 } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Html, Cylinder } from '@react-three/drei';
import * as THREE from 'three';
import DraggableSlider from './DraggableSlider';

interface Props { hex: string; }
interface Reading { pitch: number; divisions: number; h: number; R: number; }

const GlassSurface = ({ R_mm, h_mm }: { R_mm: number, h_mm: number }) => {
  // If h is basically 0, it's a flat glass slab
  const isFlat = h_mm < 0.001;
  const visualScale = 0.1; 
  
  if (isFlat) {
    return (
      <mesh position={[0, -0.2, 0]} receiveShadow>
        <boxGeometry args={[10, 0.4, 10]} />
        <meshPhysicalMaterial 
          transmission={0.9} thickness={0.5} roughness={0} 
          ior={1.5} color="#e0f2fe" clearcoat={1} 
        />
      </mesh>
    );
  }

  // Create a spherical cap (plano-convex lens)
  // Radius R_scaled, center is at y = -R_scaled, so top of sphere is at y=0.
  const R_scaled = R_mm * visualScale;
  const capAngle = Math.asin((35 * visualScale) / R_scaled) * 1.5; // Draw slightly larger than spherometer legs

  return (
    <mesh position={[0, -R_scaled, 0]} receiveShadow>
      <sphereGeometry args={[R_scaled, 64, 64, 0, Math.PI * 2, 0, capAngle]} />
      <meshPhysicalMaterial 
        transmission={0.95} thickness={2} roughness={0} 
        ior={1.5} color="#bae6fd" clearcoat={1} side={THREE.DoubleSide}
      />
    </mesh>
  );
};

const SpherometerScene = ({ h_mm, rotating, divisions }: { h_mm: number, rotating: boolean, divisions: number }) => {
  const visualScale = 0.1;
  const h_scaled = h_mm * visualScale;
  const l_mm = 35; // distance between legs roughly
  const legRad = (l_mm / Math.sqrt(3)) * visualScale;

  const screwGroupRef = useRef<THREE.Group>(null);
  const rotAngleRef = useRef(0);

  // Animate rotation of the circular scale
  useFrame(() => {
    if (screwGroupRef.current) {
      if (rotating) {
        rotAngleRef.current += 0.05;
      }
      // Ensure the disc always visually rotates if the user slides the pitch manually
      // We lock Z rotation to the divisions state if not auto-rotating
      const angle = rotating ? rotAngleRef.current : (divisions / 100) * Math.PI * 2;
      screwGroupRef.current.rotation.y = angle;
    }
  });

  return (
    <group position={[0, h_scaled > 0 ? 0.3 : 0, 0]}> {/* Shift scene up slightly so legs touch glass correctly */}
      
      {/* 3 Outer Legs */}
      {[0, 120, 240].map((deg, i) => {
        const rad = deg * Math.PI / 180;
        const x = legRad * Math.cos(rad);
        const z = legRad * Math.sin(rad);
        return (
          <group key={i} position={[x, 0, z]}>
             <mesh position={[0, 1.5, 0]} castShadow>
               <cylinderGeometry args={[0.08, 0.08, 3, 16]} />
               <meshStandardMaterial color="#cbd5e1" metalness={0.8} roughness={0.3} />
             </mesh>
             {/* Leg tip (sharp) */}
             <mesh position={[0, 0, 0]} castShadow>
               <coneGeometry args={[0.08, 0.2, 16]} />
               <meshStandardMaterial color="#94a3b8" metalness={0.8} />
             </mesh>
          </group>
        );
      })}

      {/* Main Framework Ring (holding legs together) */}
      <mesh position={[0, 2.5, 0]} castShadow>
         <torusGeometry args={[legRad, 0.15, 16, 64]} />
         <meshStandardMaterial color="#475569" metalness={0.7} roughness={0.4} />
      </mesh>
      
      {/* 3 spokes from ring to center */}
      {[0, 120, 240].map((deg, i) => {
        const rad = deg * Math.PI / 180;
        return (
          <mesh key={i} position={[(legRad/2)*Math.cos(rad), 2.5, (legRad/2)*Math.sin(rad)]} rotation={[Math.PI/2, 0, rad + Math.PI/2]} castShadow>
             <cylinderGeometry args={[0.08, 0.08, legRad, 16]} />
             <meshStandardMaterial color="#475569" metalness={0.7} />
          </mesh>
        );
      })}

      {/* Central Threaded Hub */}
      <mesh position={[0, 2.5, 0]} castShadow>
         <cylinderGeometry args={[0.3, 0.3, 0.6, 32]} />
         <meshStandardMaterial color="#334155" metalness={0.6} />
      </mesh>

      {/* Central Moving Screw & Circular Scale */}
      {/* The screw tip ends at y = h_scaled. (The 3 legs rest at y=0) */}
      <group position={[0, h_scaled, 0]}>
         {/* Screw Shaft */}
         <mesh position={[0, 2, 0]} castShadow>
            <cylinderGeometry args={[0.12, 0.12, 4, 16]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.3} />
         </mesh>
         
         {/* Screw tip */}
         <mesh position={[0, 0, 0]} castShadow>
            <coneGeometry args={[0.12, 0.3, 16]} />
            <meshStandardMaterial color="#f59e0b" metalness={0.9} roughness={0.2} />
         </mesh>

         {/* Circular Scale Disc and Handle (Rotates) */}
         <group ref={screwGroupRef} position={[0, 4, 0]}>
            {/* The main dial */}
            <mesh castShadow>
               <cylinderGeometry args={[1.5, 1.5, 0.1, 64]} />
               <meshStandardMaterial color="#1e293b" />
            </mesh>
            {/* Tick marks on dial edges */}
            {Array.from({ length: 100 }).map((_, i) => (
               <mesh key={i} position={[1.4 * Math.cos(i/100 * Math.PI * 2), 0.06, 1.4 * Math.sin(i/100 * Math.PI * 2)]} rotation={[0, -i/100 * Math.PI * 2, 0]}>
                 <boxGeometry args={[0.15, 0.01, 0.02]} />
                 <meshBasicMaterial color={i % 10 === 0 ? "#f8fafc" : "#64748b"} />
               </mesh>
            ))}
            {/* Handle on top of dial */}
            <mesh position={[0, 0.4, 0]} castShadow>
               <cylinderGeometry args={[0.2, 0.2, 0.8, 16]} />
               <meshStandardMaterial color="#475569" metalness={0.5} roughness={0.8} />
            </mesh>
         </group>
      </group>

      {/* Main Pitch Scale (Vertical Ruler) */}
      <mesh position={[0.4, 2.5, 0]}>
         <boxGeometry args={[0.05, 3, 0.4]} />
         <meshStandardMaterial color="#94a3b8" metalness={0.8} />
      </mesh>
      
      {/* Zero line indicator (Red) */}
      <mesh position={[0.45, 2.5 + h_scaled, 0.2]}>
         <boxGeometry args={[0.1, 0.02, 0.05]} />
         <meshBasicMaterial color="#ef4444" />
      </mesh>

      {/* Glass Surface placed underneath */}
      <GlassSurface R_mm={h_mm > 0 ? ((35*35)/(6*h_mm) + h_mm/2) : 10000} h_mm={h_mm} />
    </group>
  );
};


const SpherometerLab: React.FC<Props> = ({ hex }) => {
  const [divisions, setDivisions] = useState(20); 
  const [pitchDivs] = useState(100); 
  const [rotating, setRotating] = useState(false);
  const [readings, setReadings] = useState<Reading[]>([]);

  const pitch = 1 / pitchDivs * 10; // mm
  const lc = pitch / pitchDivs; // least count
  const h = divisions * lc; // sagitta in mm
  
  // R = (l^2 / 6h) + h/2. l = 35mm
  const l = 35;
  const R = (l * l / (6 * h)) + h / 2;

  return (
    <div className="flex flex-col md:flex-row h-full w-full bg-slate-950">
      <div className="flex-1 relative rounded-2xl overflow-hidden m-4 border border-white/10 shadow-2xl">
        <Canvas camera={{ position: [0, 4, 6], fov: 50 }}>
          <Environment preset="studio" />
          <ambientLight intensity={0.7} />
          <pointLight position={[5, 10, 5]} intensity={1.5} color="#e0f2fe" />
          <pointLight position={[-5, 2, -5]} intensity={0.5} />
          
          <SpherometerScene h_mm={h} rotating={rotating} divisions={divisions} />
          
          <ContactShadows position={[0, -0.6, 0]} opacity={0.3} scale={15} blur={2.5} far={4} color="#020617" />
          <OrbitControls enablePan={true} enableZoom={true} target={[0, 1.5, 0]} maxPolarAngle={Math.PI/2 - 0.05} />
        </Canvas>

        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3 shadow-xl max-w-xs">
          <p className="text-[10px] font-bold uppercase tracking-widest text-violet-400 mb-1">Physics Lab — p13</p>
          <p className="text-white font-bold text-sm">3D Spherometer</p>
          <p className="text-xs text-slate-400 mt-1">Directly simulates precision screw mechanics on a curved plano-convex lens.</p>
        </div>
      </div>

      <div className="w-full md:w-72 bg-slate-900 border-l border-white/5 flex flex-col z-10">
        <div className="p-5 border-b border-white/5">
           <h2 className="text-lg font-black text-white">Controls</h2>
        </div>
        <div className="flex-1 p-5 space-y-4 overflow-y-auto">
          <div className="bg-violet-500/10 border border-violet-500/30 p-3 rounded-xl shadow-inner">
            <p className="text-violet-200 text-xs leading-relaxed">Adjust the circular scale divisions manually, or click Animate to see the screw descend onto the curved surface.</p>
          </div>

          <DraggableSlider label="Circular Scale (div)" min={0} max={100} value={divisions} onChange={setDivisions} color="#a78bfa" unit="div" />
          <button onClick={() => setRotating(r => !r)}
            className={`w-full py-3 rounded-xl text-xs font-bold transition-all shadow-md ${rotating ? 'bg-violet-600 text-white shadow-violet-500/30' : 'bg-slate-800 text-slate-300 hover:bg-violet-900/40 hover:text-violet-300'}`}>
            {rotating ? '⏸ Stop Auto-Rotation' : '▶️ Auto-Rotate Screw'}
          </button>

          <div className="grid grid-cols-2 gap-2 mt-4">
            {[
              { label: 'Pitch', val: `${pitch.toFixed(3)} mm`, color: '#f59e0b' },
              { label: 'Least Count', val: lc.toFixed(5), color: '#fb923c' },
              { label: 'Sagitta (h)', val: `${h.toFixed(4)} mm`, color: '#10b981' },
              { label: 'Radius (R)', val: `${R > 9999 ? '∞' : R.toFixed(2)} mm`, color: '#a78bfa' },
            ].map(m => (
              <div key={m.label} className="bg-slate-950/50 border border-white/5 rounded-xl p-2.5 text-center shadow-sm">
                <div className="text-[9px] text-slate-500 uppercase font-bold tracking-wider mb-1">{m.label}</div>
                <div className="font-mono font-bold text-sm bg-black/20 rounded py-0.5" style={{ color: m.color }}>{m.val}</div>
              </div>
            ))}
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-white/5 shadow-inner text-xs space-y-1.5 mt-2">
            <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-1 border-b border-white/5 pb-1">Mathematical Relation</p>
            <p className="font-mono text-violet-400 pt-1">R = (l² / 6h) + (h / 2)</p>
            <p className="font-mono text-violet-300">h = div × LC</p>
            <p className="font-mono text-slate-500 text-[9px] mt-1">l = 35 mm (distance between legs)</p>
          </div>

          <div className="flex gap-2 pt-2">
            <button onClick={() => setReadings(prev => [...prev, { pitch, divisions, h, R }])}
              className="flex-1 py-3 rounded-xl text-sm font-bold text-white transition-all active:scale-95 shadow-lg shadow-violet-600/20"
              style={{ backgroundColor: hex }}>
              Log Reading
            </button>
            <button onClick={() => setReadings([])}
              className="px-4 py-3 rounded-xl bg-slate-800 text-red-400 hover:bg-red-900/30 hover:text-red-300 transition-colors">
              <RotateCcw size={16} />
            </button>
          </div>

          {readings.length > 0 && (
            <div className="overflow-x-auto text-[10px] bg-slate-950 rounded-xl border border-white/5 mt-2">
              <table className="w-full border-collapse">
                <thead><tr className="bg-slate-900/80 border-b border-white/10">
                  {['#', 'div', 'h(mm)', 'R(mm)', ''].map(h => <th key={h} className="px-3 py-2 text-slate-400 text-left font-semibold">{h}</th>)}
                </tr></thead>
                <tbody>{readings.map((r, i) => (
                  <tr key={i} className="border-b border-white/5 last:border-b-0 hover:bg-white/5 transition-colors">
                    <td className="px-3 py-2 text-slate-500">{i + 1}</td>
                    <td className="px-3 py-2 font-mono text-yellow-500">{r.divisions}</td>
                    <td className="px-3 py-2 font-mono text-green-400">{r.h.toFixed(4)}</td>
                    <td className="px-3 py-2 font-mono text-violet-400 font-bold">{r.R > 9999 ? '∞' : r.R.toFixed(2)}</td>
                    <td className="px-3 py-2 text-right">
                       <button onClick={() => setReadings(p => p.filter((_, j) => j !== i))} className="text-slate-600 hover:text-red-400 transition-colors">
                         <Trash2 size={12} />
                       </button>
                    </td>
                  </tr>
                ))}</tbody>
              </table>
              {readings.filter(r => r.R < 9999).length > 1 && (
                <div className="p-2 border-t border-white/10 bg-black/40">
                   <p className="text-center font-mono text-xs text-violet-400 font-bold">
                     Mean R = {(readings.filter(r => r.R < 9999).reduce((a, b) => a + b.R, 0) / readings.filter(r => r.R < 9999).length).toFixed(2)} mm
                   </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpherometerLab;
