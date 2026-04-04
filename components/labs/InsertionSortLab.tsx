import React, { useRef, useEffect, useState, useCallback } from 'react';
import { RotateCcw } from 'lucide-react';

interface InsertionSortLabProps { hex: string; }

const STEPS = [
  { title: 'Insertion Sort', instruction: 'Insertion Sort builds a sorted array one element at a time. Like sorting playing cards — pick one card, insert it in the right position in your hand.', action: 'Understand 📚' },
  { title: 'Pick Key Element', instruction: 'Pick the element at the current position (key). This element will be placed in its correct position in the already-sorted left portion.', action: 'Pick Key 🃏' },
  { title: 'Shift Right', instruction: 'Compare key with elements to its left. If they are larger, shift them one position to the right to make room.', action: 'Shift Elements ⬅️' },
  { title: 'Insert in Position', instruction: 'Drop the key into its correct position. The left portion grows by one sorted element!', action: 'Insert! ✅' },
  { title: 'Array Sorted', instruction: 'After N-1 passes, all elements are inserted in place. Insertion Sort runs in O(n²) worst case but is fast for small/nearly sorted arrays!', action: 'Complete 🎉' },
];

const COLORS = { default: '#3b82f6', key: '#f59e0b', sorted: '#10b981', shifting: '#ef4444', inserted: '#22c55e' };

const InsertionSortLab: React.FC<InsertionSortLabProps> = ({ hex }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const [step, setStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [arr, setArr] = useState([5, 2, 9, 1, 7, 3, 8]);
  const [i, setI] = useState(1); // current key index
  const [j, setJ] = useState(1); // shifting pointer
  const [key, setKey] = useState(2); // current key value
  const [phase, setPhase] = useState<'pick'|'shift'|'insert'>('pick');
  const [comparisons, setComparisons] = useState(0);
  const [sortedTo, setSortedTo] = useState(0); // all indices < sortedTo are sorted

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const w = canvas.width, h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, w, h);

    const barW = Math.floor((w - 40) / arr.length) - 5;
    const maxVal = Math.max(...arr, key);
    const maxH = 200;
    const baseY = h - 50;
    const gap = barW + 5;

    arr.forEach((val, idx) => {
      const bx = 20 + idx * gap;
      const barH = (val / maxVal) * maxH;
      const by = baseY - barH;

      let color = COLORS.default;
      if (idx < j && idx < i) color = COLORS.sorted;
      else if (idx === j) color = phase === 'pick' ? COLORS.key : phase === 'insert' ? COLORS.inserted : COLORS.shifting;
      else if (idx >= i && idx < i + 1) color = COLORS.key;

      // Shadow
      ctx.fillStyle = 'rgba(0,0,0,0.2)';
      ctx.beginPath();
      ctx.roundRect(bx + 2, by + 2, barW, barH, [4, 4, 0, 0]);
      ctx.fill();

      // Bar
      const g = ctx.createLinearGradient(bx, by, bx, baseY);
      g.addColorStop(0, color);
      g.addColorStop(1, color + '88');
      ctx.beginPath();
      ctx.roundRect(bx, by, barW, barH, [4, 4, 0, 0]);
      ctx.fillStyle = g;
      ctx.fill();

      if (idx === i && phase === 'pick') {
        ctx.shadowColor = COLORS.key;
        ctx.shadowBlur = 15;
        ctx.beginPath();
        ctx.roundRect(bx, by, barW, barH, [4, 4, 0, 0]);
        ctx.strokeStyle = COLORS.key;
        ctx.lineWidth = 2.5;
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      ctx.fillStyle = 'white';
      ctx.font = 'bold 11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(String(val), bx + barW / 2, by - 6);
      ctx.fillStyle = '#475569';
      ctx.font = '9px sans-serif';
      ctx.fillText(`[${idx}]`, bx + barW / 2, baseY + 14);
    });

    // Key label floating
    if (phase !== 'insert') {
      const kx = 20 + i * gap + barW / 2;
      ctx.fillStyle = '#f59e0b';
      ctx.font = 'bold 11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`key=${key}`, kx, baseY - (key / maxVal) * maxH - 20);
    }

    // Stats
    ctx.fillStyle = '#94a3b8';
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`Pass: ${i}/${arr.length - 1}   Comparisons: ${comparisons}   Key: ${key}`, 12, 18);

    animRef.current = requestAnimationFrame(animate);
  }, [arr, i, j, key, phase, comparisons, sortedTo]);

  useEffect(() => {
    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [animate]);

  const doStep = () => {
    if (completed) return;
    const a = [...arr];
    if (phase === 'pick') {
      setKey(a[i]);
      setJ(i);
      setPhase('shift');
      if (step < 1) setStep(1);
    } else if (phase === 'shift') {
      setComparisons(c => c + 1);
      if (j > 0 && a[j - 1] > key) {
        a[j] = a[j - 1];
        setArr(a);
        setJ(prev => prev - 1);
        if (step < 2) setStep(2);
      } else {
        setPhase('insert');
        if (step < 3) setStep(3);
      }
    } else if (phase === 'insert') {
      a[j] = key;
      setArr(a);
      setSortedTo(i + 1);
      const nextI = i + 1;
      if (nextI >= arr.length) {
        setCompleted(true);
        setStep(4);
      } else {
        setI(nextI);
        setKey(a[nextI]);
        setJ(nextI);
        setPhase('pick');
      }
    }
  };

  const reset = () => { setArr([5, 2, 9, 1, 7, 3, 8]); setI(1); setJ(1); setKey(2); setPhase('pick'); setComparisons(0); setSortedTo(0); setCompleted(false); setStep(0); };
  const shuffle = () => { const a = [...Array(7)].map(() => Math.floor(Math.random() * 95) + 5); setArr(a); setI(1); setJ(1); setKey(a[1]); setPhase('pick'); setComparisons(0); setSortedTo(0); setCompleted(false); setStep(0); };

  return (
    <div className="flex flex-col md:flex-row h-full w-full bg-slate-950">
      <div className="flex-1 flex items-center justify-center p-4 flex-col gap-4">
        <canvas ref={canvasRef} width={400} height={290} className="rounded-2xl border border-white/10 shadow-2xl w-full max-w-[450px]" />
        <div className="flex gap-3 flex-wrap justify-center">
          <button onClick={doStep} disabled={completed} className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold disabled:opacity-30 transition-all active:scale-95">
            ⏭ {phase === 'pick' ? 'Pick Key' : phase === 'shift' ? 'Shift' : 'Insert'} →
          </button>
          <button onClick={shuffle} className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold transition-all">🔀 Shuffle</button>
          <button onClick={reset} className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold transition-all"><RotateCcw size={14} /></button>
        </div>
        <div className="flex gap-5">
          {[{ label: 'Sorted', color: COLORS.sorted }, { label: 'Key', color: COLORS.key }, { label: 'Shifting', color: COLORS.shifting }].map(l => (
            <div key={l.label} className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: l.color }} />
              <span className="text-xs text-gray-400">{l.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full md:w-72 bg-slate-900 border-l border-white/5 flex flex-col">
        <div className="p-5 border-b border-white/5">
          <p className="text-xs font-bold uppercase tracking-widest text-violet-400 mb-1">Insertion Sort — CS Lab</p>
          <h2 className="text-xl font-bold text-white">{STEPS[Math.min(step, STEPS.length-1)].title}</h2>
        </div>
        <div className="flex-1 p-5 space-y-4 overflow-y-auto">
          <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-xl">
            <p className="text-violet-200 text-sm">{STEPS[Math.min(step, STEPS.length-1)].instruction}</p>
          </div>
          <div className="bg-white/5 p-3 rounded-xl text-sm space-y-1 font-mono">
            <p className="text-gray-400">Phase: <span className="text-yellow-300 font-bold">{phase.toUpperCase()}</span></p>
            <p className="text-gray-400">Key: <span className="text-white font-bold">{key}</span></p>
            <p className="text-gray-400">Index i={i}, j={j}</p>
            <p className="text-gray-400">Comparisons: <span className="text-blue-300">{comparisons}</span></p>
          </div>
          {completed && (
            <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-xl text-center">
              <p className="text-green-400 font-bold">✅ Array Sorted!</p>
              <p className="text-white text-sm mt-1">[{arr.join(', ')}]</p>
              <p className="text-gray-400 text-xs mt-1">{comparisons} comparisons total</p>
            </div>
          )}
          <div className="flex gap-1">
            {STEPS.map((_, idx) => <div key={idx} className="flex-1 h-1.5 rounded-full" style={{ backgroundColor: idx <= step ? '#8b5cf6' : 'rgba(255,255,255,0.1)' }} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsertionSortLab;
