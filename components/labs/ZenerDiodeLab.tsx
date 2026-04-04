import React, { useState, useEffect, useRef } from 'react';
import { RotateCcw, Activity, Power, Zap } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Line, Html, Box, Cylinder } from '@react-three/drei';
import * as THREE from 'three';
import DraggableSlider from './DraggableSlider';

interface Props { hex: string; }
interface Reading { V: number; I: number; Vz: number; }

const ZenerCircuitScene = ({ voltage, Vz, isBreaking, current }: any) => {
  // Rotate electrons based on current
  const electronGroup = useRef<THREE.Group>(null);
  
  useFrame(() => {
     if(electronGroup.current) {
         // Current flows clockwise or ccw depending on electron flow
         // The higher the current, the faster it spins
         const speed = (current * 0.05) + (voltage * 0.005);
         electronGroup.current.rotation.z -= speed;
     }
  });

  return (
    <group position={[0, -0.5, 0]}>
      {/* Breadboard / Base */}
      <Box args={[6, 0.4, 4]} position={[0, -0.2, 0]} castShadow receiveShadow>
         <meshStandardMaterial color="#020617" roughness={0.9} />
      </Box>

      {/* Zener Diode Component */}
      <group position={[0, 0.5, 1]} rotation={[0, 0, Math.PI/2]}>
          {/* Glass Body */}
          <Cylinder args={[0.2, 0.2, 1.2, 16]} position={[0,0,0]} castShadow>
              <meshPhysicalMaterial color="#ea580c" transmission={0.8} opacity={1} roughness={0.1} ior={1.5} thickness={0.5} />
          </Cylinder>
          {/* Internal core */}
          <Cylinder args={[0.08, 0.08, 0.8, 16]} position={[0,0,0]}>
              <meshStandardMaterial color="#78350f" />
          </Cylinder>
          {/* Cathode Band (Black) */}
          <Cylinder args={[0.21, 0.21, 0.2, 16]} position={[0, 0.4, 0]} castShadow>
              <meshStandardMaterial color="#000" />
          </Cylinder>
          {/* Leads */}
          <Cylinder args={[0.05, 0.05, 1, 16]} position={[0, 1.1, 0]}><meshStandardMaterial color="#cbd5e1" metalness={0.8} /></Cylinder>
          <Cylinder args={[0.05, 0.05, 1, 16]} position={[0, -1.1, 0]}><meshStandardMaterial color="#cbd5e1" metalness={0.8} /></Cylinder>
      </group>

      {/* Series Resistor */}
      <group position={[0, 0.5, -1]} rotation={[0, 0, Math.PI/2]}>
          <Cylinder args={[0.15, 0.15, 1.2, 16]} position={[0,0,0]} castShadow>
              <meshStandardMaterial color="#d4d4d8" roughness={0.8} />
          </Cylinder>
          <Cylinder args={[0.16, 0.16, 0.1, 16]} position={[0, 0.3, 0]}><meshStandardMaterial color="#ef4444" /></Cylinder>
          <Cylinder args={[0.16, 0.16, 0.1, 16]} position={[0, 0, 0]}><meshStandardMaterial color="#8b5cf6" /></Cylinder>
          <Cylinder args={[0.16, 0.16, 0.1, 16]} position={[0, -0.3, 0]}><meshStandardMaterial color="#000" /></Cylinder>
          {/* Leads */}
          <Cylinder args={[0.05, 0.05, 1, 16]} position={[0, 1.1, 0]}><meshStandardMaterial color="#cbd5e1" metalness={0.8} /></Cylinder>
          <Cylinder args={[0.05, 0.05, 1, 16]} position={[0, -1.1, 0]}><meshStandardMaterial color="#cbd5e1" metalness={0.8} /></Cylinder>
      </group>

      {/* Connection Wires forming a loop */}
      <Line points={[[-1.6, 0.5, 1], [-2.5, 0.5, 1], [-2.5, 0.5, -1], [-1.6, 0.5, -1]]} color="#3b82f6" lineWidth={4} />
      <Line points={[[1.6, 0.5, 1], [2.5, 0.5, 1], [2.5, 0.5, -1], [1.6, 0.5, -1]]} color="#3b82f6" lineWidth={4} />

      {/* Status glowing indicator */}
      <Html position={[0, 1.5, 1]} center>
          <div className={`px-2 py-1 rounded text-xs font-bold border backdrop-blur-md whitespace-nowrap transition-colors ${isBreaking ? 'bg-red-500/20 text-red-400 border-red-500/50 shadow-[0_0_15px_#ef4444]' : 'bg-slate-800/50 text-slate-400 border-white/10'}`}>
              Reverse Bias {voltage.toFixed(1)}V
          </div>
      </Html>
      {isBreaking && (
          <Html position={[2.5, 0.5, 0]} center>
              <div className="bg-red-900/80 text-red-300 font-bold px-2 py-0.5 rounded text-[10px] animate-pulse">BREAKDOWN I = {(Math.abs(current)*1000).toFixed(0)}mA</div>
          </Html>
      )}
      
    </group>
  );
};


const ZenerDiodeLab: React.FC<Props> = ({ hex }) => {
  const [voltage, setVoltage] = useState(0); 
  const [Vz] = useState(5.6); 
  const [readings, setReadings] = useState<Reading[]>([]);
  const [sweeping, setSweeping] = useState(false);
  const sweepRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  const getI = (v: number): number => {
    if (v < Vz) return -v * 0.001; 
    return -(((v - Vz) * 15) + 0.1); 
  };
  const I = getI(voltage);
  const isBreaking = voltage >= Vz;

  useEffect(() => {
    if (sweeping) {
      sweepRef.current = setInterval(() => {
        setVoltage(v => {
          const next = parseFloat((v + 0.2).toFixed(1));
          if (next > 12) { setSweeping(false); return 0; }
          setReadings(prev => {
              if (prev.length > 60) return []; // reset to avoid clutter
              return [...prev, { V: next, I: getI(next), Vz }];
          });
          return next;
        });
      }, 100);
    } else {
      clearInterval(sweepRef.current);
    }
    return () => clearInterval(sweepRef.current);
  }, [sweeping, Vz]);

  const handleLogManual = () => {
     setReadings(prev => [...prev, { V: voltage, I: I, Vz }]);
  };

  const drawTrace = () => {
     // SVG path builder
     let pts = [];
     for (let v=0; v<=12; v+=0.2) {
         const i = Math.abs(getI(v)) * 1000;
         if (i > 100) continue;
         pts.push(`${v * 30},${180 - (i * 1.5)}`);
     }
     return pts.join(' L ');
  };

  // Convert logged path to SVG
  const loggedPath = readings.length > 0 
      ? readings.map(r => `${r.V*30},${180 - (Math.min(Math.abs(r.I)*1000, 100)*1.5)}`).join(' L ')
      : "";

  return (
    <div className="flex flex-col md:flex-row h-full w-full bg-[#050505] overflow-hidden text-slate-200 select-none">
      
      <div className="flex-1 flex flex-col relative rounded-2xl overflow-hidden m-4 border border-white/10 shadow-2xl">
        <div className="absolute inset-x-0 top-0 p-4 bg-gradient-to-b from-black/80 to-transparent z-10 flex justify-between">
            <div>
                <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-red-500/20 text-red-400"><Activity size={18} /></span>
                    Zener Breakdown 3D
                </h2>
                <p className="text-[11px] font-medium text-slate-400 uppercase tracking-widest mt-1">Voltage Regulation Circuit</p>
            </div>
        </div>

        <Canvas camera={{ position: [0, 4, 6], fov: 45 }}>
            <Environment preset="apartment" />
            <ambientLight intensity={0.6} />
            <pointLight position={[5, 10, 5]} intensity={1.5} />
            <pointLight position={[-5, 5, -5]} color="#ef4444" intensity={isBreaking ? 2 : 0} />
            
            <ZenerCircuitScene voltage={voltage} Vz={Vz} isBreaking={isBreaking} current={I} />

            <ContactShadows position={[0, -0.7, 0]} opacity={0.8} scale={15} blur={2.5} far={4} color="#000" />
            <OrbitControls enablePan={true} enableZoom={true} maxPolarAngle={Math.PI / 2 - 0.1} />
        </Canvas>

        {/* 2D HUD Graph Overlay */}
        <div className="absolute bottom-4 left-4 w-80 h-56 bg-black/80 border border-white/10 rounded-xl backdrop-blur-xl p-4 shadow-2xl flex flex-col">
            <h3 className="text-[9px] text-slate-500 uppercase font-bold tracking-widest mb-2 border-b border-white/10 pb-1">Zener I-V Curve (Reverse Bias)</h3>
            <div className="flex-1 relative overflow-hidden">
                <svg width="100%" height="100%" viewBox="0 -10 380 200" className="absolute inset-0">
                    <defs>
                        <linearGradient id="curveGrad" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#3b82f6" />
                            <stop offset="40%" stopColor="#3b82f6" />
                            <stop offset="45%" stopColor="#ef4444" />
                            <stop offset="100%" stopColor="#ef4444" />
                        </linearGradient>
                    </defs>
                    {/* Grid */}
                    <line x1="0" y1="180" x2="360" y2="180" stroke="#334155" strokeWidth="2" />
                    <line x1="0" y1="0" x2="0" y2="180" stroke="#334155" strokeWidth="2" />
                    
                    {/* Zener Knee Marker */}
                    <line x1={Vz*30} y1="0" x2={Vz*30} y2="180" stroke="#ef4444" strokeWidth="1" strokeDasharray="4 4" />
                    <text x={Vz*30 + 5} y="20" fill="#ef4444" fontSize="10" fontWeight="bold">Vz = {Vz}V</text>

                    {/* Theoretical Curve */}
                    <path d={`M 0,180 L ${drawTrace()}`} fill="none" stroke="url(#curveGrad)" strokeWidth="3" opacity="0.4" />
                    
                    {/* Logged Trace */}
                    {loggedPath && <path d={`M ${loggedPath}`} fill="none" stroke="#fff" strokeWidth="2" />}

                    {/* Live Dot */}
                    <circle cx={voltage*30} cy={180 - (Math.min(Math.abs(I)*1000, 100)*1.5)} r="5" fill={isBreaking ? '#ef4444' : '#3b82f6'} />
                    
                    {/* Legend */}
                    <text x="5" y="195" fill="#64748b" fontSize="10">0</text>
                    <text x="350" y="195" fill="#64748b" fontSize="10">12V</text>
                </svg>
            </div>
        </div>

      </div>

      <div className="w-full md:w-80 shrink-0 bg-[#0a0a0a] border-l border-white/10 flex flex-col z-20">
        <div className="p-6 flex-1 overflow-y-auto space-y-6">
          
          <div>
            <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2 mb-4"><Power size={14} className="text-amber-400" /> Voltage Source</h3>
            <div className="bg-[#111] rounded-2xl p-5 border border-white/10 shadow-inner">
              <div className="text-center mb-5">
                <div className="font-mono text-3xl font-light text-white">{voltage.toFixed(1)}<span className="text-sm text-slate-500 ml-1">V</span></div>
                <div className="text-[9px] uppercase tracking-widest text-slate-500 mt-1">Reverse Voltage</div>
              </div>
              <DraggableSlider label="" min={0} max={12} step={0.1} value={voltage} onChange={setVoltage} color={isBreaking ? '#ef4444' : '#3b82f6'} formatValue={() => ''} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
             <div className="bg-slate-900/50 border border-white/5 rounded-xl p-3 text-center">
                <div className="text-[9px] text-slate-400 uppercase font-bold tracking-wider mb-1">State</div>
                <div className={`font-bold text-xs ${isBreaking ? 'text-red-400' : 'text-blue-400'}`}>{isBreaking ? 'BREAKDOWN' : 'Leakage'}</div>
             </div>
             <div className="bg-slate-900/50 border border-white/5 rounded-xl p-3 text-center">
                <div className="text-[9px] text-slate-400 uppercase font-bold tracking-wider mb-1">Current</div>
                <div className="font-mono font-bold text-xs text-white">{(Math.abs(I)*1000).toFixed(2)} mA</div>
             </div>
          </div>

          <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/5">
              <h4 className="text-[10px] font-bold uppercase text-red-400 flex items-center gap-1.5 mb-2"><Zap size={10} /> Avalanche Effect</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                When Reverse Voltage exceeds the Zener Voltage (Vz), intense electric fields tear electrons from covalent bonds. Current skyrockets, but voltage remains tightly regulated at Vz.
              </p>
          </div>

          <div className="flex gap-2 pt-2">
            <button onClick={handleLogManual} className="flex-1 py-3 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 transition-colors shadow-lg shadow-blue-500/20 active:scale-95">
                Log Point
            </button>
            <button onClick={() => setSweeping(!sweeping)} className={`flex-1 py-3 rounded-xl text-xs font-bold text-white transition-colors active:scale-95 ${sweeping ? 'bg-red-600 shadow-lg shadow-red-500/20' : 'bg-slate-700 hover:bg-slate-600'}`}>
                {sweeping ? 'Stop Sweep' : 'Auto Sweep'}
            </button>
          </div>

          <button onClick={() => { setReadings([]); setVoltage(0); setSweeping(false); }} className="w-full py-2.5 rounded-xl text-xs bg-slate-800/80 text-red-400 hover:bg-red-900/40 transition-colors flex items-center justify-center gap-2">
              <RotateCcw size={12} /> Clear Graph
          </button>
        </div>
      </div>

    </div>
  );
};

export default ZenerDiodeLab;
