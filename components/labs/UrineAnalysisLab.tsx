import React, { useState, useRef, useEffect, useMemo } from 'react';
import { RotateCcw, Droplets, Activity } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, RoundedBox, Cylinder, Sphere } from '@react-three/drei';
import * as THREE from 'three';

interface Props { hex: string; }

const TESTS = [
  { id: 'glucose', name: 'Glucose', reagent: "Benedict's", normal: 'Absent', abnormal: 'Blue→Brick red', normalColor: '#3b82f6', abnormalColor: '#ef4444', meaning: 'Diabetes mellitus' },
  { id: 'protein', name: 'Protein', reagent: 'Sulfosalicylic', normal: 'Absent (<150mg/g)', abnormal: 'White turbidity', normalColor: '#fef08a', abnormalColor: '#ffffff', meaning: 'Kidney disease (proteinuria)' },
  { id: 'ketones', name: 'Ketones', reagent: 'Rothera\'s', normal: 'Absent', abnormal: 'Purple ring', normalColor: '#fde047', abnormalColor: '#7c3aed', meaning: 'Diabetic ketoacidosis' },
  { id: 'bile', name: 'Bile Salts', reagent: "Hay's test", normal: 'Absent', abnormal: 'Sulfur sinks', normalColor: '#fef08a', abnormalColor: '#78350f', meaning: 'Liver/biliary disease' },
  { id: 'ph', name: 'pH', reagent: 'pH strip', normal: '4.6 – 8.0', abnormal: '<4.5 or >8.0', normalColor: '#22c55e', abnormalColor: '#f59e0b', meaning: 'UTI / Acidosis' },
];

const SAMPLE_CONFIGS: any = {
    normal:   { glucose: false, protein: false, ketones: false, bile: false, ph: 6.5 },
    diabetic: { glucose: true, protein: false, ketones: true, bile: false, ph: 5.5 },
    kidney:   { glucose: false, protein: true, ketones: false, bile: false, ph: 7.5 },
    ketosis:  { glucose: false, protein: false, ketones: true, bile: false, ph: 4.8 },
};

const UrineScene = ({ sampleType, testDone, animating, selectedTest }: any) => {
    const activeSample = SAMPLE_CONFIGS[sampleType];
    const baseUrineColor = sampleType === 'normal' ? '#fef08a' : sampleType === 'diabetic' ? '#fde68a' : sampleType === 'kidney' ? '#bef264' : '#fbbf24';

    return (
        <group position={[0, -1, 0]}>
            <ambientLight intensity={0.4} />
            <pointLight position={[5, 10, 5]} intensity={1.5} color="#ffffff" shadow-bias={-0.001} castShadow />
            <pointLight position={[-5, 5, -5]} color="#60a5fa" intensity={0.5} />

            {/* Main Workbench */}
            <Cylinder args={[6, 6, 0.2, 32]} position={[0, -0.1, 0]} receiveShadow>
                <meshStandardMaterial color="#0f172a" roughness={0.8} />
            </Cylinder>

            {/* Test Tube Rack */}
            <group position={[0, 0, 0]}>
                {/* Wooden Rack Base and Bars */}
                <RoundedBox args={[4.5, 0.2, 1]} position={[0, 0.1, 0]} receiveShadow castShadow><meshStandardMaterial color="#78350f" /></RoundedBox>
                <RoundedBox args={[4.5, 0.2, 1]} position={[0, 1.5, 0]} receiveShadow castShadow><meshStandardMaterial color="#78350f" /></RoundedBox>
                <Cylinder args={[0.05, 0.05, 1.4, 8]} position={[-2.1, 0.8, 0.4]} castShadow><meshStandardMaterial color="#d4d4d8" /></Cylinder>
                <Cylinder args={[0.05, 0.05, 1.4, 8]} position={[2.1, 0.8, 0.4]} castShadow><meshStandardMaterial color="#d4d4d8" /></Cylinder>
                <Cylinder args={[0.05, 0.05, 1.4, 8]} position={[-2.1, 0.8, -0.4]} castShadow><meshStandardMaterial color="#d4d4d8" /></Cylinder>
                <Cylinder args={[0.05, 0.05, 1.4, 8]} position={[2.1, 0.8, -0.4]} castShadow><meshStandardMaterial color="#d4d4d8" /></Cylinder>
            </group>

            {/* 5 Test Tubes */}
            {TESTS.map((test, index) => {
                 const isDone = testDone[test.id];
                 const isAnim = animating && selectedTest === test.id;
                 const isAbnormal = activeSample[test.id] === true || (test.id === 'ph' && (activeSample.ph < 4.5 || activeSample.ph > 8));
                 
                 const finalColor = isAbnormal ? test.abnormalColor : test.normalColor;
                 const tBaseColor = isDone ? finalColor : baseUrineColor;

                 return (
                     <TestTube key={test.id} 
                               index={index} 
                               testId={test.id}
                               isDone={isDone} 
                               isAnim={isAnim} 
                               isAbnormal={isAbnormal}
                               targetColor={tBaseColor}
                     />
                 );
            })}
            
            {/* pH Strip specific logic - floats down into tube 4 */}
            {animating && selectedTest === 'ph' && (
                <PHStrip />
            )}
        </group>
    );
};

const TestTube = ({ index, testId, isDone, isAnim, isAbnormal, targetColor }: any) => {
    const liquidRef = useRef<THREE.MeshPhysicalMaterial>(null);
    const particlesRef = useRef<THREE.Group>(null);
    const ringRef = useRef<THREE.MeshPhysicalMaterial>(null);

    const xPos = -1.6 + index * 0.8;

    useFrame((state) => {
        if (liquidRef.current) {
             const tCol = new THREE.Color(targetColor);
             // Slowly lerp color if done, unless it's protein turbidity where we lower transmission
             liquidRef.current.color.lerp(tCol, 0.05);

             if (testId === 'protein' && isDone && isAbnormal) {
                  // White turbidity
                  liquidRef.current.transmission = THREE.MathUtils.lerp(liquidRef.current.transmission as number, 0.1, 0.05);
                  liquidRef.current.roughness = THREE.MathUtils.lerp(liquidRef.current.roughness, 0.8, 0.05);
             } else {
                  liquidRef.current.transmission = THREE.MathUtils.lerp(liquidRef.current.transmission as number, 0.9, 0.05);
                  liquidRef.current.roughness = 0.1;
             }
        }

        // Bile salts = particles sinking
        if (testId === 'bile' && particlesRef.current) {
            const active = isDone && isAbnormal;
            particlesRef.current.visible = true; // Always true to manage animation safely
            if (active) {
                particlesRef.current.children.forEach(c => {
                     // Sink downward slowly
                     c.position.y -= 0.005;
                     if (c.position.y < -0.8) c.position.y = -0.8 + Math.random() * 0.1; // Pool at bottom
                });
            } else {
                 // Float at top
                 particlesRef.current.children.forEach(c => {
                      c.position.y = THREE.MathUtils.lerp(c.position.y, 0.7, 0.05);
                 });
            }
        }

        // Ketone Purple Ring at the interface layer
        if (testId === 'ketones' && ringRef.current) {
            const active = isDone && isAbnormal;
            ringRef.current.opacity = THREE.MathUtils.lerp(ringRef.current.opacity, active ? 0.9 : 0, 0.05);
        }
    });

    return (
        <group position={[xPos, 1.2, 0]}>
            {/* Glass Tube */}
            <Cylinder args={[0.2, 0.2, 2, 32]} position={[0, 0, 0]} castShadow>
               <meshPhysicalMaterial color="#ffffff" transmission={0.99} opacity={1} roughness={0} ior={1.5} thickness={0.1} transparent side={THREE.DoubleSide} />
            </Cylinder>
            <Sphere args={[0.2, 32, 16, 0, Math.PI*2, 0, Math.PI/2]} position={[0, -1, 0]} rotation={[Math.PI, 0, 0]}>
               <meshPhysicalMaterial color="#ffffff" transmission={0.99} opacity={1} roughness={0} ior={1.5} thickness={0.1} transparent side={THREE.DoubleSide} />
            </Sphere>

            {/* Liquid Fill */}
            <mesh position={[0, -0.5, 0]}>
                <cylinderGeometry args={[0.18, 0.18, 1, 32]} />
                <meshPhysicalMaterial ref={liquidRef} color="#fef08a" transmission={0.9} opacity={0.9} transparent roughness={0.1} ior={1.33} />
            </mesh>
            <Sphere args={[0.18, 32, 16, 0, Math.PI*2, 0, Math.PI/2]} position={[0, -1, 0]} rotation={[Math.PI, 0, 0]}>
                <meshPhysicalMaterial color={targetColor} transmission={0.9} opacity={0.9} transparent roughness={0.1} ior={1.33} />
            </Sphere>

            {/* Droplets when animating */}
            {isAnim && testId !== 'ph' && (
                <group position={[0, 1.5, 0]}>
                    <ReagentDropper color={testId==='glucose' ? '#3b82f6' : testId==='ketones' ? '#f43f5e' : '#ffffff'} />
                </group>
            )}

            {/* Bile Salts Sulfur Particles */}
            {testId === 'bile' && (isDone || isAnim) && (
                <group ref={particlesRef} position={[0, 0, 0]}>
                     {[...Array(40)].map((_, i) => (
                         <Sphere key={i} args={[0.015, 8, 8]} position={[(Math.random()-0.5)*0.3, 1, (Math.random()-0.5)*0.3]}>
                              <meshStandardMaterial color="#fcd34d" roughness={1} />
                         </Sphere>
                     ))}
                </group>
            )}

            {/* Ketones Purple Ring Interface Layer */}
            {testId === 'ketones' && (
                <mesh position={[0, 0, 0]}>
                    <cylinderGeometry args={[0.181, 0.181, 0.05, 32]} />
                    <meshPhysicalMaterial ref={ringRef} color="#9333ea" transmission={0.2} transparent opacity={0} roughness={0} />
                </mesh>
            )}
        </group>
    );
};

const ReagentDropper = ({ color }: { color: string }) => {
    const meshRef = useRef<THREE.Mesh>(null);
    useFrame((state) => {
        if(meshRef.current) {
            const t = (state.clock.elapsedTime * 3) % 1;
            meshRef.current.position.y = - (t * 2);
            meshRef.current.scale.setScalar(1 - (t * 0.5));
            meshRef.current.visible = t < 0.9;
        }
    });

    return (
        <group>
             <Cylinder args={[0.05, 0.05, 0.5, 16]} position={[0, 0.25, 0]}><meshPhysicalMaterial color="#ffffff" transmission={0.9} /></Cylinder>
             <mesh ref={meshRef} position={[0, -0.2, 0]}>
                  <sphereGeometry args={[0.04, 16, 16]} />
                  <meshPhysicalMaterial color={color} transmission={0.5} />
             </mesh>
        </group>
    );
}

const PHStrip = () => {
    const stripRef = useRef<THREE.Group>(null);
    useFrame((state) => {
         if (stripRef.current) {
              stripRef.current.position.y = THREE.MathUtils.lerp(stripRef.current.position.y, -0.2, 0.05);
         }
    });
    return (
         <group ref={stripRef} position={[1.6, 2.5, 0]}> {/* Position 4 corresponds to index 4 (pH) */}
             <RoundedBox args={[0.1, 1, 0.01]}><meshStandardMaterial color="#ffffff" /></RoundedBox>
             <RoundedBox args={[0.1, 0.1, 0.012]} position={[0, -0.4, 0]}><meshStandardMaterial color="#f59e0b" /></RoundedBox>
             <RoundedBox args={[0.1, 0.1, 0.012]} position={[0, -0.25, 0]}><meshStandardMaterial color="#84cc16" /></RoundedBox>
             <RoundedBox args={[0.1, 0.1, 0.012]} position={[0, -0.1, 0]}><meshStandardMaterial color="#10b981" /></RoundedBox>
         </group>
    )
}

const UrineAnalysisLab: React.FC<Props> = ({ hex }) => {
  const [sampleType, setSampleType] = useState<'normal' | 'diabetic' | 'kidney' | 'ketosis'>('normal');
  const [selectedTest, setSelectedTest] = useState<string | null>(null);
  const [testDone, setTestDone] = useState<Record<string, boolean>>({});
  const [animating, setAnimating] = useState(false);

  const sample = SAMPLE_CONFIGS[sampleType];

  const runTest = (testId: string) => {
    setSelectedTest(testId);
    setAnimating(true);
    setTimeout(() => {
      setTestDone(prev => ({ ...prev, [testId]: true }));
      setAnimating(false);
    }, 2000);
  };

  const getUrinalysisSummary = () => {
      if (sampleType === 'normal') return "Healthy urine sample containing nitrogenous waste but free of macroscopic metabolic anomalies.";
      if (sampleType === 'diabetic') return "Significant glucosuria detected. The presence of ketones indicates fat metabolism due to cellular glucose starvation.";
      if (sampleType === 'kidney') return "Proteinuria clearly observed. Nephron glomerular damage is allowing large plasma proteins to leak into the filtrate.";
      return "Strong ketonuria observed without glucose. Likely caused by a ketogenic diet, extreme starvation, or excessive exercise.";
  };

  return (
    <div className="flex flex-col md:flex-row h-full w-full bg-[#050505] overflow-hidden text-slate-200 select-none">
      
      {/* 3D Visualization */}
      <div className="flex-1 flex flex-col relative rounded-2xl overflow-hidden m-4 border border-white/10 shadow-[0_0_50px_rgba(234,179,8,0.05)]">
        <div className="absolute inset-x-0 top-0 p-4 bg-gradient-to-b from-black/80 to-transparent z-10 flex justify-between items-start pointer-events-none">
            <div>
                <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400"><Droplets size={18} /></span>
                    Clinical Urinalysis
                </h2>
                <p className="text-[11px] font-medium text-slate-400 uppercase tracking-widest mt-1">Chemical Reagent Diagnostics</p>
            </div>
            {/* Status chip */}
            <div className={`backdrop-blur-md px-3 py-1.5 rounded-xl border text-[10px] font-bold uppercase tracking-widest shadow-inner transition-colors ${animating ? 'bg-amber-500/20 border-amber-500/40 text-amber-400 animate-pulse' : 'bg-black/40 border-white/10 text-slate-300'}`}>
               {animating ? 'Reaction Occurring...' : `Sample: ${sampleType.toUpperCase()}`}
            </div>
        </div>

        <Canvas camera={{ position: [0, 3, 7], fov: 40 }}>
            {/* Professional studio lighting suitable for clinical setups */}
            <Environment preset="city" />
            <UrineScene sampleType={sampleType} testDone={testDone} animating={animating} selectedTest={selectedTest} />
            <ContactShadows position={[0, -1.05, 0]} opacity={0.6} scale={15} blur={2.5} far={4} color="#000" />
            <OrbitControls enablePan={true} enableZoom={true} maxPolarAngle={Math.PI / 2 + 0.1} minPolarAngle={0.2} />
        </Canvas>

        {/* Dynamic Context Panel */}
        <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-black/60 backdrop-blur-xl border border-white/10 shadow-2xl">
            <h3 className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1 flex items-center gap-2"><Activity size={12} /> Diagnosis Notes</h3>
            <p className="font-medium text-sm text-slate-200 leading-relaxed">{getUrinalysisSummary()}</p>
        </div>
      </div>

      {/* Control Panel */}
      <div className="w-full md:w-[320px] shrink-0 bg-[#0a0a0a] border-l border-white/10 flex flex-col z-20 shadow-[-10px_0_30px_rgba(0,0,0,0.5)]">
        <div className="p-6 border-b border-white/5">
          <p className="text-xs font-bold uppercase tracking-widest text-amber-500 mb-2 border-b border-amber-500/20 inline-block pb-1">Biology Lab — b12</p>
          <h2 className="text-xl font-bold text-white tracking-tight">Urine Analysis</h2>
        </div>
        
        <div className="flex-1 p-6 space-y-6 overflow-y-auto custom-scrollbar">
          
          <div>
            <h3 className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mb-3">1. Select Patient Sample</h3>
            <div className="grid grid-cols-2 gap-2">
              {(['normal','diabetic','kidney','ketosis'] as const).map(s => (
                <button key={s} onClick={() => { setSampleType(s); setTestDone({}); setSelectedTest(null); }}
                  className={`py-3 rounded-xl text-xs font-bold capitalize transition-all shadow-inner border ${sampleType === s ? 'text-white border-amber-500/50 bg-amber-900/30' : 'bg-[#111] text-slate-400 border-white/5 hover:bg-white/5'}`}
                  style={sampleType === s ? { boxShadow: `0 0 15px rgba(245, 158, 11, 0.1)` } : {}}>
                  <div className="flex items-center justify-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${s === 'normal' ? 'bg-green-500' : s === 'diabetic' ? 'bg-red-500' : s === 'kidney' ? 'bg-yellow-500' : 'bg-orange-500'}`} />
                      {s}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-[10px] text-slate-500 uppercase font-bold mb-3 tracking-widest">2. Run Chemical Diagnostics</h3>
            <div className="space-y-2.5">
              {TESTS.map(test => {
                const isAbnormal = sample[test.id as keyof typeof sample] === true || (test.id === 'ph' && (sample.ph < 4.5 || sample.ph > 8));
                const done2 = testDone[test.id];
                const bgC = done2 ? (isAbnormal ? 'bg-red-900/20 border-red-500/40' : 'bg-green-900/20 border-green-500/40') : 'bg-[#111] border-white/5 hover:border-white/20';

                return (
                  <button key={test.id} onClick={() => !done2 && !animating && runTest(test.id)} disabled={animating || done2}
                    className={`w-full p-3 rounded-xl text-left text-xs transition-all border shadow-inner ${bgC} disabled:opacity-80`}>
                    
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-[13px]" style={{ color: done2 ? (isAbnormal ? '#f87171' : '#4ade80') : '#cbd5e1' }}>{test.name} Test</span>
                      <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded ${done2 ? (isAbnormal ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400') : 'bg-white/10 text-slate-400'}`}>
                          {done2 ? (isAbnormal ? 'ABNORMAL' : 'NORMAL') : animating && selectedTest === test.id ? 'TESTING...' : 'RUN'}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-end mt-2">
                        <span className="text-[10px] font-medium text-slate-500"><span className="opacity-70">Reagent:</span> {test.reagent}</span>
                        {done2 && <span className="text-[10px] font-bold text-slate-300">{isAbnormal ? test.abnormal : test.normal}</span>}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <button onClick={() => { setTestDone({}); setSampleType('normal'); setSelectedTest(null); }}
            className="w-full py-4 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs flex items-center justify-center gap-2 hover:bg-red-900/30 hover:text-red-400 transition-colors shadow-inner mt-4">
            <RotateCcw size={16} /> Discard Samples & Reset
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default UrineAnalysisLab;
