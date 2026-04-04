import React, { useState, useRef } from 'react';
import { RotateCcw, CheckCircle, Droplets, FlaskConical } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, RoundedBox, Html, Cylinder, Box, Plane } from '@react-three/drei';
import * as THREE from 'three';

interface PHLabSimulationProps { hex: string; }

const SOLUTIONS = [
  { name: 'Lemon Juice', ph: 2.2, color: '#fde047', icon: '🍋' },
  { name: 'Cola', ph: 3.0, color: '#92400e', icon: '🥤' },
  { name: 'Tomato Juice', ph: 4.2, color: '#ef4444', icon: '🍅' },
  { name: 'Milk', ph: 6.5, color: '#fefce8', icon: '🥛' },
  { name: 'Pure Water', ph: 7.0, color: '#dbeafe', icon: '💧' },
  { name: 'Baking Soda', ph: 8.4, color: '#d1fae5', icon: '🧁' },
  { name: 'Soap', ph: 10.0, color: '#ede9fe', icon: '🫧' },
  { name: 'Bleach', ph: 12.5, color: '#f0fdf4', icon: '🧼' },
];

const getPHColor = (ph: number): string => {
  if (ph < 2) return '#ef4444';
  if (ph < 4) return '#f97316';
  if (ph < 6) return '#eab308';
  if (ph < 7) return '#84cc16';
  if (ph === 7) return '#22c55e';
  if (ph < 9) return '#14b8a6';
  if (ph < 11) return '#3b82f6';
  if (ph < 13) return '#8b5cf6';
  return '#a855f7';
};

const STEPS = [
  { title: 'Set Up pH Paper', instruction: 'Tear a 2cm strip of Universal Indicator pH paper. These strips change colour based on the H⁺ ion concentration of the solution.', action: 'Get pH Paper 🧻' },
  { title: 'Select Solution', instruction: 'Pick a solution from the panel. Observe its appearance. Try to predict if it will be acidic, basic, or neutral before testing.', action: 'Choose Solution 🫙' },
  { title: 'Dip pH Paper', instruction: 'Dip the pH paper into the solution for 1–2 seconds. Do NOT leave it in too long as colours may bleed.', action: 'Dip Paper 📄' },
  { title: 'Compare with Scale', instruction: 'Hold the paper against the standard pH colour chart. Match the colour to find the pH value.', action: 'Read pH Scale 📊' },
  { title: 'Record All Results', instruction: 'Test all 8 solutions and record their pH values. A pH < 7 is acidic, = 7 neutral, > 7 basic (alkaline).', action: 'Record Results 📝' },
];

const PHScene = ({ solution, step, dipped, dipAnimProgress }: any) => {
  const paperRef = useRef<THREE.Group>(null);
  const liquidMaterialRef = useRef<THREE.MeshPhysicalMaterial>(null);

  // Animate the dip logic
  useFrame(() => {
    if (paperRef.current) {
        // dipAnimProgress 0 = resting high, 1 = dipped in beaker
        // So Y goes from 4 to 0.5
        const targetY = THREE.MathUtils.lerp(3.5, 0.5, dipAnimProgress);
        paperRef.current.position.y = THREE.MathUtils.lerp(paperRef.current.position.y, targetY, 0.2);
    }
    
    if (liquidMaterialRef.current) {
        // Smoothly interpolate liquid color when changing solutions
        const targetColor = new THREE.Color(solution.color);
        liquidMaterialRef.current.color.lerp(targetColor, 0.1);
    }
  });

  const phColor = getPHColor(solution.ph);
  const currentPaperColor = dipped ? phColor : '#fdf8f5';

  return (
    <group position={[0, -1, 0]}>
      {/* 1. Laboratory Table */}
      <Cylinder args={[5, 5, 0.2, 32]} position={[0, -0.1, 0]} castShadow receiveShadow>
        <meshPhysicalMaterial color="#0f172a" roughness={0.7} />
      </Cylinder>

      {/* 2. Glass Beaker */}
      <group position={[0, 1.25, 0]}>
        {/* Glass wall */}
        <Cylinder args={[1.6, 1.6, 2.5, 32]} castShadow>
          <meshPhysicalMaterial 
             color="#ffffff" transmission={0.99} opacity={1} roughness={0.0} ior={1.5} thickness={0.1} transparent side={THREE.DoubleSide}
          />
        </Cylinder>
        {/* Beaker lip */}
        <Cylinder args={[1.65, 1.65, 0.1, 32]} position={[0, 1.25, 0]}>
          <meshPhysicalMaterial color="#ffffff" transmission={0.9} roughness={0.1} />
        </Cylinder>

        {/* Liquid Volume */}
        <Cylinder args={[1.55, 1.55, 1.8, 32]} position={[0, -0.3, 0]} castShadow receiveShadow>
          <meshPhysicalMaterial 
             ref={liquidMaterialRef}
             color={solution.color} transmission={0.6} opacity={0.9} roughness={0.1} transparent ior={1.33}
          />
        </Cylinder>

        {/* Beaker Label */}
        <Html position={[0, -0.5, 1.65]} center transform>
            <div className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-xl shadow-lg border border-white text-center w-32">
                <span className="text-xl inline-block mb-1">{solution.icon}</span>
                <p className="text-slate-800 font-bold text-[10px] uppercase tracking-wider">{solution.name}</p>
            </div>
        </Html>
      </group>

      {/* 3. pH Paper Strip (Animates dipping based on state) */}
      <group ref={paperRef} position={[0, 3.5, 0]}>
          {/* Paper mesh */}
          <Box args={[0.6, 2, 0.05]} castShadow>
            <meshStandardMaterial color={currentPaperColor} roughness={0.9} />
          </Box>
          
          {/* Tween/Morph indicator text */}
          <Html position={[0.7, 0, 0]} center>
            {(dipped || step >= 3) && (
                <div className="px-2 py-1 rounded-md font-bold text-[10px] text-white shadow-lg whitespace-nowrap animate-fade-in" style={{ backgroundColor: phColor, textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>
                    pH {solution.ph} Match
                </div>
            )}
          </Html>
      </group>

      {/* 4. Background Standard pH Scale Board */}
      <group position={[0, 2.5, -3]}>
        <Box args={[9, 2, 0.2]} castShadow>
            <meshStandardMaterial color="#ffffff" roughness={0.5} />
        </Box>
        <Html position={[0, 0, 0.11]} center transform>
            <div className="bg-white w-[880px] h-[190px] rounded flex flex-col p-4 shadow-inner">
                <h3 className="text-xl font-black text-slate-800 text-center mb-2 tracking-widest uppercase">Universal pH Scale Grid</h3>
                <div className="flex-1 flex w-full">
                    {[...Array(15)].map((_, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center">
                            <div className="w-full flex-1 rounded-sm shadow-sm" style={{ backgroundColor: getPHColor(i) }} />
                            <span className="text-lg font-bold text-slate-600 mt-2">{i}</span>
                        </div>
                    ))}
                </div>
            </div>
        </Html>
      </group>
    </group>
  );
};

const PHLabSimulation: React.FC<PHLabSimulationProps> = ({ hex }) => {
  const [step, setStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [selectedSol, setSelectedSol] = useState(0);
  const [dipped, setDipped] = useState(false);
  const [tested, setTested] = useState<Set<number>>(new Set());
  const [dipAnimProgress, setDipAnimProgress] = useState(0);

  const sol = SOLUTIONS[selectedSol];

  const handleDip = () => {
    if (step < 2) return;
    
    // Simulate physics tween
    let progress = 0;
    const interval = setInterval(() => {
        progress += 0.05; // Dipping down
        setDipAnimProgress(progress);
        
        if (progress >= 1) {
            clearInterval(interval);
            // Wait 1 second submerged
            setTimeout(() => {
                setDipped(true); // Colors change here underwater
                setTested(prev => new Set([...prev, selectedSol]));
                
                // Pull it back up
                let upProgress = 1;
                const upInterval = setInterval(() => {
                    upProgress -= 0.05;
                    setDipAnimProgress(Math.max(0, upProgress));
                    if(upProgress <= 0) {
                        clearInterval(upInterval);
                    }
                }, 30);
            }, 600);
        }
    }, 30);
  };

  const handleNext = () => {
    if (step === 2) { handleDip(); }
    if (step < STEPS.length - 1) setStep(s => s + 1);
    else setCompleted(true);
  };

  const reset = () => { 
      setStep(0); 
      setCompleted(false); 
      setDipped(false); 
      setDipAnimProgress(0); 
      setTested(new Set()); 
  };

  const current = STEPS[step];

  return (
    <div className="flex flex-col md:flex-row h-full w-full bg-[#050505] overflow-hidden text-slate-200 select-none">
      
      {/* 3D Visualization */}
      <div className="flex-1 flex flex-col relative rounded-2xl overflow-hidden m-4 border border-white/10 shadow-2xl">
        <div className="absolute inset-x-0 top-0 p-4 bg-gradient-to-b from-black/80 to-transparent z-10 flex justify-between items-start">
            <div>
                <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400"><FlaskConical size={18} /></span>
                    pH Value Determination (3D)
                </h2>
                <p className="text-[11px] font-medium text-slate-400 uppercase tracking-widest mt-1">Universal Indicator Mechanism</p>
            </div>
        </div>

        <Canvas camera={{ position: [0, 4, 8], fov: 40 }}>
            <Environment preset="city" />
            <ambientLight intensity={0.5} />
            <pointLight position={[5, 10, 5]} intensity={1.5} />
            <pointLight position={[-5, 5, -5]} color="#06b6d4" intensity={1} />
            
            <PHScene solution={sol} step={step} dipped={dipped} dipAnimProgress={dipAnimProgress} />

            <ContactShadows position={[0, -1.1, 0]} opacity={0.6} scale={15} blur={2.5} far={4} color="#000" />
            <OrbitControls enablePan={true} enableZoom={true} maxPolarAngle={Math.PI / 2 - 0.1} />
        </Canvas>

        {/* HUD: Result Banner overlay */}
        {dipped && step >= 3 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-black/80 p-4 rounded-2xl backdrop-blur-xl border border-white/10 shadow-2xl animate-fade-in-up">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl shadow-inner border" style={{ backgroundColor: getPHColor(sol.ph), borderColor: 'rgba(255,255,255,0.5)' }}>
                    {sol.ph < 7 ? '🔴' : sol.ph === 7 ? '🟢' : '🔵'}
                </div>
                <div>
                     <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mb-1">Measured Value</p>
                     <p className="text-2xl font-black text-white leading-none">pH {sol.ph.toFixed(1)} <span className="text-sm font-medium ml-2 text-slate-300">({sol.ph < 7 ? 'Acidic' : sol.ph === 7 ? 'Neutral' : 'Basic/Alkaline'})</span></p>
                </div>
            </div>
        )}
      </div>

      {/* Control Panel */}
      <div className="w-full md:w-[340px] shrink-0 bg-[#0a0a0a] border-l border-white/10 flex flex-col z-20 shadow-[-10px_0_30px_rgba(0,0,0,0.5)]">
        <div className="p-6 border-b border-white/5">
          <p className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-2 border-b border-cyan-500/20 inline-block pb-1">Procedure — Step {step + 1} of {STEPS.length}</p>
          <h2 className="text-xl font-bold text-white tracking-tight">{current.title}</h2>
        </div>
        
        <div className="flex-1 p-6 space-y-6 overflow-y-auto">
          {completed ? (
            <div className="text-center py-6 animate-fade-in">
              <CheckCircle size={48} className="mx-auto mb-4 text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]" />
              <h3 className="text-xl font-bold text-white mb-6 tracking-tight">Experiment Complete!</h3>
              
              <div className="space-y-2 mb-8">
                {SOLUTIONS.map((s, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl border border-white/5" style={{ backgroundColor: tested.has(i) ? getPHColor(s.ph) + '15' : 'transparent', opacity: tested.has(i) ? 1 : 0.4 }}>
                    <span className="text-xl">{s.icon}</span>
                    <span className="text-sm font-medium text-white flex-1 text-left">{s.name}</span>
                    {tested.has(i) && (
                         <div className="px-2 py-1 rounded text-xs font-bold text-black" style={{ backgroundColor: getPHColor(s.ph) }}>
                            pH {s.ph}
                         </div>
                    )}
                  </div>
                ))}
              </div>
              <button onClick={reset} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-800 text-cyan-400 hover:bg-slate-700 transition-colors font-bold shadow-lg shadow-cyan-900/20"><RotateCcw size={16} /> Reset Lab</button>
            </div>
          ) : (
            <>
              <div className="bg-cyan-900/20 border border-cyan-500/20 p-4 rounded-xl backdrop-blur-md">
                <p className="text-cyan-100 text-sm leading-relaxed">{current.instruction}</p>
              </div>
              
              <div className="pt-2">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2"><Droplets size={12}/> Solution Reservoir</p>
                <div className="grid grid-cols-2 gap-2">
                  {SOLUTIONS.map((s, i) => (
                    <button key={i} onClick={() => { setSelectedSol(i); setDipped(false); setDipAnimProgress(0); }}
                      className="p-3 rounded-xl text-xs font-bold flex items-center gap-2 transition-all relative overflow-hidden group"
                      style={{ 
                          backgroundColor: i === selectedSol ? s.color + '20' : '#111', 
                          border: `1px solid ${i === selectedSol ? s.color : 'rgba(255,255,255,0.05)'}`, 
                          color: i === selectedSol ? 'white' : '#94a3b8' 
                      }}>
                      {i === selectedSol && <div className="absolute inset-0 opacity-20" style={{ backgroundColor: s.color }} />}
                      <span className="relative z-10 text-lg">{s.icon}</span>
                      <span className="relative z-10 flex-1 text-left line-clamp-1">{s.name}</span>
                      {tested.has(i) && <span className="relative z-10 w-2 h-2 rounded-full" style={{ backgroundColor: getPHColor(s.ph) }} />}
                    </button>
                  ))}
                </div>
              </div>
              
              <button 
                onClick={handleNext}
                disabled={dipAnimProgress > 0 && dipAnimProgress < 1}
                className="w-full py-4 rounded-xl font-bold text-white transition-all active:scale-95 shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
                style={{ backgroundColor: hex, boxShadow: `0 8px 20px -8px ${hex}` }}>
                {step === STEPS.length - 1 ? '✅ View Final Report' : `${current.action}`}
              </button>
            </>
          )}

          {/* Progress Indicator */}
          {!completed && (
             <div className="flex gap-1.5 pt-4">
                {STEPS.map((_, i) => (
                    <div key={i} className="flex-1 h-1.5 rounded-full transition-colors" style={{ backgroundColor: i <= step ? hex : 'rgba(255,255,255,0.1)' }} />
                ))}
             </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default PHLabSimulation;
