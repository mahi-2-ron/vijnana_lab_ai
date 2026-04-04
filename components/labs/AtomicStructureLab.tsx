import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Text, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { RotateCcw } from 'lucide-react';

interface Props { hex: string; }

// Atom model — nucleus + electron orbits
function AtomModel({ element, protons, neutrons, electrons, color }: {
  element: string; protons: number; neutrons: number; electrons: number[]; color: string;
}) {
  const nucleusRef = useRef<THREE.Mesh>(null);
  const orbitRefs = useRef<THREE.Mesh[]>([]);
  const electronRefs = useRef<THREE.Mesh[]>([]);
  const timeRef = useRef(0);

  useFrame((_, dt) => {
    timeRef.current += dt;
    const t = timeRef.current;

    // Nucleus pulse
    if (nucleusRef.current) {
      nucleusRef.current.scale.setScalar(1 + Math.sin(t * 3) * 0.05);
    }

    // Electrons orbit
    electronRefs.current.forEach((eRef, i) => {
      if (!eRef) return;
      const shell = Math.floor(i / 2);
      const shellRadius = 1.2 + shell * 0.7;
      const speed = 1.5 / (shell + 1);
      const pairAngle = (i % 2) * Math.PI;
      const angle = t * speed + pairAngle + (i * 0.8);
      const tilt = shell * 0.4 + 0.3;
      eRef.position.set(
        Math.cos(angle) * shellRadius,
        Math.sin(angle) * Math.sin(tilt) * shellRadius * 0.6,
        Math.sin(angle) * shellRadius
      );
    });
  });

  const totalShells = electrons.length;
  const allElectrons = electrons.flatMap((n, shell) => Array.from({ length: n }, (_, i) => ({ shell, idx: i })));

  return (
    <group>
      {/* Nucleus glow */}
      <mesh>
        <sphereGeometry args={[0.5 + protons * 0.01, 32, 32]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} metalness={0.3} roughness={0.4} transparent opacity={0.2} />
      </mesh>
      <mesh ref={nucleusRef}>
        <sphereGeometry args={[0.35 + protons * 0.008, 32, 32]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} metalness={0.5} roughness={0.2} />
      </mesh>

      {/* Proton/neutron label */}
      <Text position={[0, 0, 0]} fontSize={0.18} color="white" anchorX="center" anchorY="middle" font={undefined}>
        {protons + neutrons}
      </Text>

      {/* Electron shells (orbit rings) */}
      {Array.from({ length: totalShells }).map((_, si) => {
        const r = 1.2 + si * 0.7;
        return (
          <mesh key={si} rotation={[Math.PI / 2 - si * 0.4, 0, si * 0.6]}>
            <torusGeometry args={[r, 0.015, 8, 64]} />
            <meshStandardMaterial color="#334155" transparent opacity={0.35} />
          </mesh>
        );
      })}

      {/* Electrons */}
      {allElectrons.map((e, i) => (
        <mesh key={i} ref={el => { if (el) electronRefs.current[i] = el; }}>
          <sphereGeometry args={[0.1, 12, 12]} />
          <meshStandardMaterial color="#60a5fa" emissive="#3b82f6" emissiveIntensity={0.8} />
        </mesh>
      ))}

      {/* Element symbol */}
      <Text position={[0, -1.8, 0]} fontSize={0.45} color={color} anchorX="center" font={undefined}>{element}</Text>
    </group>
  );
}

const ELEMENTS = [
  { symbol: 'H', name: 'Hydrogen', protons: 1, neutrons: 0, electrons: [1], color: '#f87171', mass: 1, config: '1s¹' },
  { symbol: 'He', name: 'Helium', protons: 2, neutrons: 2, electrons: [2], color: '#fbbf24', mass: 4, config: '1s²' },
  { symbol: 'Li', name: 'Lithium', protons: 3, neutrons: 4, electrons: [2, 1], color: '#a78bfa', mass: 7, config: '2s¹' },
  { symbol: 'C', name: 'Carbon', protons: 6, neutrons: 6, electrons: [2, 4], color: '#94a3b8', mass: 12, config: '2s²2p²' },
  { symbol: 'N', name: 'Nitrogen', protons: 7, neutrons: 7, electrons: [2, 5], color: '#60a5fa', mass: 14, config: '2s²2p³' },
  { symbol: 'O', name: 'Oxygen', protons: 8, neutrons: 8, electrons: [2, 6], color: '#f87171', mass: 16, config: '2s²2p⁴' },
  { symbol: 'Na', name: 'Sodium', protons: 11, neutrons: 12, electrons: [2, 8, 1], color: '#fb923c', mass: 23, config: '3s¹' },
  { symbol: 'Fe', name: 'Iron', protons: 26, neutrons: 30, electrons: [2, 8, 14, 2], color: '#f59e0b', mass: 56, config: '3d⁶4s²' },
  { symbol: 'Cu', name: 'Copper', protons: 29, neutrons: 35, electrons: [2, 8, 18, 1], color: '#c2410c', mass: 64, config: '3d¹⁰4s¹' },
  { symbol: 'Au', name: 'Gold', protons: 79, neutrons: 118, electrons: [2, 8, 18, 32, 18, 1], color: '#fcd34d', mass: 197, config: '[Xe] 4f¹⁴5d¹⁰6s¹' },
];

const AtomicStructureLab: React.FC<Props> = ({ hex }) => {
  const [selectedElement, setSelectedElement] = useState(ELEMENTS[3]); // Carbon

  const el = selectedElement;

  return (
    <div className="flex flex-col md:flex-row h-full w-full bg-slate-950">
      <div className="flex-1 relative">
        <Canvas camera={{ position: [0, 1, 6], fov: 55 }} gl={{ antialias: true }}>
          <color attach="background" args={['#020817']} />
          <ambientLight intensity={0.3} />
          <directionalLight position={[5, 5, 5]} intensity={1.5} />
          <pointLight position={[-3, 3, 3]} intensity={1} color={el.color} />
          <pointLight position={[3, -3, -3]} intensity={0.5} color="#8b5cf6" />
          <Environment preset="night" />
          <AtomModel element={el.symbol} protons={el.protons} neutrons={el.neutrons} electrons={el.electrons} color={el.color} />
          <OrbitControls target={[0, 0, 0]} minDistance={3} maxDistance={15} />
        </Canvas>

        <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm border border-white/10 rounded-xl px-3 py-2">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">3D Chemistry Lab</p>
          <p className="text-white font-bold text-sm">Atomic Structure</p>
        </div>
      </div>

      <div className="w-full md:w-72 bg-slate-900 border-l border-white/5 flex flex-col">
        <div className="p-4 border-b border-white/5">
          <p className="text-xs font-bold uppercase tracking-widest text-purple-400 mb-1">Chemistry 3D Lab</p>
          <h2 className="text-xl font-bold text-white">Atomic Structure</h2>
          <p className="text-xs text-slate-400 mt-1">3D Bohr model with orbiting electrons</p>
        </div>
        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
          {/* Element info card */}
          <div className="rounded-2xl p-4 text-center border" style={{ backgroundColor: `${el.color}15`, borderColor: `${el.color}40` }}>
            <div className="text-6xl font-black" style={{ color: el.color }}>{el.symbol}</div>
            <div className="text-white font-bold text-sm mt-1">{el.name}</div>
            <div className="text-slate-400 text-xs">Atomic Mass: {el.mass} u</div>
          </div>

          {/* Properties grid */}
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: 'Protons', val: el.protons, color: '#ef4444' },
              { label: 'Neutrons', val: el.neutrons, color: '#94a3b8' },
              { label: 'Electrons', val: el.electrons.reduce((a, b) => a + b, 0), color: '#60a5fa' },
              { label: 'Shells', val: el.electrons.length, color: '#a78bfa' },
            ].map(m => (
              <div key={m.label} className="bg-slate-950 border border-white/10 rounded-xl p-3 text-center">
                <div className="text-[9px] text-slate-500 uppercase font-bold mb-1">{m.label}</div>
                <div className="font-mono font-bold text-xl" style={{ color: m.color }}>{m.val}</div>
              </div>
            ))}
          </div>

          <div className="bg-slate-950 border border-white/10 rounded-xl p-3">
            <p className="text-[9px] text-slate-500 uppercase font-bold mb-1">Electron Configuration</p>
            <p className="font-mono text-sm text-green-400">{el.config}</p>
            <p className="text-[10px] text-slate-400 mt-1">Shell distribution: {el.electrons.join(', ')}</p>
          </div>

          {/* Element picker */}
          <div>
            <p className="text-[10px] text-slate-400 uppercase font-bold mb-2">Select Element</p>
            <div className="grid grid-cols-5 gap-1.5">
              {ELEMENTS.map(e => (
                <button key={e.symbol} onClick={() => setSelectedElement(e)}
                  className={`py-2 rounded-xl text-xs font-bold transition-all border ${selectedElement.symbol === e.symbol ? 'text-white' : 'border-white/10 bg-white/5 text-slate-400 hover:border-white/30'}`}
                  style={selectedElement.symbol === e.symbol ? { backgroundColor: `${e.color}30`, borderColor: e.color, color: e.color } : {}}>
                  {e.symbol}
                </button>
              ))}
            </div>
          </div>

          <p className="text-[10px] text-slate-500 text-center">🖱️ Drag to orbit • Scroll to zoom</p>
        </div>
      </div>
    </div>
  );
};

export default AtomicStructureLab;
