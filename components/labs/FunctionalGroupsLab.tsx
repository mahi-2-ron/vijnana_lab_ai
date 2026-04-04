import React, { useRef, useEffect, useState } from 'react';
import { RotateCcw, CheckCircle } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Html } from '@react-three/drei';
import * as THREE from 'three';

interface Props { hex: string; }

const COMPOUNDS = [
  { name: 'Formaldehyde', type: 'Aldehyde', formula: 'HCHO', color: '#dbeafe' },
  { name: 'Acetaldehyde', type: 'Aldehyde', formula: 'CH₃CHO', color: '#e0f2fe' },
  { name: 'Acetone', type: 'Ketone', formula: 'CH₃COCH₃', color: '#fef3c7' },
];

const TESTS: { id: string; name: string; color: string; positiveFor: string[]; positiveResult: string; negativeResult: string }[] = [
  { id: 'tollens', name: "Tollen's Test", color: '#d1d5db', positiveFor: ['Aldehyde'], positiveResult: 'Silver mirror on tube walls! ✨', negativeResult: 'No silver mirror (Not aldehyde)' },
  { id: 'fehling', name: "Fehling's Test", color: '#1d4ed8', positiveFor: ['Aldehyde'], positiveResult: 'Brick-red Cu₂O precipitate! 🧱', negativeResult: 'Solution stays blue' },
  { id: 'schiff', name: "Schiff's Test", color: '#db2777', positiveFor: ['Aldehyde'], positiveResult: 'Magenta/Pink colour! 💗', negativeResult: 'No colour change' },
  { id: 'dnp', name: '2,4-DNP Test', color: '#d97706', positiveFor: ['Aldehyde', 'Ketone'], positiveResult: 'Yellow-orange precipitate! 🟡', negativeResult: 'No precipitate' },
];

const STEPS = [
  { title: 'Take Sample', instruction: 'Collect 2mL of the unknown organic compound in a clean test tube.', action: 'Take Sample 🧪' },
  { title: 'Tollen\'s Test', instruction: 'Add Ammoniacal Silver Nitrate and warm. Silver Mirror = Aldehyde.', action: 'Tollen\'s Test 🪞' },
  { title: "Fehling's Test", instruction: "Add equal parts of Fehling's A & B. Warm. Brick-red precipitate = Aldehyde.", action: "Fehling's Test 🟥" },
  { title: "Schiff's Test", instruction: "Add Schiff's Reagent. Instant magenta color = Aldehyde.", action: "Schiff's Test 💗" },
  { title: 'Identify Group', instruction: 'Identify based on reactions. Aldehyde (+/+/+). Ketone (−/−/− for first 3). Both positive for 2,4-DNP.', action: 'Record Result ✅' },
];

const TubeContents = ({ compound, test, isPositive, reactionAnim }: any) => {
   const tRef = useRef<THREE.Group>(null);
   const dripRef = useRef<THREE.Mesh>(null);

   let targetColor = compound.color;
   let opacity = 0.6;
   let roughness = 0.1;
   let transmission = 0.9;
   let metalness = 0;
   
   if (test) {
      if (!isPositive) {
         if (test.id === 'fehling') targetColor = '#1e3a8a'; // stays blue
         else if (test.id === 'dnp') targetColor = '#d97706'; // stays orange solution
         else targetColor = compound.color; // schiff/tollens negative stay clear
      } else {
         if (test.id === 'tollens') {
            metalness = reactionAnim; // Silver mirror!
            roughness = 0;
            transmission = 1 - reactionAnim;
         } else if (test.id === 'fehling') {
            targetColor = '#b91c1c'; // brick red ppt
            opacity = 0.9;
            transmission = 1 - reactionAnim * 0.8;
         } else if (test.id === 'schiff') {
            targetColor = '#be185d'; // magenta
         } else if (test.id === 'dnp') {
            targetColor = '#d97706'; // yellow orange ppt
            opacity = 0.9;
            transmission = 1 - reactionAnim * 0.8;
         }
      }
   }

   const currentColor = new THREE.Color(compound.color).lerp(new THREE.Color(targetColor), reactionAnim);

   useFrame(({ clock }) => {
      if (dripRef.current && test && reactionAnim < 0.2 && reactionAnim > 0) {
         dripRef.current.position.y = 1.5 - (reactionAnim * 5) * 2;
         dripRef.current.visible = true;
      } else if (dripRef.current) {
         dripRef.current.visible = false;
      }
   });

   return (
     <group>
        {/* Glass Tube Layer */}
        <mesh position={[0, -0.2, 0]}>
           <cylinderGeometry args={[0.3, 0.3, 3, 32, 1, true]} />
           <meshPhysicalMaterial transmission={0.95} roughness={0} ior={1.4} thickness={0.1} color="#f8fafc" side={THREE.DoubleSide} metalness={metalness} />
        </mesh>
        <mesh position={[0, -1.7, 0]}>
           <sphereGeometry args={[0.3, 32, 16, 0, Math.PI*2, Math.PI/2, Math.PI/2]} />
           <meshPhysicalMaterial transmission={0.95} roughness={0} ior={1.4} thickness={0.1} color="#f8fafc" side={THREE.DoubleSide} metalness={metalness} />
        </mesh>

        {/* Liquid Volume */}
        <mesh position={[0, -1, 0]}>
           <cylinderGeometry args={[0.26, 0.26, 1.4, 32]} />
           <meshPhysicalMaterial transmission={transmission} color={currentColor} roughness={roughness} transparent opacity={opacity} />
        </mesh>
        <mesh position={[0, -1.7, 0]}>
           <sphereGeometry args={[0.26, 32, 16, 0, Math.PI*2, Math.PI/2, Math.PI/2]} />
           <meshPhysicalMaterial transmission={transmission} color={currentColor} roughness={roughness} transparent opacity={opacity} />
        </mesh>

        {/* Dropper Animation */}
        <mesh ref={dripRef} position={[0, 1.5, 0]}>
           <sphereGeometry args={[0.08]} />
           <meshPhysicalMaterial color={test ? test.color : "#fff"} transmission={0.8} />
        </mesh>

        {/* Precipitate Bubbles / Boiling */}
        {(test && reactionAnim > 0.5 && isPositive && (test.id === 'fehling' || test.id === 'tollens' || test.id === 'dnp')) && (
           <group position={[0, -1.5, 0]}>
              {Array.from({length: 10}).map((_, i) => (
                <mesh key={i} position={[(Math.random()-0.5)*0.3, Math.random()*0.5, (Math.random()-0.5)*0.3]}>
                  <sphereGeometry args={[0.03]} />
                  <meshBasicMaterial color={test.id==='tollens' ? "#fff" : test.id==='fehling' ? "#fca5a5" : "#fcd34d"} />
                </mesh>
              ))}
           </group>
        )}
     </group>
   )
}

const FunctionalGroupsLab: React.FC<Props> = ({ hex }) => {
  const [step, setStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [compoundIdx, setCompoundIdx] = useState(0);
  const [appliedTest, setAppliedTest] = useState<string | null>(null);
  const [reactionAnim, setReactionAnim] = useState(0);

  const compound = COMPOUNDS[compoundIdx];
  const test = TESTS.find(t => t.id === appliedTest);
  const isPositive = test ? test.positiveFor.includes(compound.type) : false;

  const applyTest = (tId: string) => {
    setAppliedTest(tId);
    setReactionAnim(0);
    let r = 0;
    const iv = setInterval(() => {
       r += 0.02; // ~2 seconds
       setReactionAnim(Math.min(r, 1));
       if (r >= 1) clearInterval(iv);
    }, 40);
  };

  const handleNext = () => {
    if (step < STEPS.length - 1) setStep(s => s + 1);
    else setCompleted(true);
  };

  const reset = () => { 
    setStep(0); setCompleted(false); setAppliedTest(null); setReactionAnim(0);
  };

  const current = STEPS[step];

  return (
    <div className="flex flex-col md:flex-row h-full w-full bg-slate-950">
      <div className="flex-1 relative rounded-2xl overflow-hidden m-4 border border-white/10 shadow-2xl">
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
          <Environment preset="apartment" />
          <ambientLight intensity={0.6} />
          <pointLight position={[5, 10, 5]} intensity={1.5} color="#fbcfe8" />
          <pointLight position={[-5, -10, -5]} intensity={0.5} />
          
          <TubeContents compound={compound} test={test} isPositive={isPositive} reactionAnim={reactionAnim} />
          
          <ContactShadows position={[0, -2.5, 0]} opacity={0.6} scale={10} blur={2.5} far={4} color="#000" />
          <OrbitControls enablePan={true} enableZoom={true} target={[0, 0, 0]} />
        </Canvas>

        {step >= 1 && (
           <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2 justify-center z-10">
              {TESTS.map(t => (
                 <button key={t.id} onClick={() => applyTest(t.id)} disabled={reactionAnim > 0 && reactionAnim < 1}
                   className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-lg backdrop-blur-md border ${appliedTest === t.id ? `border-white text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]` : `border-white/20 text-slate-300 hover:bg-white/10`}`}
                   style={{ backgroundColor: t.color + (appliedTest === t.id ? '80' : '30') }}>
                   Drip {t.name}
                 </button>
              ))}
           </div>
        )}

        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3 shadow-xl max-w-xs transition-colors">
          <p className="text-[10px] font-bold uppercase tracking-widest text-pink-400 mb-1">Chemistry Lab — c10</p>
          <p className="text-white font-bold text-sm">3D Functional Groups</p>
          <p className="text-xs text-slate-400 mt-1">Identify carbonyl groups via chemical precipitates.</p>
        </div>
      </div>

      <div className="w-full md:w-80 bg-slate-900 border-l border-white/5 flex flex-col z-10">
        <div className="p-5 border-b border-white/5">
           <h2 className="text-lg font-black text-white">Compound Analysis</h2>
           <p className="text-[10px] font-bold uppercase tracking-widest text-pink-400 mt-1">Procedure Step {step + 1}</p>
        </div>
        <div className="flex-1 p-5 space-y-5 overflow-y-auto">
          
          {completed ? (
            <div className="text-center py-4 animate-in fade-in zoom-in duration-500">
              <CheckCircle size={56} className="mx-auto mb-4 text-pink-400 drop-shadow-[0_0_15px_rgba(244,114,182,0.5)]" />
              <h3 className="text-xl font-bold text-white mb-2">Identification Verified! ✅</h3>
              <p className="text-slate-400 text-sm mb-6 px-4">Based on the chemical tests, the unknown sample has been positively identified.</p>
              
              <div className="bg-slate-950 p-4 rounded-xl border border-white/10 text-left space-y-2 mb-6">
                 <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest border-b border-white/5 pb-1">Sample Profile</p>
                 <div className="flex justify-between"><span className="text-slate-400">Name</span><span className="font-bold text-white">{compound.name}</span></div>
                 <div className="flex justify-between"><span className="text-slate-400">Formula</span><span className="font-mono text-pink-300">{compound.formula}</span></div>
                 <div className="flex justify-between"><span className="text-slate-400">Func. Group</span><span className="font-bold text-pink-400">{compound.type}</span></div>
              </div>

              <button onClick={reset} className="w-full py-3 rounded-xl bg-slate-800 text-white font-bold hover:bg-slate-700 transition-all flex items-center justify-center gap-2 shadow-md hover:text-red-400 hover:bg-red-900/20">
                <RotateCcw size={16} /> Load New Sample
              </button>
            </div>
          ) : (
            <>
              <div className="bg-pink-500/10 border border-pink-500/30 p-4 rounded-xl shadow-inner transition-colors duration-500">
                <p className="text-pink-300 text-sm font-bold mb-1">{current.title}</p>
                <p className="text-pink-200/80 text-xs leading-relaxed">{current.instruction}</p>
              </div>

              <div>
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-2 border-t border-white/5 pt-4">Unknown Samples Rack</p>
                <div className="grid grid-cols-1 gap-1.5">
                  {COMPOUNDS.map((c, i) => (
                    <button key={c.name} onClick={() => { setCompoundIdx(i); setAppliedTest(null); setReactionAnim(0); }}
                      className={`w-full py-3 px-4 rounded-xl text-xs font-bold text-left transition-all border flex justify-between items-center ${compoundIdx === i ? 'text-white border-pink-500 bg-pink-500/20 shadow-[0_0_15px_rgba(236,72,153,0.2)]' : 'border-white/10 text-slate-400 bg-slate-950 hover:bg-white/5'}`}>
                      <span>{c.name}</span>
                      <span className="font-mono opacity-50">{c.formula}</span>
                    </button>
                  ))}
                </div>
              </div>

              {test && (
                <div className="mt-4 p-4 rounded-xl shadow-inner border animate-in fade-in slide-in-from-bottom-2" 
                     style={{ backgroundColor: (isPositive ? '#16a34a' : '#dc2626') + '15', borderColor: (isPositive ? '#16a34a' : '#dc2626') + '40' }}>
                  <div className="flex items-center gap-2 mb-1">
                     <span className="text-sm">{isPositive ? '✅' : '❌'}</span>
                     <p className="font-bold text-xs" style={{ color: isPositive ? '#4ade80' : '#fca5a5' }}>
                        {isPositive ? 'POSITIVE REACTION' : 'NEGATIVE REACTION'}
                     </p>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-tight">
                    {reactionAnim < 1 ? 'Reacting...' : (isPositive ? test.positiveResult : test.negativeResult)}
                  </p>
                </div>
              )}

              <button onClick={handleNext} disabled={appliedTest && reactionAnim < 1}
                className="w-full py-3.5 mt-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 bg-pink-600 hover:bg-pink-500 transition-all active:scale-95 shadow-lg shadow-pink-600/20 disabled:opacity-50 disabled:cursor-not-allowed">
                {step === STEPS.length - 1 ? '✅ Verify Identity' : `${current.action} →`}
              </button>
            </>
          )}

          <div className="flex gap-1.5 pt-2">
            {STEPS.map((_, i) => (
              <div key={i} className="flex-1 h-1 rounded-full transition-all duration-500" style={{ backgroundColor: i <= step ? '#ec4899' : 'rgba(255,255,255,0.05)' }} />
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default FunctionalGroupsLab;
