import React, { useRef, useEffect, useState } from 'react';
import { RotateCcw, CheckCircle, Thermometer } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Html } from '@react-three/drei';
import * as THREE from 'three';
import DraggableSlider from './DraggableSlider';

interface Props { hex: string; }

const STEPS = [
  { title: 'Prepare Calorimeter', instruction: 'Set up a polystyrene cup as calorimeter. This minimizes heat exchange with surroundings.', action: 'Setup Calorimeter ☕' },
  { title: 'Measure HCl Temp', instruction: 'Measure and record the initial temperature of 50mL of 1M HCl solution. Wait until stable.', action: 'Record T₁ (HCl) 🌡️' },
  { title: 'Measure NaOH Temp', instruction: 'In a separate beaker, measure 50mL of 1M NaOH. Record its initial temperature T₂.', action: 'Record T₂ (NaOH) 🌡️' },
  { title: 'Mix & Observe!', instruction: 'Quickly pour the NaOH into the HCl-filled calorimeter. Record the maximum temperature reached (Tmax). Temperature RISES — this is exothermic!', action: 'Pour & Mix! 🔥' },
  { title: 'Calculate ΔH', instruction: 'ΔT = Tmax - T_avg. Q = mcΔT. ΔH = −Q/n kJ/mol (Standard value ≈ −57.1 kJ/mol)', action: 'Calculate ΔH 📐' },
];

const glassMat = <meshPhysicalMaterial transmission={0.9} thickness={0.1} roughness={0.1} ior={1.4} color="#f8fafc" transparent opacity={0.6} side={THREE.DoubleSide} />;

const HeatParticles = ({ active }: { active: boolean }) => {
  const tRef = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (tRef.current && active) {
       tRef.current.children.forEach((p: any, i: number) => {
          const phase = (clock.elapsedTime * 0.5 + i * 0.1) % 1;
          p.position.y = -0.5 + phase * 2;
          p.position.x = Math.cos(clock.elapsedTime * 2 + i) * 0.4;
           p.position.z = Math.sin(clock.elapsedTime * 2 + i) * 0.4;
          p.material.opacity = Math.max(0, 1 - phase * 1.5);
       });
    }
  });

  if (!active) return null;

  return (
    <group ref={tRef} position={[0, 0, 0]}>
       {Array.from({length: 15}).map((_, i) => (
         <mesh key={i}>
            <sphereGeometry args={[0.04]} />
            <meshBasicMaterial color="#ef4444" transparent opacity={0} />
         </mesh>
       ))}
    </group>
  );
};

const CalorimeterScene = ({ step, mixed, mixAnim, currentTemp, tMax, t1, t2 }: any) => {
  const pourRef = useRef<THREE.Group>(null);
  const cup2Ref = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (cup2Ref.current) {
       cup2Ref.current.position.set(2, 0.5 + (mixed ? (1-mixAnim)*1.5 : 0), 0);
       cup2Ref.current.rotation.z = mixed ? (mixAnim < 0.2 ? (-mixAnim/0.2)*Math.PI/3 : (mixAnim > 0.8 ? -(1-mixAnim)/0.2 * Math.PI/3 : -Math.PI/3)) : 0;
    }
  });

  return (
    <group position={[0, -0.5, 0]}>
       {/* Polystyrene Cup (Calorimeter) */}
       <mesh position={[0, 0, 0]} receiveShadow castShadow>
          <cylinderGeometry args={[1.2, 1, 2.5, 32]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.9} />
       </mesh>
       <mesh position={[0, 1.25, 0]} rotation={[-Math.PI/2, 0, 0]}>
          <ringGeometry args={[1.05, 1.2, 32]} />
          <meshStandardMaterial color="#cbd5e1" roughness={0.9} />
       </mesh>

       {/* Liquid Inside Calorimeter */}
       {step >= 1 && (
         <mesh position={[0, -1.25 + (step >= 4 ? 0.75 : 0.5), 0]}>
           <cylinderGeometry args={[1.05, 0.95, step >= 4 ? 1.5 : 1, 32]} />
           <meshPhysicalMaterial transmission={0.6} color={mixed ? (mixAnim>0.5?"#fca5a5":"#bae6fd") : "#bae6fd"} roughness={0.1} />
         </mesh>
       )}

       <HeatParticles active={mixed && mixAnim > 0.5} />

       {/* Thermometer */}
       <group position={[0.5, 1, 0]} rotation={[0, 0, -0.1]}>
         <mesh position={[0, 0, 0]}><cylinderGeometry args={[0.08, 0.08, 3.5, 16]} />{glassMat}</mesh>
         <mesh position={[0, -1.75, 0]}><sphereGeometry args={[0.15, 16, 16]} /><meshPhysicalMaterial color={mixed && mixAnim>0.5?"#ef4444":"#60a5fa"} transmission={0.5} roughness={0} /></mesh>
         
         {/* Mercury thread */}
         {(() => {
           const minT = 20, maxT = tMax + 5;
           const h = ((currentTemp - minT) / (maxT - minT)) * 2.8;
           return (
             <mesh position={[0, -1.6 + h/2, 0]}>
               <cylinderGeometry args={[0.04, 0.04, h]} />
               <meshBasicMaterial color={mixed && mixAnim>0.5?"#ef4444":"#60a5fa"} />
             </mesh>
           )
         })()}
         
         <Html position={[0.2, 1, 0]}>
            <div className={`text-[10px] font-bold px-1.5 py-0.5 rounded shadow whitespace-nowrap bg-black/60 ${mixed && mixAnim>0.5?'text-red-400':'text-blue-400'}`}>
              {currentTemp.toFixed(1)}°C
            </div>
         </Html>
       </group>


       {/* Second Beaker (NaOH) */}
       {step >= 2 && (
         <mesh ref={cup2Ref}>
            {/* Beaker Glass */}
            <cylinderGeometry args={[0.8, 0.8, 1.5, 32, 1, true]} />
            {glassMat}
            <mesh position={[0, -0.75, 0]}><cylinderGeometry args={[0.8, 0.8, 0.1, 32]} />{glassMat}</mesh>
            
            {/* NaOH Liquid inside beaker */}
            {(!mixed || mixAnim < 0.8) && (
               <mesh position={[0, -0.75 + (0.5 * (1-mixAnim)), 0]}>
                 <cylinderGeometry args={[0.75, 0.75, 1 * (1-mixAnim), 32]} />
                 <meshPhysicalMaterial transmission={0.8} color="#d8b4fe" roughness={0.1} transparent opacity={0.6} />
               </mesh>
            )}
         </mesh>
       )}

       {/* Pouring Stream */}
       {mixed && mixAnim > 0.1 && mixAnim < 0.9 && (
          <mesh position={[1, 1, 0]} rotation={[0, 0, Math.PI/4]}>
             <cylinderGeometry args={[0.08, 0.05, 2.5]} />
             <meshPhysicalMaterial transmission={0.8} color="#d8b4fe" roughness={0.1} />
          </mesh>
       )}

    </group>
  );
};

const ThermochemistryLab: React.FC<Props> = ({ hex }) => {
  const [step, setStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [t1, setT1] = useState(25);
  const [t2, setT2] = useState(25);
  const [mixed, setMixed] = useState(false);
  const [mixAnim, setMixAnim] = useState(0);
  const [currentTemp, setCurrentTemp] = useState(25);

  const avgT = (t1 + t2) / 2;
  const tMax = avgT + 5.7; // Exothermic rise
  const deltaT = mixed && mixAnim === 1 ? (currentTemp - avgT) : 0;
  const Q = mixed && mixAnim === 1 ? (100 * 4.18 * deltaT / 1000).toFixed(2) : '0.00'; // kJ
  const deltaH = mixed && mixAnim === 1 ? (-(+Q) / 0.05).toFixed(1) : '0.0';

  useEffect(() => {
     if(!mixed) {
        if(step === 1) setCurrentTemp(t1);
        else if (step === 2) setCurrentTemp(t1); // display thermometer in cal mostly
     }
  }, [step, t1, mixed]);

  const handleMix = () => {
    setMixed(true);
    let m = 0;
    const interval = setInterval(() => {
      m += 0.02;
      if (m > 1) m = 1;
      setMixAnim(m);
      setCurrentTemp(avgT + (tMax - avgT) * Math.min(m * 1.5, 1));
      if (m === 1) {
         clearInterval(interval);
      }
    }, 40);
  };

  const handleNext = () => {
    if (step === 3) handleMix();
    if (step < STEPS.length - 1) setStep(s => s + 1);
    else setCompleted(true);
  };

  const reset = () => { 
    setStep(0); setCompleted(false); setMixed(false); setMixAnim(0); 
    setT1(25); setT2(25); setCurrentTemp(25); 
  };

  const current = STEPS[step];

  return (
    <div className="flex flex-col md:flex-row h-full w-full bg-slate-950">
      <div className="flex-1 relative rounded-2xl overflow-hidden m-4 border border-white/10 shadow-2xl">
        <Canvas camera={{ position: [0, 1, 6], fov: 60 }}>
          <Environment preset="apartment" />
          <ambientLight intensity={0.6} />
          <pointLight position={[5, 10, 5]} intensity={1.5} color={mixed ? "#fca5a5" : "#bae6fd"} />
          <pointLight position={[-5, -10, -5]} intensity={0.5} />
          
          <CalorimeterScene step={step} mixed={mixed} mixAnim={mixAnim} currentTemp={currentTemp} tMax={tMax} t1={t1} t2={t2} />
          
          <ContactShadows position={[0, -2, 0]} opacity={0.6} scale={10} blur={2.5} far={4} color="#000" />
          <OrbitControls enablePan={true} enableZoom={true} target={[0, 0, 0]} />
        </Canvas>

        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3 shadow-xl max-w-xs transition-colors">
          <p className="text-[10px] font-bold uppercase tracking-widest text-red-500 mb-1">Chemistry Lab — c08</p>
          <p className="text-white font-bold text-sm">3D Thermochemistry</p>
          <p className="text-xs text-slate-400 mt-1">Determine the enthalpy of neutralization for HCl and NaOH.</p>
        </div>
      </div>

      <div className="w-full md:w-80 bg-slate-900 border-l border-white/5 flex flex-col z-10">
        <div className="p-5 border-b border-white/5">
           <h2 className="text-lg font-black text-white">Calorimetry</h2>
           <p className="text-[10px] font-bold uppercase tracking-widest text-red-400 mt-1">Step {step + 1} of {STEPS.length}</p>
        </div>
        <div className="flex-1 p-5 space-y-5 overflow-y-auto">
          
          {completed ? (
            <div className="text-center py-4 animate-in fade-in zoom-in duration-500">
              <CheckCircle size={56} className="mx-auto mb-4 text-green-400 drop-shadow-[0_0_15px_rgba(74,222,128,0.5)]" />
              <h3 className="text-xl font-bold text-white mb-2">ΔH Calculated! 🔥</h3>
              
              <div className="bg-slate-950 border border-white/10 p-4 rounded-xl text-left space-y-2.5 mb-6 shadow-inner text-xs">
                <div className="flex justify-between border-b border-white/5 pb-1"><span className="text-slate-400">T₁ (HCl)</span><span className="text-white font-mono">{t1.toFixed(1)} °C</span></div>
                <div className="flex justify-between border-b border-white/5 pb-1"><span className="text-slate-400">T₂ (NaOH)</span><span className="text-white font-mono">{t2.toFixed(1)} °C</span></div>
                <div className="flex justify-between border-b border-white/5 pb-1"><span className="text-slate-400 font-bold text-red-300">Tₘₐₓ</span><span className="text-red-400 font-mono font-bold">{currentTemp.toFixed(1)} °C</span></div>
                <div className="flex justify-between border-b border-white/5 pb-1"><span className="text-slate-400">ΔT (Rise)</span><span className="text-orange-400 font-mono">+{deltaT.toFixed(1)} °C</span></div>
                <div className="flex justify-between border-b border-white/5 pb-1"><span className="text-slate-400">Heat evolving (Q)</span><span className="text-yellow-400 font-mono">{Q} kJ</span></div>
                <div className="flex justify-between pt-1"><span className="text-slate-300 font-bold uppercase">Enthalpy ΔH</span><span className="text-red-400 font-mono font-bold drop-shadow-[0_0_5px_rgba(248,113,113,0.5)]">{deltaH} kJ/mol</span></div>
                <p className="text-[9px] text-slate-500 text-center uppercase tracking-widest pt-2">Standard ΔH = −57.1 kJ/mol</p>
              </div>

              <button onClick={reset} className="w-full py-3 rounded-xl bg-slate-800 text-white font-bold hover:bg-slate-700 transition-all flex items-center justify-center gap-2 shadow-md hover:text-red-400 hover:bg-red-900/20">
                <RotateCcw size={16} /> Reset Calorimeter
              </button>
            </div>
          ) : (
            <>
              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-xl shadow-inner transition-colors duration-500">
                <p className="text-red-300 text-sm font-bold mb-1">{current.title}</p>
                <p className="text-red-200/80 text-xs leading-relaxed">{current.instruction}</p>
              </div>

              {step >= 1 && step < 4 && (
                <div className="bg-black/20 p-4 rounded-xl border border-white/10 space-y-4">
                  <div className={step === 1 ? 'opacity-100' : 'opacity-40 pointer-events-none'}>
                    <DraggableSlider label="Initial Temp HCl (T₁)" min={20} max={30} value={t1} onChange={(v:any)=>{if(step===1)setT1(v)}} color="#60a5fa" unit="°C" step={0.5} />
                  </div>
                  {step >= 2 && (
                    <div className={step === 2 ? 'opacity-100' : 'opacity-40 pointer-events-none'}>
                      <DraggableSlider label="Initial Temp NaOH (T₂)" min={20} max={30} value={t2} onChange={(v:any)=>{if(step===2)setT2(v)}} color="#a78bfa" unit="°C" step={0.5} />
                    </div>
                  )}
                </div>
              )}

              {mixed && (
                <div className="bg-red-950/40 border border-red-500/20 p-4 rounded-xl flex items-center gap-4 shadow-lg">
                  <div className="p-2 bg-red-500/20 rounded-full">
                    <Thermometer className="text-red-400" size={24} />
                  </div>
                  <div>
                    <p className="text-red-300 font-mono font-bold text-lg">Tₘₐₓ = {currentTemp.toFixed(1)}°C</p>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-1 font-bold">Exothermic Reaction</p>
                  </div>
                </div>
              )}

              <button onClick={handleNext} disabled={mixed && mixAnim < 1 && step === 3}
                className="w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 transition-all active:scale-95 shadow-lg shadow-red-600/20 disabled:opacity-50 disabled:cursor-not-allowed">
                {step === STEPS.length - 1 ? '✅ View Calculations' : `${current.action} →`}
              </button>
            </>
          )}

          <div className="flex gap-1.5 pt-2">
            {STEPS.map((_, i) => (
              <div key={i} className="flex-1 h-1 rounded-full transition-all duration-500" style={{ backgroundColor: i <= step ? '#ef4444' : 'rgba(255,255,255,0.05)' }} />
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ThermochemistryLab;
