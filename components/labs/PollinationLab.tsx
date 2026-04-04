import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Play, Pause, Bug, Wind, Droplet } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Sphere, Cylinder } from '@react-three/drei';
import * as THREE from 'three';

interface Props { hex: string; }

// Bee Model
const Bee = ({ animating, targetX, targetY }: any) => {
    const beeRef = useRef<THREE.Group>(null);
    const wingsRef = useRef<THREE.Group>(null);
    
    useFrame((state) => {
        if (!beeRef.current || !wingsRef.current) return;
        
        if (animating) {
             const t = state.clock.elapsedTime;
             // Figure 8 flight path
             const px = Math.sin(t * 1.5) * 2.5; 
             const py = 1 + Math.cos(t * 3) * 0.5 + Math.sin(t * 1.5) * 0.5;
             const pz = Math.sin(t * 1.5) * 1.5;

             beeRef.current.position.lerp(new THREE.Vector3(px, py, pz), 0.1);
             
             // Look where it's going roughly
             beeRef.current.rotation.y = -Math.cos(t * 1.5) * 1.5;
             beeRef.current.rotation.z = Math.sin(t * 3) * 0.2;
             
             // Flap wings extremely fast
             wingsRef.current.rotation.x = Math.sin(t * 50) * 0.8;
        } else {
             // Hover idle
             beeRef.current.position.lerp(new THREE.Vector3(targetX, targetY, 0), 0.05);
             beeRef.current.rotation.y = THREE.MathUtils.lerp(beeRef.current.rotation.y, 0, 0.05);
             wingsRef.current.rotation.x = 0;
        }
    });

    return (
        <group ref={beeRef} position={[-2, 1.5, 0]}>
            {/* Body */}
            <Sphere args={[0.15, 16, 16]} scale={[1, 0.8, 1.4]}><meshStandardMaterial color="#fbbf24" /></Sphere>
            <Cylinder args={[0.16, 0.16, 0.1, 16]} rotation={[Math.PI/2, 0, 0]} position={[0, 0, 0]}><meshStandardMaterial color="#1e293b" /></Cylinder>
            <Cylinder args={[0.13, 0.13, 0.1, 16]} rotation={[Math.PI/2, 0, 0]} position={[0, 0, 0.15]}><meshStandardMaterial color="#1e293b" /></Cylinder>
            <Cylinder args={[0.13, 0.13, 0.1, 16]} rotation={[Math.PI/2, 0, 0]} position={[0, 0, -0.15]}><meshStandardMaterial color="#1e293b" /></Cylinder>
            
            {/* Head */}
            <Sphere args={[0.1, 8, 8]} position={[0, 0.05, 0.25]}><meshStandardMaterial color="#1e293b" /></Sphere>
            
            {/* Wings */}
            <group ref={wingsRef} position={[0, 0.15, -0.05]}>
                <Sphere args={[0.1, 8, 8]} position={[0.15, 0, 0]} scale={[1.5, 0.1, 0.8]}><meshPhysicalMaterial color="#bae6fd" transmission={0.9} transparent opacity={0.6} /></Sphere>
                <Sphere args={[0.1, 8, 8]} position={[-0.15, 0, 0]} scale={[1.5, 0.1, 0.8]}><meshPhysicalMaterial color="#bae6fd" transmission={0.9} transparent opacity={0.6} /></Sphere>
            </group>
        </group>
    );
};

// Wind Particles
const WindPollen = ({ animating }: { animating: boolean }) => {
    const groupRef = useRef<THREE.Group>(null);
    useFrame((state) => {
        if (!groupRef.current) return;
        if (animating) {
             groupRef.current.visible = true;
             groupRef.current.children.forEach(c => {
                 c.position.x += 0.05;
                 c.position.y += Math.sin(state.clock.elapsedTime * 5 + c.position.x) * 0.01;
                 c.position.z += Math.cos(state.clock.elapsedTime * 3 + c.position.y) * 0.01;
                 if (c.position.x > 3) c.position.x = -3;
             });
        } else {
             groupRef.current.visible = false;
        }
    });

    return (
        <group ref={groupRef} position={[0, 1.5, 0]}>
            {[...Array(50)].map((_, i) => (
                <Sphere key={i} args={[0.02, 8, 8]} position={[-3 + Math.random()*6, (Math.random()-0.5)*1, (Math.random()-0.5)*2]}>
                     <meshStandardMaterial color="#fcd34d" emissive="#fbbf24" emissiveIntensity={0.5} />
                </Sphere>
            ))}
        </group>
    );
};

const Flower = ({ position, color, petals=6, style='normal', scale=1 }: any) => {
    // Generate petals
    const petalAngles = [...Array(petals)].map((_, i) => (i / petals) * Math.PI * 2);
    
    return (
        <group position={position} scale={scale}>
            {/* Stem */}
            <Cylinder args={[0.03, 0.05, 3]} position={[0, -1.5, 0]}>
                <meshStandardMaterial color="#22c55e" />
            </Cylinder>

            {/* Leaves */}
            <Sphere args={[0.3, 16, 16]} position={[0.2, -1.5, 0.1]} rotation={[0, 0, -Math.PI/6]} scale={[1, 0.1, 0.5]}>
                <meshStandardMaterial color="#16a34a" />
            </Sphere>
            <Sphere args={[0.3, 16, 16]} position={[-0.2, -2, -0.1]} rotation={[0, 0, Math.PI/6]} scale={[1, 0.1, 0.5]}>
                <meshStandardMaterial color="#16a34a" />
            </Sphere>

            {style === 'normal' && (
                <group>
                    {/* Petals */}
                    {petalAngles.map((angle, i) => (
                        <group key={i} rotation={[Math.PI/4, angle, 0]} position={[Math.sin(angle)*0.2, 0, Math.cos(angle)*0.2]}>
                            <Sphere args={[0.25, 16, 16]} scale={[1, 0.1, 1.5]}>
                                <meshStandardMaterial color={color} roughness={0.4} />
                            </Sphere>
                        </group>
                    ))}

                    {/* Stigma / Center */}
                    <Sphere args={[0.15, 16, 16]} position={[0, 0.1, 0]}>
                        <meshStandardMaterial color="#f59e0b" roughness={0.9} />
                    </Sphere>

                    {/* Anthers */}
                    {[...Array(6)].map((_, i) => {
                        const a = (i/6)*Math.PI*2;
                        return (
                            <group key={i} position={[Math.sin(a)*0.2, 0.15, Math.cos(a)*0.2]} rotation={[Math.PI/8, a, 0]}>
                                <Cylinder args={[0.01, 0.01, 0.2]} position={[0, 0.1, 0]}><meshStandardMaterial color="#4ade80" /></Cylinder>
                                <Sphere args={[0.03, 8, 8]} position={[0, 0.2, 0]}><meshStandardMaterial color="#fcd34d" /></Sphere>
                            </group>
                        )
                    })}
                </group>
            )}

            {style === 'wind' && (
                <group>
                    {/* Petals absent/small */}
                    {petalAngles.map((angle, i) => (
                        <group key={i} rotation={[Math.PI/4, angle, 0]} position={[Math.sin(angle)*0.1, 0, Math.cos(angle)*0.1]}>
                            <Sphere args={[0.1, 16, 16]} scale={[1, 0.1, 1.5]}>
                                <meshStandardMaterial color="#a3e635" roughness={0.4} />
                            </Sphere>
                        </group>
                    ))}
                    {/* Exposed hanging anthers */}
                    {[...Array(8)].map((_, i) => {
                        const a = (i/8)*Math.PI*2;
                        return (
                            <group key={i} position={[Math.sin(a)*0.15, -0.1, Math.cos(a)*0.15]} rotation={[0, a, Math.random()*0.5]}>
                                <Cylinder args={[0.005, 0.005, 0.4]} position={[0, -0.2, 0]}><meshStandardMaterial color="#d9f99d" /></Cylinder>
                                <Cylinder args={[0.02, 0.02, 0.1]} position={[0, -0.4, 0]}><meshStandardMaterial color="#fef08a" /></Cylinder>
                            </group>
                        )
                    })}
                </group>
            )}

            {style === 'self' && (
                <group>
                    {/* Petals tightly closed */}
                    {petalAngles.map((angle, i) => (
                        <group key={i} rotation={[Math.PI/2 - 0.2, angle, 0]} position={[Math.sin(angle)*0.15, 0.3, Math.cos(angle)*0.15]}>
                            <Sphere args={[0.4, 16, 16]} scale={[1, 0.05, 2]}>
                                <meshStandardMaterial color={color} roughness={0.4} />
                            </Sphere>
                        </group>
                    ))}
                     {/* Drooping inward anthers */}
                    {[...Array(4)].map((_, i) => {
                        const a = (i/4)*Math.PI*2;
                        return (
                            <group key={i} position={[Math.sin(a)*0.1, 0.2, Math.cos(a)*0.1]} rotation={[Math.PI/4, a, 0]}>
                                <Cylinder args={[0.01, 0.01, 0.15]} position={[0, 0.07, 0]}><meshStandardMaterial color="#4ade80" /></Cylinder>
                                <Sphere args={[0.03, 8, 8]} position={[0, 0.15, 0]}><meshStandardMaterial color="#fcd34d" /></Sphere>
                            </group>
                        )
                    })}
                </group>
            )}
        </group>
    );
};

const PollenScene = ({ mode, pollinating }: any) => {
    return (
        <group position={[0,-1,0]}>
           <ambientLight intensity={0.5} />
           <directionalLight position={[5, 10, 5]} intensity={1.5} castShadow />

           {/* Grass Ground */}
           <Cylinder args={[6, 6, 0.2, 64]} position={[0, -0.1, 0]} receiveShadow>
               <meshStandardMaterial color="#14532d" roughness={1} />
           </Cylinder>

           {mode === 'insect' && (
               <>
                  <Flower position={[-2, 2.5, 0]} color="#f472b6" style="normal" />
                  <Flower position={[2, 2.2, 0.5]} color="#818cf8" style="normal" />
                  <Flower position={[0, 1.8, -1]} color="#fb923c" style="normal" scale={0.8} />
                  <Bee targetX={-2} targetY={2.5} animating={pollinating} />
               </>
           )}

           {mode === 'wind' && (
               <>
                  <Flower position={[-2, 2.5, 0]} color="#86efac" style="wind" />
                  <Flower position={[2, 2.3, 0]} color="#86efac" style="wind" />
                  <WindPollen animating={pollinating} />
               </>
           )}

           {mode === 'self' && (
               <>
                  <Flower position={[0, 2.5, 0]} color="#fde047" style="self" />
               </>
           )}
        </group>
    ); // end group
};

const PollinationLab: React.FC<Props> = ({ hex }) => {
  const [mode, setMode] = useState<'wind' | 'insect' | 'self'>('insect');
  const [pollinating, setPollinating] = useState(false);

  return (
    <div className="flex flex-col md:flex-row h-full w-full bg-[#050505] overflow-hidden text-slate-200 select-none">
      
      {/* 3D Visualization */}
      <div className="flex-1 flex flex-col relative rounded-2xl overflow-hidden m-4 border border-white/10 shadow-[0_0_50px_rgba(236,72,153,0.05)] bg-[#0c4a6e]">
        <div className="absolute inset-x-0 top-0 p-4 bg-gradient-to-b from-black/80 to-transparent z-10 flex justify-between items-start pointer-events-none">
            <div>
                <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-pink-500/20 text-pink-400"><Bug size={18} /></span>
                    Floral Pollination Modes
                </h2>
                <p className="text-[11px] font-medium text-slate-300 uppercase tracking-widest mt-1">Ecological Adaptations in Angiosperms</p>
            </div>
            {/* Active Mode */}
            <div className={`backdrop-blur-md px-3 py-1.5 rounded-xl border text-[10px] font-bold uppercase tracking-widest shadow-inner transition-colors ${pollinating ? 'bg-pink-500/20 border-pink-500/40 text-pink-400 animate-pulse' : 'bg-black/40 border-white/10 text-slate-200'}`}>
               {pollinating ? `Active: ${mode}` : 'Idle'}
            </div>
        </div>

        <Canvas camera={{ position: [0, 2, 8], fov: 45 }}>
            <Environment preset="city" />
            <PollenScene mode={mode} pollinating={pollinating} />
            <OrbitControls enablePan={true} enableZoom={true} maxPolarAngle={Math.PI / 2 - 0.05} />
        </Canvas>

        {/* Dynamic Wind Particles / Atmosphere Overlays */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-xl p-3 px-6 rounded-full border border-white/10 flex items-center gap-4 shadow-2xl pointer-events-none">
            {mode === 'insect' && <><Bug size={14} className="text-yellow-400"/> <span className="text-[10px] uppercase font-bold text-slate-200">Entomophily (Biotic)</span></>}
            {mode === 'wind' && <><Wind size={14} className="text-blue-400"/> <span className="text-[10px] uppercase font-bold text-slate-200">Anemophily (Abiotic)</span></>}
            {mode === 'self' && <><Droplet size={14} className="text-green-400"/> <span className="text-[10px] uppercase font-bold text-slate-200">Autogamy (Selfing)</span></>}
        </div>
      </div>

      {/* Control Panel */}
      <div className="w-full md:w-[320px] shrink-0 bg-[#0a0a0a] border-l border-white/10 flex flex-col z-20 shadow-[-10px_0_30px_rgba(0,0,0,0.5)]">
        <div className="p-6 border-b border-white/5">
          <p className="text-xs font-bold uppercase tracking-widest text-pink-500 mb-2 border-b border-pink-500/20 inline-block pb-1">Biology Lab — b15</p>
          <h2 className="text-xl font-bold text-white tracking-tight">Pollination Adaptations</h2>
        </div>
        
        <div className="flex-1 p-6 space-y-6 overflow-y-auto custom-scrollbar">
          
          <div className="bg-pink-900/10 border border-pink-500/20 p-4 rounded-xl backdrop-blur-md">
             <p className="text-pink-100/80 text-xs leading-relaxed">
                Plants have evolved intricate mechanical and visual structures to optimize pollen transfer based on their ecological niches.
             </p>
          </div>

          <div className="space-y-3">
             <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 flex items-center gap-2">Pollination Method</h3>
             {([
                 ['insect','🐝 Entomophily (Insect)','Large colorful petals, nectar, and flagrant odors.'],
                 ['wind','💨 Anemophily (Wind)','Exposed versatile anthers, light dry pollen, no petals.'],
                 ['self','🌸 Autogamy (Self)','Closed bisexual flowers (cleistogamy).']
             ] as const).map(([m, label, desc]) => (
                <button key={m} onClick={() => { setMode(m); setPollinating(false); }}
                  className={`w-full p-4 flex flex-col items-start rounded-xl text-left transition-all ${mode === m ? 'border-pink-500 bg-pink-900/30 shadow-inner' : 'border-white/10 bg-[#111] hover:border-pink-500/50 hover:bg-white/5'}`}
                  style={{ border: `1px solid ${mode === m ? '#ec4899' : 'rgba(255,255,255,0.05)'}` }}>
                  <span className={`font-bold text-sm leading-tight ${mode === m ? 'text-pink-300' : 'text-slate-200'}`}>{label}</span>
                  <span className={`text-[10px] font-medium mt-1 leading-relaxed ${mode === m ? 'text-pink-200/70' : 'text-slate-500'}`}>{desc}</span>
                </button>
             ))}
          </div>

          <div className="bg-[#111] p-4 rounded-xl border border-white/5 shadow-inner">
             <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 border-b border-white/10 pb-1">Visible Adaptations</p>
             <div className="space-y-2 text-xs">
                 {mode === 'insect' && [['Petals','Vibrant colors to attract bees'],['Anthers','Stiff, producing sticky pollen'],['Reward','Nectar produced at base']].map(([k,v]) => (
                     <div key={k} className="flex flex-col"><span className="text-pink-400 font-bold">{k}</span><span className="text-slate-400">{v}</span></div>
                 ))}
                 {mode === 'wind' && [['Petals','Reduced or absent (saves energy)'],['Anthers','Hanging outside flower to catch wind'],['Pollen','Millions of smooth lightweight grains']].map(([k,v]) => (
                     <div key={k} className="flex flex-col"><span className="text-blue-400 font-bold">{k}</span><span className="text-slate-400">{v}</span></div>
                 ))}
                 {mode === 'self' && [['Petals','Tightly wrapped around organs'],['Proximity','Anther and stigma are adjacent'],['Timeline','Simultaneous maturation']].map(([k,v]) => (
                     <div key={k} className="flex flex-col"><span className="text-green-400 font-bold">{k}</span><span className="text-slate-400">{v}</span></div>
                 ))}
             </div>
          </div>

          <button onClick={() => setPollinating(p => !p)}
            className={`w-full py-4 rounded-xl font-bold text-white transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2 ${pollinating ? 'bg-red-600 shadow-red-900/40' : 'bg-ambient bg-pink-600 shadow-pink-900/40 hover:bg-pink-500'}`}>
            {pollinating ? <><Pause size={16} /> Stop Simulation</> : <><Play size={16} /> View Simulation</>}
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default PollinationLab;
