import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Droplet, Check, RotateCcw, Activity, AlertCircle, Beaker, Search } from 'lucide-react';

type Step = 'PREPARATION' | 'DISPENSING' | 'DETERMINATION' | 'RESULTS';

interface Solution {
  id: string;
  name: string;
  ph: number;
  color: string;
  targetColor: string;
}

const SOLUTIONS: Solution[] = [
  { id: 'hcl', name: 'Dil. HCl', ph: 1.2, color: 'rgba(224, 242, 254, 0.3)', targetColor: '#dc2626' },
  { id: 'lemon', name: 'Lemon Juice', ph: 2.4, color: 'rgba(254, 240, 138, 0.4)', targetColor: '#ef4444' },
  { id: 'vinegar', name: 'Vinegar', ph: 3.1, color: 'rgba(241, 245, 249, 0.3)', targetColor: '#f97316' },
  { id: 'water', name: 'Pure Water', ph: 7.0, color: 'rgba(224, 242, 254, 0.2)', targetColor: '#10b981' },
  { id: 'milk', name: 'Milk', ph: 6.6, color: 'rgba(255, 255, 255, 0.8)', targetColor: '#84cc16' },
  { id: 'baking', name: 'Baking Soda', ph: 8.3, color: 'rgba(241, 245, 249, 0.5)', targetColor: '#0ea5e9' },
  { id: 'soap', name: 'Soap Soln', ph: 10.5, color: 'rgba(241, 245, 249, 0.4)', targetColor: '#3b82f6' },
  { id: 'naoh', name: 'Dil. NaOH', ph: 13.8, color: 'rgba(224, 242, 254, 0.3)', targetColor: '#4c1d95' },
];

interface TubeState {
  id: number;
  solId: string | null;
  hasIndicator: boolean;
  hasPaper: boolean;
  userEstimate: string;
}

const PHTestSim: React.FC = () => {
  const [step, setStep] = useState<Step>('PREPARATION');
  const [message, setMessage] = useState('Initialize the lab by placing the test tube rack.');
  const [isRackPlaced, setIsRackPlaced] = useState(false);
  const [tubes, setTubes] = useState<TubeState[]>(Array.from({ length: 8 }, (_, i) => ({
    id: i, solId: null, hasIndicator: false, hasPaper: false, userEstimate: ''
  })));
  
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
    if (!activeItem) return;

    if (activeItem === 'rack' && dragPos.x > 300 && dragPos.x < 700) {
      setIsRackPlaced(true);
      setStep('DISPENSING');
      setMessage('Rack secured. Use the droppers to fill the test tubes with samples.');
      if (globalThis.navigator.vibrate) globalThis.navigator.vibrate(30);
    } else if (activeItem.startsWith('sol-') && step === 'DISPENSING') {
      const solId = activeItem.replace('sol-', '');
      setTubes(prev => {
        const next = [...prev];
        const emptyIdx = next.findIndex(t => !t.solId);
        if (emptyIdx !== -1) {
          next[emptyIdx] = { ...next[emptyIdx], solId };
          if (next.every(t => t.solId)) {
            setStep('DETERMINATION');
            setMessage('Concentrations balanced. Apply Universal Indicator to analyze pH.');
          }
        }
        return next;
      });
    } else if (activeItem === 'indicator' && step === 'DETERMINATION') {
      setTubes(prev => {
        const next = [...prev];
        const targetIdx = next.findIndex(t => t.solId && !t.hasIndicator);
        if (targetIdx !== -1) {
          next[targetIdx] = { ...next[targetIdx], hasIndicator: true };
          if (next.every(t => t.hasIndicator)) {
            setMessage('Reaction complete. Compare with the reference scale.');
          }
        }
        return next;
      });
    }

    setIsDragging(false);
    setActiveItem(null);
  };

  return (
    <div className="w-full h-full bg-slate-950 rounded-3xl overflow-hidden flex flex-col font-sans select-none touch-none border border-white/5 shadow-2xl relative">
      {/* Premium Header */}
      <div className="p-4 md:p-6 bg-slate-900/50 backdrop-blur-xl border-b border-white/5 flex items-center justify-between z-50">
        <div className="flex items-center gap-4 md:gap-5">
           <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center shadow-lg shadow-indigo-500/10 shrink-0">
              <Activity className="text-indigo-400" size={24} />
           </div>
           <div className="flex flex-col border-l border-white/10 pl-4">
              <h2 className="text-xl md:text-2xl font-black text-white tracking-tighter uppercase leading-none mb-1">pH Analyzer</h2>
              <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                 <span className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">{message}</span>
              </div>
           </div>
        </div>
        <div className="flex gap-2 md:gap-3">
           <button onClick={() => globalThis.location.reload()} className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 hover:text-white transition-all border border-white/5 hover:border-white/10 group">
              <RotateCcw size={18} className="group-hover:rotate-180 transition-transform duration-500" />
           </button>
           {step === 'DETERMINATION' && tubes.every(t => t.hasIndicator) && (
             <button 
                onClick={() => setStep('RESULTS')}
                className="px-6 md:px-8 h-10 md:h-12 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-black uppercase tracking-widest shadow-xl shadow-indigo-600/20 active:scale-95 transition-all"
              >
                Analyze Data
              </button>
           )}
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
         {/* Left Side: Reagent Shelves */}
         <div className="w-56 md:w-64 bg-slate-900/30 border-r border-white/5 flex flex-col p-4 md:p-6 overflow-y-auto custom-scrollbar gap-4 md:gap-6 shadow-inner">
            <p className="text-[9px] md:text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] border-b border-white/5 pb-2 mb-1">Chemical Repository</p>
            
            {!isRackPlaced && (
               <button 
                 onMouseDown={(e) => handleStartDrag(e, 'rack')} onTouchStart={(e) => handleStartDrag(e, 'rack')}
                 className="p-5 md:p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center gap-3 cursor-grab hover:bg-white/10 hover:border-indigo-500/30 transition-all text-center group"
               >
                  <Layers className="text-indigo-400 group-hover:scale-110 transition-transform" size={24} />
                  <span className="text-[9px] md:text-[10px] text-slate-300 font-black uppercase tracking-widest">Heavy Duty Rack</span>
               </button>
            )}

            {isRackPlaced && step === 'DISPENSING' && (
               <div className="space-y-2 md:space-y-3">
                  <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1 text-center">Sample Droppers</p>
                  {SOLUTIONS.map((s) => {
                    if (tubes.some(t => t.solId === s.id)) return null;
                    return (
                      <button 
                        key={`sol-btn-${s.id}`}
                        onMouseDown={(e) => handleStartDrag(e, `sol-${s.id}`)} onTouchStart={(e) => handleStartDrag(e, `sol-${s.id}`)}
                        className="w-full text-left p-3 rounded-xl bg-white/5 border border-white/5 flex items-center gap-3 cursor-grab hover:bg-indigo-500/10 transition-all group"
                      >
                         <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all shrink-0">
                            <Droplet size={14} />
                         </div>
                         <span className="text-[9px] text-slate-400 font-bold font-mono tracking-tight truncate">{s.name}</span>
                      </button>
                    );
                  })}
               </div>
            )}

            {step === 'DETERMINATION' && (
               <button 
                 onMouseDown={(e) => handleStartDrag(e, 'indicator')} onTouchStart={(e) => handleStartDrag(e, 'indicator')}
                 className="w-full p-5 md:p-6 rounded-2xl bg-indigo-600/10 border border-indigo-600/30 flex flex-col items-center gap-3 cursor-grab hover:bg-indigo-600/20 transition-all text-center shadow-lg"
               >
                  <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
                     <Droplet fill="currentColor" size={20} />
                  </div>
                  <span className="text-[9px] text-indigo-400 font-black uppercase tracking-widest leading-tight">Universal<br/>Indicator</span>
               </button>
            )}

            {/* pH Chart in Sidebar during determination */}
            {step === 'DETERMINATION' && (
              <div className="mt-auto p-4 rounded-2xl bg-black/40 border border-white/5">
                 <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-4">Gradient Scale</p>
                 <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    {new Array(14).fill(0).map((_, i) => {
                       const ph = i + 1;
                       return (
                       <div key={`ph-ref-guide-${ph}`} className="flex flex-col items-center gap-1 transition-transform hover:scale-110">
                          <div 
                            className="w-2.5 h-2.5 rounded-full border border-white/10" 
                            style={{ 
                              background: ph < 4 ? '#dc2626' : 
                                         ph < 7 ? '#84cc16' : 
                                         ph === 7 ? '#10b981' : 
                                         ph < 11 ? '#3b82f6' : 
                                         '#4c1d95' 
                            }} 
                          />
                          <span className="text-[8px] text-slate-500 font-bold font-mono">pH {ph}</span>
                       </div>
                    )})}
                 </div>
              </div>
            )}
         </div>

         {/* Lab Workbench Area */}
         <div className="flex-1 relative bg-[radial-gradient(circle_at_center,_#111827_0%,_#020617_100%)] overflow-hidden">
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `radial-gradient(#fff 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
            
            <svg 
              ref={svgRef} className="w-full h-full" viewBox="0 0 1000 800"
              onMouseMove={handleMove} onTouchMove={handleMove}
              onMouseUp={handleDrop} onTouchEnd={handleDrop}
            >
               <defs>
                  <linearGradient id="tubeGlass" x1="0%" y1="0%" x2="100%" y2="0%">
                     <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
                     <stop offset="50%" stopColor="rgba(255,255,255,0.25)" />
                     <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
                  </linearGradient>
               </defs>

               <rect x="50" y="650" width="900" height="40" fill="#1e293b" rx="4" />
               <rect x="0" y="690" width="1000" height="110" fill="#0f172a" />

               {isRackPlaced && (
                  <g transform="translate(100, 480)">
                     <rect x="0" y="140" width="800" height="30" fill="#334155" rx="10" opacity="0.6" />
                     <rect x="0" y="20" width="800" height="15" fill="#334155" rx="5" opacity="0.4" />
                     {tubes.map((t) => {
                        const sol = SOLUTIONS.find(s => s.id === t.solId);
                        return (
                          <g key={`tube-ph-${t.id}`} transform={`translate(${60 + t.id * 85}, 0)`}>
                             <path d="M-18,0 L18,0 L18,160 Q18,185 0,185 Q-18,185 -18,160 Z" fill="url(#tubeGlass)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                             {t.solId && (
                                <motion.path 
                                  initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} style={{ transformOrigin: 'bottom' }}
                                  d="M-16,60 L16,60 L16,160 Q16,180 0,180 Q-16,180 -16,160 Z" 
                                  fill={t.hasIndicator ? sol?.targetColor : sol?.color} 
                                  className="transition-colors duration-1000"
                                />
                             )}
                             <text x="0" y="210" textAnchor="middle" fill="#64748b" fontSize="10" fontWeight="bold">0{t.id + 1}</text>
                          </g>
                        );
                     })}
                  </g>
               )}

               {isDragging && activeItem && (
                  <g transform={`translate(${dragPos.x}, ${dragPos.y}) rotate(${['sol-', 'indicator'].some(x => activeItem.startsWith(x)) ? -45 : 0})`}>
                     {activeItem === 'rack' && <rect x="-100" y="-20" width="200" height="40" fill="gray" opacity="0.5" rx="10" />}
                     {(activeItem.startsWith('sol-') || activeItem === 'indicator') && (
                        <g>
                           <rect x="-12" y="-30" width="24" height="60" fill={activeItem === 'indicator' ? '#4f46e5' : '#334155'} rx="5" />
                           <rect x="-4" y="-38" width="8" height="10" fill="#1e293b" />
                        </g>
                     )}
                  </g>
               )}
            </svg>

            {/* Sidebar Data Log */}
            <div className="absolute top-4 md:top-6 right-4 md:right-6 w-60 md:w-64 flex flex-col gap-4">
               <div className="p-4 md:p-5 bg-black/60 backdrop-blur-2xl border border-white/5 rounded-3xl shadow-2xl">
                  <div className="flex items-center gap-3 mb-4">
                     <Search size={14} className="text-indigo-400" />
                     <span className="text-[9px] font-black text-white uppercase tracking-widest">Analytical Log</span>
                  </div>
                  <div className="space-y-1.5 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                     {tubes.map((t) => (
                        <div key={`log-ph-${t.id}`} className="p-2 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
                           <span className="text-[8px] font-black text-slate-500 uppercase">Tube 0{t.id + 1}</span>
                           <div className={`w-2 h-2 rounded-full ${t.hasIndicator ? 'bg-indigo-500' : 'bg-slate-800'}`} />
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </div>

      <AnimatePresence>
         {step === 'RESULTS' && (
            <motion.div 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }}
               className="absolute inset-0 z-[100] bg-slate-950/90 backdrop-blur-3xl flex items-center justify-center p-6 md:p-8"
            >
               <motion.div 
                 initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }}
                 className="w-full max-w-5xl bg-slate-900 border border-white/10 rounded-[3rem] p-8 md:p-12 shadow-3xl overflow-hidden relative"
               >
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-500 via-emerald-500 to-indigo-500" />
                  
                  <div className="flex items-center justify-between mb-8">
                     <div className="flex items-center gap-6">
                        <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400">
                           <Check size={32} />
                        </div>
                        <div>
                           <h2 className="text-3xl font-black text-white tracking-tighter uppercase leading-tight">Master Report</h2>
                           <p className="text-slate-500 font-bold uppercase tracking-[0.4em] text-[10px]">Hydrogen Ion Concentration Matrix</p>
                        </div>
                     </div>
                     <button onClick={() => globalThis.location.reload()} className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white text-[10px] font-black uppercase tracking-widest border border-white/10 transition-all flex items-center gap-3 active:scale-95">
                        <RotateCcw size={16} /> New Analysis
                     </button>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8 md:mb-12">
                     {tubes.map((t) => {
                        const sol = SOLUTIONS.find(s => s.id === t.solId)!;
                        return (
                           <div key={`result-card-${t.id}`} className="p-4 md:p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col gap-3 group hover:bg-indigo-500/5 transition-all">
                              <div className="flex justify-between items-center">
                                 <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Index {t.id + 1}</span>
                              </div>
                              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                 <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ delay: t.id * 0.1 }} className="h-full" style={{ background: sol.targetColor }} />
                              </div>
                              <div>
                                 <p className="text-white font-black text-xs mb-1 truncate">{sol.name}</p>
                                 <div className="flex items-baseline gap-1.5">
                                    <span className="text-xl font-mono font-black italic" style={{ color: sol.targetColor }}>{sol.ph.toFixed(1)}</span>
                                    <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest ml-1">pH</span>
                                 </div>
                              </div>
                           </div>
                        );
                     })}
                  </div>
               </motion.div>
            </motion.div>
         )}
      </AnimatePresence>

      <style>{`
         .custom-scrollbar::-webkit-scrollbar { width: 5px; }
         .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
         .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.05); border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default PHTestSim;
