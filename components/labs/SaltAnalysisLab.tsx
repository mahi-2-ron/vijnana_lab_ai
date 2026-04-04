import React, { useRef, useEffect, useState } from 'react';
import { RotateCcw, CheckCircle } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Html } from '@react-three/drei';
import * as THREE from 'three';

interface Props { hex: string; }

const REAGENTS = [
  { id: 'hcl', name: 'Dil. HCl', color: '#fcd34d', desc: 'Group 1 reagent — precipitates Pb²⁺, Ag⁺, Hg₂²⁺ as white chlorides.' },
  { id: 'h2s', name: 'H₂S gas', color: '#a3e635', desc: 'Group 2 reagent (acidic) — precipitates Cu²⁺ (black CuS), Pb²⁺ (black).' },
  { id: 'naoh', name: 'NaOH', color: '#f9a8d4', desc: 'Tests for Cu²⁺ (blue ppt), Fe³⁺ (reddish-brown), Al³⁺ (white).' },
  { id: 'nh4oh', name: 'NH₄OH', color: '#a78bfa', desc: 'Group 3 reagent — Fe(OH)₃ reddish-brown ppt.' },
  { id: 'flame', name: 'Flame Test', color: '#fb923c', desc: 'Na⁺(Yellow), K⁺(Lilac), Ca²⁺(Brick red), Cu²⁺(Green)' },
];

const CATIONS = [
  { id: 'cu', name: 'Cu²⁺', color: '#1d4ed8', salt: 'CuSO₄', reactions: { hcl: null, h2s: { color: '#09090b', ppt: 'Black CuS ppt' }, naoh: { color: '#1d4ed8', ppt: 'Blue Cu(OH)₂ ppt' }, nh4oh: { color: '#1e3a8a', ppt: 'Deep blue complex' }, flame: { color: '#22c55e', ppt: 'Blue-green flame' } } },
  { id: 'fe', name: 'Fe³⁺', color: '#d97706', salt: 'FeCl₃', reactions: { hcl: null, h2s: null, naoh: { color: '#78350f', ppt: 'Reddish-brown Fe(OH)₃ ppt' }, nh4oh: { color: '#92400e', ppt: 'Reddish-brown Fe(OH)₃' }, flame: null } },
  { id: 'pb', name: 'Pb²⁺', color: '#94a3b8', salt: 'Pb(NO₃)₂', reactions: { hcl: { color: '#ffffff', ppt: 'White PbCl₂ ppt (Group 1)' }, h2s: { color: '#09090b', ppt: 'Black PbS ppt' }, naoh: { color: '#f8fafc', ppt: 'White Pb(OH)₂ ppt' }, nh4oh: { color: '#f1f5f9', ppt: 'White ppt' }, flame: null } },
];

const STEPS = [
  { title: 'Prepare Salt Solution', instruction: 'Dissolve the unknown salt in distilled water.', action: 'Dissolve Salt 💧' },
  { title: 'Note Color', instruction: 'Observe initial solution color (Cu:Blue, Fe:Yellow-brown, Pb:Clear).', action: 'Observe 👁️' },
  { title: 'Preliminary Test (Grp 1)', instruction: 'Add Dilute HCl. White precipitate indicates Group 1 (Pb²⁺).', action: 'Test Group 1 🧪' },
  { title: 'Confirmatory Tests', instruction: 'Add specific reagents to identify the cation by precipitate color.', action: 'Proceed to Reagents 🔬' },
  { title: 'Flame Test Analysis', instruction: 'Expose a salt-dipped platinum loop to the Bunsen burner flame.', action: 'Ignite Burner 🔥' },
];

const Flame = ({ color }: { color: string }) => {
   const tRef = useRef<THREE.Group>(null);
   useFrame(({ clock }) => {
      if(tRef.current) {
         tRef.current.children.forEach((c: any, i: number) => {
            if(c.isMesh) {
               const pPhase = (clock.elapsedTime * 2 + i * 0.1) % 1;
               c.position.y = pPhase * 1.5;
               c.scale.setScalar((1 - pPhase) * 1.5);
               c.position.x = Math.sin(clock.elapsedTime * 5 + i) * 0.1 * (1-pPhase);
               c.position.z = Math.cos(clock.elapsedTime * 4 + i) * 0.1 * (1-pPhase);
            }
         });
      }
   });
   
   return (
      <group position={[1.5, -0.6, 0]}>
         {/* Bunsen Burner Base */}
         <mesh position={[0, -0.2, 0]}><cylinderGeometry args={[0.3, 0.4, 0.4, 32]} /><meshStandardMaterial color="#475569" metalness={0.7} roughness={0.3} /></mesh>
         <mesh position={[0, 0.5, 0]}><cylinderGeometry args={[0.08, 0.08, 1, 16]} /><meshStandardMaterial color="#64748b" metalness={0.8} roughness={0.2} /></mesh>
         
         <group position={[0, 1, 0]} ref={tRef}>
            {Array.from({length: 20}).map((_, i) => (
               <mesh key={i}>
                  <sphereGeometry args={[0.15]} />
                  <meshBasicMaterial color={color} transparent opacity={0.6} blending={THREE.AdditiveBlending} depthWrite={false} />
               </mesh>
            ))}
         </group>
         <pointLight position={[0, 1.5, 0]} color={color} intensity={2} distance={5} />
         
         {/* Platinum Loop coming in from right */}
         <group position={[0.5, 1.2, 0]} rotation={[0, 0, Math.PI/2]}>
            <mesh position={[0, 0.5, 0]}><cylinderGeometry args={[0.01, 0.01, 1]} /><meshStandardMaterial color="#cbd5e1" metalness={0.9} /></mesh>
            <mesh position={[0, -0.1, 0]} rotation={[0, 0, 0]}><torusGeometry args={[0.05, 0.01, 8, 16]} /><meshStandardMaterial color="#cbd5e1" metalness={0.9} /></mesh>
         </group>
      </group>
   )
}

const TubeTest = ({ step, cation, reaction, appliedReagent, animPpt }: any) => {
   const liqColor = reaction ? reaction.color : (step >= 1 ? cation.color : '#e2e8f0');
   
   return (
      <group position={[-1, -0.3, 0]}>
        {/* Glass Tube */}
        <mesh position={[0, 0, 0]}>
           <cylinderGeometry args={[0.3, 0.3, 3, 32, 1, true]} />
           <meshPhysicalMaterial transmission={0.95} roughness={0} ior={1.4} thickness={0.1} color="#f8fafc" side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0, -1.5, 0]}>
           <sphereGeometry args={[0.3, 32, 16, 0, Math.PI*2, Math.PI/2, Math.PI/2]} />
           <meshPhysicalMaterial transmission={0.95} roughness={0} ior={1.4} thickness={0.1} color="#f8fafc" side={THREE.DoubleSide} />
        </mesh>

        {/* Liquid Volume */}
        <mesh position={[0, -0.6, 0]}>
           <cylinderGeometry args={[0.26, 0.26, 1.8, 32]} />
           <meshPhysicalMaterial transmission={reaction ? (1 - animPpt) : 0.8} color={liqColor} roughness={0.1} transparent opacity={0.8} />
        </mesh>
        <mesh position={[0, -1.5, 0]}>
           <sphereGeometry args={[0.26, 32, 16, 0, Math.PI*2, Math.PI/2, Math.PI/2]} />
           <meshPhysicalMaterial transmission={reaction ? (1 - animPpt) : 0.8} color={liqColor} roughness={0.1} transparent opacity={0.8} />
        </mesh>

        {/* Precipitate settling */}
        {reaction && animPpt > 0 && (
           <group position={[0, -1.5, 0]}>
              <mesh position={[0, (animPpt*0.3), 0]} scale={[1, animPpt, 1]}>
                 <sphereGeometry args={[0.25, 32, 16, 0, Math.PI*2, Math.PI/2, Math.PI/2]} />
                 <meshBasicMaterial color={reaction.color} />
              </mesh>
              {Array.from({length: 15}).map((_, i) => (
                <mesh key={i} position={[(Math.random()-0.5)*0.4, 1.5 - (animPpt * 2) + Math.random()*0.5, (Math.random()-0.5)*0.4]}>
                   <sphereGeometry args={[0.04]} />
                   <meshBasicMaterial color={reaction.color} />
                </mesh>
              ))}
           </group>
        )}

        {/* Dropper if reagent added */}
        {appliedReagent && appliedReagent !== 'flame' && animPpt < 0.2 && (
           <mesh position={[0, 1.8 - (animPpt * 5), 0]}>
              <sphereGeometry args={[0.08]} />
              <meshPhysicalMaterial color={REAGENTS.find(r=>r.id===appliedReagent)?.color || "#fff"} transmission={0.6} />
           </mesh>
        )}
      </group>
   )
}

const SaltAnalysisLab: React.FC<Props> = ({ hex }) => {
  const [step, setStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [selectedCation, setSelectedCation] = useState(0);
  const [appliedReagent, setAppliedReagent] = useState<string | null>(null);
  const [animPpt, setAnimPpt] = useState(0);

  const cation = CATIONS[selectedCation];
  const reaction = appliedReagent && appliedReagent !== 'flame' ? cation.reactions[appliedReagent as keyof typeof cation.reactions] : null;

  const applyReagent = (id: string) => {
    setAppliedReagent(id);
    setAnimPpt(0);
    
    if(id !== 'flame') {
      let p = 0;
      const iv = setInterval(() => {
        p += 0.05;
        if(p > 1) p = 1;
        setAnimPpt(p);
        if (p === 1) clearInterval(iv);
      }, 50);
    }
  };

  const handleNext = () => {
    if (step < STEPS.length - 1) setStep(s => s + 1);
    else setCompleted(true);
  };

  const reset = () => { 
    setStep(0); setCompleted(false); setAppliedReagent(null); setAnimPpt(0); 
  };

  const current = STEPS[step];

  return (
    <div className="flex flex-col md:flex-row h-full w-full bg-slate-950">
      <div className="flex-1 relative rounded-2xl overflow-hidden m-4 border border-white/10 shadow-2xl">
        <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
          <Environment preset="apartment" />
          <ambientLight intensity={0.6} />
          <pointLight position={[0, 10, 5]} intensity={1.5} color="#cbd5e1" />
          
          {appliedReagent !== 'flame' ? (
             <TubeTest step={step} cation={cation} reaction={reaction} appliedReagent={appliedReagent} animPpt={animPpt} />
          ) : (
             <Flame color={cation.reactions.flame?.color || "#3b82f6"} /> // Blue base frame if no characteristic reaction
          )}
          
          <ContactShadows position={[0, -2.5, 0]} opacity={0.6} scale={15} blur={3} far={4} color="#000" />
          <OrbitControls enablePan={true} enableZoom={true} target={[0, -0.5, 0]} maxPolarAngle={Math.PI/2}/>
        </Canvas>

        {step >= 3 && (
           <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2 justify-center z-10">
              {REAGENTS.map(r => (
                 <button key={r.id} onClick={() => applyReagent(r.id)} disabled={animPpt > 0 && animPpt < 1 && r.id !== 'flame'}
                   className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-lg backdrop-blur-md border ${appliedReagent === r.id ? `border-white text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]` : `border-white/20 text-slate-300 hover:bg-white/10`}`}
                   style={{ backgroundColor: r.color + (appliedReagent === r.id ? '60' : '20') }}>
                   {r.id === 'flame' ? 'Ignite Flame 🔥' : `Add ${r.name} 💧`}
                 </button>
              ))}
           </div>
        )}

        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3 shadow-xl max-w-xs transition-colors">
          <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 mb-1">Chemistry Lab — c09</p>
          <p className="text-white font-bold text-sm">3D Cation Qualitative Analysis</p>
          <p className="text-xs text-slate-400 mt-1">Identify unknown salts via precipitations and flame photometry.</p>
        </div>
      </div>

      <div className="w-full md:w-80 bg-slate-900 border-l border-white/5 flex flex-col z-10">
        <div className="p-5 border-b border-white/5">
           <h2 className="text-lg font-black text-white">Inorganic Analysis</h2>
           <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 mt-1">Procedure Step {step + 1}</p>
        </div>
        <div className="flex-1 p-5 space-y-5 overflow-y-auto">
          
          {completed ? (
            <div className="text-center py-4 animate-in fade-in zoom-in duration-500">
              <CheckCircle size={56} className="mx-auto mb-4 text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]" />
              <h3 className="text-xl font-bold text-white mb-2">Salt Analysis Complete! 🔎</h3>
              
              <div className="bg-slate-950 p-4 rounded-xl border border-white/10 text-left space-y-2 mb-6 mt-4 shadow-inner">
                 <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest border-b border-white/5 pb-1">Identified Cation</p>
                 <div className="flex justify-between items-center"><span className="text-slate-400">Ion</span><span className="font-bold text-emerald-400 text-lg">{cation.name}</span></div>
                 <div className="flex justify-between"><span className="text-slate-400">Test Salt</span><span className="font-mono text-white">{cation.salt}</span></div>
              </div>

              <button onClick={reset} className="w-full py-3 rounded-xl bg-slate-800 text-white font-bold hover:bg-slate-700 transition-all flex items-center justify-center gap-2 shadow-md hover:text-emerald-400 hover:bg-emerald-900/20">
                <RotateCcw size={16} /> Load New Salt
              </button>
            </div>
          ) : (
            <>
              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-xl shadow-inner transition-colors duration-500">
                <p className="text-emerald-300 text-sm font-bold mb-1">{current.title}</p>
                <p className="text-emerald-200/80 text-xs leading-relaxed">{current.instruction}</p>
              </div>

              <div>
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-2 border-t border-white/5 pt-4">Unknown Salt Samples</p>
                <div className="grid grid-cols-3 gap-1.5">
                  {CATIONS.map((c, i) => (
                    <button key={c.id} onClick={() => { setSelectedCation(i); setAppliedReagent(null); setAnimPpt(0); }}
                      className={`py-3 rounded-xl text-xs font-bold transition-all border ${selectedCation === i ? 'text-white bg-emerald-500/20 border-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.2)]' : 'border-white/10 text-slate-400 bg-slate-950 hover:bg-white/5'}`}>
                      {c.salt}
                    </button>
                  ))}
                </div>
              </div>

              {appliedReagent && (
                <div className="mt-4 p-4 rounded-xl shadow-inner border border-white/5 bg-black/40 animate-in fade-in slide-in-from-bottom-2">
                  <div className="flex justify-between items-start mb-2 border-b border-white/5 pb-2">
                     <p className="text-xs font-bold text-white capitalize">{REAGENTS.find(r=>r.id===appliedReagent)?.name}</p>
                  </div>
                  {appliedReagent !== 'flame' ? (
                     reaction ? (
                        <div className="flex items-center gap-2 text-sm text-green-400 font-bold">
                           <span className="drop-shadow-sm">✅ {reaction.ppt}</span>
                        </div>
                     ) : (
                        <p className="text-slate-500 text-xs italic font-semibold">❌ No precipitate observed / Clear solution.</p>
                     )
                  ) : (
                     <div className="flex items-center gap-2 text-sm font-bold" style={{ color: cation.reactions.flame?.color || '#94a3b8' }}>
                        {cation.reactions.flame ? `🔥 ${cation.reactions.flame.ppt}` : '🔥 No characteristic visible flame'}
                     </div>
                  )}
                </div>
              )}

              <button onClick={handleNext} disabled={animPpt > 0 && animPpt < 1}
                className="w-full py-3.5 mt-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 transition-all active:scale-95 shadow-lg shadow-emerald-600/20 disabled:opacity-50 disabled:cursor-not-allowed">
                {step === STEPS.length - 1 ? '✅ Confirm Cation Identity' : `${current.action} →`}
              </button>
            </>
          )}

          <div className="flex gap-1.5 pt-2">
            {STEPS.map((_, i) => (
              <div key={i} className="flex-1 h-1 rounded-full transition-all duration-500" style={{ backgroundColor: i <= step ? '#10b981' : 'rgba(255,255,255,0.05)' }} />
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default SaltAnalysisLab;
