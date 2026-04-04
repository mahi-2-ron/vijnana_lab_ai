import React, { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, Droplet, Activity, Check, Box, Search, Thermometer } from 'lucide-react';

type Stage = 'SETUP' | 'REACTION' | 'HEATING' | 'IDENTIFICATION' | 'DONE';

interface Reagent {
  id: string;
  name: string;
  color: string;
  type: 'aldehyde' | 'ketone' | 'alcohol' | 'acid' | 'alkene';
  reaction: 'silver' | 'red_ppt' | 'cloudy' | 'bubbling' | 'decolor';
}

const REAGENTS: Reagent[] = [
  { id: 'tollens', name: "Tollens' Reagent", color: '#e2e8f0', type: 'aldehyde', reaction: 'silver' },
  { id: 'fehling', name: 'Fehling A+B', color: '#1e40af', type: 'ketone', reaction: 'red_ppt' },
  { id: 'nahco3', name: 'NaHCO3 Soln', color: '#f8fafc', type: 'acid', reaction: 'bubbling' },
  { id: 'bromine', name: 'Bromine Water', color: '#9a3412', type: 'alkene', reaction: 'decolor' },
  { id: 'lucas', name: 'Lucas Reagent', color: '#f1f5f9', type: 'alcohol', reaction: 'cloudy' },
];

interface TubeState {
  id: number;
  solId: string | null;
  hasSample: boolean;
  isReacted: boolean;
  isHeated: boolean;
}

const FunctionalGroupSim: React.FC = () => {
  const [stage, setStage] = useState<Stage>('SETUP');
  const [message, setMessage] = useState('Welcome to Molecular Analysis. Place the test tubes in the research rack.');
  const [placedTubes, setPlacedTubes] = useState(0);
  const [tubes, setTubes] = useState<TubeState[]>(Array.from({ length: 5 }, (_, i) => ({
    id: i, solId: null, hasSample: false, isReacted: false, isHeated: false
  })));
  
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [dragPos, setDragPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  
  const svgRef = useRef<SVGSVGElement>(null);
  const particleIds = useMemo(() => Array.from({ length: 50 }, () => Math.random().toString(36).substring(2, 9)), []);

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

    if (activeItem === 'tube' && stage === 'SETUP') {
      setPlacedTubes(prev => {
        const next = prev + 1;
        if (next === 5) {
          setStage('REACTION');
          setMessage('Tubes secured. Dispense Unknown Compound X into each tube.');
        }
        return next;
      });
    } else if (activeItem === 'sample' && stage === 'REACTION') {
      setTubes(prev => {
        const next = [...prev];
        const emptyIdx = next.findIndex(t => !t.hasSample);
        if (emptyIdx !== -1) {
          next[emptyIdx] = { ...next[emptyIdx], hasSample: true };
          if (next.every(t => t.hasSample)) {
             setMessage('Samples loaded. Apply reagents to identify functional signatures.');
          }
        }
        return next;
      });
    } else if (activeItem.startsWith('reg-') && stage === 'REACTION') {
      const regId = activeItem.replace('reg-', '');
      setTubes(prev => {
        const next = [...prev];
        const targetIdx = next.findIndex(t => t.hasSample && !t.solId);
        if (targetIdx !== -1) {
          next[targetIdx] = { ...next[targetIdx], solId: regId };
          if (next.every(t => t.solId)) {
            setStage('HEATING');
            setMessage('Precipitation detected. Place the required tubes in the Water Bath for final synthesis.');
          }
        }
        return next;
      });
    } else if (activeItem.startsWith('tube-') && stage === 'HEATING' && dragPos.x > 600) {
      const idx = Number.parseInt(activeItem.replace('tube-', ''), 10);
      setTubes(prev => prev.map((t, i) => i === idx ? { ...t, isHeated: true, isReacted: true } : t));
      if (tubes.every(t => t.isHeated || t.id === idx)) {
         setTimeout(() => {
            setStage('IDENTIFICATION');
            setMessage('Molecular signatures revealed. Identify the Unknown Compound X based on findings.');
         }, 1000);
      }
    }

    setIsDragging(false);
    setActiveItem(null);
  };

  return (
    <div className="w-full h-full bg-[#020617] rounded-3xl overflow-hidden flex flex-col font-sans select-none touch-none border border-white/5 relative">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none" />
      
      {/* HUD Header */}
      <div className="p-4 md:p-6 bg-slate-900/60 backdrop-blur-xl border-b border-white/5 flex items-center justify-between z-50">
        <div className="flex items-center gap-4 md:gap-6">
           <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center shadow-2xl shadow-indigo-500/20">
              <Activity className="text-indigo-400" size={24} />
           </div>
           <div>
              <h2 className="text-xl md:text-2xl font-black text-white tracking-tighter uppercase leading-none mb-1">Molecular Analysis</h2>
              <div className="flex items-center gap-2">
                 <div className="flex gap-1">
                    {['SETUP', 'REACTION', 'HEATING', 'IDENTIFICATION'].map((s, i) => (
                       <div key={`fg-stage-${s}`} className={`w-1.5 h-1.5 rounded-full ${['SETUP', 'REACTION', 'HEATING', 'IDENTIFICATION', 'DONE'].indexOf(stage) >= i ? 'bg-indigo-500' : 'bg-slate-800'}`} />
                    ))}
                 </div>
                 <span className="text-[10px] text-indigo-300/60 font-bold uppercase tracking-widest leading-none">{message}</span>
              </div>
           </div>
        </div>
        <button onClick={() => globalThis.location.reload()} className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 hover:text-white transition-all border border-white/5 hover:border-white/10 group active:scale-95 shadow-xl">
           <RotateCcw size={20} className="group-hover:rotate-180 transition-transform duration-700" />
        </button>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Lab Tray */}
        <div className="w-56 md:w-64 bg-black/40 backdrop-blur-2xl border-r border-white/5 flex flex-col p-4 md:p-6 gap-4 md:gap-6 overflow-y-auto custom-scrollbar shadow-2xl">
           <p className="text-[9px] md:text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] pl-2 border-l-2 border-indigo-500/50 mb-1">Arsenal</p>
           
           {stage === 'SETUP' && placedTubes < 5 && (
              <button 
                onMouseDown={(e) => handleStartDrag(e, 'tube')} onTouchStart={(e) => handleStartDrag(e, 'tube')}
                className="w-full p-5 md:p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center gap-4 cursor-grab hover:bg-white/10 hover:border-indigo-500/30 transition-all group shadow-inner"
              >
                 <Box className="text-slate-400 group-hover:scale-110 transition-transform" size={32} />
                 <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest leading-none">Vacuum Tube</span>
              </button>
           )}

           {stage === 'REACTION' && (
              <>
                 <button 
                   onMouseDown={(e) => handleStartDrag(e, 'sample')} onTouchStart={(e) => handleStartDrag(e, 'sample')}
                   className="w-full p-4 md:p-6 rounded-2xl bg-indigo-600/10 border border-indigo-500/20 flex flex-col items-center gap-4 cursor-grab hover:bg-indigo-600/20 transition-all group"
                 >
                    <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
                       <Droplet size={20} />
                    </div>
                    <span className="text-[9px] text-indigo-400 font-black uppercase tracking-widest leading-none text-center">Compound X</span>
                 </button>

                 <div className="space-y-2 md:space-y-3">
                    {REAGENTS.map(r => {
                       if (tubes.some(t => t.solId === r.id)) return null;
                       return (
                          <button 
                            key={`reagent-btn-${r.id}`}
                            onMouseDown={(e) => handleStartDrag(e, `reg-${r.id}`)} onTouchStart={(e) => handleStartDrag(e, `reg-${r.id}`)}
                            className="w-full text-left p-3 md:p-4 rounded-xl bg-white/5 border border-white/5 flex items-center gap-3 md:gap-4 cursor-grab hover:bg-white/10 transition-all group shadow-lg"
                          >
                             <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-slate-700 transition-colors shrink-0">
                                <Search size={14} />
                             </div>
                             <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tight leading-tight truncate">{r.name}</span>
                          </button>
                       );
                    })}
                 </div>
              </>
           )}

           {stage === 'IDENTIFICATION' && (
              <div className="space-y-2">
                 <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-2 text-center">Classify Sample</p>
                 {['Aldehyde', 'Ketone', 'Alcohol', 'Acid', 'Alkene'].map(label => (
                    <button 
                      key={`classify-${label}`}
                      onClick={() => {
                         if (label === 'Aldehyde') {
                            setStage('DONE');
                            setMessage('Classification Verified. Investigation Concluded.');
                         } else {
                            if (globalThis.navigator.vibrate) globalThis.navigator.vibrate([50, 50, 50]);
                         }
                      }}
                      className="w-full p-3 rounded-xl bg-white/5 border border-white/5 text-slate-400 text-[9px] font-black uppercase tracking-[0.2em] hover:bg-indigo-500 hover:text-white hover:border-indigo-500 transition-all active:scale-95"
                    >
                       {label}
                    </button>
                 ))}
              </div>
           )}
        </div>

        {/* Lab Space */}
        <div className="flex-1 relative bg-[radial-gradient(circle_at_center,_#0f172a_0%,_#020617_100%)] overflow-hidden">
           <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `radial-gradient(#fff 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />
           
           <svg 
             ref={svgRef} className="w-full h-full" viewBox="0 0 1000 800"
             onMouseMove={handleMove} onTouchMove={handleMove}
             onMouseUp={handleDrop} onTouchEnd={handleDrop}
           >
              <defs>
                 <linearGradient id="glassGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.05)" />
                    <stop offset="50%" stopColor="rgba(255,255,255,0.2)" />
                    <stop offset="100%" stopColor="rgba(255,255,255,0.05)" />
                 </linearGradient>
                 <filter id="fg-glow">
                    <feGaussianBlur stdDeviation="5" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                 </filter>
                 <linearGradient id="silverMirror" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#cbd5e1" />
                    <stop offset="50%" stopColor="#f8fafc" />
                    <stop offset="100%" stopColor="#94a3b8" />
                 </linearGradient>
              </defs>

              {/* Research Bench */}
              <rect x="50" y="650" width="900" height="40" fill="#1e293b" rx="10" />
              <rect x="0" y="690" width="1000" height="110" fill="#0f172a" />

              {/* Research Rack */}
              <g transform="translate(100, 500)">
                 <rect x="0" y="140" width="450" height="30" fill="#334155" rx="10" opacity="0.8" />
                 <rect x="0" y="20" width="450" height="15" fill="#334155" rx="5" opacity="0.5" />
                 
                 {tubes.map((t) => {
                    const reg = REAGENTS.find(r => r.id === t.solId);
                    return (
                       <g 
                         key={`tube-forensic-${t.id}`} transform={`translate(${60 + t.id * 85}, 0)`}
                         onMouseDown={(e) => stage === 'HEATING' && !t.isHeated && handleStartDrag(e, `tube-${t.id}`)}
                         onTouchStart={(e) => stage === 'HEATING' && !t.isHeated && handleStartDrag(e, `tube-${t.id}`)}
                         className={stage === 'HEATING' && !t.isHeated ? 'cursor-grab group' : ''}
                       >
                          {t.id < placedTubes && (
                             <g opacity={t.isHeated && stage === 'HEATING' ? 0.3 : 1}>
                                <path d="M-18,0 L18,0 L18,170 Q18,195 0,195 Q-18,195 -18,170 Z" fill="url(#glassGrad)" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
                                
                                {t.hasSample && (
                                   <motion.path 
                                      initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} style={{ originY: 1 }}
                                      d="M-16,80 L16,80 L16,170 Q16,185 0,185 Q-16,185 -16,170 Z" 
                                      fill={t.isReacted && reg ? (reg.reaction === 'decolor' ? 'rgba(255,255,255,0.1)' : reg.color) : 'rgba(255,255,255,0.2)'}
                                      transition={{ duration: 1.5 }}
                                   />
                                )}

                                {/* Reaction Overlays */}
                                {t.isReacted && reg?.reaction === 'silver' && (
                                   <motion.path 
                                      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                      d="M-18,40 L18,40 L18,170 Q18,195 0,195 Q-18,195 -18,170 Z" 
                                      fill="url(#silverMirror)" stroke="#94a3b8" 
                                   />
                                )}
                                {t.isReacted && reg?.reaction === 'red_ppt' && (
                                   <circle cx="0" cy="180" r="10" fill="#991b1b" filter="url(#fg-glow)" />
                                )}
                                {t.isReacted && reg?.reaction === 'cloudy' && (
                                   <rect x="-16" y="80" width="32" height="100" fill="white" opacity="0.4" filter="blur(8px)" />
                                )}
                                {t.isReacted && reg?.reaction === 'bubbling' && new Array(10).fill(0).map((_, j) => (
                                   <motion.circle 
                                      key={`bubble-${t.id}-${particleIds[j]}`} animate={{ y: [180, 80], opacity: [0, 1, 0] }}
                                      transition={{ duration: 1, repeat: Infinity, delay: j * 0.2 }}
                                      cx={Math.random()*20 - 10} r="2" fill="white"
                                   />
                                ))}
                             </g>
                          )}
                       </g>
                    );
                 })}
              </g>

              {/* Water Bath synthesis module */}
              {stage === 'HEATING' && (
                 <g transform="translate(680, 480)">
                    <rect x="-10" y="210" width="220" height="10" fill="#1e293b" rx="5" />
                    <path d="M20,50 L180,50 L170,200 L30,200 Z" fill="rgba(59, 130, 246, 0.1)" stroke="rgba(255,255,255,0.2)" strokeWidth="3" />
                    <rect x="30" y="120" width="140" height="80" fill="rgba(59, 130, 246, 0.3)" />
                    <g transform="translate(75, 220)">
                       <rect x="0" y="0" width="50" height="40" fill="#334155" rx="5" />
                       <motion.path 
                         animate={{ scaleY: [1, 1.4, 1], opacity: [0.6, 0.9, 0.6] }}
                         transition={{ duration: 0.2, repeat: Infinity }}
                         d="M10,0 Q25,-60 40,0" fill="#f97316" style={{ originY: 1 }}
                       />
                    </g>
                 </g>
              )}

              {/* Interaction Overlay */}
              {isDragging && activeItem && (
                 <g transform={`translate(${dragPos.x}, ${dragPos.y}) rotate(${activeItem.startsWith('reg-') ? -40 : 0})`}>
                    {activeItem === 'tube' && <path d="M-15,0 L15,0 L15,150 Q15,170 0,170 Q-15,170 -15,150 Z" stroke="white" strokeWidth="2" fill="none" opacity="0.6" />}
                    {activeItem === 'sample' && <g><rect x="-15" y="-30" width="30" height="60" fill="#6366f1" rx="8" className="shadow-xl"/><rect x="-5" y="-40" width="8" height="10" fill="#1e1b4b" /></g>}
                    {activeItem.startsWith('reg-') && <path d="M-8,-15 L8,-15 L6,15 L-6,15 Z" fill="#4f46e5" />}
                    {activeItem.startsWith('tube-') && <path d="M-18,0 L18,0 L18,170 Q18,195 0,195 Q-18,195 -18,170 Z" fill="rgba(255,255,255,0.1)" stroke="white" strokeWidth="2" />}
                 </g>
              )}
           </svg>

           {/* Analytical Sidebar Overlay */}
           {stage !== 'SETUP' && (
              <div className="absolute top-4 md:top-8 right-4 md:right-8 w-60 md:w-64 space-y-4">
                 <div className="p-4 md:p-5 bg-black/60 backdrop-blur-3xl border border-white/5 rounded-3xl shadow-2xl">
                    <div className="flex items-center gap-3 mb-4">
                       <Thermometer size={16} className="text-indigo-400" />
                       <span className="text-[9px] font-black text-white uppercase tracking-widest">Lab Telemetry</span>
                    </div>
                    <div className="space-y-2">
                       {tubes.map((t) => (
                          <div key={`tele-fg-${t.id}`} className="flex justify-between items-center p-2 rounded-xl bg-white/5 border border-white/5">
                             <span className="text-[8px] font-black text-slate-500 uppercase">Tube 0{t.id + 1}</span>
                             <div className="flex gap-2">
                                <div className={`w-1.5 h-1.5 rounded-full ${t.solId ? 'bg-indigo-500' : 'bg-slate-800'}`} />
                                <div className={`w-1.5 h-1.5 rounded-full ${t.isHeated ? 'bg-orange-500' : 'bg-slate-800'}`} />
                             </div>
                          </div>
                       ))}
                    </div>
                 </div>
              </div>
           )}
        </div>
      </div>

      <AnimatePresence>
         {stage === 'DONE' && (
            <motion.div 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }}
               className="absolute inset-0 z-[100] bg-slate-950/95 backdrop-blur-3xl flex items-center justify-center p-6 md:p-10"
            >
               <motion.div 
                 initial={{ scale: 0.9, y: 50 }} animate={{ scale: 1, y: 0 }}
                 className="w-full max-w-4xl bg-slate-900 border border-white/10 rounded-[3rem] p-8 md:p-16 shadow-[0_0_100px_rgba(34,197,94,0.1)] relative overflow-hidden text-center md:text-left"
               >
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-500 via-emerald-500 to-indigo-500" />
                  
                  <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 mb-8 md:mb-12">
                     <div className="w-20 h-20 md:w-24 md:h-24 rounded-[2rem] md:rounded-[2.5rem] bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 shadow-2xl">
                        <Check size={40} />
                     </div>
                     <div>
                        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase leading-none mb-4">Case Resolved</h2>
                        <p className="text-slate-500 font-bold uppercase tracking-[0.4em] text-[10px]">Positive Correlation: Aliphatic Aldehyde Detected</p>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-8 md:mb-12">
                     <div className="p-6 md:p-8 rounded-3xl bg-white/5 border border-white/5 flex flex-col gap-2 md:gap-4">
                        <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Primary Evidence</div>
                        <div className="text-xl md:text-2xl font-black text-white italic leading-tight">Positive Tollens Test (Silver Mirror)</div>
                     </div>
                     <div className="p-6 md:p-8 rounded-3xl bg-indigo-500/10 border border-indigo-500/20 flex flex-col gap-2 md:gap-4">
                        <div className="text-[9px] font-black text-indigo-400 uppercase tracking-widest">Molecular Formula</div>
                        <div className="text-xl md:text-2xl font-black text-indigo-400 italic leading-tight">R-CHO (Carbonyl Group)</div>
                     </div>
                  </div>

                  <button onClick={() => globalThis.location.reload()} className="w-full py-6 md:py-10 rounded-2xl md:rounded-[3rem] bg-slate-800 hover:bg-slate-700 text-white font-black text-xs md:text-sm uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-6 active:scale-95">
                     <RotateCcw size={20} /> New Investigation
                  </button>
               </motion.div>
            </motion.div>
         )}
      </AnimatePresence>

      <style>{`
         .custom-scrollbar::-webkit-scrollbar { width: 4px; }
         .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
         .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default FunctionalGroupSim;
