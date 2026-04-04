
import React from 'react';
import { motion } from 'framer-motion';

// Fix for Framer Motion type definitions
const MotionDiv = motion.div as any;

export const Atom3D: React.FC = () => {
  return (
    <div className="relative w-[280px] h-[280px] md:w-[400px] md:h-[400px] flex items-center justify-center" style={{ perspective: '1000px' }}>
      {/* Core Glow */}
      <div className="absolute inset-0 bg-emerald-500/10 blur-[100px] rounded-full animate-pulse"></div>
      
      {/* Nucleus */}
      <MotionDiv 
        className="relative w-16 h-16 md:w-24 md:h-24 bg-gradient-to-tr from-emerald-500 via-indigo-500 to-sky-600 rounded-full shadow-[0_0_60px_rgba(16,185,129,0.5)] z-20 flex items-center justify-center"
        animate={{ scale: [1, 1.05, 1], rotate: [0, 90, 180, 270, 360] }}
        transition={{ 
          scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 20, repeat: Infinity, ease: "linear" }
        }}
      >
         <div className="absolute inset-0 bg-white/10 blur-md rounded-full"></div>
         <div className="w-full h-full rounded-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30"></div>
      </MotionDiv>
 
      {/* Electron Shell 1 */}
      <MotionDiv
        className="absolute w-full h-full border border-sky-400/30 rounded-full z-10"
        style={{ transformStyle: 'preserve-3d', rotateX: 75, rotateY: 0 }}
        animate={{ rotateZ: [0, 360] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      >
         <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-sky-300 rounded-full shadow-[0_0_15px_rgba(14,165,233,0.8)]"></div>
      </MotionDiv>
 
      {/* Electron Shell 2 */}
      <MotionDiv
        className="absolute w-full h-full border border-indigo-400/30 rounded-full z-10"
        style={{ transformStyle: 'preserve-3d', rotateX: 75, rotateY: 60 }}
        animate={{ rotateZ: [0, 360] }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
      >
         <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-indigo-300 rounded-full shadow-[0_0_15px_rgba(99,102,241,0.8)]"></div>
      </MotionDiv>
 
      {/* Electron Shell 3 */}
      <MotionDiv
        className="absolute w-full h-full border border-emerald-400/30 rounded-full z-10"
        style={{ transformStyle: 'preserve-3d', rotateX: 75, rotateY: -60 }}
        animate={{ rotateZ: [0, -360] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      >
         <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-emerald-300 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.8)]"></div>
      </MotionDiv>
    </div>
  );
};

export const FloatingFloatingElement: React.FC<{ 
    delay?: number, 
    x?: number, 
    y?: number, 
    children: React.ReactNode,
    className?: string 
}> = ({ delay = 0, x = 20, y = 20, children, className }) => {
    return (
        <MotionDiv
            className={`absolute ${className}`}
            animate={{ y: [0, -y, 0], x: [0, x, 0], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 6, delay: delay, repeat: Infinity, ease: "easeInOut" }}
        >
            {children}
        </MotionDiv>
    )
}
