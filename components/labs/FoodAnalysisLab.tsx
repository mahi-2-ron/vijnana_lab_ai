import React, { useRef, useEffect, useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Html, Text } from '@react-three/drei';
import * as THREE from 'three';

interface Props { hex: string; }

type FoodSample = {
  id: string; name: string; color: string;
  tests: { reagent: string; result: string; color: string; positive: boolean; }[];
};

const FOOD_SAMPLES: FoodSample[] = [
  {
    id: 'bread', name: '🍞 Bread (Starch)', color: '#d4a04a',
    tests: [
      { reagent: 'Iodine', result: 'Blue-black color → Starch present ✓', color: '#1e1b4b', positive: true },
      { reagent: 'Biuret', result: 'Light blue — no significant protein', color: '#bfdbfe', positive: false },
      { reagent: 'Sudan III', result: 'No orange color — no fat', color: '#fef08a', positive: false },
    ]
  },
  {
    id: 'milk', name: '🥛 Milk (Protein/Fat)', color: '#f8fafc',
    tests: [
      { reagent: 'Biuret', result: 'Violet color → Protein (casein) present ✓', color: '#9333ea', positive: true },
      { reagent: 'Sudan III', result: 'Orange/red → Fat (emulsion) present ✓', color: '#ea580c', positive: true },
      { reagent: 'Fehling\'s', result: 'Brick red → Reducing sugar (lactose) ✓', color: '#b91c1c', positive: true },
    ]
  },
  {
    id: 'oil', name: '🫙 Oil (Fat)', color: '#fde047',
    tests: [
      { reagent: 'Sudan III', result: 'Bright orange → Fat/lipid present ✓', color: '#ea580c', positive: true },
      { reagent: 'Biuret', result: 'No violet — no protein', color: '#bfdbfe', positive: false },
      { reagent: 'Iodine', result: 'No blue-black — no starch', color: '#fef08a', positive: false },
    ]
  },
  {
    id: 'glucose', name: '🍬 Glucose (Sugar)', color: '#fef9c3',
    tests: [
      { reagent: 'Fehling\'s', result: 'Brick-red ppt → Reducing sugar ✓', color: '#b91c1c', positive: true },
      { reagent: 'Biuret', result: 'No violet — no protein', color: '#bfdbfe', positive: false },
      { reagent: 'Iodine', result: 'Amber — no starch', color: '#fcd34d', positive: false },
    ]
  },
];

const glassMat = <meshPhysicalMaterial transmission={0.9} thickness={0.1} roughness={0} ior={1.4} color="#e0f2fe" transparent opacity={0.6} side={THREE.DoubleSide} />;

const TestTube = ({ position, sampleColor, test, isActive, progress, isDone }: any) => {
  const dropRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (dropRef.current && isActive && progress < 0.6) {
      dropRef.current.position.y = 1.2 - ((progress/0.6) * 1.5);
    }
  });

  const liquidColor = isDone ? test.color : new THREE.Color(sampleColor).lerp(new THREE.Color(test.color), isActive ? (progress > 0.5 ? (progress-0.5)*2 : 0) : 0).getStyle();
  
  return (
    <group position={position}>
       {/* Glass Tube */}
       <mesh position={[0, 0, 0]}>
         <cylinderGeometry args={[0.2, 0.2, 2, 32, 1, true]} />
         {glassMat}
       </mesh>
       <mesh position={[0, -1, 0]}>
         <sphereGeometry args={[0.2, 32, 16, 0, Math.PI*2, Math.PI/2, Math.PI/2]} />
         {glassMat}
       </mesh>
       
       {/* Reagent Dropper (appears only when active) */}
       {isActive && progress < 0.8 && (
         <group position={[0, 1.5, 0]}>
            <mesh><cylinderGeometry args={[0.08, 0.02, 0.5]} />{glassMat}</mesh>
            <mesh position={[0, 0.3, 0]}><sphereGeometry args={[0.15]} /><meshBasicMaterial color="#ef4444" /></mesh>
            {/* Droplet */}
            <mesh ref={dropRef} position={[0, -0.3, 0]}>
              <sphereGeometry args={[0.04]} />
              <meshBasicMaterial color={test.color} />
            </mesh>
         </group>
       )}

       {/* Liquid Volume */}
       {/* Base liquid is sample, fills up slightly when reagent added, changes color */}
       <mesh position={[0, -0.5 + (isActive || isDone ? 0.2 : 0), 0]}>
         <cylinderGeometry args={[0.18, 0.18, 1 + (isActive || isDone ? 0.4 : 0), 32]} />
         <meshPhysicalMaterial transmission={0.6} roughness={0.1} color={liquidColor} />
       </mesh>
       <mesh position={[0, -1 + (isActive || isDone ? 0.2 : 0) - (0.5 + (isActive || isDone ? 0.2 : 0)), 0]}>
          <sphereGeometry args={[0.18, 32, 16, 0, Math.PI*2, Math.PI/2, Math.PI/2]} />
          <meshPhysicalMaterial transmission={0.6} roughness={0.1} color={liquidColor} />
       </mesh>

       {/* Reagent Label */}
       <Html position={[0, -1.8, 0]} center>
         <div className={`text-[10px] font-bold px-1.5 py-0.5 rounded backdrop-blur ${isActive ? 'bg-blue-500/80 text-white' : 'bg-black/60 text-slate-300'}`}>
           {test.reagent}
         </div>
       </Html>

       {/* Floating Result Badge */}
       {isDone && (
         <Html position={[0.4, 0.5, 0]} center zIndexRange={[100,0]}>
           <div className={`flex items-center justify-center w-6 h-6 rounded-full shadow-lg text-white font-bold text-xs ${test.positive ? 'bg-green-500 shadow-green-500/50' : 'bg-red-500 shadow-red-500/50'}`}>
             {test.positive ? '✓' : '×'}
           </div>
         </Html>
       )}
    </group>
  );
};

const RackScene = ({ sample, selectedTest, progress, testedIndices }: any) => {
  return (
    <group position={[0, -0.5, 0]}>
       {/* Wooden Rack */}
       <mesh position={[0, -0.5, 0]} receiveShadow castShadow>
          <boxGeometry args={[3.5, 0.2, 1]} />
          <meshStandardMaterial color="#78350f" roughness={0.9} />
       </mesh>
       <mesh position={[-1.6, 0.5, 0]} receiveShadow castShadow>
          <boxGeometry args={[0.2, 2, 1]} />
          <meshStandardMaterial color="#78350f" roughness={0.9} />
       </mesh>
       <mesh position={[1.6, 0.5, 0]} receiveShadow castShadow>
          <boxGeometry args={[0.2, 2, 1]} />
          <meshStandardMaterial color="#78350f" roughness={0.9} />
       </mesh>
       <mesh position={[0, 1.4, 0]} receiveShadow castShadow>
          <boxGeometry args={[3.5, 0.1, 1]} />
          <meshStandardMaterial color="#78350f" roughness={0.9} />
       </mesh>

       {/* 3 Test Tubes based on the 3 tests of the sample */}
       {sample.tests.map((test: any, i: number) => {
         const isActive = selectedTest === i;
         const isDone = testedIndices.includes(i) && !isActive;
         return (
           <TestTube 
             key={i} 
             position={[-1 + i * 1, 0.6, 0]} 
             sampleColor={sample.color}
             test={test}
             isActive={isActive}
             progress={progress}
             isDone={isDone}
           />
         )
       })}

       <Text position={[0, -0.4, 0.51]} fontSize={0.15} color="#fbbf24" anchorX="center" anchorY="middle" material-toneMapped={false}>
          {sample.name.toUpperCase()}
       </Text>
    </group>
  );
};

const FoodAnalysisLab: React.FC<Props> = ({ hex }) => {
  const [selectedSample, setSelectedSample] = useState(FOOD_SAMPLES[0]);
  const [selectedTest, setSelectedTest] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [testedIndices, setTestedIndices] = useState<number[]>([]);

  const runTest = (idx: number) => {
    setSelectedTest(idx);
    setProgress(0);
    const iv = setInterval(() => {
      setProgress(p => {
        if (p >= 1) { clearInterval(iv); return 1; }
        return p + 0.02; // Roughly 2.5s animation
      });
    }, 50);
    if (!testedIndices.includes(idx)) setTestedIndices(prev => [...prev, idx]);
  };

  return (
    <div className="flex flex-col md:flex-row h-full w-full bg-slate-950">
      <div className="flex-1 relative rounded-2xl overflow-hidden m-4 border border-white/10 shadow-2xl">
        <Canvas camera={{ position: [0, 2, 6], fov: 50 }}>
          <Environment preset="apartment" />
          <ambientLight intensity={0.6} />
          <pointLight position={[5, 10, 5]} intensity={1.5} color="#fca5a5" />
          <pointLight position={[-5, 2, 5]} intensity={0.5} color="#93c5fd" />
          
          <RackScene 
            sample={selectedSample} 
            selectedTest={selectedTest} 
            progress={progress} 
            testedIndices={testedIndices} 
          />
          
          <ContactShadows position={[0, -1.2, 0]} opacity={0.6} scale={10} blur={2} far={4} color="#000" />
          <OrbitControls enablePan={true} enableZoom={true} target={[0, 0, 0]} maxPolarAngle={Math.PI/2 - 0.05}/>
        </Canvas>

        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3 shadow-xl max-w-xs">
          <p className="text-[10px] font-bold uppercase tracking-widest text-amber-400 mb-1">Chemistry Lab — c13</p>
          <p className="text-white font-bold text-sm">3D Food Chemical Analysis</p>
          <p className="text-xs text-slate-400 mt-1">Select a food sample and drip specific reagents to observe chemical color changes indicative of macro-nutrients.</p>
        </div>

        {/* Floating results UI for active test */}
        {selectedTest !== null && progress > 0.8 && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-md rounded-2xl p-4 border shadow-2xl flex flex-col items-center min-w-[280px] animate-in fade-in slide-in-from-bottom-4" style={{ borderColor: selectedSample.tests[selectedTest].positive ? '#22c55e' : '#ef4444' }}>
             <p className={`font-bold text-sm ${selectedSample.tests[selectedTest].positive ? 'text-green-400' : 'text-red-400'}`}>
                {selectedSample.tests[selectedTest].reagent} Test: {selectedSample.tests[selectedTest].positive ? 'Positive' : 'Negative'}
             </p>
             <p className="text-white text-xs mt-1 text-center">{selectedSample.tests[selectedTest].result}</p>
          </div>
        )}
      </div>

      <div className="w-full md:w-80 bg-slate-900 border-l border-white/5 flex flex-col z-10">
        <div className="p-5 border-b border-white/5">
           <h2 className="text-lg font-black text-white">Analysis Controls</h2>
        </div>
        <div className="flex-1 p-5 space-y-5 overflow-y-auto">
          
          <div>
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-2">1. Select Food Sample</p>
            <div className="grid grid-cols-2 gap-2">
              {FOOD_SAMPLES.map(s => (
                <button key={s.id} onClick={() => { setSelectedSample(s); setSelectedTest(null); setTestedIndices([]); setProgress(0); }}
                  className={`p-3 rounded-xl text-xs font-bold transition-all border ${selectedSample.id === s.id ? 'border-amber-400 bg-amber-400/20 text-amber-300 shadow-[0_0_15px_rgba(251,191,36,0.15)]' : 'border-white/10 bg-white/5 text-slate-400 hover:border-amber-400/50 hover:bg-white/10'}`}>
                  {s.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-2 border-t border-white/5 pt-4">2. Administer Reagent Tests</p>
            <div className="space-y-2">
              {selectedSample.tests.map((test, i) => {
                const isTesting = selectedTest === i && progress < 1;
                const isDone = testedIndices.includes(i) && !isTesting;
                return (
                  <button key={i} onClick={() => runTest(i)} disabled={isTesting}
                    className={`w-full p-3 rounded-xl text-left transition-all border relative overflow-hidden group ${isDone ? `border-${test.positive ? 'green' : 'red'}-500/50 bg-${test.positive ? 'green' : 'red'}-900/20` : isTesting ? 'border-blue-500 bg-blue-900/30' : 'border-white/10 bg-black/40 hover:bg-white/10 hover:border-white/20'}`}>
                    
                    {isTesting && (
                      <div className="absolute top-0 left-0 h-full bg-blue-500/20" style={{ width: `${progress * 100}%` }} />
                    )}

                    <div className="flex justify-between items-center relative z-10">
                      <span className={`font-bold text-sm ${isTesting ? 'text-blue-300' : 'text-white'}`}>{test.reagent} Reagent</span>
                      {isDone && <span className={`text-xs font-bold px-2 py-1 rounded bg-black/40 ${test.positive ? 'text-green-400' : 'text-red-400'}`}>{test.positive ? '✓ Pos' : '✗ Neg'}</span>}
                      {isTesting && <span className="text-xs font-bold text-blue-400 animate-pulse">Testing...</span>}
                      {!isDone && !isTesting && <span className="text-[10px] text-slate-500 bg-white/10 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">Run Test →</span>}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
          
          {(testedIndices.length > 0 || selectedTest !== null) && (
            <button onClick={() => { setSelectedTest(null); setTestedIndices([]); setProgress(0); }}
              className="w-full py-3 rounded-xl text-sm font-bold bg-slate-800 text-slate-300 hover:text-red-400 hover:bg-red-900/20 transition-all flex items-center justify-center gap-2 mt-4">
              <RotateCcw size={14} /> Clear Test Rack
            </button>
          )}

        </div>
      </div>
    </div>
  );
};

export default FoodAnalysisLab;
