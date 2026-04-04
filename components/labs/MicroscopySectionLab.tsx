import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Microscope, ZoomIn, Info } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Sphere, Cylinder, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface Props { hex: string; }

const SECTIONS = [
  { id: 'testis', name: 'T.S. of Testis', color: '#3b82f6', structures: ['Seminiferous tubule','Sertoli cells','Leydig cells','Spermatogonia','Primary spermatocyte','Spermatid','Spermatozoa'] },
  { id: 'ovary', name: 'T.S. of Ovary', color: '#f472b6', structures: ['Primary follicle','Secondary follicle','Graafian follicle','Corpus luteum','Germinal epithelium','Stroma'] },
];

const MicroscopeScene = ({ section, magnification }: any) => {
    // We adjust camera position conceptually via rotation and zoom handled by OrbitControls, 
    // but we can animate scale of the entire scene for magnification effect.
    const sceneRef = useRef<THREE.Group>(null);

    useFrame(() => {
        if (sceneRef.current) {
            const targetScale = magnification / 100;
            sceneRef.current.scale.setScalar(THREE.MathUtils.lerp(sceneRef.current.scale.x, targetScale, 0.05));
        }
    });

    return (
        <group position={[0, 0, 0]}>
            <ambientLight intensity={0.6} />
            <pointLight position={[0, 10, 0]} intensity={1.5} color="#ffffff" distance={20} />
            
            {/* The Microscope Slide Glass (Background) */}
            <Cylinder args={[5, 5, 0.1, 64]} position={[0, -0.5, 0]} receiveShadow>
                <meshPhysicalMaterial color="#ffffff" transmission={0.9} roughness={0.2} transparent opacity={0.6} />
            </Cylinder>

            <group ref={sceneRef}>
                {section === 'testis' ? <TestisSection /> : <OvarySection />}
            </group>
        </group>
    );
};

// 3D Testicular Tissue (Cross Section)
const TestisSection = () => {
    const timeRef = useRef(0);

    // Positions of 4 seminiferous tubules
    const tubules = [
        [0, 0], [-2.5, -1.5], [2.2, -1.8], [-1.8, 2.5], [2, 2.2]
    ];

    return (
        <group>
            {/* Interstitial Tissue (Leydig cells) randomly placed in the gaps */}
            {[...Array(40)].map((_, i) => (
                <Sphere key={`leydig-${i}`} args={[0.08, 8, 8]} position={[(Math.random()-0.5)*4, -0.4, (Math.random()-0.5)*4]}>
                    <meshStandardMaterial color="#f97316" roughness={0.8} />
                </Sphere>
            ))}

            {tubules.map((pos, index) => (
                 <SeminiferousTubule key={index} position={[pos[0], -0.2, pos[1]] as [number,number,number]} />
            ))}
        </group>
    );
};

const SeminiferousTubule = ({ position }: { position: [number,number,number] }) => {
    const groupRef = useRef<THREE.Group>(null);
    useFrame((state) => {
        if (groupRef.current) {
            // Gentle rhythmic pulsing
            const scale = 1 + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.02;
            groupRef.current.scale.setScalar(scale);
        }
    });

    return (
        <group position={position} ref={groupRef}>
            {/* Basement Membrane outer tube */}
            <Cylinder args={[1.5, 1.5, 0.3, 32]} position={[0, 0, 0]}>
                <meshStandardMaterial color="#fef3c7" roughness={1} />
            </Cylinder>
            
            {/* Spermatogonia (Outer ring) */}
            {[...Array(20)].map((_, i) => {
                const angle = (i / 20) * Math.PI * 2;
                return (
                    <Sphere key={`gonia-${i}`} args={[0.1, 8, 8]} position={[Math.cos(angle)*1.35, 0.2, Math.sin(angle)*1.35]}>
                        <meshStandardMaterial color="#7c3aed" roughness={0.6} />
                    </Sphere>
                )
            })}

            {/* Primary Spermatocytes (Middle ring) */}
            {[...Array(15)].map((_, i) => {
                const angle = (i / 15) * Math.PI * 2 + 0.1;
                return (
                    <Sphere key={`cyte-${i}`} args={[0.12, 16, 16]} position={[Math.cos(angle)*1.0, 0.3, Math.sin(angle)*1.0]}>
                        <meshStandardMaterial color="#3b82f6" roughness={0.6} />
                    </Sphere>
                )
            })}

            {/* Spermatids (Inner ring) */}
            {[...Array(24)].map((_, i) => {
                const angle = (i / 24) * Math.PI * 2;
                return (
                    <Sphere key={`tid-${i}`} args={[0.06, 8, 8]} position={[Math.cos(angle)*0.6, 0.2, Math.sin(angle)*0.6]}>
                        <meshStandardMaterial color="#06b6d4" roughness={0.5} />
                    </Sphere>
                )
            })}

            {/* Spermatozoa (Lumen/center) */}
            <group position={[0, 0.2, 0]}>
                {[...Array(12)].map((_, i) => {
                    const angle = (i / 12) * Math.PI * 2;
                    return (
                        <group key={`sperm-${i}`} rotation={[0, -angle, 0]} position={[Math.cos(angle)*0.2, 0, Math.sin(angle)*0.2]}>
                             {/* Head */}
                             <Sphere args={[0.04, 8, 8]} scale={[1, 0.5, 1.5]}><meshStandardMaterial color="#1e40af" /></Sphere>
                             {/* Tail */}
                             <Cylinder args={[0.01, 0.001, 0.4, 4]} rotation={[Math.PI/2, 0, 0]} position={[0, 0, 0.2]}>
                                  <meshStandardMaterial color="#93c5fd" />
                             </Cylinder>
                        </group>
                    )
                })}
            </group>
        </group>
    )
}

// 3D Ovarian Tissue (Cross Section)
const OvarySection = () => {
    return (
        <group>
            {/* Ovarian Stroma (Main body) */}
            <Cylinder args={[4, 4, 0.2, 64]} position={[0, -0.3, 0]}>
                <meshStandardMaterial color="#fce7f3" roughness={1} />
            </Cylinder>

            {/* Germinal Epithelium Ring */}
            <Cylinder args={[4.05, 4.05, 0.25, 64]} position={[0, -0.3, 0]}>
                 <meshStandardMaterial color="#be185d" wireframe />
            </Cylinder>

            {/* Primary Follicles around edge */}
            {[...Array(8)].map((_, i) => {
                 const angle = (i / 8) * Math.PI * 2;
                 return (
                     <group key={`pf-${i}`} position={[Math.cos(angle)*3.5, 0, Math.sin(angle)*3.5]}>
                         <Sphere args={[0.15, 16, 16]} position={[0,0,0]}><meshStandardMaterial color="#ec4899" transparent opacity={0.6} /></Sphere>
                         <Sphere args={[0.06, 8, 8]} position={[0,0,0]}><meshStandardMaterial color="#f472b6" /></Sphere>
                     </group>
                 )
            })}

            {/* Secondary Follicle */}
            <group position={[-2, 0, 1.5]}>
                <Sphere args={[0.4, 32, 32]}><meshStandardMaterial color="#fdf2f8" transparent opacity={0.8} /></Sphere>
                <Sphere args={[0.1, 16, 16]} position={[0.1, 0, 0]}><meshStandardMaterial color="#ec4899" /></Sphere>
            </group>

            {/* Mature Graafian Follicle */}
            <group position={[1.5, 0, -1]}>
                {/* Granulosa cell layer */}
                <Sphere args={[1.2, 32, 32]}><meshStandardMaterial color="#fff0f6" transparent opacity={0.5} roughness={0.2} /></Sphere>
                {/* Antrum (Fluid filled cavity) */}
                <Sphere args={[0.8, 32, 32]} position={[-0.2, 0, 0]}><meshPhysicalMaterial color="#fce7f3" transmission={0.8} roughness={0} /></Sphere>
                {/* Oocyte + Cumulus Oophorus */}
                <group position={[0.7, 0, 0]}>
                     <Sphere args={[0.25, 16, 16]}><meshStandardMaterial color="#f472b6" /></Sphere>
                     <Sphere args={[0.1, 8, 8]}><meshStandardMaterial color="#be185d" /></Sphere>
                </group>
            </group>

            {/* Corpus Luteum */}
            <group position={[-1.5, 0, -2]}>
                <Sphere args={[0.8, 32, 32]} scale={[1, 0.6, 1]}>
                    <meshStandardMaterial color="#fef3c7" roughness={1} />
                </Sphere>
                {/* Lutein cells */}
                {[...Array(20)].map((_, i) => (
                    <Sphere key={`lut-${i}`} args={[0.08, 8, 8]} position={[(Math.random()-0.5)*1, 0.2, (Math.random()-0.5)*1]}>
                        <meshStandardMaterial color="#f59e0b" />
                    </Sphere>
                ))}
            </group>
            
        </group>
    );
};

const MicroscopySectionLab: React.FC<Props> = ({ hex }) => {
  const [section, setSection] = useState<'testis' | 'ovary'>('testis');
  const [magnification, setMagnification] = useState(100);

  const cur = SECTIONS.find(s => s.id === section)!;

  return (
    <div className="flex flex-col md:flex-row h-full w-full bg-[#050505] overflow-hidden text-slate-200 select-none">
      
      {/* 3D Visualization representing Microscope Eyepiece */}
      <div className="flex-1 flex flex-col relative rounded-2xl overflow-hidden m-4 border border-white/10 shadow-[0_0_50px_rgba(236,72,153,0.05)] bg-gradient-radial from-slate-900 to-black">
        <div className="absolute inset-x-0 top-0 p-4 z-10 flex justify-between items-start pointer-events-none">
            <div>
                <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-pink-500/20 text-pink-400"><Microscope size={18} /></span>
                    Histology Section
                </h2>
                <p className="text-[11px] font-medium text-slate-400 uppercase tracking-widest mt-1">3D Volumetric Microscopic View</p>
            </div>
            
            <div className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-[10px] font-bold uppercase tracking-widest shadow-inner text-white flex items-center gap-2">
               <ZoomIn size={12} className={section === 'testis' ? 'text-blue-400' : 'text-pink-400'} /> {magnification}x MAG
            </div>
        </div>

        {/* Circular Vignette to simulate microscope viewpoint */}
        <div className="absolute inset-0 z-0 pointer-events-none" style={{ background: 'radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.9) 80%, black 100%)' }} />

        <Canvas camera={{ position: [0, 8, 0.1] }}>
            <Environment preset="studio" />
            <MicroscopeScene section={section} magnification={magnification} />
            <OrbitControls enablePan={true} enableZoom={false} maxPolarAngle={0.5} minPolarAngle={0} />
        </Canvas>

        {/* Controls Overlay inside viewport */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[80%] max-w-sm bg-black/60 backdrop-blur-xl p-4 rounded-2xl border border-white/10 shadow-2xl z-20">
             <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
                 <span>Zoom Level</span>
                 <span className="font-mono text-white bg-white/10 px-2 py-0.5 rounded">{magnification}×</span>
             </div>
             <input type="range" min={40} max={400} step={10} value={magnification} onChange={e => setMagnification(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-full appearance-none cursor-pointer hover:bg-slate-700 transition-colors" style={{ accentColor: cur.color }} />
             <div className="flex justify-between text-[9px] text-slate-500 font-bold mt-1.5 px-1"><span>40×</span><span>100×</span><span>400×</span></div>
        </div>
      </div>

      {/* Control Panel */}
      <div className="w-full md:w-[320px] shrink-0 bg-[#0a0a0a] border-l border-white/10 flex flex-col z-20 shadow-[-10px_0_30px_rgba(0,0,0,0.5)]">
        <div className="p-6 border-b border-white/5">
          <p className="text-xs font-bold uppercase tracking-widest text-pink-500 mb-2 border-b border-pink-500/20 inline-block pb-1">Biology Lab — b13</p>
          <h2 className="text-xl font-bold text-white tracking-tight">Tissue Histology</h2>
        </div>
        
        <div className="flex-1 p-6 space-y-6 overflow-y-auto custom-scrollbar">
          
          <div className="bg-[#111] border border-white/5 p-4 rounded-xl shadow-inner">
            <h3 className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mb-3">Load Slide</h3>
            <div className="grid grid-cols-2 gap-2">
              {SECTIONS.map(s => (
                <button key={s.id} onClick={() => setSection(s.id as any)}
                  className={`py-3 flex flex-col items-center justify-center gap-1 rounded-xl text-xs font-bold transition-all shadow-lg ${section === s.id ? 'text-white border' : 'bg-slate-800/50 text-slate-400 border border-white/5 hover:bg-slate-800'}`}
                  style={section === s.id ? { backgroundColor: s.color + '30', borderColor: s.color, boxShadow: `0 0 20px ${s.color}20` } : {}}>
                  <span className="w-2 h-2 rounded-full mb-1" style={{ backgroundColor: s.color }} />
                  {s.id === 'testis' ? 'Testis T.S.' : 'Ovary T.S.'}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-900/50 border border-white/10 rounded-xl p-5 backdrop-blur-md">
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-white/5">
                <Info size={14} style={{ color: cur.color }} />
                <h3 className="text-[11px] uppercase font-bold tracking-widest text-white">Identifiable Structures</h3>
            </div>
            
            <div className="space-y-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
              {cur.structures.map((s, i) => (
                <div key={s} className="flex items-start gap-3 p-2 rounded-lg bg-black/40 border border-white/5 hover:bg-white/5 transition-colors">
                  <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-[9px] font-bold" style={{ backgroundColor: cur.color, color: '#000' }}>
                     {i + 1}
                  </div>
                  <div>
                      <span className="text-xs font-bold text-slate-200 block">{s}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {section === 'testis' && (
            <div className="bg-blue-900/10 border border-blue-500/20 p-4 rounded-xl">
              <p className="text-blue-400 font-bold text-[10px] uppercase mb-2">Cell Maturation Pathway</p>
              <div className="text-[10px] text-blue-200/70 font-medium leading-relaxed space-y-1">
                 <p>1. <span className="text-purple-400">Spermatogonia</span> (Outer layer, 2n)</p>
                 <p>2. <span className="text-blue-500">Primary Spermatocytes</span> (Meiosis I)</p>
                 <p>3. <span className="text-cyan-400">Spermatids</span> (Inner layer, n)</p>
                 <p>4. <span className="text-indigo-400">Spermatozoa</span> (Lumen, flagellated)</p>
              </div>
            </div>
          )}

          {section === 'ovary' && (
            <div className="bg-pink-900/10 border border-pink-500/20 p-4 rounded-xl">
              <p className="text-pink-400 font-bold text-[10px] uppercase mb-2">Follicular Development</p>
              <p className="text-[10px] text-pink-200/70 font-medium leading-relaxed">
                 Oocytes develop within follicles. A primary follicle matures into a large <span className="text-white font-bold">Graafian follicle</span> with a fluid-filled antrum. After ovulation, it forms the <span className="text-yellow-400 font-bold">Corpus luteum</span>.
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default MicroscopySectionLab;
