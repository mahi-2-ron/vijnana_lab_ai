import React, { useState, useRef } from 'react';
import { RotateCcw, CheckCircle, ArrowDown, ArrowUp, Eye } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Box, Cylinder, Text, ContactShadows, Environment, Float } from '@react-three/drei';
import * as THREE from 'three';

interface StackLabProps { hex: string; }

const STEPS = [
  { title: 'Stack Data Structure', instruction: 'A Stack is a LIFO (Last In, First Out) structure. Think of a stack of plates — you can only add or remove from the TOP. The two main operations are PUSH (add) and POP (remove).', action: 'Understand Stack 📚' },
  { title: 'Push Elements', instruction: 'PUSH adds an element to the top of the stack. The stack pointer (Top) moves up. Push elements and watch the stack grow!', action: 'Push Item ⬆️' },
  { title: 'Peek Top', instruction: 'PEEK shows the top element WITHOUT removing it. The top pointer stays at the same position.', action: 'Peek Top 👁️' },
  { title: 'Pop Elements', instruction: 'POP removes and returns the top element. Top pointer decreases. The last pushed element is always the first popped — LIFO!', action: 'Pop Item ⬇️' },
  { title: 'Overflow & Underflow', instruction: 'Stack Overflow: Trying to PUSH when stack is FULL. Stack Underflow: Trying to POP when stack is EMPTY. Always check these conditions!', action: 'Test Limits ⚠️' },
];

const MAX_STACK = 7;
const BOX_COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#06b6d4', '#ec4899'];
const ITEMS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

// --- 3D Components ---
const StackItem3D: React.FC<{ item: string; index: number; isTop: boolean; peeked: boolean; color: string }> = ({ item, index, isTop, peeked, color }) => {
  const meshRef = useRef<THREE.Group>(null);
  
  // Animate falling, scaling, and peeking
  useFrame((state, delta) => {
    if (meshRef.current) {
      const targetY = index * 1.5 - 4;
      meshRef.current.position.y += (targetY - meshRef.current.position.y) * 10 * delta;
      
      const targetScale = (isTop && peeked) ? 1.2 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 10 * delta);
    }
  });

  return (
    <group ref={meshRef} position={[0, 10, 0]}>
      <Box args={[3, 1.2, 3]} castShadow receiveShadow>
        <meshPhysicalMaterial 
          color={color} 
          transmission={0.2}
          thickness={0.5}
          roughness={0.1}
          metalness={0.1}
          clearcoat={1}
          emissive={isTop && peeked ? color : '#000000'}
          emissiveIntensity={0.5}
        />
        <Text
          position={[0, 0.61, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          fontSize={0.8}
          color="white"
          anchorX="center"
          anchorY="middle"
          fontWeight="bold"
        >
          {item}
        </Text>
      </Box>
      {/* Top indicator arrow */}
      {isTop && (
        <Float speed={4} rotationIntensity={0} floatIntensity={0.5}>
          <group position={[2.5, 0, 0]}>
            <Text position={[1.5, 0, 0]} fontSize={0.6} color="#fde047" fontWeight="bold">← Top</Text>
          </group>
        </Float>
      )}
    </group>
  );
};

const StackEnclosure3D: React.FC = () => {
  return (
    <group position={[0, -4.5, 0]}>
      {/* Platform */}
      <Cylinder args={[3.5, 4, 0.5, 32]} position={[0, -0.25, 0]} receiveShadow>
        <meshStandardMaterial color="#1e293b" roughness={0.7} metalness={0.3} />
      </Cylinder>
      
      {/* Empty slot indicators / ghost guides */}
      {Array.from({ length: MAX_STACK }).map((_, i) => (
        <Box key={i} args={[3.2, 1.4, 3.2]} position={[0, i * 1.5 + 0.75, 0]}>
          <meshBasicMaterial color="#ffffff" opacity={0.03} transparent wireframe />
        </Box>
      ))}

      {/* Index Labels via 3D Text */}
      {Array.from({ length: MAX_STACK }).map((_, i) => (
        <Text key={`idx-${i}`} position={[-2.5, i * 1.5 + 0.75, 2.5]} fontSize={0.5} color="#64748b" anchorX="right" anchorY="middle">
          [{i}]
        </Text>
      ))}
      
      {/* Three vertical poles holding the stack */}
      <Cylinder args={[0.1, 0.1, MAX_STACK * 1.5]} position={[-1.7, (MAX_STACK * 1.5) / 2, -1.7]}>
        <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.2} />
      </Cylinder>
      <Cylinder args={[0.1, 0.1, MAX_STACK * 1.5]} position={[1.7, (MAX_STACK * 1.5) / 2, -1.7]}>
        <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.2} />
      </Cylinder>
      <Cylinder args={[0.1, 0.1, MAX_STACK * 1.5]} position={[-1.7, (MAX_STACK * 1.5) / 2, 1.7]}>
        <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.2} />
      </Cylinder>
    </group>
  );
};
// -----------------------

const StackLab: React.FC<StackLabProps> = ({ hex }) => {
  const [step, setStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [stack, setStack] = useState<string[]>([]);
  const [nextItem, setNextItem] = useState(0);
  const [message, setMessage] = useState('');
  const [msgColor, setMsgColor] = useState('#94a3b8');
  const [animating, setAnimating] = useState(false);
  const [peeked, setPeeked] = useState(false);

  const showMsg = (msg: string, color = '#4ade80') => {
    setMessage(msg);
    setMsgColor(color);
    setTimeout(() => setMessage(''), 2500);
  };

  const push = () => {
    if (animating) return;
    if (stack.length >= MAX_STACK) { showMsg('⚠️ Stack Overflow! Stack is FULL.', '#ef4444'); return; }
    const item = ITEMS[nextItem % ITEMS.length];
    setAnimating(true);
    setPeeked(false);
    
    // Perform state update immediately, let 3D Lerp handle visual anim
    setStack(prev => [...prev, item]);
    setNextItem(n => n + 1);
    showMsg(`⬆️ PUSH "${item}" → Top = ${stack.length}`);
    
    setTimeout(() => setAnimating(false), 400); // lockout for multiple rapid pushes
    if (step < 1) setStep(1);
  };

  const pop = () => {
    if (animating) return;
    if (stack.length === 0) { showMsg('⚠️ Stack Underflow! Stack is EMPTY.', '#ef4444'); return; }
    const popped = stack[stack.length - 1];
    setAnimating(true);
    setPeeked(false);
    
    showMsg(`⬇️ POP → returned "${popped}"`);
    setStack(prev => prev.slice(0, -1));
    
    setTimeout(() => setAnimating(false), 400);
    if (step < 3) setStep(3);
  };

  const peek = () => {
    if (animating) return;
    if (stack.length === 0) { showMsg('Stack is empty — nothing to peek!', '#f59e0b'); return; }
    setPeeked(true);
    showMsg(`👁️ PEEK → Top = "${stack[stack.length - 1]}"`, '#f59e0b');
    if (step < 2) setStep(2);
  };

  const reset = () => { setStack([]); setNextItem(0); setStep(0); setCompleted(false); setMessage(''); setPeeked(false); setAnimating(false); };

  const current = STEPS[Math.min(step, STEPS.length - 1)];

  return (
    <div className="flex flex-col md:flex-row h-full w-full bg-slate-950">
      {/* 3D Visualizer */}
      <div className="flex-1 relative flex flex-col items-center justify-center">
        {/* Environment Background Gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#1e1b4b,#0f172a)] z-0" />
        
        <div className="absolute inset-0 z-10">
          <Canvas shadows camera={{ position: [9, 6, 9], fov: 45 }}>
            <color attach="background" args={['#0f172a']} />
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} castShadow shadow-bias={-0.0001} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3b82f6" />
            
            <Environment preset="city" />
            
            <group position={[0, -1, 0]}>
              <StackEnclosure3D />
              
              {stack.map((item, i) => (
                <StackItem3D 
                  key={`${item}-${i}`} 
                  item={item} 
                  index={i} 
                  isTop={i === stack.length - 1} 
                  peeked={peeked} 
                  color={BOX_COLORS[i % BOX_COLORS.length]} 
                />
              ))}
            </group>

            <ContactShadows position={[0, -5.5, 0]} opacity={0.5} scale={10} blur={2} />
            <OrbitControls enablePan={false} minPolarAngle={0} maxPolarAngle={Math.PI / 2 + 0.1} minDistance={10} maxDistance={25} />
          </Canvas>
        </div>

        {/* Floating Controls Overlay */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3">
          {message && (
            <div className="px-5 py-2 rounded-xl font-bold text-sm bg-black/60 backdrop-blur-md border border-white/10" style={{ color: msgColor, boxShadow: `0 0 15px ${msgColor}40` }}>
              {message}
            </div>
          )}
          <div className="flex gap-3 bg-black/40 backdrop-blur-md p-3 rounded-2xl border border-white/10 shadow-2xl">
            <button onClick={push} className="px-6 py-3 bg-gradient-to-t from-blue-700 to-blue-500 hover:to-blue-400 text-white font-bold rounded-xl transition-all active:scale-95 flex items-center gap-2 shadow-lg"><ArrowUp size={18}/> Push</button>
            <button onClick={peek} className="px-6 py-3 bg-gradient-to-t from-amber-700 to-amber-500 hover:to-amber-400 text-white font-bold rounded-xl transition-all active:scale-95 flex items-center gap-2 shadow-lg"><Eye size={18}/> Peek</button>
            <button onClick={pop} className="px-6 py-3 bg-gradient-to-t from-red-700 to-red-500 hover:to-red-400 text-white font-bold rounded-xl transition-all active:scale-95 flex items-center gap-2 shadow-lg"><ArrowDown size={18}/> Pop</button>
          </div>
          
          <div className="text-center">
            <div className="flex justify-between text-[10px] text-gray-400 uppercase font-bold mb-1">
              <span>Stack Size</span>
              <span>{stack.length}/{MAX_STACK}</span>
            </div>
            <div className="w-64 bg-slate-800 rounded-full h-1.5 shadow-inner">
              <div className="h-1.5 rounded-full transition-all duration-300" style={{ width: `${(stack.length / MAX_STACK) * 100}%`, backgroundColor: stack.length >= MAX_STACK ? '#ef4444' : '#3b82f6' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Info panel */}
      <div className="w-full md:w-80 bg-slate-900 border-l border-white/5 flex flex-col z-20 shrink-0">
        <div className="p-5 border-b border-white/5 bg-slate-950">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-1">Stack — CS Lab</p>
          <h2 className="text-xl font-bold text-white">{current.title}</h2>
        </div>
        <div className="flex-1 p-5 space-y-5 overflow-y-auto">
          <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-xl shadow-inner">
            <p className="text-blue-200 text-sm leading-relaxed">{current.instruction}</p>
          </div>
          <div className="bg-black/40 p-4 rounded-xl border border-white/10 space-y-2 font-mono text-sm">
            <p className="text-gray-400">Stack = <span className="text-white">[{stack.join(', ')}]</span></p>
            <p className="text-gray-400">Top = <span className="text-yellow-300">{stack.length > 0 ? stack[stack.length - 1] : 'null'}</span></p>
            <p className="text-gray-400">Size = <span className="text-blue-300">{stack.length}</span></p>
            <p className="text-gray-400">isEmpty = <span className={stack.length === 0 ? 'text-green-400' : 'text-gray-500'}>{String(stack.length === 0)}</span></p>
            <p className="text-gray-400">isFull = <span className={stack.length >= MAX_STACK ? 'text-red-400' : 'text-gray-500'}>{String(stack.length >= MAX_STACK)}</span></p>
          </div>
          <div className="text-xs text-gray-500 bg-black/40 p-3 rounded-xl border border-white/10">
            <p className="font-bold text-gray-300 mb-2 uppercase tracking-wider text-[10px]">Real-World Applications:</p>
            <ul className="space-y-1.5 list-disc list-inside text-slate-400">
              <li>Undo/Redo in text editors</li>
              <li>Browser back button history</li>
              <li>Function call stack (Recursion)</li>
              <li>Balanced parentheses checking</li>
            </ul>
          </div>
          <button onClick={reset} className="w-full py-2.5 rounded-xl text-gray-400 hover:bg-red-500/10 hover:text-red-400 border border-transparent hover:border-red-500/30 transition-all flex items-center justify-center gap-2 text-sm font-bold">
            <RotateCcw size={16} /> Reset Stack
          </button>
          
          <div className="pt-2">
            <p className="text-[10px] text-slate-500 font-bold uppercase mb-2 flex justify-between">
              <span>Progress</span> <span>{step+1}/{STEPS.length}</span>
            </p>
            <div className="flex gap-1">
              {STEPS.map((_, idx) => <div key={idx} className="flex-1 h-1.5 rounded-full" style={{ backgroundColor: idx <= step ? '#3b82f6' : '#1e293b' }} />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StackLab;
