import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Text, ContactShadows, Box, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { RotateCcw, Play, Pause } from 'lucide-react';

interface Props { hex: string; }

// ===== 3D Titration Scene with animated burette drop =====
function BuretteModel({ buretteLevel, dropActive }: { buretteLevel: number; dropActive: boolean }) {
  const dropRef = useRef<THREE.Mesh>(null);
  const dropYRef = useRef(3.5);
  const timeRef = useRef(0);

  useFrame((_, dt) => {
    if (!dropActive || !dropRef.current) return;
    timeRef.current += dt;
    dropYRef.current -= dt * 2.5;
    dropRef.current.position.y = dropYRef.current;
    dropRef.current.scale.setScalar(1 + Math.sin(timeRef.current * 8) * 0.05);
    if (dropYRef.current < -2.5) {
      dropYRef.current = 3.5;
    }
  });

  return (
    <group position={[0, 2.5, 0]}>
      {/* Burette stand */}
      <Box args={[0.08, 6, 0.08]} position={[-1, -1.5, 0]}>
        <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.2} />
      </Box>
      <Box args={[0.5, 0.05, 0.3]} position={[-0.7, 0.2, 0]}>
        <meshStandardMaterial color="#94a3b8" metalness={0.7} roughness={0.3} />
      </Box>

      {/* Burette tube */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.09, 0.09, 5, 16, 1, true]} />
        <meshStandardMaterial color="#e2e8f0" transparent opacity={0.35} side={THREE.DoubleSide} metalness={0} roughness={0.1} />
      </mesh>

      {/* Solution in burette */}
      <mesh position={[0, (buretteLevel - 1), 0]}>
        <cylinderGeometry args={[0.08, 0.08, buretteLevel * 2, 16]} />
        <meshStandardMaterial color="#9333ea" transparent opacity={0.7} emissive="#7c3aed" emissiveIntensity={0.2} />
      </mesh>

      {/* Burette tip */}
      <mesh position={[0, -2.6, 0]}>
        <cylinderGeometry args={[0.04, 0.02, 0.4, 8]} />
        <meshStandardMaterial color="#64748b" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Drop */}
      {dropActive && (
        <mesh ref={dropRef} position={[0, 3.5, 0]}>
          <sphereGeometry args={[0.065, 16, 16]} />
          <meshStandardMaterial color="#9333ea" transparent opacity={0.85} emissive="#7c3aed" emissiveIntensity={0.5} />
        </mesh>
      )}

      {/* Scale markings */}
      {[0, 25, 50, 75, 100].map(pct => (
        <Text key={pct} position={[0.18, 2 - pct * 0.04, 0]} fontSize={0.15} color="#64748b" anchorX="left" font={undefined}>
          {pct}
        </Text>
      ))}
    </group>
  );
}

function ConicalFlask({ color, volume, endpoint }: { color: string; volume: number; endpoint: boolean }) {
  const liquidRef = useRef<THREE.Mesh>(null);
  const timeRef = useRef(0);

  useFrame((_, dt) => {
    timeRef.current += dt;
    if (liquidRef.current) {
      // Swirling effect
      liquidRef.current.rotation.y += dt * (endpoint ? 0.5 : 0.2);
    }
  });

  return (
    <group position={[0, -1.5, 0]}>
      {/* Glass flask */}
      <mesh>
        <latheGeometry args={[
          [new THREE.Vector2(0, 0), new THREE.Vector2(0.5, 0.1), new THREE.Vector2(0.7, 0.5), new THREE.Vector2(0.6, 0.9), new THREE.Vector2(0.12, 1.2), new THREE.Vector2(0.1, 1.5)],
          24
        ]} />
        <meshStandardMaterial color="#b0d4f1" transparent opacity={0.25} side={THREE.DoubleSide} metalness={0} roughness={0.05} />
      </mesh>

      {/* Solution liquid */}
      <mesh ref={liquidRef} position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.58, 0.58, 0.3 + volume * 0.005, 24]} />
        <meshStandardMaterial color={color} transparent opacity={0.7} emissive={color} emissiveIntensity={endpoint ? 0.5 : 0.15} />
      </mesh>

      {/* Base */}
      <mesh position={[0, 0.025, 0]}>
        <cylinderGeometry args={[0.62, 0.62, 0.05, 24]} />
        <meshStandardMaterial color="#475569" metalness={0.3} roughness={0.8} />
      </mesh>

      {endpoint && (
        <Text position={[0, 1.8, 0]} fontSize={0.18} color="#f0abfc" anchorX="center" font={undefined}>
          Endpoint! ✓
        </Text>
      )}
    </group>
  );
}

const TitrationLab3DNew: React.FC<Props> = ({ hex }) => {
  const [buretteLevel, setBuretteLevel] = useState(2.0); // 2x = 50% full
  const [volumeAdded, setVolumeAdded] = useState(0); // mL
  const [dropping, setDropping] = useState(false);
  const [endpoint, setEndpoint] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  // Endpoint at ~25 mL KMnO4 added to 10mL Oxalic Acid 
  const endpointVol = 24.5;
  const flaskColor = endpoint ? '#f0abfc' :
    volumeAdded > endpointVol - 2 ? '#c084fc' :
    volumeAdded > 5 ? '#e0e7ff' : '#fef9c3';

  const startDrop = () => {
    if (endpoint) return;
    setDropping(true);
    intervalRef.current = setInterval(() => {
      setVolumeAdded(v => {
        const next = parseFloat((v + 0.5).toFixed(1));
        if (next >= endpointVol) {
          clearInterval(intervalRef.current);
          setDropping(false);
          setEndpoint(true);
          return endpointVol;
        }
        setBuretteLevel(Math.max(0.1, 2.0 - next / 25));
        return next;
      });
    }, 500);
  };

  const stopDrop = () => {
    setDropping(false);
    clearInterval(intervalRef.current);
  };

  const reset = () => {
    clearInterval(intervalRef.current);
    setDropping(false);
    setEndpoint(false);
    setVolumeAdded(0);
    setBuretteLevel(2.0);
  };

  return (
    <div className="flex flex-col md:flex-row h-full w-full bg-slate-950">
      <div className="flex-1 relative">
        <Canvas camera={{ position: [3, 2, 6], fov: 50 }} shadows gl={{ antialias: true }}>
          <color attach="background" args={['#020817']} />
          <ambientLight intensity={0.3} />
          <directionalLight position={[5, 10, 5]} intensity={2} castShadow />
          <pointLight position={[-2, 4, 2]} intensity={1.5} color="#9333ea" />
          <pointLight position={[2, 2, 4]} intensity={0.8} color="#f0abfc" />
          <Environment preset="night" />

          <BuretteModel buretteLevel={buretteLevel} dropActive={dropping} />
          <ConicalFlask color={flaskColor} volume={volumeAdded} endpoint={endpoint} />

          <ContactShadows position={[0, -2.5, 0]} opacity={0.5} scale={8} blur={2} />
          <gridHelper args={[10, 20, '#1e3a5f', '#0f2034']} position={[0, -2.49, 0]} />

          <OrbitControls target={[0, 0, 0]} minDistance={4} maxDistance={14} />
        </Canvas>

        <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm border border-white/10 rounded-xl px-3 py-2">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">3D Chemistry Lab — c6</p>
          <p className="text-white font-bold text-sm">KMnO₄ Titration</p>
        </div>

        {endpoint && (
          <div className="absolute inset-x-0 bottom-6 flex justify-center">
            <div className="bg-purple-900/80 backdrop-blur-sm border border-purple-400/50 rounded-2xl px-6 py-3 text-center">
              <p className="text-purple-200 font-bold text-sm">🎉 Endpoint Reached!</p>
              <p className="text-purple-400 text-xs">{volumeAdded.toFixed(1)} mL KMnO₄ used</p>
            </div>
          </div>
        )}
      </div>

      <div className="w-full md:w-72 bg-slate-900 border-l border-white/5 flex flex-col">
        <div className="p-4 border-b border-white/5">
          <p className="text-xs font-bold uppercase tracking-widest text-purple-400 mb-1">Chemistry 3D Lab</p>
          <h2 className="text-xl font-bold text-white">Redox Titration</h2>
          <p className="text-xs text-slate-400 mt-1">KMnO₄ vs Oxalic Acid — self-indicating</p>
        </div>
        <div className="flex-1 p-4 space-y-5 overflow-y-auto">
          {/* Burette reading */}
          <div className="bg-purple-500/10 border border-purple-500/30 rounded-2xl p-4 text-center">
            <p className="text-[10px] text-purple-400 uppercase font-bold tracking-widest mb-1">Volume Added</p>
            <p className="text-5xl font-black text-white font-mono">{volumeAdded.toFixed(1)}</p>
            <p className="text-purple-400 text-sm font-bold mt-0.5">mL KMnO₄</p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {[
              { label: 'Burette', val: `${(endpointVol - volumeAdded + 24.5 - endpointVol + 25).toFixed(1)} mL`, color: '#a78bfa' },
              { label: 'Flask (acid)', val: '10.0 mL', color: '#f59e0b' },
              { label: 'Endpoint', val: endpoint ? '✓ Done' : `~${endpointVol} mL`, color: endpoint ? '#4ade80' : '#94a3b8' },
              { label: 'Flask color', val: endpoint ? 'Pink' : volumeAdded > 15 ? 'Pale pink' : 'Colorless', color: '#f0abfc' },
            ].map(m => (
              <div key={m.label} className="bg-slate-950 border border-white/10 rounded-xl p-3 text-center">
                <div className="text-[9px] text-slate-500 uppercase font-bold mb-1">{m.label}</div>
                <div className="font-mono font-bold text-xs" style={{ color: m.color }}>{m.val}</div>
              </div>
            ))}
          </div>

          {/* Reaction */}
          <div className="bg-slate-950 rounded-xl p-3 border border-white/10 space-y-1">
            <p className="text-[10px] text-slate-400 uppercase font-bold">Redox Reaction</p>
            <p className="font-mono text-[10px] text-purple-400">2KMnO₄ + 5H₂C₂O₄ + 3H₂SO₄ →</p>
            <p className="font-mono text-[10px] text-green-400">K₂SO₄ + 2MnSO₄ + 10CO₂ + 8H₂O</p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={dropping ? stopDrop : startDrop}
              disabled={endpoint}
              className={`flex-1 py-3 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50 ${dropping ? 'bg-red-700' : 'bg-purple-700'}`}
            >
              {dropping ? <><Pause size={16} /> Stop</> : <><Play size={16} /> Add Drop</>}
            </button>
            <button onClick={reset} className="px-4 py-3 rounded-xl bg-slate-800 text-slate-400 hover:text-red-400 transition-all">
              <RotateCcw size={16} />
            </button>
          </div>

          <p className="text-[10px] text-slate-500 text-center">🖱️ Drag to rotate • Pink = Endpoint!</p>
        </div>
      </div>
    </div>
  );
};

export default TitrationLab3DNew;
