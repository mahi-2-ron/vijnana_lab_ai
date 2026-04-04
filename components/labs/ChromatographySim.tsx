import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Ruler, Edit3, Droplet, Check, RotateCcw, Box, Layers, Scissors, PenTool } from 'lucide-react';

type Step = 'PAPER' | 'RULER' | 'PENCIL' | 'SPOTTING' | 'SOLVENT' | 'STAPLING' | 'DEVELOPING' | 'MEASURING';

interface InkSpot {
  id: number;
  x: number;
  color: string;
  distance: number;
}

const ChromatographySim: React.FC = () => {
  const [step, setStep] = useState<Step>('PAPER');
  const [message, setMessage] = useState('Welcome to the Paper Chromatography lab. Drag the paper strip to the bench.');
  
  // State for paper setup
  const [isPaperPlaced, setIsPaperPlaced] = useState(false);
  const [isRulerAligned, setIsRulerAligned] = useState(false);
  const [isBaselineDrawn, setIsBaselineDrawn] = useState(false);
  const [inkSpots, setInkSpots] = useState<InkSpot[]>([]);
  const [isPaperCylindrical, setIsPaperCylindrical] = useState(false);
  const [isPaperInTank, setIsPaperInTank] = useState(false);
  const [tankLevels, setTankLevels] = useState(0); // 0 to 1

  // State for simulation
  const [solventFrontY, setSolventFrontY] = useState(0); // 0 to max
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // Drag interaction
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [itemPos, setItemPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const svgRef = useRef<SVGSVGElement>(null);

  const colors = ['#ef4444', '#3b82f6', '#f59e0b', '#10b981'];

  const handleStartDrag = (e: React.TouchEvent | React.MouseEvent, type: string) => {
    setActiveItem(type);
    setIsDragging(true);
    const touch = 'touches' in e ? e.touches[0] : e;
    const svgRect = svgRef.current?.getBoundingClientRect();
    if (svgRect) {
      setItemPos({ x: touch.clientX - svgRect.left, y: touch.clientY - svgRect.top });
    }
  };

  const handleMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging) return;
    const touch = 'touches' in e ? e.touches[0] : e;
    const svgRect = svgRef.current?.getBoundingClientRect();
    if (svgRect) {
      setItemPos({ x: touch.clientX - svgRect.left, y: touch.clientY - svgRect.top });
    }
  };

  const handleEndDrag = () => {
    if (!activeItem) return;

    if (step === 'PAPER' && activeItem === 'paper' && itemPos.y > 300) {
      setIsPaperPlaced(true);
      setStep('RULER');
      setMessage('Align the ruler along the bottom edge of the paper to draw the baseline.');
    } else if (step === 'RULER' && activeItem === 'ruler' && Math.abs(itemPos.y - 600) < 50) {
      setIsRulerAligned(true);
      setStep('PENCIL');
      setMessage('Draw a pencil line at the 2cm mark for the baseline.');
    } else if (step === 'PENCIL' && activeItem === 'pencil' && isRulerAligned) {
      setIsBaselineDrawn(true);
      setStep('SPOTTING');
      setMessage('Use the capillary tube to spot different ink samples along the baseline.');
    } else if (step === 'SPOTTING' && activeItem === 'capillary' && isBaselineDrawn) {
      const newSpot: InkSpot = {
        id: inkSpots.length,
        x: 420 + inkSpots.length * 50,
        color: colors[inkSpots.length % colors.length],
        distance: 0
      };
      if (inkSpots.length < 4) {
        setInkSpots([...inkSpots, newSpot]);
        if (inkSpots.length === 3) {
          setStep('SOLVENT');
          setMessage('Fill the chromatography tank with solvent (Ethanol/Water mix).');
        }
      }
    } else if (step === 'SOLVENT' && activeItem === 'solvent' && itemPos.x > 100 && itemPos.x < 300) {
       setTankLevels(1);
       setStep('STAPLING');
       setMessage('Form the paper into a cylinder and staple the edges.');
    } else if (step === 'STAPLING' && activeItem === 'stapler' && isPaperPlaced) {
       setIsPaperCylindrical(true);
       setStep('DEVELOPING');
       setMessage('Place the prepared paper cylinder into the tank and close the lid.');
    } else if (step === 'DEVELOPING' && activeItem === 'paper-cyl' && itemPos.x > 100 && itemPos.x < 300) {
       setIsPaperInTank(true);
       setMessage('The solvent is climbing up the paper. Pigments are separating based on their Rf values.');
    }

    setIsDragging(false);
    setActiveItem(null);
  };

  // Run elution
  useEffect(() => {
    if (isPaperInTank && !isFinished) {
      const interval = setInterval(() => {
        setSolventFrontY(y => {
           if (y >= 400) {
             setIsFinished(true);
             setStep('MEASURING');
             setMessage('Chromatogram developed! Drag the ruler to measure distances and calculate Rf values.');
             return 400;
           }
           return y + 2;
        });
        setElapsedTime(t => t + 1);
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isPaperInTank, isFinished]);

  return (
    <div className="w-full h-full bg-[#0a0f1e] rounded-3xl overflow-hidden flex flex-col font-sans select-none touch-none border border-white/5">
       {/* Instruction Bar */}
       <div className="p-5 bg-[#121b33] border-b border-white/5 flex items-center justify-between shadow-lg">
          <div className="flex gap-4 items-center">
             <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <Box size={24} />
             </div>
             <div>
                <h3 className="text-white font-bold leading-none mb-1 text-lg">Separation of Pigments</h3>
                <p className="text-xs text-indigo-300 font-medium opacity-70 tracking-wide">{message}</p>
             </div>
          </div>
          <button onClick={() => window.location.reload()} className="p-3 rounded-xl bg-white/5 text-slate-400 hover:text-white transition-all shadow-inner">
             <RotateCcw size={20} />
          </button>
       </div>

       <div className="flex-1 flex overflow-hidden">
          {/* Inventory Tray */}
          <div className="w-64 bg-[#0d1428] border-r border-white/5 p-4 flex flex-col gap-3">
             <h4 className="text-[10px] font-bold text-slate-500 uppercase px-2 mb-2 tracking-[0.2em]">Equipment Drawer</h4>
             {[
               { id: 'paper', name: 'Chromatography Paper', icon: <Layers />, disabled: isPaperPlaced },
               { id: 'ruler', name: 'Measuring Ruler', icon: <Ruler />, disabled: isRulerAligned && step !== 'MEASURING' },
               { id: 'pencil', name: 'Lead Pencil', icon: <Edit3 />, disabled: isBaselineDrawn },
               { id: 'capillary', name: 'Capillary Tube', icon: <PenTool />, disabled: inkSpots.length >= 4 },
               { id: 'solvent', name: 'Solvent Flask', icon: <Droplet />, disabled: tankLevels > 0 },
               { id: 'stapler', name: 'Heavy Duty Stapler', icon: <Scissors />, disabled: isPaperCylindrical },
             ].map(i => {
                if (i.disabled) return null;
                return (
                  <div 
                    key={i.id}
                    onMouseDown={(e) => handleStartDrag(e, i.id)}
                    onTouchStart={(e) => handleStartDrag(e, i.id)}
                    className="p-4 rounded-3xl bg-white/[0.03] border border-white/5 flex items-center gap-4 text-slate-300 text-xs hover:bg-white/[0.07] transition-all cursor-grab active:cursor-grabbing group shadow-sm"
                  >
                     <div className="w-10 h-10 rounded-2xl bg-indigo-950/40 flex items-center justify-center text-indigo-500 border border-indigo-500/20 group-hover:scale-105 group-hover:rotate-6 transition-transform">
                        {i.icon}
                     </div>
                     <span className="font-semibold tracking-tight">{i.name}</span>
                  </div>
                );
             })}
             
             {isPaperCylindrical && !isPaperInTank && (
                <div 
                  className="p-4 rounded-3xl bg-indigo-600 text-white flex items-center gap-4 cursor-grab" 
                  onMouseDown={(e) => handleStartDrag(e, 'paper-cyl')}
                  onTouchStart={(e) => handleStartDrag(e, 'paper-cyl')}
                >
                  <Layers /> <span>Insert Paper into Tank</span>
                </div>
             )}
          </div>

          {/* Workbench */}
          <div className="flex-1 relative bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] bg-fixed overflow-hidden">
             <svg 
               ref={svgRef}
               className="w-full h-full"
               viewBox="0 0 1000 800"
               onMouseMove={handleMove}
               onTouchMove={handleMove}
               onMouseUp={handleEndDrag}
               onTouchEnd={handleEndDrag}
             >
                {/* Tank */}
                <g transform="translate(100, 200)">
                   <rect x="0" y="0" width="200" height="450" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.2)" strokeWidth="4" rx="10" />
                   {tankLevels > 0 && (
                      <rect x="5" y="400" width="190" height="45" fill="rgba(66, 153, 225, 0.3)" rx="5" />
                   )}
                   {isPaperInTank && (
                      <g transform="translate(50, 50)">
                         <rect x="0" y="0" width="100" height="400" fill="#f8fafc" />
                         <line x1="0" y1="350" x2="100" y2="350" stroke="#94a3b8" strokeDasharray="5,5" />
                         {/* Solvent Front Climbing */}
                         <rect x="0" y={350 - solventFrontY} width="100" height={solventFrontY} fill="rgba(66, 153, 225, 0.1)" />
                         <line x1="0" y1={350 - solventFrontY} x2="100" y2={350 - solventFrontY} stroke="rgba(66, 153, 225, 0.5)" strokeWidth="2" />
                         
                         {/* Pigments */}
                         {inkSpots.map((spot, i) => {
                            const Rf = [0.4, 0.7, 0.5, 0.9][i];
                            const dist = solventFrontY * Rf;
                            return (
                               <motion.ellipse 
                                 key={i}
                                 cx={(i*20) + 20} cy={350 - dist} rx="8" ry={8 + dist/20} 
                                 fill={spot.color} opacity={0.8}
                                 filter="blur(3px)"
                               />
                            );
                         })}
                      </g>
                   )}
                </g>

                {/* Flat Paper for Prep */}
                {isPaperPlaced && !isPaperCylindrical && (
                   <g transform="translate(400, 200)">
                      <rect x="0" y="0" width="400" height="500" fill="#fcfcfc" filter="drop-shadow(0 20px 30px rgba(0,0,0,0.5))" />
                      {isBaselineDrawn && <line x1="0" y1="450" x2="400" y2="450" stroke="#ccc" strokeWidth="2" strokeDasharray="3,3" />}
                      {inkSpots.map((s, i) => (
                         <circle key={i} cx={s.x - 400} cy={450} r="6" fill={s.color} />
                      ))}
                   </g>
                )}

                {/* Ruler Overlay */}
                {isRulerAligned && step !== 'MEASURING' && (
                   <g transform="translate(400, 600)">
                      <rect x="0" y="0" width="400" height="40" fill="rgba(255,215,0,0.2)" stroke="#ffd700" strokeWidth="2" />
                      {[...Array(9)].map((_, i) => <line key={i} x1={i*50} y1="0" x2={i*50} y2="10" stroke="#ffd700" />)}
                   </g>
                )}

                {/* Active Tool Rendering */}
                {isDragging && activeItem && (
                   <g transform={`translate(${itemPos.x}, ${itemPos.y}) rotate(${activeItem === 'solvent' ? -35 : 0})`}>
                      {activeItem === 'paper' && <rect x="-50" y="-100" width="100" height="200" fill="#f8fafc" opacity="0.7" />}
                      {activeItem === 'ruler' && <rect x="-100" y="-10" width="200" height="20" fill="rgba(255,215,0,0.4)" />}
                      {activeItem === 'pencil' && <path d="M0,0 L0,-40 L5,-45 L10,-40 L10,0 Z" fill="#94a3b8" transform="rotate(-30)" />}
                      {activeItem === 'capillary' && <rect x="-2" y="-40" width="4" height="80" fill="white" />}
                      {activeItem === 'solvent' && <path d="M-20,0 L20,0 L15,40 L-15,40 Z" fill="#3b82f6" />}
                      {activeItem === 'stapler' && <rect x="-15" y="-15" width="30" height="30" fill="#333" />}
                      {activeItem === 'paper-cyl' && <rect x="-30" y="-80" width="60" height="160" fill="#f8fafc" rx="30" stroke="#ddd" />}
                   </g>
                )}
             </svg>

             {/* Calculation Table (Analysis) */}
             {isFinished && (
                <div className="absolute top-10 right-10 w-80 p-6 rounded-3xl bg-black/60 backdrop-blur-xl border border-white/10 shadow-2xl animate-fade-in-up">
                   <h4 className="text-white font-bold text-sm mb-4 tracking-wider uppercase">Observation Table</h4>
                   <div className="space-y-3">
                      {inkSpots.map((s, i) => {
                         const Rf = [0.4, 0.7, 0.5, 0.9][i];
                         return (
                            <div key={i} className="flex items-center justify-between text-xs p-3 rounded-2xl bg-white/5 border border-white/5">
                               <div className="flex items-center gap-2">
                                  <div className="w-3 h-3 rounded-full" style={{ background: s.color }} />
                                  <span className="text-slate-400">D{i+1}</span>
                               </div>
                               <div className="text-slate-300 font-mono">{(Rf * 15).toFixed(1)} cm</div>
                               <div className="font-bold text-indigo-400 font-mono">Rf 0.{Rf * 10}</div>
                            </div>
                         );
                      })}
                      <div className="pt-4 border-t border-white/10 flex justify-between items-center text-[10px] font-bold text-slate-500 uppercase">
                         <span>Solvent Front</span>
                         <span className="text-white">15.0 cm</span>
                      </div>
                   </div>
                </div>
             )}
          </div>
       </div>
    </div>
  );
};

export default ChromatographySim;
