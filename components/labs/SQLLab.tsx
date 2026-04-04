import React, { useState } from 'react';
import { Play, RotateCcw, CheckCircle, XCircle, Plus, Trash2 } from 'lucide-react';

interface Props { hex: string; }

type ColType = 'INT' | 'TEXT' | 'REAL';
interface Column { name: string; type: ColType; }
interface Row { [key: string]: string | number; }
interface Table { name: string; columns: Column[]; rows: Row[]; }

const SQLLab: React.FC<Props> = ({ hex }) => {
  const [tables, setTables] = useState<Record<string, Table>>({
    students: {
      name: 'students',
      columns: [{ name: 'id', type: 'INT' }, { name: 'name', type: 'TEXT' }, { name: 'grade', type: 'INT' }, { name: 'score', type: 'REAL' }],
      rows: [
        { id: 1, name: 'Alice', grade: 12, score: 92.5 },
        { id: 2, name: 'Bob', grade: 11, score: 78.0 },
        { id: 3, name: 'Carol', grade: 12, score: 88.3 },
        { id: 4, name: 'Dave', grade: 10, score: 95.1 },
        { id: 5, name: 'Eve', grade: 11, score: 71.5 },
      ],
    },
    subjects: {
      name: 'subjects',
      columns: [{ name: 'id', type: 'INT' }, { name: 'name', type: 'TEXT' }, { name: 'credits', type: 'INT' }],
      rows: [
        { id: 1, name: 'Physics', credits: 4 },
        { id: 2, name: 'Chemistry', credits: 4 },
        { id: 3, name: 'Math', credits: 5 },
        { id: 4, name: 'Biology', credits: 3 },
      ],
    },
  });

  const [query, setQuery] = useState("SELECT * FROM students WHERE grade = 12 ORDER BY score DESC;");
  const [result, setResult] = useState<Row[] | null>(null);
  const [columns, setColumns] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const PRESETS = [
    { label: 'SELECT All', q: 'SELECT * FROM students;' },
    { label: 'WHERE Filter', q: 'SELECT * FROM students WHERE grade = 12 ORDER BY score DESC;' },
    { label: 'COUNT', q: 'SELECT COUNT(*) as total FROM students;' },
    { label: 'AVG Score', q: 'SELECT AVG(score) as avg_score FROM students;' },
    { label: 'Max Score', q: 'SELECT name, MAX(score) as top_score FROM students;' },
    { label: 'LIMIT', q: 'SELECT * FROM students ORDER BY score DESC LIMIT 3;' },
    { label: 'Subjects', q: 'SELECT * FROM subjects WHERE credits >= 4;' },
  ];

  const runQuery = () => {
    setError('');
    setResult(null);
    setStatus('idle');

    try {
      const q = query.trim().replace(/;$/, '').toLowerCase();

      // Very simple SQL parser
      if (q.startsWith('select')) {
        const fromMatch = q.match(/from\s+(\w+)/);
        if (!fromMatch) throw new Error('Missing FROM clause');
        const tableName = fromMatch[1];
        const table = tables[tableName];
        if (!table) throw new Error(`Table '${tableName}' does not exist`);

        let rows = [...table.rows];

        // WHERE
        const whereMatch = q.match(/where\s+(\w+)\s*(=|!=|>|<|>=|<=)\s*['"]?([^'"\s]+)['"]?/);
        if (whereMatch) {
          const [, col, op, val] = whereMatch;
          const numVal = parseFloat(val);
          rows = rows.filter(row => {
            const rv = row[col];
            const rn = typeof rv === 'number' ? rv : parseFloat(String(rv));
            if (!isNaN(numVal)) {
              if (op === '=') return rn === numVal;
              if (op === '>') return rn > numVal;
              if (op === '<') return rn < numVal;
              if (op === '>=') return rn >= numVal;
              if (op === '<=') return rn <= numVal;
              if (op === '!=') return rn !== numVal;
            } else {
              if (op === '=') return String(rv).toLowerCase() === val.toLowerCase();
              if (op === '!=') return String(rv).toLowerCase() !== val.toLowerCase();
            }
            return true;
          });
        }

        // ORDER BY
        const orderMatch = q.match(/order\s+by\s+(\w+)(\s+desc)?/);
        if (orderMatch) {
          const col = orderMatch[1], desc = !!orderMatch[2];
          rows.sort((a, b) => {
            const av = a[col], bv = b[col];
            if (typeof av === 'number' && typeof bv === 'number') return desc ? bv - av : av - bv;
            return desc ? String(bv).localeCompare(String(av)) : String(av).localeCompare(String(bv));
          });
        }

        // LIMIT
        const limitMatch = q.match(/limit\s+(\d+)/);
        if (limitMatch) rows = rows.slice(0, parseInt(limitMatch[1]));

        // SELECT columns
        let selCols: string[] = table.columns.map(c => c.name);
        const selectPart = q.match(/select\s+(.*?)\s+from/)?.[1] || '*';
        if (selectPart.trim() !== '*') {
          // Handle aggregate functions
          const countMatch = selectPart.match(/count\(\*\)\s*as\s*(\w+)/);
          const avgMatch = selectPart.match(/avg\((\w+)\)\s*as\s*(\w+)/);
          const maxMatch = selectPart.match(/(?:max|min)\((\w+)\)\s*as\s*(\w+)/);
          const isMax = selectPart.match(/max\((\w+)\)/);

          if (countMatch) {
            setResult([{ [countMatch[1]]: rows.length }]);
            setColumns([countMatch[1]]);
            setStatus('success');
            return;
          } else if (avgMatch) {
            const vals = rows.map(r => r[avgMatch[1]] as number);
            const avg = vals.reduce((a, b) => a + b, 0) / vals.length;
            setResult([{ [avgMatch[2]]: avg.toFixed(2) }]);
            setColumns([avgMatch[2]]);
            setStatus('success');
            return;
          } else if (maxMatch && isMax) {
            const col2 = maxMatch[1];
            const maxR = rows.reduce((a, b) => (a[col2] as number) > (b[col2] as number) ? a : b);
            const namePart = selectPart.includes('name') ? { name: maxR['name'] } : {};
            setResult([{ ...namePart, [maxMatch[2]]: maxR[col2] }]);
            setColumns([...Object.keys(namePart), maxMatch[2]]);
            setStatus('success');
            return;
          } else {
            selCols = selectPart.split(',').map(c => c.trim()).filter(c => selCols.includes(c));
          }
        }

        rows = rows.map(r => {
          const filtered: Row = {};
          selCols.forEach(c => { filtered[c] = r[c]; });
          return filtered;
        });

        setResult(rows);
        setColumns(selCols);
        setStatus('success');
      } else {
        throw new Error('Only SELECT queries are supported in this simulation');
      }
    } catch (err: any) {
      setError(err.message || 'Syntax error');
      setStatus('error');
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-full w-full bg-slate-950">
      <div className="flex-1 flex flex-col p-4 gap-4 overflow-auto">
        {/* Query editor */}
        <div className="bg-slate-900 rounded-2xl border border-white/10 overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 border-b border-white/5">
            <span className="text-[10px] font-bold text-orange-400 uppercase">MySQL Query Editor</span>
            <div className="text-[9px] px-2 py-0.5 bg-green-500/20 text-green-400 rounded-full ml-auto">● Connected</div>
          </div>
          <textarea value={query} onChange={e => setQuery(e.target.value)} rows={3}
            className="w-full bg-transparent p-4 text-sm font-mono text-blue-300 focus:outline-none resize-none" />
        </div>

        {/* Results table */}
        <div className="bg-slate-900 rounded-2xl border border-white/10 overflow-hidden flex-1">
          <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 border-b border-white/5 text-xs">
            <span className="text-slate-400 font-bold">Result Set</span>
            {result && <span className="text-green-400 ml-2">{result.length} rows</span>}
            {status === 'success' && <CheckCircle size={12} className="text-green-400 ml-auto" />}
            {status === 'error' && <XCircle size={12} className="text-red-400 ml-auto" />}
          </div>
          <div className="overflow-auto max-h-64">
            {error ? (
              <div className="p-4 text-sm text-red-400 font-mono">ERROR: {error}</div>
            ) : result ? (
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-white/10">
                    {columns.map(c => <th key={c} className="px-4 py-2 text-left text-orange-400 font-bold uppercase text-[9px]">{c}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {result.map((row, i) => (
                    <tr key={i} className={`border-b border-white/5 hover:bg-white/3 ${i % 2 === 0 ? '' : 'bg-white/2'}`}>
                      {columns.map(c => <td key={c} className="px-4 py-2 font-mono text-slate-300">{String(row[c] ?? 'NULL')}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="p-4 text-slate-600 text-sm">Execute a query to see results...</p>
            )}
          </div>
        </div>
      </div>

      <div className="w-full md:w-72 bg-slate-900 border-l border-white/5 flex flex-col">
        <div className="p-4 border-b border-white/5">
          <p className="text-xs font-bold uppercase tracking-widest text-orange-400 mb-1">CS Lab — cs10</p>
          <h2 className="text-xl font-bold text-white">Database & SQL</h2>
          <p className="text-xs text-slate-400 mt-1">Execute SQL queries on virtual student database</p>
        </div>
        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
          <button onClick={runQuery}
            className="w-full py-3 rounded-xl font-bold text-white flex items-center justify-center gap-2"
            style={{ backgroundColor: hex }}>
            <Play size={14} /> Execute Query
          </button>

          <div className="space-y-1.5">
            <p className="text-[10px] text-slate-400 uppercase font-bold">Quick Queries</p>
            {PRESETS.map(preset => (
              <button key={preset.label} onClick={() => { setQuery(preset.q); setResult(null); setStatus('idle'); }}
                className="w-full p-2.5 rounded-xl text-left text-[10px] border border-white/10 hover:border-orange-500/40 hover:bg-orange-500/5 transition-all text-slate-400 hover:text-orange-300 font-mono">
                {preset.q}
              </button>
            ))}
          </div>

          <div className="space-y-2">
            <p className="text-[10px] text-slate-400 uppercase font-bold">Tables</p>
            {Object.values(tables).map(table => (
              <div key={table.name} className="bg-slate-950 border border-white/10 rounded-xl p-3">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-orange-400 font-mono font-bold text-xs">{table.name}</span>
                  <span className="text-[9px] text-slate-500">{table.rows.length} rows</span>
                </div>
                <div className="space-y-0.5">
                  {table.columns.map(col => (
                    <div key={col.name} className="flex justify-between text-[9px]">
                      <span className="text-slate-300 font-mono">{col.name}</span>
                      <span className="text-slate-500">{col.type}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-slate-950 border border-white/10 rounded-xl p-3 text-[9px] space-y-1 text-slate-400">
            <p className="font-bold text-orange-400 text-[10px] uppercase mb-1">SQL Reference</p>
            {[['SELECT','Choose columns'],['FROM','Specify table'],['WHERE','Filter rows'],['ORDER BY','Sort results'],['LIMIT','Cap row count'],['COUNT(*)','Count rows'],['AVG(col)','Average value']].map(([kw,desc]) => (
              <div key={kw} className="flex gap-2"><span className="font-mono text-blue-400 w-16 shrink-0">{kw}</span><span>{desc}</span></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SQLLab;
