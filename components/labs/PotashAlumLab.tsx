import React, { useRef, useEffect, useState } from 'react';
import { RotateCcw, ChevronRight, CheckCircle } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Html } from '@react-three/drei';
import * as THREE from 'three';

interface Props { hex: string; }

const STEPS = [
  {
    id: 'dissolve',
    title: '1. Dissolve Aluminium',
    instruction: 'Add aluminium scraps to KOH solution. Al reacts to form potassium aluminate (KAlO₂) and H₂ gas.',
    action: 'Add Al scraps + KOH',
    chemistry: 'Al + KOH + H₂O → KAlO₂ + H₂↑',
    color: '#3b82f6',
  },
  {
    id: 'filter',
    title: '2. Filter & Neutralize',
    instruction: 'Filter off impurities. Add Al₂(SO₄)₃ to precipitate Al(OH)₃, then dissolve in H₂SO₄.',
    action: 'Filter + Add H₂SO₄',
    chemistry: 'KAlO₂ + H₂SO₄ → K₂SO₄ + Al₂(SO₄)₃',
    color: '#f59e0b',
  },
  {
    id: 'crystallize',
    title: '3. Crystallize',
    instruction: 'Concentrate the K₂SO₄ + Al₂(SO₄)₃ double salt solution by evaporation. Crystals of potash alum form on cooling.',
    action: 'Heat & Evaporate',
    chemistry: 'K₂SO₄ + Al₂(SO₄)₃ + 24H₂O → 2KAl(SO₄)₂·12H₂O',
    color: '#8b5cf6',
  },
  {
    id: 'done',
    title: '4. Pure Potash Alum!',
    instruction: 'Filter, wash and dry the octahedral crystals. Test purity by measuring melting point and verifying optical clarity.',
    action: 'Collect Crystals',
    chemistry: 'KAl(SO₄)₂·12H₂O — Alum crystals',
    color: '#10b981',
  }
];

const glassMat = <meshPhysicalMaterial transmission={0.9} thickness={0.1} roughness={0} ior={1.4} color="#e0f2fe" transparent opacity={0.6} side={THREE.DoubleSide} />;

const DissolveScene = ({ progress }: any) => {
  const bubblesRef = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    if (bubblesRef.current && progress > 0 && progress < 1) {
      bubblesRef.current.children.forEach(mesh => {
         mesh.position.y += 0.05 + Math.random()*0.02;
         if(mesh.position.y > 0.8) {
            mesh.position.y = -0.6;
         }
      })
    }
  });

  return (
    <group position={[0, -0.5, 0]}>
       {/* Beaker */}
       <mesh position={[0, 0.4, 0]}><cylinderGeometry args={[0.8, 0.8, 1.6, 32, 1, true]} />{glassMat}</mesh>
       <mesh position={[0, -0.4, 0]}><cylinderGeometry args={[0.8, 0.8, 0.1, 32]} />{glassMat}</mesh>
       
       {/* KOH Liquid */}
       <mesh position={[0, 0, 0]}>
         <cylinderGeometry args={[0.78, 0.78, 0.8, 32]} />
         <meshPhysicalMaterial transmission={0.8} color="#bae6fd" roughness={0.1} />
       </mesh>

       {/* Aluminium Foils dissolving */}
       {progress < 1 && Array.from({length: 6}).map((_, i) => (
         <mesh key={i} position={[(Math.random()-0.5)*1, -0.3 + (i%2)*0.2, (Math.random()-0.5)*1]} rotation={[Math.random(), Math.random(), 0]}>
           <boxGeometry args={[0.2*(1-progress), 0.02, 0.2*(1-progress)]} />
           <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.6} />
         </mesh>
       ))}

       {/* H2 Bubbles */}
       {(progress > 0 && progress < 1) && (
         <group ref={bubblesRef}>
           {Array.from({length: 15}).map((_, i) => (
             <mesh key={i} position={[(Math.random()-0.5)*1, -0.6 + Math.random(), (Math.random()-0.5)*1]}>
               <sphereGeometry args={[0.03, 8, 8]} />
               <meshBasicMaterial color="#f8fafc" transparent opacity={0.6} />
             </mesh>
           ))}
         </group>
       )}
       {progress > 0 && progress < 1 && (
         <Html position={[1.2, 0.8, 0]} center><div className="text-[10px] text-white font-bold bg-black/60 px-1 rounded">H₂↑</div></Html>
       )}
    </group>
  );
};

const FilterScene = ({ progress }: any) => {
  return (
    <group position={[0, -1.5, 0]}>
       {/* Conical Flask */}
       <group position={[0, 0, 0]}>
         <mesh position={[0, 1.5, 0]}><cylinderGeometry args={[0.3, 0.3, 1, 16, 1, true]} />{glassMat}</mesh>
         <mesh position={[0, 0.2, 0]}><cylinderGeometry args={[0.3, 1.2, 1.6, 32, 1, true]} />{glassMat}</mesh>
         <mesh position={[0, -0.6, 0]}><cylinderGeometry args={[1.2, 1.2, 0.05, 32]} />{glassMat}</mesh>
         {/* Filtered Liquid */}
         <mesh position={[0, -0.2 + progress*0.2, 0]}>
            <cylinderGeometry args={[1, 1.15, Math.max(0.01, progress*0.8), 32]} />
            <meshPhysicalMaterial transmission={0.9} roughness={0} color="#e0f2fe" />
         </mesh>
       </group>
       
       {/* Filter Funnel & Paper */}
       <group position={[0, 2, 0]}>
         <mesh position={[0, 1, 0]} rotation={[Math.PI, 0, 0]}><coneGeometry args={[1, 1, 32, 1, true]} />{glassMat}</mesh>
         <mesh position={[0, 0.2, 0]}><cylinderGeometry args={[0.1, 0.1, 0.8, 16, 1, true]} />{glassMat}</mesh>
         <mesh position={[0, 1.45, 0]}><cylinderGeometry args={[0.9, 0.9, 0.02, 32]} /><meshBasicMaterial color="#f1f5f9" /></mesh>
         {/* Impurities */}
         {progress < 1 && Array.from({length: 20}).map((_, i) => (
           <mesh key={i} position={[(Math.random()-0.5)*1.2, 1.48, (Math.random()-0.5)*1.2]} rotation={[Math.random(), Math.random(), 0]}>
             <boxGeometry args={[0.04, 0.02, 0.04]} /><meshBasicMaterial color="#475569" />
           </mesh>
         ))}
       </group>
    </group>
  );
};

const CrystallizeScene = ({ progress }: any) => {
  const crystalCount = Math.floor(progress * 30);
  const flameRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (flameRef.current) {
      flameRef.current.scale.y = 1 + Math.sin(clock.elapsedTime * 20) * 0.1;
    }
  });

  return (
    <group position={[0, -0.5, 0]}>
       {/* Bunsen Burner */}
       <mesh position={[0, -1, 0]}><cylinderGeometry args={[0.3, 0.4, 0.2, 16]} /><meshStandardMaterial color="#334155" metalness={0.8} /></mesh>
       <mesh position={[0, -0.4, 0]}><cylinderGeometry args={[0.08, 0.08, 1, 16]} /><meshStandardMaterial color="#94a3b8" metalness={0.9} /></mesh>
       <mesh ref={flameRef} position={[0, 0.4, 0]}><coneGeometry args={[0.15, 0.6, 16]} /><meshBasicMaterial color="#38bdf8" transparent opacity={0.8} /></mesh>

       {/* Evaporating Dish */}
       <mesh position={[0, 1.6, 0]}><sphereGeometry args={[1, 32, 16, 0, Math.PI*2, Math.PI/2, Math.PI/2]} />{glassMat}</mesh>
       
       {/* Liquid */}
       <mesh position={[0, 1.55 - progress*0.2, 0]}>
         <sphereGeometry args={[0.95, 32, 16, 0, Math.PI*2, Math.PI/2, Math.PI/2 - progress*0.2]} />
         <meshPhysicalMaterial transmission={0.6} roughness={0.1} color="#a78bfa" />
       </mesh>

       {/* Growing Octahedral Alum Crystals! */}
       {progress > 0.5 && Array.from({length: crystalCount}).map((_, i) => (
         <mesh key={i} position={[(Math.random()-0.5)*1.2, 0.6 + Math.random()*0.1, (Math.random()-0.5)*1.2]} rotation={[Math.random(), Math.random(), 0]}>
            <octahedronGeometry args={[0.1 + (progress - 0.5)*0.2]} />
            <meshPhysicalMaterial color="#ddd6fe" transmission={0.8} roughness={0.1} ior={1.5} />
         </mesh>
       ))}
    </group>
  );
};

const DoneScene = ({ progress }: any) => {
  const groupRef = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (groupRef.current) groupRef.current.rotation.y = clock.elapsedTime * 0.5;
  });
  return (
    <group ref={groupRef} position={[0, 0, 0]}>
       {/* Giant Perfect Octahedron representing Potash Alum */}
       <mesh>
         <octahedronGeometry args={[2]} />
         <meshPhysicalMaterial color="#c4b5fd" transmission={0.9} ior={1.6} roughness={0.1} clearcoat={1} dispersion={3} />
       </mesh>
       {/* Internal geometry for refraction fun */}
       <mesh>
         <octahedronGeometry args={[1.5]} />
         <meshPhysicalMaterial color="#a78bfa" transmission={0.5} wireframe={true} />
       </mesh>
    </group>
  );
};

const PotashAlumLab: React.FC<Props> = ({ hex }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [stepProgress, setStepProgress] = useState(0);
  const [running, setRunning] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setStepProgress(p => {
        if (p >= 1) { clearInterval(id); setRunning(false); return 1; }
        return p + 0.01;
      });
    }, 50);
    return () => clearInterval(id);
  }, [running]);

  const step = STEPS[currentStep];

  const nextStep = () => {
    if (currentStep < STEPS.length - 1) {
       setCurrentStep(s => s + 1); setStepProgress(0); setRunning(false);
    } else {
       setCompleted(true);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-full w-full bg-slate-950">
      <div className="flex-1 flex flex-col relative rounded-2xl overflow-hidden m-4 border border-white/10 shadow-2xl">
        <Canvas camera={{ position: [0, 2, 7], fov: 55 }}>
          <Environment preset="apartment" />
          <ambientLight intensity={0.7} />
          <pointLight position={[5, 10, 5]} intensity={1.5} color={step.color} />
          
          {currentStep === 0 && <DissolveScene progress={stepProgress} />}
          {currentStep === 1 && <FilterScene progress={stepProgress} />}
          {currentStep === 2 && <CrystallizeScene progress={stepProgress} />}
          {currentStep === 3 && <DoneScene progress={stepProgress} />}
          
          <ContactShadows position={[0, -2, 0]} opacity={0.5} scale={15} blur={2.5} far={4} color="#000" />
          <OrbitControls enablePan={true} enableZoom={true} target={[0, 0, 0]} maxPolarAngle={Math.PI/2}/>
        </Canvas>

        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3 shadow-xl max-w-[280px]">
          <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: step.color }}>Chemistry Lab — c11</p>
          <p className="text-white font-bold text-sm">3D Potash Alum Synthesis</p>
        </div>

        <div className="absolute bottom-4 left-0 w-full px-8 flex justify-center">
            <div className="bg-black/50 backdrop-blur-md p-1.5 rounded-2xl border border-white/10 flex gap-1 shadow-2xl">
               {STEPS.map((s, i) => (
                 <div key={i} className="h-2 rounded-full transition-all duration-300" style={{
                   width: 55, backgroundColor: i < currentStep ? s.color : i === currentStep ? `${s.color}80` : 'rgba(255,255,255,0.1)'
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
            <div className="text-center py-6">
              <CheckCircle size={56} className="mx-auto text-green-400 mb-4 drop-shadow-[0_0_15px_rgba(74,222,128,0.5)]" />
              <h3 className="text-xl font-bold text-white mb-2">Synthesis Complete!</h3>
              <p className="text-slate-400 text-sm mb-6">Pure octahedral crystals of KAl(SO₄)₂·12H₂O clearly visible.</p>
              <button onClick={() => { setCurrentStep(0); setStepProgress(0); setCompleted(false); }}
                className="w-full py-3 rounded-xl bg-slate-800 text-white font-bold hover:bg-slate-700 transition-all flex items-center justify-center gap-2 shadow-md">
                <RotateCcw size={16} /> Restart Synthesis
              </button>
            </div>
          ) : (
            <>
              <div className="p-3 rounded-xl border shadow-inner transition-colors duration-500" style={{ backgroundColor: `${step.color}15`, borderColor: `${step.color}40` }}>
                <p className="font-bold text-xs mb-1" style={{ color: step.color }}>{step.title}</p>
                <p className="text-slate-300 text-xs leading-relaxed">{step.instruction}</p>
              </div>
              
              <div className="bg-slate-950 p-4 rounded-xl border border-white/5 shadow-inner text-xs">
                <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-1 border-b border-white/5 pb-1">Reaction Chemistry</p>
                <p className="font-mono text-[10px] pt-1" style={{ color: step.color }}>{step.chemistry}</p>
              </div>

              <div className="flex gap-2 pt-2">
                <button onClick={() => setRunning(r => !r)} disabled={stepProgress >= 1}
                  className="flex-1 py-3 rounded-xl text-sm font-bold text-white transition-all shadow-lg active:scale-95 disabled:opacity-50"
                  style={{ backgroundColor: (running || stepProgress >= 1) ? '#475569' : step.color }}>
                  {running ? '⏸ Paused' : (stepProgress === 0 ? `▶️ ${step.action}` : '▶️ Resume')}
                </button>
                <button onClick={() => { setStepProgress(0); setRunning(false); }}
                  className="px-4 py-3 rounded-xl bg-slate-800 text-red-400 hover:bg-red-900/30 transition-colors">
                  <RotateCcw size={16} />
                </button>
              </div>

              <div className="bg-slate-800/50 rounded-full h-1 mt-2 mb-4 overflow-hidden border border-white/5">
                 <div className="h-full transition-all duration-300" style={{ width: `${stepProgress * 100}%`, backgroundColor: step.color }} />
              </div>

              {stepProgress >= 1 && (
                <button onClick={nextStep}
                  className="w-full py-3 rounded-xl text-sm font-bold text-white transition-all shadow-lg bg-green-600 hover:bg-green-500 active:scale-95 shadow-green-600/20">
                  {currentStep === STEPS.length - 1 ? '🎉 Finalize' : 'Next Step →'}
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PotashAlumLab;
