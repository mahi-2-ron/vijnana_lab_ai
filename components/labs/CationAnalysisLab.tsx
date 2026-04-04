import React, { useState, useRef, useEffect } from 'react';
import { RotateCcw, CheckCircle, FlaskConical, Beaker } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, RoundedBox, Html, Cylinder, Sphere, useCursor, Box } from '@react-three/drei';
import * as THREE from 'three';

interface Props { hex: string; }

type Reagent = { id: string; name: string; color: string; description: string; };
type CationResult = { cation: string; color: string; observation: string; confirmed: boolean; };

const REAGENTS: Reagent[] = [
  { id: 'hcl', name: 'Dil. HCl', color: '#e0f0ff', description: 'Group reagent — precipitates Pb²⁺, Hg₂²⁺, Ag⁺' },
  { id: 'h2s', name: 'H₂S gas', color: '#f5f5c0', description: 'Group II — precipitates HgS, PbS, CuS, As₂S₃' },
  { id: 'nh3', name: 'NH₄OH', color: '#e8ffe8', description: 'Group III — precipitates Fe(OH)₃, Al(OH)₃, Cr(OH)₃' },
  { id: 'naoh', name: 'NaOH', color: '#fff0f0', description: 'Group IV — dissolves Zn(OH)₂ in excess' },
  { id: 'k2c2o4', name: 'K₂C₂O₄', color: '#f0f0ff', description: 'Group V — precipitates CaC₂O₄ (white)' },
  { id: 'na2co3', name: 'Na₂CO₃', color: '#f5fff5', description: 'Group VI — precipitates MgCO₃, Na⁺ flame test' },
];

const CATION_TESTS: Record<string, CationResult> = {
  hcl: { cation: 'Pb²⁺ / Ag⁺', color: '#f0f0f0', observation: 'White precipitate (PbCl₂ or AgCl)', confirmed: false },
  h2s: { cation: 'Cu²⁺', color: '#3d2b00', observation: 'Black precipitate CuS forms', confirmed: false },
  nh3: { cation: 'Fe³⁺', color: '#8b5e00', observation: 'Reddish-brown ppt Fe(OH)₃', confirmed: false },
  naoh: { cation: 'Zn²⁺', color: '#e0ffe0', observation: 'White ppt soluble in excess NaOH', confirmed: false },
  k2c2o4: { cation: 'Ca²⁺', color: '#f5f5f5', observation: 'White precipitate CaC₂O₄', confirmed: false },
  na2co3: { cation: 'Mg²⁺ → Na⁺', color: '#fff8e0', observation: 'White ppt. Flame test (yellow=Na)', confirmed: false },
};

// 3D Interactive Reagent Bottle
const ReagentBottle = ({ reagent, position, onClick, isAdded }: { reagent: Reagent, position: [number,number,number], onClick: () => void, isAdded: boolean }) => {
  const [hovered, setHovered] = useState(false);
  useCursor(hovered, 'pointer', 'auto');
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
      if (groupRef.current) {
          groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, hovered ? position[1] + 0.3 : position[1], 0.1);
          groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, hovered ? state.clock.elapsedTime : 0, 0.1);
      }
  });

  return (
    <group ref={groupRef} position={position} onClick={(e) => { e.stopPropagation(); onClick(); }} onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }} onPointerOut={(e) => { e.stopPropagation(); setHovered(false); }}>
      {/* Bottle glass body */}
      <Cylinder args={[0.4, 0.4, 1.2, 16]} castShadow>
          <meshPhysicalMaterial color={reagent.color} transmission={0.7} opacity={0.9} roughness={0.1} transparent ior={1.3} thickness={0.1} />
      </Cylinder>
      {/* Liquid inside */}
      <Cylinder args={[0.35, 0.35, 0.8, 16]} position={[0, -0.15, 0]}>
          <meshPhysicalMaterial color={reagent.color} />
      </Cylinder>
      {/* Neck & Cap */}
      <Cylinder args={[0.15, 0.15, 0.4, 16]} position={[0, 0.8, 0]}><meshPhysicalMaterial color="#ffffff" transmission={0.8} roughness={0.1} /></Cylinder>
      <Cylinder args={[0.18, 0.18, 0.1, 16]} position={[0, 1.05, 0]}><meshStandardMaterial color={isAdded ? "#10b981" : "#1e293b"} /></Cylinder>

      <Html position={[0, -0.8, 0]} center>
          <div className={`px-2 py-1 flex flex-col items-center justify-center rounded-lg text-[9px] font-bold text-center border backdrop-blur-md shadow-lg transition-colors ${hovered ? 'bg-[#1e293b]/90 text-white border-blue-400' : 'bg-black/60 text-slate-300 border-white/10'}`}>
             <span>{reagent.name}</span>
             {isAdded && <span className="text-emerald-400 mt-0.5"><CheckCircle size={10} /></span>}
          </div>
      </Html>
    </group>
  );
};


const CationLabsScene = ({ addedReagents, handleAddReagent }: any) => {
    
   // Determine test tube solution visual state
   const currentReagent = addedReagents.length > 0 ? addedReagents[addedReagents.length - 1] : null;
   const result = currentReagent ? CATION_TESTS[currentReagent] : null;
   
   const solutionColor = result ? result.color : '#e8d5b0'; // default salt solution color
   const liquidMatRef = useRef<THREE.MeshPhysicalMaterial>(null);

   // Droplet animation state
   const [droplets, setDroplets] = useState<{ id: number, color: string, startT: number }[]>([]);
   
   useEffect(() => {
       if (currentReagent) {
           // Fire droplet animation
           const r = REAGENTS.find(x => x.id === currentReagent);
           if (r) {
               setDroplets(prev => [...prev, { id: Date.now(), color: r.color, startT: Date.now() }]);
               // Cleanup droplet after 1s
               setTimeout(() => {
                   setDroplets(prev => prev.filter(d => d.startT !== prev[prev.length-1].startT));
               }, 1000);
           }
       }
   }, [currentReagent]);

   useFrame(() => {
       if (liquidMatRef.current) {
          liquidMatRef.current.color.lerp(new THREE.Color(solutionColor), 0.05);
       }
   });

   return (
    <group position={[0, -1, 0]}>
       {/* Laboratory Bench */}
       <Cylinder args={[6, 6, 0.2, 32]} position={[0, -0.1, 0]} receiveShadow>
         <meshPhysicalMaterial color="#020617" roughness={0.8} />
       </Cylinder>

       {/* Reagent Bottles Semicircle */}
       {REAGENTS.map((r, i) => {
           // Radially position them behind the test tube
           const angle = Math.PI - 0.2 + (i * ((Math.PI+0.4) / (REAGENTS.length - 1)));
           const radius = 3.5;
           const px = Math.cos(angle) * radius;
           const pz = Math.sin(angle) * radius - 0.5;
           return (
               <ReagentBottle 
                    key={r.id} 
                    reagent={r} 
                    position={[px, 0.7, pz]} 
                    isAdded={addedReagents.includes(r.id)}
                    onClick={() => handleAddReagent(r.id)} 
               />
           );
       })}

       {/* Central Test Tube Rack */}
       <Box args={[1.5, 0.2, 1.5]} position={[0, 0.1, 2]} castShadow receiveShadow>
           <meshStandardMaterial color="#334155" />
       </Box>
       {/* Support pillars */}
       <Cylinder args={[0.05, 0.05, 1.5, 8]} position={[-0.6, 0.85, 1.4]}><meshStandardMaterial color="#cbd5e1" /></Cylinder>
       <Cylinder args={[0.05, 0.05, 1.5, 8]} position={[0.6, 0.85, 1.4]}><meshStandardMaterial color="#cbd5e1" /></Cylinder>
       <Box args={[1.5, 0.1, 1.5]} position={[0, 1.6, 2]}><meshStandardMaterial color="#334155" /></Box>

       {/* Main Test Tube */}
       <group position={[0, 1.5, 2]}>
          {/* Glass body */}
          <Cylinder args={[0.35, 0.35, 2.8, 16]} position={[0, 0, 0]} castShadow>
             <meshPhysicalMaterial color="#ffffff" transmission={0.95} opacity={1} roughness={0.0} ior={1.5} thickness={0.1} transparent side={THREE.DoubleSide} />
          </Cylinder>
          <Sphere args={[0.35, 16, 16, 0, Math.PI*2, 0, Math.PI/2]} position={[0, -1.4, 0]} rotation={[Math.PI, 0, 0]}>
             <meshPhysicalMaterial color="#ffffff" transmission={0.95} opacity={1} roughness={0.0} ior={1.5} thickness={0.1} transparent side={THREE.DoubleSide} />
          </Sphere>
          {/* Lip */}
          <Cylinder args={[0.4, 0.4, 0.1, 16]} position={[0, 1.4, 0]}>
             <meshPhysicalMaterial color="#ffffff" transmission={0.9} roughness={0.1} />
          </Cylinder>

          {/* Liquid Inside */}
          <Cylinder args={[0.33, 0.33, 1.5, 16]} position={[0, -0.65, 0]} receiveShadow>
              <meshPhysicalMaterial ref={liquidMatRef} color={solutionColor} transmission={0.6} opacity={0.9} roughness={0.2} transparent ior={1.33} />
          </Cylinder>
          <Sphere args={[0.33, 16, 16, 0, Math.PI*2, 0, Math.PI/2]} position={[0, -1.4, 0]} rotation={[Math.PI, 0, 0]}>
              <meshPhysicalMaterial color={solutionColor} transmission={0.6} opacity={0.9} roughness={0.2} transparent ior={1.33} />
          </Sphere>

          {/* Precipitate settling at bottom (if any) */}
          {result && result.cation !== 'Na⁺' && (
              <Sphere args={[0.3, 16, 16, 0, Math.PI*2, 0, Math.PI/2]} position={[0, -1.35, 0]} rotation={[Math.PI, 0, 0]}>
                  <meshPhysicalMaterial color={result.color} roughness={0.9} transmission={0} />
              </Sphere>
          )}

          {/* Falling Droplets */}
          {droplets.map(d => (
              <DropletParticle key={d.id} color={d.color} startTime={d.startT} />
          ))}

          {/* Label below */}
          <Html position={[0, -2, 0]} center>
              <div className="bg-black/60 px-3 py-1 rounded-xl font-bold text-xs uppercase tracking-widest text-emerald-300 border border-emerald-500/30 backdrop-blur-md">
                 Analyte Sample
              </div>
          </Html>
       </group>
    </group>
   );
};

const DropletParticle = ({ color, startTime }: { color: string, startTime: number }) => {
    const meshRef = useRef<THREE.Mesh>(null);
    useFrame(() => {
        if (meshRef.current) {
            const elapsed = (Date.now() - startTime) / 1000;
            // fall from y=2 to y=0
            meshRef.current.position.y = 2 - Math.pow(elapsed * 2, 2);
            if (meshRef.current.position.y < 0) {
               meshRef.current.visible = false; // hit surface
            }
        }
    });

    return (
        <mesh ref={meshRef} position={[0, 2, 0]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshPhysicalMaterial color={color} transmission={0.8} />
        </mesh>
    );
};

const CationAnalysisLab: React.FC<Props> = ({ hex }) => {
  const [addedReagents, setAddedReagents] = useState<string[]>([]);
  const [step, setStep] = useState(0);

  const handleAddReagent = (id: string) => {
    if (!addedReagents.includes(id)) {
      setAddedReagents(prev => [...prev, id]);
      setStep(s => s + 1);
    }
  };

  const lastResult: CationResult | null = addedReagents.length > 0
    ? CATION_TESTS[addedReagents[addedReagents.length - 1]] ?? null
    : null;

  return (
    <div className="flex flex-col md:flex-row h-full w-full bg-[#050505] overflow-hidden text-slate-200 select-none">
      
      {/* 3D Visualization */}
      <div className="flex-1 flex flex-col relative rounded-2xl overflow-hidden m-4 border border-white/10 shadow-2xl">
        <div className="absolute inset-x-0 top-0 p-4 bg-gradient-to-b from-black/80 to-transparent z-10 flex justify-between items-start">
            <div>
                <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400"><Beaker size={18} /></span>
                    Systematic Qualitative Analysis (Cations)
                </h2>
                <p className="text-[11px] font-medium text-slate-400 uppercase tracking-widest mt-1">3D Reagent Interaction</p>
            </div>
            {/* Help Chip */}
            <div className="bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-[10px] text-slate-300 font-bold uppercase tracking-widest shadow-inner">
               Interact: Click Bottles
            </div>
        </div>

        <Canvas camera={{ position: [0, 4, 9], fov: 40 }}>
            <Environment preset="apartment" />
            <ambientLight intensity={0.5} />
            <pointLight position={[5, 10, 5]} intensity={1.5} />
            <pointLight position={[-5, 5, -5]} color="#10b981" intensity={0.5} />
            
            <CationLabsScene addedReagents={addedReagents} handleAddReagent={handleAddReagent} />

            <ContactShadows position={[0, -1.05, 0]} opacity={0.6} scale={15} blur={2.5} far={4} color="#000" />
            <OrbitControls enablePan={true} enableZoom={true} maxPolarAngle={Math.PI / 2 - 0.1} minPolarAngle={0.2} />
        </Canvas>

        {/* Observation HUD Overlay */}
        {lastResult && (
           <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 bg-black/80 p-5 rounded-2xl backdrop-blur-xl border border-white/10 shadow-2xl animate-fade-in-up w-full max-w-sm">
                <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400 border-b border-emerald-500/30 pb-1 mb-2 w-full text-center">Inference Log</span>
                <p className="text-sm font-medium text-slate-200 text-center">"{lastResult.observation}"</p>
                <div className="flex items-center gap-2 mt-2 bg-emerald-900/40 px-4 py-2 rounded-xl border border-emerald-500/20">
                    <CheckCircle size={16} className="text-emerald-400" /> 
                    <span className="text-lg font-black text-white">Detected: {lastResult.cation}</span>
                </div>
           </div>
        )}
      </div>

      {/* Control Panel */}
      <div className="w-full md:w-[320px] shrink-0 bg-[#0a0a0a] border-l border-white/10 flex flex-col z-20 shadow-[-10px_0_30px_rgba(0,0,0,0.5)]">
        <div className="p-6 border-b border-white/5">
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-2 border-b border-emerald-500/20 inline-block pb-1">Chemistry Lab — c7</p>
          <h2 className="text-xl font-bold text-white tracking-tight">Cation Analysis</h2>
        </div>
        
        <div className="flex-1 p-6 space-y-6 overflow-y-auto">
          
          <div className="bg-emerald-900/20 border border-emerald-500/20 p-4 rounded-xl backdrop-blur-md">
             <p className="text-emerald-100 text-xs leading-relaxed">Systematically add group reagents to the analyte to identify unknown cations by observing unique precipitate colours.</p>
          </div>

          <div>
             <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">Group Reagents Database</h3>
             <div className="space-y-2">
               {REAGENTS.map(r => (
                 <div key={r.id} onClick={() => handleAddReagent(r.id)}
                   className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer hover:bg-white/5 ${addedReagents.includes(r.id) ? 'border-emerald-500/40 bg-emerald-900/20' : 'border-white/10 bg-[#111]'}`}>
                   <div className="w-8 h-8 rounded-lg shrink-0 border border-white/20 shadow-inner mt-1" style={{ background: r.color }} />
                   <div className="flex-1">
                     <p className={`font-bold text-sm ${addedReagents.includes(r.id) ? 'text-emerald-400' : 'text-slate-200'}`}>{r.name}</p>
                     <p className="text-[10px] text-slate-500 leading-tight mt-1">{r.description}</p>
                   </div>
                   {addedReagents.includes(r.id) && <CheckCircle size={14} className="text-emerald-400 shrink-0 mt-1" />}
                 </div>
               ))}
             </div>
          </div>

          <button onClick={() => { setAddedReagents([]); setStep(0); }} className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-slate-800 text-red-400 hover:bg-slate-700 hover:text-red-300 transition-colors font-bold shadow-lg shadow-black mt-4"><RotateCcw size={16} /> Prepare New Sample</button>

        </div>
      </div>
    </div>
  );
};

export default CationAnalysisLab;
