import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Html, Line, Cylinder } from '@react-three/drei';
import * as THREE from 'three';
import DraggableSlider from './DraggableSlider';

interface Props { hex: string; }

// A reusable 3D vector arrow component
const VectorArrow = ({ start, length, angleDeg, color, label, showDashedParallelogram = false, f1End, f2End }: any) => {
  const rad = angleDeg * Math.PI / 180;
  // X = cos, Z = -sin (since Z is depth, to match traditional 2D X-Y where Y is UP, we map typical XY to XZ on the table, or we just render on XY plane)
  // Let's render on XY plane upright so the camera looks at it directly.
  const dir = new THREE.Vector3(Math.cos(rad), Math.sin(rad), 0);
  const end = new THREE.Vector3(start.x + dir.x * length, start.y + dir.y * length, start.z);
  
  return (
    <group>
      {/* Arrow Shaft */}
      <Line points={[start, end]} color={color} lineWidth={4} />
      <Line points={[start, end]} color="#ffffff" lineWidth={1} transparent opacity={0.5} />
      
      {/* Arrow Head */}
      <mesh position={end} rotation={[0, 0, rad - Math.PI/2]}>
        <coneGeometry args={[0.15, 0.4, 8]} />
        <meshBasicMaterial color={color} />
      </mesh>

      {/* Label */}
      <Html position={[end.x + dir.x * 0.5, end.y + dir.y * 0.5, 0]} center>
         <div className="font-bold text-xs px-1.5 py-0.5 rounded shadow-lg backdrop-blur-md border border-white/20"
              style={{ backgroundColor: `${color}40`, color: color }}>
           {label}: {length.toFixed(1)} N
         </div>
      </Html>

      {showDashedParallelogram && f1End && f2End && (
        <>
          <Line points={[f1End, end]} color="white" lineWidth={1} dashed dashSize={0.2} gapSize={0.1} transparent opacity={0.3} />
          <Line points={[f2End, end]} color="white" lineWidth={1} dashed dashSize={0.2} gapSize={0.1} transparent opacity={0.3} />
        </>
      )}
    </group>
  );
};

const ParallelogramScene = ({ f1, f2, angle }: { f1: number; f2: number; angle: number }) => {
  const toRad = (d: number) => d * Math.PI / 180;
  const f1Angle = 30; // base offset
  const f2Angle = f1Angle + angle;
  
  const f1x = f1 * Math.cos(toRad(f1Angle));
  const f1y = f1 * Math.sin(toRad(f1Angle));
  const f2x = f2 * Math.cos(toRad(f2Angle));
  const f2y = f2 * Math.sin(toRad(f2Angle));
  
  const rx = f1x + f2x;
  const ry = f1y + f2y;
  const R = Math.sqrt(rx * rx + ry * ry);
  const rAngleDeg = Math.atan2(ry, rx) * 180 / Math.PI;

  const origin = new THREE.Vector3(0, 0, 0);
  const scale = 0.5; // Visual scaling factor
  
  const f1End = new THREE.Vector3(f1x * scale, f1y * scale, 0);
  const f2End = new THREE.Vector3(f2x * scale, f2y * scale, 0);

  // Generate an arc points array to show the angle between F1 and F2
  const arcPoints = [];
  const arcRadius = 1.5;
  for(let i=0; i<=20; i++) {
    const a = f1Angle + (i/20)*angle;
    arcPoints.push(new THREE.Vector3(arcRadius * Math.cos(toRad(a)), arcRadius * Math.sin(toRad(a)), 0));
  }

  return (
    <group position={[0, -0.5, 0]}>
      {/* Background Grid Plate */}
      <mesh position={[0, 0, -0.1]} receiveShadow>
        <planeGeometry args={[15, 15]} />
        <meshStandardMaterial color="#0f172a" roughness={1} metalness={0} />
      </mesh>

      {/* Grid Lines (Visual) */}
      <gridHelper args={[15, 15, "#1e293b", "#1e293b"]} rotation={[Math.PI/2, 0, 0]} position={[0, 0, -0.05]} />

      {/* Origin Pin */}
      <mesh position={[0, 0, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.1, 0.2, 16]} />
        <meshStandardMaterial color="#f8fafc" metalness={0.9} />
      </mesh>

      {/* Angle Arc */}
      <Line points={arcPoints} color="#f59e0b" lineWidth={2} transparent opacity={0.6} />
      <Html position={[arcRadius * 1.3 * Math.cos(toRad(f1Angle + angle/2)), arcRadius * 1.3 * Math.sin(toRad(f1Angle + angle/2)), 0]} center>
         <div className="text-[10px] font-bold text-yellow-500 bg-black/60 px-1 rounded">θ = {angle}°</div>
      </Html>

      {/* Vectors */}
      {/* scale down lengths visually so 10N doesn't fly out of screen */}
      <VectorArrow start={origin} length={f1} angleDeg={f1Angle} color="#3b82f6" label="F₁" f1End={null} f2End={null} />
      <VectorArrow start={origin} length={f2} angleDeg={f2Angle} color="#f59e0b" label="F₂" f1End={null} f2End={null} />
      <VectorArrow start={origin} length={R} angleDeg={rAngleDeg} color="#10b981" label="R" showDashedParallelogram={true} f1End={f1End} f2End={f2End} />
      
      {/* HUD Float Overlay */}
      <Html position={[0, -3.5, 0]} center>
         <div className="bg-slate-900/90 border border-green-500/30 rounded-xl p-3 shadow-2xl backdrop-blur flex justify-between min-w-[200px] border-b-2 border-b-green-500">
            <div>
               <p className="text-[9px] uppercase tracking-widest text-slate-400 font-bold mb-1">Resultant Modulus</p>
               <p className="font-mono text-xl font-bold text-green-400">|R| = {R.toFixed(2)} N</p>
            </div>
            <div className="text-right">
               <p className="text-[9px] uppercase tracking-widest text-slate-400 font-bold mb-1">Direction</p>
               <p className="font-mono text-lg font-bold text-green-300">∠ {rAngleDeg.toFixed(1)}°</p>
            </div>
         </div>
      </Html>
    </group>
  );
};

const ParallelogramLab: React.FC<Props> = ({ hex }) => {
  const [f1, setF1] = useState(3); 
  const [f2, setF2] = useState(4); 
  const [angle, setAngle] = useState(60); 

  const toRad = (d: number) => d * Math.PI / 180;
  const R_formula = Math.sqrt(f1 * f1 + f2 * f2 + 2 * f1 * f2 * Math.cos(toRad(angle)));
  
  // Actually we need to calculate R exactly like the scene does to show the UI
  const f1x = f1 * Math.cos(toRad(30));
  const f1y = f1 * Math.sin(toRad(30));
  const f2x = f2 * Math.cos(toRad(30 + angle));
  const f2y = f2 * Math.sin(toRad(30 + angle));
  const rx = f1x + f2x, ry = f1y + f2y;
  const R = Math.sqrt(rx * rx + ry * ry);
  const rAngle = Math.atan2(ry, rx) * 180 / Math.PI;

  return (
    <div className="flex flex-col md:flex-row h-full w-full bg-slate-950">
      <div className="flex-1 relative rounded-2xl overflow-hidden m-4 border border-white/10 shadow-2xl">
        <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
          <Environment preset="city" />
          <ambientLight intensity={0.5} />
          <pointLight position={[5, 5, 5]} intensity={1} color="#60a5fa" />
          
          {/* We rotate the entire scene slightly so it's not totally flat 2D looking, bringing it into 3D perspective */}
          <group rotation={[-0.3, 0.2, 0]}>
             <ParallelogramScene f1={f1} f2={f2} angle={angle} />
          </group>

          <OrbitControls enablePan={true} enableZoom={true} />
        </Canvas>

        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3 shadow-xl max-w-[280px]">
          <p className="text-[10px] font-bold uppercase tracking-widest text-blue-400 mb-1">Physics Lab — p14</p>
          <p className="text-white font-bold text-sm">3D Parallelogram Law</p>
          <p className="text-xs text-slate-400 mt-1">Vectors in 3D space highlighting vector addition and the resulting diagonal.</p>
        </div>
      </div>

      <div className="w-full md:w-72 bg-slate-900 border-l border-white/5 flex flex-col z-10">
        <div className="p-5 border-b border-white/5">
           <h2 className="text-lg font-black text-white">Controls</h2>
        </div>
        <div className="flex-1 p-5 space-y-4 overflow-y-auto">
          <div className="bg-blue-500/10 border border-blue-500/30 p-3 rounded-xl shadow-inner">
            <p className="text-blue-200 text-xs">Vary magnitudes of F₁ and F₂ and the angle θ between them. The green vector shows the resultant R.</p>
          </div>

          <DraggableSlider label="Force F₁" min={1} max={10} step={0.5} value={f1} onChange={setF1} color="#3b82f6" unit="N" />
          <DraggableSlider label="Force F₂" min={1} max={10} step={0.5} value={f2} onChange={setF2} color="#f59e0b" unit="N" />
          <DraggableSlider label="Angle (θ)" min={10} max={170} value={angle} onChange={setAngle} color="#10b981" unit="°" />

          <div className="grid grid-cols-2 gap-2 mt-4">
            {[
              { label: 'F₁', val: `${f1.toFixed(1)} N`, color: '#3b82f6' },
              { label: 'F₂', val: `${f2.toFixed(1)} N`, color: '#f59e0b' },
              { label: 'R (Vector)', val: `${R.toFixed(3)} N`, color: '#10b981' },
              { label: 'R (Formula)', val: `${R_formula.toFixed(3)} N`, color: '#34d399' },
              { label: 'Dir of R', val: `${rAngle.toFixed(1)}°`, color: '#f472b6' },
              { label: 'Δ Error', val: `${Math.abs(R - R_formula).toFixed(4)}`, color: '#94a3b8' },
            ].map(m => (
              <div key={m.label} className="bg-slate-950/50 border border-white/5 rounded-xl p-2.5 text-center shadow-sm">
                <div className="text-[9px] text-slate-500 uppercase font-bold tracking-wider mb-1">{m.label}</div>
                <div className="font-mono font-bold text-sm bg-black/20 rounded py-0.5" style={{ color: m.color }}>{m.val}</div>
              </div>
            ))}
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-white/5 shadow-inner text-xs space-y-1.5 mt-2">
            <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-1 border-b border-white/5 pb-1">Mathematical Proof</p>
            <p className="font-mono text-blue-400 pt-1">R = √(F₁² + F₂² + 2F₁F₂cosθ)</p>
            <p className="font-mono text-slate-400 mt-2 text-[10px]">
              R = √({f1}² + {f2}² + 2·{f1}·{f2}·cos({angle}°))<br/>
              R = √({f1*f1} + {f2*f2} + {(2*f1*f2*Math.cos(toRad(angle))).toFixed(2)})<br/>
              R = {R_formula.toFixed(3)} N
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParallelogramLab;
