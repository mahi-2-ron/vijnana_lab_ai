import React, { useState, useMemo } from 'react';
import { RotateCcw, Trash2 } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, RoundedBox, Html, Cylinder, Box, Line } from '@react-three/drei';
import * as THREE from 'three';
import DraggableSlider from './DraggableSlider';

interface Props { hex: string; }
interface Reading { l: number; R: number; X: number; }

const MetreBridgeScene = ({ jockeyX, R_known, isNearBalance, galvDeflection, X_calc }: { jockeyX: number, R_known: number, isNearBalance: boolean, galvDeflection: number, X_calc: number }) => {
  // Constants for physical layout
  const wireLength = 8; // 1 meter scaled
  const wireX0 = -wireLength / 2;
  const jockeyPos = wireX0 + jockeyX * wireLength;

  // Galvanometer needle reference
  const needleRef = React.useRef<THREE.Group>(null);

  useFrame(() => {
    if (needleRef.current) {
        // Needle deflection lerp
        const targetRot = (galvDeflection * Math.PI) / 180;
        needleRef.current.rotation.z = THREE.MathUtils.lerp(needleRef.current.rotation.z, -targetRot, 0.1);
    }
  });

  return (
    <group position={[0, -0.5, 0]}>
      {/* Wooden Base Board */}
      <RoundedBox args={[9, 0.5, 3]} position={[0, -0.25, 0]} radius={0.05} smoothness={4} receiveShadow castShadow>
        <meshPhysicalMaterial color="#451a03" roughness={0.9} map={null} />
      </RoundedBox>

      {/* Resistance Wire (100cm) */}
      <Cylinder args={[0.02, 0.02, wireLength, 16]} position={[0, 0.02, 1]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
        <meshPhysicalMaterial color="#fbbf24" metalness={0.8} roughness={0.2} />
      </Cylinder>
      {/* Meter Scale */}
      <Box args={[wireLength, 0.02, 0.2]} position={[0, 0.01, 1.2]} receiveShadow>
        <meshBasicMaterial color="#e2e8f0" />
      </Box>

      {/* Copper Connecting Strips */}
      <Box args={[0.8, 0.05, 1.5]} position={[-4, 0.025, 0.5]} castShadow><meshPhysicalMaterial color="#b45309" metalness={1} roughness={0.3} /></Box>
      <Box args={[0.8, 0.05, 1.5]} position={[4, 0.025, 0.5]} castShadow><meshPhysicalMaterial color="#b45309" metalness={1} roughness={0.3} /></Box>
      <Box args={[4, 0.05, 0.3]} position={[0, 0.025, -0.1]} castShadow><meshPhysicalMaterial color="#b45309" metalness={1} roughness={0.3} /></Box>

      {/* R Known (Resistance Box) */}
      <RoundedBox args={[1.2, 0.8, 1]} position={[-2, 0.4, -0.8]} radius={0.05} castShadow>
        <meshPhysicalMaterial color="#1e3a8a" roughness={0.6} metalness={0.2} />
        <Html position={[0, 0.5, 0]} center>
          <div className="bg-black/80 px-2 py-0.5 rounded text-[10px] font-mono text-blue-300 border border-blue-500/50 backdrop-blur-md">
            R = {R_known}Ω
          </div>
        </Html>
      </RoundedBox>
      {/* Connecting Wires for R */}
      <Line points={[[-2, 0.4, -0.5], [-2, 0.05, -0.1]]} color="#000" lineWidth={4} />
      <Line points={[[-2.5, 0.4, -0.5], [-3.8, 0.05, 0]]} color="#000" lineWidth={4} />

      {/* X Unknown (Wire Coil Resistor) */}
      <Cylinder args={[0.15, 0.15, 0.8, 16]} position={[2, 0.2, -0.8]} rotation={[0, 0, Math.PI/2]} castShadow>
        <meshPhysicalMaterial color="#10b981" metalness={0.5} roughness={0.6} />
        <Html position={[0, 0.4, 0]} center>
          <div className="bg-black/80 px-2 py-0.5 rounded text-[10px] font-mono text-emerald-300 border border-emerald-500/50 backdrop-blur-md">
            X ≈ {X_calc.toFixed(1)}Ω
          </div>
        </Html>
      </Cylinder>
      {/* Connecting Wires for X */}
      <Line points={[[1.7, 0.2, -0.8], [0.5, 0.05, -0.1]]} color="#ef4444" lineWidth={4} />
      <Line points={[[2.3, 0.2, -0.8], [3.8, 0.05, 0]]} color="#ef4444" lineWidth={4} />

      {/* Galvanometer */}
      <group position={[0, 0.2, -1]}>
        <Cylinder args={[0.6, 0.6, 0.4, 32]} rotation={[Math.PI/2, 0, 0]} castShadow>
          <meshPhysicalMaterial color="#0f172a" roughness={0.8} />
        </Cylinder>
        <Cylinder args={[0.5, 0.5, 0.42, 32]} rotation={[Math.PI/2, 0, 0]}>
          <meshBasicMaterial color="#f8fafc" />
        </Cylinder>
        {/* Scale marks */}
        <group position={[0, 0, 0.22]}>
            <Html center position={[0,-0.2,0]}>
                <div className="font-bold text-[8px] text-slate-800">G</div>
            </Html>
            <group ref={needleRef} position={[0, -0.1, 0]}>
                <mesh position={[0, 0.15, 0]}>
                    <planeGeometry args={[0.02, 0.4]} />
                    <meshBasicMaterial color={isNearBalance ? "#10b981" : "#ef4444"} />
                </mesh>
            </group>
        </group>
      </group>
      {/* Wire from Middle strip to Galvanometer */}
      <Line points={[[0, 0.05, -0.1], [0, 0.1, -0.8]]} color="#3b82f6" lineWidth={3} />

      {/* Jockey and its wire */}
      <group position={[jockeyPos, 0.4, 1]}>
        <Cylinder args={[0.02, 0.1, 0.6, 16]} position={[0, -0.1, 0]} castShadow>
          <meshPhysicalMaterial color="#94a3b8" metalness={0.9} roughness={0.1} />
        </Cylinder>
        <Cylinder args={[0.12, 0.12, 0.4, 16]} position={[0, 0.1, 0]} castShadow>
          <meshPhysicalMaterial color="#020617" roughness={0.8} />
        </Cylinder>
        {isNearBalance && (
            <Html position={[0, 0.5, 0]} center>
                <div className="bg-emerald-500/20 px-2 py-0.5 rounded text-[10px] font-bold text-emerald-300 border border-emerald-500/50 backdrop-blur-md whitespace-nowrap animate-pulse">
                ✓ BALANCE ACHIEVED
                </div>
            </Html>
        )}
        <Html position={[0, -0.5, 0]} center>
            <div className="bg-black/60 px-1.5 py-0.5 rounded text-[10px] font-mono text-amber-300 border border-amber-500/30 backdrop-blur-md">
            l = {(jockeyX * 100).toFixed(1)}cm
            </div>
        </Html>
      </group>
      
      {/* Jockey Wire leading to Galvanometer */}
      {/* Using a bezier-like visual using multiple line segments or just a direct line */}
      <Line points={[[jockeyPos, 0.4, 1], [jockeyPos, 0.8, 0], [0, 0.2, -0.8]]} color="#3b82f6" lineWidth={3} />

    </group>
  );
};

const MetreBridgeLab: React.FC<Props> = ({ hex }) => {
  const [jockeyX, setJockeyX] = useState(0.5); // 0–1 (fraction of wire)
  const [R_known, setR_known] = useState(10);
  const [readings, setReadings] = useState<Reading[]>([]);

  // Physics: X/R = (100-l)/l => X = R*(100-l)/l
  const l = jockeyX * 100; // cm
  const X_calc = R_known * (100 - l) / Math.max(l, 0.1);
  
  // True unknown resistance (simulated = 15Ω for demonstration)
  const R_true = 15;
  const balanceL = R_true / (R_known + R_true) * 100;
  
  // Galvanometer deflection (0 at balance)
  const galvDeflection = Math.tanh((l - balanceL) / 8) * 60; // degrees, simplified
  // 3 degrees threshold for balance visual
  const isNearBalance = Math.abs(l - balanceL) < 1.0; 

  const logReading = () => {
      if(isNearBalance) {
        setReadings(prev => [...prev, { l, R: R_known, X: X_calc }]);
      }
  };

  return (
    <div className="flex flex-col md:flex-row h-full w-full bg-slate-950">
      <div className="flex-1 relative rounded-2xl overflow-hidden m-4 border border-white/10 shadow-2xl">
        <Canvas camera={{ position: [0, 4, 6], fov: 45 }}>
          <Environment preset="apartment" />
          <ambientLight intensity={0.6} />
          <pointLight position={[5, 10, 5]} intensity={1.5} />
          <pointLight position={[-5, 5, -5]} intensity={0.5} color="#3b82f6" />
          
          <MetreBridgeScene 
            jockeyX={jockeyX} 
            R_known={R_known} 
            isNearBalance={isNearBalance} 
            galvDeflection={galvDeflection} 
            X_calc={X_calc} 
          />
          
          <ContactShadows position={[0, -0.8, 0]} opacity={0.7} scale={20} blur={2.5} far={4} color="#000000" />
          <OrbitControls 
            enablePan={true} 
            enableZoom={true} 
            maxPolarAngle={Math.PI / 2 - 0.1} 
            minPolarAngle={0.1} 
          />
        </Canvas>

        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3 shadow-xl max-w-xs">
          <p className="text-[10px] font-bold uppercase tracking-widest text-blue-400 mb-1">Physics Lab — p6</p>
          <p className="text-white font-bold text-sm">3D Metre Bridge</p>
          <p className="text-xs text-slate-400 mt-1">Determine unknown resistance using Wheatstone bridge principle.</p>
        </div>
      </div>

      <div className="w-full md:w-80 bg-slate-900 border-l border-white/5 flex flex-col z-10">
        <div className="p-5 border-b border-white/5">
          <h2 className="text-lg font-black text-white">Controls</h2>
        </div>
        <div className="flex-1 p-5 space-y-5 overflow-y-auto">
          <div className={`p-4 rounded-xl border transition-colors ${isNearBalance ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-blue-500/10 border-blue-500/30'}`}>
            <p className={`text-xs font-medium leading-relaxed ${isNearBalance ? 'text-emerald-300' : 'text-blue-200'}`}>
              {isNearBalance ? '✨ Galvanometer perfectly zeroed. System balanced!' : 'Drag the jockey along the wire until the galvanometer needle hits exactly zero.'}
            </p>
          </div>

          <DraggableSlider label="Jockey Position (l)" min={0.01} max={0.99} step={0.001} value={jockeyX} onChange={setJockeyX} color="#f59e0b" formatValue={v => (v*100).toFixed(1)} unit="cm" />
          <DraggableSlider label="Known Resistance (R)" min={5} max={50} value={R_known} onChange={setR_known} color="#3b82f6" unit="Ω" />

          <div className="grid grid-cols-2 gap-2">
            {[
              { label: 'l (cm)', val: l.toFixed(1), color: '#f59e0b' },
              { label: '(100-l)', val: (100 - l).toFixed(1), color: '#f59e0b' },
              { label: 'X Calc.', val: X_calc.toFixed(2) + ' Ω', color: '#10b981' },
              { label: 'Galv.', val: isNearBalance ? '0.0°' : `${galvDeflection.toFixed(1)}°`, color: isNearBalance ? '#10b981' : '#ef4444' },
            ].map(m => (
              <div key={m.label} className="bg-slate-950/50 border border-white/5 rounded-xl p-3 text-center shadow-sm">
                <div className="text-[9px] text-slate-500 uppercase font-bold tracking-wider mb-1.5">{m.label}</div>
                <div className="font-mono font-bold text-sm" style={{ color: m.color }}>{m.val}</div>
              </div>
            ))}
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-white/5 shadow-inner text-xs space-y-2">
            <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-2 border-b border-white/5 pb-1">Wheatstone Formula</p>
            <p className="font-mono text-indigo-400">X / R = (100 − l) / l</p>
            <p className="font-mono text-indigo-400">X = R × ((100 − l) / l)</p>
          </div>

          <div className="flex gap-2 pt-2">
            <button onClick={logReading} disabled={!isNearBalance}
              className="flex-1 py-3 rounded-xl text-sm font-bold text-white transition-all active:scale-95 disabled:opacity-40 disabled:scale-100 shadow-lg shadow-blue-500/20"
              style={{ backgroundColor: hex }}>
              Save Balance Point
            </button>
            <button onClick={() => { setJockeyX(0.5); setReadings([]); }}
              className="px-4 py-3 rounded-xl bg-slate-800 text-red-400 hover:bg-red-900/30 hover:text-red-300 transition-colors">
              <RotateCcw size={16} />
            </button>
          </div>

          {readings.length > 0 && (
            <div className="overflow-x-auto text-xs bg-slate-950 rounded-xl border border-white/5 shadow-inner">
              <table className="w-full border-collapse">
                <thead><tr className="bg-slate-900/80 border-b border-white/10">
                  {['#', 'l(cm)', 'R(Ω)', 'X(Ω)', ''].map(h => <th key={h} className="px-3 py-2 text-slate-400 text-left font-semibold">{h}</th>)}
                </tr></thead>
                <tbody>{readings.map((r, i) => (
                  <tr key={i} className="border-b border-white/5 last:border-b-0 hover:bg-white/5 transition-colors">
                    <td className="px-3 py-2 text-slate-500">{i + 1}</td>
                    <td className="px-3 py-2 font-mono text-yellow-400/90">{r.l.toFixed(1)}</td>
                    <td className="px-3 py-2 font-mono text-blue-400/90">{r.R.toFixed(1)}</td>
                    <td className="px-3 py-2 font-mono text-emerald-400 font-bold">{r.X.toFixed(2)}</td>
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

export default MetreBridgeLab;
