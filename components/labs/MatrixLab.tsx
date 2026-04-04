import React, { useState, useCallback, useRef, useEffect } from 'react';
import { RotateCcw } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Box, Grid, Edges, Text, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

interface Props { hex: string; }

type Matrix = number[][];

// --- 3D Visualizer Component for Matrices ---
const MatrixVisualizer3D: React.FC<{ transformMatrix: Matrix | null }> = ({ transformMatrix }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  // Create target Matrix4 from the 2x2 or 3x3 2D array
  const targetMatrix = new THREE.Matrix4();
  if (transformMatrix && Array.isArray(transformMatrix)) {
    const r = transformMatrix;
    const is3x3 = r.length === 3 && r[0].length === 3;
    const is2x2 = r.length === 2 && r[0].length === 2;
    
    if (is3x3) {
      targetMatrix.set(
        r[0][0], r[0][1], r[0][2], 0,
        r[1][0], r[1][1], r[1][2], 0,
        r[2][0], r[2][1], r[2][2], 0,
        0, 0, 0, 1
      );
    } else if (is2x2) {
      targetMatrix.set(
        r[0][0], r[0][1], 0, 0,
        r[1][0], r[1][1], 0, 0,
        0,       0,       1, 0,
        0,       0,       0, 1
      );
    }
  } else {
    targetMatrix.identity(); // default to identity
  }

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Lerp custom matrix (since we set matrixAutoUpdate = false on the group to prevent override)
      const currentMatrix = groupRef.current.matrix;
      
      // Simple matrix interpolation (not perfect for all rotations, but works for linear transformations)
      const elements = currentMatrix.elements;
      const targetElements = targetMatrix.elements;
      for (let i = 0; i < 16; i++) {
        elements[i] += (targetElements[i] - elements[i]) * 5 * delta;
      }
      groupRef.current.matrix.elements = elements;
      groupRef.current.matrixAutoUpdate = false; // Important to prevent Threejs from overriding our manual matrix!
    }
  });

  return (
    <>
      <Grid infiniteGrid fadeDistance={20} sectionColor="#475569" cellColor="#1e293b" />
      
      {/* Target object being deformed by the matrix */}
      <group position={[0,0,0]}>
        <group ref={groupRef}>
          <Box args={[2, 2, 2]}>
            <meshPhysicalMaterial color="#8b5cf6" transmission={0.5} opacity={0.8} transparent roughness={0.1} metalness={0.2} />
            <Edges scale={1} threshold={15} color="white" />
          </Box>
          {/* Axis indicators inside the deformed group */}
          <group position={[0,0,0]}>
            {/* X-axis segment */}
            <mesh position={[1, 0, 0]}>
              <cylinderGeometry args={[0.05, 0.05, 2]} />
              <meshBasicMaterial color="#ef4444" />
            </mesh>
            <Text position={[2.5, 0, 0]} fontSize={0.5} color="#ef4444" anchorX="center" anchorY="middle">X</Text>
            
            {/* Y-axis segment */}
            <mesh position={[0, 1, 0]} rotation={[0, 0, Math.PI/2]}>
              <cylinderGeometry args={[0.05, 0.05, 2]} />
              <meshBasicMaterial color="#22c55e" />
            </mesh>
            <Text position={[0, 2.5, 0]} fontSize={0.5} color="#22c55e" anchorX="center" anchorY="middle">Y</Text>
            
            {/* Z-axis segment */}
            <mesh position={[0, 0, 1]} rotation={[Math.PI/2, 0, 0]}>
              <cylinderGeometry args={[0.05, 0.05, 2]} />
              <meshBasicMaterial color="#3b82f6" />
            </mesh>
            <Text position={[0, 0, 2.5]} fontSize={0.5} color="#3b82f6" anchorX="center" anchorY="middle">Z</Text>
          </group>
        </group>
      </group>
    </>
  );
};

// ---------------------------------------------

const MatrixLab: React.FC<Props> = ({ hex }) => {
  const [sizeA, setSizeA] = useState({ r: 2, c: 2 });
  const [sizeB, setSizeB] = useState({ r: 2, c: 2 });
  const [matA, setMatA] = useState<Matrix>([[1,2],[3,4]]);
  const [matB, setMatB] = useState<Matrix>([[5,6],[7,8]]);
  const [operation, setOperation] = useState<'add'|'multiply'|'transpose'|'determinant'|'inverse'>('multiply');
  const [result, setResult] = useState<Matrix | number | null>(null);
  const [error, setError] = useState('');

  const updateCell = (mat: Matrix, setMat: (m: Matrix) => void, r: number, c: number, val: string) => {
    const copy = mat.map(row => [...row]);
    copy[r][c] = parseFloat(val) || 0;
    setMat(copy);
    setResult(null);
  };

  const det2x2 = (m: Matrix) => m[0][0]*m[1][1] - m[0][1]*m[1][0];
  const det3x3 = (m: Matrix) => m[0][0]*(m[1][1]*m[2][2]-m[1][2]*m[2][1]) - m[0][1]*(m[1][0]*m[2][2]-m[1][2]*m[2][0]) + m[0][2]*(m[1][0]*m[2][1]-m[1][1]*m[2][0]);

  const compute = useCallback(() => {
    setError('');
    setResult(null);
    try {
      if (operation === 'add') {
        if (sizeA.r !== sizeB.r || sizeA.c !== sizeB.c) { setError('Matrices must have same dimensions for addition'); return; }
        setResult(matA.map((row, r) => row.map((v, c) => v + matB[r][c])));
      } else if (operation === 'multiply') {
        if (sizeA.c !== sizeB.r) { setError(`A columns (${sizeA.c}) must equal B rows (${sizeB.r})`); return; }
        const res: Matrix = Array.from({length: sizeA.r}, () => Array(sizeB.c).fill(0));
        for (let i = 0; i < sizeA.r; i++) for (let j = 0; j < sizeB.c; j++) for (let k = 0; k < sizeA.c; k++)
          res[i][j] += matA[i][k] * matB[k][j];
        setResult(res);
      } else if (operation === 'transpose') {
        setResult(matA[0].map((_, ci) => matA.map(row => row[ci])));
      } else if (operation === 'determinant') {
        if (sizeA.r !== sizeA.c) { setError('Determinant requires square matrix'); return; }
        if (sizeA.r === 2) setResult(det2x2(matA));
        else if (sizeA.r === 3 && matA.length === 3) setResult(det3x3(matA));
        else setError('Determinant supported for 2×2 and 3×3');
      } else if (operation === 'inverse') {
        if (sizeA.r !== 2 || sizeA.c !== 2) { setError('Inverse shown for 2×2 only'); return; }
        const d = det2x2(matA);
        if (Math.abs(d) < 1e-10) { setError('Matrix is singular (det=0)'); return; }
        setResult([[matA[1][1]/d, -matA[0][1]/d],[-matA[1][0]/d, matA[0][0]/d]]);
      }
    } catch { setError('Calculation error'); }
  }, [operation, matA, matB, sizeA, sizeB]);

  const makeMatrix = (rows: number, cols: number): Matrix => Array.from({length:rows}, () => Array(cols).fill(0));

  const resizeA = (r: number, c: number) => { setSizeA({r,c}); setMatA(makeMatrix(r,c)); };
  const resizeB = (r: number, c: number) => { setSizeB({r,c}); setMatB(makeMatrix(r,c)); };

  const MatrixInput = ({ mat, setMat, label, color }: { mat: Matrix; setMat: (m: Matrix) => void; label: string; color: string }) => (
    <div className="space-y-1.5 p-3 rounded-xl bg-black/20 border border-white/5 backdrop-blur-md">
      <p className="text-[10px] uppercase font-bold tracking-widest" style={{ color }}>{label}</p>
      <div className="space-y-1.5">
        {mat.map((row, r) => (
          <div key={r} className="flex gap-1.5 justify-center">
            {row.map((val, c) => (
              <input key={c} type="number" value={val === 0 && val.toString() === "0" ? "" : val} onChange={e => updateCell(mat, setMat, r, c, e.target.value)}
                placeholder="0"
                className="w-14 h-10 bg-slate-900 border border-white/10 opacity-80 hover:opacity-100 rounded-lg text-center text-sm font-mono font-bold text-white focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/20 transition-all shadow-inner" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );

  const MatrixDisplay = ({ mat }: { mat: Matrix }) => (
    <div className="flex gap-3 items-center justify-center p-4 bg-green-500/5 rounded-2xl border border-green-500/20 backdrop-blur-lg">
      <div className="text-4xl text-green-500/40 font-thin">[</div>
      <div className="space-y-1.5">
        {mat.map((row, r) => (
          <div key={r} className="flex gap-1.5">
            {row.map((v, c) => (
              <div key={c} className="w-16 h-10 bg-black/40 border border-green-500/30 rounded-lg flex items-center justify-center text-sm font-mono font-bold text-green-400 shadow-[inset_0_2px_10px_rgba(34,197,94,0.1)]">
                {typeof v === 'number' ? (Number.isInteger(v) ? v : v.toFixed(2)) : v}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="text-4xl text-green-500/40 font-thin">]</div>
    </div>
  );

  // Identify if result is a valid transformation matrix to visualize
  const transformToVisualize = (Array.isArray(result) && result.length > 0) 
    ? result 
    : (operation === 'determinant' || operation === 'inverse' || operation === 'transpose') ? matA : null;

  return (
    <div className="flex flex-col md:flex-row h-full w-full bg-[#030712] text-slate-200">
      
      {/* Left Area - Mixed UI and 3D Canvas */}
      <div className="flex-1 relative flex flex-col">
        {/* Background 3D Canvas rendering the current Matrix Transform */}
        <div className="absolute inset-0 z-0">
          <Canvas shadows camera={{ position: [5, 5, 8], fov: 40 }}>
            <color attach="background" args={['#030712']} />
            <ambientLight intensity={0.4} />
            <directionalLight position={[10, 10, 5]} intensity={1} castShadow shadow-bias={-0.0001} />
            <pointLight position={[-10, 5, -10]} intensity={1} color="#a855f7" />
            <Environment preset="city" />
            
            <MatrixVisualizer3D transformMatrix={transformToVisualize} />
            
            <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={20} blur={2} />
            <OrbitControls minPolarAngle={0} maxPolarAngle={Math.PI / 2 + 0.2} minDistance={5} maxDistance={20} />
          </Canvas>
          <div className="absolute bottom-4 left-4 text-[10px] text-slate-500 uppercase font-bold tracking-widest bg-black/40 px-3 py-1 rounded-full backdrop-blur-md">
            Linear Transformation Space
          </div>
        </div>

        {/* Foreground Glass UI Overlay for Matrix Building */}
        <div className="absolute inset-x-0 top-0 z-10 pointer-events-none flex flex-col items-center pt-8">
          
          <div className="text-center mb-6 drop-shadow-lg">
            <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] text-purple-400 uppercase font-bold tracking-widest backdrop-blur-md">Math Lab — M10</span>
            <h2 className="text-3xl font-black text-white mt-3 drop-shadow-md">Matrix Operations</h2>
          </div>

          <div className="flex flex-wrap justify-center gap-8 px-8 pointer-events-auto w-full max-w-4xl">
            {/* MATRIX A */}
            <div className="space-y-2 flex-1 min-w-[200px]">
              <div className="flex justify-between items-center bg-black/40 px-3 py-2 rounded-t-xl border-b border-white/10">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Dimensions A</span>
                <div className="flex gap-1">
                  {[2,3].map(r => [2,3].map(c => (
                    <button key={`${r}x${c}`} onClick={() => resizeA(r,c)}
                      className={`px-1.5 py-0.5 rounded text-[9px] font-bold transition-all ${sizeA.r===r&&sizeA.c===c?'bg-blue-600 text-white shadow-[0_0_10px_rgba(37,99,235,0.5)]':'bg-slate-800/50 text-slate-400 hover:bg-slate-700'}`}>
                      {r}×{c}
                    </button>
                  )))}
                </div>
              </div>
              <MatrixInput mat={matA} setMat={m => { setMatA(m); setResult(null); }} label="Matrix A" color="#60a5fa" />
            </div>

            {/* MATRIX B (if relevant) */}
            {!['transpose','determinant','inverse'].includes(operation) && (
              <div className="space-y-2 flex-1 min-w-[200px]">
                <div className="flex justify-between items-center bg-black/40 px-3 py-2 rounded-t-xl border-b border-white/10">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Dimensions B</span>
                  <div className="flex gap-1">
                    {[2,3].map(r => [2,3].map(c => (
                      <button key={`${r}x${c}`} onClick={() => resizeB(r,c)}
                        className={`px-1.5 py-0.5 rounded text-[9px] font-bold transition-all ${sizeB.r===r&&sizeB.c===c?'bg-purple-600 text-white shadow-[0_0_10px_rgba(147,51,234,0.5)]':'bg-slate-800/50 text-slate-400 hover:bg-slate-700'}`}>
                        {r}×{c}
                      </button>
                    )))}
                  </div>
                </div>
                <MatrixInput mat={matB} setMat={m => { setMatB(m); setResult(null); }} label="Matrix B" color="#c084fc" />
              </div>
            )}
          </div>
          
          {/* Results Overlay */}
          <div className="mt-8 pointer-events-auto">
            {error && <div className="bg-red-500/20 border border-red-500/40 backdrop-blur-xl shadow-2xl rounded-xl px-6 py-3 text-red-300 font-bold text-sm tracking-wide">{error}</div>}
            
            {result !== null && !error && (
              <div className="space-y-3 flex flex-col items-center">
                <span className="px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-[10px] text-green-400 uppercase font-bold tracking-widest backdrop-blur-md">Calculation Result</span>
                
                {typeof result === 'number' ? (
                  <div className="bg-black/60 backdrop-blur-2xl border border-green-500/30 rounded-3xl px-12 py-8 shadow-[0_10px_40px_rgba(0,0,0,0.8),inset_0_0_20px_rgba(34,197,94,0.1)]">
                    <p className="text-6xl font-black font-mono text-green-400 tracking-tighter drop-shadow-md">{result.toFixed(2)}</p>
                    <p className="text-xs text-slate-400 mt-2 text-center uppercase tracking-widest">det(A)</p>
                  </div>
                ) : Array.isArray(result) ? (
                  <MatrixDisplay mat={result} />
                ) : null}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Right Control Panel */}
      <div className="w-full md:w-72 bg-black/40 border-l border-white/10 flex flex-col z-20 shrink-0 backdrop-blur-3xl shadow-[-20px_0_50px_rgba(0,0,0,0.5)]">
        <div className="p-5 border-b border-white/5 bg-white/[0.02]">
          <p className="text-[10px] font-bold uppercase tracking-widest text-purple-400 mb-1 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse"></span>
            Linear Algebra
          </p>
          <h2 className="text-xl font-bold text-white tracking-tight">Operations</h2>
        </div>
        
        <div className="flex-1 p-5 space-y-5 overflow-y-auto">
          <div className="space-y-2.5">
            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Select Transformation</p>
            {([
              ['multiply','A × B','A cols = B rows (Composite transform)'],
              ['add','A + B','Same dimensions (Translation)'],
              ['transpose','Aᵀ','Flip rows & cols (Reflection)'],
              ['determinant','det(A)','Square matrix only (Volume scaling factor)'],
              ['inverse','A⁻¹','2×2 only (Reverse transformation)']
            ] as const).map(([op,label,note]) => (
              <button key={op} onClick={() => { setOperation(op); setResult(null); setError(''); }}
                className={`w-full p-3 rounded-xl text-left border transition-all ${operation === op 
                  ? 'border-purple-500/50 bg-gradient-to-r from-purple-500/20 to-transparent shadow-[0_0_15px_rgba(168,85,247,0.15)]' 
                  : 'border-white/5 hover:border-white/20 bg-white/[0.01] hover:bg-white/[0.05]'}`}>
                <p className="font-bold text-sm tracking-wide" style={{ color: operation === op ? '#c084fc' : '#cbd5e1' }}>{label}</p>
                <p className="text-slate-500 text-[10px] mt-0.5 leading-tight">{note}</p>
              </button>
            ))}
          </div>

          <button onClick={compute}
            className="w-full py-4 rounded-xl font-bold text-white shadow-xl transition-all active:scale-95 flex justify-center items-center gap-2 group"
            style={{ backgroundImage: `linear-gradient(135deg, ${hex}, #4c1d95)` }}>
            <span className="group-hover:scale-110 transition-transform">=</span> Calculate
          </button>

          <button onClick={() => { setMatA([[1,2],[3,4]]); setMatB([[5,6],[7,8]]); setResult(null); setError(''); setSizeA({r:2,c:2}); setSizeB({r:2,c:2}); }}
            className="w-full py-3 rounded-xl bg-white/5 text-slate-400 text-xs flex items-center justify-center gap-2 border border-white/5 hover:bg-red-500/10 hover:text-red-300 hover:border-red-500/30 transition-all">
            <RotateCcw size={14} /> Reset Matrices
          </button>

          <div className="bg-[#0f172a] p-4 rounded-2xl border border-white/5 text-xs space-y-2 shadow-inner">
            <p className="text-slate-500 font-bold text-[9px] uppercase tracking-widest mb-3">Geometric Meaning</p>
            {[['Matrix','Transforms Grid'],['det(A)','Area/Volume Scale'],['A⁻¹','Reverses previous'],['Identity','No Change']].map(([k,v]) => (
              <div key={k} className="flex justify-between items-center border-b border-white/5 pb-2 last:border-0 last:pb-0">
                <span className="font-mono text-purple-300 bg-purple-900/30 px-1.5 py-0.5 rounded text-[10px]">{k}</span>
                <span className="text-slate-400 text-[10px]">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatrixLab;
