import React, { useState, useRef, useEffect } from 'react';
import { Play, RotateCcw, CheckCircle, XCircle } from 'lucide-react';

interface Props { hex: string; }

type Mode = 'read' | 'write' | 'append';

const FileHandlingLab: React.FC<Props> = ({ hex }) => {
  const [mode, setMode] = useState<Mode>('write');
  const [filename, setFilename] = useState('data.txt');
  const [inputText, setInputText] = useState('Hello, World!\nPython is great!');
  const [files, setFiles] = useState<Record<string, string[]>>({
    'sample.txt': ['This is a sample file.', 'Line 2 of sample.'],
    'numbers.txt': ['10', '20', '30', '40', '50'],
  });
  const [output, setOutput] = useState<string[]>([]);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [running, setRunning] = useState(false);
  const codeRef = useRef<HTMLDivElement>(null);

  const pythonCode = {
    write: `# Open file in WRITE mode ('w')
# Creates new file or overwrites existing
file = open("${filename}", "w")
${inputText.split('\n').map(l => `file.write("${l}\\n")`).join('\n')}
file.close()
print("File written successfully!")`,

    read: `# Open file in READ mode ('r')
with open("${filename}", "r") as file:
    content = file.read()
    print(content)
# 'with' auto-closes file`,

    append: `# Open file in APPEND mode ('a')
# Adds to existing content
with open("${filename}", "a") as file:
${inputText.split('\n').map(l => `    file.write("${l}\\n")`).join('\n')}
print("Data appended!")`,
  };

  const simulate = () => {
    setRunning(true);
    setStatus('idle');
    setOutput([]);

    const steps: string[] = [];

    setTimeout(() => {
      if (mode === 'write') {
        steps.push(`>>> Opening "${filename}" in write mode...`);
        steps.push(`>>> File created/overwritten.`);
        const lines = inputText.split('\n');
        lines.forEach(l => steps.push(`>>> Written: "${l}"`));
        steps.push(`>>> File closed. ${lines.length} lines written.`);
        steps.push(`>>> "File written successfully!"`);
        setFiles(prev => ({ ...prev, [filename]: lines }));
        setStatus('success');
      } else if (mode === 'read') {
        if (!files[filename]) {
          steps.push(`>>> FileNotFoundError: [Errno 2] No such file: '${filename}'`);
          setStatus('error');
        } else {
          steps.push(`>>> Opening "${filename}" in read mode...`);
          const content = files[filename];
          content.forEach((l, i) => steps.push(`Line ${i + 1}: ${l}`));
          steps.push(`>>> EOF reached. ${content.length} lines read.`);
          steps.push(`>>> File closed automatically (with statement).`);
          setStatus('success');
        }
      } else {
        if (!files[filename]) {
          steps.push(`>>> "${filename}" not found — creating new file.`);
        } else {
          steps.push(`>>> Opening "${filename}" in append mode...`);
        }
        const newLines = inputText.split('\n');
        newLines.forEach(l => steps.push(`>>> Appended: "${l}"`));
        const existing = files[filename] || [];
        setFiles(prev => ({ ...prev, [filename]: [...existing, ...newLines] }));
        steps.push(`>>> Data appended! File now has ${(files[filename]?.length || 0) + newLines.length} lines.`);
        setStatus('success');
      }
      setOutput(steps);
      setRunning(false);
    }, 800);
  };

  return (
    <div className="flex flex-col md:flex-row h-full w-full bg-slate-950">
      <div className="flex-1 flex flex-col p-4 gap-4 overflow-auto">
        {/* Code display */}
        <div className="bg-slate-900 rounded-2xl border border-white/10 overflow-hidden flex-1">
          <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 border-b border-white/5">
            <div className="flex gap-1.5"> <div className="w-2.5 h-2.5 rounded-full bg-red-500" /> <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" /> <div className="w-2.5 h-2.5 rounded-full bg-green-500" /> </div>
            <span className="text-slate-400 text-xs ml-2 font-mono">file_handling.py</span>
          </div>
          <pre className="p-4 text-xs font-mono leading-relaxed overflow-auto">
            {pythonCode[mode].split('\n').map((line, i) => {
              const isComment = line.trim().startsWith('#');
              const isKeyword = /\b(open|with|as|print|file|for|if|in|def|return)\b/.test(line);
              return (
                <div key={i} className="flex gap-3">
                  <span className="text-slate-600 select-none w-5 text-right shrink-0">{i + 1}</span>
                  <span className={isComment ? 'text-green-600' : 'text-slate-300'}>{line}</span>
                </div>
              );
            })}
          </pre>
        </div>

        {/* Terminal output */}
        <div className="bg-black rounded-2xl border border-white/10 p-4 min-h-[100px] font-mono text-xs">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-green-400 text-[10px] uppercase font-bold">Terminal Output</span>
            {status === 'success' && <CheckCircle size={12} className="text-green-400 ml-auto" />}
            {status === 'error' && <XCircle size={12} className="text-red-400 ml-auto" />}
          </div>
          {output.length === 0 && <p className="text-slate-600">Run the code to see output...</p>}
          {output.map((line, i) => (
            <p key={i} className={line.includes('Error') ? 'text-red-400' : line.startsWith('>>>') ? 'text-green-400' : 'text-slate-300'}>{line}</p>
          ))}
        </div>
      </div>

      <div className="w-full md:w-72 bg-slate-900 border-l border-white/5 flex flex-col">
        <div className="p-4 border-b border-white/5">
          <p className="text-xs font-bold uppercase tracking-widest text-green-400 mb-1">CS Lab — cs9</p>
          <h2 className="text-xl font-bold text-white">File Handling</h2>
          <p className="text-xs text-slate-400 mt-1">Python file operations — read, write, append</p>
        </div>
        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
          <div className="grid grid-cols-3 gap-1.5">
            {(['write', 'read', 'append'] as Mode[]).map(m => (
              <button key={m} onClick={() => { setMode(m); setStatus('idle'); setOutput([]); }}
                className={`py-2 rounded-xl text-[10px] font-bold capitalize transition-all ${mode === m ? 'text-white' : 'bg-slate-800 text-slate-400'}`}
                style={mode === m ? { backgroundColor: m === 'write' ? '#2563eb' : m === 'read' ? '#059669' : '#d97706' } : {}}>
                {m === 'write' ? '✏ Write' : m === 'read' ? '📖 Read' : '📝 Append'}
              </button>
            ))}
          </div>

          <div className="space-y-1">
            <p className="text-[10px] text-slate-400 uppercase font-bold">Filename</p>
            <input value={filename} onChange={e => setFilename(e.target.value)}
              className="w-full bg-slate-950 border border-white/15 rounded-xl px-3 py-2 text-sm font-mono text-white focus:outline-none focus:border-green-500" />
          </div>

          {(mode === 'write' || mode === 'append') && (
            <div className="space-y-1">
              <p className="text-[10px] text-slate-400 uppercase font-bold">{mode === 'write' ? 'Content to Write' : 'Content to Append'}</p>
              <textarea value={inputText} onChange={e => setInputText(e.target.value)} rows={3}
                className="w-full bg-slate-950 border border-white/15 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-green-500 resize-none" />
            </div>
          )}

          {/* Existing files */}
          <div className="space-y-1.5">
            <p className="text-[10px] text-slate-400 uppercase font-bold">Virtual Filesystem</p>
            {Object.entries(files).map(([fn, lines]) => (
              <button key={fn} onClick={() => setFilename(fn)}
                className={`w-full p-2.5 rounded-xl text-xs text-left border transition-all ${filename === fn ? 'border-green-500/50 bg-green-500/10' : 'border-white/10 hover:border-white/30'}`}>
                <div className="flex items-center gap-2">
                  <span className="text-lg">📄</span>
                  <div>
                    <p className="font-mono font-bold" style={{ color: filename === fn ? '#4ade80' : '#94a3b8' }}>{fn}</p>
                    <p className="text-slate-500 text-[9px]">{lines.length} lines</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <button onClick={simulate} disabled={running}
            className="w-full py-3 rounded-xl font-bold text-white flex items-center justify-center gap-2 disabled:opacity-50"
            style={{ backgroundColor: hex }}>
            <Play size={14} /> {running ? 'Running...' : 'Run Code'}
          </button>

          <div className="bg-slate-950 border border-white/10 rounded-xl p-3 text-[9px] text-slate-400 space-y-0.5">
            <p><span className="text-blue-400 font-mono">'r'</span> — Read only. Error if not found.</p>
            <p><span className="text-blue-400 font-mono">'w'</span> — Write. Creates or truncates.</p>
            <p><span className="text-blue-400 font-mono">'a'</span> — Append. Creates if not found.</p>
            <p><span className="text-blue-400 font-mono">'r+'</span> — Read+Write existing file.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileHandlingLab;
