import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Text, Trail, Sphere, Cylinder, Line } from '@react-three/drei';
import * as THREE from 'three';
import { RotateCcw, Play, Pause } from 'lucide-react';

interface Props { hex: string; }

// --- 3D Pendulum Physics Scene ---
function PendulumScene({
  length, gravity, damping, running
}: { length: number; gravity: number; damping: number; running: boolean }) {
  const bobRef = useRef<THREE.Mesh>(null);
  const stringRef = useRef<THREE.Group>(null);
  const trailRef = useRef<THREE.Points>(null);
  const angleRef = useRef(Math.PI / 4); // initial angle
  const angVelRef = useRef(0);
  const timeRef = useRef(0);
  const trailPositions = useRef<THREE.Vector3[]>([]);

  const pivotY = 3.5;

  useFrame((state, delta) => {
    if (!running) return;
    const dt = Math.min(delta, 0.05);
    timeRef.current += dt;

    // Physics: α = -g/L sin(θ) - damping * ω
    const alpha = -(gravity / length) * Math.sin(angleRef.current) - damping * angVelRef.current;
    angVelRef.current += alpha * dt;
    angleRef.current += angVelRef.current * dt;

    if (bobRef.current) {
      const x = Math.sin(angleRef.current) * length;
      const y = pivotY - Math.cos(angleRef.current) * length;
      bobRef.current.position.set(x, y, 0);

      // Trail
      trailPositions.current.push(new THREE.Vector3(x, y, 0));
      if (trailPositions.current.length > 80) trailPositions.current.shift();
    }

    // Rotate string group
    if (stringRef.current) {
      stringRef.current.rotation.z = angleRef.current;
    }
  });

  const T = 2 * Math.PI * Math.sqrt(length / gravity);

  return (
    <group>
      {/* Ceiling mount */}
      <mesh position={[0, pivotY + 0.15, 0]}>
        <boxGeometry args={[0.8, 0.3, 0.5]} />
        <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Pivot pivot sphere */}
      <mesh position={[0, pivotY, 0]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#64748b" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* String — rotates around pivot */}
      <group ref={stringRef} position={[0, pivotY, 0]}>
        <mesh position={[0, -length / 2, 0]}>
          <cylinderGeometry args={[0.015, 0.015, length, 8]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.1} roughness={0.9} />
        </mesh>
      </group>

      {/* Bob — independently positioned by physics */}
      <mesh ref={bobRef} position={[0, pivotY - length, 0]} castShadow>
        <sphereGeometry args={[0.22, 32, 32]} />
        <meshStandardMaterial
          color="#3b82f6"
          metalness={0.8}
          roughness={0.1}
          envMapIntensity={1.5}
        />
      </mesh>

      {/* Trail using Line */}
      {trailPositions.current.length > 2 && (
        <Line
          points={trailPositions.current}
          color="#3b82f6"
          lineWidth={1}
          opacity={0.3}
          transparent
        />
      )}

      {/* Floor */}
      <mesh position={[0, -1.5, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[12, 12]} />
        <meshStandardMaterial color="#0f172a" metalness={0} roughness={1} />
      </mesh>

      {/* Gridlines on floor */}
      <gridHelper args={[10, 20, '#1e3a5f', '#1e3a5f']} position={[0, -1.49, 0]} />

      {/* Period indicator text */}
      <Text
        position={[2.5, 2.5, 0]}
        fontSize={0.22}
        color="#60a5fa"
        anchorX="left"
        font={undefined}
      >
        {`T = ${T.toFixed(3)} s`}
      </Text>
      <Text
        position={[2.5, 2.1, 0]}
        fontSize={0.17}
        color="#94a3b8"
        anchorX="left"
        font={undefined}
      >
        {`L = ${length.toFixed(2)} m`}
      </Text>
      <Text
        position={[2.5, 1.75, 0]}
        fontSize={0.17}
        color="#94a3b8"
        anchorX="left"
        font={undefined}
      >
        {`g = ${gravity.toFixed(1)} m/s²`}
      </Text>

      {/* Wall support posts */}
      {[-0.4, 0.4].map((x, i) => (
        <mesh key={i} position={[x, pivotY - 0.6, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 1.2, 8]} />
          <meshStandardMaterial color="#475569" metalness={0.6} roughness={0.3} />
        </mesh>
      ))}
    </group>
  );
}

// --- Slider component ---
function Slider({ label, min, max, step = 0.01, value, onChange, color, unit }:
  { label: string; min: number; max: number; step?: number; value: number; onChange: (v: number) => void; color: string; unit: string }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-slate-400 font-medium">{label}</span>
        <span className="font-mono font-bold" style={{ color }}>{value.toFixed(2)} {unit}</span>
      </div>
      <div className="relative h-2 bg-slate-700 rounded-full cursor-pointer">
        <div className="h-2 rounded-full transition-all" style={{ width: `${((value - min) / (max - min)) * 100}%`, backgroundColor: color }} />
        <input type="range" min={min} max={max} step={step} value={value}
          onChange={e => onChange(parseFloat(e.target.value))}
          className="absolute inset-0 w-full opacity-0 cursor-pointer h-2" />
      </div>
    </div>
  );
}

const PendulumLab3D: React.FC<Props> = ({ hex }) => {
  const [length, setLength] = useState(2.5); // metres
  const [gravity, setGravity] = useState(9.8);
  const [damping, setDamping] = useState(0.02);
  const [running, setRunning] = useState(false);

  const T = 2 * Math.PI * Math.sqrt(length / gravity);

  return (
    <div className="flex flex-col md:flex-row h-full w-full bg-slate-950">
      {/* 3D Canvas */}
      <div className="flex-1 relative">
        <Canvas
          camera={{ position: [0, 2, 8], fov: 50 }}
          shadows
          gl={{ antialias: true, alpha: false }}
          style={{ background: '#020817' }}
        >
          {/* Lighting */}
          <ambientLight intensity={0.3} />
          <directionalLight
            position={[5, 10, 5]}
            intensity={1.5}
            castShadow
            shadow-mapSize={[2048, 2048]}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
            shadow-camera-left={-10}
            shadow-camera-right={10}
          />
          <pointLight position={[-3, 5, -3]} intensity={0.8} color="#3b82f6" />
          <pointLight position={[3, 0, 3]} intensity={0.5} color="#8b5cf6" />

          {/* Environment */}
          <Environment preset="night" />

          {/* Contact shadows for realism */}
          <ContactShadows
            position={[0, -1.48, 0]}
            opacity={0.6}
            scale={8}
            blur={2.5}
            far={4}
          />

          {/* Pendulum */}
          <PendulumScene length={length} gravity={gravity} damping={damping} running={running} />

          {/* Camera controls */}
          <OrbitControls
            enablePan={false}
            minDistance={4}
            maxDistance={15}
            target={[0, 1.5, 0]}
          />
        </Canvas>

        {/* Overlay badge */}
        <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm border border-white/10 rounded-xl px-3 py-2">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">3D Physics Lab — p2</p>
          <p className="text-white font-bold text-sm">Simple Pendulum</p>
        </div>
      </div>

      {/* Control panel */}
      <div className="w-full md:w-72 bg-slate-900 border-l border-white/5 flex flex-col">
        <div className="p-4 border-b border-white/5">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-1">Physics Lab — 3D</p>
          <h2 className="text-xl font-bold text-white">Simple Pendulum</h2>
          <p className="text-xs text-slate-400 mt-1">Study periodic motion and verify T = 2π√(L/g)</p>
        </div>

        <div className="flex-1 p-4 space-y-5 overflow-y-auto">
          {/* Live period display */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-4 text-center">
            <p className="text-[10px] text-blue-400 uppercase font-bold tracking-widest mb-1">Time Period</p>
            <p className="text-4xl font-black text-white font-mono">{T.toFixed(3)}</p>
            <p className="text-blue-400 text-sm font-bold mt-1">seconds</p>
          </div>

          <Slider label="String Length" min={0.5} max={4} step={0.05} value={length} onChange={setLength} color="#3b82f6" unit="m" />
          <Slider label="Gravity (g)" min={1.6} max={24.8} step={0.1} value={gravity} onChange={setGravity} color="#f59e0b" unit="m/s²" />
          <Slider label="Air Resistance" min={0} max={0.2} step={0.005} value={damping} onChange={setDamping} color="#ef4444" unit="coeff" />

          {/* Planets presets */}
          <div>
            <p className="text-[10px] text-slate-400 uppercase font-bold mb-2">Gravity Presets</p>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { label: '🌙 Moon', g: 1.62 },
                { label: '🌍 Earth', g: 9.81 },
                { label: '♂ Mars', g: 3.72 },
                { label: '♃ Jupiter', g: 24.79 },
                { label: '☀️ Sun', g: 274 },
                { label: '♀ Venus', g: 8.87 },
              ].map(p => (
                <button key={p.label} onClick={() => setGravity(Math.min(p.g, 24.8))}
                  className="py-1.5 px-1 rounded-lg text-[9px] font-bold bg-slate-800 text-slate-300 hover:bg-slate-700 active:scale-95 transition-all">
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Metrics grid */}
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: 'Period T', val: `${T.toFixed(3)} s`, color: '#60a5fa' },
              { label: 'Frequency', val: `${(1 / T).toFixed(3)} Hz`, color: '#4ade80' },
              { label: 'Length L', val: `${length} m`, color: '#f59e0b' },
              { label: 'Gravity g', val: `${gravity} m/s²`, color: '#f472b6' },
            ].map(m => (
              <div key={m.label} className="bg-slate-950 border border-white/10 rounded-xl p-3 text-center">
                <div className="text-[9px] text-slate-500 uppercase font-bold mb-1">{m.label}</div>
                <div className="font-mono font-bold text-xs" style={{ color: m.color }}>{m.val}</div>
              </div>
            ))}
          </div>

          {/* Formula */}
          <div className="bg-slate-950 rounded-xl p-3 border border-white/10">
            <p className="text-[10px] text-slate-400 uppercase font-bold mb-2">Formula</p>
            <p className="font-mono text-sm text-blue-400 text-center">T = 2π √(L ÷ g)</p>
          </div>

          {/* Controls */}
          <div className="flex gap-2">
            <button onClick={() => setRunning(r => !r)}
              className="flex-1 py-3 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all active:scale-95"
              style={{ backgroundColor: running ? '#dc2626' : hex }}>
              {running ? <><Pause size={16} /> Pause</> : <><Play size={16} /> Swing!</>}
            </button>
            <button onClick={() => { setRunning(false); }}
              className="px-4 py-3 rounded-xl bg-slate-800 text-slate-400 hover:text-red-400 hover:bg-red-900/20 transition-all">
              <RotateCcw size={16} />
            </button>
          </div>

          <p className="text-[10px] text-slate-500 text-center">🖱️ Drag to rotate • Scroll to zoom • Right-click to pan</p>
        </div>
      </div>
    </div>
  );
};

export default PendulumLab3D;
