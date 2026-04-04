import React, { useRef, useState, useMemo } from 'react';
import { RotateCcw, Trash2 } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Html } from '@react-three/drei';
import * as THREE from 'three';
import DraggableSlider from './DraggableSlider';

interface Props { hex: string; }
interface Reading { tubeLen: number; resonanceLen: number; v: number; }

const StandingWave = ({ topY, bottomY, freq }: { topY: number; bottomY: number; freq: number }) => {
  const segments = 100;

  const points = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= segments; i++) pts.push(new THREE.Vector3(0, 0, 0));
    return pts;
  }, []);

  const geo = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points]);

  const mat = useMemo(() => new THREE.LineBasicMaterial({ color: '#10b981', linewidth: 4 }), []);
  const lineObj = useMemo(() => new THREE.Line(geo, mat), [geo, mat]);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const pos = lineObj.geometry.attributes.position;
    const airH = topY - bottomY;
    
    // Scale visual freq
    const visFreq = freq * 0.05;

    for(let i=0; i<=segments; i++) {
       const frac = i / segments; 
       const y = bottomY + frac * airH;
       const amp = 0.5 * Math.sin(Math.PI * 0.5 * frac) * Math.cos(t * visFreq);
       pos.setXYZ(i, amp, y, 0);
    }
    pos.needsUpdate = true;
  });

  return <primitive object={lineObj} />;
};

const TuningFork = ({ yPos, freq }: { yPos: number, freq: number }) => {
  const tineL = useRef<THREE.Mesh>(null);
  const tineR = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!tineL.current || !tineR.current) return;
    const t = clock.elapsedTime;
    const visFreq = freq * 0.05;
    // Tines vibrate opposite to each other
    const bendL = 0.05 * Math.sin(t * visFreq);
    tineL.current.rotation.z = -bendL;
    tineR.current.rotation.z = bendL;
  });

  return (
    <group position={[0, yPos, 0]}>
      {/* Handle */}
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.8]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.3} />
      </mesh>
      {/* U Base */}
      <mesh position={[0, -0.05, 0]}>
        <boxGeometry args={[0.4, 0.1, 0.08]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.3} />
      </mesh>
      {/* Tines */}
      <mesh ref={tineL} position={[-0.18, -0.05, 0]}>
        {/* We offset geometry downwards so rotation at top seems correct */}
        <boxGeometry args={[0.04, 0.8, 0.06]} />
        <meshStandardMaterial color="#e2e8f0" metalness={0.9} />
      </mesh>
      <mesh ref={tineR} position={[0.18, -0.05, 0]}>
        <boxGeometry args={[0.04, 0.8, 0.06]} />
        <meshStandardMaterial color="#e2e8f0" metalness={0.9} />
      </mesh>

      <Html position={[0.4, 0.5, 0]} className="pointer-events-none">
         <div className="text-[9px] text-white font-bold bg-purple-900/80 px-1 py-0.5 rounded border border-purple-500/50 backdrop-blur whitespace-nowrap">
           {freq} Hz
         </div>
      </Html>

      {/* Sound Waves radiating downward visually */}
      <SoundWavesRenderer freq={freq} />
    </group>
  );
};

const SoundWavesRenderer = ({ freq }: { freq: number }) => {
  const ringsRef = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!ringsRef.current) return;
    const t = clock.elapsedTime;
    ringsRef.current.children.forEach((obj, i) => {
      const mesh = obj as THREE.Mesh;
      const scale = (t * 2 - i * 0.5) % 2; 
      if (scale < 0) {
        mesh.scale.set(0.01, 0.01, 0.01);
        (mesh.material as THREE.MeshBasicMaterial).opacity = 0;
      } else {
        mesh.scale.set(scale, scale, scale);
        (mesh.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 1 - scale);
        mesh.position.y = -scale * 2 - 0.5;
      }
    });
  });

  return (
    <group ref={ringsRef}>
      {[0,1,2].map(i => (
        <mesh key={i} rotation={[Math.PI/2, 0, 0]}>
          <ringGeometry args={[0.8, 0.9, 32]} />
          <meshBasicMaterial color="#a78bfa" transparent opacity={0} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  );
}

const TubeScene = ({ tubeLen, freq }: { tubeLen: number, freq: number }) => {
  // Tube represents 100 cm vertically.
  // We'll scale visual size: 10 units total.
  const visualScale = 10 / 100; 
  
  const tubeBaseY = -5;
  const tubeTopY = 5;
  const waterLevelY = tubeTopY - (tubeLen * visualScale); // Water fills up to (100 - tubeLen)
  const waterHeight = waterLevelY - tubeBaseY;
  const waterCenterY = tubeBaseY + waterHeight / 2;

  return (
    <group>
      {/* 3D Glass Tube */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 10, 32, 1, true]} />
        <meshPhysicalMaterial 
          transmission={0.9} 
          thickness={0.05} 
          roughness={0} 
          ior={1.5} 
          clearcoat={1}
          color="#f8fafc"
          side={THREE.DoubleSide}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Water Column inside */}
      <mesh position={[0, waterCenterY, 0]}>
        <cylinderGeometry args={[0.28, 0.28, waterHeight, 32]} />
        <meshPhysicalMaterial 
           transmission={0.8} 
           color="#38bdf8" 
           thickness={0.5} 
           roughness={0.1} 
           ior={1.33} 
        />
      </mesh>

      {/* Standing Wave Indicator */}
      <StandingWave topY={tubeTopY} bottomY={waterLevelY} freq={freq} />

      {/* Tuning Fork suspended above tube */}
      <TuningFork yPos={tubeTopY + 1.2} freq={freq} />

      {/* Node / Antinode labels */}
      <Html position={[0.5, waterLevelY, 0]}>
        <div className="text-[9px] text-red-500 font-bold uppercase tracking-widest bg-black/60 px-1 py-0.5 rounded border border-red-500/50 backdrop-blur whitespace-nowrap">
           Node
        </div>
      </Html>
      <Html position={[0.5, tubeTopY, 0]}>
        <div className="text-[9px] text-green-400 font-bold uppercase tracking-widest bg-black/60 px-1 py-0.5 rounded border border-green-500/50 backdrop-blur whitespace-nowrap">
           Antinode
        </div>
      </Html>
      
      {/* Dynamic measurement ruler representing tube length air column */}
      <group position={[-0.8, tubeTopY, 0]}>
        <primitive object={new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0,0,0), new THREE.Vector3(0, waterLevelY - tubeTopY, 0)]),
          new THREE.LineBasicMaterial({ color: "#f59e0b" })
        )} />
        <Html position={[-0.2, (waterLevelY - tubeTopY)/2, 0]} center>
           <div className="text-[10px] text-yellow-500 font-bold bg-black/70 px-1 py-0.5 rounded backdrop-blur border border-yellow-500/30 whitespace-nowrap">
             l = {tubeLen} cm
           </div>
        </Html>
      </group>
    </group>
  );
};


const ResonanceTubeLab: React.FC<Props> = ({ hex }) => {
  const [tubeLen, setTubeLen] = useState(33); // cm
  const [freq, setFreq] = useState(512); // Hz
  const [readings, setReadings] = useState<Reading[]>([]);

  // Speed of sound: v = 4nl
  const v = 4 * freq * (tubeLen / 100);

  return (
    <div className="flex flex-col md:flex-row h-full w-full bg-slate-950">
      <div className="flex-1 relative rounded-2xl overflow-hidden m-4 border border-white/10 shadow-2xl">
        <Canvas camera={{ position: [0, 2, 10], fov: 60 }}>
          <Environment preset="night" />
          <ambientLight intensity={0.8} />
          <pointLight position={[5, 10, 5]} intensity={1.5} color="#e0f2fe" />
          <pointLight position={[-5, 0, 5]} intensity={0.5} />
          
          <TubeScene tubeLen={tubeLen} freq={freq} />
          
          <ContactShadows position={[0, -5.5, 0]} opacity={0.6} scale={15} blur={2.5} far={4} color="#000000" />
          <OrbitControls enablePan={true} enableZoom={true} target={[0, 0, 0]} maxPolarAngle={Math.PI/2 + 0.1} />
        </Canvas>

        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3 shadow-xl max-w-xs">
          <p className="text-[10px] font-bold uppercase tracking-widest text-green-400 mb-1">Physics Lab — p12</p>
          <p className="text-white font-bold text-sm">3D Resonance Tube</p>
          <p className="text-xs text-slate-400 mt-1">Determine velocity of sound in air. Visualizing quarter-wavelength node dynamics.</p>
        </div>
      </div>

      <div className="w-full md:w-72 bg-slate-900 border-l border-white/5 flex flex-col z-10">
        <div className="p-5 border-b border-white/5">
           <h2 className="text-lg font-black text-white">Controls</h2>
        </div>
        <div className="flex-1 p-5 space-y-4 overflow-y-auto">
          <div className="bg-green-500/10 border border-green-500/30 p-3 rounded-xl shadow-inner">
            <p className="text-green-200 text-xs">Vary tuning fork frequency (n) and the resonating air column length (l). The standing wave visually demonstrates the resonance pattern in 3D.</p>
          </div>

          <DraggableSlider label="Air Column Length (l₁)" min={10} max={80} value={tubeLen} onChange={setTubeLen} color="#10b981" unit="cm" />
          <DraggableSlider label="Tuning Fork Freq (n)" min={256} max={1024} step={64} value={freq} onChange={setFreq} color="#a78bfa" unit="Hz" />

          <div className="grid grid-cols-2 gap-2 mt-4">
            {[
              { label: 'Freq (n)', val: `${freq} Hz`, color: '#a78bfa' },
              { label: 'Length (l)', val: `${tubeLen} cm`, color: '#10b981' },
              { label: 'Wavelength (λ)', val: `${(tubeLen * 4).toFixed(0)} cm`, color: '#fbbf24' },
              { label: 'Velocity (v)', val: `${v.toFixed(1)} m/s`, color: '#4ade80' },
            ].map(m => (
              <div key={m.label} className="bg-slate-950/50 border border-white/5 rounded-xl p-2.5 text-center shadow-sm">
                <div className="text-[9px] text-slate-500 uppercase font-bold tracking-wider mb-1">{m.label}</div>
                <div className="font-mono font-bold text-sm bg-black/20 rounded py-0.5" style={{ color: m.color }}>{m.val}</div>
              </div>
            ))}
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-white/5 shadow-inner text-xs space-y-1.5 mt-2">
            <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-1 border-b border-white/5 pb-1">Mathematical Relation</p>
            <p className="font-mono text-green-400 pt-1">v = n × λ</p>
            <p className="font-mono text-green-400">λ = 4l₁ <span className="text-slate-500 text-[10px]">(1st resonance)</span></p>
            <p className="font-mono text-green-300 font-bold mt-2 border-t border-white/5 pt-1">v = 4nl₁</p>
          </div>

          <div className="flex gap-2 pt-2">
            <button onClick={() => setReadings(prev => [...prev, { tubeLen, resonanceLen: tubeLen, v }])}
              className="flex-1 py-3 rounded-xl text-sm font-bold text-white transition-all active:scale-95 shadow-lg shadow-green-600/20"
              style={{ backgroundColor: hex }}>
              Log Reading
            </button>
            <button onClick={() => setReadings([])}
              className="px-4 py-3 rounded-xl bg-slate-800 text-red-400 hover:bg-red-900/30 hover:text-red-300 transition-colors">
              <RotateCcw size={16} />
            </button>
          </div>

          {readings.length > 0 && (
            <div className="overflow-x-auto text-[10px] bg-slate-950 rounded-xl border border-white/5 mt-2">
              <table className="w-full border-collapse">
                <thead><tr className="bg-slate-900/80 border-b border-white/10">
                  {['#', 'n(Hz)', 'l(cm)', 'v(m/s)', ''].map(h => <th key={h} className="px-3 py-2 text-slate-400 text-left font-semibold">{h}</th>)}
                </tr></thead>
                <tbody>{readings.map((r, i) => (
                  <tr key={i} className="border-b border-white/5 last:border-b-0 hover:bg-white/5 transition-colors">
                    <td className="px-3 py-2 text-slate-500">{i + 1}</td>
                    <td className="px-3 py-2 font-mono text-purple-400">{r.v / (4 * (r.tubeLen/100))}</td>
                    <td className="px-3 py-2 font-mono text-green-400">{r.tubeLen}</td>
                    <td className="px-3 py-2 font-mono text-yellow-500 font-bold">{r.v.toFixed(1)}</td>
                    <td className="px-3 py-2 text-right">
                       <button onClick={() => setReadings(p => p.filter((_, j) => j !== i))} className="text-slate-600 hover:text-red-400 transition-colors">
                         <Trash2 size={12} />
                       </button>
                    </td>
                  </tr>
                ))}</tbody>
              </table>
              {readings.length > 1 && (
                <div className="p-2 border-t border-white/10 bg-black/40">
                   <p className="text-center font-mono text-xs text-green-400 font-bold">
                     Mean v = {(readings.reduce((a, b) => a + b.v, 0) / readings.length).toFixed(1)} m/s
                   </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResonanceTubeLab;
