import React, { useState, useRef, useEffect, useMemo } from 'react';
import { RotateCcw, Play, Pause, CheckCircle, Dna } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, RoundedBox, Html, Cylinder, Sphere, Line, Box } from '@react-three/drei';
import * as THREE from 'three';

interface Props { hex: string; }

// DNA Isolation Lab — salt/detergent extraction simulation
const STAGES = [
  { id: 0, name: 'Prepare Sample', color: '#22c55e', desc: 'Blend onion/banana with ice-cold water to break cell walls mechanically.' },
  { id: 1, name: 'Add Detergent', color: '#3b82f6', desc: 'Add SDS (detergent) to lyse cell and nuclear membranes, releasing DNA.' },
  { id: 2, name: 'Add Salt', color: '#f59e0b', desc: 'NaCl disrupts protein-DNA interactions. Proteins precipitate, DNA stays in solution.' },
  { id: 3, name: 'Filter', color: '#8b5cf6', desc: 'Filter through muslin/cheesecloth to remove cell debris. Collect clear filtrate.' },
  { id: 4, name: 'Add Cold Ethanol', color: '#06b6d4', desc: 'Ice-cold ethanol added slowly along tube wall. DNA precipitates as white stringy mass.' },
  { id: 5, name: 'Spool DNA', color: '#f0abfc', desc: 'Spool white DNA strands with a glass rod. Visible DNA extracted successfully!' },
];

const DNATubeScene = ({ stage }: { stage: number }) => {
    const liquidRef = useRef<THREE.MeshPhysicalMaterial>(null);
    const alcoholLayerRef = useRef<THREE.Mesh>(null);
    const spoolRodRef = useRef<THREE.Group>(null);
    
    // Determine bottom liquid parameters based on stage
    const targetColor = useMemo(() => {
        if (stage === 0) return '#86efac'; // Water + Sample (Light green)
        if (stage === 1) return '#3b82f6'; // Detergent added (Blue tint)
        if (stage === 2) return '#fde047'; // Salt added (Yellow tint)
        if (stage >= 3) return '#c4b5fd';  // Filtrate (Purple/Clear)
        return '#86efac';
    }, [stage]);

    const targetHeight = useMemo(() => {
        if (stage <= 2) return 1.5;
        if (stage === 3) return 1.0; // Filtered volume is less
        if (stage >= 4) return 1.0; 
        return 1.5;
    }, [stage]);

    useFrame((state) => {
        // Liquid Color Lerping
        if (liquidRef.current) {
            liquidRef.current.color.lerp(new THREE.Color(targetColor), 0.05);
        }

        // Alcohol Layer Fading in Stage 4+
        if (alcoholLayerRef.current) {
            // Target scale Y = 0.8
            const targetY = stage >= 4 ? 0.8 : 0.01;
            alcoholLayerRef.current.scale.y = THREE.MathUtils.lerp(alcoholLayerRef.current.scale.y, targetY, 0.05);
            alcoholLayerRef.current.position.y = targetHeight - 1 + (alcoholLayerRef.current.scale.y / 2);
            alcoholLayerRef.current.visible = alcoholLayerRef.current.scale.y > 0.05;
        }

        // Spooling rod descending in Stage 5
        if (spoolRodRef.current) {
            const active = stage >= 5;
            const tY = active ? 0 : 3;
            spoolRodRef.current.position.y = THREE.MathUtils.lerp(spoolRodRef.current.position.y, tY, 0.05);
            if (active) {
                // Stirring motion
                spoolRodRef.current.rotation.y += 0.05;
                spoolRodRef.current.position.x = Math.sin(state.clock.elapsedTime * 2) * 0.1;
                spoolRodRef.current.position.z = Math.cos(state.clock.elapsedTime * 2) * 0.1;
            }
        }
    });

    return (
        <group position={[0, -1, 0]}>
            {/* Lab Bench */}
            <Cylinder args={[5, 5, 0.2, 32]} position={[0, -0.1, 0]} receiveShadow>
               <meshPhysicalMaterial color="#0f172a" roughness={0.9} />
            </Cylinder>

            {/* Test Tube Stand */}
            <RoundedBox args={[1.5, 0.2, 1.5]} position={[0, 0.1, 0]} castShadow receiveShadow>
                <meshStandardMaterial color="#475569" />
            </RoundedBox>

            {/* Test Tube */}
            <group position={[0, 1.6, 0]}>
                {/* Glass Tubing */}
                <Cylinder args={[0.4, 0.4, 2.8, 32]} position={[0, 0, 0]} castShadow>
                   <meshPhysicalMaterial color="#ffffff" transmission={0.99} opacity={1} roughness={0} ior={1.5} thickness={0.1} transparent side={THREE.DoubleSide} />
                </Cylinder>
                <Sphere args={[0.4, 32, 16, 0, Math.PI*2, 0, Math.PI/2]} position={[0, -1.4, 0]} rotation={[Math.PI, 0, 0]}>
                   <meshPhysicalMaterial color="#ffffff" transmission={0.99} opacity={1} roughness={0} ior={1.5} thickness={0.1} transparent side={THREE.DoubleSide} />
                </Sphere>
                <Cylinder args={[0.45, 0.45, 0.05, 32]} position={[0, 1.4, 0]}>
                   <meshPhysicalMaterial color="#ffffff" transmission={0.9} roughness={0.1} />
                </Cylinder>

                {/* Base Liquid Filtrate/Sample */}
                <mesh position={[0, -1.4 + targetHeight / 2, 0]}>
                    <cylinderGeometry args={[0.38, 0.38, targetHeight, 32]} />
                    <meshPhysicalMaterial ref={liquidRef} color={targetColor} transmission={0.4} opacity={0.9} transparent roughness={0.2} ior={1.33} />
                </mesh>
                <Sphere args={[0.38, 32, 16, 0, Math.PI*2, 0, Math.PI/2]} position={[0, -1.4, 0]} rotation={[Math.PI, 0, 0]}>
                    <meshPhysicalMaterial color={targetColor} transmission={0.4} opacity={0.9} transparent roughness={0.2} ior={1.33} />
                </Sphere>

                {/* Sample debris (disappears at stage 3 - Filter) */}
                {stage < 3 && <LiquidDebris active={true} height={targetHeight} />}

                {/* Ethanol Layer (Starts Stage 4) */}
                <mesh ref={alcoholLayerRef} position={[0, 0, 0]}>
                    <cylinderGeometry args={[0.38, 0.38, 1, 32]} />
                    <meshPhysicalMaterial color="#cffafe" transmission={0.9} opacity={0.8} transparent roughness={0} ior={1.35} />
                </mesh>

                {/* Interface DNA precipitate (Forms at Stage 4) */}
                {stage >= 4 && <DNAPrecipitate active={stage === 4} spooling={stage === 5} interfaceY={targetHeight - 1} />}

                {/* Spooling Glass Rod (Stage 5) */}
                <group ref={spoolRodRef} position={[0, 3, 0]}>
                    <Cylinder args={[0.04, 0.04, 3, 16]} position={[0, 0, 0]}>
                        <meshPhysicalMaterial color="#ffffff" transmission={0.9} roughness={0} />
                    </Cylinder>
                    {/* DNA Wrapped heavily around rod */}
                    {stage === 5 && (
                         <group position={[0, -1, 0]}>
                            {/* Simulated spooled white mass */}
                            <Sphere args={[0.15, 16, 16]} scale={[1, 2, 1]}>
                                 <meshStandardMaterial color="#fdf4ff" roughness={1} />
                            </Sphere>
                            {[...Array(10)].map((_, i) => (
                                <Cylinder key={i} args={[0.16, 0.16, 0.05, 8]} position={[0, (Math.random()-0.5)*0.8, 0]} rotation={[Math.random(), 0, Math.random()]}>
                                    <meshStandardMaterial color="#ffffff" roughness={1} />
                                </Cylinder>
                            ))}
                         </group>
                    )}
                </group>
            </group>
        </group>
    );
};

// Particles floating in unfiltered sample
const LiquidDebris = ({ active, height }: { active: boolean, height: number }) => {
    const groupRef = useRef<THREE.Group>(null);
    useFrame((state) => {
        if (!groupRef.current || !active) return;
        groupRef.current.children.forEach(c => {
            c.position.y += Math.sin(state.clock.elapsedTime * 2 + c.position.x) * 0.005;
            c.rotation.x += 0.01;
            c.rotation.y += 0.02;
        });
    });

    return (
        <group ref={groupRef} position={[0, -1.4 + height/2, 0]}>
            {[...Array(30)].map((_, i) => (
                <Box key={i} args={[0.02 + Math.random()*0.03, 0.02 + Math.random()*0.03, 0.02 + Math.random()*0.03]} position={[(Math.random()-0.5)*0.6, (Math.random()-0.5)*height, (Math.random()-0.5)*0.6]}>
                    <meshStandardMaterial color="#22c55e" roughness={0.9} />
                </Box>
            ))}
        </group>
    );
};

// DNA strings at the alcohol/filtrate interface
const DNAPrecipitate = ({ active, spooling, interfaceY }: { active: boolean, spooling: boolean, interfaceY: number }) => {
    const groupRef = useRef<THREE.Group>(null);
    useFrame((state) => {
        if (!groupRef.current || !active) return;
        groupRef.current.children.forEach((c, i) => {
            // Gently rise from interface into ethanol
            c.position.y += Math.random() * 0.002;
            c.position.x += Math.sin(state.clock.elapsedTime + i) * 0.002;
            if (c.position.y > interfaceY + 0.6) {
                c.position.y = interfaceY; 
            }
            if (spooling) {
                // Get pulled towards center (rod)
                c.position.x *= 0.95;
                c.position.z *= 0.95;
            }
        });
    });

    return (
        <group ref={groupRef}>
            {[...Array(40)].map((_, i) => {
                // Short squiggly lines for DNA threads
                const pts = [];
                let curr = new THREE.Vector3(0,0,0);
                for(let j=0; j<5; j++) {
                    pts.push(curr.clone());
                    curr.add(new THREE.Vector3((Math.random()-0.5)*0.05, Math.random()*0.05+0.02, (Math.random()-0.5)*0.05));
                }
                const px = (Math.random()-0.5)*0.6;
                const pz = (Math.random()-0.5)*0.6;
                return (
                    <group key={i} position={[px, interfaceY, pz]}>
                        <Line points={pts} color="#ffffff" lineWidth={3} transparent opacity={0.8} />
                    </group>
                );
            })}
        </group>
    );
};


const DNAIsolationLab: React.FC<Props> = ({ hex }) => {
  const [stage, setStage] = useState(0);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!running) return;
    const timer = setTimeout(() => {
      if (stage < STAGES.length - 1) setStage(s => s + 1);
      else { setRunning(false); setDone(true); }
    }, 2500); // 2.5s per stage
    return () => clearTimeout(timer);
  }, [running, stage]);

  const reset = () => { setStage(0); setRunning(false); setDone(false); };

  return (
    <div className="flex flex-col md:flex-row h-full w-full bg-[#050505] overflow-hidden text-slate-200 select-none">
      
      {/* 3D Visualization */}
      <div className="flex-1 flex flex-col relative rounded-2xl overflow-hidden m-4 border border-white/10 shadow-[0_0_50px_rgba(236,72,153,0.05)]">
        <div className="absolute inset-x-0 top-0 p-4 bg-gradient-to-b from-black/80 to-transparent z-10 flex justify-between items-start">
            <div>
                <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-pink-500/20 text-pink-400"><Dna size={18} /></span>
                    Molecular Biology: DNA Extraction
                </h2>
                <p className="text-[11px] font-medium text-slate-400 uppercase tracking-widest mt-1">Chemical Cell Lysis Simulation</p>
            </div>
            {/* Status chip */}
            <div className={`backdrop-blur-md px-3 py-1.5 rounded-xl border text-[10px] font-bold uppercase tracking-widest shadow-inner transition-colors ${done ? 'bg-pink-500/20 border-pink-500/40 text-pink-400' : 'bg-black/40 border-white/10 text-slate-300'}`}>
               {done ? 'DNA Recovered' : running ? 'Extraction Active' : 'Ready'}
            </div>
        </div>

        <Canvas camera={{ position: [0, 2, 7], fov: 40 }}>
            <Environment preset="city" />
            <ambientLight intensity={0.4} />
            <pointLight position={[5, 10, 5]} intensity={1.5} />
            <pointLight position={[-5, 5, -5]} color={STAGES[stage].color} intensity={0.5} />
            
            <DNATubeScene stage={stage} />

            <ContactShadows position={[0, -1.05, 0]} opacity={0.6} scale={15} blur={2.5} far={4} color="#000" />
            <OrbitControls enablePan={true} enableZoom={true} maxPolarAngle={Math.PI / 2 + 0.1} minPolarAngle={0.2} />
        </Canvas>

        {/* Dynamic Data Overlay for current stage */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-black/80 p-4 rounded-xl border backdrop-blur-xl shadow-2xl transition-colors duration-500" style={{ borderColor: `${STAGES[stage].color}50` }}>
            <p className="text-[10px] uppercase font-bold tracking-widest mb-1" style={{ color: STAGES[stage].color }}>{STAGES[stage].name}</p>
            <p className="font-medium text-sm text-slate-200 leading-snug">{STAGES[stage].desc}</p>
        </div>
      </div>

      <div className="w-full md:w-[320px] shrink-0 bg-[#0a0a0a] border-l border-white/10 flex flex-col z-20 shadow-[-10px_0_30px_rgba(0,0,0,0.5)]">
        <div className="p-6 border-b border-white/5">
          <p className="text-xs font-bold uppercase tracking-widest text-pink-500 mb-2 border-b border-pink-500/20 inline-block pb-1">Biology Lab — b7</p>
          <h2 className="text-xl font-bold text-white tracking-tight">DNA Isolation</h2>
        </div>
        
        <div className="flex-1 p-6 space-y-6 overflow-y-auto">
          
          <div className="space-y-2">
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest border-b border-white/10 pb-1 mb-3 hover:text-white transition-colors">Extraction Protocol</h3>
            {STAGES.map((s, i) => (
              <button key={s.id} onClick={() => { setStage(i); setDone(i === STAGES.length - 1); setRunning(false); }}
                className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all ${i === stage ? 'bg-white/10 border-l-[3px]' : 'bg-[#111] border border-white/5 opacity-70 hover:opacity-100 hover:bg-white/5'}`}
                style={{ borderLeftColor: i === stage ? s.color : 'transparent' }}>
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 shadow-inner"
                  style={{ backgroundColor: i <= stage ? s.color + '40' : '#1e293b', color: i <= stage ? s.color : '#64748b' }}>
                  {i < stage ? <CheckCircle size={10} /> : i + 1}
                </div>
                <span className={`text-xs font-bold ${i === stage ? 'text-white' : 'text-slate-400'}`}>{s.name}</span>
              </button>
            ))}
          </div>

          {done && (
            <div className="bg-emerald-900/20 border border-emerald-500/30 p-4 rounded-xl backdrop-blur-md animate-fade-in text-center">
                <Dna size={32} className="mx-auto text-emerald-400 mb-2 drop-shadow-[0_0_10px_#4ade80]" />
                <p className="text-emerald-300 font-bold text-sm">DNA Extraction Successful!</p>
                <p className="text-[10px] text-emerald-100/70 mt-1">High molecular weight genomic DNA recovered via cold ethanol precipitation.</p>
            </div>
          )}

          <div className="flex gap-2 pb-4">
            <button onClick={() => setRunning(r => !r)} disabled={done}
              className="flex-1 py-3.5 rounded-xl font-bold text-white transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2 disabled:opacity-30 disabled:pointer-events-none"
              style={{ backgroundColor: running ? '#dc2626' : hex, boxShadow: `0 8px 20px -8px ${running ? '#dc2626' : hex}` }}>
              {running ? <><Pause size={14} />Pause Extraction</> : <><Play size={14} />Auto-Run Protocol</>}
            </button>
            <button onClick={reset} className="px-4 rounded-xl bg-slate-800 text-slate-400 hover:text-red-400 hover:bg-red-900/40 transition-colors font-bold shadow-inner">
               <RotateCcw size={16} />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DNAIsolationLab;
