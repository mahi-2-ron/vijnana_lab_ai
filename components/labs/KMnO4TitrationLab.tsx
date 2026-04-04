import React, { useRef, useEffect, useState } from 'react';
import { RotateCcw, Droplets } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Html } from '@react-three/drei';
import * as THREE from 'three';
import DraggableSlider from './DraggableSlider';

interface Props { hex: string; }

function getKMnO4Color(volAdded: number, vEq: number): string {
  const frac = volAdded / vEq;
  if (frac < 0.9) return '#ffffff'; // colorless wait what? Liquid should be transparent or pale. We'll use color.
  if (frac < 0.98) return '#fbcfe8'; // faint pink
  if (frac <= 1.0) return '#f472b6'; // pink endpoint
  return '#9333ea'; // purple excess
}

const TitrationScene = ({ volAdded, running, endpointReached, vEq }: any) => {
  const dropRef = useRef<THREE.Mesh>(null);
  const flaskLiquidRef = useRef<THREE.Mesh>(null);
  
  // Burette fills from y=1 to y=6 (total height = 5)
  // Max vol = 30. Remaining vol = 30 - volAdded
  const fillFrac = (30 - volAdded) / 30;
  
  useFrame(({ clock }) => {
    if (running && dropRef.current && volAdded < 30) {
      // Animate drop falling from burette (y=1) to flask (y=-2)
      const t = clock.elapsedTime * 4;
      dropRef.current.position.y = 1 - (t % 1) * 3;
      dropRef.current.visible = true;
    } else if (dropRef.current) {
      dropRef.current.visible = false;
    }

    if (flaskLiquidRef.current && endpointReached) {
      // Swirl / Bubble effect at endpoint
      flaskLiquidRef.current.rotation.y = clock.elapsedTime * 2;
    }
  });

  const flaskLiquidColor = getKMnO4Color(volAdded, vEq);

  return (
    <group position={[0, -1, 0]}>
      {/* Burette Glass */}
      <mesh position={[0, 3.5, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 5, 16]} />
        <meshPhysicalMaterial transmission={0.9} thickness={0.1} roughness={0} color="#e0f2fe" transparent opacity={0.6} />
      </mesh>
      
      {/* Burette Liquid (KMnO4 is Dark Purple) */}
      <mesh position={[0, 1 + fillFrac * 2.5, 0]}>
        {/* Centers around y=1, total height is 5 * fillFrac */}
        <cylinderGeometry args={[0.18, 0.18, 5 * fillFrac, 16]} />
        <meshPhysicalMaterial transmission={0.5} roughness={0} color="#7e22ce" />
      </mesh>

      {/* Stopcock */}
      <mesh position={[0, 0.8, 0]} rotation={[0, 0, Math.PI/2]}>
        <cylinderGeometry args={[0.08, 0.08, 0.6, 16]} />
        <meshStandardMaterial color="#475569" metalness={0.8} />
      </mesh>

      {/* Animated Drop */}
      <mesh ref={dropRef} position={[0, 1, 0]}>
         <sphereGeometry args={[0.06, 8, 8]} />
         <meshStandardMaterial color="#b200ff" />
      </mesh>

      {/* Conical Flask */}
      <group position={[0, -2.5, 0]}>
        {/* Flask Neck */}
        <mesh position={[0, 1.8, 0]}>
          <cylinderGeometry args={[0.3, 0.3, 1, 16, 1, true]} />
          <meshPhysicalMaterial transmission={0.9} thickness={0.1} roughness={0} color="#e0f2fe" side={THREE.DoubleSide}/>
        </mesh>
        
        {/* Flask Body */}
        <mesh position={[0, 0.6, 0]}>
          <cylinderGeometry args={[0.3, 1.2, 1.5, 32, 1, true]} />
          <meshPhysicalMaterial transmission={0.9} thickness={0.1} roughness={0} color="#e0f2fe" side={THREE.DoubleSide} />
        </mesh>
        
        {/* Flask Base */}
        <mesh position={[0, -0.15, 0]}>
          <cylinderGeometry args={[1.2, 1.2, 0.1, 32]} />
          <meshPhysicalMaterial transmission={0.9} thickness={0.1} roughness={0} color="#e0f2fe" />
        </mesh>

        {/* Liquid inside flask */}
        <mesh ref={flaskLiquidRef} position={[0, 0.25, 0]}>
           {/* Dynamic scale parameter could be added based on total volume. Using fixed shape for now. */}
           <cylinderGeometry args={[0.7, 1.15, 0.8, 32]} />
           <meshPhysicalMaterial transmission={0.6} roughness={0} color={flaskLiquidColor} />
        </mesh>
      </group>

      {/* Labels */}
      <Html position={[0.5, 3.5, 0]} center>
         <div className="text-[9px] text-purple-400 font-bold bg-black/60 px-1 py-0.5 rounded backdrop-blur">KMnO₄</div>
      </Html>
      <Html position={[1.5, -2, 0]} center>
         <div className="text-[9px] text-pink-300 font-bold bg-black/60 px-1 py-0.5 rounded backdrop-blur whitespace-nowrap">FeSO₄ Solution</div>
      </Html>
    </group>
  );
}


const KMnO4TitrationLab: React.FC<Props> = ({ hex }) => {
  const [volAdded, setVolAdded] = useState(0);
  const [running, setRunning] = useState(false);
  const [endpointReached, setEndpointReached] = useState(false);
  const vEq = 20;

  useEffect(() => {
    if (volAdded >= vEq && !endpointReached) setEndpointReached(true);
  }, [volAdded, endpointReached, vEq]);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setVolAdded(v => {
        if (v >= 30) { setRunning(false); return v; }
        return parseFloat((v + 0.1).toFixed(2));
      });
    }, 50);
    return () => clearInterval(id);
  }, [running]);

  const reset = () => { setVolAdded(0); setRunning(false); setEndpointReached(false); };

  return (
    <div className="flex flex-col md:flex-row h-full w-full bg-slate-950">
      <div className="flex-1 relative rounded-2xl overflow-hidden m-4 border border-white/10 shadow-2xl">
        <Canvas camera={{ position: [0, 0.5, 8], fov: 60 }}>
          <Environment preset="night" />
          <ambientLight intensity={0.8} />
          <pointLight position={[5, 10, 5]} intensity={1.5} color="#fbcfe8" />
          
          <TitrationScene volAdded={volAdded} running={running} endpointReached={endpointReached} vEq={vEq} />
          
          <ContactShadows position={[0, -3.8, 0]} opacity={0.6} scale={10} blur={2.5} far={4} color="#000" />
          <OrbitControls enablePan={true} enableZoom={true} target={[0, 0, 0]} maxPolarAngle={Math.PI/2 - 0.1}/>
        </Canvas>

        {endpointReached && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/60 shadow-[0_0_80px_#f472b680] backdrop-blur-md rounded-2xl p-6 border border-pink-500/50 flex flex-col items-center">
             <div className="text-4xl mb-2">✨</div>
             <p className="font-bold text-white text-lg">Endpoint Reached!</p>
             <p className="text-pink-300 text-xs">Permanent pale pink color.</p>
          </div>
        )}

        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3 shadow-xl max-w-xs">
          <p className="text-[10px] font-bold uppercase tracking-widest text-purple-400 mb-1">Chemistry Lab — c6</p>
          <p className="text-white font-bold text-sm">3D KMnO₄ Titration</p>
          <p className="text-xs text-slate-400 mt-1">Determine molarity of FeSO₄ using purple KMnO₄ as self-indicator.</p>
        </div>
      </div>

      <div className="w-full md:w-72 bg-slate-900 border-l border-white/5 flex flex-col z-10">
        <div className="p-5 border-b border-white/5">
           <h2 className="text-lg font-black text-white">Controls</h2>
        </div>
        <div className="flex-1 p-5 space-y-4 overflow-y-auto">
          <div className={`p-3 rounded-xl border shadow-inner ${endpointReached ? 'bg-pink-500/10 border-pink-500/30' : 'bg-purple-500/10 border-purple-500/30'}`}>
            <p className={`text-xs ${endpointReached ? 'text-pink-300 font-bold' : 'text-purple-200'}`}>
              {endpointReached ? '✅ Endpoint — Permanent pale pink! Reaction is complete.' : 'Slowly add KMnO₄. Iron reacts rendering it colorless until equivalence.'}
            </p>
          </div>

          <DraggableSlider label="Added Volume" min={0} max={30} step={0.1} value={volAdded} onChange={setVolAdded} color="#c084fc" unit="mL" />

          <div className="grid grid-cols-2 gap-2 mt-4">
            {[
              { label: 'Vol Added', val: `${volAdded.toFixed(1)} mL`, color: '#c084fc' },
              { label: 'Calculated Eq', val: `${vEq.toFixed(1)} mL`, color: '#a855f7' },
              { label: 'Indicator', val: 'Self (MnO₄⁻)', color: '#fb923c' },
              { label: 'State', val: endpointReached ? 'Pink' : 'Colorless', color: endpointReached ? '#f472b6' : '#94a3b8' },
            ].map(m => (
              <div key={m.label} className="bg-slate-950/50 border border-white/5 rounded-xl p-2.5 text-center shadow-sm">
                <div className="text-[9px] text-slate-500 uppercase font-bold tracking-wider mb-1">{m.label}</div>
                <div className="font-mono font-bold text-sm bg-black/20 rounded py-0.5" style={{ color: m.color }}>{m.val}</div>
              </div>
            ))}
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-white/5 shadow-inner text-xs space-y-1.5 mt-2">
            <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-1 border-b border-white/5 pb-1">Redox Reaction</p>
            <p className="font-mono text-purple-400 pt-1 text-[9px]">MnO₄⁻ + 8H⁺ + 5e⁻ ⇌ Mn²⁺ + 4H₂O</p>
            <p className="font-mono text-blue-400 text-[9px]">Fe²⁺ ⇌ Fe³⁺ + e⁻</p>
          </div>

          <div className="flex gap-2 pt-2">
            <button onClick={() => setRunning(r => !r)} disabled={volAdded >= 30}
              className={`flex-1 py-3 rounded-xl text-sm font-bold text-white transition-all shadow-lg flex items-center justify-center gap-2 ${running ? 'bg-red-600 shadow-red-600/20' : 'bg-purple-600 shadow-purple-600/20'} disabled:opacity-50`}>
              <Droplets size={16} /> {running ? 'Stop Titration' : 'Start Drip'}
            </button>
            <button onClick={reset}
              className="px-4 py-3 rounded-xl bg-slate-800 text-red-400 hover:bg-red-900/30 transition-colors">
              <RotateCcw size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KMnO4TitrationLab;
