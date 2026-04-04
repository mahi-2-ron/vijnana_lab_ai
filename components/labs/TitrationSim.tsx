import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Beaker, RotateCcw, Check, ShieldCheck, Activity, Droplet, PenTool, Layout, ClipboardList } from 'lucide-react';

type Phase = 'ASSEMBLY' | 'PIPETTE_TRANSFER' | 'INDICATOR_DROP' | 'TITRATION' | 'RESULTS';

interface EquipmentItem {
  id: string;
  name: string;
  type: 'stand' | 'clamp' | 'burette' | 'tile' | 'flask' | 'pipette' | 'indicator';
  isPlaced: boolean;
  snapsTo?: string;
  icon: React.ReactNode;
}

const TitrationSim: React.FC = () => {
  const [phase, setPhase] = useState<Phase>('ASSEMBLY');
  const [message, setMessage] = useState('Initialize Volumetric Analysis: Assemble the Titration Rig on the tactical workbench.');
  
  const [items, setItems] = useState<EquipmentItem[]>([
    { id: 'stand', name: 'Iron Support Stand', type: 'stand', isPlaced: false, icon: <Layout size={20} /> },
    { id: 'tile', name: 'Ceramic White Tile', type: 'tile', isPlaced: false, snapsTo: 'bench', icon: <Layout size={20} /> },
    { id: 'clamp', name: 'Precision Clamp', type: 'clamp', isPlaced: false, snapsTo: 'stand', icon: <PenTool size={20} /> },
    { id: 'burette', name: 'Glass Burette (50mL)', type: 'burette', isPlaced: false, snapsTo: 'clamp', icon: <Activity size={20} /> },
    { id: 'flask', name: 'Analyte Flask', type: 'flask', isPlaced: false, snapsTo: 'tile', icon: <Beaker size={20} /> },
    { id: 'pipette', name: 'Transfer Pipette', type: 'pipette', isPlaced: false, icon: <Droplet size={20} /> },
    { id: 'indicator', name: 'Phenolphthalein', type: 'indicator', isPlaced: false, icon: <Droplet size={20} /> },
  ]);

  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [dragPos, setDragPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [shake, setShake] = useState(false);
  
  const [buretteVolume, setBuretteVolume] = useState(50);
  const [reading, setReading] = useState(0);
  const [tapOpen, setTapOpen] = useState(0);
  const [indicatorDrops, setIndicatorDrops] = useState(0);
  const [analyteAdded, setAnalyteAdded] = useState(false);
  const [isTitrated, setIsTitrated] = useState(false);
  
  const svgRef = useRef<SVGSVGElement>(null);
  const [log, setLog] = useState<{ id: number; reading: string }[]>([]);

  const SNAP_ZONES = {
    stand: { x: 500, y: 300, w: 100, h: 400 },
    tile: { x: 450, y: 650, w: 150, h: 30 },
    clamp: { x: 500, y: 250, w: 80, h: 40 },
    burette: { x: 500, y: 150, w: 30, h: 350 },
    flask: { x: 500, y: 580, w: 100, h: 80 },
    pipette_drop: { x: 500, y: 550, w: 100, h: 100 },
    indicator_drop: { x: 500, y: 550, w: 100, h: 100 }
  };

  const handleStartDrag = (e: React.TouchEvent | React.MouseEvent, id: string) => {
    setActiveItem(id);
    setIsDragging(true);
    const touch = 'touches' in e ? e.touches[0] : e;
    const rect = svgRef.current?.getBoundingClientRect();
    if (rect) {
      setDragPos({ x: touch.clientX - rect.left, y: touch.clientY - rect.top });
    }
  };

  const handleMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging) return;
    const touch = 'touches' in e ? e.touches[0] : (e as React.MouseEvent);
    const rect = svgRef.current?.getBoundingClientRect();
    if (rect) {
      setDragPos({ 
        x: (touch.clientX - rect.left) * (1000 / rect.width), 
        y: (touch.clientY - rect.top) * (800 / rect.height) 
      });
    }
  };

  const triggerShake = () => {
    setShake(true);
    if (globalThis.navigator.vibrate) globalThis.navigator.vibrate(40);
    setTimeout(() => setShake(false), 300);
  };

  const handleAssemblyDrop = (x: number, y: number, activeId: string) => {
    const isInside = (zone: { x: number; y: number; w: number; h: number }) => 
      x > zone.x - zone.w/2 && x < zone.x + zone.w/2 && y > zone.y - zone.h/2 && y < zone.y + zone.h/2;
    
    const checkDep = (depId: string) => items.find(i => i.id === depId)?.isPlaced;

    const success = (activeId === 'stand' && isInside(SNAP_ZONES.stand)) ||
                  (activeId === 'tile' && isInside(SNAP_ZONES.tile)) ||
                  (activeId === 'clamp' && checkDep('stand') && isInside(SNAP_ZONES.clamp)) ||
                  (activeId === 'burette' && checkDep('clamp') && isInside(SNAP_ZONES.burette)) ||
                  (activeId === 'flask' && checkDep('tile') && isInside(SNAP_ZONES.flask));

    if (success) {
      setItems(prev => prev.map(i => i.id === activeId ? { ...i, isPlaced: true } : i));
      if (globalThis.navigator.vibrate) globalThis.navigator.vibrate(20);
    } else {
      triggerShake();
    }
  };

  const handleActionDrop = (x: number, y: number, activeId: string) => {
    const isInside = (zone: { x: number; y: number; w: number; h: number }) => 
      x > zone.x - zone.w/2 && x < zone.x + zone.w/2 && y > zone.y - zone.h/2 && y < zone.y + zone.h/2;

    if (phase === 'PIPETTE_TRANSFER') {
      if (activeId === 'pipette' && isInside(SNAP_ZONES.pipette_drop)) {
        setAnalyteAdded(true);
        setPhase('INDICATOR_DROP');
        setMessage('Analyte Transferred. Add 2 drops of Phenolphthalein indicator.');
        if (globalThis.navigator.vibrate) globalThis.navigator.vibrate(20);
        return;
      }
    } else if (phase === 'INDICATOR_DROP') {
      if (activeId === 'indicator' && isInside(SNAP_ZONES.indicator_drop)) {
        setIndicatorDrops(prev => {
          const next = prev + 1;
          if (next >= 2) {
            setPhase('TITRATION');
            setMessage('Indicator Added. Shift: Colorless -> Pink. Drag the Burette Tap to begin titration.');
          }
          return next;
        });
        if (globalThis.navigator.vibrate) globalThis.navigator.vibrate(20);
        return;
      }
    }
    triggerShake();
  };

  const handleDrop = () => {
    if (!activeItem) return;
    const { x, y } = dragPos;

    if (phase === 'ASSEMBLY') {
      handleAssemblyDrop(x, y, activeItem);
    } else {
      handleActionDrop(x, y, activeItem);
    }

    setIsDragging(false);
    setActiveItem(null);
  };

  useEffect(() => {
    if (phase === 'TITRATION' && tapOpen > 0 && buretteVolume > 0) {
      const loop = setInterval(() => {
        const flow = tapOpen * 0.1;
        setBuretteVolume(v => Math.max(0, v - flow));
        setReading(r => r + flow);
      }, 50);
      return () => clearInterval(loop);
    }
  }, [phase, tapOpen, buretteVolume]);

  useEffect(() => {
    const allBasic = items.filter(i => ['stand', 'tile', 'clamp', 'burette', 'flask'].includes(i.id)).every(i => i.isPlaced);
    if (allBasic && phase === 'ASSEMBLY') {
      setPhase('PIPETTE_TRANSFER');
      setMessage('Hardware Configured. Transfer 25mL of NaOH analyte into the flask.');
    }
  }, [items, phase]);

  const flaskColor = useMemo(() => {
    if (phase === 'ASSEMBLY' || phase === 'PIPETTE_TRANSFER') return 'rgba(255,255,255,0.05)';
    if (phase === 'INDICATOR_DROP') return 'rgba(255,255,255,0.1)';
    const eq = 22.4;
    const diff = reading - eq;
    if (diff < -0.5) return 'rgba(244, 114, 182, 0.4)';
    if (diff < 0) return 'rgba(244, 114, 182, 0.15)';
    if (diff < 0.5) return 'rgba(255, 255, 255, 0.2)';
    return 'rgba(251, 191, 36, 0.2)';
  }, [reading, phase]);

  return (
    <div className="w-full h-full bg-[#020617] rounded-3xl overflow-hidden flex flex-col font-sans select-none touch-none border border-white/5 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#1e293b_0%,_transparent_60%)] opacity-30 pointer-events-none" />
      
      {/* HUD Header */}
      <div className="p-4 md:p-6 bg-slate-900/60 backdrop-blur-3xl border-b border-white/5 flex items-center justify-between z-50">
        <div className="flex items-center gap-4 md:gap-6">
           <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center shadow-2xl relative shrink-0">
              <Activity className="text-indigo-400" size={24} />
           </div>
           <div className="flex flex-col border-l border-white/10 pl-4">
              <h2 className="text-xl md:text-2xl font-black text-white tracking-tighter uppercase leading-none mb-1">Volumetric Titration</h2>
              <div className="flex items-center gap-2">
                 <div className="px-1.5 py-0.5 rounded bg-indigo-500/20 border border-indigo-500/30 text-[7px] font-black text-indigo-400 uppercase tracking-widest">{phase.replace('_', ' ')}</div>
                 <span className="text-[10px] text-indigo-300/60 font-bold uppercase tracking-widest leading-none">{message}</span>
              </div>
           </div>
        </div>
        
        <div className="flex items-center gap-3 md:gap-4">
           <div className="px-4 py-2 rounded-xl bg-black/40 border border-white/5 flex gap-4 md:gap-6">
              <div className="text-center">
                 <p className="text-[8px] text-slate-500 font-bold uppercase mb-0.5">Volume</p>
                 <p className="text-sm md:text-lg font-mono text-indigo-400 font-black leading-none">{buretteVolume.toFixed(2)}<span className="text-[9px] ml-0.5">mL</span></p>
              </div>
              <div className="w-[1px] h-6 bg-white/10 self-center" />
              <div className="text-center">
                 <p className="text-[8px] text-slate-500 font-bold uppercase mb-0.5">Flow</p>
                 <p className="text-sm md:text-lg font-mono text-white font-black leading-none">{Math.round(tapOpen * 100)}<span className="text-[9px] ml-0.5">%</span></p>
              </div>
           </div>
           <button onClick={() => globalThis.location.reload()} className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 hover:text-white transition-all border border-white/5 hover:border-white/10 group active:scale-95">
              <RotateCcw size={20} className="group-hover:rotate-180 transition-transform duration-700" />
           </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Hardware Tray */}
        <div className="w-56 md:w-64 bg-black/40 backdrop-blur-2xl border-r border-white/5 flex flex-col p-4 gap-3 overflow-y-auto custom-scrollbar shadow-2xl z-50">
           <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] pl-2 border-l-2 border-indigo-500/50 mb-1">Hardware Array</p>
           
           {(phase === 'ASSEMBLY' ? items : items.filter(i => ['pipette', 'indicator'].includes(i.type))).map(item => !item.isPlaced && (
              <button 
                key={item.id}
                onMouseDown={(e) => handleStartDrag(e, item.id)} onTouchStart={(e) => handleStartDrag(e, item.id)}
                className="w-full text-left p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center gap-4 cursor-grab hover:bg-white/[0.08] hover:border-indigo-500/30 transition-all group shadow-lg"
              >
                 <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform shrink-0">
                    {item.icon}
                 </div>
                 <div className="flex flex-col min-w-0">
                    <span className="text-[9px] font-black text-white uppercase tracking-wider truncate">{item.name}</span>
                    <span className="text-[7px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">Ready to deploy</span>
                 </div>
              </button>
           ))}

           {phase === 'TITRATION' && (
              <div className="mt-auto space-y-4">
                 <div className="p-5 rounded-2xl bg-indigo-500/5 border border-indigo-500/20">
                    <div className="flex items-center gap-3 mb-2">
                       <ShieldCheck className="text-indigo-400" size={14} />
                       <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest">Protocol</span>
                    </div>
                    <p className="text-[8px] text-slate-500 font-bold uppercase italic leading-tight">Optimizing threshold alignment.</p>
                 </div>
                 <button 
                   onClick={() => {
                     setLog(prev => [...prev, { id: prev.length + 1, reading: reading.toFixed(2) }]);
                     if (reading > 22 && reading < 23) setIsTitrated(true);
                   }}
                   className="w-full py-4 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-black text-[9px] uppercase tracking-widest transition-all active:scale-95"
                 >
                   LOG READING
                 </button>
              </div>
           )}
        </div>

        {/* Observation Bench */}
        <div className={`flex-1 relative bg-[radial-gradient(circle_at_center,_#0f172a_0%,_#020617_100%)] ${shake ? 'animate-shake' : ''}`}>
           <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `radial-gradient(#fff 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />
           
           <svg 
              ref={svgRef} className="w-full h-full" viewBox="0 0 1000 800"
              onMouseMove={handleMove} onTouchMove={handleMove}
              onMouseUp={handleDrop} onTouchEnd={handleDrop}
           >
              <defs>
                 <filter id="titre-glow"><feGaussianBlur stdDeviation="3" result="blur" /><feComposite in="SourceGraphic" in2="blur" operator="over" /></filter>
                 <linearGradient id="flaskShiny" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.02)" /><stop offset="50%" stopColor="rgba(255,255,255,0.15)" /><stop offset="100%" stopColor="rgba(255,255,255,0.02)" />
                 </linearGradient>
              </defs>

              <rect x="300" y="700" width="400" height="40" fill="#1e293b" rx="10" />
              <text x="500" y="730" textAnchor="middle" fill="rgba(255,255,255,0.1)" fontSize="10" fontWeight="black" className="uppercase tracking-[0.5em]">Titre Station A-1</text>

              {items.find(i => i.id === 'stand')?.isPlaced && (
                 <g transform="translate(480, 200)">
                    <rect x="0" y="500" width="140" height="20" fill="#334155" rx="5" />
                    <rect x="65" y="0" width="10" height="500" fill="#64748b" />
                 </g>
              )}

              {items.find(i => i.id === 'tile')?.isPlaced && (
                 <rect x="470" y="685" width="160" height="15" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" rx="2" />
              )}

              {items.find(i => i.id === 'clamp')?.isPlaced && (
                 <g transform="translate(480, 250)">
                    <rect x="0" y="0" width="70" height="8" fill="#475569" rx="2" />
                    <circle cx="70" cy="4" r="15" fill="none" stroke="#475569" strokeWidth="4" />
                 </g>
              )}

              {items.find(i => i.id === 'burette')?.isPlaced && (
                 <g transform="translate(540, 100)">
                    <rect x="0" y="0" width="20" height="450" fill="rgba(200,230,255,0.1)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                    <rect x="1" y={450 - (buretteVolume * 9)} width="18" height={buretteVolume * 9} fill="rgba(60,160,255,0.3)" />
                    {new Array(50).fill(0).map((_, i) => (
                       <line key={`burette-mark-${i}`} x1="0" y1={i * 9} x2={i % 5 === 0 ? 10 : 5} y2={i * 9} stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
                    ))}
                    <g 
                       transform="translate(10, 470)" className="cursor-pointer"
                       onMouseDown={(e) => {
                         e.stopPropagation();
                         const startY = e.clientY;
                         const onMove = (mE: MouseEvent) => {
                            const delta = (mE.clientY - startY) / 100;
                            setTapOpen(v => Math.max(0, Math.min(1, v + delta)));
                         };
                         const onEnd = () => { globalThis.removeEventListener('mousemove', onMove); globalThis.removeEventListener('mouseup', onEnd); };
                         globalThis.addEventListener('mousemove', onMove); globalThis.addEventListener('mouseup', onEnd);
                       }}
                    >
                       <circle r="15" fill="#1e293b" stroke="#334155" strokeWidth="2" />
                       <rect x="-3" y="-12" width="6" height="24" fill="#60a5fa" rx="2" transform={`rotate(${tapOpen * 90})`} />
                    </g>
                    {tapOpen > 0 && phase === 'TITRATION' && (
                       <motion.circle 
                         animate={{ y: [480, 580], opacity: [1, 0], scale: [1, 0.5] }}
                         transition={{ duration: 0.5, repeat: Infinity }}
                         cx="10" cy="480" r="2.5" fill="#60a5fa" filter="url(#titre-glow)"
                       />
                    )}
                 </g>
              )}

              {items.find(i => i.id === 'flask')?.isPlaced && (
                 <g transform="translate(500, 580)">
                    <path d="M0,0 L100,0 L85,100 Q80,110 70,110 L30,110 Q20,110 15,100 L0,0 Z" fill="url(#flaskShiny)" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
                    <AnimatePresence>
                       {analyteAdded && (
                          <motion.path 
                            initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} style={{ transformOrigin: 'bottom' }}
                            d="M5,40 L95,40 L85,105 L15,105 L5,40 Z" fill={flaskColor} transition={{ duration: 1 }}
                          />
                       )}
                    </AnimatePresence>
                 </g>
              )}

              {isDragging && activeItem && (
                 <g transform={`translate(${dragPos.x}, ${dragPos.y})`} className="opacity-60 pointer-events-none">
                    <circle r="20" fill="none" stroke="white" strokeWidth="2" strokeDasharray="4 4" className="animate-spin-slow" />
                    <circle r="5" fill="white" />
                 </g>
              )}
           </svg>

           {/* Results Overlay */}
           <div className="absolute top-4 md:top-8 right-4 md:right-8 w-60 md:w-64 space-y-4">
              <div className="p-4 md:p-5 bg-black/60 backdrop-blur-3xl border border-white/5 rounded-3xl shadow-2xl relative">
                 <div className="flex items-center gap-3 mb-4">
                    <ClipboardList size={16} className="text-indigo-400" />
                    <span className="text-[9px] font-black text-white uppercase tracking-widest">Analysis Logs</span>
                 </div>
                 <div className="space-y-2 max-h-[250px] overflow-y-auto custom-scrollbar pr-2">
                    {log.map(entry => (
                       <div key={`titre-log-${entry.id}`} className="flex justify-between items-center p-2 rounded-xl bg-white/5 border border-white/5">
                          <span className="text-[8px] font-black text-slate-500 uppercase">Step 0{entry.id}</span>
                          <span className="text-xs font-mono text-white font-black">{entry.reading} mL</span>
                       </div>
                    ))}
                    {log.length === 0 && <p className="text-[8px] text-slate-600 font-bold uppercase text-center py-6 italic">Idle</p>}
                 </div>
              </div>
              
              {isTitrated && (
                 <motion.div 
                   initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                   className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center gap-4"
                 >
                    <div className="w-8 h-8 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-lg shrink-0">
                       <Check size={18} />
                    </div>
                    <div className="min-w-0">
                       <p className="text-[9px] text-emerald-400 font-black uppercase tracking-widest truncate">Verification Clear</p>
                       <p className="text-[7px] text-slate-500 font-bold uppercase truncate italic">Success: {reading.toFixed(2)}mL</p>
                    </div>
                 </motion.div>
              )}
           </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(99,102,241,0.1); border-radius: 10px; }
        @keyframes shake {
          0% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          50% { transform: translateX(4px); }
          75% { transform: translateX(-4px); }
          100% { transform: translateX(0); }
        }
        .animate-shake { animation: shake 0.3s ease-in-out; }
        .animate-spin-slow { animation: spin 4s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default TitrationSim;
