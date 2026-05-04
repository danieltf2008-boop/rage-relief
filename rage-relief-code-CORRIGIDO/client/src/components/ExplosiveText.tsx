import { useEffect, useState } from 'react';

interface ExplosiveTextProps {
  text: string;
  x: number;
  y: number;
  onComplete?: () => void;
}

interface TextParticle {
  id: string;
  char: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationVel: number;
  opacity: number;
  scale: number;
}

export function ExplosiveText({ text, x, y, onComplete }: ExplosiveTextProps) {
  const [particles, setParticles] = useState<TextParticle[]>([]);

  useEffect(() => {
    // Create particles for each character
    const newParticles: TextParticle[] = text.split('').map((char, index) => {
      const angle = (index / text.length) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
      const velocity = 3 + Math.random() * 4;
      const vx = Math.cos(angle) * velocity;
      const vy = Math.sin(angle) * velocity - 2; // Add upward bias

      return {
        id: `${Date.now()}-${index}`,
        char,
        x,
        y,
        vx,
        vy,
        rotation: Math.random() * 360,
        rotationVel: (Math.random() - 0.5) * 20,
        opacity: 1,
        scale: 1,
      };
    });

    setParticles(newParticles);

    // Animate particles
    let animationId: number;
    let frame = 0;
    const maxFrames = 60; // 1 second at 60fps

    const animate = () => {
      frame++;

      setParticles((prev) =>
        prev.map((particle) => ({
          ...particle,
          x: particle.x + particle.vx,
          y: particle.y + particle.vy,
          vy: particle.vy + 0.15, // gravity
          rotation: particle.rotation + particle.rotationVel,
          opacity: Math.max(0, 1 - frame / maxFrames),
          scale: 1 - frame / maxFrames * 0.5,
        }))
      );

      if (frame < maxFrames) {
        animationId = requestAnimationFrame(animate);
      } else {
        setParticles([]);
        onComplete?.();
      }
    };

    animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, [text, x, y, onComplete]);

  return (
    <div className="fixed inset-0 pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute font-bold text-2xl"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            transform: `translate(-50%, -50%) rotate(${particle.rotation}deg) scale(${particle.scale})`,
            opacity: particle.opacity,
            color: '#FF3333',
            textShadow: `0 0 10px rgba(255, 51, 51, ${particle.opacity}), 0 0 20px rgba(255, 107, 0, ${particle.opacity})`,
            fontWeight: 'bold',
            letterSpacing: '2px',
          }}
        >
          {particle.char}
        </div>
      ))}
    </div>
  );
}
