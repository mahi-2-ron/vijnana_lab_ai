import React, { useState, useEffect, useRef } from 'react';
import { motion, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { Activity, Power, Zap, RotateCcw, Trash2 } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Line, Html, Box, RoundedBox, Sphere } from '@react-three/drei';
import * as THREE from 'three';

interface DiodeLabProps { hex: string; }

// --- 3D PARTICLE SYSTEM FOR ELECTRONS ---
const MovingElectrons = ({ count, active, IsReverse }: { count: number, active: boolean, IsReverse: boolean }) => {
  const group = useRef<THREE.Group>(null);
  const particles = useRef<{ pos: THREE.Vector3, speed: number }[]>([]);

  useEffect(() => {
    particles.current = Array(count).fill(0).map(() => ({
      pos: new THREE.Vector3(
        (Math.random() - 0.5) * 4 + (IsReverse ? -2 : 2), 
        (Math.random() - 0.5) * 1.5, 
        (Math.random() - 0.5) * 1.5
      ),
      speed: 0.02 + Math.random() * 0.05
    }));
  }, [count, IsReverse]);

  useFrame(() => {
    if (!active || !group.current) return;
    group.current.children.forEach((child, i) => {
      const p = particles.current[i];
      if (!p) return;
      if (!IsReverse) {
          // Forward: electrons move N to P (Right to Left)
          p.pos.x -= p.speed;
          if (p.pos.x < -3) { p.pos.x = 3; }
      } else {
          // Breakdown/Reverse: drift (Left to Right slowly/fast)
          p.pos.x += p.speed;
          if(p.pos.x > 3) { p.pos.x = -3; }
      }
      child.position.copy(p.pos);
    });
  });

  return (
    <group ref={group}>
      {Array(count).fill(0).map((_, i) => (
        <Sphere key={i} args={[0.04, 8, 8]} position={[0, 1000, 0]}>
          <meshBasicMaterial color={IsReverse ? "#a78bfa" : "#fca5a5"} />
        </Sphere>
      ))}
    </group>
  );
};

// --- 3D DIODE SCENE ---
const DiodeScene = ({ mode, voltage, breakdownV, Is_F, VT, Is_R }: any) => {
  // Calculate depletion width scalar
  let depScalar = 1;
  if (mode === 'forward') {
    depScalar = Math.max(0.1, 1 - (voltage / 0.8)); // shrinks to almost 0
  } else {
    depScalar = 1 + (voltage / 10); // widens
  }

  // Calculate current for particle density
  let i_val = 0;
  if (mode === 'forward') i_val = Is_F * (Math.exp(voltage / (1.5 * VT)) - 1);
  else i_val = voltage < breakdownV ? Is_R * (1 - Math.exp(-voltage / VT)) : Is_R + Math.pow(voltage - breakdownV, 2) * 5;
  const isBreakdown = mode === 'reverse' && voltage >= breakdownV;
  

  return (
    <group position={[0, 0, 0]}>
      {/* P-Type Semiconductor */}
      <Box args={[2, 1.5, 1.5]} position={[-1 - (depScalar * 0.5), 0, 0]} castShadow>
        <meshPhysicalMaterial color="#1e3a8a" transmission={0.4} opacity={0.8} transparent roughness={0.2} metalness={0.1} />
        <Html center position={[0, 1, 0]}>
            <div className="text-blue-400 font-bold text-xl drop-shadow-md bg-black/40 px-2 rounded backdrop-blur">P</div>
        </Html>
      </Box>

      {/* Depletion Region */}
      <Box args={[depScalar, 1.5, 1.5]} position={[0, 0, 0]} receiveShadow>
        <meshPhysicalMaterial color="#94a3b8" transmission={0.9} opacity={0.6} transparent roughness={0.05} ior={1.5} />
      </Box>

      {/* N-Type Semiconductor */}
      <Box args={[2, 1.5, 1.5]} position={[1 + (depScalar * 0.5), 0, 0]} castShadow>
        <meshPhysicalMaterial color="#991b1b" transmission={0.4} opacity={0.8} transparent roughness={0.2} metalness={0.1} />
        <Html center position={[0, 1, 0]}>
            <div className="text-red-400 font-bold text-xl drop-shadow-md bg-black/40 px-2 rounded backdrop-blur">N</div>
        </Html>
      </Box>

      {/* Metallic Contacts */}
      <Box args={[0.1, 1.5, 1.5]} position={[-2.05 - (depScalar * 0.5), 0, 0]} castShadow><meshStandardMaterial color="#94a3b8" metalness={1} roughness={0.2} /></Box>
      <Box args={[0.1, 1.5, 1.5]} position={[2.05 + (depScalar * 0.5), 0, 0]} castShadow><meshStandardMaterial color="#94a3b8" metalness={1} roughness={0.2} /></Box>
      
      {/* Wiring */}
      <Line points={[[-2.1 - (depScalar * 0.5), 0, 0], [-4, 0, 0]]} color="#cbd5e1" lineWidth={3} />
      <Line points={[[2.1 + (depScalar * 0.5), 0, 0], [4, 0, 0]]} color="#cbd5e1" lineWidth={3} />

      {/* Active Electrons */}
      <MovingElectrons 
        count={mode==='forward' ? Math.min(200, Math.floor(i_val * 2)) : (isBreakdown ? 150 : 5)} 
        active={mode === 'forward' ? i_val > 0.5 : (isBreakdown || i_val > 0.5)} 
        IsReverse={mode === 'reverse'} 
      />

    </group>
  );
};


export default function DiodeLab({ hex }: DiodeLabProps) {
  const [mode, setMode] = useState<'forward' | 'reverse'>('forward');
  const [voltage, setVoltage] = useState(0); // 0 to 1 for forward (V), 0 to 50 for reverse (V)
  const [readings, setReadings] = useState<{ v: number; i: number }[]>([]);

  // Physics params
  const VT = 0.026; 
  const Is_F = 1e-9; 
  const Is_R = 1.5;   
  const breakdownV = 35; 

  const V_disp = mode === 'forward' ? voltage : -voltage;
  let I_disp = 0;
  if (mode === 'forward') {
    I_disp = Is_F * (Math.exp(voltage / (1.5 * VT)) - 1);
    if (I_disp > 100) I_disp = 100;
  } else {
    if (voltage < breakdownV) {
      I_disp = Is_R * (1 - Math.exp(-voltage / VT)); 
    } else {
      I_disp = Is_R + Math.pow(voltage - breakdownV, 2) * 5; 
    }
  }

  useEffect(() => {
    setVoltage(0);
    setReadings([]);
  }, [mode]);

  const handleLog = () => {
    if (readings.some(r => Math.abs(r.v - V_disp) < 0.01)) return;
    const newR = [...readings, { v: V_disp, i: mode === 'forward' ? I_disp : -I_disp }];
    newR.sort((a,b) => Math.abs(a.v) - Math.abs(b.v));
    setReadings(newR);
  };

  // Convert array to three.js Vector3 array for graph overlay
  const getGraphPoints = () => {
      if (readings.length < 2) return [];
      return readings.map(r => {
          // Map to a 2D bounding box on the screen overlay
          const px = mode === 'forward' ? Math.abs(r.v) * 400 : 400 - Math.abs(r.v) * 8;
          const py = mode === 'forward' ? 300 - Math.abs(r.i) * 3 : 100 + Math.abs(r.i) * 2;
          return `${px},${py}`;
      });
  };
  const pathStr = getGraphPoints().length > 1 ? `M ${mode==='forward'?'0,300':'400,100'} L ${getGraphPoints().join(' L ')}` : '';

  return (
    <div className="flex flex-col md:flex-row h-full w-full bg-[#050505] overflow-hidden text-slate-200 select-none">
      
      {/* LEFT AREA: 3D Visualization */}
      <div className="flex-1 flex flex-col relative rounded-2xl overflow-hidden m-4 border border-white/10 shadow-2xl">
        <div className="absolute inset-x-0 top-0 p-4 bg-gradient-to-b from-black/80 to-transparent z-10 flex justify-between items-start">
            <div>
                <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-orange-500/20 text-orange-400"><Activity size={18} /></span>
                    P-N Junction 3D
                </h2>
                <p className="text-[11px] font-medium text-slate-400 uppercase tracking-widest mt-1">Microscopic Semiconductor View</p>
            </div>
            {/* Mode Switcher */}
            <div className="flex bg-black/60 p-1 rounded-xl border border-white/10 backdrop-blur-md shadow-inner">
                <button onClick={() => setMode('forward')} className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${mode === 'forward' ? 'bg-blue-600 shadow-md shadow-blue-500/50 text-white' : 'text-slate-400 hover:text-white'}`}>Forward Bias</button>
                <button onClick={() => setMode('reverse')} className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${mode === 'reverse' ? 'bg-orange-600 shadow-md shadow-orange-500/50 text-white' : 'text-slate-400 hover:text-white'}`}>Reverse Bias</button>
            </div>
        </div>

        <Canvas camera={{ position: [0, 2, 7], fov: 40 }}>
            <Environment preset="city" />
            <ambientLight intensity={0.4} />
            <pointLight position={[5, 5, 5]} intensity={1.5} />
            <pointLight position={[-5, -5, -5]} color="#3b82f6" intensity={1} />
            
            <DiodeScene mode={mode} voltage={voltage} breakdownV={breakdownV} Is_F={Is_F} Is_R={Is_R} VT={VT} />

            <ContactShadows position={[0, -1.5, 0]} opacity={0.8} scale={15} blur={2.5} far={4} color="#000" />
            <OrbitControls enablePan={true} enableZoom={true} maxPolarAngle={Math.PI / 2 + 0.1} />
        </Canvas>

        {/* 2D HUD Graph Overlay at Bottom Left */}
        <div className="absolute bottom-4 left-4 w-64 h-48 bg-black/80 border border-white/10 rounded-xl backdrop-blur-xl p-3 shadow-2xl flex flex-col">
            <h3 className="text-[9px] text-slate-500 uppercase font-bold tracking-widest mb-2 border-b border-white/10 pb-1">Live V-I Graph</h3>
            <div className="flex-1 relative">
                <svg width="100%" height="100%" viewBox="0 0 450 350" className="absolute inset-0">
                    <line x1="0" y1="300" x2="450" y2="300" stroke="#334155" strokeWidth="2" />
                    <line x1="0" y1="300" x2="0" y2="0" stroke="#334155" strokeWidth="2" />
                    <line x1="400" y1="350" x2="400" y2="0" stroke="#334155" strokeWidth="2" />
                    <line x1="0" y1="100" x2="450" y2="100" stroke="#334155" strokeWidth="2" />

                    {pathStr && <path d={pathStr} fill="none" stroke="#3b82f6" strokeWidth="4" />}
                    
                    {getGraphPoints().map((pt, i) => (
                        <circle key={i} cx={pt.split(',')[0]} cy={pt.split(',')[1]} r="5" fill="#fff" stroke="#3b82f6" strokeWidth="2" />
                    ))}
                    
                    {/* Live Dot */}
                    {mode === 'forward' && <circle cx={voltage*400} cy={300 - (I_disp*3)} r="6" fill="#60a5fa" />}
                    {mode === 'reverse' && <circle cx={400 - voltage*8} cy={100 + (I_disp*2)} r="6" fill="#fb923c" />}
                </svg>
            </div>
        </div>

      </div>

      {/* RIGHT CONTROL PANEL */}
      <div className="w-full md:w-80 shrink-0 bg-[#0a0a0a] border-l border-white/10 flex flex-col z-20">
        <div className="p-6 flex-1 overflow-y-auto space-y-6">
          
          <div>
            <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2 mb-4"><Power size={14} className="text-amber-400" /> DC Power Supply</h3>
            <div className="bg-[#111] rounded-2xl p-5 border border-white/10 shadow-inner">
              <div className="text-center mb-5">
                <div className="font-mono text-3xl font-light text-white">{voltage.toFixed(2)}<span className="text-sm text-slate-500 ml-1">V</span></div>
                <div className="text-[9px] uppercase tracking-widest text-slate-500 mt-1">Output Volts</div>
              </div>

              <div className="relative h-1.5 bg-slate-800 rounded-full mb-3">
                <div className="absolute left-0 top-0 bottom-0 bg-amber-500 rounded-full transition-all" style={{ width: `${(voltage / (mode === 'forward' ? 1 : 50)) * 100}%` }} />
                <input 
                  type="range" min="0" max={mode === 'forward' ? 1 : 50} step={mode === 'forward' ? 0.01 : 0.5} 
                  value={voltage} onChange={e => setVoltage(parseFloat(e.target.value))} 
                  className="absolute inset-0 w-full opacity-0 cursor-ew-resize"
                />
                <div className="absolute w-4 h-4 bg-white rounded-full shadow-lg pointer-events-none transition-all" style={{ top: '-5px', left: `calc(${(voltage / (mode === 'forward' ? 1 : 50)) * 100}% - 8px)` }} />
              </div>
            </div>
          </div>

          {/* Quick HUD outputs */}
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-blue-900/20 border border-blue-500/20 rounded-xl p-3 text-center">
                <div className="text-[9px] text-blue-400/70 uppercase font-bold tracking-wider mb-1">Volts Passed</div>
                <div className="font-mono font-bold text-sm text-blue-300">{V_disp.toFixed(2)}V</div>
            </div>
            <div className="bg-orange-900/20 border border-orange-500/20 rounded-xl p-3 text-center">
                <div className="text-[9px] text-orange-400/70 uppercase font-bold tracking-wider mb-1">Current Output</div>
                <div className="font-mono font-bold text-sm text-orange-300">{I_disp.toFixed(2)} {mode==='forward'?'mA':'μA'}</div>
            </div>
          </div>

          <button onClick={handleLog} className="w-full py-3 rounded-xl text-sm font-bold text-white shadow-lg shadow-blue-500/20 active:scale-95 transition-all" style={{ background: 'linear-gradient(135deg, #2563eb, #3b82f6)' }}>
            Log Data Point
          </button>

          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Observation Table</h3>
              <button onClick={() => setReadings([])} className="text-red-400 hover:text-red-300"><RotateCcw size={12} /></button>
            </div>
            <div className="bg-[#111] rounded-xl border border-white/5 overflow-hidden">
              <table className="w-full text-xs text-left">
                <thead className="bg-white/5 border-b border-white/10">
                  <tr>
                    <th className="px-3 py-2 text-slate-400 font-medium">V (V)</th>
                    <th className="px-3 py-2 text-slate-400 font-medium">I ({mode==='forward'?'mA':'μA'})</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {readings.length === 0 && <tr><td colSpan={3} className="px-3 py-4 text-center text-slate-600 text-[10px]">No readings taken</td></tr>}
                  {readings.map((r, i) => (
                    <tr key={i} className="border-b border-white/5 hover:bg-white/5 last:border-0">
                      <td className="px-3 py-2 font-mono text-slate-300">{r.v.toFixed(2)}</td>
                      <td className="px-3 py-2 font-mono" style={{ color: mode==='forward'?'#60a5fa':'#fb923c' }}>{Math.abs(r.i).toFixed(3)}</td>
                      <td className="px-2 py-2 text-right"><button onClick={() => setReadings(p => p.filter((_, j) => j !== i))} className="text-red-500 hover:text-red-400"><Trash2 size={12}/></button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
