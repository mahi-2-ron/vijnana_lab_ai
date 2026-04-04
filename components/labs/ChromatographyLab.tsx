import React, { useRef, useEffect, useState } from 'react';
import { RotateCcw, CheckCircle } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Html, Text } from '@react-three/drei';
import * as THREE from 'three';

interface Props { hex: string; }

const PIGMENTS = [
  { name: 'β-Carotene', color: '#f59e0b', rf: 0.98, description: 'Orange pigment, most soluble. Travels furthest.' },
  { name: 'Xanthophyll', color: '#fbbf24', rf: 0.71, description: 'Yellow pigment, moderate solubility.' },
  { name: 'Chlorophyll a', color: '#16a34a', rf: 0.65, description: 'Blue-green, major photosynthetic pigment.' },
  { name: 'Chlorophyll b', color: '#4d7c0f', rf: 0.45, description: 'Yellow-green, least mobile.' },
];

const STEPS = [
  { title: 'Extract & Grind', instruction: 'Crush spinach leaves in acetone. The chlorophyll mixture is extracted.', action: 'Prepare Extract 🌿' },
  { title: 'Spot Paper', instruction: 'Draw a pencil line 2cm from bottom. Apply extract. Repeat until dark.', action: 'Apply Extract Spot 🖋️' },
  { title: 'Prepare Chamber', instruction: 'Pour petroleum ether/acetone solvent. Do NOT submerge the pencil line!', action: 'Fill Chamber 🧪' },
  { title: 'Elution (Run)', instruction: 'Solvent climbs paper via capillary action, carrying pigments at different speeds.', action: 'Begin Chromatography ▶️' },
  { title: 'Calculate Rf', instruction: 'Mark solvent front. Rf = Distance moved by pigment / Distance moved by solvent.', action: 'Analyze Rf 📐' },
];

const glassMat = <meshPhysicalMaterial transmission={0.95} thickness={0.1} roughness={0.1} ior={1.4} color="#f8fafc" transparent opacity={0.4} side={THREE.DoubleSide} />;

const ChromatographyChamber = ({ step, progress, selectedPigment }: any) => {
  const paperH = 4;
  const paperW = 1;
  const baselineY = -1.5;
  const solventTopY = baselineY + progress * 3; 

  return (
    <group position={[0, -0.5, 0]}>
      {/* Glass Jar */}
      <mesh position={[0, 0, 0]}><cylinderGeometry args={[1.5, 1.5, 5, 32, 1, true]} />{glassMat}</mesh>
      <mesh position={[0, -2.5, 0]}><cylinderGeometry args={[1.5, 1.5, 0.1, 32]} />{glassMat}</mesh>
      {/* Jar Lid (Cork/Rubber) */}
      <mesh position={[0, 2.5, 0]}><cylinderGeometry args={[1.55, 1.45, 0.4, 32]} /><meshStandardMaterial color="#27272a" roughness={0.9} /></mesh>

      {/* Solvent Pool */}
      {step >= 2 && (
         <mesh position={[0, -2.1, 0]}>
           <cylinderGeometry args={[1.45, 1.45, 0.8, 32]} />
           <meshPhysicalMaterial transmission={0.8} color="#bae6fd" roughness={0} transparent opacity={0.6} />
         </mesh>
      )}

      {/* Hanging Hook for Paper */}
      <mesh position={[0, 2.3, 0]}><cylinderGeometry args={[0.02, 0.02, 0.4]} /><meshStandardMaterial color="#94a3b8" metalness={0.8} /></mesh>
      
      {/* Chromatography Paper */}
      <group position={[0, 0, 0]}>
         {/* Dry Paper */}
         <mesh position={[0, 0, 0]}>
           <planeGeometry args={[paperW, paperH]} />
           <meshStandardMaterial color="#fef9ec" roughness={1} side={THREE.DoubleSide} />
         </mesh>

         {/* Wet Paper Area (from bottom up to solventTopY) */}
         {progress > 0 && (
           <mesh position={[0, (-paperH/2) + ((solventTopY - (-paperH/2)) / 2), 0.005]}>
              <planeGeometry args={[paperW, solventTopY - (-paperH/2)]} />
              <meshStandardMaterial color="#cbd5e1" roughness={0.8} transparent opacity={0.4} side={THREE.DoubleSide} />
           </mesh>
         )}

         {/* Pencil Baseline */}
         <mesh position={[0, baselineY, 0.01]}>
           <planeGeometry args={[paperW, 0.02]} />
           <meshBasicMaterial color="#64748b" transparent opacity={0.5} />
         </mesh>
         
         {/* Labels */}
         {step >= 4 && (
           <>
              <Html position={[-0.8, baselineY, 0]} center><div className="text-[10px] text-slate-400 font-mono tracking-widest bg-slate-900/80 px-2 rounded">BASELINE</div></Html>
              <Html position={[-0.8, solventTopY, 0]} center><div className="text-[10px] text-blue-400 font-mono tracking-widest bg-blue-900/80 px-2 rounded">FRONT</div></Html>
              {/* Solvent front line */}
              <mesh position={[0, solventTopY, 0.01]}><planeGeometry args={[paperW, 0.02]} /><meshBasicMaterial color="#3b82f6" transparent opacity={0.8} /></mesh>
           </>
         )}

         {/* Initial Extract Spot */}
         {step >= 1 && progress === 0 && (
            <mesh position={[0, baselineY, 0.015]}>
              <circleGeometry args={[0.08, 32]} />
              <meshBasicMaterial color="#064e3b" />
            </mesh>
         )}

         {/* Traveling Pigment Bands */}
         {progress > 0 && PIGMENTS.map((pig, i) => {
            const dist = progress * 3 * pig.rf;
            const bandY = baselineY + dist;
            if (dist < 0.1) return null; // Wait for it to separate slightly
            
            const intensity = Math.min(1, dist * 2);
            const isSelected = selectedPigment === i;
            
            return (
               <group key={i} position={[0, bandY, 0.01 + i*0.001]}>
                 <mesh scale={[1, 0.4, 1]}>
                    <circleGeometry args={[0.15 + (dist*0.05), 32]} />
                    <meshBasicMaterial color={new THREE.Color(pig.color).lerp(new THREE.Color("#fef9ec"), 1-intensity)} transparent opacity={0.85} />
                 </mesh>
                 {step >= 4 && (
                    <Html position={[0.7, 0, 0]} center zIndexRange={[100,0]}>
                      <div className={`font-bold whitespace-nowrap text-[10px] px-2 py-0.5 rounded cursor-pointer transition-all ${isSelected ? 'text-white shadow-[0_0_10px_currentcolor]' : 'text-slate-400/80 bg-slate-900/40'}`} style={isSelected ? { backgroundColor: pig.color } : {}}>
                         {pig.name} (Rf={pig.rf})
                      </div>
                    </Html>
                 )}
               </group>
            );
         })}
      </group>
    </group>
  );
};

const ChromatographyLab: React.FC<Props> = ({ hex }) => {
  const [step, setStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState(0); // 0-1
  const [selectedPigment, setSelectedPigment] = useState<number | null>(null);

  useEffect(() => {
    if (running) {
       const interval = setInterval(() => {
          setProgress(p => {
             if (p >= 1) {
                clearInterval(interval);
                setRunning(false);
                setStep(4);
                return 1;
             }
             return p + 0.002; // Runs for roughly 15-20 seconds
          });
       }, 30);
       return () => clearInterval(interval);
    }
  }, [running]);

  const handleNext = () => {
    if (step === 3) {
      setRunning(true);
      return;
    }
    if (step < STEPS.length - 1) setStep(s => s + 1);
    else setCompleted(true);
  };

  const reset = () => { setStep(0); setCompleted(false); setProgress(0); setRunning(false); setSelectedPigment(null); };

  const current = STEPS[step];

  return (
    <div className="flex flex-col md:flex-row h-full w-full bg-slate-950">
      <div className="flex-1 relative rounded-2xl overflow-hidden m-4 border border-white/10 shadow-2xl">
        <Canvas camera={{ position: [0, -0.5, 6], fov: 60 }}>
          <Environment preset="apartment" />
          <ambientLight intensity={0.8} />
          <pointLight position={[5, 10, 5]} intensity={1} color="#fef08a" />
          <pointLight position={[-5, -5, -5]} intensity={0.5} />
          
          <ChromatographyChamber step={step} progress={progress} selectedPigment={selectedPigment} />
          
          <ContactShadows position={[0, -3, 0]} opacity={0.6} scale={10} blur={2.5} far={4} color="#000" />
          <OrbitControls enablePan={true} enableZoom={true} target={[0, -0.5, 0]} />
        </Canvas>

        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3 shadow-xl max-w-xs transition-colors">
          <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 mb-1">Biology Lab — b08</p>
          <p className="text-white font-bold text-sm">3D Paper Chromatography</p>
          <p className="text-xs text-slate-400 mt-1">Separate photosynthetic pigments via capillary action.</p>
        </div>
      </div>

      <div className="w-full md:w-80 bg-slate-900 border-l border-white/5 flex flex-col z-10">
        <div className="p-5 border-b border-white/5">
           <h2 className="text-lg font-black text-white">Chromatography</h2>
           <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 mt-1">Procedure Phase {step + 1}</p>
        </div>
        <div className="flex-1 p-5 space-y-5 overflow-y-auto">
          
          {completed ? (
            <div className="text-center py-4 animate-in fade-in zoom-in duration-500">
              <CheckCircle size={56} className="mx-auto mb-4 text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]" />
              <h3 className="text-xl font-bold text-white mb-2">Resolution Complete! 🌈</h3>
              <p className="text-slate-400 text-xs mb-6 px-4">All 4 pigments extracted from the spinach leaf have been successfully separated by weight and solubility.</p>
              <button onClick={reset} className="w-full py-3 rounded-xl bg-slate-800 text-white font-bold hover:bg-slate-700 transition-all flex items-center justify-center gap-2 shadow-md hover:text-red-400 hover:bg-red-900/20">
                <RotateCcw size={16} /> Reset Lab
              </button>
            </div>
          ) : (
            <>
              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-xl shadow-inner transition-colors duration-500">
                <p className="text-emerald-300 text-sm font-bold mb-1">{current.title}</p>
                <p className="text-emerald-200/80 text-xs leading-relaxed">{current.instruction}</p>
              </div>

              {running && (
                <div className="bg-slate-950 border border-white/10 rounded-xl p-4 shadow-inner">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-blue-400 text-[10px] font-bold uppercase tracking-widest animate-pulse">🧪 Capillary Elution Active</p>
                    <span className="text-xs font-mono font-bold text-blue-300">{Math.round(progress * 100)}%</span>
                  </div>
                  <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-400" style={{ width: `${progress * 100}%` }} />
                  </div>
                  <p className="text-[9px] text-slate-500 mt-2 text-center">Solvent front is rising through paper matrix...</p>
                </div>
              )}

              {step >= 4 && (
                <div className="space-y-2">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest border-b border-white/5 pb-1 mb-2">Pigment Analysis (Rf)</p>
                  {PIGMENTS.map((p, i) => (
                    <button key={p.name} onClick={() => setSelectedPigment(i === selectedPigment ? null : i)}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all border ${selectedPigment === i ? 'bg-white/10' : 'bg-slate-950 hover:bg-slate-800'}`}
                      style={{ borderColor: selectedPigment === i ? p.color : 'rgba(255,255,255,0.05)' }}>
                      <div className="w-5 h-5 rounded-full flex-shrink-0 shadow-inner" style={{ backgroundColor: p.color }} />
                      <div className="text-left flex-1">
                        <div className="flex justify-between items-center text-white font-bold text-xs">
                          {p.name}
                          <span className="font-mono">{p.rf}</span>
                        </div>
                        {selectedPigment === i && <p className="text-[10px] text-slate-300 mt-1.5 leading-tight">{p.description}</p>}
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {!running && (
                <button onClick={handleNext}
                  className="w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 transition-all active:scale-95 shadow-lg shadow-emerald-600/20">
                  {step === STEPS.length - 1 ? '✅ Conclude Experiment' : `${current.action} →`}
                </button>
              )}
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

export default ChromatographyLab;
