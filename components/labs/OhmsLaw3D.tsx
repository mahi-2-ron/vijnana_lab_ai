import React, { useRef, useState, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Text, Sphere, Cylinder, Box } from '@react-three/drei';
import * as THREE from 'three';
import { RotateCcw, Zap, Play, Pause } from 'lucide-react';

interface Props { hex: string; }

// --- Ammeter & Voltmeter 3D models ---
function Meter({ pos, label, value, unit, color }: { pos: [number, number, number]; label: string; value: string; unit: string; color: string }) {
  return (
    <group position={pos}>
      <Box args={[0.8, 0.6, 0.2]} castShadow>
        <meshStandardMaterial color="#1e293b" metalness={0.3} roughness={0.5} />
      </Box>
      <Box args={[0.65, 0.45, 0.05]} position={[0, 0, 0.125]}>
        <meshStandardMaterial color="#0f172a" />
      </Box>
      {/* Circular face indicator */}
      <mesh position={[0, 0.02, 0.14]}>
        <circleGeometry args={[0.2, 32]} />
        <meshStandardMaterial color="#111827" />
      </mesh>
      <mesh position={[0, 0.02, 0.145]}>
        <ringGeometry args={[0.18, 0.2, 32]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
      </mesh>
      {/* Needle */}
      <mesh position={[0, 0.02, 0.15]} rotation={[0, 0, -Math.PI / 3]}>
        <planeGeometry args={[0.02, 0.18]} />
        <meshStandardMaterial color="#ef4444" />
      </mesh>
      <Text position={[0, -0.17, 0.14]} fontSize={0.08} color={color} anchorX="center" font={undefined}>{label}</Text>
      <Text position={[0, -0.25, 0.14]} fontSize={0.1} color="white" anchorX="center" font={undefined}>{value} {unit}</Text>
    </group>
  );
}

// --- Resistor block (rheostat) ---
function Rheostat({ resistance }: { resistance: number }) {
  return (
    <group position={[0, -0.5, 0]}>
      <Box args={[1.8, 0.25, 0.4]} castShadow>
        <meshStandardMaterial color="#292524" metalness={0.2} roughness={0.8} />
      </Box>
      {/* Resistance wire coils */}
      {Array.from({ length: 10 }).map((_, i) => (
        <mesh key={i} position={[-0.8 + i * 0.18, 0.125, 0]}>
          <torusGeometry args={[0.08, 0.025, 8, 16, Math.PI * 2]} />
          <meshStandardMaterial color="#78350f" metalness={0.1} roughness={0.9} />
        </mesh>
      ))}
      {/* Slider */}
      <Box args={[0.12, 0.5, 0.5]} position={[-0.9 + (resistance / 50) * 1.8, 0.1, 0]}>
        <meshStandardMaterial color="#94a3b8" metalness={0.7} roughness={0.3} />
      </Box>
      <Text position={[0, -0.25, 0]} fontSize={0.1} color="#f59e0b" anchorX="center" font={undefined}>{`R = ${resistance.toFixed(0)} Ω`}</Text>
    </group>
  );
}

// --- Battery ---
function Battery() {
  return (
    <group position={[-3, 0, 0]}>
      <Cylinder args={[0.18, 0.18, 0.9, 24]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <meshStandardMaterial color="#1a1a1a" metalness={0.5} roughness={0.5} />
      </Cylinder>
      {/* + terminal */}
      <Cylinder args={[0.06, 0.06, 0.1, 12]} position={[0.5, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.3} metalness={0.8} roughness={0.2} />
      </Cylinder>
      {/* - terminal */}
      <Cylinder args={[0.1, 0.1, 0.08, 12]} position={[-0.5, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <meshStandardMaterial color="#64748b" metalness={0.8} roughness={0.2} />
      </Cylinder>
      <Text position={[0, 0.3, 0]} fontSize={0.1} color="#94a3b8" anchorX="center" font={undefined}>12V Battery</Text>
    </group>
  );
}

// Glowing wire path
function Wire({ points, current }: { points: THREE.Vector3[]; current: number }) {
  const lineRef = useRef<any>(null);
  const t = useRef(0);
  useFrame((_, dt) => { t.current += dt; });
  const color = current > 0 ? '#3b82f6' : '#475569';
  return (
    <mesh>
      <tubeGeometry args={[new THREE.CatmullRomCurve3(points), 20, 0.025, 8, false]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={current > 0 ? 0.6 : 0} metalness={0.3} />
    </mesh>
  );
}

// Electron particles flowing
function ElectronFlow({ points, current }: { points: THREE.Vector3[]; current: number }) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const posRef = useRef(Array.from({ length: 8 }, (_, i) => i / 8));
  const curve = new THREE.CatmullRomCurve3(points);

  useFrame((_, dt) => {
    if (!ref.current || current <= 0) return;
    posRef.current = posRef.current.map(t => (t + dt * current * 0.08) % 1);
    posRef.current.forEach((t, i) => {
      const pos = curve.getPoint(t);
      const matrix = new THREE.Matrix4().setPosition(pos);
      ref.current!.setMatrixAt(i, matrix);
    });
    ref.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, 8]}>
      <sphereGeometry args={[0.04, 8, 8]} />
      <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={0.8} />
    </instancedMesh>
  );
}

// Main 3D scene
function OhmsScene({ resistance, voltage }: { resistance: number; voltage: number }) {
  const current = voltage / resistance;
  const circuitPoints = [
    new THREE.Vector3(-3, 0.5, 0),
    new THREE.Vector3(-1.5, 0.5, 0),
    new THREE.Vector3(0, 0.5, 0),
    new THREE.Vector3(1.5, 0.5, 0),
    new THREE.Vector3(3, 0.5, 0),
    new THREE.Vector3(3, -0.5, 0),
    new THREE.Vector3(0, -0.5, 0),
    new THREE.Vector3(-3, -0.5, 0),
    new THREE.Vector3(-3, 0, 0),
    new THREE.Vector3(-3, 0.5, 0),
  ];

  return (
    <group>
      {/* Circuit board base */}
      <Box args={[10, 0.05, 4]} position={[0, -1.2, 0]} receiveShadow>
        <meshStandardMaterial color="#0a1628" metalness={0.1} roughness={0.9} />
      </Box>

      {/* Battery */}
      <Battery />
      {/* Rheostat */}
      <Rheostat resistance={resistance} />
      {/* Meters */}
      <Meter pos={[2, 0.5, 0]} label="A" value={(current * 1000).toFixed(1)} unit="mA" color="#3b82f6" />
      <Meter pos={[2, -1, 0]} label="V" value={voltage.toFixed(1)} unit="V" color="#f59e0b" />

      {/* Wires */}
      <Wire points={circuitPoints} current={current} />
      <ElectronFlow points={circuitPoints} current={current} />

      {/* V=IR text */}
      <Text position={[0, 2, 0]} fontSize={0.35} color="#4ade80" anchorX="center" font={undefined}>V = IR</Text>
      <Text position={[0, 1.5, 0]} fontSize={0.18} color="#94a3b8" anchorX="center" font={undefined}>Ohm's Law</Text>

      <ContactShadows position={[0, -1.2, 0]} opacity={0.4} scale={10} blur={2} />
      <gridHelper args={[12, 24, '#1e3a5f', '#0f2034']} position={[0, -1.19, 0]} />
    </group>
  );
}

const OhmsLaw3D: React.FC<Props> = ({ hex }) => {
  const [resistance, setResistance] = useState(20); // Ω
  const [voltage, setVoltage] = useState(6); // V
  const current = voltage / resistance; // A

  return (
    <div className="flex flex-col md:flex-row h-full w-full bg-slate-950">
      <div className="flex-1 relative">
        <Canvas camera={{ position: [0, 3, 8], fov: 55 }} shadows gl={{ antialias: true }}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 8, 5]} intensity={2} castShadow />
          <pointLight position={[-2, 3, 2]} intensity={1} color="#3b82f6" />
          <pointLight position={[2, 3, -2]} intensity={0.8} color="#f59e0b" />
          <Environment preset="city" />
          <OhmsScene resistance={resistance} voltage={voltage} />
          <OrbitControls target={[0, 0, 0]} minDistance={5} maxDistance={15} />
        </Canvas>
        <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm border border-white/10 rounded-xl px-3 py-2">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">3D Physics Lab — p4</p>
          <p className="text-white font-bold text-sm">Ohm's Law</p>
        </div>
      </div>

      <div className="w-full md:w-72 bg-slate-900 border-l border-white/5 flex flex-col">
        <div className="p-4 border-b border-white/5">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-1">Physics 3D Lab</p>
          <h2 className="text-xl font-bold text-white">Ohm's Law</h2>
          <p className="text-xs text-slate-400 mt-1">Interactive circuit with flowing electrons</p>
        </div>
        <div className="flex-1 p-4 space-y-5 overflow-y-auto">
          {/* Live readings */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: 'Voltage', val: `${voltage.toFixed(1)}`, unit: 'V', color: '#f59e0b' },
              { label: 'Current', val: `${(current * 1000).toFixed(1)}`, unit: 'mA', color: '#3b82f6' },
              { label: 'Resistance', val: `${resistance}`, unit: 'Ω', color: '#ef4444' },
            ].map(m => (
              <div key={m.label} className="bg-slate-950 border border-white/10 rounded-xl p-3 text-center">
                <div className="text-[9px] text-slate-500 uppercase font-bold">{m.label}</div>
                <div className="font-mono font-bold text-lg" style={{ color: m.color }}>{m.val}</div>
                <div className="text-[10px]" style={{ color: m.color }}>{m.unit}</div>
              </div>
            ))}
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Voltage (V)</span>
              <span className="font-mono font-bold text-yellow-400">{voltage} V</span>
            </div>
            <input type="range" min={1} max={24} step={0.5} value={voltage}
              onChange={e => setVoltage(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-full appearance-none cursor-pointer accent-yellow-500" />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Resistance (R)</span>
              <span className="font-mono font-bold text-red-400">{resistance} Ω</span>
            </div>
            <input type="range" min={1} max={100} step={1} value={resistance}
              onChange={e => setResistance(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-full appearance-none cursor-pointer accent-red-500" />
          </div>

          {/* Power calc */}
          <div className="bg-slate-950 border border-white/10 rounded-xl p-4 space-y-2">
            <p className="text-[10px] text-slate-400 uppercase font-bold">Derived Values</p>
            <div className="flex justify-between"><span className="text-slate-400 text-xs">Power (P = VI)</span><span className="font-mono text-xs text-green-400">{(voltage * current).toFixed(3)} W</span></div>
            <div className="flex justify-between"><span className="text-slate-400 text-xs">Power (P = I²R)</span><span className="font-mono text-xs text-green-400">{(current * current * resistance).toFixed(3)} W</span></div>
            <div className="flex justify-between"><span className="text-slate-400 text-xs">Power (P = V²/R)</span><span className="font-mono text-xs text-green-400">{((voltage * voltage) / resistance).toFixed(3)} W</span></div>
          </div>

          <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-3">
            <p className="text-center text-2xl font-mono font-black text-white">V = IR</p>
            <p className="text-center text-xs text-blue-300 mt-1">{voltage.toFixed(1)} = {(current * 1000).toFixed(1)}mA × {resistance}Ω</p>
          </div>

          <p className="text-[10px] text-slate-500 text-center">🖱️ Drag to rotate view • Scroll to zoom</p>
        </div>
      </div>
    </div>
  );
};

export default OhmsLaw3D;
