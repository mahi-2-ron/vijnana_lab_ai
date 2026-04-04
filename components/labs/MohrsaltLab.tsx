import React, { useRef, useEffect, useState } from 'react';
import { RotateCcw, CheckCircle } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Html } from '@react-three/drei';
import * as THREE from 'three';

interface Props { hex: string; }

const STAGES = [
  {
    name: 'Dissolve FeSO₄ + (NH₄)₂SO₄',
    desc: 'Weigh equimolar quantities of ferrous sulphate (FeSO₄) and ammonium sulphate ((NH₄)₂SO₄). Dissolve in minimum hot water with dilute H₂SO₄.',
    color: '#10b981',
    chemistry: 'FeSO₄ + (NH₄)₂SO₄ → [complex in solution]',
  },
  {
    name: 'Filter & Concentrate',
    desc: 'Filter the hot solution to remove insoluble impurities. Concentrate by evaporating on a water bath until a concentrated solution forms.',
    color: '#f59e0b',
    chemistry: 'H₂O evaporates → solution concentrates',
  },
  {
    name: 'Crystallize on Cooling',
    desc: 'Allow the concentrated solution to cool slowly. Pale green monoclinic crystals of Mohr\'s salt begin to form in the dish.',
    color: '#6366f1',
    chemistry: 'FeSO₄·(NH₄)₂SO₄·6H₂O ← crystallisation',
  },
  {
    name: 'Filter & Dry Crystals',
    desc: 'Filter the crystals under suction. Wash with cold water + alcohol. Dry between filter papers. Test purity by ferrous ion test.',
    color: '#a855f7',
    chemistry: 'Pure FeSO₄·(NH₄)₂SO₄·6H₂O',
  }
];

// Helper: Standard Glass Material
const glassMat = <meshPhysicalMaterial transmission={0.9} thickness={0.1} roughness={0} ior={1.4} color="#e0f2fe" transparent opacity={0.6} side={THREE.DoubleSide} />;

const MixingScene = ({ progress }: { progress: number }) => {
  // Two beakers pouring into one
  const lAngle = progress > 0.3 ? Math.min(Math.PI/2, (progress-0.3)*3) : 0;
  const rAngle = progress > 0.3 ? Math.min(Math.PI/2, (progress-0.3)*3) : 0;

  return (
    <group position={[0, -1, 0]}>
       {/* Central Receiving Beaker */}
       <mesh position={[0, 0.5, 0]}>
         <cylinderGeometry args={[0.8, 0.8, 1.5, 32, 1, true]} />
         {glassMat}
       </mesh>
       <mesh position={[0, -0.25, 0]}><cylinderGeometry args={[0.8, 0.8, 0.1, 32]}/><meshPhysicalMaterial transmission={0.9} roughness={0} color="#e0f2fe" /></mesh>
       
       {/* Central fluid filling up */}
       <mesh position={[0, -0.1 + progress*0.5, 0]}>
         <cylinderGeometry args={[0.78, 0.78, Math.max(0.01, progress), 32]} />
         <meshPhysicalMaterial transmission={0.7} roughness={0.1} color="#34d399" />
       </mesh>

       {/* Left Beaker (FeSO4) */}
       <group position={[-2 + progress, 2, 0]} rotation={[0, 0, -lAngle]}>
         <mesh><cylinderGeometry args={[0.5, 0.5, 1, 32, 1, true]} />{glassMat}</mesh>
         <mesh position={[0, -0.5, 0]}><cylinderGeometry args={[0.5, 0.5, 0.1, 32]}/><meshPhysicalMaterial transmission={0.9} roughness={0} color="#e0f2fe" /></mesh>
         {progress < 0.6 && (
           <mesh position={[0, 0, 0]}>
             <cylinderGeometry args={[0.48, 0.48, 0.8 * (1 - progress/0.6), 32]} />
             <meshPhysicalMaterial transmission={0.5} roughness={0.1} color="#6ee7b7" />
           </mesh>
         )}
         <Html position={[-0.8, 0, 0]}><div className="text-[9px] font-bold text-white bg-black/60 px-1 rounded backdrop-blur">FeSO₄</div></Html>
       </group>

       {/* Right Beaker ((NH4)2SO4) */}
       <group position={[2 - progress, 2, 0]} rotation={[0, 0, rAngle]}>
         <mesh><cylinderGeometry args={[0.5, 0.5, 1, 32, 1, true]} />{glassMat}</mesh>
         <mesh position={[0, -0.5, 0]}><cylinderGeometry args={[0.5, 0.5, 0.1, 32]}/><meshPhysicalMaterial transmission={0.9} roughness={0} color="#e0f2fe" /></mesh>
         {progress < 0.6 && (
           <mesh position={[0, 0, 0]}>
             <cylinderGeometry args={[0.48, 0.48, 0.8 * (1 - progress/0.6), 32]} />
             <meshPhysicalMaterial transmission={0.5} roughness={0.1} color="#d9f99d" />
           </mesh>
         )}
         <Html position={[0.8, 0, 0]}><div className="text-[9px] font-bold text-white bg-black/60 px-1 rounded backdrop-blur">(NH₄)₂SO₄</div></Html>
       </group>
    </group>
  );
};

const EvaporatingScene = ({ progress }: { progress: number }) => {
  const flameRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (flameRef.current) {
      flameRef.current.scale.y = 1 + Math.sin(clock.elapsedTime * 15) * 0.1;
      flameRef.current.scale.x = 1 + Math.sin(clock.elapsedTime * 20) * 0.05;
    }
  });

  return (
    <group position={[0, -1, 0]}>
       {/* Bunsen Burner */}
       <mesh position={[0, 0, 0]}><cylinderGeometry args={[0.3, 0.4, 0.2, 16]} /><meshStandardMaterial color="#334155" metalness={0.8} /></mesh>
       <mesh position={[0, 0.6, 0]}><cylinderGeometry args={[0.08, 0.08, 1, 16]} /><meshStandardMaterial color="#94a3b8" metalness={0.9} /></mesh>
       
       {/* Flame */}
       <mesh ref={flameRef} position={[0, 1.4, 0]}>
         <coneGeometry args={[0.15, 0.6, 16]} />
         <meshBasicMaterial color="#38bdf8" transparent opacity={0.8} />
       </mesh>
       <mesh position={[0, 1.3, 0]}>
         <coneGeometry args={[0.08, 0.3, 16]} />
         <meshBasicMaterial color="#bae6fd" transparent opacity={0.9} />
       </mesh>

       {/* Tripod Stand */}
       {[0, 120, 240].map(deg => {
         const r = deg * Math.PI/180;
         return <mesh key={deg} position={[0.8 * Math.cos(r), 1.2, 0.8 * Math.sin(r)]} rotation={[0, 0, -r]}><cylinderGeometry args={[0.04, 0.04, 2.4]} /><meshStandardMaterial color="#cbd5e1" metalness={0.7}/></mesh>
       })}
       <mesh position={[0, 2.4, 0]}><torusGeometry args={[0.8, 0.04, 16, 32]} /><meshStandardMaterial color="#cbd5e1" metalness={0.4}/></mesh>

       {/* Evaporating Dish */}
       <mesh position={[0, 2.6, 0]}><sphereGeometry args={[0.9, 32, 16, 0, Math.PI*2, Math.PI/2, Math.PI/2]} />{glassMat}</mesh>
       
       {/* Liquid concentrating (shrinking volume, darkening) */}
       <mesh position={[0, 2.58 - progress*0.2, 0]}>
         <sphereGeometry args={[0.85, 32, 16, 0, Math.PI*2, Math.PI/2, Math.PI/2 - progress*0.2]} />
         <meshPhysicalMaterial transmission={0.6} roughness={0.1} color={new THREE.Color().lerpColors(new THREE.Color("#34d399"), new THREE.Color("#059669"), progress)} />
       </mesh>
    </group>
  );
};

const CrystallizationScene = ({ progress }: { progress: number }) => {
  const crystalCount = Math.floor(progress * 50);
  
  return (
    <group position={[0, -0.5, 0]}>
       {/* Evaporating Dish */}
       <mesh position={[0, 0, 0]}><sphereGeometry args={[1.5, 32, 16, 0, Math.PI*2, Math.PI/2, Math.PI/2]} />{glassMat}</mesh>
       
       {/* Remaining Liquid */}
       <mesh position={[0, -0.05, 0]}>
         <sphereGeometry args={[1.45, 32, 16, 0, Math.PI*2, Math.PI/2, Math.PI/2 - 0.2 + progress*0.1]} />
         <meshPhysicalMaterial transmission={0.7} roughness={0.1} color="#059669" transparent opacity={1 - progress*0.5} />
       </mesh>

       {/* Forming Crystals */}
       {Array.from({length: crystalCount}).map((_, i) => {
         const t = (i / 50) * Math.PI * 2 * 4;
         const r = 0.2 + (i/50) * 1.1;
         return (
           <mesh key={i} position={[r * Math.cos(t), -1.45 + r*0.2, r * Math.sin(t)]} rotation={[Math.random()*Math.PI, Math.random()*Math.PI, 0]}>
             <octahedronGeometry args={[0.08]} />
             <meshPhysicalMaterial color="#34d399" transmission={0.4} clearcoat={1} roughness={0.2} metalness={0.1} />
           </mesh>
         )
       })}
    </group>
  );
};

const FilterTestScene = ({ purityTested }: { purityTested: boolean }) => {
  return (
    <group position={[0, 0, 0]}>
       {/* Funnel */}
       <mesh position={[0, 1, 0]} rotation={[Math.PI, 0, 0]}>
         <coneGeometry args={[1, 1, 32, 1, true]} />
         {glassMat}
       </mesh>
       <mesh position={[0, 0.2, 0]}>
         <cylinderGeometry args={[0.1, 0.1, 0.8, 16, 1, true]} />
         {glassMat}
       </mesh>

       {/* Crystals in funnel */}
       {Array.from({length: 40}).map((_, i) => (
         <mesh key={i} position={[(Math.random()-0.5)*0.8, 1 + Math.random()*0.2, (Math.random()-0.5)*0.8]} rotation={[Math.random(), Math.random(), 0]}>
            <octahedronGeometry args={[0.08]} />
            <meshPhysicalMaterial color="#34d399" transmission={0.4} clearcoat={1} />
         </mesh>
       ))}

       {/* KSCN Test Tube */}
       <group position={[2, 0.5, 0]} rotation={[0,0,0.1]}>
         <mesh><cylinderGeometry args={[0.2, 0.2, 1.5, 16, 1, true]} />{glassMat}</mesh>
         <mesh position={[0, -0.75, 0]}><sphereGeometry args={[0.2, 16, 16, 0, Math.PI*2, Math.PI/2, Math.PI/2]} />{glassMat}</mesh>
         {/* Blood Red Liquid if tested */}
         {purityTested && (
           <mesh position={[0, -0.4, 0]}>
             <cylinderGeometry args={[0.18, 0.18, 0.7, 16]} />
             <meshPhysicalMaterial transmission={0.2} color="#dc2626" roughness={0} />
           </mesh>
         )}
         <Html position={[0.4, 0, 0]}>
            <div className="text-[8px] font-bold text-white bg-black/60 px-1 py-0.5 rounded backdrop-blur whitespace-nowrap">
              {purityTested ? 'Blood Red: Fe²⁺ ✓' : 'Add KSCN for Purity'}
            </div>
         </Html>
       </group>
    </group>
  );
};


const MohrsaltLab: React.FC<Props> = ({ hex }) => {
  const [stage, setStage] = useState(0);
  const [progress, setProgress] = useState(0);
  const [running, setRunning] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [purityTested, setPurityTested] = useState(false);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setProgress(p => { if (p >= 1) { clearInterval(id); setRunning(false); return 1; } return p + 0.01; });
    }, 50);
    return () => clearInterval(id);
  }, [running]);

  const s = STAGES[stage];

  const nextStage = () => {
    if (stage < STAGES.length - 1) { setStage(st => st + 1); setProgress(0); setRunning(false); }
    else setCompleted(true);
  };

  return (
    <div className="flex flex-col md:flex-row h-full w-full bg-slate-950">
      <div className="flex-1 flex items-center justify-center p-4 flex-col relative rounded-2xl overflow-hidden m-4 border border-white/10 shadow-2xl">
        <Canvas camera={{ position: [0, 2, 6], fov: 60 }}>
          <Environment preset="studio" />
          <ambientLight intensity={0.7} />
          <pointLight position={[5, 5, 5]} intensity={1.5} color={s.color} />
          
          {stage === 0 && <MixingScene progress={progress} />}
          {stage === 1 && <EvaporatingScene progress={progress} />}
          {stage === 2 && <CrystallizationScene progress={progress} />}
          {stage === 3 && <FilterTestScene purityTested={purityTested} />}
          
          <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={10} blur={2} far={4} color="#000" />
          <OrbitControls enablePan={true} enableZoom={true} target={[0, 0, 0]} maxPolarAngle={Math.PI/2} />
        </Canvas>

        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3 shadow-xl max-w-[280px]">
          <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: s.color }}>Chemistry Lab — c15</p>
          <p className="text-white font-bold text-sm">3D Mohr's Salt Synthesis</p>
        </div>

        <div className="absolute bottom-4 left-0 w-full px-8 flex justify-center">
            <div className="bg-black/50 backdrop-blur-md p-1.5 rounded-2xl border border-white/10 flex gap-1 shadow-2xl">
               {STAGES.map((st, i) => (
                 <div key={i} className="h-2 rounded-full transition-all duration-300" style={{
                   width: 60, backgroundColor: i < stage ? st.color : i === stage ? `${st.color}80` : 'rgba(255,255,255,0.1)'
                 }} />
               ))}
            </div>
        </div>
      </div>

      <div className="w-full md:w-72 bg-slate-900 border-l border-white/5 flex flex-col z-10">
        <div className="p-5 border-b border-white/5">
           <h2 className="text-lg font-black text-white">Procedure</h2>
        </div>
        <div className="flex-1 p-5 space-y-4 overflow-y-auto">
          {completed ? (
            <div className="text-center py-8">
              <CheckCircle size={56} className="mx-auto text-green-400 mb-4 drop-shadow-[0_0_15px_rgba(74,222,128,0.5)]" />
              <h3 className="text-xl font-bold text-white mb-2">Salt Ready!</h3>
              <p className="text-slate-400 text-sm mb-6">FeSO₄·(NH₄)₂SO₄·6H₂O monoclinic crystals prepared successfully in 3D.</p>
              <button onClick={() => { setStage(0); setProgress(0); setCompleted(false); setPurityTested(false); }}
                className="w-full py-3 rounded-xl bg-slate-800 text-white hover:bg-slate-700 flex items-center justify-center gap-2 font-bold transition-all shadow-md">
                <RotateCcw size={16} /> Restart Synthesis
              </button>
            </div>
          ) : (
            <>
              <div className="p-3 rounded-xl border shadow-inner transition-colors duration-500" style={{ backgroundColor: `${s.color}15`, borderColor: `${s.color}40` }}>
                <p className="font-bold text-xs mb-1" style={{ color: s.color }}>Step {stage + 1}: {s.name}</p>
                <p className="text-slate-300 text-xs leading-relaxed">{s.desc}</p>
              </div>
              
              <div className="bg-slate-950 p-4 rounded-xl border border-white/5 text-xs shadow-inner">
                <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-1 border-b border-white/5 pb-1">Chemistry</p>
                <p className="font-mono text-[10px] pt-1" style={{ color: s.color }}>{s.chemistry}</p>
              </div>

              {stage === 3 && progress >= 1 && !purityTested && (
                <button onClick={() => setPurityTested(true)}
                  className="w-full py-3 rounded-xl text-xs font-bold text-white transition-all shadow-lg bg-red-600 hover:bg-red-500 shadow-red-600/20 my-2">
                  🧪 Add KSCN for Purity Test
                </button>
              )}
              {purityTested && (
                <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-xl shadow-inner my-2">
                  <p className="text-red-300 font-bold text-xs">Blood-red hue observed. Fe²⁺ confirmed pure. ✓</p>
                </div>
              )}

              <div className="flex gap-2">
                <button onClick={() => setRunning(r => !r)} disabled={progress >= 1}
                  className="flex-1 py-3 rounded-xl text-sm font-bold text-white transition-all shadow-lg active:scale-95 disabled:opacity-50"
                  style={{ backgroundColor: (running || progress >= 1) ? '#475569' : s.color }}>
                  {running ? '⏸ Paused' : (progress === 0 ? '▶️ Run Step' : '▶️ Resume')}
                </button>
                <button onClick={() => { setProgress(0); setRunning(false); setPurityTested(false); }}
                  className="px-4 py-3 rounded-xl bg-slate-800 text-red-400 hover:bg-red-900/30 transition-colors">
                  <RotateCcw size={16} />
                </button>
              </div>

              <div className="bg-slate-800/50 rounded-full h-1 mt-2 mb-4 overflow-hidden border border-white/5">
                 <div className="h-full transition-all duration-300" style={{ width: `${progress * 100}%`, backgroundColor: s.color }} />
              </div>

              {progress >= 1 && (
                <button onClick={nextStage} disabled={stage === 3 && !purityTested}
                  className="w-full py-3 rounded-xl text-sm font-bold text-white transition-all shadow-lg bg-green-600 hover:bg-green-500 shadow-green-600/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed">
                  {stage === STAGES.length - 1 ? '🎉 Finish Synthesis' : 'Next Step →'}
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MohrsaltLab;
