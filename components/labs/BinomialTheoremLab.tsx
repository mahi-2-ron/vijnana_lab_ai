import React, { useRef, useEffect, useState, useCallback } from 'react';
import { RotateCcw } from 'lucide-react';
import DraggableSlider from './DraggableSlider';

interface Props { hex: string; }

const BinomialTheoremLab: React.FC<Props> = ({ hex }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const timeRef = useRef(0);
  const [n, setN] = useState(5); // power
  const [a, setA] = useState(1); // coefficient of x
  const [b, setB] = useState(1); // constant term
  const [selectedRow, setSelectedRow] = useState(5);
  const [animPhase, setAnimPhase] = useState(0);

  // Pascal's Triangle
  const pascalRows = 10;
  const pascal: number[][] = [];
  for (let i = 0; i <= pascalRows; i++) {
    pascal[i] = [];
    for (let j = 0; j <= i; j++) {
      if (j === 0 || j === i) pascal[i][j] = 1;
      else pascal[i][j] = pascal[i - 1][j - 1] + pascal[i - 1][j];
    }
  }

  const binomialTerms = pascal[n].map((coeff, r) => {
    const aPow = n - r;
    const bPow = r;
    return { coeff, aPow, bPow, value: coeff * Math.pow(a, aPow) * Math.pow(b, bPow) };
  });

  useEffect(() => {
    const interval = setInterval(() => setAnimPhase(p => (p + 0.04) % (Math.PI * 2)), 50);
    return () => clearInterval(interval);
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#0f172a'; ctx.fillRect(0, 0, W, H);

    const rows = Math.min(selectedRow + 1, 9);
    const maxCols = rows;
    const cellW = Math.min(44, (W - 40) / maxCols);
    const cellH = 36;
    const startY = 20;

    for (let i = 0; i <= Math.min(selectedRow, 8); i++) {
      const rowCols = i + 1;
      const rowW = rowCols * cellW;
      const rowX = (W - rowW) / 2;
      for (let j = 0; j <= i; j++) {
        const cx2 = rowX + j * cellW;
        const cy2 = startY + i * cellH;
        const isHighlighted = i === selectedRow;
        const isPath = (j === 0 || j === i);
        ctx.fillStyle = isHighlighted ? (j % 2 === 0 ? 'rgba(59,130,246,0.25)' : 'rgba(168,85,247,0.25)') : isPath ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.03)';
        ctx.strokeStyle = isHighlighted ? (j % 2 === 0 ? 'rgba(59,130,246,0.7)' : 'rgba(168,85,247,0.7)') : 'rgba(255,255,255,0.1)';
        ctx.lineWidth = isHighlighted ? 1.5 : 1;
        ctx.beginPath(); ctx.roundRect(cx2 + 1, cy2 + 1, cellW - 2, cellH - 4, 4); ctx.fill(); ctx.stroke();
        ctx.fillStyle = isHighlighted ? 'white' : '#64748b';
        ctx.font = `${isHighlighted ? 'bold' : 'normal'} ${Math.min(11, 100 / maxCols)}px monospace`;
        ctx.textAlign = 'center';
        ctx.fillText(String(pascal[i][j]), cx2 + cellW / 2, cy2 + cellH / 2 + 4);
      }
    }

    // Row label
    ctx.fillStyle = '#94a3b8'; ctx.font = 'bold 9px'; ctx.textAlign = 'left';
    for (let i = 0; i <= Math.min(selectedRow, 8); i++) {
      ctx.fillText(`n=${i}`, 5, startY + i * cellH + cellH / 2 + 4);
    }

    // Expansion display
    const expY = startY + (Math.min(selectedRow, 8) + 1) * cellH + 15;
    ctx.fillStyle = 'rgba(15,23,42,0.9)'; ctx.strokeStyle = '#3b82f6'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.roundRect(15, expY, W - 30, 65, 8); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#93c5fd'; ctx.font = 'bold 10px'; ctx.textAlign = 'left';
    ctx.fillText(`(${a}x + ${b})^${n} = `, 22, expY + 18);
    let termStr = binomialTerms.map((bt, i) => {
      const cs = bt.coeff !== 1 || bt.aPow === 0 ? `${bt.coeff}` : '';
      const xs = bt.aPow === 0 ? '' : bt.aPow === 1 ? `x` : `x^${bt.aPow}`;
      const bs = bt.bPow === 0 ? '' : bt.bPow === 1 ? `${b}` : `${b}^${bt.bPow}`;
      return `${cs}${xs}${bs}`;
    }).join(' + ');
    ctx.font = '9px monospace'; ctx.fillStyle = '#60a5fa';
    if (ctx.measureText(termStr).width > W - 45) {
      const mid = Math.ceil(binomialTerms.length / 2);
      ctx.fillText(binomialTerms.slice(0, mid).map((bt, i) => {
        const cs = bt.coeff !== 1 || bt.aPow === 0 ? `${bt.coeff}` : '';
        return `${cs}x^${bt.aPow}`;
      }).join(' + ') + ' +', 22, expY + 34);
      ctx.fillText(binomialTerms.slice(mid).map((bt, i) => {
        const cs = bt.coeff;
        return `${cs}`;
      }).join(' + '), 22, expY + 47);
    } else {
      ctx.fillText(termStr, 22, expY + 36);
    }
    ctx.fillStyle = '#4ade80'; ctx.font = 'bold 9px';
    ctx.fillText(`Sum of coefficients = ${binomialTerms.reduce((a, b) => a + b.coeff, 0)} (= 2^${n})`, 22, expY + 55);

    animRef.current = requestAnimationFrame(draw);
  }, [n, a, b, selectedRow, pascal, binomialTerms]);

  useEffect(() => {
    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [draw]);

  return (
    <div className="flex flex-col md:flex-row h-full w-full bg-slate-950">
      <div className="flex-1 flex items-center justify-center p-4">
        <canvas ref={canvasRef} width={440} height={420}
          className="rounded-2xl border border-white/10 shadow-2xl w-full max-w-[440px]" />
      </div>

      <div className="w-full md:w-72 bg-slate-900 border-l border-white/5 flex flex-col">
        <div className="p-4 border-b border-white/5">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-1">Mathematics Lab — m6</p>
          <h2 className="text-lg font-bold text-white">Binomial Theorem</h2>
          <p className="text-xs text-slate-400 mt-1">Pascal's triangle and (a+b)ⁿ expansion</p>
        </div>
        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
          <div className="bg-blue-500/10 border border-blue-500/30 p-3 rounded-xl">
            <p className="text-blue-200 text-xs">Choose the power n. Highlighted row in Pascal's triangle gives the binomial coefficients for the expansion.</p>
          </div>

          <DraggableSlider label="Power n" min={0} max={8} step={1} value={n} onChange={v => { setN(v); setSelectedRow(v); }} color="#3b82f6" />
          <DraggableSlider label="Coefficient a (of x)" min={1} max={5} value={a} onChange={setA} color="#a78bfa" />
          <DraggableSlider label="Constant b" min={1} max={5} value={b} onChange={setB} color="#f59e0b" />

          <div className="grid grid-cols-2 gap-2">
            {[
              { label: 'Power n', val: n, color: '#60a5fa' },
              { label: 'Num terms', val: n + 1, color: '#a78bfa' },
              { label: 'Sum coeff', val: `2^${n} = ${Math.pow(2, n)}`, color: '#4ade80' },
              { label: 'Middle term', val: n % 2 === 0 ? `(${n / 2 + 1})th` : `${Math.ceil(n / 2)}th,${Math.ceil(n / 2) + 1}th`, color: '#fbbf24' },
            ].map(m => (
              <div key={m.label} className="bg-slate-950 border border-white/10 rounded-lg p-2 text-center">
                <div className="text-[9px] text-slate-500 uppercase font-bold mb-1">{m.label}</div>
                <div className="font-mono font-bold text-xs" style={{ color: m.color }}>{m.val}</div>
              </div>
            ))}
          </div>

          <div className="bg-slate-950 p-3 rounded-xl border border-white/10 text-xs space-y-1">
            <p className="text-slate-400 font-bold text-[10px] uppercase mb-1">General Term</p>
            <p className="font-mono text-blue-400">Tᵣ₊₁ = ⁿCᵣ · aⁿ⁻ʳ · bʳ</p>
            <p className="text-slate-500 text-[9px]">r = 0 to n; ⁿCᵣ from Pascal's triangle</p>
          </div>

          <div className="overflow-y-auto text-[10px] max-h-40">
            <table className="w-full border-collapse">
              <thead><tr className="bg-slate-800">
                {['r', 'ⁿCᵣ', 'xᵖ', 'value'].map(h => <th key={h} className="px-2 py-1 text-slate-400 text-left">{h}</th>)}
              </tr></thead>
              <tbody>{binomialTerms.map((bt, i) => (
                <tr key={i} className="border-t border-white/5">
                  <td className="px-2 py-1 text-slate-500">{i}</td>
                  <td className="px-2 py-1 font-mono text-blue-400">{bt.coeff}</td>
                  <td className="px-2 py-1 font-mono text-purple-400">x^{bt.aPow}</td>
                  <td className="px-2 py-1 font-mono text-green-400">{bt.value}</td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BinomialTheoremLab;
