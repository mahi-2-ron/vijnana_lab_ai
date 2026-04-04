import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Thermometer, Droplets, RotateCcw, 
    RefreshCw, Beaker, Check, Plus, AlertCircle, Play, Info, Activity
} from 'lucide-react';

// --- Types ---
interface Apparatus {
    id: string;
    name: string;
    type: 'base' | 'inner' | 'lid' | 'thermometer' | 'stirrer' | 'liquid_a' | 'liquid_b';
    placed: boolean;
    x: number;
    y: number;
    color: string;
}

const ThermochemistrySim: React.FC<{ onLog?: (data: any) => void }> = ({ onLog }) => {
    const [step, setStep] = useState<'assembly' | 'experiment' | 'results'>('assembly');
    const [apparatus, setApparatus] = useState<Apparatus[]>([
        { id: 'base', name: 'Calorimeter Base (Styrofoam)', type: 'base', placed: false, x: 50, y: 350, color: '#e5e7eb' },
        { id: 'inner', name: 'Inner Copper Beaker', type: 'inner', placed: false, x: 150, y: 350, color: '#b45309' },
        { id: 'lid', name: 'Insulated Lid', type: 'lid', placed: false, x: 250, y: 350, color: '#9ca3af' },
        { id: 'thermometer', name: 'Digital Thermometer', type: 'thermometer', placed: false, x: 350, y: 350, color: '#ef4444' },
        { id: 'stirrer', name: 'Glass Stirrer', type: 'stirrer', placed: false, x: 450, y: 350, color: '#93c5fd' },
    ]);

    const [fluids, setFluids] = useState({ acid: 0, base: 0 }); // ml added
    const [temperature, setTemperature] = useState(25.0);
    const [initialTemp, setInitialTemp] = useState(25.0);
    const [isStirring, setIsStirring] = useState(false);
    const [stirCount, setStirCount] = useState(0);
    const [reactionComplete, setReactionComplete] = useState(false);
    const [finalTemp, setFinalTemp] = useState(25.0);
    const [activeId, setActiveId] = useState<string | null>(null);

    const containerRef = useRef<HTMLDivElement>(null);

    const TARGET_MAX_TEMP = 31.8; 
    const SNAP_ZONE = { x: 400, y: 350, radius: 80 }; // Lowered for better vertical fit

    // --- Effects ---
    useEffect(() => {
        if (fluids.acid === 50 && fluids.base === 50 && isStirring && stirCount < 50) {
            const timer = setInterval(() => {
                setTemperature(prev => {
                    if (prev < TARGET_MAX_TEMP) {
                        return Number((prev + 0.1).toFixed(1));
                    }
                    setReactionComplete(true);
                    return prev;
                });
                setStirCount(c => c + 1);
            }, 100);
            return () => clearInterval(timer);
        }
    }, [fluids, isStirring, stirCount]);

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
                // Snap to correct Z-order/Position
                setApparatus(prev => prev.map(a => 
                    a.id === activeId ? { ...a, placed: true, x: SNAP_ZONE.x, y: SNAP_ZONE.y } : a
                ));
                // Vibration feedback
                if (navigator.vibrate) navigator.vibrate(40);
            }
        }

        setActiveId(null);

        // Check completion
        const allPlaced = apparatus.every(a => a.id === activeId ? true : a.placed);
        if (allPlaced && item?.id === 'stirrer') {
             // Delay to allow snap animation
        }
    };

    const startExperiment = () => {
        if (apparatus.every(a => a.placed)) {
            setStep('experiment');
            setInitialTemp(25.0);
            setTemperature(25.0);
        }
    };

    const addFluid = (type: 'acid' | 'base') => {
        if (reactionComplete) return;
        setFluids(prev => ({
            ...prev,
            [type]: Math.min(prev[type] + 10, 50)
        }));
        if (navigator.vibrate) navigator.vibrate(20);
    };

    const reset = () => {
        setStep('assembly');
        setApparatus(prev => prev.map(a => ({ ...a, placed: false, x: Math.random() * 200 + 50, y: Math.random() * 200 + 300 })));
        setFluids({ acid: 0, base: 0 });
        setTemperature(25.0);
        setStirCount(0);
        setIsStirring(false);
        setReactionComplete(false);
    };

    return (
        <div className="flex flex-col h-full bg-slate-950 font-sans select-none overflow-hidden" ref={containerRef}>
            {/* Header */}
            <div className="p-4 bg-slate-900 border-b border-white/10 flex justify-between items-center z-50">
                <div>
                    <h1 className="text-white font-bold text-xl flex items-center gap-2">
                        <Thermometer className="text-emerald-400" />
                        Enthalpy of Neutralization
                    </h1>
                    <p className="text-slate-400 text-xs">Strong Acid vs Strong Base • Exothermic Analysis</p>
                </div>
                <div className="flex gap-2">
                    <button onClick={reset} className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-white transition-all">
                        <RotateCcw size={18} />
                    </button>
                    <button className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg">
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
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#1e293b_0%,_#020617_100%)]" />
                <div className="absolute bottom-0 w-full h-1/3 bg-slate-900/50 border-t border-white/5 backdrop-blur-sm" />

                {/* Snap Zone Glow */}
                {step === 'assembly' && (
                    <div className="absolute" style={{ left: SNAP_ZONE.x - 60, top: SNAP_ZONE.y - 60 }}>
                        <div className="w-[120px] h-[120px] rounded-full border-2 border-dashed border-white/20 animate-pulse flex items-center justify-center">
                            <Plus className="text-white/20" size={32} />
                        </div>
                    </div>
                )}

                {/* Apparatus Rendering */}
                <div className="relative h-full w-full pointer-events-none">
                    <svg viewBox="0 0 800 600" className="w-full h-full">
                        <defs>
                            <linearGradient id="glass" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
                                <stop offset="50%" stopColor="rgba(255,255,255,0.3)" />
                                <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
                            </linearGradient>
                            <filter id="glow">
                                <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                                <feMerge>
                                    <feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/>
                                </feMerge>
                            </filter>
                        </defs>

                        {/* Calorimeter Assembly */}
                        <g transform={`translate(${SNAP_ZONE.x}, ${SNAP_ZONE.y})`}>
                            {/* Base */}
                            {apparatus.find(a => a.id === 'base')?.placed && (
                                <path d="M -60,0 L 60,0 L 50,120 L -50,120 Z" fill="#e5e7eb" stroke="#9ca3af" strokeWidth="2" />
                            )}
                            
                            {/* Liquid Level */}
                            {apparatus.find(a => a.id === 'inner')?.placed && (
                                <rect x="-40" y={100 - (fluids.acid + fluids.base)} width="80" height={fluids.acid + fluids.base} fill="#34d399" opacity="0.4" className="transition-all duration-500" />
                            )}

                            {/* Inner Beaker */}
                            {apparatus.find(a => a.id === 'inner')?.placed && (
                                <path d="M -45,10 L 45,10 L 40,110 L -40,110 Z" fill="none" stroke="#b45309" strokeWidth="2" opacity="0.6" />
                            )}

                            {/* Lid */}
                            {apparatus.find(a => a.id === 'lid')?.placed && (
                                <rect x="-65" y="-10" width="130" height="15" rx="5" fill="#9ca3af" stroke="#6b7280" />
                            )}

                            {/* Thermometer */}
                            {apparatus.find(a => a.id === 'thermometer')?.placed && (
                                <g transform="translate(-20, -120)">
                                    <rect x="-2" y="0" width="4" height="200" fill="white" opacity="0.8" />
                                    <rect x="-2" y={200 - (temperature * 2)} width="4" height={temperature * 2} fill="#ef4444" />
                                    <rect x="-25" y="-40" width="50" height="30" rx="4" fill="#0f172a" stroke="#ef4444" strokeWidth="1" filter="url(#glow)" />
                                    <text x="0" y="-20" fill="#ef4444" fontSize="12" textAnchor="middle" fontWeight="bold font-mono">
                                        {temperature.toFixed(1)}°C
                                    </text>
                                </g>
                            )}

                            {/* Stirrer */}
                            {apparatus.find(a => a.id === 'stirrer')?.placed && (
                                <motion.g 
                                    animate={isStirring ? { y: [-20, 20, -20] } : {}}
                                    transition={{ repeat: Infinity, duration: 1 }}
                                >
                                    <rect x="25" y="-80" width="4" height="180" rx="2" fill="url(#glass)" stroke="white" strokeWidth="0.5" opacity="0.7" />
                                    <circle cx="27" cy="100" r="10" fill="none" stroke="white" strokeWidth="0.5" opacity="0.7" />
                                </motion.g>
                            )}
                        </g>

                        {/* Unplaced Items Rendering */}
                        {apparatus.filter(a => !a.placed).map(item => (
                            <g key={item.id} 
                               transform={`translate(${item.x}, ${item.y})`}
                               className="pointer-events-auto cursor-grab active:cursor-grabbing"
                               onMouseDown={() => handleTouchStart(item.id)}
                               onTouchStart={() => handleTouchStart(item.id)}
                            >
                                <circle r="40" fill={item.color} opacity="0.2" filter="url(#glow)" />
                                {item.id === 'thermometer' && <Thermometer className="text-white" style={{ transform: 'translate(-12px, -12px)' }} />}
                                {item.id === 'stirrer' && <RefreshCw className="text-white" style={{ transform: 'translate(-12px, -12px)' }} />}
                                {item.id === 'lid' && <Plus className="text-white" style={{ transform: 'rotate(45deg) translate(-16px, -16px)' }} />}
                                {item.id === 'base' && <Beaker className="text-white" style={{ transform: 'translate(-12px, -12px)' }} />}
                                {item.id === 'inner' && <div className="p-2 rounded bg-amber-900 border border-amber-600 text-[10px] text-white">Inner</div>}
                                <text y="55" fontSize="10" fill="white" textAnchor="middle" className="font-semibold uppercase tracking-tighter">
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
                                className="bg-slate-900/80 border border-white/10 p-5 rounded-2xl backdrop-blur-xl max-w-xs"
                            >
                                <h3 className="text-white font-bold mb-2 flex items-center gap-2">
                                    <Check className="text-blue-400" size={16}/> Assembly Phase
                                </h3>
                                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                                    Drag the laboratory equipment to the workbench to set up the calorimeter.
                                </p>
                                <div className="space-y-2">
                                    {apparatus.map(a => (
                                        <div key={a.id} className="flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${a.placed ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]' : 'bg-slate-700'}`} />
                                            <span className={`text-xs ${a.placed ? 'text-slate-200' : 'text-slate-500'}`}>{a.name}</span>
                                        </div>
                                    ))}
                                </div>
                                {apparatus.every(a => a.placed) && (
                                    <motion.button 
                                        initial={{ scale: 0.9 }} animate={{ scale: 1 }}
                                        onClick={startExperiment}
                                        className="w-full mt-5 py-3 bg-blue-500 hover:bg-blue-400 text-white rounded-xl font-bold shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
                                    >
                                        <Play size={16}/> Start Experiment
                                    </motion.button>
                                )}
                            </motion.div>
                        )}

                        {step === 'experiment' && (
                            <motion.div 
                                initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                                className="bg-slate-900/80 border border-white/10 p-5 rounded-2xl backdrop-blur-xl flex flex-col gap-4"
                            >
                                <div>
                                    <h3 className="text-white font-bold text-lg mb-1">Experiment Controls</h3>
                                    <p className="text-slate-400 text-xs">Neutralize 50ml HCl with 50ml NaOH</p>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <button 
                                        onClick={() => addFluid('acid')}
                                        disabled={fluids.acid >= 50}
                                        className={`flex flex-col items-center gap-1 p-4 rounded-xl border transition-all ${fluids.acid >= 50 ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400' : 'border-white/10 bg-white/5 text-slate-300 hover:bg-white/10'}`}
                                    >
                                        <Droplets size={24} />
                                        <span className="text-[10px] font-bold uppercase tracking-widest">Add 1M HCl</span>
                                        <span className="text-xs font-mono">{fluids.acid}ml</span>
                                    </button>

                                    <button 
                                        onClick={() => addFluid('base')}
                                        disabled={fluids.base >= 50}
                                        className={`flex flex-col items-center gap-1 p-4 rounded-xl border transition-all ${fluids.base >= 50 ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400' : 'border-white/10 bg-white/5 text-slate-300 hover:bg-white/10'}`}
                                    >
                                        <Droplets size={24} />
                                        <span className="text-[10px] font-bold uppercase tracking-widest">Add 1M NaOH</span>
                                        <span className="text-xs font-mono">{fluids.base}ml</span>
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex justify-between items-end">
                                        <span className="text-slate-500 text-[10px] font-bold uppercase tracking-tighter">Stirring Intensity</span>
                                        <span className="text-emerald-400 text-xs font-bold">{stirCount}%</span>
                                    </div>
                                    <button 
                                        onMouseDown={() => setIsStirring(true)} onMouseUp={() => setIsStirring(false)}
                                        onTouchStart={() => setIsStirring(true)} onTouchEnd={() => setIsStirring(false)}
                                        className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 ${isStirring ? 'bg-emerald-500 text-white shadow-[0_0_20px_#10b98140]' : 'bg-white/10 text-white/50 border border-white/5'}`}
                                    >
                                        <RefreshCw size={16} className={isStirring ? 'animate-spin' : ''} />
                                        {isStirring ? 'Mixing Solution...' : 'Hold to Stir'}
                                    </button>
                                </div>

                                {reactionComplete && (
                                    <button 
                                        onClick={() => {
                                            setStep('results');
                                            if (onLog) onLog({ initialTemp, finalTemp: temperature, deltaT: temperature - initialTemp });
                                        }}
                                        className="w-full py-4 bg-white text-slate-900 rounded-2xl font-bold hover:bg-slate-200 transition-all flex items-center justify-center gap-2 shadow-2xl"
                                    >
                                        <Check size={18} /> View Analysis
                                    </button>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Right Side Info */}
                <div className="absolute top-10 right-10 flex flex-col gap-4 items-end">
                    <div className="bg-black/60 border border-white/10 p-4 rounded-2xl backdrop-blur-md">
                        <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">
                            <Activity size={12}/> Live Thermal Feed
                        </div>
                        <div className="text-4xl font-black text-white font-mono tracking-tighter">
                            {temperature.toFixed(2)}<span className="text-xl text-slate-500 ml-1">°C</span>
                        </div>
                        <div className="mt-2 flex items-center gap-2">
                            <div className="flex-1 h-1 bg-slate-800 rounded-full overflow-hidden">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${((temperature - 20) / 20) * 100}%` }}
                                    className="h-full bg-red-500"
                                />
                            </div>
                        </div>
                    </div>

                    {reactionComplete && (
                        <motion.div 
                            initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                            className="bg-emerald-500/20 border border-emerald-500/50 p-4 rounded-2xl backdrop-blur-md text-right"
                        >
                            <div className="text-emerald-400 text-xs font-bold uppercase">Delta Temperature (ΔT)</div>
                            <div className="text-2xl font-black text-white font-mono">
                                +{(temperature - initialTemp).toFixed(2)}°C
                            </div>
                        </motion.div>
                    )}
                </div>

                {/* Results View */}
                <AnimatePresence>
                    {step === 'results' && (
                        <motion.div 
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="absolute inset-0 z-[100] bg-slate-950/90 backdrop-blur-2xl flex items-center justify-center p-6"
                        >
                            <motion.div 
                                initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
                                className="bg-slate-900 border border-white/10 rounded-[2.5rem] p-10 max-w-2xl w-full text-center shadow-3xl"
                            >
                                <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Check className="text-emerald-400" size={40} />
                                </div>
                                <h2 className="text-4xl font-black text-white mb-2 tracking-tighter">Thermal Analysis Complete</h2>
                                <p className="text-slate-400 mb-10 leading-relaxed">
                                    You have successfully measured the heat evolved during the neutralization of HCl and NaOH.
                                </p>

                                <div className="grid grid-cols-3 gap-6 mb-12">
                                    <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
                                        <div className="text-slate-500 text-[10px] font-bold uppercase mb-2">Initial Temp</div>
                                        <div className="text-2xl font-bold text-white">{initialTemp.toFixed(1)}°C</div>
                                    </div>
                                    <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
                                        <div className="text-slate-500 text-[10px] font-bold uppercase mb-2">Final Temp</div>
                                        <div className="text-2xl font-bold text-white">{temperature.toFixed(1)}°C</div>
                                    </div>
                                    <div className="p-6 bg-emerald-500/10 rounded-3xl border border-emerald-500/20">
                                        <div className="text-emerald-400 text-[10px] font-bold uppercase mb-2">Enthalpy (ΔH)</div>
                                        <div className="text-2xl font-bold text-white">-57.1 kJ</div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <button onClick={reset} className="w-full py-5 bg-white text-slate-900 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-200 transition-all flex items-center justify-center gap-3 active:scale-95">
                                        <RotateCcw size={18} /> Repeat Experiment
                                    </button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            
            {/* Legend/Footer */}
            <div className="p-3 px-6 bg-slate-950 border-t border-white/5 flex items-center gap-8 text-[10px] font-bold text-slate-500 overflow-x-auto whitespace-nowrap">
                <span className="flex items-center gap-2 uppercase tracking-widest"><RefreshCw size={12}/> Procedural Engine v2.0</span>
                <span className="flex items-center gap-2 uppercase tracking-widest text-blue-400/60"><AlertCircle size={12}/> Physical Collision Enabled</span>
                <span className="flex items-center gap-2 uppercase tracking-widest text-emerald-400/60"><Play size={12}/> Real-time Kinetic Simulation</span>
            </div>
        </div>
    );
};

export default ThermochemistrySim;
