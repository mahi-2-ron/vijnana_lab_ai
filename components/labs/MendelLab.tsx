import React, { useState, useRef, useEffect, useMemo } from 'react';
import { RotateCcw, Sprout, TestTube, Leaf } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, RoundedBox, Cylinder, Sphere, Float } from '@react-three/drei';
import * as THREE from 'three';

interface Props { hex: string; }

type Genotype = 'TT' | 'Tt' | 'tt';
type Cross = { parent1: Genotype; parent2: Genotype; name: string; };

const CROSSES: Cross[] = [
  { parent1: 'TT', parent2: 'tt', name: 'True-breeding cross (F1)' },
  { parent1: 'Tt', parent2: 'Tt', name: 'F1 × F1 (F2 generation)' },
  { parent1: 'Tt', parent2: 'tt', name: 'Test cross' },
  { parent1: 'TT', parent2: 'TT', name: 'True-breeding × True-breeding' },
];

function punnettSquare(p1: Genotype, p2: Genotype): Genotype[] {
  const a1 = [p1[0], p1[1]]; 
  const a2 = [p2[0], p2[1]]; 
  return a2.flatMap(a => a1.map(b => [a, b].sort((x, y) => x === 'T' ? -1 : 1).join('') as Genotype));
}

function phenotype(g: string): string {
  return g[0] === 'T' ? 'Tall' : 'Dwarf';
}

const PlantNode = ({ genotype, position, isPlanted }: { genotype: Genotype, position: [number,number,number], isPlanted: boolean }) => {
    const isTall = genotype[0] === 'T';
    const targetScale = isTall ? 2.5 : 0.8;
    const groupRef = useRef<THREE.Group>(null);

    useFrame(() => {
        if (groupRef.current) {
            const currentScale = groupRef.current.scale.y;
            const target = isPlanted ? targetScale : 0.001; // Scale down if not planted to hide
            groupRef.current.scale.y = THREE.MathUtils.lerp(currentScale, target, 0.03);
            groupRef.current.scale.x = THREE.MathUtils.lerp(currentScale, isPlanted ? 1 : 0.001, 0.04);
            groupRef.current.scale.z = THREE.MathUtils.lerp(currentScale, isPlanted ? 1 : 0.001, 0.04);
        }
    });

    return (
        <group position={position}>
            {/* Clay Pot */}
            <Cylinder args={[0.4, 0.3, 0.6, 16]} position={[0, 0.3, 0]} castShadow receiveShadow>
                <meshStandardMaterial color="#b45309" roughness={0.9} />
            </Cylinder>
            <Cylinder args={[0.45, 0.45, 0.1, 16]} position={[0, 0.6, 0]} castShadow>
                <meshStandardMaterial color="#92400e" roughness={0.9} />
            </Cylinder>
            {/* Soil */}
            <Cylinder args={[0.38, 0.38, 0.1, 16]} position={[0, 0.55, 0]} receiveShadow>
                <meshStandardMaterial color="#422006" roughness={1} />
            </Cylinder>

            {/* Growing Plant */}
            <group position={[0, 0.6, 0]} ref={groupRef} scale={[0.001, 0.001, 0.001]}>
                {/* Stem */}
                <Cylinder args={[0.04, 0.06, 1, 16]} position={[0, 0.5, 0]} castShadow>
                    <meshStandardMaterial color="#4ade80" />
                </Cylinder>
                {/* Leaves */}
                <group position={[0, 0.4, 0]} rotation={[0, 0, Math.PI/4]}>
                    <Sphere args={[0.2, 16, 16, 0, Math.PI, 0, Math.PI/2]} scale={[1, 0.1, 2]} castShadow><meshStandardMaterial color="#22c55e" side={THREE.DoubleSide}/></Sphere>
                </group>
                <group position={[0, 0.7, 0]} rotation={[0, Math.PI, Math.PI/4]}>
                    <Sphere args={[0.2, 16, 16, 0, Math.PI, 0, Math.PI/2]} scale={[1, 0.1, 2]} castShadow><meshStandardMaterial color="#22c55e" side={THREE.DoubleSide}/></Sphere>
                </group>
                {/* Extra leaves for Tall */}
                <group position={[0, 0.9, 0]} rotation={[0, Math.PI/2, Math.PI/6]}>
                    <Sphere args={[0.15, 16, 16, 0, Math.PI, 0, Math.PI/2]} scale={[1, 0.1, 2]} castShadow><meshStandardMaterial color="#16a34a" side={THREE.DoubleSide}/></Sphere>
                </group>
                
                {/* Tiny flower to signify pea plant */}
                {isTall && (
                    <group position={[0.1, 1, 0]} scale={0.4}>
                        <Sphere args={[0.1, 8, 8]} position={[0, 0, 0]}><meshStandardMaterial color="#f0abfc" /></Sphere>
                        <Sphere args={[0.1, 8, 8]} position={[0.1, 0.1, 0]}><meshStandardMaterial color="#fdf4ff" /></Sphere>
                        <Sphere args={[0.1, 8, 8]} position={[-0.1, 0.1, 0]}><meshStandardMaterial color="#fdf4ff" /></Sphere>
                    </group>
                )}
            </group>
        </group>
    );
}

const MendelScene = ({ offspring, isPlanted }: { offspring: Genotype[], isPlanted: boolean }) => {
    // 4 pots in a 2x2 grid
    const pos = [
        [-1, 0, -1], [1, 0, -1],
        [-1, 0, 1], [1, 0, 1]
    ];

    return (
        <group position={[0, -1.5, 0]}>
            <ambientLight intensity={0.5} />
            <pointLight position={[5, 10, 5]} intensity={1.5} color="#fef08a" />
            <pointLight position={[-5, 5, -5]} color="#4ade80" intensity={0.5} />

            {/* Greenhouse Table */}
            <RoundedBox args={[6, 0.2, 5]} position={[0, -0.1, 0]} castShadow receiveShadow>
                <meshStandardMaterial color="#334155" roughness={0.8} />
            </RoundedBox>
            <Cylinder args={[0.2, 0.2, 2, 8]} position={[-2.5, -1, -2]}><meshStandardMaterial color="#1e293b" /></Cylinder>
            <Cylinder args={[0.2, 0.2, 2, 8]} position={[2.5, -1, -2]}><meshStandardMaterial color="#1e293b" /></Cylinder>
            <Cylinder args={[0.2, 0.2, 2, 8]} position={[-2.5, -1, 2]}><meshStandardMaterial color="#1e293b" /></Cylinder>
            <Cylinder args={[0.2, 0.2, 2, 8]} position={[2.5, -1, 2]}><meshStandardMaterial color="#1e293b" /></Cylinder>

            {offspring.map((g, i) => (
                <PlantNode key={i} genotype={g} position={pos[i] as [number,number,number]} isPlanted={isPlanted} />
            ))}
        </group>
    );
}


const MendelLab: React.FC<Props> = ({ hex }) => {
  const [selectedCross, setSelectedCross] = useState<Cross>(CROSSES[0]);
  const [isPlanted, setIsPlanted] = useState(false);

  const p1 = selectedCross.parent1;
  const p2 = selectedCross.parent2;
  const offspring = punnettSquare(p1, p2);

  const counts = offspring.reduce((acc, g) => { acc[g] = (acc[g] || 0) + 1; return acc; }, {} as Record<string, number>);
  const tallCount = offspring.filter(g => g[0] === 'T').length;

  const handlePlant = () => {
      setIsPlanted(false);
      setTimeout(() => setIsPlanted(true), 100);
  }

  return (
    <div className="flex flex-col md:flex-row h-full w-full bg-[#050505] overflow-hidden text-slate-200 select-none">
      
      {/* 3D Visualization */}
      <div className="flex-1 flex flex-col relative rounded-2xl overflow-hidden m-4 border border-white/10 shadow-[0_0_50px_rgba(168,85,247,0.05)]">
        <div className="absolute inset-x-0 top-0 p-4 bg-gradient-to-b from-black/80 to-transparent z-10 flex justify-between items-start">
            <div>
                <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-purple-500/20 text-purple-400"><Leaf size={18} /></span>
                    Mendelian Inheritance Simulation
                </h2>
                <p className="text-[11px] font-medium text-slate-400 uppercase tracking-widest mt-1">Pisum sativum (Pea Plant) Phenotypes</p>
            </div>
            {/* View Mode Status */}
            <div className={`backdrop-blur-md px-3 py-1.5 rounded-xl border text-[10px] font-bold uppercase tracking-widest shadow-inner ${isPlanted ? 'bg-green-500/20 border-green-500/40 text-green-400' : 'bg-black/40 border-white/10 text-slate-300'}`}>
               {isPlanted ? 'F1 Generation Matured' : 'Greenhouse Ready'}
            </div>
        </div>

        <Canvas camera={{ position: [0, 4, 8], fov: 45 }}>
            <Environment preset="park" />
            <MendelScene offspring={offspring} isPlanted={isPlanted} />
            <ContactShadows position={[0, -1.6, 0]} opacity={0.7} scale={15} blur={2.5} far={4} color="#000" />
            <OrbitControls enablePan={true} enableZoom={true} maxPolarAngle={Math.PI / 2 - 0.1} />
        </Canvas>

        {/* 2D HUD: Punnett Square Overlay */}
        <div className="absolute bottom-6 left-6 p-4 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 shadow-2xl animate-fade-in">
             <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-3 border-b border-white/10 pb-1">Theoretical Genotypes (Punnett)</p>
             <div className="grid grid-cols-3 gap-1 w-48 text-center text-xs font-bold">
                 <div className="p-1 text-slate-500">P2 \ P1</div>
                 <div className="bg-purple-900/40 p-1 rounded text-purple-300 border border-purple-500/20">{p1[0]}</div>
                 <div className="bg-purple-900/40 p-1 rounded text-purple-300 border border-purple-500/20">{p1[1]}</div>
                 
                 <div className="bg-purple-900/40 p-1 rounded text-purple-300 flex items-center justify-center border border-purple-500/20">{p2[0]}</div>
                 <div className={`p-2 rounded border ${offspring[0][0] === 'T' ? 'bg-green-900/40 border-green-500/30 text-green-300' : 'bg-slate-800 border-white/10 text-slate-400'}`}>{offspring[0]}</div>
                 <div className={`p-2 rounded border ${offspring[1][0] === 'T' ? 'bg-green-900/40 border-green-500/30 text-green-300' : 'bg-slate-800 border-white/10 text-slate-400'}`}>{offspring[1]}</div>

                 <div className="bg-purple-900/40 p-1 rounded text-purple-300 flex items-center justify-center border border-purple-500/20">{p2[1]}</div>
                 <div className={`p-2 rounded border ${offspring[2][0] === 'T' ? 'bg-green-900/40 border-green-500/30 text-green-300' : 'bg-slate-800 border-white/10 text-slate-400'}`}>{offspring[2]}</div>
                 <div className={`p-2 rounded border ${offspring[3][0] === 'T' ? 'bg-green-900/40 border-green-500/30 text-green-300' : 'bg-slate-800 border-white/10 text-slate-400'}`}>{offspring[3]}</div>
             </div>
        </div>

      </div>

      {/* Control Panel */}
      <div className="w-full md:w-[320px] shrink-0 bg-[#0a0a0a] border-l border-white/10 flex flex-col z-20 shadow-[-10px_0_30px_rgba(0,0,0,0.5)]">
        <div className="p-6 border-b border-white/5">
          <p className="text-xs font-bold uppercase tracking-widest text-purple-500 mb-2 border-b border-purple-500/20 inline-block pb-1">Biology Lab — b8</p>
          <h2 className="text-xl font-bold text-white tracking-tight">Mendelian Genetics</h2>
        </div>
        
        <div className="flex-1 p-6 space-y-6 overflow-y-auto">
          
          <div className="bg-purple-900/10 border border-purple-500/20 p-4 rounded-xl backdrop-blur-md">
            <p className="text-purple-200 text-xs leading-relaxed">
               Select parent genotypes to perform a cross. Seedlings will literally inherit traits and express physical phenotypes (Tall or Dwarf).
            </p>
          </div>

          <div>
             <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">Experimental Cross Setup</h3>
             <div className="space-y-2">
                 {CROSSES.map(c => (
                     <button key={c.name} onClick={() => { setSelectedCross(c); setIsPlanted(false); }}
                       className={`w-full p-3 flex flex-col items-start rounded-xl text-left transition-all ${selectedCross.name === c.name ? 'border-purple-500 bg-purple-900/30 shadow-inner' : 'border-white/10 bg-[#111] hover:border-purple-500/50'}`}
                       style={{ border: `1px solid ${selectedCross.name === c.name ? '#a855f7' : 'rgba(255,255,255,0.05)'}` }}>
                       <span className={`font-bold text-lg leading-tight ${selectedCross.name === c.name ? 'text-purple-300' : 'text-slate-200'}`}>{c.parent1} × {c.parent2}</span>
                       <span className="text-[10px] font-medium text-slate-400 mt-1">{c.name}</span>
                     </button>
                 ))}
             </div>
          </div>

          <div className="bg-[#111] p-4 rounded-xl border border-white/5 shadow-inner">
             <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 border-b border-white/10 pb-1">Genetic Output Ratio</p>
             <div className="flex justify-between items-center bg-black/40 p-2 rounded-lg border border-white/5 mb-2">
                 <span className="text-xs font-bold text-slate-400">Phenotype (T : D)</span>
                 <span className="text-sm font-mono font-bold text-green-400">{tallCount} : {4 - tallCount}</span>
             </div>
             <div className="flex justify-between items-center bg-black/40 p-2 rounded-lg border border-white/5">
                 <span className="text-xs font-bold text-slate-400">Genotype (TT:Tt:tt)</span>
                 <span className="text-sm font-mono font-bold text-purple-400">{counts['TT']||0} : {counts['Tt']||0} : {counts['tt']||0}</span>
             </div>
          </div>

          <button onClick={handlePlant}
            className="w-full py-4 flex items-center justify-center gap-2 rounded-xl font-bold text-white transition-all shadow-lg shadow-purple-900/40 active:scale-95"
            style={{ backgroundColor: hex }}>
            <Sprout size={16} /> Germinate Seeds
          </button>

        </div>
      </div>
    </div>
  );
};

export default MendelLab;
