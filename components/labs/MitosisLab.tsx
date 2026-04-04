import React, { useRef, useEffect, useState } from 'react';
import { RotateCcw, CheckCircle } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Html, Text } from '@react-three/drei';
import * as THREE from 'three';

interface Props { hex: string; }

const STAGES = [
  {
    name: 'Interphase', color: '#6366f1',
    description: 'Cell prepares for division. DNA replicates inside the nucleus. Cell grows and produces proteins.',
    instruction: '🔬 Nucleus is intact. DNA is replicating (S-Phase).'
  },
  {
    name: 'Prophase', color: '#f59e0b',
    description: 'Chromosomes condense and become visible. Nuclear membrane begins to dissolve. Spindle fibers form.',
    instruction: '🧬 Chromatin condenses into X-shaped chromosomes. Centrioles move to poles.'
  },
  {
    name: 'Metaphase', color: '#10b981',
    description: 'Chromosomes line up at the cell\'s equator (metaphase plate). Spindle fibers attach to centromeres.',
    instruction: '📍 Chromosomes perfectly aligned on the equatorial plate.'
  },
  {
    name: 'Anaphase', color: '#ef4444',
    description: 'Sister chromatids separate and move to opposite poles pulled by spindle fibers.',
    instruction: '⬆️⬇️ Centromeres split! Chromatids pulled to opposite poles.'
  },
  {
    name: 'Telophase & Cytokinesis', color: '#8b5cf6',
    description: 'Two new nuclei form around separated chromosomes. Cell pinches and splits into two identical daughter cells.',
    instruction: '🎉 Cleavage furrow forms. 2 Identical Diploid Daughter Cells!'
  }
];

const cellMat = <meshPhysicalMaterial transmission={0.95} roughness={0.2} color="#0f172a" ior={1.3} transparent opacity={0.6} depthWrite={false} />;

const ChromosomeX = ({ position, color, size = 1, rotation = [0,0,0] }: any) => (
  <group position={position} rotation={rotation} scale={size}>
     <mesh rotation={[0,0,0.3]}><cylinderGeometry args={[0.08, 0.08, 1.4, 16]} /><meshStandardMaterial color={color}/></mesh>
     <mesh rotation={[0,0,-0.3]}><cylinderGeometry args={[0.08, 0.08, 1.4, 16]} /><meshStandardMaterial color={color}/></mesh>
     <mesh><sphereGeometry args={[0.12]} /><meshStandardMaterial color="#fbbf24"/></mesh>
  </group>
);

const ChromatidI = ({ position, color, size = 1, rotation = [0,0,0] }: any) => (
  <group position={position} rotation={rotation} scale={size}>
     <mesh><cylinderGeometry args={[0.08, 0.08, 1.4, 16]} /><meshStandardMaterial color={color}/></mesh>
     <mesh><sphereGeometry args={[0.12]} /><meshStandardMaterial color="#fbbf24"/></mesh>
  </group>
);

const Chromatin = () => {
   const groupRef = useRef<THREE.Group>(null);
   useFrame(({ clock }) => {
     if (groupRef.current) groupRef.current.rotation.y = clock.elapsedTime * 0.3;
   });
   return (
     <group ref={groupRef}>
       {Array.from({length: 50}).map((_, i) => (
         <mesh key={i} position={[(Math.random()-0.5)*1.5, (Math.random()-0.5)*1.5, (Math.random()-0.5)*1.5]}>
           <sphereGeometry args={[0.05]} />
           <meshBasicMaterial color="#6366f1" />
         </mesh>
       ))}
     </group>
   )
}

const MitosisScene = ({ stage }: { stage: number }) => {
  const tRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (tRef.current) {
       tRef.current.position.y = Math.sin(clock.elapsedTime * 2) * 0.05;
    }
  });

  return (
    <group ref={tRef} position={[0,0,0]}>
      {/* 0: Interphase */}
      {stage === 0 && (
         <group>
            <mesh><sphereGeometry args={[2, 32, 32]} />{cellMat}</mesh>
            <mesh><sphereGeometry args={[1.2, 32, 32]} /><meshPhysicalMaterial transmission={0.9} color="#4f46e5" opacity={0.4} transparent/></mesh>
            <Chromatin />
         </group>
      )}

      {/* 1: Prophase */}
      {stage === 1 && (
         <group>
            <mesh><sphereGeometry args={[2, 32, 32]} />{cellMat}</mesh>
            {/* Nucleus fading */}
            <mesh><sphereGeometry args={[1.3, 32, 32]} /><meshPhysicalMaterial transmission={0.9} color="#f59e0b" opacity={0.15} transparent/></mesh>
            {/* Condensed Chromosomes (randomly placed) */}
            <ChromosomeX position={[-0.5, 0.5, 0.2]} color="#d97706" rotation={[0.2, 0.4, 0.1]} />
            <ChromosomeX position={[0.5, -0.4, -0.2]} color="#059669" rotation={[-0.4, 0.1, 0.5]} />
            <ChromosomeX position={[0, 0.2, -0.5]} color="#d97706" rotation={[0.1, -0.2, 0.8]} />
            <ChromosomeX position={[-0.2, -0.6, 0.4]} color="#059669" rotation={[0.6, 0.1, -0.2]} />
            {/* Centrioles moving to poles */}
            <mesh position={[0, 1.5, 0]} rotation={[0,0,Math.PI/2]}><cylinderGeometry args={[0.1, 0.1, 0.4]} /><meshStandardMaterial color="#fbbf24"/></mesh>
            <mesh position={[0, -1.5, 0]} rotation={[0,0,Math.PI/2]}><cylinderGeometry args={[0.1, 0.1, 0.4]} /><meshStandardMaterial color="#fbbf24"/></mesh>
         </group>
      )}

      {/* 2: Metaphase */}
      {stage === 2 && (
         <group>
            <mesh><sphereGeometry args={[2, 32, 32]} />{cellMat}</mesh>
            {/* Centrioles */}
            <mesh position={[0, 1.8, 0]} rotation={[0,0,Math.PI/2]}><cylinderGeometry args={[0.1, 0.1, 0.4]} /><meshStandardMaterial color="#fbbf24"/></mesh>
            <mesh position={[0, -1.8, 0]} rotation={[0,0,Math.PI/2]}><cylinderGeometry args={[0.1, 0.1, 0.4]} /><meshStandardMaterial color="#fbbf24"/></mesh>
            
            {/* Spindle Fibers */}
            {[-0.6, -0.2, 0.2, 0.6].map((x, i) => (
               <mesh key={i} position={[x, 0, 0]}><cylinderGeometry args={[0.01, 0.01, 3.6]} /><meshBasicMaterial color="#10b981" transparent opacity={0.3}/></mesh>
            ))}

            {/* Chromosomes on Metaphase plate */}
            <ChromosomeX position={[-0.6, 0, 0]} color="#d97706" rotation={[0,0,-Math.PI/2]} />
            <ChromosomeX position={[-0.2, 0, 0]} color="#059669" rotation={[0,0,-Math.PI/2]} />
            <ChromosomeX position={[0.2, 0, 0]} color="#d97706" rotation={[0,0,-Math.PI/2]} />
            <ChromosomeX position={[0.6, 0, 0]} color="#059669" rotation={[0,0,-Math.PI/2]} />
         </group>
      )}

      {/* 3: Anaphase */}
      {stage === 3 && (
         <group>
            {/* Elongated cell */}
            <mesh scale={[1, 1.25, 1]}><sphereGeometry args={[1.8, 32, 32]} />{cellMat}</mesh>
            {/* Centrioles */}
            <mesh position={[0, 2.1, 0]} rotation={[0,0,Math.PI/2]}><cylinderGeometry args={[0.1, 0.1, 0.4]} /><meshStandardMaterial color="#fbbf24"/></mesh>
            <mesh position={[0, -2.1, 0]} rotation={[0,0,Math.PI/2]}><cylinderGeometry args={[0.1, 0.1, 0.4]} /><meshStandardMaterial color="#fbbf24"/></mesh>
            
            {/* Spindle Fibers pulling */}
            {[-0.6, -0.2, 0.2, 0.6].map((x, i) => (
               <group key={i}>
                 <mesh position={[x, 1.5, 0]}><cylinderGeometry args={[0.01, 0.01, 1.2]} /><meshBasicMaterial color="#ef4444" transparent opacity={0.3}/></mesh>
                 <mesh position={[x, -1.5, 0]}><cylinderGeometry args={[0.01, 0.01, 1.2]} /><meshBasicMaterial color="#ef4444" transparent opacity={0.3}/></mesh>
               </group>
            ))}

            {/* Separated Chromatids V shapes (using ChromatidI but rotated to look like they are being dragged) */}
            {/* Top Pole Chromatids */}
            <ChromatidI position={[-0.6, 1, 0]} color="#d97706" rotation={[0,0,Math.PI/2 + 0.2]} />
            <ChromatidI position={[-0.2, 0.8, 0]} color="#059669" rotation={[0,0,Math.PI/2 + 0.2]} />
            <ChromatidI position={[0.2, 1, 0]} color="#d97706" rotation={[0,0,Math.PI/2 - 0.2]} />
            <ChromatidI position={[0.6, 0.8, 0]} color="#059669" rotation={[0,0,Math.PI/2 - 0.2]} />

            {/* Bottom Pole Chromatids */}
            <ChromatidI position={[-0.6, -1, 0]} color="#d97706" rotation={[0,0,Math.PI/2 - 0.2]} />
            <ChromatidI position={[-0.2, -0.8, 0]} color="#059669" rotation={[0,0,Math.PI/2 - 0.2]} />
            <ChromatidI position={[0.2, -1, 0]} color="#d97706" rotation={[0,0,Math.PI/2 + 0.2]} />
            <ChromatidI position={[0.6, -0.8, 0]} color="#059669" rotation={[0,0,Math.PI/2 + 0.2]} />
         </group>
      )}

      {/* 4: Telophase */}
      {stage === 4 && (
         <group>
            {/* Cleavage Furrow / 2 Cells forming */}
            <mesh position={[0, 1.2, 0]}><sphereGeometry args={[1.5, 32, 32]} />{cellMat}</mesh>
            <mesh position={[0, -1.2, 0]}><sphereGeometry args={[1.5, 32, 32]} />{cellMat}</mesh>

            {/* New Nucleus Top */}
            <mesh position={[0, 1.2, 0]}><sphereGeometry args={[1, 32, 32]} /><meshPhysicalMaterial transmission={0.9} color="#8b5cf6" opacity={0.3} transparent/></mesh>
            {/* Chromatin relaxing Top */}
            {Array.from({length: 20}).map((_, i) => (
              <ChromatidI key={i} position={[(Math.random()-0.5), 1.2+(Math.random()-0.5), (Math.random()-0.5)]} color={i%2===0?"#d97706":"#059669"} size={0.3} rotation={[Math.random(),Math.random(),0]} />
            ))}

            {/* New Nucleus Bottom */}
            <mesh position={[0, -1.2, 0]}><sphereGeometry args={[1, 32, 32]} /><meshPhysicalMaterial transmission={0.9} color="#8b5cf6" opacity={0.3} transparent/></mesh>
            {/* Chromatin relaxing Bottom */}
            {Array.from({length: 20}).map((_, i) => (
              <ChromatidI key={i} position={[(Math.random()-0.5), -1.2+(Math.random()-0.5), (Math.random()-0.5)]} color={i%2===0?"#d97706":"#059669"} size={0.3} rotation={[Math.random(),Math.random(),0]} />
            ))}

            <Html position={[0,0,0]} center zIndexRange={[100,0]}>
               <div className="font-bold text-purple-300 bg-purple-900/60 border border-purple-500/20 px-3 py-1.5 rounded-xl shadow-xl backdrop-blur whitespace-nowrap text-xs">
                 2 Identical Diploid (2n) Cells
               </div>
            </Html>
         </group>
      )}
    </group>
  );
}

const MitosisLab: React.FC<Props> = ({ hex }) => {
  const [stage, setStage] = useState(0);

  return (
    <div className="flex flex-col md:flex-row h-full w-full bg-slate-950">
      <div className="flex-1 relative rounded-2xl overflow-hidden m-4 border border-white/10 shadow-2xl">
        <Canvas camera={{ position: [0, 0, 7], fov: 60 }}>
          <Environment preset="apartment" />
          <ambientLight intensity={0.6} />
          <pointLight position={[5, 10, 5]} intensity={1.5} color={STAGES[stage].color} />
          <pointLight position={[-5, -10, -5]} intensity={0.5} color="#94a3b8" />
          
          <MitosisScene stage={stage} />
          
          <OrbitControls enablePan={true} enableZoom={true} target={[0, 0, 0]} />
        </Canvas>

        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3 shadow-xl max-w-sm">
          <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 mb-1">Biology Lab — b13</p>
          <p className="text-white font-bold text-sm">3D Mitosis Cell Division</p>
          <p className="text-xs text-slate-400 mt-1">Orbit the camera to view somatic cell division in three dimensions.</p>
        </div>
      </div>

      <div className="w-full md:w-80 bg-slate-900 border-l border-white/5 flex flex-col z-10">
        <div className="p-5 border-b border-white/5">
           <h2 className="text-lg font-black text-white">Stages of Mitosis</h2>
        </div>
        <div className="flex-1 p-5 space-y-5 overflow-y-auto">
          
          <div className="p-4 rounded-xl border shadow-inner transition-colors duration-500" style={{ backgroundColor: STAGES[stage].color + '15', borderColor: STAGES[stage].color + '40' }}>
            <p className="font-bold text-sm mb-1" style={{ color: STAGES[stage].color }}>{STAGES[stage].name}</p>
            <p className="text-slate-300 text-xs mb-2 leading-relaxed">{STAGES[stage].description}</p>
            <div className="flex gap-2 items-start bg-black/20 p-2 rounded-lg">
               <span className="text-sm">👁️</span>
               <p className="text-[10.5px] font-medium text-slate-300">{STAGES[stage].instruction}</p>
            </div>
          </div>

          <div>
             <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-2 border-t border-white/5 pt-4">Cell Cycle</p>
             <div className="space-y-1.5">
               {STAGES.map((s, i) => (
                 <button key={s.name} onClick={() => setStage(i)}
                   className={`w-full py-3 px-4 rounded-xl text-xs font-bold text-left transition-all border flex justify-between items-center ${stage === i ? 'text-white border-current' : 'border-white/10 text-slate-400 bg-slate-950 hover:bg-white/5 hover:border-white/30'}`}
                   style={stage === i ? { backgroundColor: s.color + '30', borderColor: s.color, boxShadow: `0 0 15px ${s.color}20` } : {}}>
                   <span>{s.name}</span>
                   {stage === i && <span className="text-[10px] bg-black/40 px-2 py-1 rounded text-white font-normal">Active</span>}
                 </button>
               ))}
             </div>
          </div>

          <div className="flex gap-2 pt-2 border-t border-white/5">
            <button onClick={() => setStage(Math.max(0, stage - 1))} disabled={stage === 0}
              className="flex-1 py-3 rounded-xl bg-slate-800 text-white text-xs font-bold disabled:opacity-30 hover:bg-slate-700 transition-colors">
              ← Prev
            </button>
            <button onClick={() => setStage(Math.min(STAGES.length - 1, stage + 1))} disabled={stage === STAGES.length - 1}
              className="flex-1 py-3 rounded-xl text-white text-xs font-bold disabled:opacity-30 transition-all shadow-lg active:scale-95"
              style={{ backgroundColor: STAGES[stage].color, boxShadow: `0 4px 14px ${STAGES[stage].color}40` }}>
              Next Stage →
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MitosisLab;
