import React, { useState, useMemo } from 'react';
import { RotateCcw, Trash2 } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Line, Html } from '@react-three/drei';
import * as THREE from 'three';
import DraggableSlider from './DraggableSlider';

interface Props { hex: string; }
interface Reading { i: number; r: number; e: number; D: number; }

function toRad(d: number) { return d * Math.PI / 180; }
function toDeg(r: number) { return r * 180 / Math.PI; }

const PrismScene = ({ angleI, mu }: { angleI: number, mu: number }) => {
  const A = 60; 
  const side = 4;
  const h = side * Math.sqrt(3) / 2;
  
  // Custom triangular prism geometry
  const prismGeo = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, h / 2);
    shape.lineTo(-side / 2, -h / 2);
    shape.lineTo(side / 2, -h / 2);
    shape.lineTo(0, h / 2);
    const extrudeSettings = { depth: 2, bevelEnabled: true, bevelSegments: 2, steps: 1, bevelSize: 0.03, bevelThickness: 0.03 };
    const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geo.center();
    return geo;
  }, [side, h]);

  // Ray Math
  const r1 = toDeg(Math.asin(Math.sin(toRad(angleI)) / mu));
  const r2 = A - r1; 
  const e = toDeg(Math.asin(mu * Math.sin(toRad(r2))));
  const validEmergence = r2 < 90 && !isNaN(e);

  // Points for 3D Ray
  const leftFaceNormalAngle = toRad(150); // Face from apex(0,h/2) to left(-s/2,-h/2). Normal points out to top-left.
  // Intersection point on left face (let's fix it slightly below apex)
  const hit1Y = 0.5;
  // Left face equation: passes through (0, h/2) and (-side/2, -h/2).
  // dx = -side/2, dy = -h.  Slope m = -h / (-side/2) = 2h/side = sqrt(3)
  // y - h/2 = sqrt(3) * x  => x = (y - h/2) / sqrt(3)
  const hit1X = (hit1Y - Math.sqrt(3)) / Math.sqrt(3);

  const hit1 = new THREE.Vector3(hit1X, hit1Y, 0);

  // Incident ray
  const incidentLen = 4;
  const rayInAngle = leftFaceNormalAngle + toRad(angleI);
  const pStart = new THREE.Vector3(
    hit1.x + Math.cos(rayInAngle) * incidentLen,
    hit1.y + Math.sin(rayInAngle) * incidentLen,
    0
  );

  // Refracted ray
  const insideAngle = leftFaceNormalAngle + toRad(180 - r1);
  // Find intersection with right face. Right face: y - sqrt(3) = -sqrt(3)x  => y = -sqrt(3)x + sqrt(3)
  // Ray inside: y - hit1.y = tan(insideAngle) * (x - hit1.x)
  let hit2 = new THREE.Vector3(0, 0, 0);
  if (validEmergence) {
    const m1 = Math.tan(insideAngle);
    const m2 = -Math.sqrt(3);
    const c1 = hit1.y - m1 * hit1.x;
    const c2 = h / 2; // actual intercept is h/2 (Wait, apex is at y=h/2, x=0. So c2 = h/2)
    // Actually right face passes through (0, h/2) and (side/2, -h/2).
    // slope m = -h / (side/2) = -sqrt(3). Eq: y - h/2 = -sqrt(3)*x => y = -sqrt(3)x + h/2. (c2 = h/2)
    const xIntersect = (h / 2 - c1) / (m1 + Math.sqrt(3));
    const yIntersect = m1 * xIntersect + c1;
    hit2.set(xIntersect, yIntersect, 0);
  }

  // Emergent ray
  const rightFaceNormalAngle = toRad(30);
  const rayOutAngle = rightFaceNormalAngle - toRad(e);
  const pEnd = new THREE.Vector3(
    hit2.x + Math.cos(rayOutAngle) * incidentLen,
    hit2.y + Math.sin(rayOutAngle) * incidentLen,
    0
  );

  return (
    <group position={[0, -0.5, 0]}>
      {/* Prism */}
      <mesh geometry={prismGeo} position={[0, 0, 0]} castShadow receiveShadow>
        <meshPhysicalMaterial 
          transmission={0.9} 
          thickness={2.0} 
          roughness={0.05} 
          ior={mu} 
          clearcoat={1}
          color="#e0f2fe"
        />
      </mesh>

      {/* Incident Ray */}
      <Line points={[pStart, hit1]} color="#fbbf24" lineWidth={3} />
      <Line points={[pStart, hit1]} color="#ffffff" lineWidth={1} />
      
      {/* Inside Ray */}
      {validEmergence && (
        <Line points={[hit1, hit2]} color="#818cf8" lineWidth={2} />
      )}

      {/* Emergent Ray */}
      {validEmergence && (
        <>
          <Line points={[hit2, pEnd]} color="#4ade80" lineWidth={3} />
          <Line points={[hit2, pEnd]} color="#ffffff" lineWidth={1} />
        </>
      )}

      {/* Labels */}
      <Html position={[hit1.x - 1, hit1.y + 0.5, 0]}>
        <div className="text-yellow-400 font-bold px-1.5 py-0.5 rounded bg-black/50 text-[10px] whitespace-nowrap backdrop-blur-sm border border-yellow-500/30">
          i = {angleI}°
        </div>
      </Html>
      {validEmergence && (
        <>
          <Html position={[hit1.x + 0.3, hit1.y - 0.2, 0]}>
            <div className="text-indigo-300 font-bold px-1 py-0.5 rounded bg-black/30 text-[9px] backdrop-blur-sm">
              r₁ = {r1.toFixed(1)}°
            </div>
          </Html>
          <Html position={[hit2.x + 1, hit2.y - 0.5, 0]}>
            <div className="text-green-400 font-bold px-1.5 py-0.5 rounded bg-black/50 text-[10px] whitespace-nowrap backdrop-blur-sm border border-green-500/30">
              e = {e.toFixed(1)}°
            </div>
          </Html>
        </>
      )}
      {!validEmergence && (
        <Html position={[0, -h/2 - 0.5, 0]} center>
          <div className="text-red-400 font-bold px-3 py-1 rounded bg-red-900/40 text-xs backdrop-blur-sm border border-red-500/50">
            TIR (Total Internal Reflection)
          </div>
        </Html>
      )}
    </group>
  );
};

const PrismLab: React.FC<Props> = ({ hex }) => {
  const [angleI, setAngleI] = useState(45); 
  const [mu, setMu] = useState(1.5); 
  const [readings, setReadings] = useState<Reading[]>([]);
  const A = 60; 

  const r1 = toDeg(Math.asin(Math.sin(toRad(angleI)) / mu));
  const r2 = A - r1; 
  const e = toDeg(Math.asin(mu * Math.sin(toRad(r2)))); 
  const D = angleI + e - A; 
  const Dm = toDeg(2 * Math.asin(mu * Math.sin(toRad(A / 2))) - A);
  const validEmergence = r2 < 90 && !isNaN(e);

  const logReading = () => {
    if (validEmergence) {
      setReadings(prev => [...prev, { i: angleI, r: r1, e, D }]);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-full w-full bg-slate-950">
      <div className="flex-1 relative rounded-2xl overflow-hidden m-4 border border-white/10 shadow-2xl">
        <Canvas camera={{ position: [0, 0, 7], fov: 50 }}>
          <Environment preset="city" />
          <ambientLight intensity={0.5} />
          <pointLight position={[5, 10, 5]} intensity={1.5} />
          <pointLight position={[-5, -10, -5]} intensity={0.5} color="#818cf8" />
          
          <PrismScene angleI={angleI} mu={mu} />
          
          <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={10} blur={2} far={4} color={hex} />
          <OrbitControls enablePan={true} enableZoom={true} maxPolarAngle={Math.PI / 2 + 0.2} minPolarAngle={0} />
        </Canvas>

        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3 shadow-xl max-w-xs">
          <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 mb-1">Physics Lab — p8</p>
          <p className="text-white font-bold text-sm">3D Glass Prism</p>
          <p className="text-xs text-slate-400 mt-1">Determine refractive index via minimum deviation. Rotate to explore 3D ray tracing.</p>
        </div>
      </div>

      <div className="w-full md:w-72 bg-slate-900 border-l border-white/5 flex flex-col z-10">
        <div className="p-5 border-b border-white/5">
          <h2 className="text-lg font-black text-white">Controls</h2>
        </div>
        <div className="flex-1 p-5 space-y-5 overflow-y-auto">
          <div className="bg-indigo-500/10 border border-indigo-500/30 p-3 rounded-xl shadow-inner">
            <p className="text-indigo-200 text-xs leading-relaxed">Adjust the angle of incidence (i). At minimum deviation, the ray inside is parallel to the base, and r₁ = r₂ = A/2.</p>
          </div>

          <DraggableSlider label="Angle of Incidence (i)" min={30} max={80} value={angleI} onChange={setAngleI} color="#fbbf24" unit="°" />
          <DraggableSlider label="Refractive Index (μ)" min={1.3} max={1.9} step={0.01} value={mu} onChange={setMu} color="#a78bfa" formatValue={v => v.toFixed(2)} />

          <div className="grid grid-cols-2 gap-2">
            {[
              { label: 'i (°)', val: angleI, color: '#fbbf24' },
              { label: 'r₁ (°)', val: r1.toFixed(2), color: '#a78bfa' },
              { label: 'r₂ (°)', val: r2.toFixed(2), color: '#a78bfa' },
              { label: 'e (°)', val: validEmergence ? e.toFixed(2) : 'TIR', color: '#4ade80' },
              { label: 'D (°)', val: validEmergence ? D.toFixed(2) : '—', color: '#f472b6' },
              { label: 'Dmin (°)', val: Dm.toFixed(2), color: '#fb923c' },
            ].map(m => (
              <div key={m.label} className="bg-slate-950/50 border border-white/5 rounded-xl p-2.5 text-center shadow-sm">
                <div className="text-[9px] text-slate-500 uppercase font-bold tracking-wider mb-1">{m.label}</div>
                <div className="font-mono font-bold text-sm" style={{ color: m.color }}>{m.val}</div>
              </div>
            ))}
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-white/5 shadow-inner text-xs space-y-1.5">
            <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-2 border-b border-white/5 pb-1">Formulae</p>
            <p className="font-mono text-indigo-400">μ = sin((A+Dₘ)/2) / sin(A/2)</p>
            <p className="font-mono text-indigo-400">D = i + e - A</p>
            <p className="font-mono text-indigo-400">r₁ + r₂ = A</p>
            <div className="h-0.5 bg-white/5 my-2" />
            <p className="font-mono text-green-400/90 font-bold">μ calculated = {(Math.sin(toRad((A + Dm) / 2)) / Math.sin(toRad(A / 2))).toFixed(4)}</p>
          </div>

          <div className="flex gap-2 pt-2">
            <button onClick={logReading} disabled={!validEmergence}
              className="flex-1 py-3 rounded-xl text-sm font-bold text-white transition-all active:scale-95 disabled:opacity-40 disabled:scale-100 shadow-lg shadow-indigo-500/20"
              style={{ backgroundColor: hex }}>
              Log Reading
            </button>
            <button onClick={() => setReadings([])}
              className="px-4 py-3 rounded-xl bg-slate-800 text-red-400 hover:bg-red-900/30 hover:text-red-300 transition-colors">
              <RotateCcw size={16} />
            </button>
          </div>

          {readings.length > 0 && (
            <div className="overflow-x-auto text-xs bg-slate-950 rounded-xl border border-white/5 shadow-inner">
              <table className="w-full border-collapse">
                <thead><tr className="bg-slate-900/80 border-b border-white/10">
                  {['#', 'i°', 'e°', 'D°', ''].map(h => <th key={h} className="px-3 py-2 text-slate-400 text-left font-semibold">{h}</th>)}
                </tr></thead>
                <tbody>{readings.map((r, i) => (
                  <tr key={i} className="border-b border-white/5 last:border-b-0 hover:bg-white/5 transition-colors">
                    <td className="px-3 py-2 text-slate-500">{i + 1}</td>
                    <td className="px-3 py-2 font-mono text-yellow-400/90">{r.i}</td>
                    <td className="px-3 py-2 font-mono text-green-400/90">{r.e.toFixed(1)}</td>
                    <td className="px-3 py-2 font-mono text-pink-400 font-bold">{r.D.toFixed(2)}</td>
                    <td className="px-3 py-2 text-right">
                      <button onClick={() => setReadings(p => p.filter((_, j) => j !== i))} className="text-slate-600 hover:text-red-400 transition-colors">
                        <Trash2 size={12} />
                      </button>
                    </td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PrismLab;
