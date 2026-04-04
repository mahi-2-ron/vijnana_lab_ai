import React, { useState, useRef, useEffect } from 'react';
import { RotateCcw, Play, Pause, Thermometer, Droplets, Sun } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, RoundedBox, Html, Cylinder, Sphere, Torus, Box } from '@react-three/drei';
import * as THREE from 'three';
import DraggableSlider from './DraggableSlider';

interface Props { hex: string; }

// --- 3D MICROSCOPE SCENE (GUARD CELLS) ---
const StomataMicroscopeScene = ({ aperture, isOpen }: { aperture: number, isOpen: boolean }) => {
    const leftCellRef = useRef<THREE.Group>(null);
    const rightCellRef = useRef<THREE.Group>(null);
    const waterRef = useRef<THREE.MeshPhysicalMaterial>(null);

    useFrame(() => {
        if (leftCellRef.current && rightCellRef.current) {
            // Move cells apart as aperture increases
            const targetX = 0.15 + (aperture * 0.4);
            leftCellRef.current.position.x = THREE.MathUtils.lerp(leftCellRef.current.position.x, -targetX, 0.1);
            rightCellRef.current.position.x = THREE.MathUtils.lerp(rightCellRef.current.position.x, targetX, 0.1);

            // Scale cell width (turgid vs flaccid)
            const scaleY = 1 + (aperture * 0.1);
            const scaleX = 1 + (aperture * 0.2); // fatter when turgid
            leftCellRef.current.scale.set(scaleX, scaleY, 1);
            rightCellRef.current.scale.set(scaleX, scaleY, 1);
        }
        
        if(waterRef.current) {
             // Water inside cell changes opacity based on turgidity
             waterRef.current.opacity = 0.4 + (aperture * 0.5);
        }
    });

    return (
        <group position={[0, 0, 0]}>
             <ambientLight intensity={0.5} />
             <pointLight position={[0, 0, 5]} intensity={2} />
             
             {/* Left Guard Cell (Torus arc) */}
             <group ref={leftCellRef}>
                 <Torus args={[1, 0.4, 32, 64, Math.PI]} rotation={[0, 0, Math.PI/2]} castShadow receiveShadow>
                     <meshPhysicalMaterial color="#22c55e" roughness={0.1} clearcoat={1} transmission={0.2} />
                 </Torus>
                 {/* Inner water volume */}
                 <Torus args={[0.95, 0.35, 16, 32, Math.PI]} rotation={[0, 0, Math.PI/2]}>
                     <meshPhysicalMaterial ref={waterRef} color="#4ade80" transmission={0.8} opacity={0.6} transparent ior={1.33} />
                 </Torus>
                 {/* Chloroplasts */}
                 {[...Array(6)].map((_, i) => (
                    <Sphere key={`l-${i}`} args={[0.15, 16, 16]} position={[-1 + Math.random()*0.2, -0.8 + (i*0.3), 0.1]} castShadow>
                        <meshStandardMaterial color="#14532d" roughness={0.8} />
                    </Sphere>
                 ))}
             </group>

             {/* Right Guard Cell */}
             <group ref={rightCellRef}>
                 <Torus args={[1, 0.4, 32, 64, Math.PI]} rotation={[0, 0, -Math.PI/2]} castShadow receiveShadow>
                     <meshPhysicalMaterial color="#22c55e" roughness={0.1} clearcoat={1} transmission={0.2} />
                 </Torus>
                 <Torus args={[0.95, 0.35, 16, 32, Math.PI]} rotation={[0, 0, -Math.PI/2]}>
                     <meshPhysicalMaterial color="#4ade80" transmission={0.8} opacity={0.6} transparent ior={1.33} />
                 </Torus>
                 {/* Chloroplasts */}
                 {[...Array(6)].map((_, i) => (
                    <Sphere key={`r-${i}`} args={[0.15, 16, 16]} position={[1 + Math.random()*0.2, -0.8 + (i*0.3), 0.1]} castShadow>
                        <meshStandardMaterial color="#14532d" roughness={0.8} />
                    </Sphere>
                 ))}
             </group>

             {/* Stomatal Pore backdrop */}
             <Box args={[0.8, 1.8, 0.1]} position={[0, 0, -0.5]}>
                 <meshBasicMaterial color="#020617" />
             </Box>
             
             {/* Vapor particles streaming out if open */}
             {isOpen && <WaterVapor active={isOpen} aperture={aperture} />}
        </group>
    );
};

const WaterVapor = ({ active, aperture }: { active: boolean, aperture: number }) => {
    const group = useRef<THREE.Group>(null);
    useFrame(() => {
        if (!group.current || !active) return;
        group.current.children.forEach(c => {
            c.position.z += 0.05 * (aperture + 0.2); // float towards camera
            c.position.y += (Math.random() - 0.5) * 0.02;
            c.position.x += (Math.random() - 0.5) * 0.02;
            c.scale.setScalar(c.scale.x + 0.01); // expand
            if (c.position.z > 3) {
                 c.position.set((Math.random()-0.5)*aperture, (Math.random()-0.5)*aperture, -0.2);
                 c.scale.setScalar(1);
            }
        });
    });

    return (
        <group ref={group}>
            {[...Array(15)].map((_, i) => (
                <Sphere key={i} args={[0.1, 8, 8]} position={[(Math.random()-0.5)*aperture, (Math.random()-0.5)*aperture, Math.random()*2]}>
                    <meshPhysicalMaterial color="#e0f2fe" transmission={0.9} opacity={0.2} transparent roughness={0} />
                </Sphere>
            ))}
        </group>
    )
}

// --- 3D POTOMETER SCENE ---
const PotometerScene = ({ bubbleX, transpRate }: { bubbleX: number, transpRate: number }) => {
    const bubbleRef = useRef<THREE.Mesh>(null);
    
    useFrame(() => {
        if(bubbleRef.current) {
            // Bubble X mapped to the 4 unit tube width
            // bubbleX goes from 1.0 (start, right) to 0.0 (end, left)
            const targetX = -2 + (bubbleX * 4);
            bubbleRef.current.position.x = THREE.MathUtils.lerp(bubbleRef.current.position.x, targetX, 0.1);
        }
    });

    return (
        <group position={[0, -0.5, 0]}>
            <ambientLight intensity={0.6} />
            <pointLight position={[5, 10, 5]} intensity={1} />
            
            {/* Reservoir/Beaker */}
            <Cylinder args={[0.8, 0.8, 1.5, 32]} position={[2.5, 0.75, 0]} castShadow>
                <meshPhysicalMaterial color="#ffffff" transmission={0.9} opacity={1} transparent roughness={0} />
            </Cylinder>
            <Cylinder args={[0.75, 0.75, 1.2, 32]} position={[2.5, 0.6, 0]}>
                <meshPhysicalMaterial color="#93c5fd" transmission={0.8} transparent />
            </Cylinder>

            {/* Main Capillary Tube */}
            <Cylinder args={[0.1, 0.1, 4, 32]} position={[0, -0.2, 0]} rotation={[0, 0, Math.PI/2]} castShadow>
               <meshPhysicalMaterial color="#ffffff" transmission={0.9} opacity={1} transparent roughness={0} />
            </Cylinder>
            <Cylinder args={[0.08, 0.08, 4, 32]} position={[0, -0.2, 0]} rotation={[0, 0, Math.PI/2]}>
               <meshPhysicalMaterial color="#93c5fd" transmission={0.7} transparent />
            </Cylinder>

            {/* Measuring Scale */}
            <Box args={[4, 0.05, 0.2]} position={[0, -0.35, 0]}>
                <meshStandardMaterial color="#f8fafc" roughness={0.8} />
            </Box>

            {/* Animated Air Bubble */}
            <Sphere ref={bubbleRef} args={[0.08, 16, 16]} position={[2, -0.2, 0]}>
                <meshPhysicalMaterial color="#ffffff" transmission={0.95} opacity={1} transparent ior={1.0} roughness={0} />
            </Sphere>
            
            {/* Plant Shoot Assembly */}
            <group position={[-2, 0, 0]}>
               <Cylinder args={[0.2, 0.2, 0.8, 16]} position={[0, 0.2, 0]}><meshStandardMaterial color="#334155" /></Cylinder>
               
               {/* Stem */}
               <Cylinder args={[0.05, 0.05, 3, 16]} position={[0, 2, 0]}><meshStandardMaterial color="#4ade80" /></Cylinder>
               
               {/* Leaves */}
               <group position={[0, 1.5, 0]} rotation={[0, 0, Math.PI/4]}>
                   <Sphere args={[0.5, 16, 16, 0, Math.PI, 0, Math.PI/2]} scale={[1, 0.1, 2]}><meshStandardMaterial color="#16a34a" side={THREE.DoubleSide}/></Sphere>
               </group>
               <group position={[0, 2.5, 0]} rotation={[0, Math.PI, Math.PI/4]}>
                   <Sphere args={[0.5, 16, 16, 0, Math.PI, 0, Math.PI/2]} scale={[1, 0.1, 2]}><meshStandardMaterial color="#16a34a" side={THREE.DoubleSide}/></Sphere>
               </group>
               <group position={[0, 3.2, 0]} rotation={[0, Math.PI/2, Math.PI/4]}>
                   <Sphere args={[0.4, 16, 16, 0, Math.PI, 0, Math.PI/2]} scale={[1, 0.1, 2]}><meshStandardMaterial color="#22c55e" side={THREE.DoubleSide}/></Sphere>
               </group>
            </group>

            {/* Bubble Overlay Label */}
            <group position={[0, 0, 0]}>
                <Html position={[0, 0.1, 0]} transform>
                   {/* The label position needs to track the bubble, but transform doesn't easily bind to ref in raw fiber without extra state.
                       We will use absolute DOM overlay for exact measurement. */}
                   <div className="bg-white/10 invisible"></div>
                </Html>
            </group>
        </group>
    );
}

const StomataLab: React.FC<Props> = ({ hex }) => {
  const [lightIntensity, setLightIntensity] = useState(70);
  const [humidity, setHumidity] = useState(50);
  const [temperature, setTemperature] = useState(30);
  const [viewMode, setViewMode] = useState<'microscope' | 'potometer'>('microscope');
  
  const [running, setRunning] = useState(false);
  const [bubbleX, setBubbleX] = useState(1.0);

  const stomataOpen = lightIntensity > 30;
  const aperture = stomataOpen ? Math.min(1, (lightIntensity - 30) / 70) : 0;
  // Transpiration logic: higher temp = more transp. higher humidity = less transp.
  const transp = aperture * (temperature / 40) * ((100 - humidity) / 100);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setBubbleX(prev => Math.max(0, prev - transp * 0.005));
    }, 100);
    return () => clearInterval(id);
  }, [running, transp]);

  return (
    <div className="flex flex-col md:flex-row h-full w-full bg-[#050505] overflow-hidden text-slate-200 select-none">
      
      {/* 3D Visualization */}
      <div className="flex-1 flex flex-col relative rounded-2xl overflow-hidden m-4 border border-white/10 shadow-2xl">
        <div className="absolute inset-x-0 top-0 p-4 bg-gradient-to-b from-black/80 to-transparent z-10 flex justify-between items-start">
            <div>
                <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-green-500/20 text-green-400"><Droplets size={18} /></span>
                    Transpiration Dynamics
                </h2>
                <p className="text-[11px] font-medium text-slate-400 uppercase tracking-widest mt-1">
                    {viewMode === 'microscope' ? 'Microscopic Guard Cell View' : 'Macroscopic Potometer Apparatus'}
                </p>
            </div>
            
            {/* View Mode Switcher */}
            <div className="flex bg-black/60 p-1 rounded-xl border border-white/10 backdrop-blur-md shadow-inner">
                <button onClick={() => setViewMode('microscope')} className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${viewMode === 'microscope' ? 'bg-green-600 shadow-md shadow-green-500/50 text-white' : 'text-slate-400 hover:text-white'}`}>🔬 Micro</button>
                <button onClick={() => setViewMode('potometer')} className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${viewMode === 'potometer' ? 'bg-blue-600 shadow-md shadow-blue-500/50 text-white' : 'text-slate-400 hover:text-white'}`}>🌡️ Potometer</button>
            </div>
        </div>

        <Canvas camera={{ position: [0, viewMode === 'microscope' ? 0 : 2, viewMode === 'microscope' ? 5 : 7], fov: 45 }}>
            <Environment preset="city" />
            
            {viewMode === 'microscope' 
                ? <StomataMicroscopeScene aperture={aperture} isOpen={stomataOpen} /> 
                : <PotometerScene bubbleX={bubbleX} transpRate={transp} />
            }

            {viewMode === 'potometer' && <ContactShadows position={[0, -0.85, 0]} opacity={0.5} scale={15} blur={2.5} far={4} color="#000" />}
            <OrbitControls enablePan={true} enableZoom={true} maxPolarAngle={Math.PI / 2 + 0.1} minPolarAngle={0.2} />
        </Canvas>

        {/* HUD Data Overlays */}
        {viewMode === 'microscope' ? (
             <div className={`absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-black/80 px-6 py-3 rounded-2xl backdrop-blur-xl border transition-colors shadow-2xl ${stomataOpen ? 'border-green-500/50' : 'border-red-500/50'}`}>
                <div className={`w-3 h-3 rounded-full ${stomataOpen ? 'bg-green-400 shadow-[0_0_10px_#4ade80] animate-pulse' : 'bg-red-500'}`} />
                <div>
                     <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mb-0.5">Stomata Status</p>
                     <p className={`text-lg font-black leading-none ${stomataOpen ? 'text-green-400' : 'text-red-400'}`}>
                         {stomataOpen ? `OPEN (${Math.round(aperture*100)}%)` : 'CLOSED'}
                     </p>
                 </div>
             </div>
        ) : (
            <div className="absolute bottom-6 left-6 flex flex-col gap-2">
                 <div className="bg-black/80 px-4 py-3 rounded-xl border border-white/10 backdrop-blur-md">
                     <p className="text-[10px] uppercase font-bold tracking-widest text-blue-400 mb-1">Capillary Bubble X</p>
                     <p className="font-mono text-xl font-bold text-white leading-none">{(Math.round((1 - bubbleX)*100))} mm</p>
                 </div>
            </div>
        )}
      </div>

      {/* Control Panel */}
      <div className="w-full md:w-[320px] shrink-0 bg-[#0a0a0a] border-l border-white/10 flex flex-col z-20 shadow-[-10px_0_30px_rgba(0,0,0,0.5)]">
        <div className="p-6 border-b border-white/5">
          <p className="text-xs font-bold uppercase tracking-widest text-green-400 mb-2 border-b border-green-500/20 inline-block pb-1">Biology Lab — b7</p>
          <h2 className="text-xl font-bold text-white tracking-tight">Plant Transpiration</h2>
        </div>
        
        <div className="flex-1 p-6 space-y-6 overflow-y-auto">
          
          <div className={`p-4 rounded-xl border backdrop-blur-md transition-colors ${stomataOpen ? 'bg-green-900/20 border-green-500/30' : 'bg-red-900/20 border-red-500/30'}`}>
             <p className={`text-xs font-medium leading-relaxed ${stomataOpen ? 'text-green-200' : 'text-red-200'}`}>
                 {stomataOpen ? "Guard cells are turgid. Stomatal pore is open and plant is actively transpiring water vapour." : "Guard cells are flaccid. Stomatal pore is closed. Transpiration halted."}
             </p>
          </div>

          <div className="space-y-5">
              <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 border-b border-white/10 pb-1">Environmental Variables</h3>
              
              <DraggableSlider label="Light Intensity" min={0} max={100} value={lightIntensity} onChange={setLightIntensity} color="#f59e0b" unit="%" />
              <DraggableSlider label="Relative Humidity" min={10} max={100} value={humidity} onChange={setHumidity} color="#3b82f6" unit="%" />
              <DraggableSlider label="Temperature" min={10} max={45} value={temperature} onChange={setTemperature} color="#ef4444" unit="°C" />
          </div>

          <div className="grid grid-cols-2 gap-3 pb-2">
             <div className="bg-[#111] border border-white/5 shadow-inner rounded-xl p-3 text-center">
                 <p className="text-[9px] uppercase font-bold text-slate-500 mb-1">Aperture Size</p>
                 <p className={`font-mono text-sm font-bold ${stomataOpen ? 'text-green-400' : 'text-red-400'}`}>{Math.round(aperture*100)}%</p>
             </div>
             <div className="bg-[#111] border border-white/5 shadow-inner rounded-xl p-3 text-center">
                 <p className="text-[9px] uppercase font-bold text-slate-500 mb-1">Transpiration Rate</p>
                 <p className="font-mono text-sm font-bold text-blue-400">{(transp * 20).toFixed(2)}</p>
             </div>
          </div>

          <div className="flex gap-2">
            <button onClick={() => setRunning(r => !r)} 
               className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl text-xs font-bold text-white transition-all active:scale-95 shadow-lg ${running ? 'bg-red-600 shadow-red-500/20' : 'bg-blue-600 shadow-blue-500/20'}`}>
               {running ? <><Pause size={14} /> Pause Air Bubble</> : <><Play size={14} /> Run Potometer</>}
            </button>
            <button onClick={() => { setRunning(false); setBubbleX(1.0); }} className="px-4 py-3 rounded-xl bg-slate-800 text-slate-400 hover:text-red-400 hover:bg-red-900/40 transition-colors font-bold">
               <RotateCcw size={16} />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default StomataLab;
