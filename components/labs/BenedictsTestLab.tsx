import React, { useState, useRef, useEffect } from 'react';
import { RotateCcw, CheckCircle, Thermometer, Flame } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, RoundedBox, Html, Cylinder, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import DraggableSlider from './DraggableSlider';

interface BenedictsTestLabProps { hex: string; }

const STEPS = [
  { title: 'Take Urine Sample', instruction: 'Take 2ml of the urine sample in a clean test tube using a pipette.', action: 'Pipette Sample 🧪', color: '#f8fafc' },
  { title: "Add Benedict's Reagent", instruction: "Add 5 drops of Benedict's reagent (deep blue copper sulphate solution) to the urine sample.", action: "Add Benedict's 💙", color: '#1d4ed8' },
  { title: 'Heat in Water Bath', instruction: 'Place the test tube in a boiling water bath for 3–5 minutes. Heat causes the copper ions to react with reducing sugars.', action: 'Heat (3 min) 🔥', color: '#ef4444' },
  { title: 'Observe Result', instruction: "Observe the colour change. Blue = No sugar. Green = Trace. Yellow = Moderate. Brick Red = High glucose (Diabetes indicator!).", action: 'Read Result 👁️', color: '#f59e0b' },
  { title: 'Record Diagnosis', instruction: 'Record the result. A brick-red precipitate indicates presence of reducing sugar (glucose) — a sign of glucosuria/diabetes mellitus.', action: 'Record Diagnosis 📋', color: '#10b981' },
];

const getResultText = (glucose: number) => {
    if (glucose < 20) return { text: 'NEGATIVE 🟦', sub: 'No glucose detected', color: '#3b82f6', hex: '#1d4ed8' };
    if (glucose < 40) return { text: 'TRACE 🟩', sub: 'Trace glucose (1+)', color: '#22c55e', hex: '#16a34a' };
    if (glucose < 60) return { text: 'MODERATE 🟨', sub: 'Moderate glucose (2+)', color: '#eab308', hex: '#ca8a04' };
    if (glucose < 80) return { text: 'HIGH 🟧', sub: 'High glucose (3+)', color: '#f97316', hex: '#ea580c' };
    return { text: 'DIABETIC ⚠️ 🟥', sub: 'Brick Red — Glucose+++ (Glucosuria!)', color: '#ef4444', hex: '#b91c1c' };
};

const BenedictsScene = ({ step, heatProgress, glucose, showResult }: any) => {
    const liquidRef = useRef<THREE.MeshPhysicalMaterial>(null);
    const bathRef = useRef<THREE.Group>(null);
    const flameRef = useRef<THREE.Group>(null);
    const dropperRef = useRef<THREE.Group>(null);
    
    // Determine target color based on step & reaction progress
    const getTargetColor = () => {
        if (step === 0) return '#fef08a'; // Pale yellow urine
        if (step === 1 || (step >= 2 && heatProgress === 0)) return '#1d4ed8'; // Blue Benedicts
        
        // Target color based on glucose
        const finalColor = getResultText(glucose).hex;
        
        // During heating, interpolate from blue to final color based on heat progress
        return finalColor; 
    };

    const targetColor = getTargetColor();

    useFrame((state) => {
        // Liquid Color Interpolation
        if (liquidRef.current) {
            // Speed depends on if we are actively heating
            const lerpSpeed = step === 3 && !showResult ? 0.05 : 0.1; 
            
            // If actively heating, manually lerp color based on progress
            if (heatProgress > 0 && heatProgress < 100) {
                 const startC = new THREE.Color('#1d4ed8');
                 const endC = new THREE.Color(targetColor);
                 liquidRef.current.color.copy(startC.lerp(endC, heatProgress / 100));
            } else {
                 liquidRef.current.color.lerp(new THREE.Color(targetColor), lerpSpeed);
            }
        }

        // Dropper Animation
        if (dropperRef.current) {
            const active = step === 1;
            const targetY = active ? 2.5 : 4.5;
            dropperRef.current.position.y = THREE.MathUtils.lerp(dropperRef.current.position.y, targetY, 0.1);
        }

        // Water Bath ascending
        if (bathRef.current) {
            const bathActive = step >= 2;
            const targetY = bathActive ? 0 : -2;
            bathRef.current.position.y = THREE.MathUtils.lerp(bathRef.current.position.y, targetY, 0.05);
        }

        // Flame flickering
        if (flameRef.current) {
             const scale = 1 + Math.sin(state.clock.elapsedTime * 10) * 0.1;
             flameRef.current.scale.set(scale, scale, scale);
        }
    });

    return (
        <group position={[0, -1.2, 0]}>
            {/* Lab Bench */}
            <Cylinder args={[5, 5, 0.2, 32]} position={[0, -0.1, 0]} receiveShadow>
               <meshPhysicalMaterial color="#0f172a" roughness={0.9} />
            </Cylinder>

            {/* Test Tube Rack Base */}
            <RoundedBox args={[1.5, 0.2, 1.5]} position={[0, 0.1, 0]} castShadow receiveShadow>
                <meshStandardMaterial color="#334155" />
            </RoundedBox>

            {/* Test Tube */}
            <group position={[0, 1.6, 0]}>
                {/* Glass */}
                <Cylinder args={[0.3, 0.3, 2.5, 32]} position={[0, 0, 0]} castShadow>
                   <meshPhysicalMaterial color="#ffffff" transmission={0.99} opacity={1} roughness={0} ior={1.5} thickness={0.1} transparent side={THREE.DoubleSide} />
                </Cylinder>
                <Sphere args={[0.3, 32, 16, 0, Math.PI*2, 0, Math.PI/2]} position={[0, -1.25, 0]} rotation={[Math.PI, 0, 0]}>
                   <meshPhysicalMaterial color="#ffffff" transmission={0.99} opacity={1} roughness={0} ior={1.5} thickness={0.1} transparent side={THREE.DoubleSide} />
                </Sphere>
                
                {/* Lip */}
                <Cylinder args={[0.35, 0.35, 0.05, 32]} position={[0, 1.25, 0]}><meshPhysicalMaterial color="#ffffff" transmission={0.9} roughness={0.1} /></Cylinder>

                {/* Liquid Volume */}
                <Cylinder args={[0.28, 0.28, step >= 1 ? 1.5 : 0.8, 32]} position={[0, step >= 1 ? -0.5 : -0.85, 0]}>
                    <meshPhysicalMaterial ref={liquidRef} transmission={0.6} opacity={0.9} transparent roughness={0.1} ior={1.33} />
                </Cylinder>
                <Sphere args={[0.28, 32, 16, 0, Math.PI*2, 0, Math.PI/2]} position={[0, -1.25, 0]} rotation={[Math.PI, 0, 0]}>
                    <meshPhysicalMaterial color={targetColor} transmission={0.6} opacity={0.9} transparent roughness={0.1} ior={1.33} />
                </Sphere>

                {/* Boiling Bubbles inside Tube */}
                {(heatProgress > 0 && heatProgress < 100) && <BoilingBubbles tubeRadius={0.2} active={true} height={1.5} />}
            </group>

            {/* Dropper Setup */}
            <group ref={dropperRef} position={[0, 4.5, 0]}>
                 <Cylinder args={[0.08, 0.08, 0.8, 16]} position={[0, 0, 0]}>
                     <meshPhysicalMaterial color="#ffffff" transmission={0.9} roughness={0.1} />
                 </Cylinder>
                 <Cylinder args={[0.15, 0.15, 0.4, 16]} position={[0, 0.6, 0]}>
                     <meshStandardMaterial color="#1e293b" />
                 </Cylinder>
                 {step === 1 && <Droplet color="#1d4ed8" />}
            </group>

            {/* Water Bath Setup */}
            <group ref={bathRef} position={[0, -2, 0]}>
                {/* Large Beaker */}
                <Cylinder args={[1.2, 1.2, 2, 32]} position={[0, 1.5, 0]} castShadow>
                   <meshPhysicalMaterial color="#ffffff" transmission={0.99} opacity={1} roughness={0} ior={1.5} thickness={0.1} transparent side={THREE.DoubleSide} />
                </Cylinder>
                <Cylinder args={[1.15, 1.15, 1.8, 32]} position={[0, 1.4, 0]}>
                   <meshPhysicalMaterial color="#60a5fa" transmission={0.8} opacity={0.6} transparent ior={1.33} />
                </Cylinder>
                {/* Bath Boiling Bubbles */}
                {(heatProgress > 0 && heatProgress < 100) && <group position={[0, 1, 0]}><BoilingBubbles tubeRadius={0.8} active={true} height={1.5} /></group>}

                {/* Burner Tripod */}
                <Cylinder args={[0.05, 0.05, 0.8, 8]} position={[-0.8, 0.4, 0.8]}><meshStandardMaterial color="#64748b" /></Cylinder>
                <Cylinder args={[0.05, 0.05, 0.8, 8]} position={[0.8, 0.4, 0.8]}><meshStandardMaterial color="#64748b" /></Cylinder>
                <Cylinder args={[0.05, 0.05, 0.8, 8]} position={[0, 0.4, -1]}><meshStandardMaterial color="#64748b" /></Cylinder>
                <Cylinder args={[1.3, 1.3, 0.05, 32]} position={[0, 0.8, 0]}><meshStandardMaterial color="#cbd5e1" wireframe /></Cylinder>

                {/* Gas Burner */}
                <Cylinder args={[0.4, 0.4, 0.3, 32]} position={[0, 0.15, 0]}><meshStandardMaterial color="#b91c1c" /></Cylinder>
                <Cylinder args={[0.2, 0.2, 0.2, 32]} position={[0, 0.35, 0]}><meshStandardMaterial color="#1e293b" /></Cylinder>
                
                {/* Flame */}
                {heatProgress > 0 && heatProgress < 100 && (
                    <group ref={flameRef} position={[0, 0.55, 0]}>
                        <Cylinder args={[0, 0.3, 0.5, 16]} position={[0, 0.25, 0]}>
                             <meshPhysicalMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={2} transparent opacity={0.8} />
                        </Cylinder>
                        <Cylinder args={[0, 0.15, 0.3, 16]} position={[0, 0.15, 0]}>
                             <meshPhysicalMaterial color="#60a5fa" emissive="#93c5fd" emissiveIntensity={1} transparent opacity={0.9} />
                        </Cylinder>
                    </group>
                )}
            </group>
        </group>
    );
};

const Droplet = ({ color }: { color: string }) => {
    const meshRef = useRef<THREE.Mesh>(null);
    useFrame((state) => {
        if(meshRef.current) {
            const t = (state.clock.elapsedTime * 2) % 1;
            meshRef.current.position.y = -0.5 - (t * 2);
            meshRef.current.scale.setScalar(1 - (t * 0.5));
            meshRef.current.visible = t < 0.9;
        }
    });

    return (
        <mesh ref={meshRef} position={[0, -0.5, 0]}>
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshPhysicalMaterial color={color} transmission={0.8} />
        </mesh>
    );
}

const BoilingBubbles = ({ active, tubeRadius, height }: { active: boolean, tubeRadius: number, height: number }) => {
    const groupRef = useRef<THREE.Group>(null);
    useFrame(() => {
        if (!groupRef.current || !active) return;
        groupRef.current.children.forEach(c => {
            c.position.y += Math.random() * 0.08 + 0.02;
            c.position.x += (Math.random() - 0.5) * 0.05;
            if (c.position.y > height) {
                c.position.y = -0.5;
                c.position.x = (Math.random() - 0.5) * tubeRadius;
            }
        });
    });

    return (
        <group ref={groupRef} position={[0, -1, 0]}>
            {[...Array(15)].map((_, i) => (
                <Sphere key={i} args={[0.03 + Math.random()*0.02, 8, 8]} position={[(Math.random()-0.5)*tubeRadius, Math.random()*height, (Math.random()-0.5)*tubeRadius]}>
                    <meshPhysicalMaterial color="#ffffff" transmission={0.9} roughness={0} />
                </Sphere>
            ))}
        </group>
    );
};


const BenedictsTestLab: React.FC<BenedictsTestLabProps> = ({ hex }) => {
  const [step, setStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [glucose, setGlucose] = useState(50);
  const [heating, setHeating] = useState(false);
  const [heatProgress, setHeatProgress] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleNext = () => {
    if (step === 2) {
      setHeating(true);
      let p = 0;
      const iv = setInterval(() => {
        p += 2;
        setHeatProgress(p);
        if (p >= 100) { 
            clearInterval(iv); 
            setHeating(false); 
            setShowResult(true); 
            setStep(3); 
        }
      }, 60);
      return;
    }
    if (step < STEPS.length - 1) setStep(s => s + 1);
    else setCompleted(true);
  };

  const reset = () => { 
      setStep(0); 
      setCompleted(false); 
      setHeatProgress(0); 
      setHeating(false); 
      setShowResult(false); 
  };

  const current = STEPS[step];
  const result = getResultText(glucose);

  return (
    <div className="flex flex-col md:flex-row h-full w-full bg-[#050505] overflow-hidden text-slate-200 select-none">
      
      {/* 3D Visualization */}
      <div className="flex-1 flex flex-col relative rounded-2xl overflow-hidden m-4 border border-white/10 shadow-2xl">
        <div className="absolute inset-x-0 top-0 p-4 bg-gradient-to-b from-black/80 to-transparent z-10 flex justify-between items-start">
            <div>
                <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400"><Thermometer size={18} /></span>
                    Benedict's Test (Glucose)
                </h2>
                <p className="text-[11px] font-medium text-slate-400 uppercase tracking-widest mt-1">Chemical Qualitative Analysis</p>
            </div>
            
            {/* Real-time Result Overlay */}
            {showResult && step >= 3 && (
                 <div className="bg-black/60 p-3 rounded-xl border backdrop-blur-md shadow-lg animate-fade-in text-right" style={{ borderColor: result.color }}>
                     <p className="text-[10px] uppercase font-bold tracking-widest" style={{ color: result.color }}>Diagnosis / Result</p>
                     <p className="font-bold text-white leading-none mt-1">{result.text}</p>
                 </div>
            )}
        </div>

        <Canvas camera={{ position: [0, 2, 7], fov: 40 }}>
            <Environment preset="city" />
            <ambientLight intensity={0.4} />
            <pointLight position={[5, 10, 5]} intensity={1.5} />
            <pointLight position={[-5, 5, -5]} color={result.color} intensity={0.5} />
            
            <BenedictsScene step={step} heatProgress={heatProgress} glucose={glucose} showResult={showResult} />

            <ContactShadows position={[0, -1.2, 0]} opacity={0.6} scale={15} blur={2.5} far={4} color="#000" />
            <OrbitControls enablePan={true} enableZoom={true} maxPolarAngle={Math.PI / 2 - 0.05} />
        </Canvas>

        {/* Heat Progress Bar */}
        {heating && (
             <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full max-w-xs bg-black/80 p-4 rounded-xl border border-white/10 backdrop-blur-xl shadow-2xl">
                  <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                          <Flame size={14} className="text-red-500 animate-pulse" />
                          <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">Boiling Water Bath</span>
                      </div>
                      <span className="text-xs font-mono font-bold text-red-400">{heatProgress}%</span>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-300" style={{ width: `${heatProgress}%` }} />
                  </div>
             </div>
        )}
      </div>

      {/* Control Panel */}
      <div className="w-full md:w-[320px] shrink-0 bg-[#0a0a0a] border-l border-white/10 flex flex-col z-20 shadow-[-10px_0_30px_rgba(0,0,0,0.5)]">
        <div className="p-6 border-b border-white/5">
          <p className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-2 border-b border-amber-500/20 inline-block pb-1">Procedure — Step {step + 1} of {STEPS.length}</p>
          <h2 className="text-xl font-bold text-white tracking-tight">{current.title}</h2>
        </div>
        
        <div className="flex-1 p-6 space-y-6 overflow-y-auto">
          {completed ? (
            <div className="text-center py-6 animate-fade-in">
              <CheckCircle size={48} className="mx-auto mb-4 text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]" />
              <h3 className="text-xl font-bold text-white mb-6">Test Complete!</h3>
              
              <div className="p-5 rounded-2xl border bg-black shadow-inner mb-6" style={{ borderColor: result.color + '50' }}>
                 <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Clinical Diagnosis</p>
                 <p className="font-black text-xl mb-1" style={{ color: result.color }}>{result.text}</p>
                 <p className="text-sm font-medium text-slate-300">{result.sub}</p>
              </div>

              <button onClick={reset} className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-slate-800 text-amber-400 hover:bg-slate-700 transition-colors font-bold shadow-lg shadow-amber-900/20"><RotateCcw size={16} /> Reset Lab</button>
            </div>
          ) : (
            <>
              <div className="bg-amber-900/20 border border-amber-500/30 p-4 rounded-xl backdrop-blur-md">
                <p className="text-amber-100 text-sm leading-relaxed">{current.instruction}</p>
              </div>
              
              <div className="bg-[#111] p-5 rounded-xl border border-white/5 shadow-inner">
                 <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 border-b border-white/10 pb-2">Sample Configuration</p>
                 <DraggableSlider label="Urine Glucose Level" min={0} max={100} value={glucose} onChange={setGlucose} color={result.color} unit="%" formatValue={(v) => v > 80 ? 'HIGH' : v > 50 ? 'MED' : v > 20 ? 'LOW' : 'NONE'} />
                 <div className="flex justify-between text-[9px] font-bold uppercase tracking-widest text-slate-600 mt-2">
                   <span>Healthy</span><span className="text-red-900">Diabetic</span>
                 </div>
              </div>

              {!heating && (
                <button onClick={handleNext}
                  className="w-full py-4 rounded-xl font-bold text-white transition-all active:scale-95 shadow-lg flex items-center justify-center gap-2"
                  style={{ backgroundColor: hex, boxShadow: `0 8px 20px -8px ${hex}` }}>
                  {step === STEPS.length - 1 ? '✅ View Final Report' : `${current.action}`}
                </button>
              )}
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

export default BenedictsTestLab;
