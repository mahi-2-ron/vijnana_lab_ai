import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, RotateCcw, Droplet, Activity, Layers, PenTool, Check, Info, ShieldCheck } from 'lucide-react';

type Phase = 'ASSEMBLY' | 'EXPERIMENTAL' | 'ANALYSIS' | 'DONE';

interface Terminal {
  id: string;
  x: number;
  y: number;
  type: 'battery' | 'ammeter' | 'rheostat' | 'electrode';
  color: string;
}

const ElectrolysisSim: React.FC = () => {
  const [phase, setPhase] = useState<Phase>('ASSEMBLY');
  const [message, setMessage] = useState('Initialize Faraday Experiment: Position the Research Beaker on the workbench.');

  // Simulation Data
  const [beakerPlaced, setBeakerPlaced] = useState(false);
  const [liquidLevel, setLiquidLevel] = useState(0); // 0 to 1
  const [anodePlaced, setAnodePlaced] = useState(false);
  const [cathodePlaced, setCathodePlaced] = useState(false);
  const [isWired, setIsWired] = useState(false);
  
  const [current, setCurrent] = useState(0); // Amp
  const [anodeMass, setAnodeMass] = useState(10); 
  const [cathodeMass, setCathodeMass] = useState(10);
  const [time, setTime] = useState(0);
  const [rheostatVal, setRheostatVal] = useState(0.5);

  // Interaction
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [dragPos, setDragPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  
  const svgRef = useRef<SVGSVGElement>(null);


  const handleStartDrag = (e: React.TouchEvent | React.MouseEvent, type: string) => {
    setActiveItem(type);
    setIsDragging(true);
    const touch = 'touches' in e ? e.touches[0] : e;
    const rect = svgRef.current?.getBoundingClientRect();
    if (rect) setDragPos({ x: touch.clientX - rect.left, y: touch.clientY - rect.top });
  };

  const handleMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging) return;
    const touch = 'touches' in e ? e.touches[0] : e;
    const rect = svgRef.current?.getBoundingClientRect();
    if (rect) setDragPos({ x: touch.clientX - rect.left, y: touch.clientY - rect.top });
  };

  const handleDrop = () => {
    if (!activeItem || phase !== 'ASSEMBLY') {
      setIsDragging(false);
      setActiveItem(null);
      return;
    }

    const { x, y } = dragPos;
    const isTarget = (tx: number, ty: number, w: number, h: number) => 
      x > tx && x < tx + w && y > ty && y < ty + h;

    if (activeItem === 'beaker' && isTarget(400, 400, 200, 300)) {
       setBeakerPlaced(true);
       setMessage('Research Beaker Secured. Load CuSO4 Electrolyte into the vessel.');
    } else if (activeItem === 'solution' && beakerPlaced && isTarget(450, 420, 100, 200)) {
       setLiquidLevel(0.8);
       setMessage('Electrolyte Loaded. Deploy Ionizing Electrodes into the solution.');
    } else if (activeItem === 'anode' && liquidLevel > 0 && isTarget(400, 420, 100, 200)) {
       setAnodePlaced(true);
    } else if (activeItem === 'cathode' && anodePlaced && isTarget(500, 420, 100, 200)) {
       setCathodePlaced(true);
       setMessage('Electrodes Active. Establish Circuit Connectivity using the high-tension wiring.');
    } else if (activeItem === 'wire' && cathodePlaced) {
       setIsWired(true);
       setPhase('EXPERIMENTAL');
       setMessage('Quantum Circuit Activated. Modulate the Rheostat to adjust ion flow velocity.');
       if (globalThis.navigator.vibrate) globalThis.navigator.vibrate([100, 50, 100]);
    }

    setIsDragging(false);
    setActiveItem(null);
  };

  const particleIds = useMemo(() => Array.from({ length: 30 }, () => Math.random().toString(36).substr(2, 9)), []);

  // Electrolysis Physics Engine
  useEffect(() => {
    if (phase === 'EXPERIMENTAL' && isWired) {
      const loop = setInterval(() => {
        const iVal = (1 - rheostatVal) * 2.5; // Up to 2.5A
        setCurrent(Number.parseFloat(iVal.toFixed(2)));
        setTime(prev => prev + 1);

        if (iVal > 0) {
           setAnodeMass(m => Math.max(0.5, m - (iVal * 0.005)));
           setCathodeMass(m => m + (iVal * 0.0045)); // Slight efficiency loss for realism
        }
        
        if (time > 120) {
           setPhase('DONE');
           setMessage('Experiment Cycle Concluded. Analyze final mass differentials.');
        }
      }, 500);
      return () => clearInterval(loop);
    }
  }, [phase, isWired, rheostatVal, time]);

  return (
    <div className="w-full h-full bg-[#020617] rounded-3xl overflow-hidden flex flex-col font-sans select-none touch-none border border-white/5 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#1e293b_0%,_transparent_60%)] opacity-30 pointer-events-none" />
      
      {/* HUD Controller */}
      <div className="p-4 md:p-6 bg-slate-900/60 backdrop-blur-3xl border-b border-white/5 flex items-center justify-between z-50">
        <div className="flex items-center gap-4 md:gap-6">
           <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center shadow-2xl shadow-blue-500/20 relative">
              <Zap className="text-blue-400" size={24} />
              {phase === 'EXPERIMENTAL' && current > 0 && (
                 <motion.div 
                   animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
                   transition={{ duration: 1, repeat: Infinity }}
                   className="absolute inset-0 rounded-[1.5rem] border-2 border-blue-400" 
                 />
              )}
           </div>
           <div>
              <h2 className="text-xl md:text-2xl font-black text-white tracking-tighter uppercase leading-none mb-1">Faraday Dynamics</h2>
              <div className="flex items-center gap-2">
                 <div className="px-1.5 py-0.5 rounded bg-blue-500/20 border border-blue-500/30 text-[7px] font-black text-blue-400 uppercase tracking-widest">{phase}</div>
                 <span className="text-[10px] text-blue-300/60 font-bold uppercase tracking-widest leading-none">{message}</span>
              </div>
           </div>
        </div>
        
        <div className="flex items-center gap-3 md:gap-4">
           <div className="px-4 py-2 rounded-xl bg-black/40 border border-white/5 flex gap-4 md:gap-8">
              <div className="text-center">
                 <p className="text-[8px] text-slate-500 font-bold uppercase mb-0.5">Amperage</p>
                 <p className="text-sm md:text-lg font-mono text-blue-400 font-black leading-none">{current.toFixed(2)}<span className="text-[9px] ml-0.5">A</span></p>
              </div>
              <div className="w-[1px] h-6 bg-white/10 self-center" />
              <div className="text-center">
                 <p className="text-[8px] text-slate-500 font-bold uppercase mb-0.5">Time</p>
                 <p className="text-sm md:text-lg font-mono text-white font-black leading-none">{time}<span className="text-[9px] ml-0.5">S</span></p>
              </div>
           </div>
           <button onClick={() => globalThis.location.reload()} className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 hover:text-white transition-all border border-white/5 hover:border-white/10 group active:scale-95 shadow-xl">
              <RotateCcw size={20} className="group-hover:rotate-180 transition-transform duration-700" />
           </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Component Silos */}
        <div className="w-60 md:w-64 bg-black/40 backdrop-blur-2xl border-r border-white/5 flex flex-col p-4 md:p-6 gap-3 md:gap-4 overflow-y-auto custom-scrollbar shadow-2xl">
           <p className="text-[9px] md:text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] pl-2 border-l-2 border-blue-500/50 mb-1">Work Modules</p>
           
            { [
               { id: 'beaker', name: 'Vacuum Beaker', icon: <Layers size={20} />, active: !beakerPlaced },
               { id: 'solution', name: 'CuSO4 Electrolyte', icon: <Droplet size={20} />, active: beakerPlaced && liquidLevel === 0 },
               { id: 'anode', name: 'Reactive Anode', icon: <Activity size={20} />, active: liquidLevel > 0 && !anodePlaced },
               { id: 'cathode', name: 'Reactive Cathode', icon: <Activity size={20} />, active: anodePlaced && !cathodePlaced },
               { id: 'wire', name: 'Assembly Harness', icon: <PenTool size={20} />, active: cathodePlaced && !isWired }
            ].map(item => item.active && (
              <button 
                key={item.id}
                onMouseDown={(e) => handleStartDrag(e, item.id)} onTouchStart={(e) => handleStartDrag(e, item.id)}
                className="w-full text-left p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center gap-4 cursor-grab hover:bg-white/[0.08] hover:border-blue-500/30 transition-all group shadow-lg"
              >
                 <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform shrink-0">
                    {item.icon}
                 </div>
                 <div className="flex flex-col min-w-0">
                    <span className="text-[9px] font-black text-white uppercase tracking-wider truncate">{item.name}</span>
                    <span className="text-[7px] font-bold text-slate-500 uppercase tracking-widest mt-0.5 truncate">Ready for deploy</span>
                 </div>
              </button>
            ))}

           {phase === 'EXPERIMENTAL' && (
              <div className="mt-auto p-6 rounded-[2rem] bg-indigo-500/5 border border-indigo-500/20 animate-pulse">
                <div className="flex items-center gap-3 mb-4">
                   <ShieldCheck className="text-indigo-400" size={16} />
                   <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest leading-none">Safety Protocol</span>
                </div>
                <p className="text-[9px] text-slate-500 font-bold uppercase leading-relaxed italic">Reactive atmosphere stable. Monitoring ion migration patterns in real-time.</p>
              </div>
           )}
        </div>

        {/* Tactical Workbench */}
        <div className="flex-1 relative bg-[radial-gradient(circle_at_center,_#0f172a_0%,_#020617_100%)]">
           <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `radial-gradient(#fff 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />
           
           <svg 
             ref={svgRef} className="w-full h-full" viewBox="0 0 1000 800"
             onMouseMove={handleMove} onTouchMove={handleMove}
             onMouseUp={handleDrop} onTouchEnd={handleDrop}
           >
              <defs>
                 <filter id="neon-glow">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                 </filter>
                 <linearGradient id="glassShiny" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.02)" />
                    <stop offset="50%" stopColor="rgba(255,255,255,0.15)" />
                    <stop offset="100%" stopColor="rgba(255,255,255,0.02)" />
                 </linearGradient>
              </defs>

              {/* Instrumentation Rack */}
              <g transform="translate(100, 100)">
                 {/* 6V Power Supply */}
                 <rect x="0" y="0" width="160" height="120" fill="#1e293b" rx="15" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                 <rect x="15" y="15" width="130" height="40" fill="#020617" rx="8" />
                 <text x="80" y="42" textAnchor="middle" fill="#3b82f6" fontSize="18" fontStyle="italic" fontWeight="black" className="font-mono">6.00V</text>
                 <circle cx="40" cy="85" r="10" fill="#ef4444" filter="url(#neon-glow)" /> {/** + */}
                 <circle cx="120" cy="85" r="10" fill="#475569" /> {/** - */}
                 <text x="80" y="105" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="8" fontWeight="black" className="uppercase tracking-[0.3em]">Phase Capacitor</text>
              </g>

              <g transform="translate(320, 100)">
                 {/* Quantum Ammeter */}
                 <rect x="0" y="0" width="180" height="120" fill="#1e293b" rx="15" />
                 <rect x="15" y="15" width="150" height="60" fill="#020617" rx="8" />
                 <text x="90" y="55" textAnchor="middle" fill="#60a5fa" fontSize="24" fontWeight="black" className="font-mono tracking-tighter">{current.toFixed(2)} A</text>
                 <circle cx="45" cy="95" r="8" fill="#ef4444" />
                 <circle cx="135" cy="95" r="8" fill="#ef4444" />
              </g>

              <g transform="translate(560, 100)">
                 {/* Linear Rheostat */}
                 <rect x="0" y="0" width="280" height="120" fill="#1e293b" rx="15" />
                 <rect x="30" y="55" width="220" height="10" fill="#020617" rx="5" />
                 <motion.rect 
                    x={30 + (rheostatVal * 200)} y="35" width="20" height="50" fill="#3b82f6" rx="6"
                    className="cursor-pointer"
                    onMouseDown={(e) => {
                       const startX = e.clientX;
                       const onMove = (mE: MouseEvent) => {
                          const delta = (mE.clientX - startX) / 200;
                          setRheostatVal(v => Math.max(0, Math.min(1, v + delta)));
                       };
                       const onEnd = () => { globalThis.removeEventListener('mousemove', onMove); globalThis.removeEventListener('mouseup', onEnd); };
                       globalThis.addEventListener('mousemove', onMove); globalThis.addEventListener('mouseup', onEnd);
                    }}
                 />
                 <text x="140" y="105" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="8" fontWeight="black" className="uppercase tracking-[0.3em]">Ion Velocity Modulator</text>
              </g>

              {/* Research Vessel Context */}
              {beakerPlaced && (
                 <g transform="translate(400, 420)">
                    {/* Glass Vessel */}
                    <path d="M0,0 L200,0 L180,260 Q180,280 160,280 L40,280 Q20,280 20,260 L0,-0 Z" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.15)" strokeWidth="3" />
                    <rect x="0" y="0" width="200" height="280" fill="url(#glassShiny)" pointerEvents="none" />
                    
                    {/* Ionized Electrolyte */}
                    <AnimatePresence>
                       {liquidLevel > 0 && (
                          <motion.path 
                            initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} style={{ transformOrigin: 'bottom' }}
                            d="M10,60 L190,60 L175,265 Q175,275 165,275 L35,275 Q25,275 25,265 L10,60 Z" 
                            fill="rgba(59, 130, 246, 0.45)" 
                          />
                       )}
                    </AnimatePresence>

                    {/* Active Electrodes */}
                    {anodePlaced && (
                       <g transform="translate(50, 20)">
                          <rect x={-anodeMass} y="0" width={anodeMass * 2} height="200" fill="#b45309" stroke="#78350f" strokeWidth="1" />
                          <circle cx="0" cy="0" r="10" fill="#fbbf24" stroke="#d97706" /> {/* Terminal */}
                       </g>
                    )}
                    {cathodePlaced && (
                       <g transform="translate(150, 20)">
                          <rect x={-cathodeMass} y="0" width={cathodeMass * 2} height="200" fill="#5b21b6" stroke="#4c1d95" strokeWidth="1" />
                          <circle cx="0" cy="0" r="10" fill="#fbbf24" stroke="#d97706" />
                       </g>
                    )}

                    {/* Molecular Activity Simulation */}
                    {phase === 'EXPERIMENTAL' && current > 0 && (
                       <g>
                          {/* Hydrogen Evolution / Effervescence */}
                           {new Array(15).fill(0).map((_, i) => (
                              <motion.circle 
                                 key={`bubble-particle-${particleIds[i]}`} animate={{ y: [220, 60], opacity: [0, 0.8, 0], scale: [0.5, 1.2, 0.5] }}
                                 transition={{ duration: Math.random() * 2 + 1, repeat: Infinity, delay: Math.random() * 2 }}
                                 cx={140 + Math.random() * 20} r="2" fill="white"
                              />
                           ))}
                          {/* Cu2+ Cation Drift towards Cathode */}
                           {new Array(12).fill(0).map((_, i) => (
                              <motion.circle 
                                 key={`ion-particle-${particleIds[i+15]}`} animate={{ x: [50, 150], opacity: [0, 1, 0] }}
                                 transition={{ duration: 3, repeat: Infinity, delay: Math.random() * 3 }}
                                 cy={100 + Math.random() * 150} r="3" fill="#3b82f6" filter="url(#neon-glow)"
                              />
                           ))}
                       </g>
                    )}
                 </g>
              )}

              {/* Quantum Wiring Interface */}
              {isWired && (
                 <g>
                    {/* Wiring paths mapped to static terminals for cleaner look */}
                    <motion.path 
                       initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5 }}
                       d="M230,185 Q300,250 380,185" stroke="#ef4444" strokeWidth="5" fill="none" strokeLinecap="round" 
                    />
                    <motion.path 
                       initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 0.5 }}
                       d="M420,185 Q435,280 450,370" stroke="#ef4444" strokeWidth="5" fill="none" strokeLinecap="round" 
                    />
                    <motion.path 
                       initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 1 }}
                       d="M550,370 Q565,220 590,185" stroke="#475569" strokeWidth="5" fill="none" strokeLinecap="round" 
                    />
                    <motion.path 
                       initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 1.5 }}
                       d="M810,185 Q820,300 172,185" stroke="#475569" strokeWidth="5" fill="none" strokeLinecap="round" 
                    />
                    
                    {/* Electron Flow visualization */}
                    {current > 0 && (
                       <motion.circle r="4" fill="#fbbf24" filter="url(#neon-glow)">
                          <animateMotion dur="2s" repeatCount="indefinite" path="M230,185 Q300,250 380,185" />
                       </motion.circle>
                    )}
                 </g>
              )}

              {/* Tactical Drop Indicator */}
              {isDragging && activeItem && (
                 <g transform={`translate(${dragPos.x}, ${dragPos.y})`} className="opacity-60 pointer-events-none">
                    {activeItem === 'beaker' && <path d="M-50,-100 L50,-100 L40,100 Q40,120 20,120 L-20,120 Q-40,120 -40,100 L-50,-100 Z" fill="rgba(59, 130, 246, 0.2)" stroke="white" strokeWidth="2" />}
                    {activeItem === 'solution' && <circle r="25" fill="#3b82f6" stroke="white" strokeWidth="2" />}
                    {(activeItem === 'anode' || activeItem === 'cathode') && <rect x="-10" y="-80" width="20" height="160" fill={activeItem === 'anode' ? '#b45309' : '#5b21b6'} stroke="white" strokeWidth="1" />}
                    {activeItem === 'wire' && <circle r="15" fill="none" stroke="#ef4444" strokeWidth="6" className="animate-pulse" />}
                 </g>
              )}
           </svg>

           {/* Real-time Telemetry Overlay */}
           {phase !== 'ASSEMBLY' && (
              <div className="absolute top-8 right-8 w-72 space-y-4">
                 <div className="p-6 bg-black/60 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] shadow-2xl overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-500 to-transparent opacity-50" />
                    <div className="flex items-center gap-3 mb-6">
                       <Activity size={18} className="text-blue-400" />
                       <span className="text-[10px] font-black text-white uppercase tracking-widest">Mass Telemetry</span>
                    </div>
                    <div className="space-y-5">
                       <div className="flex justify-between items-end">
                          <div>
                             <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Anode Deposit</p>
                             <p className="text-2xl font-mono text-white font-black leading-none">{anodeMass.toFixed(3)}<span className="text-[10px] ml-1">g</span></p>
                          </div>
                          <div className="w-16 h-[2px] bg-white/5 mb-1" />
                       </div>
                       <div className="flex justify-between items-end">
                          <div>
                             <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Cathode Deposit</p>
                             <p className="text-2xl font-mono text-blue-400 font-black leading-none">{cathodeMass.toFixed(3)}<span className="text-[10px] ml-1">g</span></p>
                          </div>
                          <div className="w-16 h-[2px] bg-blue-500/20 mb-1" />
                       </div>
                    </div>
                 </div>
                 
                 <div className="p-4 bg-blue-500/10 backdrop-blur-xl border border-blue-500/20 rounded-2xl flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                       <Info size={14} />
                    </div>
                    <p className="text-[9px] text-blue-300 font-bold uppercase tracking-wider leading-tight">Theoretical Yield: { (current * time * 0.000329).toFixed(4) }g Copper</p>
                 </div>
              </div>
           )}
        </div>
      </div>

      <AnimatePresence>
         {phase === 'DONE' && (
            <motion.div 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }}
               className="absolute inset-0 z-[100] bg-slate-950/95 backdrop-blur-3xl flex items-center justify-center p-10"
            >
               <motion.div 
                 initial={{ scale: 0.9, y: 50 }} animate={{ scale: 1, y: 0 }}
                 className="w-full max-w-4xl bg-slate-900 border border-white/10 rounded-[4rem] p-16 shadow-[0_0_100px_rgba(59,130,246,0.1)] relative overflow-hidden"
               >
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-indigo-600 to-blue-500" />
                  
                  <div className="flex items-center gap-10 mb-12">
                     <div className="w-24 h-24 rounded-[2.5rem] bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500 shadow-2xl">
                        <Check size={48} />
                     </div>
                     <div>
                        <h2 className="text-5xl font-black text-white tracking-tighter uppercase leading-none mb-4">Cycle Terminated</h2>
                        <p className="text-slate-500 font-bold uppercase tracking-[0.5em] text-xs">Faraday Constant Verified: Electro-Chemical Synthesis Complete</p>
                     </div>
                  </div>

                  <div className="grid grid-cols-2 gap-8 mb-12">
                     <div className="p-8 rounded-[3rem] bg-white/5 border border-white/5 flex flex-col gap-4">
                        <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Total Energy Flux</div>
                        <div className="text-3xl font-mono text-white font-black italic">{(current * time).toFixed(1)} <span className="text-sm">Coulombs</span></div>
                     </div>
                     <div className="p-8 rounded-[3rem] bg-blue-500/10 border border-blue-500/20 flex flex-col gap-4">
                        <div className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Mass Transformation</div>
                        <div className="text-3xl font-mono text-blue-400 font-black italic">+{(cathodeMass - 10).toFixed(4)} <span className="text-sm">g Net Mass</span></div>
                     </div>
                  </div>

                  <button onClick={() => globalThis.location.reload()} className="w-full py-10 rounded-[3rem] bg-slate-800 hover:bg-slate-700 text-white font-black text-sm uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-6 active:scale-95 border border-white/5">
                     <RotateCcw size={24} /> Initialize New Sequence
                  </button>
               </motion.div>
            </motion.div>
         )}
      </AnimatePresence>

      <style>{`
         .custom-scrollbar::-webkit-scrollbar { width: 4px; }
         .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
         .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(59,130,246,0.1); border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default ElectrolysisSim;
