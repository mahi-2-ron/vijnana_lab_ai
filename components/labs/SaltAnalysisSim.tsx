import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Microscope, RotateCcw, Check, Flame, Search, Beaker, Activity, AlertCircle } from 'lucide-react';

type Phase = 'PREPARATION' | 'DRY_TESTS' | 'WET_TESTS' | 'CONFIRMATORY' | 'RESULTS';

interface SaltIdentity {
  cation: string;
  anion: string;
  cationFormula: string;
  anionFormula: string;
}

const SALT_COMBOS: SaltIdentity[] = [
  { cation: 'Copper', anion: 'Sulphate', cationFormula: 'Cu²⁺', anionFormula: 'SO₄²⁻' },
  { cation: 'Iron', anion: 'Chloride', cationFormula: 'Fe³⁺', anionFormula: 'Cl⁻' },
  { cation: 'Aluminium', anion: 'Sulphate', cationFormula: 'Al³⁺', anionFormula: 'SO₄²⁻' },
  { cation: 'Calcium', anion: 'Carbonate', cationFormula: 'Ca²⁺', anionFormula: 'CO₃²⁻' },
];

const SaltAnalysisSim: React.FC<{ onLog?: (data: any) => void }> = ({ onLog }) => {
  const [phase, setPhase] = useState<Phase>('PREPARATION');
  const [activeSalt, setActiveSalt] = useState<SaltIdentity>(SALT_COMBOS[0]);
  const [message, setMessage] = useState('Detecting unknowns... Secure the crime lab by placing the spot plate.');
  
  // Interaction State
  const [isPlatePlaced, setIsPlatePlaced] = useState(false);
  const [isBurnerPlaced, setIsBurnerPlaced] = useState(false);
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [toolPos, setToolPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [observation, setObservation] = useState<string[]>([]);
  
  // Chemical State
  const [wells, setWells] = useState(Array.from({ length: 8 }, (_, i) => ({
    id: i,
    hasSalt: false,
    reagents: [] as string[],
    color: '#ffffff',
    precipitate: false
  })));
  const [flameActive, setFlameActive] = useState(false);
  const [flameColor, setFlameColor] = useState('rgba(255,165,0,0.3)');

  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const reagents = {
    hcl: { name: 'Dil. HCl', color: '#60a5fa', effect: 'bubble' },
    naoh: { name: 'NaOH', color: '#ef4444', effect: 'ppt' },
    bacl2: { name: 'BaCl2', color: '#10b981', effect: 'white-ppt' },
    nh4oh: { name: 'NH4OH', color: '#f59e0b', effect: 'complex' },
  };

  const handleStartDrag = (e: React.TouchEvent | React.MouseEvent, type: string) => {
    setActiveTool(type);
    setIsDragging(true);
    const touch = 'touches' in e ? e.touches[0] : e;
    const svgRect = svgRef.current?.getBoundingClientRect();
    if (svgRect) {
      setToolPos({ x: touch.clientX - svgRect.left, y: touch.clientY - svgRect.top });
    }
  };

  const handleMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging) return;
    const touch = 'touches' in e ? e.touches[0] : e;
    const svgRect = svgRef.current?.getBoundingClientRect();
    if (svgRect) {
      setToolPos({ x: touch.clientX - svgRect.left, y: touch.clientY - svgRect.top });
    }
  };

  const handleEndDrag = () => {
    if (!activeTool) return;
    
    // Snapping Logic
    if (phase === 'PREPARATION') {
      if (activeTool === 'plate' && toolPos.x > 300 && toolPos.x < 700) {
        setIsPlatePlaced(true);
        setMessage('Plate secure. Now initialize the Bunsen Burner for Dry Tests.');
        if (navigator.vibrate) navigator.vibrate(20);
      } else if (activeTool === 'burner' && toolPos.x > 700) {
        setIsBurnerPlaced(true);
        setPhase('DRY_TESTS');
        setMessage('Dry Testing Phase: Perform a Flame Test with the Wire Loop.');
      }
    } else {
      // Process well interactions
      const wellIdx = wells.findIndex(w => {
         const wx = 500 + ((w.id % 4) - 1.5) * 85;
         const wy = 500 + (Math.floor(w.id / 4) - 0.5) * 85;
         return Math.abs(toolPos.x - wx) < 40 && Math.abs(toolPos.y - wy) < 40;
      });

      if (wellIdx !== -1) {
         if (activeTool === 'spatula') {
            setWells(prev => prev.map((w, i) => i === wellIdx ? { ...w, hasSalt: true, color: '#f1f5f9' } : w));
            setMessage(`Unknown sample added to Well ${wellIdx + 1}. Adding reagents will reveal components.`);
            if (phase === 'DRY_TESTS') setPhase('WET_TESTS');
         } else if (reagents[activeTool as keyof typeof reagents]) {
            const reagent = reagents[activeTool as keyof typeof reagents];
            setWells(prev => prev.map((w, i) => {
               if (i !== wellIdx || !w.hasSalt) return w;
               
               let newColor = w.color;
               let extraObs = '';
               
               // Logic for Copper + NaOH -> Blue PPT
               if (activeSalt.cation === 'Copper' && activeTool === 'naoh') {
                  newColor = '#3b82f6'; // Pale Blue
                  extraObs = 'Blue precipitate observed.';
               } else if (activeSalt.cation === 'Copper' && activeTool === 'nh4oh') {
                  newColor = '#1e3a8a'; // Deep Blue
                  extraObs = 'Deep blue solution formed.';
               } else if (activeSalt.anion === 'Sulphate' && activeTool === 'bacl2') {
                  newColor = '#ffffff'; // White PPT
                  extraObs = 'White chalky precipitate forms.';
               }

               if (extraObs && !observation.includes(extraObs)) {
                  setObservation(prev => [...prev, extraObs]);
               }

               return { ...w, reagents: [...w.reagents, activeTool], color: newColor, precipitate: !!extraObs };
            }));
         }
      }

      // Flame Test Logic
      if (activeTool === 'loop' && toolPos.x > 800 && toolPos.y > 600) {
         setFlameActive(true);
         if (activeSalt.cation === 'Copper') setFlameColor('rgba(34, 211, 238, 0.8)'); // Cyan/Green
         else if (activeSalt.cation === 'Calcium') setFlameColor('rgba(239, 68, 68, 0.8)'); // Brick Red
         
         setObservation(prev => [...prev, 'Distinct flame color observed.']);
         setTimeout(() => setFlameActive(false), 2000);
      }
    }

    setIsDragging(false);
    setActiveTool(null);
  };

  return (
    <div className="w-full h-full bg-slate-950 rounded-3xl overflow-hidden flex flex-col font-sans select-none touch-none border border-white/5 shadow-2xl" ref={containerRef as any}>
      {/* HUD Bar */}
      <div className="p-6 bg-slate-900/80 backdrop-blur-md border-b border-white/5 flex items-center justify-between z-50">
        <div className="flex items-center gap-4">
           <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
              <Microscope className="text-indigo-400" size={24} />
           </div>
           <div>
              <h2 className="text-xl font-black text-white tracking-tighter leading-none mb-1">QUALITATIVE ANALYSIS</h2>
              <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                 <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{message}</span>
              </div>
           </div>
        </div>
        <div className="flex gap-2">
           <button onClick={() => globalThis.location.reload()} className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 hover:text-white transition-all border border-white/5 shadow-sm">
              <RotateCcw size={18} />
           </button>
           {observation.length > 2 && (
              <button 
                onClick={() => setPhase('RESULTS')}
                className="px-6 h-10 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black uppercase tracking-widest shadow-lg shadow-indigo-600/20 transition-all active:scale-95"
              >
                Sign Off Results
              </button>
           )}
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
         {/* Left Tray: Chemical Depot */}
         <div className="w-48 bg-slate-900 border-r border-white/5 p-4 flex flex-col gap-4 overflow-y-auto shrink-0 shadow-inner">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-white/5 pb-2">Analysis Kit</p>
            
            {!isPlatePlaced && (
               <div 
                 onMouseDown={(e) => handleStartDrag(e, 'plate')} onTouchStart={(e) => handleStartDrag(e, 'plate')}
                 className="aspect-[4/3] rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center gap-2 cursor-grab group hover:border-indigo-400/30 transition-all p-3 text-center"
               >
                  <Beaker className="text-indigo-400 group-hover:scale-110 transition-transform" size={24}/>
                  <span className="text-[10px] text-slate-300 font-black uppercase tracking-tighter">Spot Plate</span>
               </div>
            )}

            {!isBurnerPlaced && (
               <div 
                 onMouseDown={(e) => handleStartDrag(e, 'burner')} onTouchStart={(e) => handleStartDrag(e, 'burner')}
                 className="aspect-square rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center gap-2 cursor-grab group hover:border-amber-400/30 transition-all p-3 text-center"
               >
                  <Flame className="text-amber-400 group-hover:animate-bounce" size={24}/>
                  <span className="text-[10px] text-slate-300 font-black uppercase tracking-tighter">Bunsen Burner</span>
               </div>
            )}

            {isPlatePlaced && (
               <>
                  <div 
                    onMouseDown={(e) => handleStartDrag(e, 'spatula')} onTouchStart={(e) => handleStartDrag(e, 'spatula')}
                    className="h-20 rounded-2xl bg-slate-800/50 border border-white/5 flex flex-col items-center justify-center gap-1 cursor-grab hover:bg-slate-800 transition-all group"
                  >
                     <div className="w-12 h-1 bg-slate-500 rounded group-hover:bg-slate-300" />
                     <span className="text-[9px] text-slate-500 font-bold uppercase mt-2">Spatula</span>
                  </div>

                  <div className="space-y-2 mt-4">
                     <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Reagents</p>
                     {Object.entries(reagents).map(([key, info]) => (
                        <div 
                          key={key}
                          onMouseDown={(e) => handleStartDrag(e, key)} onTouchStart={(e) => handleStartDrag(e, key)}
                          className="p-3 rounded-xl bg-indigo-500/5 border border-indigo-500/10 flex items-center gap-3 cursor-grab hover:bg-indigo-500/10 transition-all"
                        >
                           <div className="w-6 h-6 rounded-lg bg-indigo-500/20 flex items-center justify-center text-[10px] font-black text-indigo-400">R</div>
                           <span className="text-[10px] text-slate-400 font-bold font-mono">{info.name}</span>
                        </div>
                     ))}
                  </div>

                  <div 
                    onMouseDown={(e) => handleStartDrag(e, 'loop')} onTouchStart={(e) => handleStartDrag(e, 'loop')}
                    className="mt-4 p-4 rounded-2xl bg-slate-800/30 border border-dashed border-white/10 flex flex-col items-center justify-center gap-2 cursor-grab hover:border-amber-400/30 transition-all"
                  >
                     <Activity size={18} className="text-amber-400/40" />
                     <span className="text-[9px] text-slate-500 font-black uppercase">Wire Loop</span>
                  </div>
               </>
            )}
         </div>

         {/* Lab Bench */}
         <div className="flex-1 relative bg-[radial-gradient(circle_at_center,_#0f172a_0%,_#020617_100%)] overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
            
            <svg 
              ref={svgRef} className="w-full h-full" viewBox="0 0 1000 800"
              onMouseMove={handleMove} onTouchMove={handleMove}
              onMouseUp={handleEndDrag} onTouchEnd={handleEndDrag}
            >
               {/* Bench Surface */}
               <rect x="50" y="700" width="900" height="40" fill="#1e293b" rx="4" />
               <rect x="0" y="740" width="1000" height="60" fill="#0f172a" />

               {/* Spot Plate Rendering */}
               {isPlatePlaced && (
                  <g transform="translate(500, 500)">
                     <rect x="-220" y="-140" width="440" height="280" fill="#ffffff" rx="24" filter="drop-shadow(0 20px 40px rgba(0,0,0,0.5))" />
                     {wells.map((w, i) => {
                        const col = i % 4;
                        const row = Math.floor(i / 4);
                        return (
                           <g key={i} transform={`translate(${(col - 1.5) * 100}, ${(row - 0.5) * 110})`}>
                              <circle r="42" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="1" />
                              <circle r="40" fill="white" />
                              <AnimatePresence>
                                 {w.hasSalt && (
                                    <motion.path 
                                      initial={{ scale: 0 }} animate={{ scale: 1 }}
                                      d="M-20,0 Q-10,-30 0,0 Q10,30 20,0 Z" 
                                      fill={w.color} 
                                    />
                                 )}
                              </AnimatePresence>
                              <text x="0" y="4" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#cbd5e1" className="pointer-events-none">{i + 1}</text>
                           </g>
                        );
                     })}
                  </g>
               )}

               {/* Bunsen Burner Rendering */}
               {isBurnerPlaced && (
                  <g transform="translate(850, 700)">
                     <rect x="-30" y="-120" width="10" height="120" fill="#64748b" />
                     <rect x="-50" y="0" width="50" height="10" fill="#334155" rx="5" />
                     <motion.path 
                        animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
                        transition={{ duration: 0.2, repeat: Infinity }}
                        d="M -30,-120 Q -25,-220 -20,-120 Z" 
                        fill={flameColor} 
                        style={{ display: flameActive ? 'block' : (phase === 'DRY_TESTS' ? 'block' : 'none') }}
                     />
                  </g>
               )}

               {/* Interaction Logic Visuals */}
               {isDragging && activeTool && (
                  <g transform={`translate(${toolPos.x}, ${toolPos.y})`}>
                     {activeTool === 'plate' && <rect x="-100" y="-60" width="200" height="120" fill="white" rx="10" stroke="#indigo-500" strokeWidth="2" opacity="0.6" />}
                     {activeTool === 'burner' && <rect x="-15" y="-60" width="30" height="120" fill="#slate-500" rx="5" opacity="0.6" />}
                     {activeTool === 'spatula' && <path d="M-60,0 L60,0 L60,8 L-60,8 Z" fill="#94a3b8" transform="rotate(-30)" />}
                     {reagents[activeTool as keyof typeof reagents] && (
                        <g transform="rotate(-45)">
                           <rect x="-15" y="-30" width="30" height="60" fill={reagents[activeTool as keyof typeof reagents].color} rx="5" />
                           <motion.circle initial={{ y: 20 }} animate={{ y: 80, opacity: 0 }} transition={{ repeat: Infinity, duration: 0.5 }} cx="0" cy="40" r="3" fill="#cbd5e1" />
                        </g>
                     )}
                     {activeTool === 'loop' && (
                        <g transform="translate(0, -100)">
                           <rect x="-2" y="0" width="4" height="160" fill="#94a3b8" />
                           <circle cx="0" cy="0" r="10" fill="none" stroke="#94a3b8" strokeWidth="2" />
                        </g>
                     )}
                  </g>
               )}
            </svg>

            {/* Observations Sidebar */}
            <div className="absolute top-4 right-4 w-64 flex flex-col gap-2">
               <div className="p-4 bg-black/60 backdrop-blur-xl border border-white/5 rounded-2xl shadow-xl">
                  <div className="flex items-center gap-2 mb-3">
                     <Search size={14} className="text-indigo-400" />
                     <span className="text-[10px] font-black text-white uppercase tracking-widest">Lab Journal</span>
                  </div>
                  <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                     {observation.length === 0 && <p className="text-[10px] text-slate-500 italic">No notes recorded yet...</p>}
                     {observation.map((obs, i) => (
                        <motion.div initial={{ x: 10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} key={i} className="p-2 rounded-lg bg-white/5 border-l-2 border-indigo-500 text-[10px] text-slate-300 font-medium bg-gradient-to-r from-indigo-500/5 to-transparent">
                           {obs}
                        </motion.div>
                     ))}
                  </div>
               </div>

               {isBurnerPlaced && (
                  <div className="p-4 bg-amber-500/10 backdrop-blur-md border border-amber-500/20 rounded-2xl">
                     <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] font-black text-amber-500 uppercase tracking-tighter">Thermal Activity</span>
                        <Activity size={12} className="text-amber-500 animate-pulse" />
                     </div>
                     <div className="text-xl font-mono font-black text-white">450 <span className="text-xs opacity-40">°C</span></div>
                  </div>
               )}
            </div>
         </div>
      </div>

      {/* Results Modal */}
      <AnimatePresence>
         {phase === 'RESULTS' && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="absolute inset-0 z-[100] flex items-center justify-center p-12 bg-slate-950/80 backdrop-blur-3xl"
            >
               <motion.div 
                 initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
                 className="w-full max-w-2xl bg-slate-900 border border-white/10 rounded-[3rem] p-12 text-center shadow-3xl relative overflow-hidden"
               >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500" />
                  <div className="w-20 h-20 rounded-3xl bg-green-500/20 flex items-center justify-center text-green-400 mx-auto mb-8 shadow-[0_0_40px_rgba(34,197,94,0.2)]">
                     <Check size={40} />
                  </div>
                  <h2 className="text-4xl font-black text-white mb-2 tracking-tighter uppercase">Subject Identified</h2>
                  <p className="text-slate-400 text-sm font-bold uppercase tracking-[0.3em] mb-12 opacity-50">Analytical Chemistry Result</p>
                  
                  <div className="grid grid-cols-2 gap-6 mb-12">
                     <div className="p-6 rounded-3xl bg-white/5 border border-white/5 flex flex-col items-center">
                        <span className="text-[10px] font-black text-slate-500 uppercase mb-2">Primary Cation</span>
                        <span className="text-2xl font-black text-indigo-400 font-mono italic">{activeSalt.cationFormula}</span>
                        <span className="text-xs text-slate-400 mt-1">{activeSalt.cation}</span>
                     </div>
                     <div className="p-6 rounded-3xl bg-white/5 border border-white/5 flex flex-col items-center">
                        <span className="text-[10px] font-black text-slate-500 uppercase mb-2">Primary Anion</span>
                        <span className="text-2xl font-black text-green-400 font-mono italic">{activeSalt.anionFormula}</span>
                        <span className="text-xs text-slate-400 mt-1">{activeSalt.anion}</span>
                     </div>
                  </div>

                  <div className="space-y-4">
                     <div className="flex items-center gap-3 p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-left">
                        <AlertCircle className="text-indigo-400 shrink-0" size={20}/>
                        <div>
                           <p className="text-[10px] text-indigo-400 font-black uppercase">Technical Observation</p>
                           <p className="text-[11px] text-slate-300 font-medium">The distinct {activeSalt.cation === 'Copper' ? 'blue precipitate' : 'brick red flame'} confirms the presence of {activeSalt.cation} ions in the lattice structure.</p>
                        </div>
                     </div>
                     <button 
                       onClick={() => globalThis.location.reload()}
                       className="w-full py-5 rounded-[2rem] bg-white text-slate-950 font-black text-sm uppercase tracking-widest shadow-2xl hover:bg-slate-200 transition-all active:scale-95"
                     >
                       Close Investigation
                     </button>
                  </div>
               </motion.div>
            </motion.div>
         )}
      </AnimatePresence>

      <style>{`
         .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
         }
         .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
         }
         .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(255,255,255,0.1);
            border-radius: 10px;
         }
      `}</style>
    </div>
  );
};

export default SaltAnalysisSim;
