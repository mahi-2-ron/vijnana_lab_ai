import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, Play, StepForward, Search } from 'lucide-react';

interface BinarySearchLabProps {
  hex: string;
}

const STEPS = [
  { title: 'Binary Search Algorithm', instruction: 'Binary Search works exclusively on SORTED arrays. It divides the search space in half each time — achieving O(log n) time complexity.' },
  { title: 'Divide & Conquer', instruction: 'Compare the target with the MIDDLE element. If equal → found! If target < middle → search Left half. If target > middle → search Right half.' },
  { title: 'Exponential Elimination', instruction: 'Each step eliminates half of the remaining elements. Watch how quickly the search bounds (LOW and HIGH) converge!' },
  { title: 'Search Complete', instruction: 'Element located or confirmed missing! Binary Search is incredibly efficient — searching 1 million items takes at most 20 comparisons!' },
];

export default function BinarySearchLab({ hex }: BinarySearchLabProps) {
  const arr = [2, 5, 8, 12, 16, 23, 38, 42, 56, 72, 85, 91];
  const [target, setTarget] = useState(23);

  // Search state
  const [low, setLow] = useState(0);
  const [high, setHigh] = useState(arr.length - 1);
  const [mid, setMid] = useState(-1);
  const [found, setFound] = useState(false);
  
  // Progress state
  const [step, setStep] = useState(0);
  const [comparisons, setComparisons] = useState(0);
  const [history, setHistory] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isAutoSearching, setIsAutoSearching] = useState(false);

  const performStep = () => {
    if (found || low > high) return;
    setIsSearching(true);

    const m = Math.floor((low + high) / 2);
    setMid(m);
    setComparisons(c => c + 1);

    if (arr[m] === target) {
      setFound(true);
      setStep(3);
      setHistory(h => [...h, `arr[${m}] = ${arr[m]} == ${target} → FOUND!`]);
      setIsAutoSearching(false);
    } else if (arr[m] < target) {
      setHistory(h => [...h, `arr[${m}] = ${arr[m]} < ${target} → Search RIGHT`]);
      setLow(m + 1);
      if (step < 2) setStep(2);
    } else {
      setHistory(h => [...h, `arr[${m}] = ${arr[m]} > ${target} → Search LEFT`]);
      setHigh(m - 1);
      if (step < 2) setStep(2);
    }
    if (step < 1) setStep(1);
  };

  const handleAutoSearch = () => {
    reset();
    setIsAutoSearching(true);
  };

  // Auto-search effect loop
  useEffect(() => {
    if (!isAutoSearching) return;
    if (found || low > high) {
      setIsAutoSearching(false);
      return;
    }
    const timer = setTimeout(() => {
      performStep();
    }, 1200); // 1.2s delay for visual comprehension
    return () => clearTimeout(timer);
  }, [isAutoSearching, low, high, found, target]); // depend on search state

  const reset = () => {
    setLow(0);
    setHigh(arr.length - 1);
    setMid(-1);
    setFound(false);
    setStep(0);
    setComparisons(0);
    setHistory([]);
    setIsSearching(false);
    setIsAutoSearching(false);
  };

  // Prevent auto-search from continuing if target changes manually
  const changeTarget = (t: number) => {
    setTarget(t);
    reset();
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#030712] overflow-hidden font-sans text-slate-200 select-none">
      
      {/* HEADER: Glassmorphic premium */}
      <div className="flex shrink-0 items-center justify-between px-6 py-4 border-b border-white/[0.05] bg-white/[0.01] backdrop-blur-2xl z-20 shadow-lg">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-3">
            <span className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400"><Search size={18} /></span>
            Binary Search Algorithm
          </h2>
          <p className="text-[11px] font-medium text-slate-500 uppercase tracking-widest mt-1">O(log n) Divide & Conquer</p>
        </div>

        {/* Status indicator */}
        <div className="flex items-center gap-6 px-5 py-2.5 rounded-2xl bg-white/5 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-2xl">
          <div className="flex flex-col items-center">
            <span className="text-[10px] uppercase font-semibold text-slate-400">Target</span>
            <span className="font-mono text-sm font-semibold text-white">{target}</span>
          </div>
          <div className="w-px h-6 bg-white/10"></div>
          <div className="flex flex-col items-center">
            <span className="text-[10px] uppercase font-semibold text-slate-400">Comparisons</span>
            <span className="font-mono text-sm font-semibold text-amber-400">{comparisons}</span>
          </div>
          <div className="w-px h-6 bg-white/10"></div>
          <div className="flex flex-col items-center">
            <span className="text-[10px] uppercase font-semibold text-slate-400">Status</span>
            <span className={`font-mono text-sm font-semibold ${found ? 'text-green-400' : low > high ? 'text-red-400' : 'text-blue-400'}`}>
              {found ? 'FOUND' : low > high ? 'NOT FOUND' : 'SEARCHING'}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        
        {/* MAIN VISUALIZATION AREA */}
        <div className="flex-1 flex flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,#0e1526,#00030a_80%)] relative p-8">
          
          {/* Subtle grid background */}
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '40px 40px', backgroundPosition: 'center center' }} />

          {/* Core Array Container */}
          <div className="relative w-full max-w-5xl h-64 border border-white/10 flex items-center justify-center px-4 rounded-[40px] shadow-[inset_0_0_50px_rgba(0,0,0,0.8)] bg-black/40 backdrop-blur-md z-10">
            
            <div className="flex gap-2 relative z-20">
              <AnimatePresence>
                {arr.map((val, idx) => {
                  const outOfBounds = isSearching && (idx < low || idx > high);
                  const isMid = isSearching && idx === mid;
                  const isFoundNode = found && isMid && arr[mid] === target;
                  
                  // High end Apple-level dynamic styling based on search state
                  let bgLayer = 'bg-white/5';
                  let borderLayer = 'border-white/10';
                  let shadowLayer = 'shadow-lg';
                  let textLayer = 'text-slate-300';
                  let scaleValue = 1;
                  let blurValue = 'blur(0px)';
                  let opacityValue = 1;

                  if (outOfBounds) {
                    bgLayer = 'bg-black/80';
                    borderLayer = 'border-white/5';
                    shadowLayer = 'shadow-none';
                    textLayer = 'text-slate-700';
                    scaleValue = 0.9;
                    opacityValue = 0.4;
                  } else if (isFoundNode) {
                    bgLayer = 'bg-green-500/20';
                    borderLayer = 'border-green-400';
                    shadowLayer = 'shadow-[0_0_30px_rgba(74,222,128,0.5)]';
                    textLayer = 'text-green-300 font-extrabold';
                    scaleValue = 1.15;
                  } else if (isMid) {
                    bgLayer = 'bg-amber-500/20';
                    borderLayer = 'border-amber-400';
                    shadowLayer = 'shadow-[0_0_20px_rgba(251,191,36,0.3)]';
                    textLayer = 'text-amber-300 font-bold';
                    scaleValue = 1.1;
                  } else if (isSearching) {
                    bgLayer = 'bg-blue-500/10';
                    borderLayer = 'border-blue-500/50';
                    shadowLayer = 'shadow-[0_0_15px_rgba(59,130,246,0.1)]';
                    textLayer = 'text-blue-200';
                  }

                  return (
                    <motion.div
                      key={idx}
                      layout
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ 
                        opacity: opacityValue, 
                        scale: scaleValue,
                        filter: blurValue
                      }}
                      transition={{ 
                        type: 'spring', 
                        damping: 25, 
                        stiffness: 200, 
                        mass: 0.8 
                      }}
                      className="flex flex-col items-center gap-3 relative"
                    >
                      {/* Top Pointers (L, M, H) */}
                      <div className="h-6 flex items-end justify-center w-full">
                        <AnimatePresence>
                          {isSearching && idx === low && !found && (
                            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex flex-col items-center absolute -top-10">
                              <span className="text-[9px] font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/30">LOW</span>
                              <div className="w-0 h-0 border-l-[4px] border-l-transparent border-t-[6px] border-t-blue-400 border-r-[4px] border-r-transparent mt-1" />
                            </motion.div>
                          )}
                          {isSearching && idx === high && !found && (
                            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex flex-col items-center absolute -top-10">
                              <span className="text-[9px] font-bold text-red-400 bg-red-500/10 px-2 py-0.5 rounded-full border border-red-500/30">HIGH</span>
                              <div className="w-0 h-0 border-l-[4px] border-l-transparent border-t-[6px] border-t-red-400 border-r-[4px] border-r-transparent mt-1" />
                            </motion.div>
                          )}
                          {isSearching && idx === mid && !found && (
                            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex flex-col items-center absolute -top-12 z-30">
                              <span className="text-[10px] font-black text-amber-300 bg-amber-500/20 px-2.5 py-1 rounded-full border border-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.5)] backdrop-blur-sm">MID</span>
                              <div className="w-0 h-0 border-l-[5px] border-l-transparent border-t-[8px] border-t-amber-400 border-r-[5px] border-r-transparent mt-1" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Array Element Box */}
                      <div className={`relative w-12 h-16 rounded-xl ${bgLayer} border ${borderLayer} ${shadowLayer} flex flex-col items-center justify-center shrink-0 transform-style-3d transition-colors duration-300`}>
                        {/* Glossy overlay */}
                        <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent rounded-xl pointer-events-none" />
                        <span className={`text-lg transition-colors duration-300 z-10 ${textLayer}`}>{val}</span>
                      </div>
                      
                      {/* Index badge below */}
                      <span className="text-[9px] font-mono text-slate-500">[{idx}]</span>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
            
          </div>

          {/* Quick Target Selectors */}
          <div className="mt-8 flex gap-3 flex-wrap justify-center max-w-2xl bg-white/[0.02] p-3 rounded-2xl border border-white/5 backdrop-blur-md">
            <span className="text-[10px] font-bold uppercase text-slate-500 flex items-center mr-2">Set Target:</span>
            {[5, 23, 42, 72, 85, 99].map(t => (
              <button 
                key={t} 
                onClick={() => changeTarget(t)}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all border ${t === target ? 'bg-blue-500/20 border-blue-500/50 text-blue-300 shadow-[0_0_10px_rgba(59,130,246,0.3)]' : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10 hover:text-white'}`}
              >
                Find {t}
              </button>
            ))}
          </div>

        </div>

        {/* RIGHT CONTROL PANEL - Apple Glass Style */}
        <div className="w-[340px] shrink-0 bg-white/[0.01] backdrop-blur-3xl border-l border-white/5 flex flex-col z-20 shadow-[-10px_0_30px_rgba(0,0,0,0.5)]">
          <div className="p-6 flex-1 overflow-y-auto space-y-6">
            
            {/* Playback Controls */}
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={performStep} 
                disabled={found || low > high || isAutoSearching} 
                className="col-span-2 group relative py-4 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold transition-all active:scale-95 disabled:opacity-30 disabled:active:scale-100 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(59,130,246,0.3)]"
              >
                <div className="bg-white/20 p-1.5 rounded-full"><StepForward size={16} fill="white" /></div>
                Next Step
              </button>

              <button 
                onClick={handleAutoSearch} 
                disabled={isAutoSearching || found || low > high}
                className="group relative py-3 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-bold transition-all active:scale-95 disabled:opacity-30 flex items-center justify-center gap-2 border border-white/5"
              >
                <Play size={14} fill="currentColor" />
                Auto Play
              </button>

              <button 
                onClick={reset} 
                className="group relative py-3 rounded-2xl bg-white/5 hover:bg-red-500/20 text-slate-300 hover:text-red-400 font-bold transition-all active:scale-95 flex items-center justify-center gap-2 border border-white/5 hover:border-red-500/30"
              >
                <RotateCcw size={14} />
                Reset
              </button>
            </div>

            {/* Instruction Card */}
            <div className="bg-[#0b1120] rounded-2xl p-5 border border-white/5 shadow-inner relative overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
              <h3 className="text-sm font-bold text-white mb-2">{STEPS[Math.min(step, STEPS.length - 1)].title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{STEPS[Math.min(step, STEPS.length - 1)].instruction}</p>
              
              <div className="flex gap-1.5 mt-4">
                {STEPS.map((_, idx) => (
                  <div key={idx} className={`h-1 rounded-full flex-1 transition-colors duration-500 ${idx <= step ? 'bg-blue-500' : 'bg-white/10'}`} />
                ))}
              </div>
            </div>

            {/* Event History Log */}
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-3 flex items-center gap-2">Execution Trace <span className="bg-white/10 text-white px-1.5 py-0.5 rounded">{history.length}</span></h3>
              <div className="bg-[#0b1120] rounded-2xl border border-white/5 overflow-hidden">
                <div className="max-h-56 overflow-y-auto p-2 space-y-1">
                  {history.length === 0 && (
                    <div className="p-4 text-center text-[10px] text-slate-600 italic">Click "Next Step" to begin search.</div>
                  )}
                  <AnimatePresence>
                    {history.map((h, i) => (
                      <motion.div 
                        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                        key={i} 
                        className={`p-2.5 rounded-xl text-[10px] font-mono border backdrop-blur-sm
                          ${h.includes('FOUND') ? 'bg-green-500/10 border-green-500/20 text-green-300' : 'bg-white/5 border-white/5 text-slate-300'}`}
                      >
                        <span className="opacity-50 mr-2">[{i+1}]</span> {h}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Victory Card */}
            <AnimatePresence>
              {found && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
                  className="bg-gradient-to-br from-green-500/20(0) to-emerald-600/20 p-5 rounded-2xl border border-green-500/30 text-center shadow-[0_10px_30px_rgba(16,185,129,0.2)]"
                >
                  <div className="w-12 h-12 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center mx-auto mb-3 text-2xl">✓</div>
                  <h3 className="text-white font-bold mb-1">Target Found!</h3>
                  <p className="text-[11px] text-slate-300">Located element {target} in just <strong className="text-white">{comparisons}</strong> comparisons.</p>
                </motion.div>
              )}
              {low > high && !found && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
                  className="bg-red-500/10 p-5 rounded-2xl border border-red-500/30 text-center"
                >
                  <h3 className="text-red-400 font-bold mb-1">Target Not Found</h3>
                  <p className="text-[11px] text-slate-400">Element {target} does not exist in this array.</p>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>

      </div>
    </div>
  );
}
