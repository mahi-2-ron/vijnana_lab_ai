import React, { useState, useRef, useEffect, useMemo } from 'react';
import { RotateCcw, Sprout, TestTube } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Sphere, Cylinder, Html } from '@react-three/drei';
import * as THREE from 'three';
import DraggableSlider from './DraggableSlider';

interface Props { hex: string; }

const PollenScene = ({ tubeGrowth, germRate, running }: any) => {
   // Generate some static pollens
   const pollens = useMemo(() => [
       { id: 1, pos: [-1.5, 0.5, 0], rot: [0,0,0], thresh: 0.1, dir: [1, -0.5, 0] },
       { id: 2, pos: [1.5, -0.2, 0.5], rot: [1,1,0], thresh: 0.3, dir: [-1, 0.8, 0] },
       { id: 3, pos: [0.2, 1.2, -0.5], rot: [0.5,0.2,1], thresh: 0.5, dir: [0, -1, 0.2] },
       { id: 4, pos: [-0.5, -1.2, 0.2], rot: [2,0,0.5], thresh: 0.7, dir: [0.8, 1, 0] },
       { id: 5, pos: [1.8, 1.5, -0.8], rot: [0,1.5,0], thresh: 0.2, dir: [-0.5, -1, 0.5] },
       { id: 6, pos: [-2.2, -0.8, -0.5], rot: [0.8,0.8,0.8], thresh: 0.6, dir: [1, 0.2, 0.2] },
       { id: 7, pos: [2.5, -1.5, -0.2], rot: [0.2,0.8,0.4], thresh: 0.4, dir: [-1, 0.5, 0] },
   ], []);

   return (
       <group position={[0, -0.5, 0]}>
           <ambientLight intensity={0.4} />
           <pointLight position={[0, 0, 5]} intensity={1.5} color="#eab308" />
           <pointLight position={[-5, 5, -5]} color="#4ade80" intensity={0.5} />

           {pollens.map(p => (
               <PollenGrain 
                   key={p.id} 
                   position={p.pos as [number,number,number]} 
                   rotation={p.rot as [number,number,number]} 
                   direction={p.dir as [number,number,number]}
                   growth={tubeGrowth}
                   threshold={p.thresh}
                   rate={germRate}
                   running={running}
               />
           ))}

           {/* Floating background particles representing sucrose/boron field */}
           <LiquidMedium tubeGrowth={tubeGrowth} running={running} />
       </group>
   );
};

const PollenGrain = ({ position, rotation, direction, growth, threshold, rate, running }: any) => {
    const groupRef = useRef<THREE.Group>(null);
    const tubeGroupRef = useRef<THREE.Group>(null);
    const tubeRef = useRef<THREE.Mesh>(null);
    const tipRef = useRef<THREE.Mesh>(null);

    // Spikes for texture
    const spikes = useMemo(() => {
        const arr = [];
        const phi = Math.PI * (3 - Math.sqrt(5)); // golden angle
        const n = 30; // num spikes
        for (let i = 0; i < n; i++) {
           const y = 1 - (i / (n - 1)) * 2; 
           const radius = Math.sqrt(1 - y * y);
           const theta = phi * i;
           const px = Math.cos(theta) * radius;
           const pz = Math.sin(theta) * radius;
           arr.push(new THREE.Vector3(px, y, pz));
        }
        return arr;
    }, []);

    useFrame((state) => {
        if (!groupRef.current) return;
        // Float gently
        groupRef.current.position.y += Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.002;
        groupRef.current.rotation.x += 0.001;
        groupRef.current.rotation.y += 0.002;

        // Tube Growth Logic
        // Normalize direction
        const dirVec = new THREE.Vector3(...direction).normalize();
        
        // Find tube length based on growth progress vs threshold
        let currentLength = 0;
        if (growth > threshold && rate > 0.2) {
            currentLength = (growth - threshold) * 5 * rate; // Max length 5 units
        }
        
        if (tubeRef.current && tipRef.current && tubeGroupRef.current) {
            // Re-orient the tube group towards the direction
            // By default, cylinder grows along Y. We need it to point exactly to dirVec
            const quaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dirVec);
            tubeGroupRef.current.quaternion.copy(quaternion);
            
            // To make cylinder grow from its base, scale it and shift it
            tubeRef.current.scale.y = currentLength || 0.001; 
            tubeRef.current.position.y = currentLength / 2; // shift center up
            
            // Move tip to the end
            tipRef.current.position.y = currentLength;
        }
    });

    return (
        <group ref={groupRef} position={position} rotation={rotation}>
            {/* Main pollen body */}
            <Sphere args={[0.4, 32, 32]}>
               <meshStandardMaterial color="#f59e0b" roughness={0.7} bumpScale={0.05} />
            </Sphere>
            
            {/* Spikes */}
            {spikes.map((v, i) => (
                <Cylinder key={i} args={[0.01, 0.04, 0.1, 8]} position={[v.x*0.42, v.y*0.42, v.z*0.42]} rotation={[Math.sin(v.z), 0, Math.cos(v.x)]}>
                    <meshStandardMaterial color="#d97706" />
                </Cylinder>
            ))}

            {/* Growing Tube */}
            <group ref={tubeGroupRef} position={[0, 0, 0]}> {/* Starts exactly at pollen center */}
                {/* The extruded tube body */}
                <mesh ref={tubeRef} position={[0, 0, 0]}>
                    <cylinderGeometry args={[0.08, 0.12, 1, 16]} /> {/* default base length 1, scaled naturally */}
                    <meshPhysicalMaterial color="#86efac" transmission={0.4} opacity={0.9} transparent roughness={0.2} />
                </mesh>
                
                {/* Tube tip (growing end) */}
                <Sphere ref={tipRef} args={[0.082, 16, 16]} position={[0, 0, 0]}>
                    <meshPhysicalMaterial color="#4ade80" transmission={0.2} roughness={0.1} />
                </Sphere>
            </group>
        </group>
    );
};

const LiquidMedium = ({ tubeGrowth, running }: { tubeGrowth: number, running: boolean }) => {
    const group = useRef<THREE.Group>(null);
    useFrame((state) => {
        if (!group.current) return;
        group.current.children.forEach((c, i) => {
            c.position.y += Math.sin(state.clock.elapsedTime + i) * 0.005;
            if (running) {
                // swirling movement representing incubation
                c.position.x += Math.cos(state.clock.elapsedTime * 0.5 + i) * 0.005;
                c.position.z += Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.005;
            }
        });
    });

    return (
        <group ref={group}>
            {[...Array(50)].map((_, i) => (
                <Sphere key={i} args={[0.02, 8, 8]} position={[(Math.random()-0.5)*8, (Math.random()-0.5)*5, (Math.random()-0.5)*5 - 2]}>
                    <meshPhysicalMaterial color="#fef08a" transmission={0.9} opacity={0.3} transparent />
                </Sphere>
            ))}
        </group>
    )
}


const PollenGermLab: React.FC<Props> = ({ hex }) => {
  const [boronConc, setBoronConc] = useState(100); 
  const [sucroseConc, setSucroseConc] = useState(10); 
  const [temperature, setTemperature] = useState(25);
  const [germinated, setGerminated] = useState(false);
  const [tubeGrowth, setTubeGrowth] = useState(0);
  const [germCount, setGermCount] = useState(0);
  const [running, setRunning] = useState(false);

  const optimalBoron = 100, optimalSucrose = 10, optimalTemp = 25;
  const boronFactor = 1 - Math.abs(boronConc - optimalBoron) / 200;
  const sucroseFactor = 1 - Math.abs(sucroseConc - optimalSucrose) / 20;
  const tempFactor = 1 - Math.abs(temperature - optimalTemp) / 15;
  const germRate = Math.max(0, boronFactor * sucroseFactor * tempFactor);
  const germPercent = Math.round(germRate * 85 + Math.random() * 5); // Add organic noise

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setTubeGrowth(p => {
        if (p >= 1) { 
            clearInterval(id); 
            setRunning(false); 
            setGerminated(true); 
            setGermCount(germPercent); 
            return 1; 
        }
        return p + 0.005 * germRate; // Grow relative to the rate
      });
    }, 50);
    return () => clearInterval(id);
  }, [running, germRate, germPercent]);

  const reset = () => { 
      setTubeGrowth(0); 
      setGerminated(false); 
      setRunning(false); 
      setGermCount(0); 
  };

  return (
    <div className="flex flex-col md:flex-row h-full w-full bg-[#050505] overflow-hidden text-slate-200 select-none">
      
      {/* 3D Visualization */}
      <div className="flex-1 flex flex-col relative rounded-2xl overflow-hidden m-4 border border-white/10 shadow-[0_0_50px_rgba(245,158,11,0.05)]">
        <div className="absolute inset-x-0 top-0 p-4 bg-gradient-to-b from-black/80 to-transparent z-10 flex justify-between items-start">
            <div>
                <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400"><Sprout size={18} /></span>
                    Pollen Tube Germination In Vitro
                </h2>
                <p className="text-[11px] font-medium text-slate-400 uppercase tracking-widest mt-1">Microscopic View 400x (3D)</p>
            </div>
            
            {/* Status chip */}
            <div className={`backdrop-blur-md px-3 py-1.5 rounded-xl border text-[10px] font-bold uppercase tracking-widest shadow-inner transition-colors ${germinated ? 'bg-green-500/20 border-green-500/40 text-green-400' : 'bg-black/40 border-white/10 text-slate-300'}`}>
               {germinated ? 'Germination Complete' : running ? 'Incubating...' : 'Medium Prep'}
            </div>
        </div>

        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
            {/* Use dark studio environment to give scanning electron microscope vibe but colorful */}
            <Environment preset="studio" />
            <ambientLight intensity={0.2} />
            
            <PollenScene tubeGrowth={tubeGrowth} germRate={germRate} running={running} />

            <OrbitControls enablePan={true} enableZoom={true} maxPolarAngle={Math.PI / 2 + 0.2} />
        </Canvas>

        {/* Dynamic Data Overlay */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-sm flex items-center gap-4 bg-black/80 p-4 rounded-xl border border-white/10 shadow-2xl backdrop-blur-md">
             <div className="flex-1">
                 <p className="text-[10px] uppercase font-bold tracking-widest text-emerald-400 mb-1">Growth Outcome</p>
                 {running ? (
                    <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden mt-2">
                         <div className="h-full bg-amber-400" style={{ width: `${tubeGrowth * 100}%` }} />
                    </div>
                 ) : (
                    <p className="font-bold text-slate-300 leading-snug">
                       {germinated ? "Pollen tubes formed." : "Awaiting incubation."}
                    </p>
                 )}
             </div>
             
             <div className="shrink-0 bg-emerald-900/20 p-3 rounded-xl border border-emerald-500/20 text-center flex flex-col items-center justify-center min-w-[70px]">
                 <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Rate</p>
                 <p className="font-black text-2xl text-white leading-none mt-1">{germinated ? germCount : Math.round(tubeGrowth * germCount)}<span className="text-sm">%</span></p>
             </div>
        </div>
      </div>

      <div className="w-full md:w-[320px] shrink-0 bg-[#0a0a0a] border-l border-white/10 flex flex-col z-20 shadow-[-10px_0_30px_rgba(0,0,0,0.5)]">
        <div className="p-6 border-b border-white/5">
          <p className="text-xs font-bold uppercase tracking-widest text-amber-500 mb-2 border-b border-amber-500/20 inline-block pb-1">Biology Lab — b6</p>
          <h2 className="text-xl font-bold text-white tracking-tight">Pollen Germination</h2>
        </div>
        
        <div className="flex-1 p-6 space-y-6 overflow-y-auto">
          
          <div className="bg-amber-900/20 border border-amber-500/20 p-4 rounded-xl backdrop-blur-md">
            <p className="text-amber-100 text-xs leading-relaxed">Study pollen germination in a synthetic medium. Adjust chemical concentrations to find the optimum growth conditions.</p>
          </div>

          <div className="space-y-4">
             <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest border-b border-white/10 pb-1 flex items-center gap-2"><TestTube size={12} /> Medium Composition</h3>
             
             <DraggableSlider label="Boric Acid (B₃)" min={0} max={400} step={10} value={boronConc} onChange={v => { setBoronConc(v); reset(); }} color="#10b981" unit="ppm" formatValue={(v) => v.toString()} />
             <DraggableSlider label="Sucrose" min={0} max={30} step={1} value={sucroseConc} onChange={v => { setSucroseConc(v); reset(); }} color="#f59e0b" unit="%" formatValue={(v) => v.toString()} />
             <DraggableSlider label="Temperature" min={10} max={40} step={1} value={temperature} onChange={v => { setTemperature(v); reset(); }} color="#ef4444" unit="°C" formatValue={(v) => v.toString()} />
          </div>

          <div className="bg-[#111] p-4 rounded-xl border border-white/5 shadow-inner">
             <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Theoretical Quality Score</p>
             <div className="flex items-center gap-3">
                 <div className="flex-1 h-3 bg-white/10 rounded-full overflow-hidden">
                     <div className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 transition-all duration-300" style={{ width: `${Math.max(5, germRate * 100)}%` }} />
                 </div>
                 <span className={`font-mono text-sm font-bold ${germRate > 0.7 ? 'text-green-400' : germRate > 0.3 ? 'text-yellow-400' : 'text-red-400'}`}>{Math.round(germRate * 100)}/100</span>
             </div>
          </div>

          <div className="flex gap-2">
              <button onClick={() => { if (!germinated) setRunning(r => !r); }} disabled={germinated}
                className={`flex-1 py-3.5 rounded-xl font-bold text-white transition-all shadow-lg active:scale-95 flex flex-col items-center justify-center leading-tight ${running ? 'bg-slate-700 shadow-slate-900' : 'bg-ambient bg-amber-600 shadow-amber-900/40 hover:bg-amber-500'} disabled:opacity-50`}>
                <span className="flex items-center gap-1.5"><Sprout size={14} /> {running ? 'Incubating...' : 'Start Incubation'}</span>
                {!running && !germinated && <span className="text-[9px] font-medium text-amber-200 mt-0.5 opacity-80">(Simulate 30 mins)</span>}
              </button>

              <button onClick={reset} className="px-5 rounded-xl bg-slate-800 text-slate-400 hover:text-red-400 hover:bg-red-900/40 transition-colors font-bold"><RotateCcw size={16} /></button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PollenGermLab;
