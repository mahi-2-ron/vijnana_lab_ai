import React, { useRef, useEffect, useState, useCallback } from 'react';
import { RotateCcw, Play, Pause } from 'lucide-react';
import DraggableSlider from './DraggableSlider';

// Linear Search & Binary Search comparison
interface Props { hex: string; }

type SearchState = { arr: number[]; target: number; linearIdx: number; binaryL: number; binaryR: number; binaryMid: number; linearFound: boolean; binaryFound: boolean; linearSteps: number; binarySteps: number; done: boolean; };

const SearchAlgoLab: React.FC<Props> = ({ hex }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const [arr] = useState<number[]>([3, 7, 12, 15, 19, 23, 27, 31, 34, 38, 42, 46, 51, 55, 60]);
  const [target, setTarget] = useState(34);
  const [state, setState] = useState<SearchState>({
    arr, target, linearIdx: -1, binaryL: 0, binaryR: arr.length - 1, binaryMid: -1,
    linearFound: false, binaryFound: false, linearSteps: 0, binarySteps: 0, done: false,
  });
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  const reset = useCallback(() => {
    setRunning(false);
    clearInterval(intervalRef.current);
    setState({
      arr, target, linearIdx: -1, binaryL: 0, binaryR: arr.length - 1, binaryMid: -1,
      linearFound: false, binaryFound: false, linearSteps: 0, binarySteps: 0, done: false,
    });
  }, [arr, target]);

  useEffect(() => { reset(); }, [target]);

  useEffect(() => {
    if (!running) { clearInterval(intervalRef.current); return; }
    intervalRef.current = setInterval(() => {
      setState(prev => {
        if (prev.done) { setRunning(false); return prev; }
        let next = { ...prev };
        // Linear Search step
        if (!prev.linearFound) {
          const ni = prev.linearIdx + 1;
          next.linearIdx = ni;
          next.linearSteps++;
          if (arr[ni] === target) next.linearFound = true;
        }
        // Binary Search step
        if (!prev.binaryFound && prev.binaryL <= prev.binaryR) {
          const mid = Math.floor((prev.binaryL + prev.binaryR) / 2);
          next.binaryMid = mid;
          next.binarySteps++;
          if (arr[mid] === target) {
            next.binaryFound = true;
          } else if (arr[mid] < target) {
            next.binaryL = mid + 1;
          } else {
            next.binaryR = mid - 1;
          }
        }
        next.done = next.linearFound && (next.binaryFound || next.binaryL > next.binaryR);
        return next;
      });
    }, 600);
    return () => clearInterval(intervalRef.current);
  }, [running, arr, target]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#0f172a'; ctx.fillRect(0, 0, W, H);

    const cellW = (W - 40) / arr.length;
    const cellH = 48;

    // Linear Search row
    const lY = 60;
    ctx.fillStyle = '#60a5fa'; ctx.font = 'bold 10px'; ctx.textAlign = 'left';
    ctx.fillText(`Linear Search (${state.linearSteps} steps)`, 20, lY - 12);
    arr.forEach((v, i) => {
      const cx2 = 20 + i * cellW;
      let color = 'rgba(255,255,255,0.04)';
      let stroke = 'rgba(255,255,255,0.1)';
      if (i < state.linearIdx) { color = 'rgba(239,68,68,0.15)'; stroke = 'rgba(239,68,68,0.4)'; }
      if (i === state.linearIdx && !state.linearFound) { color = 'rgba(251,191,36,0.25)'; stroke = '#fbbf24'; }
      if (state.linearFound && v === target && i === state.linearIdx) { color = 'rgba(34,197,94,0.3)'; stroke = '#22c55e'; }
      ctx.fillStyle = color; ctx.strokeStyle = stroke; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.roundRect(cx2 + 1, lY, cellW - 2, cellH, 4); ctx.fill(); ctx.stroke();
      let textColor = '#94a3b8';
      if (i === state.linearIdx && !state.linearFound) textColor = '#fbbf24';
      else if (state.linearFound && v === target && i === state.linearIdx) textColor = '#4ade80';
      ctx.fillStyle = textColor;
      ctx.font = 'bold 11px monospace'; ctx.textAlign = 'center';
      ctx.fillText(String(v), cx2 + cellW / 2, lY + 29);
      ctx.fillStyle = '#474747'; ctx.font = '8px'; ctx.fillText(String(i), cx2 + cellW / 2, lY + cellH + 10);
    });
    // Pointer
    if (state.linearIdx >= 0 && state.linearIdx < arr.length) {
      const px2 = 20 + state.linearIdx * cellW + cellW / 2;
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath(); ctx.moveTo(px2, lY - 4); ctx.lineTo(px2 - 5, lY - 14); ctx.lineTo(px2 + 5, lY - 14); ctx.closePath(); ctx.fill();
    }

    // Binary Search row
    const bY = 180;
    ctx.fillStyle = '#4ade80'; ctx.font = 'bold 10px'; ctx.textAlign = 'left';
    ctx.fillText(`Binary Search (${state.binarySteps} steps)`, 20, bY - 12);
    arr.forEach((v, i) => {
      const cx2 = 20 + i * cellW;
      let color = 'rgba(255,255,255,0.04)';
      let stroke = 'rgba(255,255,255,0.1)';
      if (i < state.binaryL || i > state.binaryR) { color = 'rgba(239,68,68,0.1)'; stroke = 'rgba(239,68,68,0.2)'; } // eliminated
      if (i >= state.binaryL && i <= state.binaryR && i !== state.binaryMid) { color = 'rgba(34,197,94,0.1)'; stroke = 'rgba(34,197,94,0.3)'; } // active range
      if (i === state.binaryMid && !state.binaryFound) { color = 'rgba(251,191,36,0.3)'; stroke = '#fbbf24'; } // mid
      if (state.binaryFound && v === target && i === state.binaryMid) { color = 'rgba(34,197,94,0.4)'; stroke = '#4ade80'; }
      ctx.fillStyle = color; ctx.strokeStyle = stroke; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.roundRect(cx2 + 1, bY, cellW - 2, cellH, 4); ctx.fill(); ctx.stroke();
      let bTextColor = '#94a3b8';
      if (i === state.binaryMid && !state.binaryFound) bTextColor = '#fbbf24';
      else if (state.binaryFound && v === target && i === state.binaryMid) bTextColor = '#4ade80';
      else if (i < state.binaryL || i > state.binaryR) bTextColor = '#374151';
      ctx.fillStyle = bTextColor;
      ctx.font = 'bold 11px monospace'; ctx.textAlign = 'center';
      ctx.fillText(String(v), cx2 + cellW / 2, bY + 29);
      ctx.fillStyle = '#474747'; ctx.font = '8px'; ctx.fillText(String(i), cx2 + cellW / 2, bY + cellH + 10);
    });
    // L, M, R markers
    const markers: [number, string, string][] = [
      [state.binaryL, 'L', '#60a5fa'], [state.binaryMid, 'M', '#fbbf24'], [state.binaryR, 'R', '#f472b6']
    ];
    markers.forEach(([idx, label, color]) => {
      if (idx >= 0 && idx < arr.length) {
        const px2 = 20 + idx * cellW + cellW / 2;
        ctx.fillStyle = color; ctx.font = 'bold 9px'; ctx.textAlign = 'center';
        ctx.fillText(label, px2, bY - 5);
      }
    });

    // Step counter / result
    const resY = H - 60;
    ctx.fillStyle = 'rgba(15,23,42,0.9)'; ctx.strokeStyle = '#334155'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.roundRect(20, resY, W - 40, 50, 8); ctx.fill(); ctx.stroke();
    ctx.textAlign = 'left';
    if (state.done) {
      const winner = state.binarySteps < state.linearSteps ? 'Binary Search' : 'Linear Search';
      ctx.fillStyle = '#4ade80'; ctx.font = 'bold 11px';
      ctx.fillText(`✅ Target ${target} found! Binary: ${state.binarySteps} steps, Linear: ${state.linearSteps} steps`, 28, resY + 20);
      ctx.fillStyle = '#fbbf24'; ctx.font = 'bold 12px';
      ctx.fillText(`Winner: ${winner} 🏆 — Binary is O(log n), Linear is O(n)`, 28, resY + 40);
    } else {
      ctx.fillStyle = '#94a3b8'; ctx.font = '10px'; ctx.fillText(`Searching for: ${target}`, 28, resY + 20);
      ctx.fillText(`Binary Search range: [${state.binaryL}..${state.binaryR}], mid=${state.binaryMid}`, 28, resY + 38);
    }

    animRef.current = requestAnimationFrame(draw);
  }, [arr, target, state]);

  useEffect(() => {
    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [draw]);

  return (
    <div className="flex flex-col md:flex-row h-full w-full bg-slate-950">
      <div className="flex-1 flex items-center justify-center p-4">
        <canvas ref={canvasRef} width={500} height={340}
          className="rounded-2xl border border-white/10 shadow-2xl w-full max-w-[500px]" />
      </div>

      <div className="w-full md:w-72 bg-slate-900 border-l border-white/5 flex flex-col">
        <div className="p-4 border-b border-white/5">
          <p className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-1">CS Lab — cs3</p>
          <h2 className="text-lg font-bold text-white">Search Algorithms</h2>
          <p className="text-xs text-slate-400 mt-1">Compare Linear Search O(n) vs Binary Search O(log n)</p>
        </div>
        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
          <div className="bg-cyan-500/10 border border-cyan-500/30 p-3 rounded-xl">
            <p className="text-cyan-200 text-xs">Both algorithms search simultaneously. Watch how binary search finds the target much faster on a sorted array!</p>
          </div>

          <DraggableSlider label="Target Value" min={3} max={60} value={target}
            onChange={v => { setTarget(v); reset(); }} color="#06b6d4" />

          <div className="grid grid-cols-2 gap-2">
            {[
              { label: 'Array size', val: arr.length, color: '#94a3b8' },
              { label: 'Target', val: target, color: '#fbbf24' },
              { label: 'Linear steps', val: state.linearSteps, color: '#60a5fa' },
              { label: 'Binary steps', val: state.binarySteps, color: '#4ade80' },
              { label: 'Linear O(n)', val: arr.length, color: '#94a3b8' },
              { label: 'Binary O(log n)', val: Math.ceil(Math.log2(arr.length)), color: '#94a3b8' },
            ].map(m => (
              <div key={m.label} className="bg-slate-950 border border-white/10 rounded-lg p-2 text-center">
                <div className="text-[9px] text-slate-500 uppercase font-bold mb-1">{m.label}</div>
                <div className="font-mono font-bold text-xs" style={{ color: m.color }}>{m.val}</div>
              </div>
            ))}
          </div>

          <div className="bg-slate-950 p-3 rounded-xl border border-white/10 text-xs space-y-1">
            <p className="text-slate-400 font-bold text-[10px] uppercase">Algorithm Info</p>
            <p className="font-mono text-blue-400">Linear: check each elem → O(n)</p>
            <p className="font-mono text-green-400">Binary: halve range each step → O(log n)</p>
            <p className="text-slate-500 text-[9px]">Binary requires sorted array!</p>
          </div>

          <div className="flex gap-2">
            <button onClick={() => { if (!state.done) setRunning(r => !r); }}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 text-white ${running ? 'bg-red-600' : ''}`}
              style={!running ? { backgroundColor: hex } : {}}>
              {running ? <><Pause size={13} /> Pause</> : <><Play size={13} /> Start Search</>}
            </button>
            <button onClick={reset} className="px-3 py-2 rounded-xl text-xs bg-slate-800 text-red-400"><RotateCcw size={11} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchAlgoLab;
