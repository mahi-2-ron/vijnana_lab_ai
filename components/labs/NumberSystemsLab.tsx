import React, { useState} from 'react';
import { RotateCcw, CheckCircle } from 'lucide-react';

interface NumberSystemsLabProps { hex: string; }

const STEPS = [
  { title: 'Number Systems', instruction: 'Computers use different number systems: Binary (Base-2: 0,1), Octal (Base-8: 0-7), Decimal (Base-10: 0-9), and Hexadecimal (Base-16: 0-F). All data in a computer is ultimately stored as binary!', action: 'Start Learning 📚' },
  { title: 'Build Binary', instruction: 'Click the bit buttons to turn them ON/OFF (1 or 0). Each bit position represents a power of 2. Watch the decimal value update instantly!', action: 'Toggle Bits 💡' },
  { title: 'Convert to All Bases', instruction: 'Notice how the same number looks different in Binary, Octal, Decimal, and Hexadecimal. They all represent the same value — just written differently!', action: 'See Conversions 🔄' },
  { title: 'Try Hex Letters', instruction: 'In Hexadecimal, digits above 9 use letters: A=10, B=11, C=12, D=13, E=14, F=15. Try setting a value like 255 to see FF in hex!', action: 'Explore Hex A-F 🔤' },
  { title: 'Powers of 2', instruction: 'The secret of binary: each bit from right to left represents 2⁰=1, 2¹=2, 2²=4, 2³=8... Sum of ON bits = decimal value. Try making exactly 42!', action: 'Make 42 🎯' },
];

const NumberSystemsLab: React.FC<NumberSystemsLabProps> = ({ hex }) => {
  const [step, setStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [bits, setBits] = useState(Array(8).fill(0));
  const [target, setTarget] = useState<number | null>(null);
  const [celebrating, setCelebrating] = useState(false);

  const decimal = bits.reduce((acc, b, i) => acc + b * Math.pow(2, 7 - i), 0);
  const binary = bits.join('');
  const octal = decimal.toString(8).padStart(3, '0');
  const hexStr = decimal.toString(16).toUpperCase().padStart(2, '0');

  const toggleBit = (i: number) => {
    const newBits = [...bits];
    newBits[i] = 1 - newBits[i];
    setBits(newBits);
    if (step < 1) setStep(1);
    const newDec = newBits.reduce((acc, b, idx) => acc + b * Math.pow(2, 7 - idx), 0);
    if (target !== null && newDec === target) {
      setCelebrating(true);
      setTimeout(() => setCelebrating(false), 2000);
    }
  };

  const setDecValue = (val: number) => {
    const b = Array(8).fill(0);
    for (let i = 7; i >= 0; i--) { b[7 - i] = (val >> i) & 1; }
    setBits(b);
  };

  const reset = () => { setBits(Array(8).fill(0)); setStep(0); setCompleted(false); setTarget(null); setCelebrating(false); };
  const current = STEPS[Math.min(step, STEPS.length - 1)];

  const BIT_COLORS = ['#ef4444', '#f97316', '#f59e0b', '#eab308', '#22c55e', '#06b6d4', '#3b82f6', '#8b5cf6'];
  const POWERS = [128, 64, 32, 16, 8, 4, 2, 1];

  return (
    <div className="flex flex-col md:flex-row h-full w-full bg-slate-950">
      <div className="flex-1 flex items-center justify-center p-4 flex-col gap-6">
        {/* Bit toggles */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex gap-2">
            {bits.map((bit, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <span className="text-xs font-mono text-gray-500">2⁷⁻{i}</span>
                <span className="text-xs font-mono text-gray-600">{POWERS[i]}</span>
                <button onClick={() => toggleBit(i)}
                  className="w-10 h-12 rounded-xl font-bold text-xl transition-all hover:scale-110 active:scale-90 border-2 shadow-lg"
                  style={{ backgroundColor: bit ? BIT_COLORS[i] : 'rgba(30,41,59,1)', borderColor: bit ? BIT_COLORS[i] : '#334155', color: bit ? 'white' : '#4b5563', boxShadow: bit ? `0 0 15px ${BIT_COLORS[i]}60` : 'none' }}>
                  {bit}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Conversions */}
        <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
          {[
            { base: 'BIN', val: binary, color: '#3b82f6', sub: 'Base 2' },
            { base: 'OCT', val: octal, color: '#10b981', sub: 'Base 8' },
            { base: 'DEC', val: String(decimal), color: '#f59e0b', sub: 'Base 10' },
            { base: 'HEX', val: hexStr, color: '#ef4444', sub: 'Base 16' },
          ].map(item => (
            <div key={item.base} className="p-3 rounded-xl text-center" style={{ backgroundColor: item.color + '15', border: `1px solid ${item.color}40` }}>
              <p className="text-xs font-bold mb-1" style={{ color: item.color }}>{item.base} ({item.sub})</p>
              <p className="font-mono text-white text-lg font-bold">{item.val}</p>
            </div>
          ))}
        </div>

        {/* Quick buttons */}
        <div className="flex gap-2 flex-wrap justify-center">
          {[0, 42, 127, 170, 255].map(v => (
            <button key={v} onClick={() => setDecValue(v)} className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all">
              {v}
            </button>
          ))}
          <button onClick={() => { setTarget(42); setStep(4); }} className="px-3 py-1.5 rounded-lg bg-purple-600/30 hover:bg-purple-600/50 text-purple-300 text-xs font-bold border border-purple-500/40 transition-all">
            🎯 Make 42
          </button>
        </div>

        {celebrating && (
          <div className="px-6 py-3 rounded-xl bg-green-500/20 border border-green-500/50 text-green-300 font-bold animate-bounce">
            🎉 Target reached! You got {decimal}!
          </div>
        )}
      </div>

      <div className="w-full md:w-72 bg-slate-900 border-l border-white/5 flex flex-col">
        <div className="p-5 border-b border-white/5">
          <p className="text-xs font-bold uppercase tracking-widest text-purple-400 mb-1">Number Systems — CS Lab</p>
          <h2 className="text-xl font-bold text-white">{current.title}</h2>
        </div>
        <div className="flex-1 p-5 space-y-4 overflow-y-auto">
          <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-xl">
            <p className="text-purple-200 text-sm">{current.instruction}</p>
          </div>
          <div className="bg-white/5 p-4 rounded-xl border border-white/10 font-mono text-sm space-y-1">
            <p className="text-gray-400">Decimal: <span className="text-white font-bold">{decimal}</span></p>
            <p className="text-gray-400">Active bits: <span className="text-yellow-300">{bits.filter(Boolean).length}/8</span></p>
            <p className="text-gray-400">Bit sum: <span className="text-white">{bits.map((b, i) => b ? POWERS[i] : 0).filter(Boolean).join(' + ') || '0'}</span></p>
          </div>
          <div className="text-xs text-gray-500 space-y-1">
            <p><span className="text-blue-400">A</span>=10, <span className="text-blue-400">B</span>=11, <span className="text-blue-400">C</span>=12, <span className="text-blue-400">D</span>=13, <span className="text-blue-400">E</span>=14, <span className="text-blue-400">F</span>=15</p>
          </div>
          {step < STEPS.length - 1 ? (
            <button onClick={() => setStep(s => Math.min(s + 1, STEPS.length - 1))}
              className="w-full py-3 rounded-xl font-bold text-white bg-purple-700 hover:bg-purple-600 transition-all active:scale-95">
              Next Concept →
            </button>
          ) : (
            <button onClick={() => setCompleted(true)} className="w-full py-3 rounded-xl font-bold text-white bg-green-700 hover:bg-green-600 transition-all active:scale-95">✅ Complete</button>
          )}
          {completed && <div className="text-center"><CheckCircle size={28} className="mx-auto text-green-400 mb-2" /><p className="text-green-400 font-bold text-sm">Number Systems Mastered!</p></div>}
          <button onClick={reset} className="w-full py-2 rounded-xl text-gray-500 hover:bg-white/5 text-sm flex items-center justify-center gap-1"><RotateCcw size={12} /> Reset</button>
          <div className="flex gap-1">
            {STEPS.map((_, idx) => <div key={idx} className="flex-1 h-1.5 rounded-full" style={{ backgroundColor: idx <= step ? '#8b5cf6' : 'rgba(255,255,255,0.1)' }} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NumberSystemsLab;
