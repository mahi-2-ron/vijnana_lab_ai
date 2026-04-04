import React, { useState, useRef, useEffect } from 'react';
import { RotateCcw, FlaskConical, Beaker, CheckCircle } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, RoundedBox, Html, Cylinder, Sphere } from '@react-three/drei';
import * as THREE from 'three';

interface Props { hex: string; }

const ANION_TESTS = [
  {
    id: 'cl', name: 'Cl⁻ (Chloride)', reagent: 'AgNO₃ + Dil HNO₃',
    observation: 'Curdy white ppt. of AgCl — soluble in NH₄OH',
    precipColor: '#f0f0f0', confirmColor: '#e0f0e0',
    reagentColor: '#e8f8ff',
  },
  {
    id: 'br', name: 'Br⁻ (Bromide)', reagent: 'AgNO₃',
    observation: 'Pale yellow ppt. AgBr — partially soluble in NH₄OH',
    precipColor: '#f5f0a0', confirmColor: '#f5f0a0',
    reagentColor: '#e8f8ff',
  },
  {
    id: 'i', name: 'I⁻ (Iodide)', reagent: 'AgNO₃',
    observation: 'Yellow ppt. AgI — insoluble in NH₄OH',
    precipColor: '#e8d040', confirmColor: '#e8d040',
    reagentColor: '#e8f8ff',
  },
  {
    id: 'so4', name: 'SO₄²⁻ (Sulphate)', reagent: 'BaCl₂ + Dil HCl',
    observation: 'White ppt. BaSO₄ — insoluble in HCl',
    precipColor: '#ffffff', confirmColor: '#ffffff',
    reagentColor: '#fffde8',
  },
  {
    id: 'co3', name: 'CO₃²⁻ (Carbonate)', reagent: 'Dil HCl → CO₂ brisk effervescence',
    observation: 'Brisk CO₂ bubbles. Gas turns lime water milky.',
    precipColor: 'transparent', confirmColor: 'rgba(200,255,200,0.3)',
    reagentColor: '#ffe8e8',
  },
  {
    id: 'no3', name: 'NO₃⁻ (Nitrate)', reagent: 'Brown ring test (FeSO₄ + conc H₂SO₄)',
    observation: 'Brown ring at interface of FeSO₄ + H₂SO₄ layers',
    precipColor: '#6b3a00', confirmColor: '#4b2800',
    reagentColor: '#ffd8a0',
  },
];

const AnionFlaskScene = ({ selectedAnion, testProgress, testDone }: any) => {
   const liquidMatRef = useRef<THREE.MeshPhysicalMaterial>(null);
   const brownRingRef = useRef<THREE.Mesh>(null);
   const dropperGroupRef = useRef<THREE.Group>(null);
   
   // Droplet logic
   useFrame((state) => {
       if (dropperGroupRef.current) {
           // Move dropper down if testing
           const active = testProgress > 0 && testProgress < 0.5;
           const targetY = active ? 2.5 : 4;
           dropperGroupRef.current.position.y = THREE.MathUtils.lerp(dropperGroupRef.current.position.y, targetY, 0.1);
       }
   });

   return (
    <group position={[0, -1.5, 0]}>
       {/* Laboratory Bench */}
       <Cylinder args={[5, 5, 0.2, 32]} position={[0, -0.1, 0]} receiveShadow>
         <meshPhysicalMaterial color="#1a202c" roughness={0.9} />
       </Cylinder>

       {/* Flask Stand base */}
       <RoundedBox args={[2, 0.2, 2]} position={[0, 0.1, 0]} castShadow receiveShadow>
           <meshStandardMaterial color="#475569" />
       </RoundedBox>

       {/* Erlenmeyer Flask or Test Tube (Using larger test tube for visibility) */}
       <group position={[0, 1.8, 0]}>
          <Cylinder args={[0.5, 0.5, 3.2, 32]} position={[0, 0, 0]} castShadow>
             <meshPhysicalMaterial color="#ffffff" transmission={0.99} opacity={1} roughness={0.0} ior={1.5} thickness={0.1} transparent side={THREE.DoubleSide} />
          </Cylinder>
          <Sphere args={[0.5, 32, 16, 0, Math.PI*2, 0, Math.PI/2]} position={[0, -1.6, 0]} rotation={[Math.PI, 0, 0]}>
             <meshPhysicalMaterial color="#ffffff" transmission={0.99} opacity={1} roughness={0.0} ior={1.5} thickness={0.1} transparent side={THREE.DoubleSide} />
          </Sphere>
          
          <Cylinder args={[0.55, 0.55, 0.1, 32]} position={[0, 1.6, 0]}>
             <meshPhysicalMaterial color="#ffffff" transmission={0.9} roughness={0.1} />
          </Cylinder>

          {/* Liquid Inside */}
          <Cylinder args={[0.48, 0.48, 1.6, 32]} position={[0, -0.8, 0]} receiveShadow>
              <meshPhysicalMaterial color="#c8e8ff" transmission={0.6} opacity={0.9} roughness={0.2} transparent ior={1.33} />
          </Cylinder>
          <Sphere args={[0.48, 32, 16, 0, Math.PI*2, 0, Math.PI/2]} position={[0, -1.6, 0]} rotation={[Math.PI, 0, 0]}>
              <meshPhysicalMaterial color="#c8e8ff" transmission={0.6} opacity={0.9} roughness={0.2} transparent ior={1.33} />
          </Sphere>

          {/* === DYNAMIC REACTIONS === */}
          
          {/* 1. Heavy Precipitate (AgCl, AgBr, AgI, BaSO4) */}
          {testDone && selectedAnion.precipColor !== 'transparent' && selectedAnion.id !== 'no3' && (
              <Sphere args={[0.46, 32, 16, 0, Math.PI*2, 0, Math.PI/2]} position={[0, -1.58, 0]} rotation={[Math.PI, 0, 0]}>
                  <meshPhysicalMaterial color={selectedAnion.precipColor} roughness={0.9} transmission={0} />
              </Sphere>
          )}

          {/* 2. Brown Ring Test (NO3-) */}
          {testDone && selectedAnion.id === 'no3' && (
               <Cylinder ref={brownRingRef} args={[0.48, 0.48, 0.1, 32]} position={[0, 0, 0]}>
                   <meshStandardMaterial color={selectedAnion.precipColor} opacity={0.9} transparent />
               </Cylinder>
          )}

          {/* 3. Effervescence Bubbles (CO3 2-) */}
          {testProgress > 0 && selectedAnion.id === 'co3' && (
              <group position={[0, -1.2, 0]}>
                 <Bubbles active={testProgress < 1} />
              </group>
          )}

       </group>

       {/* Animated Dropper */}
       <group ref={dropperGroupRef} position={[0, 4, 0]}>
         <Cylinder args={[0.1, 0.1, 1, 16]} position={[0, 0, 0]}>
             <meshPhysicalMaterial color="#ffffff" transmission={0.9} roughness={0.1} />
         </Cylinder>
         <Cylinder args={[0.2, 0.2, 0.5, 16]} position={[0, 0.7, 0]}>
             <meshStandardMaterial color="#334155" />
         </Cylinder>
         {/* Drop inside */}
         <Cylinder args={[0.08, 0.08, 0.6, 16]} position={[0, -0.2, 0]}>
             <meshPhysicalMaterial color={selectedAnion.reagentColor} />
         </Cylinder>

         {/* Floating drop */}
         {testProgress > 0.2 && testProgress < 0.6 && (
             <FallingDrop color={selectedAnion.reagentColor} />
         )}
       </group>
    </group>
   );
};

const Bubbles = ({ active }: { active: boolean }) => {
    const groupRef = useRef<THREE.Group>(null);
    useFrame((state) => {
        if (!groupRef.current || !active) return;
        groupRef.current.children.forEach((c) => {
            c.position.y += Math.random() * 0.05 + 0.02;
            c.position.x += (Math.random() - 0.5) * 0.02;
            if (c.position.y > 1.2) {
                c.position.y = 0;
                c.position.x = (Math.random() - 0.5) * 0.6;
            }
        });
    });

    return (
        <group ref={groupRef}>
            {[...Array(20)].map((_, i) => (
                <Sphere key={i} args={[0.04, 8, 8]} position={[(Math.random()-0.5)*0.6, Math.random(), (Math.random()-0.5)*0.6]}>
                    <meshPhysicalMaterial color="#ffffff" transmission={0.9} roughness={0} />
                </Sphere>
            ))}
        </group>
    );
};

const FallingDrop = ({ color }: { color: string }) => {
    const ref = useRef<THREE.Mesh>(null);
    useFrame(() => {
        if(ref.current) {
            ref.current.position.y -= 0.1;
        }
    });

    return (
        <mesh ref={ref} position={[0, -0.6, 0]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshPhysicalMaterial color={color} transmission={0.8} />
        </mesh>
    );
}


const AnionAnalysisLab: React.FC<Props> = ({ hex }) => {
  const [selectedAnion, setSelectedAnion] = useState(ANION_TESTS[0]);
  const [testDone, setTestDone] = useState(false);
  const [testProgress, setTestProgress] = useState(0); 
  const sweepRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  const runTest = () => {
    setTestProgress(0);
    setTestDone(false);
    clearInterval(sweepRef.current);
    sweepRef.current = setInterval(() => {
      setTestProgress(p => {
        if (p >= 1) { 
            clearInterval(sweepRef.current); 
            setTestDone(true); 
            return 1; 
        }
        return p + 0.05;
      });
    }, 80);
  };

  return (
    <div className="flex flex-col md:flex-row h-full w-full bg-[#050505] overflow-hidden text-slate-200 select-none">
      
      {/* 3D Visualization */}
      <div className="flex-1 flex flex-col relative rounded-2xl overflow-hidden m-4 border border-white/10 shadow-2xl">
        <div className="absolute inset-x-0 top-0 p-4 bg-gradient-to-b from-black/80 to-transparent z-10 flex justify-between items-start">
            <div>
                <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400"><FlaskConical size={18} /></span>
                    Systematic Qualitative Analysis (Anions)
                </h2>
                <p className="text-[11px] font-medium text-slate-400 uppercase tracking-widest mt-1">Reaction Chamber 3D</p>
            </div>
            {/* Status chip */}
            <div className={`backdrop-blur-md px-3 py-1.5 rounded-xl border text-[10px] font-bold uppercase tracking-widest shadow-inner transition-colors ${testDone ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-400' : 'bg-black/40 border-white/10 text-slate-300'}`}>
               {testDone ? 'Reaction Complete' : 'Waiting...'}
            </div>
        </div>

        <Canvas camera={{ position: [0, 2, 8], fov: 40 }}>
            <Environment preset="city" />
            <ambientLight intensity={0.4} />
            <pointLight position={[5, 10, 5]} intensity={1.5} />
            <pointLight position={[-5, 5, -5]} color="#06b6d4" intensity={1} />
            
            <AnionFlaskScene selectedAnion={selectedAnion} testProgress={testProgress} testDone={testDone} />

            <ContactShadows position={[0, -1.5, 0]} opacity={0.6} scale={15} blur={2.5} far={4} color="#000" />
            <OrbitControls enablePan={true} enableZoom={true} maxPolarAngle={Math.PI / 2 - 0.1} />
        </Canvas>

        {/* Dynamic Data Overlay */}
        {testDone && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full max-w-sm flex items-center gap-4 bg-black/80 p-4 rounded-xl border border-white/10 shadow-2xl backdrop-blur-md animate-fade-in-up">
                <div className="flex-1">
                    <p className="text-[10px] uppercase font-bold tracking-widest text-cyan-400 mb-1">Visual Observation</p>
                    <p className="font-bold text-white leading-snug">{selectedAnion.observation}</p>
                </div>
                <div className="shrink-0 bg-cyan-900/40 p-3 rounded-xl border border-cyan-500/20 text-center">
                    <CheckCircle size={18} className="mx-auto text-cyan-400 mb-1" />
                    <p className="text-[10px] font-bold text-cyan-300 uppercase tracking-widest">Confirmed</p>
                </div>
            </div>
        )}
      </div>

      <div className="w-full md:w-[320px] shrink-0 bg-[#0a0a0a] border-l border-white/10 flex flex-col z-20 shadow-[-10px_0_30px_rgba(0,0,0,0.5)]">
        <div className="p-6 border-b border-white/5">
          <p className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-2 border-b border-cyan-500/20 inline-block pb-1">Chemistry Lab — c8</p>
          <h2 className="text-xl font-bold text-white tracking-tight">Anion Analysis</h2>
        </div>
        
        <div className="flex-1 p-6 space-y-6 overflow-y-auto">
          
          <div className="bg-cyan-900/20 border border-cyan-500/20 p-4 rounded-xl backdrop-blur-md">
            <p className="text-cyan-100 text-xs leading-relaxed">Select an anion salt solution to test, then automatically dispense the precise reagent to observe the characteristic chemical reaction.</p>
          </div>

          <div>
             <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 border-b border-white/10 pb-1">Select Analyte (Anion)</h3>
             <div className="space-y-2">
                 {ANION_TESTS.map(a => (
                     <button key={a.id} onClick={() => { setSelectedAnion(a); setTestDone(false); setTestProgress(0); }}
                       className={`w-full p-3 rounded-xl text-left transition-all relative overflow-hidden group ${selectedAnion.id === a.id ? 'border-cyan-500 bg-cyan-900/20' : 'border-white/10 bg-[#111] hover:border-cyan-500/50'}`}
                       style={{ border: `1px solid ${selectedAnion.id === a.id ? '#06b6d4' : 'rgba(255,255,255,0.05)'}` }}>
                       {selectedAnion.id === a.id && <div className="absolute inset-0 bg-cyan-500/10" />}
                       <span className={`relative z-10 font-bold text-sm ${selectedAnion.id === a.id ? 'text-cyan-300' : 'text-slate-300'}`}>{a.name}</span>
                     </button>
                 ))}
             </div>
          </div>

          <div className="bg-[#111] p-4 rounded-xl border border-white/5 shadow-inner">
             <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Required Reagent</p>
             <p className="font-mono text-cyan-400 text-sm font-bold">{selectedAnion.reagent}</p>
          </div>

          <button onClick={runTest} disabled={testProgress > 0 && testProgress < 1}
            className="w-full py-4 rounded-xl font-bold text-white transition-all shadow-lg shadow-cyan-900/40 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
            style={{ backgroundColor: hex }}>
            <DropletIcon size={16} /> Dispense Reagent & Test
          </button>

          <button onClick={() => { setTestDone(false); setTestProgress(0); }} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white transition-colors font-bold"><RotateCcw size={14} /> Clear Flask</button>

        </div>
      </div>
    </div>
  );
};

function DropletIcon({ size }: { size: number }) {
    return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"></path></svg>
}

export default AnionAnalysisLab;
