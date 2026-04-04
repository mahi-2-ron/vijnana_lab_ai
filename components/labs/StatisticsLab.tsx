import React, { useRef, useEffect, useState, useCallback } from 'react';
import { RotateCcw } from 'lucide-react';
import DraggableSlider from './DraggableSlider';

interface Props { hex: string; }

const StatisticsLab: React.FC<Props> = ({ hex }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const [rawData, setRawData] = useState([12, 15, 18, 22, 25, 17, 14, 20, 16, 19, 23, 13, 21, 16, 18]);
  const [newVal, setNewVal] = useState(18);
  const [chartType, setChartType] = useState<'hist' | 'bar'>('hist');

  const sorted = [...rawData].sort((a, b) => a - b);
  const n = rawData.length;
  const mean = rawData.reduce((a, b) => a + b, 0) / n;
  const median = n % 2 === 0 ? (sorted[n / 2 - 1] + sorted[n / 2]) / 2 : sorted[Math.floor(n / 2)];
  const modeMap: Record<number, number> = {};
  rawData.forEach(v => modeMap[v] = (modeMap[v] || 0) + 1);
  const maxFreq = Math.max(...Object.values(modeMap));
  const mode = Object.keys(modeMap).filter(k => modeMap[Number(k)] === maxFreq).map(Number);
  const variance = rawData.reduce((s, v) => s + (v - mean) ** 2, 0) / n;
  const sd = Math.sqrt(variance);
  const range = sorted[sorted.length - 1] - sorted[0];

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#0f172a'; ctx.fillRect(0, 0, W, H);

    const padL = 45, padR = 15, padT = 30, padB = 45;
    const gW = W - padL - padR, gH = H - padT - padB;

    // Axes
    ctx.strokeStyle = 'rgba(148,163,184,0.5)'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(padL, padT); ctx.lineTo(padL, padT + gH); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(padL, padT + gH); ctx.lineTo(padL + gW, padT + gH); ctx.stroke();

    if (chartType === 'hist') {
      // Histogram (frequency distribution)
      const bins = 6;
      const minV = Math.min(...rawData), maxV = Math.max(...rawData);
      const binSize = (maxV - minV) / bins || 1;
      const binCounts = Array(bins).fill(0);
      rawData.forEach(v => {
        const bi = Math.min(Math.floor((v - minV) / binSize), bins - 1);
        binCounts[bi]++;
      });
      const maxCount = Math.max(...binCounts);

      binCounts.forEach((count, bi) => {
        const bx = padL + bi * (gW / bins);
        const bh = count > 0 ? (count / maxCount) * gH : 0;
        const by = padT + gH - bh;
        const grd = ctx.createLinearGradient(bx, by, bx, by + bh);
        grd.addColorStop(0, '#3b82f6');
        grd.addColorStop(1, '#1d4ed8');
        ctx.fillStyle = grd;
        ctx.fillRect(bx + 2, by, gW / bins - 4, bh);
        ctx.strokeStyle = 'rgba(147,197,253,0.3)'; ctx.lineWidth = 1; ctx.strokeRect(bx + 2, by, gW / bins - 4, bh);
        ctx.fillStyle = '#94a3b8'; ctx.font = '8px monospace'; ctx.textAlign = 'center';
        const label = `${(minV + bi * binSize).toFixed(0)}-${(minV + (bi + 1) * binSize).toFixed(0)}`;
        ctx.fillText(label, bx + gW / bins / 2, padT + gH + 14);
        if (count > 0) {
          ctx.fillStyle = 'white'; ctx.font = 'bold 9px'; ctx.fillText(String(count), bx + gW / bins / 2, by - 4);
        }
      });
      // Normal distribution overlay
      const normalY = (x: number) => {
        const z = (x - mean) / sd;
        const prob = Math.exp(-0.5 * z * z) / (sd * Math.sqrt(2 * Math.PI));
        return prob * n * binSize;
      };
      ctx.beginPath();
      for (let px2 = 0; px2 <= gW; px2++) {
        const x = minV + (px2 / gW) * (maxV - minV);
        const ny = normalY(x);
        const screenY = padT + gH - (ny / maxCount) * gH;
        px2 === 0 ? ctx.moveTo(padL + px2, screenY) : ctx.lineTo(padL + px2, screenY);
      }
      ctx.strokeStyle = '#10b981'; ctx.lineWidth = 2; ctx.stroke();
    } else {
      // Bar chart of raw data sorted
      const barW = gW / sorted.length;
      const maxV = Math.max(...sorted);
      sorted.forEach((v, i) => {
        const bh = (v / maxV) * gH;
        const bx = padL + i * barW;
        const by = padT + gH - bh;
        const isAboveMean = v >= mean;
        ctx.fillStyle = isAboveMean ? 'rgba(16,185,129,0.6)' : 'rgba(251,146,60,0.6)';
        ctx.fillRect(bx + 1, by, barW - 2, bh);
        ctx.strokeStyle = isAboveMean ? '#10b981' : '#f97316'; ctx.lineWidth = 1;
        ctx.strokeRect(bx + 1, by, barW - 2, bh);
        ctx.fillStyle = '#64748b'; ctx.font = '6px'; ctx.textAlign = 'center';
        ctx.fillText(String(v), bx + barW / 2, padT + gH + 10);
      });
    }

    // Mean line
    ctx.setLineDash([5, 4]);
    const meanX = chartType === 'bar'
      ? padL + ((mean - Math.min(...sorted)) / (Math.max(...sorted) - Math.min(...sorted))) * gW
      : padL + ((mean - Math.min(...rawData)) / (Math.max(...rawData) - Math.min(...rawData))) * gW;
    ctx.strokeStyle = '#f59e0b'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(meanX, padT); ctx.lineTo(meanX, padT + gH); ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#fbbf24'; ctx.font = 'bold 9px'; ctx.textAlign = 'center';
    ctx.fillText(`x̄=${mean.toFixed(1)}`, meanX, padT - 5);

    // Y axis labels
    ctx.fillStyle = '#475569'; ctx.font = '8px monospace'; ctx.textAlign = 'right';
    for (let i = 0; i <= 5; i++) {
      const y = padT + gH - (i / 5) * gH;
      ctx.fillText(String(i), padL - 4, y + 3);
      ctx.strokeStyle = 'rgba(255,255,255,0.04)'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(padL, y); ctx.lineTo(padL + gW, y); ctx.stroke();
    }

    animRef.current = requestAnimationFrame(draw);
  }, [rawData, chartType, mean, sd, sorted]);

  useEffect(() => {
    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [draw]);

  return (
    <div className="flex flex-col md:flex-row h-full w-full bg-slate-950">
      <div className="flex-1 flex items-center justify-center p-4 flex-col">
        <div className="flex gap-2 mb-3">
          <button onClick={() => setChartType('hist')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${chartType === 'hist' ? 'bg-blue-700 text-white' : 'bg-slate-800 text-slate-400'}`}>
            📊 Histogram
          </button>
          <button onClick={() => setChartType('bar')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${chartType === 'bar' ? 'bg-blue-700 text-white' : 'bg-slate-800 text-slate-400'}`}>
            📈 Bar Chart
          </button>
        </div>
        <canvas ref={canvasRef} width={440} height={340}
          className="rounded-2xl border border-white/10 shadow-2xl w-full max-w-[440px]" />
      </div>

      <div className="w-full md:w-72 bg-slate-900 border-l border-white/5 flex flex-col">
        <div className="p-4 border-b border-white/5">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-1">Mathematics Lab — m8</p>
          <h2 className="text-lg font-bold text-white">Statistics Lab</h2>
          <p className="text-xs text-slate-400 mt-1">Mean, median, mode, variance, standard deviation</p>
        </div>
        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
          <div className="bg-blue-500/10 border border-blue-500/30 p-3 rounded-xl">
            <p className="text-blue-200 text-xs">Add values to the dataset or remove them. Statistics are computed live. The histogram shows frequency distribution with a normal curve overlay.</p>
          </div>

          <div className="flex gap-2 items-center">
            <DraggableSlider label="New Value" min={5} max={40} value={newVal} onChange={setNewVal} color="#3b82f6" />
            <button onClick={() => setRawData(prev => [...prev, newVal])}
              className="px-3 py-1.5 rounded-xl text-xs font-bold text-white shrink-0" style={{ backgroundColor: hex }}>
              + Add
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {[
              { label: 'Mean (x̄)', val: mean.toFixed(2), color: '#f59e0b' },
              { label: 'Median', val: median.toFixed(1), color: '#a78bfa' },
              { label: 'Mode', val: mode.join(', '), color: '#f472b6' },
              { label: 'Range', val: range, color: '#60a5fa' },
              { label: 'Variance', val: variance.toFixed(2), color: '#fb923c' },
              { label: 'Std Dev (σ)', val: sd.toFixed(2), color: '#10b981' },
            ].map(m => (
              <div key={m.label} className="bg-slate-950 border border-white/10 rounded-lg p-2 text-center">
                <div className="text-[9px] text-slate-500 uppercase font-bold mb-1">{m.label}</div>
                <div className="font-mono font-bold text-xs" style={{ color: m.color }}>{m.val}</div>
              </div>
            ))}
          </div>

          <div className="bg-slate-950 p-2 rounded-xl border border-white/10 text-[10px]">
            <p className="text-slate-400 font-bold mb-1">Dataset ({n} values):</p>
            <p className="font-mono text-slate-300 break-all">[{rawData.join(', ')}]</p>
          </div>

          <button onClick={() => setRawData([12, 15, 18, 22, 25, 17, 14, 20, 16, 19, 23, 13, 21, 16, 18])}
            className="w-full py-2 rounded-xl text-xs bg-slate-800 text-red-400 hover:text-red-300 flex items-center justify-center gap-1.5">
            <RotateCcw size={11} /> Reset Dataset
          </button>
        </div>
      </div>
    </div>
  );
};

export default StatisticsLab;
