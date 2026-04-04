import React, { useRef, useEffect, useState, useCallback } from 'react';
import { RotateCcw, CheckCircle } from 'lucide-react';
import DraggableSlider from './DraggableSlider';

interface BubbleSortLabProps { hex: string; }

const STEPS = [
  { title: 'Understand Bubble Sort', instruction: 'Bubble Sort repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. Largest element "bubbles" to the end each pass.', action: 'Start Learning 📚' },
  { title: 'Load Array', instruction: 'The array [64, 34, 25, 12, 22, 11, 90] is loaded. Each bar represents an element — taller = larger value. Sort this array using Bubble Sort!', action: 'Load Array 📊' },
  { title: 'First Comparison', instruction: 'Compare element at index 0 and 1. Is 64 > 34? YES! SWAP them. The larger element moves right.', action: 'Compare & Swap 🔄' },
  { title: 'Keep Comparing', instruction: 'Continue comparing each adjacent pair. After one full pass, the LARGEST element is at the end. Press "Step" to see each comparison!', action: 'Next Comparison ▶️' },
  { title: 'Array Sorted!', instruction: 'After multiple passes, the array is fully sorted. The number of passes needed = N−1. Bubble Sort is O(n²) — not efficient for large data!', action: 'Complete Sort ✅' },
];

const COLORS = { default: '#3b82f6', comparing: '#f59e0b', sorted: '#10b981', swapping: '#ef4444' };

const BubbleSortLab: React.FC<BubbleSortLabProps> = ({ hex }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const timeRef = useRef(0);
  const [step, setStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [arr, setArr] = useState([64, 34, 25, 12, 22, 11, 90]);
  const [i, setI] = useState(0);
  const [j, setJ] = useState(0);
  const [sortedUpto, setSortedUpto] = useState(arr.length); // sorted from this index
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);
  const [swapAnim, setSwapAnim] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [autoRunning, setAutoRunning] = useState(false);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    timeRef.current += 0.04;
    const t = timeRef.current;
    const w = canvas.width, hh = canvas.height;
    ctx.clearRect(0, 0, w, hh);
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, w, hh);

    // Grid
    for (let gx = 0; gx < w; gx += 40) {
      ctx.beginPath();
      ctx.moveTo(gx, 0);
      ctx.lineTo(gx, hh);
      ctx.strokeStyle = 'rgba(255,255,255,0.03)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    const barW = Math.floor((w - 60) / arr.length) - 4;
    const maxH = 200;
    const maxVal = Math.max(...arr);
    const baseY = hh - 60;
    const startX = 30;
    const gapX = barW + 4;

    arr.forEach((val, idx) => {
      const barH = (val / maxVal) * maxH;
      const bx = startX + idx * (barW + 4);
      const by = baseY - barH;

      // Color logic
      let color = COLORS.default;
      if (idx >= sortedUpto) color = COLORS.sorted;
      else if (idx === j || idx === j + 1) color = swapAnim ? COLORS.swapping : COLORS.comparing;

      // Bar shadow
      ctx.fillStyle = 'rgba(0,0,0,0.2)';
      ctx.beginPath();
      ctx.roundRect(bx + 2, by + 2, barW, barH, [4, 4, 0, 0]);
      ctx.fill();

      // Bar
      const barGrad = ctx.createLinearGradient(bx, by, bx, baseY);
      barGrad.addColorStop(0, color);
      barGrad.addColorStop(1, color + '88');
      ctx.beginPath();
      ctx.roundRect(bx, by, barW, barH, [4, 4, 0, 0]);
      ctx.fillStyle = barGrad;
      ctx.fill();

      // Glow for comparing
      if ((idx === j || idx === j + 1) && step >= 2) {
        ctx.shadowColor = color;
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.roundRect(bx, by, barW, barH, [4, 4, 0, 0]);
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // Value label
      ctx.fillStyle = 'white';
      ctx.font = 'bold 11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(String(val), bx + barW / 2, by - 6);

      // Index
      ctx.fillStyle = '#475569';
      ctx.font = '9px sans-serif';
      ctx.fillText(`[${idx}]`, bx + barW / 2, baseY + 14);
    });

    // Comparison arrow
    if (step >= 2 && j < sortedUpto - 1) {
      const ax = startX + j * (barW + 4) + barW / 2;
      const ax2 = startX + (j + 1) * (barW + 4) + barW / 2;
      ctx.beginPath();
      ctx.moveTo(ax, baseY + 26);
      ctx.lineTo(ax2, baseY + 26);
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = '#f59e0b';
      ctx.font = 'bold 9px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('compare', (ax + ax2) / 2, baseY + 40);
    }

    // Stats
    ctx.fillStyle = '#94a3b8';
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`📊 Comparisons: ${comparisons}   🔄 Swaps: ${swaps}   Pass: ${i}`, 15, 20);

    animRef.current = requestAnimationFrame(animate);
  }, [arr, j, sortedUpto, swapAnim, comparisons, swaps, step, i]);

  useEffect(() => {
    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [animate]);

  const doStep = () => {
    setArr(prev => {
      const a = [...prev];
      const n = a.length;
      let newJ = j, newI = i, newSorted = sortedUpto;
      setComparisons(c => c + 1);

      if (a[newJ] > a[newJ + 1]) {
        [a[newJ], a[newJ + 1]] = [a[newJ + 1], a[newJ]];
        setSwaps(s => s + 1);
        setSwapAnim(true);
        setTimeout(() => setSwapAnim(false), 300);
      }

      newJ++;
      if (newJ >= newSorted - 1) {
        newJ = 0;
        newSorted--;
        newI++;
        setSortedUpto(newSorted);
        setI(newI);
        if (newSorted <= 0) {
          setSortedUpto(0);
          setCompleted(true);
          if (step < STEPS.length - 1) setStep(4);
        }
      }
      setJ(newJ);
      return a;
    });
    if (step < 3) setStep(Math.min(step + 1, 3));
  };

  useEffect(() => {
    if (!autoRunning) return;
    const iv = setInterval(doStep, 600 / speed);
    if (completed) setAutoRunning(false);
    return () => clearInterval(iv);
  }, [autoRunning, speed, j, sortedUpto, i, arr, completed]);

  const reset = () => { setArr([64, 34, 25, 12, 22, 11, 90]); setI(0); setJ(0); setSortedUpto(7); setComparisons(0); setSwaps(0); setCompleted(false); setStep(0); setAutoRunning(false); timeRef.current = 0; };
  const shuffle = () => { setArr([...Array(7)].map(() => Math.floor(Math.random() * 95) + 5)); setI(0); setJ(0); setSortedUpto(7); setComparisons(0); setSwaps(0); setCompleted(false); setStep(0); };

  return (
    <div className="flex flex-col md:flex-row h-full w-full bg-slate-950">
      <div className="flex-1 flex items-center justify-center p-4 flex-col">
        <canvas ref={canvasRef} width={400} height={300} className="rounded-2xl border border-white/10 shadow-2xl w-full max-w-[450px]" />
        <div className="flex gap-3 mt-4 flex-wrap justify-center">
          <button onClick={doStep} disabled={completed} className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm disabled:opacity-30 transition-all">⏭ Step</button>
          <button onClick={() => setAutoRunning(!autoRunning)} disabled={completed} className={`px-4 py-2 rounded-xl font-bold text-sm transition-all ${autoRunning ? 'bg-red-600 hover:bg-red-500' : 'bg-green-600 hover:bg-green-500'} text-white disabled:opacity-30`}>
            {autoRunning ? '⏸ Pause' : '▶️ Auto'}
          </button>
          <button onClick={shuffle} className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm transition-all">🔀 Shuffle</button>
          <button onClick={reset} className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm transition-all"><RotateCcw size={14} /></button>
        </div>
        <div className="mt-3 w-full max-w-[240px]">
          <DraggableSlider label="Speed" min={1} max={5} value={speed} onChange={setSpeed} color="#3b82f6" unit="x" />
        </div>
      </div>
      <div className="w-full md:w-72 bg-slate-900 border-l border-white/5 flex flex-col">
        <div className="p-5 border-b border-white/5">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-1">Bubble Sort — CS Lab</p>
          <h2 className="text-xl font-bold text-white">{STEPS[Math.min(step, STEPS.length-1)].title}</h2>
        </div>
        <div className="flex-1 p-5 space-y-4 overflow-y-auto">
          {completed ? (
            <div className="text-center py-4">
              <CheckCircle size={36} className="mx-auto mb-3 text-green-400" />
              <h3 className="text-lg font-bold text-white mb-2">Array Sorted! 🎉</h3>
              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-xl text-sm space-y-2">
                <p className="text-white">Sorted: [{arr.join(', ')}]</p>
                <p className="text-gray-400">Comparisons: <b className="text-yellow-400">{comparisons}</b></p>
                <p className="text-gray-400">Swaps: <b className="text-red-400">{swaps}</b></p>
                <p className="text-gray-400 text-xs">Time Complexity: O(n²)</p>
              </div>
              <button onClick={reset} className="mt-3 flex items-center gap-2 mx-auto px-4 py-2 rounded-full bg-white/10 text-white hover:bg-white/20 text-sm"><RotateCcw size={14} /> Reset</button>
            </div>
          ) : (
            <>
              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-xl">
                <p className="text-blue-200 text-sm">{STEPS[Math.min(step, STEPS.length-1)].instruction}</p>
              </div>
              <div className="flex gap-4">
                {[{ label: 'Comparing', color: COLORS.comparing }, { label: 'Swapping', color: COLORS.swapping }, { label: 'Sorted', color: COLORS.sorted }].map(l => (
                  <div key={l.label} className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded" style={{ backgroundColor: l.color }} />
                    <span className="text-xs text-gray-400">{l.label}</span>
                  </div>
                ))}
              </div>
              <div className="bg-white/5 p-3 rounded-xl text-sm space-y-1">
                <p className="text-gray-400">Current pass: <b className="text-white">{i + 1}</b></p>
                <p className="text-gray-400">Comparing index: <b className="text-yellow-300">[{j}] vs [{j+1}]</b></p>
                <p className="text-gray-400">Unsorted elements: <b className="text-white">{sortedUpto}</b></p>
              </div>
            </>
          )}
          <div className="flex gap-1">
            {STEPS.map((_, idx) => <div key={idx} className="flex-1 h-1.5 rounded-full" style={{ backgroundColor: idx <= step ? '#3b82f6' : 'rgba(255,255,255,0.1)' }} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BubbleSortLab;
