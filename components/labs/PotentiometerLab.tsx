import React, { useState, useRef } from 'react';
import { RotateCcw, Plus, Trash2 } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, RoundedBox, Html, Cylinder, Box, Line } from '@react-three/drei';
import * as THREE from 'three';
import DraggableSlider from './DraggableSlider';

interface Props { hex: string; }
interface Reading { lBalance: number; Vemf: number; }

const PotentiometerScene = ({ jockeyX, emf1, l1, isNearBalance, galvDeflection, E2_calc }: any) => {
  const wireLength = 8; // 1 meter scaled
  const wireX0 = -wireLength / 2;
  const jockeyPos = wireX0 + jockeyX * wireLength;
  const l1Pos = wireX0 + l1 * wireLength;

  const needleRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (needleRef.current) {
        const targetRot = (galvDeflection / 100) * 0.8; 
        needleRef.current.rotation.z = THREE.MathUtils.lerp(needleRef.current.rotation.z, targetRot, 0.1);
    }
  });

  return (
    <group position={[0, -0.5, 0]}>
      {/* Wooden Base Board */}
      <RoundedBox args={[9, 0.4, 4]} position={[0, -0.2, 0.5]} radius={0.05} smoothness={4} receiveShadow castShadow>
        <meshPhysicalMaterial color="#3e1c00" roughness={0.9} map={null} />
      </RoundedBox>

      {/* Potentiometer Wire */}
      <Cylinder args={[0.02, 0.02, wireLength, 16]} position={[0, 0.02, 1.5]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
        <meshPhysicalMaterial color="#fbbf24" metalness={0.8} roughness={0.2} />
      </Cylinder>
      {/* Meter Scale */}
      <Box args={[wireLength, 0.02, 0.3]} position={[0, 0.01, 1.8]} receiveShadow>
        <meshBasicMaterial color="#e2e8f0" />
      </Box>

      {/* Battery Driver Circuit (E1) Background */}
      <RoundedBox args={[1.5, 0.8, 1]} position={[-2, 0.4, -0.5]} radius={0.05} castShadow>
        <meshPhysicalMaterial color="#1e293b" roughness={0.2} metalness={0.8} />
        <Html position={[0, 0.6, 0]} center>
          <div className="bg-blue-900/80 px-2 py-0.5 rounded text-[10px] font-bold text-blue-300 border border-blue-500/50 backdrop-blur-md">
            Driver (E0)
          </div>
        </Html>
      </RoundedBox>

      {/* Reference Balance Marker (l1) */}
      <group position={[l1Pos, 0.05, 1.5]}>
        <Box args={[0.05, 0.1, 0.6]} position={[0,0,0]}>
          <meshBasicMaterial color="#f59e0b" transparent opacity={0.6} />
        </Box>
        <Html position={[0, 0.4, 0]} center>
          <div className="text-amber-400 text-[10px] whitespace-nowrap bg-black/50 px-1 rounded">l₁ (ref)</div>
        </Html>
      </group>

      {/* Unknown Cell E2 to compare */}
      <RoundedBox args={[1.2, 0.6, 0.8]} position={[2, 0.3, -0.5]} radius={0.05} castShadow>
        <meshPhysicalMaterial color="#064e3b" roughness={0.6} />
        <Html position={[0, 0.5, 0]} center>
          <div className="bg-emerald-900/80 px-2 py-0.5 rounded text-[10px] font-bold text-emerald-300 border border-emerald-500/50 backdrop-blur-md">
            Cell E₂ = ?
          </div>
        </Html>
      </RoundedBox>

      {/* Main Terminal Connectors */}
      <Cylinder args={[0.1, 0.1, 0.2, 16]} position={[-4, 0.1, 1.5]}><meshStandardMaterial color="#b45309" metalness={1} /></Cylinder>
      <Cylinder args={[0.1, 0.1, 0.2, 16]} position={[4, 0.1, 1.5]}><meshStandardMaterial color="#b45309" metalness={1} /></Cylinder>

      {/* Wiring for E0 */}
      <Line points={[[-2, 0.4, 0], [-4, 0.1, 1.5]]} color="#000" lineWidth={3} />
      <Line points={[[-2.5, 0.4, 0], [4, 0.1, 1.5]]} color="#000" lineWidth={3} />

      {/* Galvanometer */}
      <group position={[0, 0.2, 0]}>
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

      {/* E2 connecting to G and Terminal A */}
      <Line points={[[1.7, 0.3, -0.5], [0.3, 0.1, 0]]} color="#ef4444" lineWidth={3} />
      <Line points={[[2.3, 0.3, -0.5], [-4, 0.1, 1.5]]} color="#ef4444" lineWidth={3} />

      {/* Jockey */}
      <group position={[jockeyPos, 0.3, 1.5]}>
        <Cylinder args={[0.02, 0.1, 0.6, 16]} position={[0, 0, 0]} castShadow>
          <meshPhysicalMaterial color="#94a3b8" metalness={0.9} roughness={0.1} />
        </Cylinder>
        <Cylinder args={[0.12, 0.12, 0.4, 16]} position={[0, 0.2, 0]} castShadow>
          <meshPhysicalMaterial color="#020617" roughness={0.8} />
        </Cylinder>
        {isNearBalance && (
            <Html position={[0, 0.6, 0]} center>
                <div className="bg-emerald-500/20 px-2 py-0.5 rounded text-[10px] font-bold text-emerald-300 border border-emerald-500/50 backdrop-blur-md whitespace-nowrap animate-pulse">
                ✓ NULL POINT
                </div>
            </Html>
        )}
        <Html position={[0, -0.4, 0]} center>
            <div className={`bg-black/80 px-1.5 py-0.5 rounded text-[10px] font-mono border backdrop-blur-md ${isNearBalance ? 'text-emerald-400 border-emerald-500/50' : 'text-amber-300 border-amber-500/30'}`}>
            l₂ = {(jockeyX * 100).toFixed(1)}cm
            </div>
        </Html>
      </group>
      
      {/* Jockey Wire leading to Galvanometer */}
      <Line points={[[jockeyPos, 0.4, 1.5], [jockeyPos-0.2, 0.6, 0.8], [-0.3, 0.1, 0]]} color="#3b82f6" lineWidth={2} />

    </group>
  );
};


const PotentiometerLab: React.FC<Props> = ({ hex }) => {
  const [jockeyX, setJockeyX] = useState(0.5);
  const [emf1] = useState(2.0); // known EMF E1 (standard cell) Volts
  const [l1] = useState(0.6); // balance length for E1
  const [reading, setReading] = useState<Reading | null>(null);

  // Unknown EMF E2
  const l2 = jockeyX;  
  const E2_calc = emf1 * (l2 / l1); 
  const galvDeflection = (l2 - l1) * 100; 
  const isNearBalance = Math.abs(galvDeflection) < 3;

  return (
    <div className="flex flex-col md:flex-row h-full w-full bg-slate-950">
      
      {/* 3D Viewport */}
      <div className="flex-1 relative rounded-2xl overflow-hidden m-4 border border-white/10 shadow-2xl">
        <Canvas camera={{ position: [0, 5, 8], fov: 45 }}>
          <Environment preset="apartment" />
          <ambientLight intensity={0.5} />
          <pointLight position={[5, 10, 5]} intensity={1} />
          <pointLight position={[-5, 5, -5]} intensity={0.5} color="#f59e0b" />
          
          <PotentiometerScene 
            jockeyX={jockeyX} 
            emf1={emf1} 
            l1={l1} 
            isNearBalance={isNearBalance} 
            galvDeflection={galvDeflection} 
            E2_calc={E2_calc} 
          />
          
          <ContactShadows position={[0, -0.7, 0]} opacity={0.6} scale={20} blur={2.5} far={4} color="#000000" />
          <OrbitControls enablePan={true} enableZoom={true} maxPolarAngle={Math.PI / 2 - 0.1} />
        </Canvas>

        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3 shadow-xl max-w-xs">
          <p className="text-[10px] font-bold uppercase tracking-widest text-amber-400 mb-1">Physics Lab — p16</p>
          <p className="text-white font-bold text-sm">3D Potentiometer</p>
          <p className="text-xs text-slate-400 mt-1">Determine EMF of a cell precisely without drawing current.</p>
        </div>
      </div>

      {/* UI Controls */}
      <div className="w-full md:w-[320px] bg-[#0a0a0a] border-l border-white/5 flex flex-col z-10 shrink-0">
        <div className="p-5 border-b border-white/5">
          <h2 className="text-lg font-black text-white">Controls</h2>
        </div>
        
        <div className="flex-1 p-5 space-y-6 overflow-y-auto">
          <div className={`p-4 rounded-xl border transition-colors ${isNearBalance ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-amber-500/10 border-amber-500/30'}`}>
            <p className={`text-xs font-medium leading-relaxed ${isNearBalance ? 'text-emerald-300' : 'text-amber-200'}`}>
              {isNearBalance ? '✨ Null point achieved. The reading is absolute.' : 'Drag the jockey along the wire until the galvanometer needle reads exactly zero (Null point).'}
            </p>
          </div>

          <DraggableSlider 
            label="Jockey Position (l₂)" 
            min={0.01} max={0.99} step={0.001} 
            value={jockeyX} onChange={setJockeyX} 
            color="#f59e0b" formatValue={v => (v*100).toFixed(1)} unit="cm" 
          />

          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'E₁ (ref std)', val: `${emf1.toFixed(2)}V`, color: '#3b82f6' },
              { label: 'l₁ (ref len)', val: `${(l1 * 100).toFixed(1)}cm`, color: '#f59e0b' },
              { label: 'E₂ = E₁×(l₂/l₁)', val: `${E2_calc.toFixed(3)}V`, color: '#10b981' },
              { label: 'Galvanometer', val: isNearBalance ? 'NULL ✓' : `${galvDeflection.toFixed(1)}μA`, color: isNearBalance ? '#10b981' : '#ef4444' },
            ].map(m => (
              <div key={m.label} className="bg-slate-950/80 border border-white/5 rounded-xl p-3 text-center shadow-inner">
                <div className="text-[9px] text-slate-500 uppercase font-bold tracking-wider mb-1.5">{m.label}</div>
                <div className="font-mono font-bold text-sm" style={{ color: m.color }}>{m.val}</div>
              </div>
            ))}
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-white/5 shadow-inner text-xs space-y-2">
            <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-2 border-b border-white/5 pb-1">Potentiometer Logic</p>
            <p className="font-mono text-amber-400">E₁ / E₂ = l₁ / l₂</p>
            <p className="text-slate-500 text-[10px] leading-relaxed mt-2">At the null point, no current is drawn from the cell, meaning we measure the true Electro-Motive Force (EMF) unlike a standard voltmeter.</p>
          </div>

          <div className="flex gap-2">
            <button 
              onClick={() => setReading({ lBalance: jockeyX * 100, Vemf: E2_calc })}
              disabled={!isNearBalance}
              className="flex-1 py-3.5 rounded-xl text-xs font-bold text-white shadow-lg transition-all active:scale-95 disabled:opacity-40 disabled:scale-100" 
              style={{ backgroundColor: hex, boxShadow: `0 8px 20px -8px ${hex}` }}>
              Record Balance
            </button>
            <button 
              onClick={() => { setReading(null); setJockeyX(0.5); }}
              className="px-4 py-3 rounded-xl bg-slate-800 text-red-400 hover:bg-red-900/30 transition-colors">
              <RotateCcw size={16} />
            </button>
          </div>

          {reading && (
            <div className="bg-emerald-900/20 border border-emerald-500/30 p-4 rounded-xl backdrop-blur-md">
              <p className="text-emerald-400 text-[10px] font-bold uppercase tracking-widest mb-2 border-b border-emerald-500/20 pb-1">Verified Reading</p>
              <div className="flex justify-between items-center">
                  <p className="font-mono text-emerald-200 text-xs">l₂ = {reading.lBalance.toFixed(1)} cm</p>
                  <p className="font-mono text-emerald-400 text-lg font-black">E₂ = {reading.Vemf.toFixed(3)} V</p>
              </div>
            </div>
          )}
        </div>
      </div>
      
    </div>
  );
};

export default PotentiometerLab;
