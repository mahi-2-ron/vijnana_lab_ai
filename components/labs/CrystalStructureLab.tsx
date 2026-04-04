import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Text, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

interface Props { hex: string; }

// Crystal unit cell types
const CRYSTAL_TYPES = {
  NaCl: {
    name: 'NaCl — Rock Salt',
    color1: '#3b82f6',
    color2: '#f87171',
    label1: 'Na⁺',
    label2: 'Cl⁻',
    positions: [] as [number, number, number, boolean][],
    desc: 'Face-centred cubic (FCC). Each Na⁺ surrounded by 6 Cl⁻ and vice versa. Coordination number: 6',
  },
  Diamond: {
    name: 'Diamond Cubic',
    color1: '#a5f3fc',
    color2: '#a5f3fc',
    label1: 'C',
    label2: 'C',
    desc: 'Each C atom bonded to 4 others in tetrahedral arrangement. Hardest natural material.',
  },
  CsCl: {
    name: 'CsCl — Caesium Chloride',
    color1: '#fbbf24',
    color2: '#6d28d9',
    label1: 'Cs⁺',
    label2: 'Cl⁻',
    desc: 'Simple cubic lattice. Coordination number: 8. Cs⁺ at body centre, Cl⁻ at corners.',
  },
  ZnS: {
    name: 'ZnS — Zinc Blende',
    color1: '#4ade80',
    color2: '#f59e0b',
    label1: 'Zn²⁺',
    label2: 'S²⁻',
    desc: 'FCC lattice with Zn in alternate tetrahedral voids. Coordination number: 4.',
  },
};

type CrystalType = keyof typeof CRYSTAL_TYPES;

function NaClCrystal({ rotating }: { rotating: boolean }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, dt) => { if (ref.current && rotating) ref.current.rotation.y += dt * 0.4; });

  const atoms: { pos: [number, number, number]; isNa: boolean }[] = [];
  const d = 1.0;
  for (let x = 0; x < 3; x++) for (let y = 0; y < 3; y++) for (let z = 0; z < 3; z++) {
    const isNa = (x + y + z) % 2 === 0;
    atoms.push({ pos: [(x - 1) * d, (y - 1) * d, (z - 1) * d], isNa });
  }

  // Bonds
  const bonds: [number, number][] = [];
  atoms.forEach((a, i) => atoms.forEach((b, j) => {
    if (i < j) {
      const dx = a.pos[0] - b.pos[0], dy = a.pos[1] - b.pos[1], dz = a.pos[2] - b.pos[2];
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
      if (Math.abs(dist - d) < 0.01 && a.isNa !== b.isNa) bonds.push([i, j]);
    }
  }));

  return (
    <group ref={ref}>
      {atoms.map((a, i) => (
        <mesh key={i} position={a.pos} castShadow>
          <sphereGeometry args={[a.isNa ? 0.22 : 0.35, 24, 24]} />
          <meshStandardMaterial
            color={a.isNa ? '#3b82f6' : '#f87171'}
            emissive={a.isNa ? '#1d4ed8' : '#991b1b'}
            emissiveIntensity={0.2}
            metalness={0.3}
            roughness={0.3}
          />
        </mesh>
      ))}
      {bonds.map(([i, j], k) => {
        const a = atoms[i].pos, b = atoms[j].pos;
        const mid: [number, number, number] = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2];
        const len = Math.sqrt((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2);
        const dir = new THREE.Vector3(b[0] - a[0], b[1] - a[1], b[2] - a[2]).normalize();
        const up = new THREE.Vector3(0, 1, 0);
        const quat = new THREE.Quaternion().setFromUnitVectors(up, dir);
        return (
          <mesh key={k} position={mid} quaternion={quat}>
            <cylinderGeometry args={[0.03, 0.03, len, 6]} />
            <meshStandardMaterial color="#475569" transparent opacity={0.4} />
          </mesh>
        );
      })}
      {/* Labels */}
      <Text position={[0, 2, 0]} fontSize={0.22} color="#60a5fa" anchorX="center" font={undefined}>Na⁺ (blue) — Cl⁻ (red)</Text>
    </group>
  );
}

function DiamondCubic({ rotating }: { rotating: boolean }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, dt) => { if (ref.current && rotating) ref.current.rotation.y += dt * 0.35; });

  const d = 0.9;
  const positions: [number, number, number][] = [
    [0, 0, 0], [d, d, 0], [d, 0, d], [0, d, d], [d / 2, d / 2, d / 2],
    [0, 0, 2 * d], [d, d, 2 * d], [d, 0, d], [0, d, d],
  ];

  return (
    <group ref={ref} position={[-0.5, -0.5, -0.5]}>
      {positions.map((p, i) => (
        <mesh key={i} position={p} castShadow>
          <sphereGeometry args={[0.18, 24, 24]} />
          <meshStandardMaterial
            color="#a5f3fc"
            emissive="#0c4a6e"
            emissiveIntensity={0.3}
            metalness={0.2}
            roughness={0.2}
            transparent
            opacity={0.9}
          />
        </mesh>
      ))}
      <Text position={[0.5, 2, 0.5]} fontSize={0.2} color="#67e8f9" anchorX="center" font={undefined}>Diamond cubic — sp³ hybridization</Text>
    </group>
  );
}

const CrystalStructureLab: React.FC<Props> = ({ hex }) => {
  const [crystalType, setCrystalType] = useState<CrystalType>('NaCl');
  const [rotating, setRotating] = useState(true);

  return (
    <div className="flex flex-col md:flex-row h-full w-full bg-slate-950">
      <div className="flex-1 relative">
        <Canvas camera={{ position: [3, 2, 6], fov: 55 }} gl={{ antialias: true }}>
          <color attach="background" args={['#020817']} />
          <ambientLight intensity={0.35} />
          <directionalLight position={[5, 8, 5]} intensity={2} castShadow />
          <pointLight position={[-3, 3, 3]} intensity={1.2} color="#3b82f6" />
          <pointLight position={[3, -3, -3]} intensity={0.8} color="#f87171" />
          <Environment preset="night" />
          {crystalType === 'NaCl' ? <NaClCrystal rotating={rotating} /> : <DiamondCubic rotating={rotating} />}
          <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={8} blur={2} />
          <gridHelper args={[10, 20, '#1e3a5f', '#0f2034']} position={[0, -2.49, 0]} />
          <OrbitControls target={[0, 0, 0]} minDistance={3} maxDistance={15} />
        </Canvas>

        <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm border border-white/10 rounded-xl px-3 py-2">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">3D Chemistry Lab</p>
          <p className="text-white font-bold text-sm">{CRYSTAL_TYPES[crystalType].name}</p>
        </div>
      </div>

      <div className="w-full md:w-72 bg-slate-900 border-l border-white/5 flex flex-col">
        <div className="p-4 border-b border-white/5">
          <p className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-1">Chemistry 3D Lab</p>
          <h2 className="text-xl font-bold text-white">Crystal Structure</h2>
          <p className="text-xs text-slate-400 mt-1">Ionic and covalent crystal lattice models</p>
        </div>
        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
          <div className="p-3 rounded-xl border border-cyan-500/30 bg-cyan-500/10">
            <p className="text-cyan-200 text-xs">{CRYSTAL_TYPES[crystalType].desc}</p>
          </div>

          <div>
            <p className="text-[10px] text-slate-400 uppercase font-bold mb-2">Crystal Type</p>
            <div className="grid grid-cols-2 gap-2">
              {(Object.keys(CRYSTAL_TYPES) as CrystalType[]).map(k => (
                <button key={k} onClick={() => setCrystalType(k)}
                  className={`p-2.5 rounded-xl text-xs font-bold transition-all border text-left ${crystalType === k ? 'border-cyan-500 bg-cyan-500/15 text-cyan-300' : 'border-white/10 bg-white/5 text-slate-400 hover:border-cyan-500/40'}`}>
                  <div className="flex gap-1.5 mb-1">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: CRYSTAL_TYPES[k].color1 }} />
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: CRYSTAL_TYPES[k].color2 }} />
                  </div>
                  {k}
                </button>
              ))}
            </div>
          </div>

          {crystalType === 'NaCl' && (
            <div className="bg-slate-950 p-3 rounded-xl border border-white/10 space-y-2 text-xs">
              <p className="text-slate-400 font-bold text-[10px] uppercase">NaCl Properties</p>
              {[
                ['Lattice type', 'FCC'],
                ['Coord. number', '6'],
                ['Ratio Na:Cl', '1:1'],
                ['Crystal class', 'Cubic'],
                ['Melting point', '801°C'],
                ['Bond type', 'Ionic'],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between">
                  <span className="text-slate-500">{k}</span>
                  <span className="text-slate-200 font-mono">{v}</span>
                </div>
              ))}
            </div>
          )}

          <div className="flex gap-1.5">
            <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 rounded-xl flex-1">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: CRYSTAL_TYPES[crystalType].color1 }} />
              <span className="text-xs text-slate-300">{CRYSTAL_TYPES[crystalType].label1}</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 rounded-xl flex-1">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: CRYSTAL_TYPES[crystalType].color2 }} />
              <span className="text-xs text-slate-300">{CRYSTAL_TYPES[crystalType].label2}</span>
            </div>
          </div>

          <button onClick={() => setRotating(r => !r)}
            className={`w-full py-3 rounded-xl font-bold text-white transition-all ${rotating ? 'bg-red-600 hover:bg-red-500' : 'bg-emerald-600 hover:bg-emerald-500'}`}>
            {rotating ? '⏸ Pause Rotation' : '▶ Rotate Model'}
          </button>

          <p className="text-[10px] text-slate-500 text-center">🖱️ Drag to orbit • Scroll to zoom</p>
        </div>
      </div>
    </div>
  );
};

export default CrystalStructureLab;
