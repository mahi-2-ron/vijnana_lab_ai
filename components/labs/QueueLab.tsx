import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Box, Text, ContactShadows, Environment, Float } from '@react-three/drei';
import * as THREE from 'three';
import { RotateCcw, Plus, Minus, Eye, Layers } from 'lucide-react';

interface QueueLabProps {
  hex: string;
}

const MAX_SIZE = 8;
const COLORS = [
  '#2563eb', // blue-600
  '#9333ea', // purple-600
  '#db2777', // pink-600
  '#d97706', // amber-600
  '#059669', // emerald-600
  '#dc2626', // red-600
  '#0891b2', // cyan-600
  '#ea580c'  // orange-600
];

interface QueueItem {
  id: string;
  val: number;
  colorHex: string;
}

// --- 3D Components ---
const QueueItem3D: React.FC<{ item: QueueItem; index: number; isFront: boolean; isRear: boolean; highlightedFront: boolean; totalItems: number }> = ({ item, index, isFront, isRear, highlightedFront, totalItems }) => {
  const meshRef = useRef<THREE.Group>(null);
  
  // Position calculation (queue flows right to left: front is at left, rear is at right)
  // X = 0 is center. We center the whole queue block.
  const queueWidth = totalItems * 2.5;
  const startX = -(queueWidth / 2) + 1.25;
  const targetX = startX + (index * 2.5);

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Lerp to target position
      meshRef.current.position.x += (targetX - meshRef.current.position.x) * 10 * delta;
      
      const targetScale = (isFront && highlightedFront) ? 1.2 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 10 * delta);
    }
  });

  return (
    <group ref={meshRef} position={[targetX + 5, 0, 0]}>
      <Box args={[2, 2.8, 2]} castShadow receiveShadow>
        <meshPhysicalMaterial 
          color={item.colorHex} 
          transmission={0.3}
          thickness={1}
          roughness={0.1}
          metalness={0.2}
          clearcoat={1}
          emissive={isFront && highlightedFront ? item.colorHex : '#000000'}
          emissiveIntensity={0.6}
        />
        {/* Value Label */}
        <Text
          position={[0, 0, 1.01]}
          fontSize={1.2}
          color="white"
          anchorX="center"
          anchorY="middle"
          fontWeight="bold"
        >
          {item.val}
        </Text>
        {/* Index Label */}
        <Text
          position={[0, -1, 1.02]}
          fontSize={0.4}
          color="rgba(255,255,255,0.7)"
          anchorX="center"
          anchorY="middle"
        >
          [{index}]
        </Text>
      </Box>

      {/* FRONT indicator */}
      {isFront && (
        <Float speed={2} rotationIntensity={0} floatIntensity={0.2}>
          <Text position={[0, 2.5, 0]} fontSize={0.5} color="#4ade80" fontWeight="bold">↓ FRONT</Text>
        </Float>
      )}

      {/* REAR indicator */}
      {isRear && !isFront && (
        <Float speed={2} rotationIntensity={0} floatIntensity={0.2}>
          <Text position={[0, -2.5, 0]} fontSize={0.5} color="#60a5fa" fontWeight="bold">↑ REAR</Text>
        </Float>
      )}
    </group>
  );
};

const QueueTunnel3D: React.FC = () => {
  return (
    <group position={[0, -1.5, 0]}>
      {/* Floor / Belt */}
      <Box args={[MAX_SIZE * 2.5 + 4, 0.2, 4]} receiveShadow position={[0, 0, 0]}>
        <meshStandardMaterial color="#1e293b" roughness={0.8} />
      </Box>
      
      {/* Side rails */}
      <Box args={[MAX_SIZE * 2.5 + 4, 0.4, 0.2]} position={[0, 0.3, -1.9]}>
        <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={0.2} />
      </Box>
      <Box args={[MAX_SIZE * 2.5 + 4, 0.4, 0.2]} position={[0, 0.3, 1.9]}>
        <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={0.2} />
      </Box>

      {/* Entry/Exit Portals */}
      <Box args={[0.5, 4, 4.2]} position={[(MAX_SIZE * 2.5 + 4) / 2, 2, 0]} receiveShadow>
        <meshPhysicalMaterial color="#0f172a" transmission={0.5} opacity={0.8} transparent />
      </Box>
      <Box args={[0.5, 4, 4.2]} position={[-(MAX_SIZE * 2.5 + 4) / 2, 2, 0]} receiveShadow>
        <meshPhysicalMaterial color="#0f172a" transmission={0.5} opacity={0.8} transparent />
      </Box>

      <Text position={[-(MAX_SIZE * 2.5 + 4) / 2 - 1.5, 2, 0]} fontSize={0.6} color="#ef4444" anchorX="center" anchorY="middle">EXIT</Text>
      <Text position={[(MAX_SIZE * 2.5 + 4) / 2 + 1.5, 2, 0]} fontSize={0.6} color="#3b82f6" anchorX="center" anchorY="middle">ENTRY</Text>
    </group>
  );
};
// -----------------------

export default function QueueLab({ hex }: QueueLabProps) {
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [nextVal, setNextVal] = useState(1);
  const [message, setMessage] = useState('Workspace Ready. Enqueue an element to begin.');
  const [highlightedFront, setHighlightedFront] = useState(false);
  const [animating, setAnimating] = useState(false);

  const handleEnqueue = () => {
    if (animating) return;
    if (queue.length >= MAX_SIZE) {
      setMessage('⚠️ Queue Overflow! Cannot add more elements.');
      return;
    }
    const newItem = {
      id: `item-${Date.now()}-${nextVal}`,
      val: nextVal,
      colorHex: COLORS[(nextVal - 1) % COLORS.length]
    };
    
    setAnimating(true);
    setQueue(prev => [...prev, newItem]);
    setNextVal(v => v + 1);
    setMessage(`Enqueued ${nextVal} at the REAR.`);
    setTimeout(() => setAnimating(false), 300);
  };

  const handleDequeue = () => {
    if (animating) return;
    if (queue.length === 0) {
      setMessage('⚠️ Queue Underflow! Queue is already empty.');
      return;
    }
    const dequeued = queue[0];
    setAnimating(true);
    setQueue(prev => prev.slice(1));
    setMessage(`Dequeued ${dequeued.val} from the FRONT.`);
    setTimeout(() => setAnimating(false), 300);
  };

  const handlePeek = () => {
    if (queue.length === 0) {
      setMessage('Queue is empty! Nothing to peek.');
      return;
    }
    setHighlightedFront(true);
    setMessage(`FRONT element is ${queue[0].val}. (Peek does not remove it)`);
    setTimeout(() => setHighlightedFront(false), 1500);
  };

  const handleReset = () => {
    setQueue([]);
    setNextVal(1);
    setMessage('Queue reset. Workspace Ready.');
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#030712] overflow-hidden font-sans text-slate-200 select-none">
      
      {/* HEADER */}
      <div className="flex shrink-0 items-center justify-between px-6 py-4 border-b border-white/[0.05] bg-white/[0.01] backdrop-blur-2xl z-20 shadow-lg">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-3">
            <span className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400"><Layers size={18} /></span>
            Queue Data Structure
          </h2>
          <p className="text-[11px] font-medium text-slate-500 uppercase tracking-widest mt-1">First-In-First-Out (FIFO) Architecture</p>
        </div>

        {/* Status indicator */}
        <div className="flex items-center gap-6 px-5 py-2.5 rounded-2xl bg-white/5 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-2xl">
          <div className="flex flex-col items-center">
            <span className="text-[10px] uppercase font-semibold text-slate-400">Size</span>
            <span className="font-mono text-sm font-semibold text-white">{queue.length} <span className="text-slate-600">/ {MAX_SIZE}</span></span>
          </div>
          <div className="w-px h-6 bg-white/10"></div>
          <div className="flex flex-col items-center">
            <span className="text-[10px] uppercase font-semibold text-slate-400">Front</span>
            <span className="font-mono text-sm font-semibold text-green-400">{queue.length > 0 ? queue[0].val : '—'}</span>
          </div>
          <div className="w-px h-6 bg-white/10"></div>
          <div className="flex flex-col items-center">
            <span className="text-[10px] uppercase font-semibold text-slate-400">Rear</span>
            <span className="font-mono text-sm font-semibold text-blue-400">{queue.length > 0 ? queue[queue.length - 1].val : '—'}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-1 relative overflow-hidden">
        
        {/* 3D VISUALIZATION AREA */}
        <div className="flex-1 absolute inset-0 z-0">
          <Canvas shadows camera={{ position: [0, 8, 16], fov: 45 }}>
            <color attach="background" args={['#030712']} />
            <ambientLight intensity={0.4} />
            <directionalLight position={[5, 10, 5]} intensity={1.5} castShadow shadow-bias={-0.0001} />
            <pointLight position={[-10, 5, -10]} intensity={2} color="#0891b2" />
            <pointLight position={[10, 5, 10]} intensity={2} color="#9333ea" />
            
            <Environment preset="city" />
            
            <group position={[0, -1, 0]}>
              <QueueTunnel3D />
              
              {queue.map((item, index) => (
                <QueueItem3D 
                  key={item.id} 
                  item={item} 
                  index={index} 
                  isFront={index === 0} 
                  isRear={index === queue.length - 1} 
                  highlightedFront={highlightedFront}
                  totalItems={queue.length}
                />
              ))}
            </group>

            <ContactShadows position={[0, -3.5, 0]} opacity={0.4} scale={30} blur={2} />
            <OrbitControls enablePan={false} minPolarAngle={0} maxPolarAngle={Math.PI / 2 - 0.1} minDistance={10} maxDistance={30} />
          </Canvas>
        </div>

        {/* Floating Terminal overlay */}
        <div 
          className={`absolute top-8 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full text-xs font-mono font-bold border backdrop-blur-md shadow-2xl z-20 transition-all duration-300
            ${message.includes('Overflow') || message.includes('Underflow') 
              ? 'bg-red-500/20 text-red-300 border-red-500/50' 
              : 'bg-black/60 text-cyan-300 border-white/10'}`}
        >
          {message}
        </div>

        {/* Interactive Control Console */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-4 p-4 rounded-3xl bg-black/40 border border-white/10 backdrop-blur-xl shadow-[0_20px_40px_rgba(0,0,0,0.8)] z-20">
          <button 
            onClick={handleEnqueue}
            disabled={queue.length >= MAX_SIZE}
            className="group relative px-6 py-4 rounded-2xl bg-gradient-to-t from-blue-700 to-blue-500 hover:to-blue-400 text-white font-bold transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100 flex items-center gap-2 shadow-[0_0_20px_rgba(59,130,246,0.3)] shrink-0"
          >
            <div className="bg-white/20 p-1 rounded-full"><Plus size={16} /></div>
            Enqueue
          </button>

          <button 
            onClick={handleDequeue}
            disabled={queue.length === 0}
            className="group relative px-6 py-4 rounded-2xl bg-gradient-to-t from-red-700 to-red-500 hover:to-red-400 text-white font-bold transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100 flex items-center gap-2 shadow-[0_0_20px_rgba(239,68,68,0.3)] shrink-0"
          >
            <div className="bg-white/20 p-1 rounded-full"><Minus size={16} /></div>
            Dequeue
          </button>

          <button 
            onClick={handlePeek}
            disabled={queue.length === 0}
            className="px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100 flex items-center gap-2 shrink-0 border border-white/5"
          >
            <Eye size={18} /> Peek
          </button>

          <div className="w-px bg-white/10 mx-2" />

          <button 
            onClick={handleReset}
            className="p-4 rounded-2xl bg-white/5 hover:bg-red-500/20 hover:text-red-400 transition-all active:scale-95 flex items-center justify-center shrink-0 border border-white/5 text-slate-400"
          >
            <RotateCcw size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
