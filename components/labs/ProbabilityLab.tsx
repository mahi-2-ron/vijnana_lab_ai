import React, { useRef, useEffect, useState, useCallback } from 'react';
import { RotateCcw } from 'lucide-react';

interface Props { hex: string; }

// Probability Distribution Lab — Normal, Binomial, Poisson
const ProbabilityLab: React.FC<Props> = ({ hex }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const timeRef = useRef(0);
  const [dist, setDist] = useState<'normal' | 'binomial' | 'poisson'>('normal');
  const [mu, setMu] = useState(0);
  const [sigma, setSigma] = useState(1);
  const [n, setN] = useState(10);
  const [p, setP] = useState(0.5);
  const [lambda, setLambda] = useState(3);
  const [showArea, setShowArea] = useState(true);

  const factorial = (x: number): number => x <= 1 ? 1 : x * factorial(x - 1);

  const normalPDF = (x: number) => Math.exp(-0.5 * ((x - mu) / sigma) ** 2) / (sigma * Math.sqrt(2 * Math.PI));
  const binomialPMF = (k: number) => (factorial(n) / (factorial(k) * factorial(n - k))) * p ** k * (1 - p) ** (n - k);
  const poissonPMF = (k: number) => (Math.exp(-lambda) * lambda ** k) / factorial(Math.min(k, 20));

  const draw = useCallback(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);
    timeRef.current += 0.02;

    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, '#020817'); bg.addColorStop(1, '#0f172a');
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

    const PAD = 50, PL = PAD + 30, PR = W - PAD, PT = 30, PB = H - 50;
    const PW = PR - PL, PH = PB - PT;

    // Axes
    ctx.strokeStyle = '#334155'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(PL, PT); ctx.lineTo(PL, PB); ctx.lineTo(PR, PB); ctx.stroke();

    // Tick marks x-axis
    ctx.fillStyle = '#64748b'; ctx.font = '9px'; ctx.textAlign = 'center';
    const xTicks = dist === 'normal' ? [-3,-2,-1,0,1,2,3].map(x => mu + x * sigma) : dist === 'binomial' ? Array.from({length:n+1},(_,i)=>i) : Array.from({length:15},(_,i)=>i);
    xTicks.forEach(v => {
      const px = dist === 'normal' ? PL + ((v - (mu - 4 * sigma)) / (8 * sigma)) * PW : PL + (v / (n || 14)) * PW;
      ctx.fillText(v.toFixed(dist==='normal'?1:0), px, PB + 14);
      ctx.beginPath(); ctx.moveTo(px, PB); ctx.lineTo(px, PB + 4); ctx.stroke();
    });

    // Plot
    const color = dist === 'normal' ? '#3b82f6' : dist === 'binomial' ? '#8b5cf6' : '#10b981';

    if (dist === 'normal') {
      const xMin = mu - 4 * sigma, xMax = mu + 4 * sigma;
      // Area fill
      if (showArea) {
        ctx.beginPath();
        ctx.moveTo(PL, PB);
        for (let i = 0; i <= PW; i++) {
          const xv = xMin + (i / PW) * (xMax - xMin);
          const yv = normalPDF(xv);
          const px = PL + i, py = PB - yv * PH * sigma * 2.5;
          i === 0 ? ctx.moveTo(px, PB) : ctx.lineTo(px, Math.max(PT, py));
        }
        ctx.lineTo(PR, PB); ctx.closePath();
        const grad = ctx.createLinearGradient(0, PT, 0, PB);
        grad.addColorStop(0, color + '60'); grad.addColorStop(1, color + '10');
        ctx.fillStyle = grad; ctx.fill();
      }
      // Curve
      ctx.beginPath(); ctx.strokeStyle = color; ctx.lineWidth = 2.5;
      for (let i = 0; i <= PW; i++) {
        const xv = xMin + (i / PW) * (xMax - xMin);
        const yv = normalPDF(xv);
        const px = PL + i, py = PB - yv * PH * sigma * 2.5;
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, Math.max(PT, py));
      }
      ctx.stroke();
      // μ and σ lines
      const muX = PL + (((mu) - xMin) / (xMax - xMin)) * PW;
      ctx.setLineDash([4,4]); ctx.strokeStyle = color; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(muX, PT); ctx.lineTo(muX, PB); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = color; ctx.font = 'bold 10px'; ctx.textAlign = 'center';
      ctx.fillText(`μ=${mu}`, muX, PT - 5);
    } else {
      // Bar chart for discrete distributions
      const kMax = dist === 'binomial' ? n : 14;
      const pmfValues = Array.from({length: kMax+1}, (_,k) => dist === 'binomial' ? binomialPMF(k) : poissonPMF(k));
      const maxPMF = Math.max(...pmfValues);
      const barW = PW / (kMax + 1) * 0.7;

      pmfValues.forEach((val, k) => {
        const barH = (val / maxPMF) * PH * 0.85;
        const bx = PL + (k / kMax) * PW;
        const by = PB - barH;
        const grad = ctx.createLinearGradient(bx, by, bx, PB);
        grad.addColorStop(0, color); grad.addColorStop(1, color + '40');
        ctx.fillStyle = grad;
        ctx.beginPath(); ctx.roundRect(bx - barW / 2, by, barW, barH, 2); ctx.fill();

        // Value label for tall bars
        if (val / maxPMF > 0.1) {
          ctx.fillStyle = '#94a3b8'; ctx.font = '7px'; ctx.textAlign = 'center';
          ctx.fillText(val.toFixed(3), bx, by - 2);
        }
      });
    }

    // Stats box
    const mean = dist === 'normal' ? mu : dist === 'binomial' ? n * p : lambda;
    const variance = dist === 'normal' ? sigma ** 2 : dist === 'binomial' ? n * p * (1-p) : lambda;
    ctx.fillStyle = '#1e293b'; ctx.beginPath(); ctx.roundRect(PL, PT + 5, 130, 42, 8); ctx.fill();
    ctx.fillStyle = '#94a3b8'; ctx.font = '9px'; ctx.textAlign = 'left';
    ctx.fillText(`Mean: ${mean.toFixed(2)}  Var: ${variance.toFixed(2)}`, PL + 6, PT + 18);
    ctx.fillText(`Std Dev: ${Math.sqrt(variance).toFixed(2)}`, PL + 6, PT + 30);
    ctx.fillStyle = color; ctx.font = 'bold 9px';
    ctx.fillText(dist === 'normal' ? `N(${mu}, ${sigma}²)` : dist === 'binomial' ? `B(${n}, ${p})` : `Pois(${lambda})`, PL + 6, PT + 42);

    animRef.current = requestAnimationFrame(draw);
  }, [dist, mu, sigma, n, p, lambda, showArea]);

  useEffect(() => {
    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [draw]);

  return (
    <div className="flex flex-col md:flex-row h-full w-full bg-slate-950">
      <div className="flex-1 flex items-center justify-center p-4">
        <canvas ref={canvasRef} width={420} height={340} className="rounded-2xl border border-white/10 shadow-2xl w-full max-w-[420px]" />
      </div>

      <div className="w-full md:w-72 bg-slate-900 border-l border-white/5 flex flex-col">
        <div className="p-4 border-b border-white/5">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-1">Math Lab — m9</p>
          <h2 className="text-xl font-bold text-white">Probability Distributions</h2>
          <p className="text-xs text-slate-400 mt-1">Normal, Binomial & Poisson distributions</p>
        </div>
        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
          <div className="grid grid-cols-3 gap-1.5">
            {(['normal','binomial','poisson'] as const).map(d => (
              <button key={d} onClick={() => setDist(d)}
                className={`py-2 rounded-xl text-[10px] font-bold capitalize transition-all ${dist === d ? 'text-white' : 'bg-slate-800 text-slate-400'}`}
                style={dist === d ? { backgroundColor: d === 'normal' ? '#2563eb' : d === 'binomial' ? '#7c3aed' : '#059669' } : {}}>
                {d}
              </button>
            ))}
          </div>

          {dist === 'normal' && (
            <div className="space-y-3">
              <div className="space-y-1"><div className="flex justify-between text-xs"><span className="text-slate-400">Mean (μ)</span><span className="font-mono text-blue-400">{mu}</span></div>
                <input type="range" min={-3} max={3} step={0.5} value={mu} onChange={e => setMu(Number(e.target.value))} className="w-full h-2 bg-slate-700 rounded-full appearance-none cursor-pointer accent-blue-500" /></div>
              <div className="space-y-1"><div className="flex justify-between text-xs"><span className="text-slate-400">Std Dev (σ)</span><span className="font-mono text-blue-400">{sigma}</span></div>
                <input type="range" min={0.5} max={3} step={0.25} value={sigma} onChange={e => setSigma(Number(e.target.value))} className="w-full h-2 bg-slate-700 rounded-full appearance-none cursor-pointer accent-blue-500" /></div>
            </div>
          )}
          {dist === 'binomial' && (
            <div className="space-y-3">
              <div className="space-y-1"><div className="flex justify-between text-xs"><span className="text-slate-400">Trials (n)</span><span className="font-mono text-purple-400">{n}</span></div>
                <input type="range" min={2} max={20} value={n} onChange={e => setN(Number(e.target.value))} className="w-full h-2 bg-slate-700 rounded-full appearance-none cursor-pointer accent-purple-500" /></div>
              <div className="space-y-1"><div className="flex justify-between text-xs"><span className="text-slate-400">Probability (p)</span><span className="font-mono text-purple-400">{p.toFixed(2)}</span></div>
                <input type="range" min={0.05} max={0.95} step={0.05} value={p} onChange={e => setP(Number(e.target.value))} className="w-full h-2 bg-slate-700 rounded-full appearance-none cursor-pointer accent-purple-500" /></div>
            </div>
          )}
          {dist === 'poisson' && (
            <div className="space-y-3">
              <div className="space-y-1"><div className="flex justify-between text-xs"><span className="text-slate-400">Rate (λ)</span><span className="font-mono text-green-400">{lambda}</span></div>
                <input type="range" min={0.5} max={10} step={0.5} value={lambda} onChange={e => setLambda(Number(e.target.value))} className="w-full h-2 bg-slate-700 rounded-full appearance-none cursor-pointer accent-green-500" /></div>
            </div>
          )}

          <button onClick={() => setShowArea(a => !a)}
            className={`w-full py-2 rounded-xl text-xs font-bold transition-all ${showArea ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'}`}>
            {showArea ? '✓ Area Fill On' : '○ Area Fill Off'}
          </button>

          <div className="bg-slate-950 p-3 rounded-xl border border-white/10 text-xs space-y-1.5">
            <p className="text-slate-400 font-bold text-[10px] uppercase">About This Distribution</p>
            {dist === 'normal' && <p className="text-slate-300">Bell-shaped, symmetric. 68-95-99.7 rule. Models natural phenomena like height, errors.</p>}
            {dist === 'binomial' && <p className="text-slate-300">Discrete. n independent trials, each with probability p of success. Models coin flips, defects.</p>}
            {dist === 'poisson' && <p className="text-slate-300">Discrete. Models rare events in fixed intervals. λ = average rate of occurrence.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProbabilityLab;
