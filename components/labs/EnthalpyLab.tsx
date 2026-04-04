import React, { useRef, useEffect, useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Html, Text } from '@react-three/drei';
import * as THREE from 'three';
import DraggableSlider from './DraggableSlider';

interface Props { hex: string; }

const CalorimeterScene = ({ mixing, mixed, mixProgress, dT, tempFinal }: any) => {
  const stirRef = useRef<THREE.Mesh>(null);
  const leftBeakerRef = useRef<THREE.Group>(null);
  const rightBeakerRef = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    // Stirrer spinning logic
    if (mixing && stirRef.current) {
      stirRef.current.rotation.y = clock.elapsedTime * 15;
    } else if (stirRef.current) {
      stirRef.current.rotation.y = 0;
    }

    // Beaker pouring animation logic 
    if (leftBeakerRef.current && rightBeakerRef.current) {
      if (mixing || mixed) {
        // Move towards center and tilt
        const p = Math.min(1, mixProgress * 2); // fill/tilt quick
        leftBeakerRef.current.position.set(-2 + p * 1.2, 0.5 + p * 1.5, 0);
        leftBeakerRef.current.rotation.z = -p * (Math.PI / 2.5);

        rightBeakerRef.current.position.set(2 - p * 1.2, 0.5 + p * 1.5, 0);
        rightBeakerRef.current.rotation.z = p * (Math.PI / 2.5);
      } else {
        // Reset positions
        leftBeakerRef.current.position.set(-2, 0.5, 0);
        leftBeakerRef.current.rotation.z = 0;
        
        rightBeakerRef.current.position.set(2, 0.5, 0);
        rightBeakerRef.current.rotation.z = 0;
      }
    }
  });

  const liquidColor = mixed ? new THREE.Color().setHSL(0.05 + 0.1*(dT/20), 0.8, 0.5) : new THREE.Color("#93c5fd");
  
  return (
    <group position={[0, -1, 0]}>
      {/* Polystyrene Calorimeter Cup */}
      <mesh position={[0, 0, 0]} castShadow>
        <cylinderGeometry args={[1, 0.8, 2, 32]} />
        <meshStandardMaterial color="#f1f5f9" roughness={0.9} metalness={0} />
      </mesh>
      {/* Cup Lip */}
      <mesh position={[0, 1, 0]} castShadow>
         <torusGeometry args={[1, 0.08, 16, 32]} />
         <meshStandardMaterial color="#e2e8f0" roughness={0.9} />
      </mesh>

      {/* Internal Liquid level rising during mix */}
      <mesh position={[0, -0.8 + mixProgress * 1.3, 0]}>
         <cylinderGeometry args={[0.85, 0.75, Math.max(0.01, mixProgress * 1.6), 32]} />
         <meshPhysicalMaterial transmission={0.4} color={liquidColor} roughness={0.1} />
      </mesh>

      {/* Thermometer */}
      <group position={[0.4, 0, 0.2]} rotation={[0.1, 0, -0.1]}>
         <mesh position={[0, 1.5, 0]} castShadow>
           <cylinderGeometry args={[0.06, 0.06, 3.5, 16]} />
           <meshPhysicalMaterial transmission={0.9} roughness={0} color="#cbd5e1" transparent opacity={0.6} />
         </mesh>
         <mesh position={[0, -0.2, 0]}>
           <sphereGeometry args={[0.12, 16, 16]} />
           <meshPhysicalMaterial color={mixing || mixed ? "#ef4444" : "#3b82f6"} clearcoat={1} />
         </mesh>
         {/* Mercury internal line */}
         <mesh position={[0, 0.5 + (tempFinal - 25)*0.05, 0]}>
           <cylinderGeometry args={[0.015, 0.015, Math.max(0.01, 1 + (tempFinal - 25)*0.1), 8]} />
           <meshBasicMaterial color={mixing || mixed ? "#ef4444" : "#3b82f6"} />
         </mesh>
         <Html position={[0.2, 3, 0]} center>
           <div className="text-[10px] font-bold bg-black/60 rounded px-1.5 py-0.5 text-white whitespace-nowrap">
             {tempFinal.toFixed(1)}°C
           </div>
         </Html>
      </group>

      {/* Stirrer */}
      <group ref={stirRef} position={[-0.3, 0.5, -0.2]} rotation={[0.1, 0, 0.1]}>
         <mesh position={[0, 0.5, 0]}><cylinderGeometry args={[0.02, 0.02, 3, 8]} /><meshStandardMaterial color="#94a3b8" /></mesh>
         <mesh position={[0, -0.8, 0]}><boxGeometry args={[0.4, 0.1, 0.02]} /><meshStandardMaterial color="#94a3b8" /></mesh>
         <mesh position={[0, -0.9, 0]}><boxGeometry args={[0.02, 0.2, 0.4]} /><meshStandardMaterial color="#94a3b8" /></mesh>
      </group>

      {/* Acid Beaker (HCl) */}
      <group ref={leftBeakerRef} position={[-2, 0.5, 0]}>
         <mesh><cylinderGeometry args={[0.4, 0.4, 1, 32, 1, true]} /><meshPhysicalMaterial transmission={0.9} color="#fee2e2" /></mesh>
         <mesh position={[0, -0.5, 0]}><cylinderGeometry args={[0.4, 0.4, 0.05, 32]} /><meshPhysicalMaterial transmission={0.9} color="#fee2e2" /></mesh>
         {/* Liquid goes down during mix */}
         {mixProgress < 0.9 && (
           <mesh position={[0, -0.45 + (0.8 * (1 - mixProgress))/2, 0]}>
              <cylinderGeometry args={[0.38, 0.38, 0.8 * (1 - mixProgress), 32]} />
              <meshPhysicalMaterial transmission={0.6} color="#f87171" />
           </mesh>
         )}
         {/* Pouring stream */}
         {mixing && mixProgress > 0 && mixProgress < 0.9 && (
           <mesh position={[0.4, 0.3, 0]} rotation={[0,0,-Math.PI/4]}>
              <cylinderGeometry args={[0.05, 0.02, 2.5]} />
              <meshBasicMaterial color="#f87171" transparent opacity={0.6} />
           </mesh>
         )}
         <Html position={[-0.6, 0, 0]}><div className="text-[10px] bg-red-900/60 font-bold text-red-200 px-1 rounded">HCl</div></Html>
      </group>

      {/* Base Beaker (NaOH) */}
      <group ref={rightBeakerRef} position={[2, 0.5, 0]}>
         <mesh><cylinderGeometry args={[0.4, 0.4, 1, 32, 1, true]} /><meshPhysicalMaterial transmission={0.9} color="#e0e7ff" /></mesh>
         <mesh position={[0, -0.5, 0]}><cylinderGeometry args={[0.4, 0.4, 0.05, 32]} /><meshPhysicalMaterial transmission={0.9} color="#e0e7ff" /></mesh>
         {mixProgress < 0.9 && (
           <mesh position={[0, -0.45 + (0.8 * (1 - mixProgress))/2, 0]}>
              <cylinderGeometry args={[0.38, 0.38, 0.8 * (1 - mixProgress), 32]} />
              <meshPhysicalMaterial transmission={0.6} color="#818cf8" />
           </mesh>
         )}
         {mixing && mixProgress > 0 && mixProgress < 0.9 && (
           <mesh position={[-0.4, 0.3, 0]} rotation={[0,0,Math.PI/4]}>
              <cylinderGeometry args={[0.05, 0.02, 2.5]} />
              <meshBasicMaterial color="#818cf8" transparent opacity={0.6} />
           </mesh>
         )}
         <Html position={[0.6, 0, 0]}><div className="text-[10px] bg-indigo-900/60 font-bold text-indigo-200 px-1 rounded">NaOH</div></Html>
      </group>
    </group>
  )
};

const EnthalpyLab: React.FC<Props> = ({ hex }) => {
  const [mixed, setMixed] = useState(false);
  const [tempInitial] = useState(25.0); 
  const [tempFinal, setTempFinal] = useState(25.0);
  const [mass, setMass] = useState(100); 
  const [mixing, setMixing] = useState(false);
  const [mixProgress, setMixProgress] = useState(0);

  const c = 4.18; 
  const dT = tempFinal - tempInitial;
  const heat_joules = mass * c * dT; 
  const moles = (mass / 1000) * 0.1; 
  const dH_per_mol = moles > 0 ? -(heat_joules / 1000 / moles) : 0;

  useEffect(() => {
    if (!mixing) return;
    const id = setInterval(() => {
      setMixProgress(p => {
        if (p >= 1) {
          clearInterval(id);
          setMixed(true);
          setMixing(false);
          setTempFinal(tempInitial + 8.5 * (mass / 100));
          return 1;
        }
        // As mixing progresses, temperature rises simultaneously
        if (p > 0.2) setTempFinal(tempInitial + (8.5 * (mass / 100)) * (p-0.2)/0.8);
        return p + 0.015;
      });
    }, 50);
    return () => clearInterval(id);
  }, [mixing, mass, tempInitial]);

  const mix = () => { if (!mixed) { setMixing(true); setMixProgress(0); } };
  const reset = () => { setMixed(false); setMixing(false); setTempFinal(25); setMixProgress(0); };

  return (
    <div className="flex flex-col md:flex-row h-full w-full bg-slate-950">
      <div className="flex-1 relative rounded-2xl overflow-hidden m-4 border border-white/10 shadow-2xl">
        <Canvas camera={{ position: [0, 2, 7], fov: 55 }}>
          <Environment preset="apartment" />
          <ambientLight intensity={0.6} />
          <pointLight position={[5, 10, 5]} intensity={1.2} color="#fecdd3" />
          <pointLight position={[-5, 2, 5]} intensity={0.5} />
          
          <CalorimeterScene mixing={mixing} mixed={mixed} mixProgress={mixProgress} dT={dT} tempFinal={tempFinal} />
          
          <ContactShadows position={[0, -1, 0]} opacity={0.5} scale={10} blur={2.5} far={4} color="#000" />
          <OrbitControls enablePan={true} enableZoom={true} target={[0, 0, 0]} maxPolarAngle={Math.PI/2 - 0.1} />
        </Canvas>

        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3 shadow-xl max-w-xs">
          <p className="text-[10px] font-bold uppercase tracking-widest text-rose-400 mb-1">Chemistry Lab — c10</p>
          <p className="text-white font-bold text-sm">3D Enthalpy of Neutralization</p>
          <p className="text-xs text-slate-400 mt-1">Measure heat evolved in insulated calorimeter when mixing strong acid and base.</p>
        </div>
      </div>

      <div className="w-full md:w-72 bg-slate-900 border-l border-white/5 flex flex-col z-10">
        <div className="p-5 border-b border-white/5">
           <h2 className="text-lg font-black text-white">Controls</h2>
        </div>
        <div className="flex-1 p-5 space-y-4 overflow-y-auto">
          <div className={`p-3 rounded-xl border shadow-inner transition-colors duration-500 ${mixed ? 'bg-green-500/10 border-green-500/30' : 'bg-rose-500/10 border-rose-500/30'}`}>
            <p className={`text-xs ${mixed ? 'text-green-300 font-bold' : 'text-rose-200'}`}>
              {mixed ? `✅ Reaction complete! Temp rose by +${dT.toFixed(1)}°C.` : 'Set total volume of reactants and click "Mix" to capture calorimetric changes.'}
            </p>
          </div>

          <DraggableSlider label="System Mass" min={50} max={200} step={10} value={mass} onChange={v => { setMass(v); reset(); }} color="#f43f5e" unit="g" />

          <div className="grid grid-cols-2 gap-2 mt-4">
            {[
              { label: 'Initial (T₁)', val: `${tempInitial.toFixed(1)}°C`, color: '#60a5fa' },
              { label: 'Final (T₂)', val: `${tempFinal.toFixed(1)}°C`, color: mixed ? '#ef4444' : '#94a3b8' },
              { label: 'Temp (ΔT)', val: `${dT.toFixed(2)}°C`, color: '#fbbf24' },
              { label: 'Heat Q(kJ)', val: `${(heat_joules / 1000).toFixed(3)}`, color: '#4ade80' },
              { label: 'Enthalpy ΔH', val: mixed ? `${dH_per_mol.toFixed(2)}` : '—', color: '#f472b6' },
              { label: 'Lit. value', val: '-57.1 kJ/mol', color: '#94a3b8' },
            ].map(m => (
              <div key={m.label} className="bg-slate-950/50 border border-white/5 rounded-xl p-2.5 text-center shadow-sm">
                <div className="text-[9px] text-slate-500 uppercase font-bold tracking-wider mb-1">{m.label}</div>
                <div className="font-mono font-bold text-sm bg-black/20 rounded py-0.5" style={{ color: m.color }}>{m.val}</div>
              </div>
            ))}
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-white/5 shadow-inner text-xs space-y-1.5 mt-2">
            <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-1 border-b border-white/5 pb-1">Thermodynamics</p>
            <p className="font-mono text-rose-400 pt-1">Q = m × c × ΔT</p>
            <p className="font-mono text-rose-300 pt-1">ΔH = -Q / n <span className="text-[10px] text-slate-500">(kJ/mol)</span></p>
            <p className="font-mono text-slate-500 text-[9px] mt-1 border-t border-white/5 pt-1">HCl + NaOH → NaCl + H₂O</p>
          </div>

          <div className="flex gap-2 pt-2">
            <button onClick={mix} disabled={mixed || mixing}
              className="flex-1 py-3 rounded-xl text-sm font-bold text-white transition-all shadow-lg bg-rose-600 hover:bg-rose-500 shadow-rose-600/20 active:scale-95 disabled:opacity-50">
              {mixing ? '🔄 Mixing & Reacting...' : '⚗️ Mix Solutions'}
            </button>
            <button onClick={reset}
              className="px-4 py-3 rounded-xl bg-slate-800 text-red-400 hover:bg-red-900/30 transition-colors">
              <RotateCcw size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnthalpyLab;
