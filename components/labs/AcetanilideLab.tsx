import React, { useRef, useEffect, useState } from 'react';
import { RotateCcw, CheckCircle } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Html } from '@react-three/drei';
import * as THREE from 'three';

interface Props { hex: string; }

const STAGES = [
  {
    name: 'Add Aniline + Acetic Anhydride',
    desc: 'Measure 2 mL aniline in RB flask. Add 3 mL acetic anhydride dropwise. An exothermic reaction begins immediately.',
    color: '#f59e0b',
  },
  {
    name: 'Heat & Reflux',
    desc: 'Heat mixture to 160°C for 30 minutes. Acetic acid distills off as vapors. Reaction completes.',
    color: '#ef4444',
  },
  {
    name: 'Pour into Ice Water',
    desc: 'Pour the hot mixture into 200 mL ice-cold water. Crude acetanilide precipitates as a white solid.',
    color: '#60a5fa',
  },
  {
    name: 'Filter & Recrystallize',
    desc: 'Filter under suction using Buchner funnel. Recrystallize from hot water to form pure white crystals.',
    color: '#10b981',
  }
];

const glassMat = <meshPhysicalMaterial transmission={0.9} thickness={0.1} roughness={0} ior={1.4} color="#e0f2fe" transparent opacity={0.6} side={THREE.DoubleSide} />;

const RoundBottomFlask = ({ liquidColor, progress, showCondenser = false, heating = false }: any) => {
  return (
    <group position={[0, -0.5, 0]}>
      {/* RB Flask glass */}
      <mesh position={[0, 0, 0]}>
         <sphereGeometry args={[1, 32, 16]} />
         {glassMat}
      </mesh>
      <mesh position={[0, 1.3, 0]}>
         <cylinderGeometry args={[0.3, 0.3, 1.2, 16, 1, true]} />
         {glassMat}
      </mesh>
      
      {/* Liquid inside */}
      <mesh position={[0, -0.2, 0]}>
         <sphereGeometry args={[0.95, 32, 16, 0, Math.PI*2, Math.PI/2, Math.PI/2]} />
         <meshPhysicalMaterial transmission={0.6} roughness={0.1} color={liquidColor} />
      </mesh>

      {/* Condenser Tube above neck */}
      {showCondenser && (
        <group position={[0, 3, 0]}>
           <mesh><cylinderGeometry args={[0.2, 0.2, 2.5, 16, 1, true]} />{glassMat}</mesh>
           <mesh><cylinderGeometry args={[0.5, 0.5, 2, 16, 1, true]} />{glassMat}</mesh>
           {/* Water cooling ports */}
           <mesh position={[0.5, -0.6, 0]} rotation={[0,0,Math.PI/2]}><cylinderGeometry args={[0.1, 0.1, 0.5, 8]} />{glassMat}</mesh>
           <mesh position={[-0.5, 0.6, 0]} rotation={[0,0,Math.PI/2]}><cylinderGeometry args={[0.1, 0.1, 0.5, 8]} />{glassMat}</mesh>
           
           {heating && (
             <Html position={[0.8, 0, 0]} center>
                <div className="text-[9px] text-blue-300 font-bold bg-black/60 px-1 rounded backdrop-blur">Reflux</div>
             </Html>
           )}
        </group>
      )}
    </group>
  );
};

const MixingScene = ({ progress }: { progress: number }) => {
  const dropRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (dropRef.current && progress < 1) {
       dropRef.current.position.y = 2 - (clock.elapsedTime * 3) % 2;
    }
  });

  return (
    <group>
       {/* Dropping Funnel */}
       <group position={[0, 2.5, 0]}>
         <mesh position={[0, 1, 0]}><cylinderGeometry args={[0.5, 0.5, 1, 16, 1, true]} />{glassMat}</mesh>
         <mesh position={[0, 0.25, 0]}><cylinderGeometry args={[0.1, 0.5, 0.5, 16, 1, true]} />{glassMat}</mesh>
         <mesh position={[0, -0.5, 0]}><cylinderGeometry args={[0.05, 0.05, 1, 16]} />{glassMat}</mesh>
         {/* Drop */}
         {progress < 1 && <mesh ref={dropRef} position={[0, 0, 0]}><sphereGeometry args={[0.08, 8, 8]}/><meshBasicMaterial color="#fef08a"/></mesh>}
       </group>
       
       <RoundBottomFlask 
         liquidColor={new THREE.Color().lerpColors(new THREE.Color("#475569"), new THREE.Color("#f59e0b"), progress)}
         progress={progress}
       />
    </group>
  );
};

const RefluxScene = ({ progress }: { progress: number }) => {
  const bubblesRef = useRef<THREE.Group>(null);
  const flameRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (flameRef.current) {
      flameRef.current.scale.y = 1 + Math.sin(clock.elapsedTime * 20) * 0.1;
      flameRef.current.scale.x = 1 + Math.sin(clock.elapsedTime * 25) * 0.05;
    }
    if (bubblesRef.current) {
      bubblesRef.current.children.forEach(mesh => {
         mesh.position.y += 0.05;
         if(mesh.position.y > 0) {
            mesh.position.y = -0.8;
            mesh.position.x = (Math.random()-0.5)*1.5;
         }
      })
    }
  });

  return (
    <group>
       <RoundBottomFlask liquidColor="#b45309" progress={progress} showCondenser={true} heating={true} />
       
       <group ref={bubblesRef}>
         {Array.from({length: 10}).map((_, i) => (
           <mesh key={i} position={[(Math.random()-0.5)*1.5, -0.8, (Math.random()-0.5)*1.5]}><sphereGeometry args={[0.05]} /><meshBasicMaterial color="#fcd34d"/></mesh>
         ))}
       </group>

       {/* Heat Source */}
       <group position={[0, -2, 0]}>
         <mesh><cylinderGeometry args={[0.6, 0.7, 0.5, 16]} /><meshStandardMaterial color="#334155"/></mesh>
         <mesh ref={flameRef} position={[0, 0.6, 0]}><coneGeometry args={[0.4, 0.8, 16]} /><meshBasicMaterial color="#ef4444" transparent opacity={0.8}/></mesh>
       </group>
    </group>
  );
};

const IceWaterScene = ({ progress }: { progress: number }) => {
  const crystalCount = Math.floor(progress * 150);
  return (
    <group position={[0, -1, 0]}>
       {/* Beaker */}
       <mesh><cylinderGeometry args={[1.5, 1.5, 2.5, 32, 1, true]} />{glassMat}</mesh>
       <mesh position={[0, -1.25, 0]}><cylinderGeometry args={[1.5, 1.5, 0.1, 32]} />{glassMat}</mesh>

       {/* Ice Water liquid */}
       <mesh position={[0, -0.2, 0]}>
         <cylinderGeometry args={[1.45, 1.45, 2, 32]} />
         <meshPhysicalMaterial transmission={0.9} color="#bae6fd" roughness={0.1} />
       </mesh>

       {/* Ice Cubes floating */}
       {Array.from({length: 8}).map((_, i) => (
         <mesh key={i} position={[Math.cos(i)*0.8, 0.8, Math.sin(i)*0.8]} rotation={[Math.random(), Math.random(), 0]}>
           <boxGeometry args={[0.4, 0.4, 0.4]} />
           <meshPhysicalMaterial transmission={0.9} color="#e0f2fe" roughness={0.2} ior={1.3} />
         </mesh>
       ))}

       {/* Precipitate forming */}
       {Array.from({length: crystalCount}).map((_, i) => (
         <mesh key={i} position={[(Math.random()-0.5)*2, -1 + Math.random()*2, (Math.random()-0.5)*2]}>
           <sphereGeometry args={[0.04]} />
           <meshBasicMaterial color="#f8fafc" />
         </mesh>
       ))}
    </group>
  );
};

const BuchnerScene = ({ progress }: { progress: number }) => {
  return (
    <group position={[0, -1, 0]}>
      {/* Filtering Flask */}
      <mesh position={[0, 0, 0]}><cylinderGeometry args={[0.5, 1.5, 2, 32, 1, true]} />{glassMat}</mesh>
      {/* Side arm */}
      <mesh position={[0.6, 0.5, 0]} rotation={[0, 0, Math.PI/2]}><cylinderGeometry args={[0.08, 0.08, 0.6, 16, 1, true]} />{glassMat}</mesh>

      {/* Buchner Funnel (Ceramic) */}
      <group position={[0, 1.6, 0]}>
         <mesh position={[0, 0.8, 0]}><cylinderGeometry args={[0.8, 0.8, 0.8, 32]} /><meshStandardMaterial color="#f8fafc" roughness={1} /></mesh>
         <mesh position={[0, 0.4, 0]}><cylinderGeometry args={[0.8, 0.2, 0.4, 32]} /><meshStandardMaterial color="#f8fafc" roughness={1} /></mesh>
         <mesh position={[0, -0.2, 0]}><cylinderGeometry args={[0.2, 0.2, 0.8, 16]} /><meshStandardMaterial color="#f8fafc" roughness={1} /></mesh>
         
         {/* Filter paper & pure crystals */}
         <mesh position={[0, 0.45, 0]}><cylinderGeometry args={[0.75, 0.75, 0.02, 32]} /><meshBasicMaterial color="#e2e8f0" /></mesh>
         
         {Array.from({length: Math.floor(progress * 150)}).map((_, i) => (
           <mesh key={i} position={[(Math.random()-0.5)*1.2, 0.48 + Math.random()*0.1, (Math.random()-0.5)*1.2]} rotation={[Math.random()*Math.PI, 0, 0]}>
              <boxGeometry args={[0.03, 0.08, 0.03]} />
              <meshBasicMaterial color="#ffffff" />
           </mesh>
         ))}
      </group>
    </group>
  );
};


const AcetanilideLab: React.FC<Props> = ({ hex }) => {
  const [stage, setStage] = useState(0);
  const [progress, setProgress] = useState(0);
  const [running, setRunning] = useState(false);
  const [completed, setCompleted] = useState(false);

  const currentStage = STAGES[stage];

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setProgress(p => {
        if (p >= 1) { clearInterval(id); setRunning(false); return 1; }
        return p + 0.01;
      });
    }, 50);
    return () => clearInterval(id);
  }, [running]);

  const nextStage = () => {
    if (stage < STAGES.length - 1) { setStage(s => s + 1); setProgress(0); setRunning(false); }
    else setCompleted(true);
  };

  return (
    <div className="flex flex-col md:flex-row h-full w-full bg-slate-950">
      <div className="flex-1 relative rounded-2xl overflow-hidden m-4 border border-white/10 shadow-2xl">
        <Canvas camera={{ position: [0, 2, 7], fov: 55 }}>
          <Environment preset="apartment" />
          <ambientLight intensity={0.6} />
          <pointLight position={[5, 10, 5]} intensity={1.5} color={currentStage.color} />
          
          {stage === 0 && <MixingScene progress={progress} />}
          {stage === 1 && <RefluxScene progress={progress} />}
          {stage === 2 && <IceWaterScene progress={progress} />}
          {stage === 3 && <BuchnerScene progress={progress} />}
          
          <ContactShadows position={[0, -2.5, 0]} opacity={0.5} scale={10} blur={2.5} far={4} color="#000" />
          <OrbitControls enablePan={true} enableZoom={true} target={[0, 0, 0]} maxPolarAngle={Math.PI/2}/>
        </Canvas>

        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3 shadow-xl max-w-xs">
          <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: currentStage.color }}>Chemistry Lab — c14</p>
          <p className="text-white font-bold text-sm">3D Acetanilide Synthesis</p>
        </div>

        <div className="absolute bottom-4 left-0 w-full px-8 flex justify-center">
            <div className="bg-black/50 backdrop-blur-md p-1.5 rounded-2xl border border-white/10 flex gap-1 shadow-2xl">
               {STAGES.map((st, i) => (
                 <div key={i} className="h-2 rounded-full transition-all duration-300" style={{
                   width: 50, backgroundColor: i < stage ? st.color : i === stage ? `${st.color}80` : 'rgba(255,255,255,0.1)'
                 }} />
               ))}
            </div>
        </div>
      </div>

      <div className="w-full md:w-72 bg-slate-900 border-l border-white/5 flex flex-col z-10">
        <div className="p-5 border-b border-white/5">
           <h2 className="text-lg font-black text-white">Procedure</h2>
        </div>
        <div className="flex-1 p-5 space-y-4 overflow-y-auto">
          {completed ? (
            <div className="text-center py-6">
              <CheckCircle size={56} className="mx-auto text-green-400 mb-4 drop-shadow-[0_0_15px_rgba(74,222,128,0.5)]" />
              <h3 className="text-xl font-bold text-white mb-2">Acetanilide Prepared!</h3>
              <p className="text-slate-400 text-sm mb-6">White crystalline solid representing pure Acetanilide confirmed.</p>
              <button onClick={() => { setStage(0); setProgress(0); setCompleted(false); }}
                className="w-full py-3 rounded-xl bg-slate-800 text-white font-bold hover:bg-slate-700 transition-all flex justify-center items-center gap-2">
                <RotateCcw size={16} /> Repeat Synthesis
              </button>
            </div>
          ) : (
            <>
              <div className="p-3 rounded-xl border shadow-inner transition-colors duration-500" style={{ backgroundColor: `${currentStage.color}15`, borderColor: `${currentStage.color}40` }}>
                <p className="font-bold text-xs mb-1" style={{ color: currentStage.color }}>Step {stage + 1}: {currentStage.name}</p>
                <p className="text-slate-300 text-xs leading-relaxed">{currentStage.desc}</p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-white/5 shadow-inner text-xs space-y-1.5 mt-2">
                <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-1 border-b border-white/5 pb-1">Chemical Reaction</p>
                <p className="font-mono text-[10px] text-yellow-400 pt-1">C₆H₅NH₂ + (CH₃CO)₂O</p>
                <p className="font-mono text-[10px] text-green-400">↓ Heat</p>
                <p className="font-mono text-[10px] text-green-400">C₆H₅NHCOCH₃ + CH₃COOH</p>
              </div>

              <div className="flex gap-2 pt-2">
                <button onClick={() => setRunning(r => !r)} disabled={progress >= 1}
                  className="flex-1 py-3 rounded-xl text-sm font-bold text-white transition-all shadow-lg active:scale-95 disabled:opacity-50"
                  style={{ backgroundColor: (running || progress >= 1) ? '#475569' : currentStage.color }}>
                  {running ? '⏸ Paused' : (progress === 0 ? '▶️ Run Step' : '▶️ Resume')}
                </button>
                <button onClick={() => { setProgress(0); setRunning(false); }}
                  className="px-4 py-3 rounded-xl bg-slate-800 text-red-400 hover:bg-red-900/30 transition-colors">
                  <RotateCcw size={16} />
                </button>
              </div>

              <div className="bg-slate-800/50 rounded-full h-1 mt-2 mb-4 overflow-hidden border border-white/5">
                 <div className="h-full transition-all duration-300" style={{ width: `${progress * 100}%`, backgroundColor: currentStage.color }} />
              </div>

              {progress >= 1 && (
                <button onClick={nextStage}
                  className="w-full py-3 rounded-xl text-sm font-bold text-white transition-all shadow-lg bg-green-600 hover:bg-green-500 shadow-green-600/20 active:scale-95">
                  {stage === STAGES.length - 1 ? '🎉 Finalize' : 'Next Step →'}
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AcetanilideLab;
