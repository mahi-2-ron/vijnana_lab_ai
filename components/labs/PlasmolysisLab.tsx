import React, { useRef, useEffect, useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, RoundedBox, Html, Text } from '@react-three/drei';
import * as THREE from 'three';

interface Props { hex: string; }

const PlantCell = ({ position, saltConc, plasmolysisLevel, label, showArrows }: any) => {
  const shrink = plasmolysisLevel / 100;
  
  // Membrane scaling
  const mShrink = 1 - shrink * 0.35;
  const mScaleV = new THREE.Vector3(mShrink, mShrink, mShrink);
  
  // Vacuole scaling 
  const vShrink = 1 - shrink * 0.8;
  const vScaleV = new THREE.Vector3(vShrink, vShrink, vShrink);

  const isTurgid = plasmolysisLevel < 10;
  const isFlaccid = plasmolysisLevel >= 10 && plasmolysisLevel < 40;
  
  const mColor = isTurgid ? '#86efac' : isFlaccid ? '#4ade80' : '#16a34a';
  const vColor = isTurgid ? '#93c5fd' : '#60a5fa';

  const tRef = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
     if(tRef.current && showArrows) {
        // Arrow particle flow
        tRef.current.children.forEach((c: any, i: number) => {
           if(c.isMesh) {
              const speed = isTurgid ? -0.5 : 0.5; // Turgid: inward (endosmosis), Plasmolysed: outward (exosmosis)
              // If flaccid (isotonic), no net movement, arrows hover
              if (plasmolysisLevel > 10 && plasmolysisLevel < 25) {
                 c.position.y = c.userData.oy + Math.sin(clock.elapsedTime * 2 + i) * 0.05;
                 c.material.opacity = 0;
                 return;
              }
              
              c.material.opacity = 0.6;
              const tPhase = (clock.elapsedTime * speed + i * 0.2) % 1;
              const phase = tPhase < 0 ? 1 + tPhase : tPhase;
              
              const startR = isTurgid ? 1.5 : (0.5 * mShrink);
              const endR = isTurgid ? 0.5 : 1.5;
              
              const r = startR + (endR - startR) * phase;
              c.position.x = Math.cos(c.userData.ang) * r;
              c.position.y = Math.sin(c.userData.ang) * r;
           }
        });
     }
  });

  return (
    <group position={position}>
       {/* Rigid Cell Wall */}
       <RoundedBox args={[2, 2, 2]} radius={0.1} smoothness={4}>
         <meshPhysicalMaterial color="#65a30d" transmission={0.9} transparent opacity={0.3} roughness={0.4} wireframe={false} />
       </RoundedBox>
       
       <RoundedBox args={[2.05, 2.05, 2.05]} radius={0.1} smoothness={4} >
         <meshBasicMaterial color="#65a30d" wireframe transparent opacity={0.2} />
       </RoundedBox>

       {/* Shrinking Membrane (Cytoplasm) */}
       <RoundedBox args={[1.9, 1.9, 1.9]} radius={0.15} smoothness={4} scale={mScaleV}>
         <meshPhysicalMaterial color={mColor} transmission={0.6} transparent opacity={0.6} roughness={0.2} ior={1.3} />
       </RoundedBox>

       {/* Shrinking Central Vacuole */}
       <mesh scale={vScaleV}>
         <sphereGeometry args={[0.7, 32, 32]} />
         <meshPhysicalMaterial color={vColor} transmission={0.9} transparent opacity={0.8} roughness={0.1} ior={1.3} />
       </mesh>

       {/* Osmosis Particles */}
       {showArrows && (
         <group ref={tRef}>
            {Array.from({length: 12}).map((_, i) => (
               <mesh key={i} userData={{ ang: (i/12) * Math.PI * 2, oy: 0 }}>
                 <sphereGeometry args={[0.04]} />
                 <meshBasicMaterial color={isTurgid ? "#60a5fa" : "#ef4444"} transparent opacity={0.6} />
               </mesh>
            ))}
         </group>
       )}

       {label && (
         <Text position={[0, -1.5, 0]} fontSize={0.2} color="#94a3b8" anchorX="center" anchorY="middle">
            {label}
         </Text>
       )}
    </group>
  );
};

const PlasmolysisLab: React.FC<Props> = ({ hex }) => {
  const [saltConc, setSaltConc] = useState(0); // 0 = water, 100 = hypertonic
  const [mode, setMode] = useState<'cell' | 'experiment'>('cell');

  // Plasmolysis level: 0=turgid, 100=plasmolysed
  const plasmolysisLevel = Math.max(0, (saltConc - 15) / 85) * 100;

  return (
    <div className="flex flex-col md:flex-row h-full w-full bg-slate-950">
      <div className="flex-1 relative rounded-2xl overflow-hidden m-4 border border-white/10 shadow-2xl">
        <Canvas camera={{ position: [0, 1, 6], fov: 50 }}>
          <Environment preset="apartment" />
          <ambientLight intensity={0.6} />
          <pointLight position={[5, 10, 5]} intensity={1.5} color="#4ade80" />
          <pointLight position={[-5, -10, -5]} intensity={0.8} />

          {mode === 'cell' ? (
             <group position={[0,0,0]}>
                <PlantCell position={[-2.5, 0, 0]} saltConc={0} plasmolysisLevel={0} label="Turgid (Hypotonic)" showArrows={false} />
                <PlantCell position={[0, 0, 0]} saltConc={50} plasmolysisLevel={45} label="Flaccid (Isotonic)" showArrows={false} />
                <PlantCell position={[2.5, 0, 0]} saltConc={100} plasmolysisLevel={100} label="Plasmolysed (Hypertonic)" showArrows={false} />
             </group>
          ) : (
             <PlantCell position={[0, 0.5, 0]} saltConc={saltConc} plasmolysisLevel={plasmolysisLevel} showArrows={true} />
          )}
          
          <ContactShadows position={[0, -1.8, 0]} opacity={0.4} scale={15} blur={2} far={4} color="#000" />
          <OrbitControls enablePan={true} enableZoom={true} maxPolarAngle={Math.PI/2 + 0.1}/>
        </Canvas>

        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3 shadow-xl max-w-xs">
          <p className="text-[10px] text-green-400 font-bold uppercase">Biology Lab — b11</p>
          <p className="text-white font-bold text-sm">3D Plasmolysis</p>
          <p className="text-xs text-slate-400 mt-1">Observe cell membrane detachment from the rigid plant cell wall.</p>
        </div>
      </div>

      <div className="w-full md:w-80 bg-slate-900 border-l border-white/5 flex flex-col z-10">
        <div className="p-5 border-b border-white/5">
           <p className="text-xs font-bold uppercase tracking-widest text-green-400 mb-1">Interactive Microscope</p>
           <h2 className="text-lg font-black text-white">Plasmolysis</h2>
        </div>
        <div className="flex-1 p-5 space-y-5 overflow-y-auto">
          
          <div className="grid grid-cols-2 gap-2 bg-slate-950 p-1.5 rounded-xl border border-white/10">
            {['cell', 'experiment'].map(m => (
              <button key={m} onClick={() => setMode(m as any)}
                className={`py-2 rounded-lg text-xs font-bold transition-all capitalize shadow-sm ${mode === m ? 'text-green-950 bg-green-400' : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'}`}>
                {m === 'cell' ? '📊 Compare States' : '🔬 Live Experiment'}
              </button>
            ))}
          </div>

          {mode === 'experiment' && (
            <div className="bg-black/20 p-4 rounded-xl border border-white/10 space-y-4 shadow-inner">
              <div className="flex justify-between text-xs items-center">
                <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Extracellular Salt Conc.</span>
                <span className={`font-mono font-bold px-2 py-0.5 rounded text-xs ${saltConc > 50 ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>{saltConc.toFixed(0)}%</span>
              </div>
              <input type="range" min={0} max={100} value={saltConc} onChange={e => setSaltConc(Number(e.target.value))}
                className="w-full h-2 bg-slate-700/50 rounded-full appearance-none cursor-pointer accent-green-500" />
              <div className="flex justify-between text-[9px] text-slate-500 font-bold">
                <span className="text-green-500/60">0% (Pure H₂O)</span>
                <span className="text-red-500/60">100% (High Saline)</span>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-2">
            {[
              { label: 'Cell State', val: plasmolysisLevel < 10 ? 'Turgid' : plasmolysisLevel < 40 ? 'Flaccid' : plasmolysisLevel < 70 ? 'Plasmolysing' : 'Plasmolysed', color: plasmolysisLevel < 10 ? '#4ade80' : plasmolysisLevel < 40 ? '#fbbf24' : '#ef4444' },
              { label: 'Vacuole', val: plasmolysisLevel < 20 ? 'Full Volume' : plasmolysisLevel < 60 ? 'Shrinking' : 'Collapsed', color: '#60a5fa' },
              { label: 'Net Flow', val: saltConc < 10 ? 'Endosmosis (In)' : saltConc < 25 ? 'Isotonic Equil.' : 'Exosmosis (Out)', color: saltConc < 10 ? '#4ade80' : saltConc < 25 ? '#a78bfa' : '#f87171' },
              { label: 'Wall Pressure', val: plasmolysisLevel < 20 ? 'High Turgor' : 'Zero (Detached)', color: '#fbbf24' },
            ].map(m => (
              <div key={m.label} className="bg-slate-950 border border-white/5 rounded-xl p-3 text-center shadow-lg transition-colors" style={{borderColor: `${m.color}20`, backgroundColor: `${m.color}05`}}>
                <div className="text-[9px] text-slate-500 uppercase font-bold mb-1 tracking-wider">{m.label}</div>
                <div className="font-bold text-xs drop-shadow-sm" style={{ color: m.color }}>{m.val}</div>
              </div>
            ))}
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-white/10 text-xs space-y-2 mt-4 shadow-inner">
            <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest border-b border-white/5 pb-1 mb-2">Biological Principle</p>
            <div className="space-y-1.5 font-mono text-[10px]">
               <div className="flex gap-2 items-start"><span className="text-green-500 flex-shrink-0">●</span><span className="text-slate-300"><span className="text-green-400">Hypotonic:</span> Water enters. Cell wall prevents bursting. Turgid.</span></div>
               <div className="flex gap-2 items-start"><span className="text-yellow-500 flex-shrink-0">●</span><span className="text-slate-300"><span className="text-yellow-400">Isotonic:</span> No net movement. Flaccid.</span></div>
               <div className="flex gap-2 items-start"><span className="text-red-500 flex-shrink-0">●</span><span className="text-slate-300"><span className="text-red-400">Hypertonic:</span> Water exits. Membrane detaches from wall. Plasmolysis.</span></div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PlasmolysisLab;
