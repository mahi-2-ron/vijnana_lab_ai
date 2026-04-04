
/**
 * ParticleEngine — Canvas-based particle system for lab visualizations.
 * Supports: reaction drops, molecule bursts, collision sparks, trails.
 */
import React, { useEffect, useRef, useCallback } from 'react';

export interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  life: number;       // 0-1
  decay: number;
  radius: number;
  color: string;
  type: 'drop' | 'spark' | 'bubble' | 'molecule' | 'trail';
  opacity: number;
  gravity: number;
  spin?: number;
  spinSpeed?: number;
}

interface ParticleEngineProps {
  particles: Particle[];
  setParticles: React.Dispatch<React.SetStateAction<Particle[]>>;
  width: number;
  height: number;
  className?: string;
}

export function createDrop(x: number, y: number, color: string): Particle {
  return {
    x, y,
    vx: (Math.random() - 0.5) * 1.5,
    vy: Math.random() * 2 + 1,
    life: 1, decay: 0.018,
    radius: Math.random() * 4 + 2,
    color, type: 'drop', opacity: 1, gravity: 0.12,
  };
}

export function createBubble(x: number, y: number, color: string): Particle {
  return {
    x, y,
    vx: (Math.random() - 0.5) * 0.8,
    vy: -(Math.random() * 1.5 + 0.5),
    life: 1, decay: 0.008,
    radius: Math.random() * 6 + 3,
    color, type: 'bubble', opacity: 0.7, gravity: -0.03,
  };
}

export function createSpark(x: number, y: number, color: string): Particle {
  const angle = Math.random() * Math.PI * 2;
  const speed = Math.random() * 5 + 2;
  return {
    x, y,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    life: 1, decay: 0.04,
    radius: Math.random() * 3 + 1,
    color, type: 'spark', opacity: 1, gravity: 0.15,
  };
}

export function createMolecule(x: number, y: number, color: string): Particle {
  const angle = Math.random() * Math.PI * 2;
  const speed = Math.random() * 2 + 0.5;
  return {
    x, y,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    life: 1, decay: 0.012,
    radius: Math.random() * 5 + 3,
    color, type: 'molecule', opacity: 0.9, gravity: 0,
    spin: 0, spinSpeed: (Math.random() - 0.5) * 0.15,
  };
}

export function createTrail(x: number, y: number, color: string, r = 4): Particle {
  return {
    x, y, vx: 0, vy: 0,
    life: 1, decay: 0.06,
    radius: r, color, type: 'trail', opacity: 0.5, gravity: 0,
  };
}

const ParticleEngine: React.FC<ParticleEngineProps> = ({ particles, setParticles, width, height, className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const pRef = useRef<Particle[]>([]);

  // Keep pRef in sync
  useEffect(() => { pRef.current = particles; }, [particles]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    function tick() {
      ctx.clearRect(0, 0, canvas!.width, canvas!.height);

      const next: Particle[] = [];
      for (const p of pRef.current) {
        // Physics
        p.vx *= 0.985;
        p.vy += p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.life -= p.decay;
        p.opacity = Math.max(0, p.life);
        if (p.spin !== undefined && p.spinSpeed) p.spin += p.spinSpeed;

        if (p.life <= 0 || p.y > height + 20) continue;

        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.translate(p.x, p.y);
        if (p.spin !== undefined) ctx.rotate(p.spin);

        if (p.type === 'drop') {
          ctx.beginPath();
          ctx.moveTo(0, -p.radius * 1.5);
          ctx.bezierCurveTo(p.radius, 0, p.radius, p.radius, 0, p.radius * 1.2);
          ctx.bezierCurveTo(-p.radius, p.radius, -p.radius, 0, 0, -p.radius * 1.5);
          ctx.fillStyle = p.color;
          ctx.fill();
        } else if (p.type === 'bubble') {
          ctx.beginPath();
          ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
          ctx.strokeStyle = p.color;
          ctx.lineWidth = 1.5;
          ctx.stroke();
          ctx.fillStyle = p.color + '22';
          ctx.fill();
          // Highlight
          ctx.beginPath();
          ctx.arc(-p.radius * 0.3, -p.radius * 0.3, p.radius * 0.25, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255,255,255,0.5)';
          ctx.fill();
        } else if (p.type === 'spark') {
          const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, p.radius * 2);
          grad.addColorStop(0, p.color);
          grad.addColorStop(1, 'transparent');
          ctx.beginPath();
          ctx.arc(0, 0, p.radius * 2, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();
        } else if (p.type === 'molecule') {
          // Central atom
          ctx.beginPath();
          ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();
          // Bond lines to satellite atoms
          for (let i = 0; i < 2; i++) {
            const bondAngle = (i * Math.PI) + (p.spin ?? 0);
            const bx = Math.cos(bondAngle) * p.radius * 1.8;
            const by = Math.sin(bondAngle) * p.radius * 1.8;
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(bx, by);
            ctx.strokeStyle = p.color + '80';
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(bx, by, p.radius * 0.5, 0, Math.PI * 2);
            ctx.fillStyle = p.color + 'aa';
            ctx.fill();
          }
        } else {
          // Trail
          const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, p.radius);
          grad.addColorStop(0, p.color + 'cc');
          grad.addColorStop(1, 'transparent');
          ctx.beginPath();
          ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();
        }

        ctx.restore();
        next.push(p);
      }

      setParticles(next);
      animRef.current = requestAnimationFrame(tick);
    }

    animRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animRef.current);
  }, [height, setParticles]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className={`pointer-events-none ${className ?? ''}`}
      style={{ position: 'absolute', top: 0, left: 0 }}
    />
  );
};

export default ParticleEngine;
