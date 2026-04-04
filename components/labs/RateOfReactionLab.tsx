import React, { useRef, useEffect, useState } from 'react';
import { RotateCcw, Play, Pause, Trash2 } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Html } from '@react-three/drei';
import * as THREE from 'three';
import DraggableSlider from './DraggableSlider';

interface Props { hex: string; }
interface Reading { conc: number; temp: number; time: number; rate: number; }

const ReactionScene = ({ cloudOpacity, temp, completed }: any) => {
  const liquidRef = useRef<THREE.Mesh>(null);
  const bubblesRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    // Precipitate color shifting (clear to cloudy yellow)
    if (liquidRef.current) {
      // 0 opacity = completely transparent blueish. 1 opacity = opaque yellow-white sulfur cloud
      const transparentColor = new THREE.Color("#e0f2fe");
      const sulfurColor = new THREE.Color("#fef08a");
      (liquidRef.current.material as THREE.MeshPhysicalMaterial).color.lerpColors(transparentColor, sulfurColor, cloudOpacity);
      (liquidRef.current.material as THREE.MeshPhysicalMaterial).transmission = 0.9 - (cloudOpacity * 0.9);
      (liquidRef.current.material as THREE.MeshPhysicalMaterial).opacity = 0.6 + (cloudOpacity * 0.4);
    }
    
    // Tiny bubbling animation speeding up with temp
    if (bubblesRef.current && cloudOpacity > 0 && cloudOpacity < 1) {
      bubblesRef.current.children.forEach((mesh, i) => {
        mesh.position.y += (temp / 100) * 0.05 + 0.01;
        if (mesh.position.y > 0.8) {
           mesh.position.y = -0.5;
           mesh.position.x = (Math.random() - 0.5) * 1.5;
           mesh.position.z = (Math.random() - 0.5) * 1.5;
        }
      });
    }
  });

  return (
    <group position={[0, -1, 0]}>
      {/* Paper with a black cross underneath */}
      <mesh position={[0, -0.65, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
         <planeGeometry args={[3, 3]} />
         <meshStandardMaterial color="#f8fafc" />
      </mesh>
      {/* The Cross */}
      <mesh position={[0, -0.64, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
         <planeGeometry args={[0.2, 1.5]} />
         <meshBasicMaterial color="#000000" />
      </mesh>
      <mesh position={[0, -0.64, 0]} rotation={[-Math.PI / 2, 0, Math.PI / 2]} receiveShadow>
         <planeGeometry args={[0.2, 1.5]} />
         <meshBasicMaterial color="#000000" />
      </mesh>

      {/* Thermometer sticking into flask sideways */}
      <group position={[1.5, 0.5, 0]} rotation={[0, 0, 0.8]}>
        <mesh><cylinderGeometry args={[0.06, 0.06, 3, 16]} /><meshPhysicalMaterial transmission={0.9} color="#cbd5e1" /></mesh>
        <mesh position={[0, -1.5, 0]}><sphereGeometry args={[0.12, 16, 16]} /><meshBasicMaterial color="#ef4444" /></mesh>
        <mesh position={[0, -1.4 + ((temp/100) * 2.8), 0]}><cylinderGeometry args={[0.02, 0.02, (temp/100)*2.8, 8]} /><meshBasicMaterial color="#ef4444" /></mesh>
      </group>

      {/* Conical Flask */}
      <group position={[0, 0, 0]}>
         {/* Neck */}
         <mesh position={[0, 1.5, 0]}>
           <cylinderGeometry args={[0.4, 0.4, 1, 16, 1, true]} />
           <meshPhysicalMaterial transmission={0.9} thickness={0.1} color="#e0f2fe" transparent opacity={0.6} side={THREE.DoubleSide} />
         </mesh>
         {/* Body */}
         <mesh position={[0, 0.2, 0]}>
           <cylinderGeometry args={[0.4, 1.4, 1.6, 32, 1, true]} />
           <meshPhysicalMaterial transmission={0.9} thickness={0.1} color="#e0f2fe" transparent opacity={0.6} side={THREE.DoubleSide} />
         </mesh>
         {/* Base */}
         <mesh position={[0, -0.6, 0]}>
           <cylinderGeometry args={[1.4, 1.4, 0.05, 32]} />
           <meshPhysicalMaterial transmission={0.9} thickness={0.1} color="#e0f2fe" />
         </mesh>

         {/* Internal Reacting Fluid */}
         <mesh ref={liquidRef} position={[0, -0.1, 0]}>
            <cylinderGeometry args={[0.7, 1.35, 1, 32]} />
            <meshPhysicalMaterial transmission={0.9} thickness={0.5} roughness={0.1} color="#e0f2fe" transparent opacity={0.8} />
         </mesh>
         
         {/* Particles */}
         <group ref={bubblesRef}>
           {Array.from({ length: 20 }).map((_, i) => (
             <mesh key={i} position={[(Math.random()-0.5)*1.5, -0.5 + Math.random(), (Math.random()-0.5)*1.5]}>
               <sphereGeometry args={[0.03, 8, 8]} />
               <meshBasicMaterial color="#fef08a" transparent opacity={0.4} />
             </mesh>
           ))}
         </group>
      </group>

      {/* Helper text instructing to view from above */}
      <Html position={[-2, 1, 0]} center>
         <div className="text-[10px] text-yellow-500/80 font-bold uppercase tracking-widest whitespace-nowrap hidden md:block">
           Orbit Camera Above ⇧
         </div>
      </Html>
    </group>
  );
};

const RateOfReactionLab: React.FC<Props> = ({ hex }) => {
  const [conc, setConc] = useState(0.2); 
  const [temp, setTemp] = useState(25); 
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0); 
  const [cloudOpacity, setCloudOpacity] = useState(0); 
  const [completed, setCompleted] = useState(false);
  const [readings, setReadings] = useState<Reading[]>([]);

  const elapsedRef = useRef(0);

  const R = 8.314;
  const Ea = 40000;
  const A = 3.5;
  const rate = A * conc * Math.exp(-Ea / (R * (temp + 273)));
  const timeUntilCloud = 1 / (rate * 10 + 0.0001);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      elapsedRef.current += 0.1;
      setElapsed(elapsedRef.current);
      const progress = Math.min(1, elapsedRef.current / timeUntilCloud);
      setCloudOpacity(progress);
      if (progress >= 1 && !completed) {
        setCompleted(true);
        setRunning(false);
      }
    }, 100);
    return () => clearInterval(id);
  }, [running, timeUntilCloud, completed]);

  const logReading = () => {
    if (completed) setReadings(prev => [...prev, { conc, temp, time: elapsedRef.current, rate }]);
  };

  const reset = () => {
    setRunning(false); setElapsed(0); setCloudOpacity(0); setCompleted(false);
    elapsedRef.current = 0;
  };

  return (
    <div className="flex flex-col md:flex-row h-full w-full bg-slate-950">
      <div className="flex-1 relative rounded-2xl overflow-hidden m-4 border border-white/10 shadow-2xl">
        <Canvas camera={{ position: [0, 4, 6], fov: 60 }}>
          <Environment preset="apartment" />
          <ambientLight intensity={0.6} />
          <pointLight position={[5, 10, 5]} intensity={1.5} color="#fef08a" />
          <pointLight position={[-5, 0, -5]} intensity={0.5} />
          
          <ReactionScene cloudOpacity={cloudOpacity} temp={temp} completed={completed} />
          
          <ContactShadows position={[0, -1.64, 0]} opacity={0.6} scale={10} blur={2} far={4} color="#000" />
          {/* We default orbit slightly above, encouraging looking down at the cross */}
          <OrbitControls enablePan={true} enableZoom={true} target={[0, 0, 0]} maxPolarAngle={Math.PI/2 - 0.1} />
        </Canvas>

        {completed && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/60 backdrop-blur-md rounded-2xl p-6 border border-yellow-500/50 flex flex-col items-center">
             <div className="text-4xl mb-2 text-yellow-300">🎯</div>
             <p className="font-bold text-white text-lg">Cross Obscured!</p>
             <p className="text-yellow-300 text-sm">Reaction Time: {elapsed.toFixed(1)}s</p>
          </div>
        )}

        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3 shadow-xl max-w-xs">
          <p className="text-[10px] font-bold uppercase tracking-widest text-yellow-400 mb-1">Chemistry Lab — c9</p>
          <p className="text-white font-bold text-sm">3D Rate of Reaction</p>
          <p className="text-xs text-slate-400 mt-1">Orbit the camera directly above the flask. Wait until the yellow sulfur cloud hides the black cross entirely.</p>
        </div>
      </div>

      <div className="w-full md:w-72 bg-slate-900 border-l border-white/5 flex flex-col z-10">
        <div className="p-5 border-b border-white/5">
           <h2 className="text-lg font-black text-white">Controls</h2>
        </div>
        <div className="flex-1 p-5 space-y-4 overflow-y-auto">
          <div className={`p-3 rounded-xl border shadow-inner transition-colors duration-500 ${completed ? 'bg-green-500/10 border-green-500/30' : 'bg-yellow-500/10 border-yellow-500/30'}`}>
            <p className={`text-xs ${completed ? 'text-green-300 font-bold' : 'text-yellow-200'}`}>
              {completed ? '✅ End Point.' : 'Adjust concentration & temperature. Start the timer, watch the internal cloud opacity rise.'}
            </p>
          </div>

          <DraggableSlider label="[Na₂S₂O₃] Conc." min={0.05} max={0.5} step={0.05} value={conc} onChange={v => { setConc(v); reset(); }} color="#f59e0b" formatValue={v => `${v.toFixed(2)} M`} />
          <DraggableSlider label="Temperature" min={15} max={65} step={5} value={temp} onChange={v => { setTemp(v); reset(); }} color="#ef4444" unit="°C" />

          <div className="grid grid-cols-2 gap-2 mt-4">
            {[
              { label: 'Conc [C]', val: `${conc.toFixed(2)} M`, color: '#f59e0b' },
              { label: 'Temp', val: `${temp}°C`, color: '#ef4444' },
              { label: 'Expected t', val: `${timeUntilCloud.toFixed(1)}s`, color: '#60a5fa' },
              { label: 'Elapsed', val: `${elapsed.toFixed(1)}s`, color: completed ? '#10b981' : '#f87171' },
            ].map(m => (
              <div key={m.label} className="bg-slate-950/50 border border-white/5 rounded-xl p-2.5 text-center shadow-sm">
                <div className="text-[9px] text-slate-500 uppercase font-bold tracking-wider mb-1">{m.label}</div>
                <div className="font-mono font-bold text-sm bg-black/20 rounded py-0.5" style={{ color: m.color }}>{m.val}</div>
              </div>
            ))}
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-white/5 shadow-inner text-xs space-y-1.5 mt-2">
            <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-1 border-b border-white/5 pb-1">Arrhenius Equation</p>
            <p className="font-mono text-yellow-400 pt-1">k = A e^<span className="text-[10px] text-slate-400">(-Ea/RT)</span></p>
            <p className="font-mono text-yellow-300">Rate = k[Na₂S₂O₃]</p>
            <p className="font-mono text-slate-500 text-[9px] mt-1">t ∝ 1/Rate</p>
          </div>

          <div className="flex gap-2 pt-2">
            <button onClick={() => { if (!completed) setRunning(r => !r); }} disabled={completed}
              className={`flex-1 py-3 rounded-xl text-sm font-bold text-white transition-all shadow-lg flex items-center justify-center gap-2 ${running ? 'bg-red-600 shadow-red-600/20' : 'bg-yellow-600 shadow-yellow-600/20'} disabled:opacity-50`}>
              {running ? <><Pause size={16} /> Stop</> : <><Play size={16} /> Start Timer</>}
            </button>
            <button onClick={reset}
              className="px-4 py-3 rounded-xl bg-slate-800 text-red-400 hover:bg-red-900/30 transition-colors">
              <RotateCcw size={16} />
            </button>
          </div>

          {completed && (
            <button onClick={logReading}
              className="w-full py-3 rounded-xl text-xs font-bold text-white transition-all active:scale-95 shadow-md"
              style={{ backgroundColor: hex }}>
              + Log Reading
            </button>
          )}

          {readings.length > 0 && (
            <div className="overflow-x-auto text-[10px] bg-slate-950 rounded-xl border border-white/5 mt-2">
              <table className="w-full border-collapse">
                <thead><tr className="bg-slate-900/80 border-b border-white/10">
                  {['#', '[C] M', 'T °C', 't(s)', ''].map(h => <th key={h} className="px-3 py-2 text-slate-400 text-left font-semibold">{h}</th>)}
                </tr></thead>
                <tbody>{readings.map((r, i) => (
                  <tr key={i} className="border-b border-white/5 last:border-b-0 hover:bg-white/5 transition-colors">
                    <td className="px-3 py-2 text-slate-500">{i + 1}</td>
                    <td className="px-3 py-2 font-mono text-yellow-500">{r.conc.toFixed(2)}</td>
                    <td className="px-3 py-2 font-mono text-red-400">{r.temp}</td>
                    <td className="px-3 py-2 font-mono text-green-400 font-bold">{r.time.toFixed(1)}</td>
                    <td className="px-3 py-2 text-right">
                       <button onClick={() => setReadings(p => p.filter((_, j) => j !== i))} className="text-slate-600 hover:text-red-400 transition-colors">
                         <Trash2 size={12} />
                       </button>
                    </td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RateOfReactionLab;
