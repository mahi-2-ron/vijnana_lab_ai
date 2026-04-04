import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Text, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

interface Props { hex: string; }

// DNA Base pair colors
const BASE_COLORS: Record<string, string> = {
  A: '#ef4444', T: '#3b82f6', G: '#10b981', C: '#f59e0b',
};

// DNA Double Helix scene
function DNAHelix({ rotating }: { rotating: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const numBases = 20;
  const height = 8;
  const radius = 0.8;
  const turns = 2.5;

  useFrame((_, dt) => {
    if (groupRef.current && rotating) {
      groupRef.current.rotation.y += dt * 0.5;
    }
  });

  const pairs = ['AT', 'GC', 'CG', 'TA', 'AT', 'GC', 'AT', 'CG', 'TA', 'GC', 'AT', 'TA', 'GC', 'AT', 'CG', 'TA', 'GC', 'AT', 'TA', 'CG'];

  return (
    <group ref={groupRef} position={[0, -height / 2 + 0.5, 0]}>
      {pairs.map((pair, i) => {
        const t = i / numBases;
        const angle1 = t * turns * Math.PI * 2;
        const angle2 = angle1 + Math.PI;
        const y = t * height;

        const b1 = pair[0], b2 = pair[1];

        const x1 = Math.cos(angle1) * radius;
        const z1 = Math.sin(angle1) * radius;
        const x2 = Math.cos(angle2) * radius;
        const z2 = Math.sin(angle2) * radius;

        return (
          <group key={i}>
            {/* Base 1 sphere */}
            <mesh position={[x1, y, z1]} castShadow>
              <sphereGeometry args={[0.15, 16, 16]} />
              <meshStandardMaterial
                color={BASE_COLORS[b1]}
                emissive={BASE_COLORS[b1]}
                emissiveIntensity={0.3}
                metalness={0.2}
                roughness={0.4}
              />
            </mesh>

            {/* Base 2 sphere */}
            <mesh position={[x2, y, z2]} castShadow>
              <sphereGeometry args={[0.15, 16, 16]} />
              <meshStandardMaterial
                color={BASE_COLORS[b2]}
                emissive={BASE_COLORS[b2]}
                emissiveIntensity={0.3}
                metalness={0.2}
                roughness={0.4}
              />
            </mesh>

            {/* H-bond connecting them */}
            <mesh position={[(x1 + x2) / 2, y, (z1 + z2) / 2]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.025, 0.025, Math.sqrt((x2 - x1) ** 2 + (z2 - z1) ** 2), 6]} />
              <meshStandardMaterial color="#475569" transparent opacity={0.5} />
            </mesh>

            {/* Connect to backbone */}
            {i < numBases - 1 && (
              <>
                {/* Strand 1 backbone */}
                <mesh position={[(x1 + Math.cos((t + 1 / numBases) * turns * Math.PI * 2) * radius) / 2,
                  y + height / (numBases * 2),
                  (z1 + Math.sin((t + 1 / numBases) * turns * Math.PI * 2) * radius) / 2]}>
                  <sphereGeometry args={[0.06, 8, 8]} />
                  <meshStandardMaterial color="#94a3b8" metalness={0.5} roughness={0.5} />
                </mesh>
                {/* Strand 2 backbone */}
                <mesh position={[(x2 + Math.cos((t + 1 / numBases) * turns * Math.PI * 2 + Math.PI) * radius) / 2,
                  y + height / (numBases * 2),
                  (z2 + Math.sin((t + 1 / numBases) * turns * Math.PI * 2 + Math.PI) * radius) / 2]}>
                  <sphereGeometry args={[0.06, 8, 8]} />
                  <meshStandardMaterial color="#64748b" metalness={0.5} roughness={0.5} />
                </mesh>
              </>
            )}
          </group>
        );
      })}

      {/* Backbone tubes for both strands */}
      {['strand1', 'strand2'].map((strand, si) => {
        const points = pairs.map((_, i) => {
          const t = i / numBases;
          const angle = t * turns * Math.PI * 2 + (si === 1 ? Math.PI : 0);
          return new THREE.Vector3(Math.cos(angle) * radius, t * height, Math.sin(angle) * radius);
        });
        const curve = new THREE.CatmullRomCurve3(points);
        const tubeGeo = new THREE.TubeGeometry(curve, 60, 0.06, 8, false);

        return (
          <mesh key={strand} geometry={tubeGeo}>
            <meshStandardMaterial
              color={si === 0 ? '#1d4ed8' : '#7c3aed'}
              metalness={0.5}
              roughness={0.3}
              emissive={si === 0 ? '#1d4ed8' : '#7c3aed'}
              emissiveIntensity={0.15}
            />
          </mesh>
        );
      })}
    </group>
  );
}

const DNALab: React.FC<Props> = ({ hex }) => {
  const [rotating, setRotating] = useState(true);
  const [selectedBase, setSelectedBase] = useState<string | null>(null);

  const baseInfo: Record<string, { name: string; comp: string; desc: string }> = {
    A: { name: 'Adenine', comp: 'T (Thymine)', desc: 'Purine base — 2 H-bonds with Thymine' },
    T: { name: 'Thymine', comp: 'A (Adenine)', desc: 'Pyrimidine base — 2 H-bonds with Adenine' },
    G: { name: 'Guanine', comp: 'C (Cytosine)', desc: 'Purine base — 3 H-bonds with Cytosine' },
    C: { name: 'Cytosine', comp: 'G (Guanine)', desc: 'Pyrimidine base — 3 H-bonds with Guanine' },
  };

  return (
    <div className="flex flex-col md:flex-row h-full w-full bg-slate-950">
      <div className="flex-1 relative">
        <Canvas camera={{ position: [4, 0, 8], fov: 50 }} shadows gl={{ antialias: true }}>
          <color attach="background" args={['#020817']} />
          <ambientLight intensity={0.3} />
          <directionalLight position={[5, 10, 5]} intensity={1.5} castShadow />
          <pointLight position={[-3, 3, 3]} intensity={1} color="#3b82f6" />
          <pointLight position={[3, -3, -3]} intensity={0.8} color="#8b5cf6" />
          <pointLight position={[0, 5, 0]} intensity={0.6} color="#10b981" />
          <Environment preset="night" />
          <DNAHelix rotating={rotating} />
          <OrbitControls target={[0, 0, 0]} minDistance={5} maxDistance={20} />
        </Canvas>

        {/* Legend overlay */}
        <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm border border-white/10 rounded-xl p-3 space-y-1.5">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">DNA Base Pairs</p>
          {[['A', 'Adenine'], ['T', 'Thymine'], ['G', 'Guanine'], ['C', 'Cytosine']].map(([b, n]) => (
            <div key={b} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: BASE_COLORS[b] }} />
              <span className="text-[10px] text-slate-300">{b} — {n}</span>
            </div>
          ))}
        </div>

        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm border border-white/10 rounded-xl px-3 py-2">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">3D Biology Lab — b9</p>
          <p className="text-white font-bold text-sm">DNA Structure</p>
        </div>
      </div>

      <div className="w-full md:w-72 bg-slate-900 border-l border-white/5 flex flex-col">
        <div className="p-4 border-b border-white/5">
          <p className="text-xs font-bold uppercase tracking-widest text-green-400 mb-1">Biology 3D Lab</p>
          <h2 className="text-xl font-bold text-white">DNA Double Helix</h2>
          <p className="text-xs text-slate-400 mt-1">3D Watson-Crick model of DNA structure</p>
        </div>
        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
          <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-3">
            <p className="text-xs text-green-200">Double helix with complementary base pairs. Blue/purple tubes = sugar-phosphate backbone. Colored spheres = nitrogenous bases.</p>
          </div>

          <button onClick={() => setRotating(r => !r)}
            className={`w-full py-3 rounded-xl font-bold text-white transition-all ${rotating ? 'bg-red-600 hover:bg-red-500' : 'bg-green-600 hover:bg-green-500'}`}>
            {rotating ? '⏸ Pause Rotation' : '▶ Rotate DNA'}
          </button>

          {/* Base pair selector */}
          <div>
            <p className="text-[10px] text-slate-400 uppercase font-bold mb-2">Base Pair Info</p>
            <div className="grid grid-cols-2 gap-2">
              {(['A', 'T', 'G', 'C'] as const).map(b => (
                <button key={b} onClick={() => setSelectedBase(selectedBase === b ? null : b)}
                  className={`p-3 rounded-xl text-xs font-bold transition-all border ${selectedBase === b ? 'border-white/40 text-white' : 'border-white/10 text-slate-400'}`}
                  style={{ backgroundColor: selectedBase === b ? `${BASE_COLORS[b]}30` : 'rgba(255,255,255,0.03)', borderColor: selectedBase === b ? BASE_COLORS[b] : undefined }}>
                  <div className="w-4 h-4 rounded-full mx-auto mb-1" style={{ backgroundColor: BASE_COLORS[b] }} />
                  {b}
                </button>
              ))}
            </div>
            {selectedBase && (
              <div className="mt-3 p-3 rounded-xl border" style={{ backgroundColor: `${BASE_COLORS[selectedBase]}15`, borderColor: `${BASE_COLORS[selectedBase]}40` }}>
                <p className="font-bold text-xs" style={{ color: BASE_COLORS[selectedBase] }}>{baseInfo[selectedBase].name}</p>
                <p className="text-slate-300 text-[10px] mt-1">Pairs with: {baseInfo[selectedBase].comp}</p>
                <p className="text-slate-400 text-[10px] mt-0.5">{baseInfo[selectedBase].desc}</p>
              </div>
            )}
          </div>

          {/* DNA facts */}
          <div className="bg-slate-950 p-3 rounded-xl border border-white/10 text-xs space-y-2">
            <p className="text-slate-400 font-bold text-[10px] uppercase">Key Facts</p>
            {[
              ['Discovered by', 'Watson & Crick, 1953'],
              ['Width', '~2 nm'],
              ['Bases per turn', '10.5'],
              ['Pitch', '3.4 nm'],
              ['A-T bonds', '2 hydrogen bonds'],
              ['G-C bonds', '3 hydrogen bonds'],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between">
                <span className="text-slate-500">{k}</span>
                <span className="text-slate-300 font-mono text-[10px]">{v}</span>
              </div>
            ))}
          </div>

          <p className="text-[10px] text-slate-500 text-center">🖱️ Drag to rotate • Scroll to zoom</p>
        </div>
      </div>
    </div>
  );
};

export default DNALab;
