import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { RotateCcw, Play, Maximize, MousePointer2 } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Plane, Cylinder, Sphere, Cone } from '@react-three/drei';
import * as THREE from 'three';

interface Props { hex: string; }

// Plant Population Density — quadrat sampling simulation in 3D
const TERRAIN_SIZE = 10; // 10x10 meters

const FieldScene = ({ plants, quadratPos, quadratSize }: any) => {
    const quadratRef = useRef<THREE.Group>(null);

    useFrame(() => {
        if (quadratRef.current) {
             const [tx, tz] = quadratPos;
             // Lerp quadrat to target position
             quadratRef.current.position.x = THREE.MathUtils.lerp(quadratRef.current.position.x, tx, 0.1);
             quadratRef.current.position.z = THREE.MathUtils.lerp(quadratRef.current.position.z, tz, 0.1);
        }
    });

    return (
        <group position={[0, -0.5, 0]}>
            <ambientLight intensity={0.4} />
            <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow shadow-mapSize={[1024, 1024]} shadow-normalBias={0.05} />
            
            {/* Terrain Base */}
            <Cylinder args={[TERRAIN_SIZE/1.8, TERRAIN_SIZE/1.8, 0.5, 64]} position={[0, -0.25, 0]} receiveShadow>
                <meshStandardMaterial color="#3f1d0b" roughness={1} />
            </Cylinder>
            
            {/* The clickable grassy surface */}
            <Plane args={[TERRAIN_SIZE, TERRAIN_SIZE]} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow />

            {/* Render all plants */}
            {plants.map((p: any, i: number) => (
                <PlantNode key={i} data={p} />
            ))}

            {/* The PVC Quadrat Frame */}
            <group ref={quadratRef} position={[quadratPos[0], 0.05, quadratPos[1]]}>
                 {/* Visual Frame */}
                 <Cylinder args={[0.02, 0.02, quadratSize, 8]} rotation={[0, 0, Math.PI/2]} position={[0, 0, quadratSize/2]} castShadow><meshStandardMaterial color="#fbbf24" /></Cylinder>
                 <Cylinder args={[0.02, 0.02, quadratSize, 8]} rotation={[0, 0, Math.PI/2]} position={[0, 0, -quadratSize/2]} castShadow><meshStandardMaterial color="#fbbf24" /></Cylinder>
                 <Cylinder args={[0.02, 0.02, quadratSize, 8]} rotation={[Math.PI/2, 0, 0]} position={[quadratSize/2, 0, 0]} castShadow><meshStandardMaterial color="#fbbf24" /></Cylinder>
                 <Cylinder args={[0.02, 0.02, quadratSize, 8]} rotation={[Math.PI/2, 0, 0]} position={[-quadratSize/2, 0, 0]} castShadow><meshStandardMaterial color="#fbbf24" /></Cylinder>
                 
                 {/* Inner highlighted area strictly for visual flair */}
                 <Plane args={[quadratSize, quadratSize]} rotation={[-Math.PI/2, 0, 0]} position={[0, -0.04, 0]}>
                      <meshStandardMaterial color="#fbbf24" transparent opacity={0.15} depthWrite={false} />
                 </Plane>
            </group>

        </group>
    );
};

const PlantNode = React.memo(({ data }: { data: any }) => {
    // 0 = small bush, 1 = tall grass, 2 = flower
    if (data.type === 0) {
        return (
            <group position={[data.x, 0, data.z]} rotation={[0, data.rot, 0]} scale={data.scale}>
                 <Sphere args={[0.15, 8, 8, 0, Math.PI*2, 0, Math.PI/2]} position={[0, 0, 0]} castShadow receiveShadow>
                     <meshStandardMaterial color="#16a34a" roughness={0.9} />
                 </Sphere>
            </group>
        );
    } else if (data.type === 1) {
        return (
             <group position={[data.x, 0, data.z]} rotation={[0, data.rot, 0]} scale={data.scale}>
                 <Cone args={[0.05, 0.4, 4]} position={[0, 0.2, 0]} castShadow receiveShadow>
                     <meshStandardMaterial color="#4ade80" roughness={0.8} />
                 </Cone>
             </group>
        );
    } else {
         return (
              <group position={[data.x, 0, data.z]} rotation={[0, data.rot, 0]} scale={data.scale}>
                  <Cylinder args={[0.01, 0.01, 0.3, 4]} position={[0, 0.15, 0]} castShadow><meshStandardMaterial color="#22c55e" /></Cylinder>
                  <Sphere args={[0.06, 8, 8]} position={[0, 0.3, 0]} castShadow><meshStandardMaterial color="#fbbf24" /></Sphere>
              </group>
         );
    }
});

const PlantPopulationLab: React.FC<Props> = ({ hex }) => {
  const [quadratSize, setQuadratSize] = useState(2); // 2x2 meters mapping (scale 1 unit = 1 meter)
  const [quadratPos, setQuadratPos] = useState<[number, number]>([0, 0]);
  const [samples, setSamples] = useState<{x:number, z:number, count:number}[]>([]);

  // Generate dense realistic field 
  // ~300 plants across 10x10 meters
  const plants = useMemo(() => {
       const arr = [];
       for(let i=0; i<300; i++) {
           arr.push({
               x: (Math.random() - 0.5) * (TERRAIN_SIZE - 1),
               z: (Math.random() - 0.5) * (TERRAIN_SIZE - 1),
               type: Math.floor(Math.random() * 3),
               scale: 0.8 + Math.random() * 0.5,
               rot: Math.random() * Math.PI,
           });
       }
       return arr;
  }, []);

  // Calculate plants currently inside quadrat
  const currentCount = useMemo(() => {
       const [qx, qz] = quadratPos;
       const half = quadratSize / 2;
       return plants.filter(p => p.x >= qx - half && p.x <= qx + half && p.z >= qz - half && p.z <= qz + half).length;
  }, [quadratPos, quadratSize, plants]);

  const avgDensity = samples.length > 0
    ? samples.reduce((a, b) => a + b.count, 0) / samples.length / (quadratSize * quadratSize)
    : currentCount / (quadratSize * quadratSize);

  const logSample = () => {
    setSamples(prev => [...prev, { x: quadratPos[0], z: quadratPos[1], count: currentCount }]);
  };

  const handleFieldClick = (e: any) => {
       // Stop propagation so orbit controls don't weird out 
       e.stopPropagation();
       // e.point gives the exact 3D coordinate clicked
       if (e.point) {
           // Clamp to within field boundaries so quadrat doesn't hang off
           const half = quadratSize / 2;
           const range = (TERRAIN_SIZE / 1.8) - half; // Approx bounds
           const cx = Math.max(-range, Math.min(range, e.point.x));
           const cz = Math.max(-range, Math.min(range, e.point.z));
           setQuadratPos([cx, cz]);
       }
  };

  return (
    <div className="flex flex-col md:flex-row h-full w-full bg-[#050505] overflow-hidden text-slate-200 select-none">
      
      {/* 3D Visualization */}
      <div className="flex-1 flex flex-col relative rounded-2xl overflow-hidden m-4 border border-white/10 shadow-[0_0_50px_rgba(34,197,94,0.05)]">
        <div className="absolute inset-x-0 top-0 p-4 bg-gradient-to-b from-black/80 to-transparent z-10 flex justify-between items-start pointer-events-none">
            <div>
                <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-lime-500/20 text-lime-400"><Maximize size={18} /></span>
                    Ecological Sampling (Quadrat Method)
                </h2>
                <p className="text-[11px] font-medium text-slate-400 uppercase tracking-widest mt-1">3D Terrain Population Density Analysis</p>
            </div>
            <div className="bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-[10px] font-bold uppercase tracking-widest shadow-inner text-amber-400 flex items-center gap-2">
               <MousePointer2 size={12} /> Click Terrain to Sample
            </div>
        </div>

        <Canvas camera={{ position: [0, 8, 8], fov: 45 }}>
            <Environment preset="forest" />
            <FieldScene plants={plants} quadratPos={quadratPos} quadratSize={quadratSize} />
            
            {/* Invisible clickable plane strictly for interaction events */}
            <Plane args={[TERRAIN_SIZE, TERRAIN_SIZE]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.49, 0]} onClick={handleFieldClick}>
                <meshBasicMaterial visible={false} />
            </Plane>

            <OrbitControls enablePan={false} enableZoom={true} maxPolarAngle={Math.PI / 2 - 0.1} minPolarAngle={0.1} maxDistance={15} minDistance={3} />
        </Canvas>

        {/* HUD showing current quadrat stats live */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-xl p-3 px-6 rounded-full border border-white/10 flex items-center gap-6 shadow-2xl pointer-events-none">
             <div className="text-center">
                 <p className="text-[9px] uppercase font-bold text-slate-400 tracking-widest mb-0.5">Quadrat Area</p>
                 <p className="font-mono text-sm font-bold text-amber-400">{quadratSize * quadratSize} m²</p>
             </div>
             <div className="w-px h-6 bg-white/10" />
             <div className="text-center">
                 <p className="text-[9px] uppercase font-bold text-slate-400 tracking-widest mb-0.5">Live Count</p>
                 <p className="font-mono text-lg font-bold text-white leading-none">{currentCount}</p>
             </div>
        </div>
      </div>

      {/* Control Panel */}
      <div className="w-full md:w-[320px] shrink-0 bg-[#0a0a0a] border-l border-white/10 flex flex-col z-20 shadow-[-10px_0_30px_rgba(0,0,0,0.5)]">
        <div className="p-6 border-b border-white/5">
          <p className="text-xs font-bold uppercase tracking-widest text-lime-500 mb-2 border-b border-lime-500/20 inline-block pb-1">Biology Lab — b10</p>
          <h2 className="text-xl font-bold text-white tracking-tight">Plant Population</h2>
        </div>
        
        <div className="flex-1 p-6 space-y-6 overflow-y-auto">
          
          <div className="bg-lime-900/10 border border-lime-500/20 p-4 rounded-xl backdrop-blur-md">
            <p className="text-lime-100/80 text-xs leading-relaxed">
               Estimate the density of a population by picking random spots using a square quadrat. A larger sample size yields higher accuracy.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#111] border border-white/5 shadow-inner rounded-xl p-4 flex flex-col items-center justify-center">
              <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1 text-center">Local Count</div>
              <div className="font-mono font-bold text-3xl text-amber-400">{currentCount}</div>
            </div>
            <div className="bg-[#111] border border-white/5 shadow-inner rounded-xl p-4 flex flex-col items-center justify-center">
              <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1 text-center">Est. Density</div>
              <div className="font-mono font-bold text-2xl text-lime-400">{avgDensity.toFixed(1)}</div>
              <div className="text-[9px] text-slate-600 font-bold uppercase tracking-widest mt-1">plants/m²</div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-slate-400">
               <span>Quadrat Size</span>
               <span className="font-mono text-amber-400 bg-amber-900/30 px-2 py-0.5 rounded border border-amber-500/20">{quadratSize} × {quadratSize}m</span>
            </div>
            <input type="range" min={1} max={4} step={0.5} value={quadratSize} onChange={e => {
                const s = Number(e.target.value);
                setQuadratSize(s);
                // Clamp position so it logic bounds properly
                const half = s/2;
                const range = (TERRAIN_SIZE / 1.8) - half;
                setQuadratPos(p => [Math.max(-range, Math.min(range, p[0])), Math.max(-range, Math.min(range, p[1]))]);
            }} className="w-full h-1.5 bg-slate-800 rounded-full appearance-none cursor-pointer accent-lime-500" />
          </div>

          <button onClick={logSample}
            className="w-full py-4 rounded-xl font-bold text-white transition-all shadow-lg shadow-lime-900/20 active:scale-95 flex items-center justify-center gap-2 bg-gradient-to-r from-lime-600 to-emerald-600 hover:from-lime-500 hover:to-emerald-500">
            <Play size={16} /> Log Sample Data ({samples.length + 1})
          </button>

          {samples.length > 0 && (
            <div className="bg-[#111] border border-white/5 rounded-xl p-4 shadow-inner">
              <div className="flex justify-between items-center mb-3 border-b border-white/10 pb-2">
                 <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Data Registration</p>
                 <span className="text-[10px] font-mono text-slate-500">{samples.length} logs</span>
              </div>
              <div className="space-y-2 max-h-32 overflow-y-auto pr-2 custom-scrollbar">
                {samples.map((s, i) => (
                  <div key={i} className="flex justify-between items-center text-xs p-2 rounded bg-black/40 border border-white/5">
                    <span className="text-slate-400 font-bold">Sample {i + 1}</span>
                    <span className="text-lime-400 font-mono font-bold tracking-tight">{s.count} <span className="text-[10px] text-slate-600">→</span> {(s.count / (quadratSize * quadratSize)).toFixed(1)}/m²</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-white/10 flex justify-between items-center text-xs">
                <span className="text-slate-300 font-bold text-[10px] uppercase tracking-widest">Aggregated Density</span>
                <span className="text-lime-400 font-mono font-bold text-sm bg-lime-900/30 px-2 py-1 rounded border border-lime-500/20">{avgDensity.toFixed(2)} /m²</span>
              </div>
            </div>
          )}

          <button onClick={() => setSamples([])} disabled={samples.length===0} className="w-full py-3 rounded-xl bg-slate-800 text-slate-400 font-bold text-xs flex items-center justify-center gap-2 hover:bg-red-900/30 hover:text-red-400 transition-colors disabled:opacity-50">
            <RotateCcw size={14} /> Clear Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlantPopulationLab;
