import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Beaker, RotateCcw, Check, Droplets, 
    Thermometer, Info, Plus, Clock, Eye, EyeOff
} from 'lucide-react';

// --- Types ---
interface Apparatus {
    id: string;
    name: string;
    placed: boolean;
    x: number;
    y: number;
    color: string;
}

const RateOfReactionSim: React.FC<{ onLog?: (data: any) => void }> = ({ onLog }) => {
    const [step, setStep] = useState<'assembly' | 'experiment' | 'results'>('assembly');
    const [apparatus, setApparatus] = useState<Apparatus[]>([
        { id: 'paper', name: 'Paper with Cross (X)', placed: false, x: 50, y: 350, color: '#f8fafc' },
        { id: 'beaker', name: 'Glass Beaker (100ml)', placed: false, x: 150, y: 350, color: '#cbd5e1' },
        { id: 'thiosulphate', name: 'Sodium Thiosulphate Bottle', placed: false, x: 250, y: 350, color: '#facc15' },
        { id: 'acid', name: 'Hydrochloric Acid Bottle', placed: false, x: 350, y: 350, color: '#38bdf8' },
        { id: 'stopwatch', name: 'Digital Stopwatch', placed: false, x: 450, y: 350, color: '#f87171' },
    ]);

    const [fluids, setFluids] = useState({ thiosulphate: 0, acid: 0 }); 
    const [timer, setTimer] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [cloudiness, setCloudiness] = useState(0); // 0 to 1
    const [temperature, setTemperature] = useState(25);
    const [activeId, setActiveId] = useState<string | null>(null);
    const [showResult, setShowResult] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);
    const timerRef = useRef<any>(null);

    // --- Constraints & Constants ---
    const SNAP_ZONE = { x: 400, y: 300, radius: 100 };
    
    // Clouding rate formula: depends on temperature
    // Faster at higher T. Base duration ~20s at 25C.
    const getRate = () => (0.01 * (temperature / 25)); 

    // --- Effects ---
    useEffect(() => {
        if (isRunning && !showResult) {
            timerRef.current = setInterval(() => {
                setTimer(prev => Number((prev + 0.1).toFixed(1)));
                setCloudiness(prev => {
                    const next = prev + getRate();
                    if (next >= 1) {
                        // Reaction naturally ends, but user must still click STOP
                        return 1;
                    }
                    return next;
                });
            }, 100);
            return () => clearInterval(timerRef.current);
        }
    }, [isRunning, temperature, showResult]);

    // --- Interactions ---
    const handleTouchStart = (id: string) => setActiveId(id);

    const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
        if (!activeId || step !== 'assembly') return;
        
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;

        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

        const x = clientX - rect.left;
        const y = clientY - rect.top;

        setApparatus(prev => prev.map(item => 
            item.id === activeId ? { ...item, x, y } : item
        ));
    };

    const handleTouchEnd = () => {
        if (!activeId) return;

        const item = apparatus.find(a => a.id === activeId);
        if (item) {
            const dist = Math.sqrt(
                Math.pow(item.x - SNAP_ZONE.x, 2) + Math.pow(item.y - SNAP_ZONE.y, 2)
            );

            if (dist < SNAP_ZONE.radius) {
                setApparatus(prev => prev.map(a => 
                    a.id === activeId ? { ...a, placed: true, x: SNAP_ZONE.x, y: SNAP_ZONE.y } : a
                ));
                if (navigator.vibrate) navigator.vibrate(40);
            }
        }
        setActiveId(null);
    };

    const addFluid = (type: 'thiosulphate' | 'acid') => {
        if (fluids[type] >= 50) return;
        setFluids(prev => ({ ...prev, [type]: 50 }));
        if (navigator.vibrate) navigator.vibrate(20);
        
        // Start reaction automatically when both are added
        if (type === 'acid' && fluids.thiosulphate === 50) {
            setIsRunning(true);
        } else if (type === 'thiosulphate' && fluids.acid === 50) {
            setIsRunning(true);
        }
    };

    const stopExperiment = () => {
        setIsRunning(false);
        setShowResult(true);
        if (onLog) onLog({ time: timer, temp: temperature });
    };

    const reset = () => {
        setStep('assembly');
        setApparatus(prev => prev.map(a => ({ ...a, placed: false, x: Math.random() * 200 + 50, y: Math.random() * 200 + 300 })));
        setFluids({ thiosulphate: 0, acid: 0 });
        setTimer(0);
        setCloudiness(0);
        setIsRunning(false);
        setShowResult(false);
    };

    return (
        <div className="flex flex-col h-full bg-slate-950 font-sans select-none overflow-hidden" ref={containerRef}>
            {/* Header */}
            <div className="p-4 bg-slate-900 border-b border-white/10 flex justify-between items-center z-50 shadow-2xl">
                <div>
                    <h1 className="text-white font-bold text-xl flex items-center gap-2">
                        <Clock className="text-amber-400" />
                        Chemical Kinetics Lab
                    </h1>
                    <p className="text-slate-400 text-xs uppercase tracking-widest font-bold opacity-60">Rate of Reaction Analysis</p>
                </div>
                <div className="flex gap-2">
                    <button onClick={reset} className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-white transition-all">
                        <RotateCcw size={18} />
                    </button>
                    <button className="p-2 bg-amber-500/20 text-amber-400 rounded-lg">
                        <Info size={18} />
                    </button>
                </div>
            </div>

            {/* Main Stage */}
            <div className="flex-1 relative overflow-hidden" 
                 onMouseMove={handleTouchMove} 
                 onMouseUp={handleTouchEnd}
                 onTouchMove={handleTouchMove}
                 onTouchEnd={handleTouchEnd}
            >
                {/* Background Decor */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-black" />
                <div className="absolute top-0 w-full h-full opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

                {/* Snap Zone Glow */}
                {step === 'assembly' && (
                    <div className="absolute" style={{ left: SNAP_ZONE.x - 80, top: SNAP_ZONE.y - 80 }}>
                        <div className="w-[160px] h-[160px] rounded-full border-2 border-dashed border-white/20 animate-pulse flex items-center justify-center">
                            <Plus className="text-white/10" size={48} />
                        </div>
                    </div>
                )}

                {/* Apparatus Rendering */}
                <div className="relative h-full w-full pointer-events-none">
                    <svg viewBox="0 0 1000 800" className="w-full h-full"> 
                        <defs>
                            <filter id="blurFilter">
                                <feGaussianBlur in="SourceGraphic" stdDeviation={cloudiness * 10} />
                            </filter>
                            <linearGradient id="yellowFluid" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#fef08a" />
                                <stop offset="100%" stopColor="#eab308" />
                            </linearGradient>
                        </defs>

                        {/* Centered Assembly */}
                        <g transform={`translate(${SNAP_ZONE.x}, ${SNAP_ZONE.y})`}>
                            {/* Paper */}
                            {apparatus.find(a => a.id === 'paper')?.placed && (
                                <g>
                                    <rect x="-80" y="-80" width="160" height="160" rx="4" fill="white" stroke="#e2e8f0" strokeWidth="2" />
                                    <motion.path 
                                        d="M -30,-30 L 30,30 M -30,30 L 30,-30" 
                                        stroke="#1e293b" strokeWidth="12" strokeLinecap="round"
                                        style={{ opacity: 1 - cloudiness }}
                                    />
                                </g>
                            )}
                            
                            {/* Beaker & Fluid */}
                            {apparatus.find(a => a.id === 'beaker')?.placed && (
                                <g transform="translate(0, 0)">
                                    {/* Liquid Animation */}
                                    <circle r="60" fill="url(#yellowFluid)" opacity={cloudiness * 0.9} />
                                    
                                    {/* Glass Body */}
                                    <path d="M -65,-70 L 65,-70 L 60,70 L -60,70 Z" fill="rgba(255,255,255,0.05)" stroke="white" strokeWidth="1.5" opacity="0.3" />
                                    <rect x="-60" y="-70" width="120" height="2" fill="white" opacity="0.2" />
                                </g>
                            )}

                            {/* Stopwatch Floating */}
                            {apparatus.find(a => a.id === 'stopwatch')?.placed && (
                                <g transform="translate(140, -40)">
                                    <rect x="-40" y="-25" width="80" height="50" rx="8" fill="#1e293b" stroke="#f87171" strokeWidth="2" />
                                    <text x="0" y="8" fill="#f87171" fontSize="18" textAnchor="middle" fontWeight="black" className="font-mono tracking-tighter">
                                        {timer.toFixed(1)}s
                                    </text>
                                </g>
                            )}
                        </g>

                        {/* Unplaced Items */}
                        {apparatus.filter(a => !a.placed).map(item => (
                            <g key={item.id} 
                               transform={`translate(${item.x}, ${item.y})`}
                               className="pointer-events-auto cursor-grab active:cursor-grabbing"
                               onMouseDown={() => handleTouchStart(item.id)}
                               onTouchStart={() => handleTouchStart(item.id)}
                            >
                                <circle r="45" fill={item.color} opacity="0.15" />
                                <circle r="40" fill={item.color} opacity="0.4" />
                                {item.id === 'paper' && <Plus className="text-white" style={{ transform: 'translate(-12px, -12px)' }} />}
                                {item.id === 'beaker' && <Beaker className="text-white" style={{ transform: 'translate(-12px, -12px)' }} />}
                                {item.id === 'thiosulphate' && <Droplets className="text-yellow-400" style={{ transform: 'translate(-12px, -12px)' }} />}
                                {item.id === 'acid' && <Droplets className="text-blue-400" style={{ transform: 'translate(-12px, -12px)' }} />}
                                {item.id === 'stopwatch' && <Clock className="text-red-400" style={{ transform: 'translate(-12px, -12px)' }} />}
                                <text y="60" fontSize="11" fill="white" textAnchor="middle" className="font-black uppercase tracking-tighter opacity-80">
                                    {item.name}
                                </text>
                            </g>
                        ))}
                    </svg>
                </div>

                {/* UI Overlays */}
                <div className="absolute top-10 left-10 flex flex-col gap-4">
                    <AnimatePresence>
                        {step === 'assembly' && (
                            <motion.div 
                                initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }}
                                className="bg-slate-900/40 backdrop-blur-3xl border border-white/5 p-6 rounded-[2rem] max-w-xs shadow-2xl"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-amber-500/20 rounded-full flex items-center justify-center">
                                        <Plus className="text-amber-400" size={20}/>
                                    </div>
                                    <h3 className="text-white font-black text-xs uppercase tracking-[0.2em]">Hardware Setup</h3>
                                </div>
                                <div className="space-y-3">
                                    {apparatus.map(a => (
                                        <div key={a.id} className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/5">
                                            <span className={`text-[10px] font-bold uppercase tracking-wider ${a.placed ? 'text-slate-200' : 'text-slate-500'}`}>{a.name}</span>
                                            <div className={`w-4 h-4 rounded-full flex items-center justify-center ${a.placed ? 'bg-emerald-500' : 'bg-slate-800 border border-white/10'}`}>
                                                {a.placed && <Check size={10} className="text-white"/>}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {apparatus.every(a => a.placed) && (
                                    <motion.button 
                                        initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                                        onClick={() => setStep('experiment')}
                                        className="w-full mt-6 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-amber-500/20 active:scale-95 transition-all"
                                    >
                                        Begin Experiment
                                    </motion.button>
                                )}
                            </motion.div>
                        )}

                        {step === 'experiment' && (
                            <motion.div 
                                initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                                className="bg-slate-900/40 backdrop-blur-3xl border border-white/5 p-6 rounded-[2rem] flex flex-col gap-6"
                            >
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                                        <Thermometer size={14}/> Temperature Control
                                    </div>
                                    <input 
                                        type="range" min="10" max="80" value={temperature} 
                                        onChange={(e) => setTemperature(parseInt(e.target.value))}
                                        className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                                    />
                                    <div className="text-3xl font-black text-white font-mono text-center tracking-tighter">
                                        {temperature}°<span className="text-lg opacity-40 ml-1">C</span>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3">
                                    <button 
                                        onClick={() => addFluid('thiosulphate')}
                                        disabled={fluids.thiosulphate >= 50 || isRunning}
                                        className="group relative h-16 w-64 bg-white/5 border border-white/5 rounded-2xl flex items-center px-6 gap-4 overflow-hidden"
                                    >
                                        <div className={`absolute inset-0 bg-amber-500/20 transition-all duration-1000`} style={{ width: `${fluids.thiosulphate}%` }} />
                                        <Droplets className="text-amber-400 relative z-10" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-300 relative z-10">Add Thiosulphate</span>
                                    </button>

                                    <button 
                                        onClick={() => addFluid('acid')}
                                        disabled={fluids.acid >= 50 || fluids.thiosulphate < 50 || isRunning}
                                        className="group relative h-16 w-64 bg-white/5 border border-white/5 rounded-2xl flex items-center px-6 gap-4 overflow-hidden disabled:opacity-30"
                                    >
                                        <div className={`absolute inset-0 bg-blue-500/20 transition-all duration-1000`} style={{ width: `${fluids.acid}%` }} />
                                        <Droplets className="text-blue-400 relative z-10" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-300 relative z-10">Add HCl (Starts Reaction)</span>
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Detection Controls */}
                {isRunning && (
                    <div className="absolute inset-x-0 bottom-24 flex justify-center">
                        <motion.div 
                            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                            className="bg-slate-900/60 backdrop-blur-2xl p-8 rounded-[3rem] border border-white/10 flex flex-col items-center gap-6 shadow-3xl"
                        >
                            <div className="text-center">
                                <h3 className="text-white font-black text-sm uppercase tracking-widest mb-1">Observation phase</h3>
                                <p className="text-slate-400 text-xs font-bold leading-relaxed">Focus on the Cross (X) beneath the beaker.<br/>Tap when it completely disappears.</p>
                            </div>
                            
                            <div className="flex gap-4">
                                <div className="p-4 px-8 bg-black/40 rounded-2xl flex items-center gap-4">
                                    {cloudiness > 0.8 ? <EyeOff className="text-red-400 animate-pulse" /> : <Eye className="text-emerald-400" />}
                                    <span className="text-2xl font-black text-white font-mono">{timer.toFixed(1)}s</span>
                                </div>
                                <button 
                                    onClick={stopExperiment}
                                    className="p-4 px-12 bg-white text-slate-950 font-black rounded-2xl hover:bg-slate-200 transition-all shadow-xl shadow-white/10 active:scale-95 text-xs uppercase tracking-[0.2em]"
                                >
                                    STOP
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}

                {/* Results Screen */}
                <AnimatePresence>
                    {showResult && (
                        <motion.div 
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                            className="absolute inset-0 z-[100] bg-slate-950/80 backdrop-blur-2xl flex items-center justify-center p-8"
                        >
                            <motion.div 
                                initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }}
                                className="bg-slate-900 border border-white/10 rounded-[3rem] p-12 max-w-xl w-full flex flex-col gap-10 shadow-3xl overflow-hidden relative"
                            >
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-orange-500" />
                                
                                <div className="text-center">
                                    <div className="w-20 h-20 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <Clock className="text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.4)]" size={36} />
                                    </div>
                                    <h2 className="text-3xl font-black text-white mb-2 tracking-tighter uppercase">Experimental Result</h2>
                                    <p className="text-slate-400 text-sm font-bold uppercase tracking-widest opacity-60">Reaction Rate Verified</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-white/5 p-6 rounded-3xl border border-white/5 flex flex-col items-center">
                                        <span className="text-slate-500 text-[10px] font-black uppercase mb-2">Temperature</span>
                                        <span className="text-3xl font-black text-white font-mono">{temperature}°C</span>
                                    </div>
                                    <div className="bg-white/5 p-6 rounded-3xl border border-white/5 flex flex-col items-center">
                                        <span className="text-slate-500 text-[10px] font-black uppercase mb-2">Reaction Time</span>
                                        <span className="text-3xl font-black text-amber-400 font-mono">{timer.toFixed(1)}s</span>
                                    </div>
                                </div>

                                <div className="p-6 bg-amber-500/5 rounded-3xl border border-amber-500/10">
                                    <p className="text-xs text-amber-500/60 font-bold leading-relaxed">
                                        Observation: At {temperature}°C, the sulfur precipitation completely obscured the cross in {timer} seconds. 
                                        As temperature increases, the rate (1/t) increases exponentially.
                                    </p>
                                </div>

                                <button onClick={reset} className="w-full py-5 bg-white text-slate-950 font-black rounded-2xl hover:bg-slate-200 transition-all flex items-center justify-center gap-3 shadow-2xl uppercase tracking-widest text-xs">
                                    <RotateCcw size={18} /> New Trial
                                </button>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            
            {/* Legend/Footer */}
            <div className="p-4 px-8 bg-slate-950 border-t border-white/5 flex justify-between items-center overflow-x-auto whitespace-nowrap">
                <div className="flex gap-8 items-center">
                    <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-600"><Clock size={12}/> Precision Timer v3.1</span>
                    <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-amber-400/60"><Droplets size={12}/> Viscosity Engine: 0.89cP</span>
                </div>
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 opacity-40">Vijnana Lab Analytical Suite</div>
            </div>
        </div>
    );
};

export default RateOfReactionSim;
