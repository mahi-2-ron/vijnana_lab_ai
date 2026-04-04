import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Html, Text } from '@react-three/drei';
import * as THREE from 'three';

interface Props { hex: string; }

const STAGES = [
  { name: 'Interphase', color: '#22c55e', desc: 'DNA replicates (S phase). Cell prepares for division. Chromatin not yet condensed.', chrom: 'duplicate' },
  { name: 'Prophase I', color: '#3b82f6', desc: 'Homologous chromosomes pair (synapsis). Crossing over occurs. Chromosomes condense.', chrom: 'prophase1' },
  { name: 'Metaphase I', color: '#8b5cf6', desc: 'Bivalents align at metaphase plate. Independent assortment of chromosomes.', chrom: 'metaphase1' },
  { name: 'Anaphase I', color: '#f59e0b', desc: 'Homologous chromosomes separate and move to opposite poles. Chromatids remain joined.', chrom: 'anaphase1' },
  { name: 'Telophase I', color: '#f97316', desc: 'Cell divides (Cytokinesis I). 2 haploid cells formed.', chrom: 'telophase1' },
  { name: 'Prophase II', color: '#06b6d4', desc: 'Chromosomes condense again in both cells. No DNA replication between divisions.', chrom: 'prophase2' },
  { name: 'Metaphase II', color: '#a78bfa', desc: 'Chromosomes align at metaphase plate. Centromeres attached to spindle fibers.', chrom: 'metaphase2' },
  { name: 'Anaphase II', color: '#f472b6', desc: 'Sister chromatids separate to opposite poles. Centromeres split.', chrom: 'anaphase2' },
  { name: 'Telophase II', color: '#4ade80', desc: '4 haploid daughter cells formed (gametes). Each has half the genetic material.', chrom: 'telophase2' },
];

const cellMat = <meshPhysicalMaterial transmission={0.95} roughness={0.2} color="#0f172a" ior={1.3} transparent opacity={0.6} depthWrite={false} />;

const ChromosomeX = ({ position, color, size = 1, rotation = [0,0,0] }: any) => (
  <group position={position} rotation={rotation} scale={size}>
     <mesh rotation={[0,0,0.3]}><cylinderGeometry args={[0.08, 0.08, 1.2, 16]} /><meshStandardMaterial color={color}/></mesh>
     <mesh rotation={[0,0,-0.3]}><cylinderGeometry args={[0.08, 0.08, 1.2, 16]} /><meshStandardMaterial color={color}/></mesh>
     <mesh><sphereGeometry args={[0.12]} /><meshStandardMaterial color="#fbbf24"/></mesh>
  </group>
);
const ChromatidI = ({ position, color, size = 1, rotation = [0,0,0] }: any) => (
  <group position={position} rotation={rotation} scale={size}>
     <mesh><cylinderGeometry args={[0.08, 0.08, 1.2, 16]} /><meshStandardMaterial color={color}/></mesh>
     <mesh><sphereGeometry args={[0.12]} /><meshStandardMaterial color="#fbbf24"/></mesh>
  </group>
);

const Chromatin = () => {
   const groupRef = useRef<THREE.Group>(null);
   useFrame(({ clock }) => {
     if (groupRef.current) groupRef.current.rotation.y = clock.elapsedTime * 0.2;
   });
   return (
     <group ref={groupRef}>
       {Array.from({length: 40}).map((_, i) => (
         <mesh key={i} position={[(Math.random()-0.5), (Math.random()-0.5), (Math.random()-0.5)]}>
           <sphereGeometry args={[0.06]} />
           <meshBasicMaterial color="#4ade80" />
         </mesh>
       ))}
     </group>
   )
}


const MeiosisScene = ({ stage }: { stage: number }) => {
  const tRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (tRef.current) {
       tRef.current.position.y = Math.sin(clock.elapsedTime * 2) * 0.05;
    }
  });

  return (
    <group ref={tRef} position={[0,0,0]}>
      
      {/* STAGE 0: INTERPHASE */}
      {stage === 0 && (
         <group>
            <mesh><sphereGeometry args={[1.5, 32, 32]} />{cellMat}</mesh>
            <mesh><sphereGeometry args={[1.1, 32, 32]} /><meshPhysicalMaterial transmission={0.9} color="#334155" opacity={0.3} transparent/></mesh>
            <Chromatin />
         </group>
      )}

      {/* STAGE 1: PROPHASE I */}
      {stage === 1 && (
         <group>
            <mesh><sphereGeometry args={[1.5, 32, 32]} />{cellMat}</mesh>
            <ChromosomeX position={[-0.3, 0.2, 0]} color="#3b82f6" />
            <ChromosomeX position={[0.3, 0.2, 0]} color="#f87171" />
            <ChromosomeX position={[-0.3, -0.4, 0]} color="#3b82f6" size={0.7} />
            <ChromosomeX position={[0.3, -0.4, 0]} color="#f87171" size={0.7} />
            {/* Chiasmata visualization */}
            <mesh position={[0,0.2,0.1]}><sphereGeometry args={[0.1]}/><meshBasicMaterial color="#fef08a"/></mesh>
         </group>
      )}

      {/* STAGE 2: METAPHASE I */}
      {stage === 2 && (
         <group>
            <mesh><sphereGeometry args={[1.5, 32, 32]} />{cellMat}</mesh>
            {/* Spindle Fibers */}
            <mesh rotation={[0,0,Math.PI/2]}><cylinderGeometry args={[0.01, 0.01, 2.5]} /><meshBasicMaterial color="#94a3b8" transparent opacity={0.3} /></mesh>
            {/* Chromosomes at plate */}
            <ChromosomeX position={[0, 0.4, 0.2]} color="#3b82f6" />
            <ChromosomeX position={[0, 0.4, -0.2]} color="#f87171" />
            <ChromosomeX position={[0, -0.4, 0.2]} color="#f87171" size={0.7} />
            <ChromosomeX position={[0, -0.4, -0.2]} color="#3b82f6" size={0.7} />
         </group>
      )}

      {/* STAGE 3: ANAPHASE I */}
      {stage === 3 && (
         <group>
            <mesh><sphereGeometry args={[1.4, 32, 32]} scale={[1, 1.4, 1]} />{cellMat}</mesh>
            <ChromosomeX position={[0, 0.8, 0]} color="#3b82f6" />
            <ChromosomeX position={[0, 0.6, 0.3]} color="#f87171" size={0.7}/>
            
            <ChromosomeX position={[0, -0.8, 0]} color="#f87171" />
            <ChromosomeX position={[0, -0.6, 0.3]} color="#3b82f6" size={0.7} />
         </group>
      )}

      {/* STAGE 4: TELOPHASE I */}
      {stage === 4 && (
         <group>
            <mesh position={[0, 1, 0]}><sphereGeometry args={[1.2, 32, 32]} />{cellMat}</mesh>
            <mesh position={[0, -1, 0]}><sphereGeometry args={[1.2, 32, 32]} />{cellMat}</mesh>
            
            <ChromosomeX position={[0, 1.2, 0]} color="#3b82f6" />
            <ChromosomeX position={[0, 0.8, 0]} color="#f87171" size={0.7}/>
            <ChromosomeX position={[0, -0.8, 0]} color="#f87171" />
            <ChromosomeX position={[0, -1.2, 0]} color="#3b82f6" size={0.7} />
         </group>
      )}

      {/* STAGE 5: PROPHASE II */}
      {stage === 5 && (
         <group>
            <mesh position={[0, 1.2, 0]}><sphereGeometry args={[1.1, 32, 32]} />{cellMat}</mesh>
            <mesh position={[0, -1.2, 0]}><sphereGeometry args={[1.1, 32, 32]} />{cellMat}</mesh>
            
            <ChromosomeX position={[0, 1.2, 0]} color="#3b82f6" />
            <ChromosomeX position={[0, 1.4, 0.2]} color="#f87171" size={0.7}/>
            
            <ChromosomeX position={[0, -1.2, 0]} color="#f87171" />
            <ChromosomeX position={[0, -1.4, 0.2]} color="#3b82f6" size={0.7} />
         </group>
      )}

      {/* STAGE 6: METAPHASE II */}
      {stage === 6 && (
         <group>
            <mesh position={[0, 1.2, 0]}><sphereGeometry args={[1.1, 32, 32]} />{cellMat}</mesh>
            <mesh position={[0, -1.2, 0]}><sphereGeometry args={[1.1, 32, 32]} />{cellMat}</mesh>
            
            {/* Cell 1 Plate */}
            <ChromosomeX position={[0, 1.2, 0.2]} color="#3b82f6" rotation={[0,Math.PI/2,0]} />
            <ChromosomeX position={[0, 1.2, -0.2]} color="#f87171" size={0.7} rotation={[0,Math.PI/2,0]}/>
            
            {/* Cell 2 Plate */}
            <ChromosomeX position={[0, -1.2, 0.2]} color="#f87171" rotation={[0,Math.PI/2,0]}/>
            <ChromosomeX position={[0, -1.2, -0.2]} color="#3b82f6" size={0.7} rotation={[0,Math.PI/2,0]} />
         </group>
      )}

      {/* STAGE 7: ANAPHASE II */}
      {stage === 7 && (
         <group>
            <mesh position={[0, 1.2, 0]}><sphereGeometry args={[1, 32, 32]} scale={[1.4, 1, 1]} />{cellMat}</mesh>
            <mesh position={[0, -1.2, 0]}><sphereGeometry args={[1, 32, 32]} scale={[1.4, 1, 1]} />{cellMat}</mesh>
            
            {/* Cell 1 separating */}
            <ChromatidI position={[-0.4, 1.2, 0.1]} color="#3b82f6" rotation={[0,0,Math.PI/2]} />
            <ChromatidI position={[0.4, 1.2, 0.1]} color="#3b82f6" rotation={[0,0,Math.PI/2]} />
            <ChromatidI position={[-0.4, 1.2, -0.2]} color="#f87171" size={0.7} rotation={[0,0,Math.PI/2]} />
            <ChromatidI position={[0.4, 1.2, -0.2]} color="#f87171" size={0.7} rotation={[0,0,Math.PI/2]} />

            {/* Cell 2 separating */}
            <ChromatidI position={[-0.4, -1.2, 0.1]} color="#f87171" rotation={[0,0,Math.PI/2]} />
            <ChromatidI position={[0.4, -1.2, 0.1]} color="#f87171" rotation={[0,0,Math.PI/2]} />
            <ChromatidI position={[-0.4, -1.2, -0.2]} color="#3b82f6" size={0.7} rotation={[0,0,Math.PI/2]} />
            <ChromatidI position={[0.4, -1.2, -0.2]} color="#3b82f6" size={0.7} rotation={[0,0,Math.PI/2]} />
         </group>
      )}

      {/* STAGE 8: TELOPHASE II */}
      {stage === 8 && (
         <group>
            <mesh position={[-1, 1.2, 0]}><sphereGeometry args={[0.8, 32, 32]} />{cellMat}</mesh>
            <mesh position={[1, 1.2, 0]}><sphereGeometry args={[0.8, 32, 32]} />{cellMat}</mesh>
            <mesh position={[-1, -1.2, 0]}><sphereGeometry args={[0.8, 32, 32]} />{cellMat}</mesh>
            <mesh position={[1, -1.2, 0]}><sphereGeometry args={[0.8, 32, 32]} />{cellMat}</mesh>
            
            <ChromatidI position={[-1, 1.2, 0]} color="#3b82f6" />
            <ChromatidI position={[-1, 1.4, 0.1]} color="#f87171" size={0.7} />

            <ChromatidI position={[1, 1.2, 0]} color="#3b82f6" />
            <ChromatidI position={[1, 1.4, 0.1]} color="#f87171" size={0.7} />

            <ChromatidI position={[-1, -1.2, 0]} color="#f87171" />
            <ChromatidI position={[-1, -1.4, 0.1]} color="#3b82f6" size={0.7} />

            <ChromatidI position={[1, -1.2, 0]} color="#f87171" />
            <ChromatidI position={[1, -1.4, 0.1]} color="#3b82f6" size={0.7} />

            <Html position={[0, 0, 0]} center zIndexRange={[100,0]}>
              <div className="font-bold text-green-400 bg-green-900/40 border border-green-500/20 px-3 py-1 rounded-full text-xs shadow-lg backdrop-blur whitespace-nowrap">
                4 Haploid Gametes (n)
              </div>
            </Html>
         </group>
      )}
    </group>
  );
}


const MeiosisLab: React.FC<Props> = ({ hex }) => {
  const [stage, setStage] = useState(0);

  return (
    <div className="flex flex-col md:flex-row h-full w-full bg-slate-950">
      <div className="flex-1 relative rounded-2xl overflow-hidden m-4 border border-white/10 shadow-2xl">
        <Canvas camera={{ position: [0, 0, 6], fov: 65 }}>
          <Environment preset="apartment" />
          <ambientLight intensity={0.6} />
          <pointLight position={[5, 10, 5]} intensity={1.5} color={STAGES[stage].color} />
          <pointLight position={[-5, -10, -5]} intensity={0.8} />
          
          <MeiosisScene stage={stage} />
          
          <OrbitControls enablePan={true} enableZoom={true} target={[0, 0, 0]} />
        </Canvas>

        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3 shadow-xl max-w-xs">
          <p className="text-[10px] font-bold uppercase tracking-widest text-pink-400 mb-1">Biology Lab — b14</p>
          <p className="text-white font-bold text-sm">3D Meiosis Cell Division</p>
          <p className="text-xs text-slate-400 mt-1">Orbit around the cells to observe homologous chromosome interactions.</p>
        </div>
      </div>

      <div className="w-full md:w-80 bg-slate-900 border-l border-white/5 flex flex-col z-10">
        <div className="p-5 border-b border-white/5">
           <h2 className="text-lg font-black text-white">Stages of Meiosis</h2>
        </div>
        <div className="flex-1 p-5 space-y-5 overflow-y-auto">
          
          <div className="p-4 rounded-xl border shadow-inner transition-all duration-300" style={{ backgroundColor: STAGES[stage].color + '15', borderColor: STAGES[stage].color + '40' }}>
            <p className="font-bold text-sm mb-1" style={{ color: STAGES[stage].color }}>{STAGES[stage].name}</p>
            <p className="text-slate-300 text-xs leading-relaxed">{STAGES[stage].desc}</p>
          </div>

          <div>
             <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-2 border-t border-white/5 pt-4">Select Phase</p>
             <div className="grid grid-cols-2 gap-1.5">
               {STAGES.map((s, i) => (
                 <button key={s.name} onClick={() => setStage(i)}
                   className={`py-2 rounded-lg text-xs font-bold transition-all border ${stage === i ? 'text-white border-current' : 'border-white/10 text-slate-400 bg-slate-950 hover:border-white/30'}`}
                   style={stage === i ? { backgroundColor: s.color + '30', borderColor: s.color, color: '#fff', boxShadow: `0 0 10px ${s.color}20` } : {}}>
                   {s.name}
                 </button>
               ))}
             </div>
          </div>

          <div className="flex gap-2 pt-2">
            <button onClick={() => setStage(Math.max(0, stage - 1))} disabled={stage === 0}
              className="flex-1 py-3 rounded-xl bg-slate-800 text-white text-xs font-bold disabled:opacity-30 hover:bg-slate-700 transition-colors shadow-md">
              ← Previous
            </button>
            <button onClick={() => setStage(Math.min(STAGES.length - 1, stage + 1))} disabled={stage === STAGES.length - 1}
              className="flex-1 py-3 rounded-xl text-white text-xs font-bold disabled:opacity-30 transition-all shadow-lg active:scale-95"
              style={{ backgroundColor: STAGES[stage].color, boxShadow: `0 4px 14px ${STAGES[stage].color}40` }}>
              Next Phase →
            </button>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-white/10 text-xs space-y-2 mt-4 shadow-inner">
            <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest border-b border-white/5 pb-1">Cellular Physics Summary</p>
            {[['Divisions','2 Divs (Meiosis I/II)'],['Input','1 Diploid Cell (2n)'],['Output','4 Haploid Gametes (n)'],['Crossing Over','Prophase I']].map(([k,v]) => (
              <div key={k} className="flex justify-between items-center bg-black/20 p-1.5 rounded"><span className="text-slate-500 font-bold">{k}</span><span className="text-slate-300 font-mono text-[10px]">{v}</span></div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default MeiosisLab;
