import React, { useRef, useEffect, useState } from 'react';
import { RotateCcw, CheckCircle } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Html } from '@react-three/drei';
import * as THREE from 'three';
import DraggableSlider from './DraggableSlider';

interface Props { hex: string; }

const STEPS = [
  { id: 0, title: 'Prepare Potato', instruction: 'Scoop a hollow cavity in the potato. Peel the outer surface.', action: 'Prepare Potato 🥔' },
  { id: 1, title: 'Fill with Sugar', instruction: 'Fill the cavity with concentrated sugar solution. Marking initial level.', action: 'Add Sugar Solution 🍬' },
  { id: 2, title: 'Place in Water', instruction: 'Place the potato osmometer in a beaker of pure pure water. The potato acts as a semi-permeable membrane.', action: 'Place in Beaker 💧' },
  { id: 3, title: 'Wait & Observe', instruction: 'Watch water molecules move from hypotonic (beaker) through the potato membrane into the hypertonic cavity.', action: 'Observe Osmosis ⏱️' },
  { id: 4, title: 'Record Results', instruction: 'Endosmosis occurred! Water moved from low concentration to high concentration.', action: 'Record the Rise 📊' },
];

const glassMat = <meshPhysicalMaterial transmission={0.9} thickness={0.1} roughness={0} ior={1.4} color="#e0f2fe" transparent opacity={0.6} side={THREE.DoubleSide} />;

const PotatoOsmoscope = ({ step, sugarConc, waterLevel }: any) => {
  const particlesRef = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    // Osmosis particle flow animation
    if (step >= 3 && particlesRef.current) {
      particlesRef.current.children.forEach((p, i) => {
         // Flow from outside to inside (x = 1.2 to x = 0.5)
         const phase = (clock.elapsedTime * 0.5 + i * 0.1) % 1;
         p.position.x = 1.8 - (phase * 1.5);
         p.position.y = -0.5 + Math.sin(phase * Math.PI) * 0.5 + (i * 0.05);
         if(i%2!==0) p.position.x *= -1; // flow from both sides
      });
    }
  });

  return (
    <group position={[0, -0.5, 0]}>
       
       {/* Beaker (appears at step 2) */}
       {step >= 2 && (
         <group>
           <mesh position={[0, 0.5, 0]}><cylinderGeometry args={[2, 2, 2.5, 32, 1, true]} />{glassMat}</mesh>
           <mesh position={[0, -0.75, 0]}><cylinderGeometry args={[2, 2, 0.1, 32]} />{glassMat}</mesh>
           
           {/* Pure water in beaker */}
           <mesh position={[0, -0.1, 0]}>
             <cylinderGeometry args={[1.95, 1.95, 1.2, 32]} />
             <meshPhysicalMaterial transmission={0.9} color="#bae6fd" roughness={0.1} transparent opacity={0.5} />
           </mesh>
         </group>
       )}

       {/* Potato Body */}
       <group position={[0, -0.2, 0]}>
          {/* Base shape (flattened sphere) */}
          <mesh receiveShadow castShadow>
             <sphereGeometry args={[1.2, 32, 32, 0, Math.PI*2, 0, Math.PI*0.8]} />
             <meshStandardMaterial color="#92400e" roughness={0.8} />
          </mesh>
          <mesh position={[0, -0.9, 0]} receiveShadow castShadow>
             <cylinderGeometry args={[1.1, 0.8, 0.4, 32]} />
             <meshStandardMaterial color="#92400e" roughness={0.8} />
          </mesh>
          
          {/* Cut top (Exposed flesh) */}
          <mesh position={[0, 0.95, 0]} rotation={[-Math.PI/2, 0, 0]}>
             <planeGeometry args={[1.6, 1.6]} />
             <meshStandardMaterial color="#fcd34d" roughness={0.9} />
          </mesh>

          {/* Cavity Wall */}
          <mesh position={[0, 0.2, 0]}>
             <cylinderGeometry args={[0.5, 0.5, 1.5, 32, 1, true]} />
             <meshStandardMaterial color="#fde68a" roughness={0.9} side={THREE.BackSide} />
          </mesh>
          <mesh position={[0, -0.55, 0]} rotation={[-Math.PI/2, 0, 0]}>
             <planeGeometry args={[1, 1]} />
             <meshStandardMaterial color="#fde68a" roughness={0.9} />
          </mesh>
       </group>

       {/* Sugar Solution inside cavity */}
       {step >= 1 && (
         <group>
           {/* Solution Volume */}
           <mesh position={[0, -0.25 + (waterLevel / 2), 0]}>
              <cylinderGeometry args={[0.48, 0.48, 0.6 + waterLevel, 32]} />
              <meshPhysicalMaterial transmission={0.6} color={new THREE.Color().lerpColors(new THREE.Color("#93c5fd"), new THREE.Color("#a78bfa"), sugarConc/100)} roughness={0.1} />
           </mesh>
           {/* Pin marker for initial level */}
           <mesh position={[0.5, 0.05, 0]} rotation={[0, 0, Math.PI/2]}>
              <cylinderGeometry args={[0.02, 0.02, 0.4]} />
              <meshStandardMaterial color="#ef4444" metalness={0.5} />
           </mesh>
           <Html position={[0.7, 0.05, 0]}>
             <div className="text-[9px] font-bold text-red-400 bg-black/60 px-1 rounded backdrop-blur">Initial Level</div>
           </Html>
           {/* Current level indicator */}
           {step >= 3 && waterLevel > 0 && (
             <Html position={[-0.6, 0.05 + waterLevel, 0]}>
               <div className="text-[9px] font-bold text-blue-400 bg-black/60 px-1 rounded backdrop-blur">+{Math.round(waterLevel*100)} mm</div>
             </Html>
           )}
         </group>
       )}

       {/* Osmosis Arrows / Particles */}
       {step >= 3 && (
         <group ref={particlesRef}>
           {Array.from({length: 20}).map((_, i) => (
             <mesh key={i}>
                <sphereGeometry args={[0.05]} />
                <meshBasicMaterial color="#60a5fa" transparent opacity={0.6} />
             </mesh>
           ))}
         </group>
       )}
    </group>
  );
};

const OsmosisLab: React.FC<Props> = ({ hex }) => {
  const [step, setStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [sugarConc, setSugarConc] = useState(70);
  const [waterLevel, setWaterLevel] = useState(0);

  // Rising water level effect based on concentration
  useEffect(() => {
    if (step >= 3) {
      const targetRise = 0.8 * (sugarConc / 100);
      const interval = setInterval(() => {
        setWaterLevel(w => {
          if (w >= targetRise) {
             clearInterval(interval);
             if (step === 3) setTimeout(() => handleNext(), 1000); // auto advance once done rising
             return targetRise;
          }
          return w + 0.005;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [step, sugarConc]);

  const handleNext = () => {
    if (step < STEPS.length - 1) setStep(s => s + 1);
    else setCompleted(true);
  };

  const reset = () => { setStep(0); setCompleted(false); setWaterLevel(0); };

  const current = STEPS[step];

  return (
    <div className="flex flex-col md:flex-row h-full w-full bg-slate-950">
      <div className="flex-1 relative rounded-2xl overflow-hidden m-4 border border-white/10 shadow-2xl">
        <Canvas camera={{ position: [0, 2, 6], fov: 60 }}>
          <Environment preset="apartment" />
          <ambientLight intensity={0.6} />
          <pointLight position={[5, 10, 5]} intensity={1.5} color="#60a5fa" />
          
          <PotatoOsmoscope step={step} sugarConc={sugarConc} waterLevel={waterLevel} />
          
          <ContactShadows position={[0, -1.5, 0]} opacity={0.5} scale={10} blur={2.5} far={4} color="#000" />
          <OrbitControls enablePan={true} enableZoom={true} target={[0, -0.2, 0]} maxPolarAngle={Math.PI/2 - 0.1}/>
        </Canvas>

        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3 shadow-xl max-w-xs">
          <p className="text-[10px] font-bold uppercase tracking-widest text-blue-400 mb-1">Biology Lab — b10</p>
          <p className="text-white font-bold text-sm">3D Potato Osmoscope</p>
          <p className="text-xs text-slate-400 mt-1">Study endosmosis using a living semi-permeable membrane.</p>
        </div>
      </div>

      <div className="w-full md:w-80 bg-slate-900 border-l border-white/5 flex flex-col z-10">
        <div className="p-5 border-b border-white/5">
           <h2 className="text-lg font-black text-white">Procedure</h2>
           <p className="text-xs font-bold uppercase tracking-widest text-blue-400 mt-1">Step {step + 1} of {STEPS.length}</p>
        </div>
        <div className="flex-1 p-5 space-y-5 overflow-y-auto">
          
          {completed ? (
            <div className="text-center py-6">
              <CheckCircle size={56} className="mx-auto mb-4 text-green-400 drop-shadow-[0_0_15px_rgba(74,222,128,0.5)]" />
              <h3 className="text-xl font-bold text-white mb-2">Osmosis Verified! 💧</h3>
              <p className="text-slate-400 text-sm mb-6">Water moved from the hypotonic beaker into the hypertonic sugar cavity through the potato membrane, causing the level to rise by {Math.round(waterLevel*100)}mm.</p>
              <button onClick={reset} className="w-full py-3 rounded-xl bg-slate-800 text-white font-bold hover:bg-slate-700 transition-all flex items-center justify-center gap-2 shadow-md">
                <RotateCcw size={16} /> Reset Experiment
              </button>
            </div>
          ) : (
            <>
              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-xl shadow-inner">
                <p className="text-blue-300 text-xs font-bold mb-1">{current.title}</p>
                <p className="text-blue-200/80 text-xs leading-relaxed">{current.instruction}</p>
              </div>

              {step >= 1 && step < 3 && (
                <div className="bg-black/20 p-4 rounded-xl border border-white/10">
                  <DraggableSlider label="Sugar Solution Conc." min={20} max={100} value={sugarConc} onChange={(v:any)=>{if(step<3)setSugarConc(v)}} color="#a78bfa" unit="%" />
                  <p className="text-[10px] text-slate-500 mt-2 leading-tight">Higher concentration creates a steeper osmotic gradient.</p>
                </div>
              )}

              {step >= 3 && (
                <div className="bg-slate-950 p-4 rounded-xl border border-white/10 shadow-inner">
                  <p className="text-xs text-slate-400 uppercase font-bold mb-2 tracking-widest border-b border-white/5 pb-1">Cavity Water Rise</p>
                  <div className="w-full bg-slate-800 rounded-full h-4 overflow-hidden border border-white/5 relative">
                    <div className="h-full bg-blue-500 transition-none" style={{ width: `${(waterLevel / 0.8) * 100}%` }} />
                    <div className="absolute inset-0 flex items-center justify-end px-2">
                       <span className="text-[10px] font-bold text-white mix-blend-difference">{Math.round(waterLevel*100)} mm</span>
                    </div>
                  </div>
                  <p className="text-blue-300 text-[10px] mt-2 font-mono">Status: {waterLevel >= 0.8 * (sugarConc/100) ? 'Equilibrium Reached' : 'Endosmosis active...'}</p>
                </div>
              )}

              <button onClick={handleNext} disabled={step === 3 && waterLevel < 0.8 * (sugarConc/100)}
                className="w-full py-3 rounded-xl font-bold text-white flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 transition-all active:scale-95 shadow-lg shadow-blue-600/20 disabled:opacity-50 disabled:cursor-not-allowed">
                {step === STEPS.length - 1 ? '✅ Record Results' : `${current.action} →`}
              </button>
            </>
          )}

          <div className="flex gap-1 pt-2">
            {STEPS.map((s, i) => (
              <div key={i} className="flex-1 h-1.5 rounded-full transition-all duration-500" style={{ backgroundColor: i <= step ? '#3b82f6' : 'rgba(255,255,255,0.1)' }} />
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default OsmosisLab;
