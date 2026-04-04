import React, { useRef, useEffect, useState, useCallback } from 'react';
import { RotateCcw, Play, Pause, Plus, Trash2 } from 'lucide-react';

interface Props { hex: string; }

interface Node { id: number; value: number; next: number | null; x: number; y: number; }

const LinkedListLab: React.FC<Props> = ({ hex }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const timeRef = useRef(0);
  const [nodes, setNodes] = useState<Node[]>([
    { id: 1, value: 10, next: 2, x: 60, y: 180 },
    { id: 2, value: 20, next: 3, x: 180, y: 180 },
    { id: 3, value: 30, next: 4, x: 300, y: 180 },
    { id: 4, value: 40, next: null, x: 420, y: 180 },
  ]);
  const [nextId, setNextId] = useState(5);
  const [insertVal, setInsertVal] = useState('');
  const [insertPos, setInsertPos] = useState(0);
  const [highlighted, setHighlighted] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [traverseIdx, setTraverseIdx] = useState(-1);
  const [traversing, setTraversing] = useState(false);

  const draw = useCallback(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);
    timeRef.current += 0.04;
    const t = timeRef.current;

    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, '#020817'); bg.addColorStop(1, '#0f172a');
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

    // HEAD label
    if (nodes.length > 0) {
      ctx.fillStyle = '#60a5fa'; ctx.font = 'bold 10px'; ctx.textAlign = 'center';
      ctx.fillText('HEAD', nodes[0].x, nodes[0].y - 35);
      ctx.beginPath(); ctx.moveTo(nodes[0].x, nodes[0].y - 28); ctx.lineTo(nodes[0].x, nodes[0].y - 18);
      ctx.strokeStyle = '#60a5fa'; ctx.lineWidth = 1.5; ctx.stroke();
      // Arrowhead
      ctx.beginPath(); ctx.moveTo(nodes[0].x, nodes[0].y - 12); ctx.lineTo(nodes[0].x - 4, nodes[0].y - 20); ctx.lineTo(nodes[0].x + 4, nodes[0].y - 20); ctx.closePath();
      ctx.fillStyle = '#60a5fa'; ctx.fill();
    }

    // NULL tail
    if (nodes.length > 0) {
      const last = nodes[nodes.length - 1];
      ctx.fillStyle = '#ef4444'; ctx.font = 'bold 10px'; ctx.textAlign = 'left';
      ctx.fillText('NULL', last.x + 55, last.y + 4);
      ctx.beginPath(); ctx.moveTo(last.x + 40, last.y); ctx.lineTo(last.x + 55, last.y);
      ctx.strokeStyle = '#ef4444'; ctx.lineWidth = 1; ctx.setLineDash([3,3]); ctx.stroke(); ctx.setLineDash([]);
    }

    // Arrows between nodes
    nodes.forEach((node, i) => {
      if (node.next !== null && i < nodes.length - 1) {
        const next = nodes[i + 1];
        const sx = node.x + 38, sy = node.y, ex = next.x - 38, ey = next.y;
        // Animated dot along arrow
        const dot = { x: sx + ((t * 30) % (ex - sx)), y: sy };
        ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(ex, ey);
        ctx.strokeStyle = traverseIdx === i ? '#3b82f6' : '#334155'; ctx.lineWidth = 2; ctx.stroke();
        // Arrowhead
        ctx.beginPath(); ctx.moveTo(ex, ey); ctx.lineTo(ex - 8, ey - 5); ctx.lineTo(ex - 8, ey + 5); ctx.closePath();
        ctx.fillStyle = traverseIdx === i ? '#3b82f6' : '#334155'; ctx.fill();
        // Dot
        ctx.beginPath(); ctx.arc(dot.x, dot.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = traverseIdx === i ? '#93c5fd' : '#475569'; ctx.fill();
      }
    });

    // Draw nodes
    nodes.forEach((node, i) => {
      const isHighlighted = highlighted === node.id || traverseIdx === i;
      const isDeleting = deleteId === node.id;
      const nodeColor = isDeleting ? '#ef4444' : isHighlighted ? '#3b82f6' : '#1e3a5f';
      const borderColor = isDeleting ? '#ef4444' : isHighlighted ? '#60a5fa' : '#334155';

      // Node box — two sections (data | next pointer)
      const bw = 75, bh = 40;
      const bx = node.x - bw / 2, by = node.y - bh / 2;

      // Shadow/glow
      if (isHighlighted) {
        ctx.shadowColor = '#3b82f6'; ctx.shadowBlur = 15;
      }

      // Data section
      ctx.beginPath(); ctx.roundRect(bx, by, bw * 0.6, bh, [6, 0, 0, 6]);
      ctx.fillStyle = nodeColor; ctx.fill();
      ctx.strokeStyle = borderColor; ctx.lineWidth = 1.5; ctx.stroke();

      // Pointer section
      ctx.beginPath(); ctx.roundRect(bx + bw * 0.6, by, bw * 0.4, bh, [0, 6, 6, 0]);
      ctx.fillStyle = isHighlighted ? '#1d4ed8' : '#0f172a'; ctx.fill();
      ctx.strokeStyle = borderColor; ctx.lineWidth = 1.5; ctx.stroke();

      ctx.shadowBlur = 0;

      // Data value
      ctx.fillStyle = '#f8fafc'; ctx.font = 'bold 15px monospace'; ctx.textAlign = 'center';
      ctx.fillText(String(node.value), bx + bw * 0.3, by + bh / 2 + 5);

      // Pointer arrow symbol
      ctx.fillStyle = '#94a3b8'; ctx.font = '12px'; ctx.textAlign = 'center';
      ctx.fillText(node.next ? '→' : 'Ø', bx + bw * 0.8, by + bh / 2 + 5);

      // Index label
      ctx.fillStyle = '#475569'; ctx.font = '9px'; ctx.textAlign = 'center';
      ctx.fillText(`[${i}]`, node.x, by - 6);
    });

    animRef.current = requestAnimationFrame(draw);
  }, [nodes, highlighted, deleteId, traverseIdx, traversing]);

  useEffect(() => {
    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [draw]);

  const insertNode = () => {
    const val = parseInt(insertVal);
    if (isNaN(val)) return;
    const newNode: Node = { id: nextId, value: val, next: null, x: 0, y: 180 };
    setNextId(n => n + 1);
    setNodes(prev => {
      const pos = Math.min(insertPos, prev.length);
      const arr = [...prev];
      arr.splice(pos, 0, newNode);
      // Reassign x positions
      return arr.map((n2, i) => ({ ...n2, x: 60 + i * 120, next: i < arr.length - 1 ? arr[i + 1].id : null }));
    });
    setInsertVal('');
    setHighlighted(newNode.id);
    setTimeout(() => setHighlighted(null), 1500);
  };

  const deleteNode = (id: number) => {
    setDeleteId(id);
    setTimeout(() => {
      setDeleteId(null);
      setNodes(prev => {
        const arr = prev.filter(n2 => n2.id !== id);
        return arr.map((n2, i) => ({ ...n2, x: 60 + i * 120, next: i < arr.length - 1 ? arr[i + 1].id : null }));
      });
    }, 800);
  };

  const traverse = () => {
    setTraversing(true);
    let idx = 0;
    const step = () => {
      if (idx < nodes.length) {
        setTraverseIdx(idx++);
        setTimeout(step, 600);
      } else {
        setTraverseIdx(-1);
        setTraversing(false);
      }
    };
    step();
  };

  return (
    <div className="flex flex-col md:flex-row h-full w-full bg-slate-950">
      <div className="flex-1 flex items-center justify-center p-4 overflow-auto">
        <canvas ref={canvasRef} width={520} height={340} className="rounded-2xl border border-white/10 shadow-2xl" style={{ maxWidth: '100%' }} />
      </div>

      <div className="w-full md:w-72 bg-slate-900 border-l border-white/5 flex flex-col">
        <div className="p-4 border-b border-white/5">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-1">CS Lab — cs6</p>
          <h2 className="text-xl font-bold text-white">Linked List</h2>
          <p className="text-xs text-slate-400 mt-1">Singly linked list — insertion, deletion, traversal</p>
        </div>
        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-3 text-xs">
            <p className="text-blue-200">Each node has a <strong>data</strong> field and a <strong>→ pointer</strong> to the next node. Last node points to NULL.</p>
          </div>

          {/* Insert */}
          <div className="space-y-2">
            <p className="text-[10px] text-slate-400 uppercase font-bold">Insert Node</p>
            <div className="flex gap-2">
              <input type="number" placeholder="Value" value={insertVal} onChange={e => setInsertVal(e.target.value)}
                className="flex-1 bg-slate-950 border border-white/15 rounded-xl px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-blue-500" />
              <input type="number" placeholder="At pos" value={insertPos} onChange={e => setInsertPos(Number(e.target.value))}
                className="w-20 bg-slate-950 border border-white/15 rounded-xl px-2 py-2 text-sm text-white font-mono focus:outline-none focus:border-blue-500" min={0} max={nodes.length} />
            </div>
            <button onClick={insertNode} disabled={!insertVal}
              className="w-full py-2.5 rounded-xl font-bold text-white disabled:opacity-40 flex items-center justify-center gap-2"
              style={{ backgroundColor: hex }}>
              <Plus size={14} /> Insert
            </button>
          </div>

          {/* Node list */}
          <div className="space-y-1.5">
            <p className="text-[10px] text-slate-400 uppercase font-bold">Current Nodes ({nodes.length})</p>
            {nodes.map((node, i) => (
              <div key={node.id}
                className={`flex items-center justify-between p-2 rounded-xl border text-xs transition-all ${traverseIdx === i ? 'border-blue-500/60 bg-blue-500/10' : 'border-white/10'}`}>
                <span className="text-slate-400">[{i}]</span>
                <span className="font-mono font-bold text-white">{node.value}</span>
                <span className="text-slate-500">{node.next ? `→[${i + 1}]` : '→NULL'}</span>
                <button onClick={() => deleteNode(node.id)} className="text-red-400 hover:text-red-300 transition-all">
                  <Trash2 size={12} />
                </button>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <button onClick={traverse} disabled={traversing || nodes.length === 0}
              className="flex-1 py-2.5 rounded-xl font-bold text-white text-sm disabled:opacity-40 flex items-center justify-center gap-1.5 bg-indigo-700">
              <Play size={13} /> Traverse
            </button>
            <button onClick={() => { setNodes([{id:1,value:10,next:2,x:60,y:180},{id:2,value:20,next:3,x:180,y:180},{id:3,value:30,next:4,x:300,y:180},{id:4,value:40,next:null,x:420,y:180}]); setNextId(5); setTraverseIdx(-1); }}
              className="px-3 py-2.5 rounded-xl bg-slate-800 text-slate-400 hover:text-red-400">
              <RotateCcw size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkedListLab;
