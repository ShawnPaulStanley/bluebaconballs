import React, { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';

interface FloatingHeart {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
}

export const FloatingHearts: React.FC = () => {
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Generate static random hearts on mount
    const newHearts = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100, // percentage
      delay: Math.random() * 15, // seconds
      duration: 15 + Math.random() * 15, // seconds
      size: 16 + Math.random() * 30 // px
    }));
    setHearts(newHearts);

    const handleMouseMove = (e: MouseEvent) => {
      setOffset({
        x: (e.clientX / window.innerWidth - 0.5) * 20, // -10px to 10px
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute text-pink-300/40 animate-float will-change-transform"
          style={{
            left: `${heart.left}%`,
            bottom: '-10%',
            animationDelay: `${heart.delay}s`,
            animationDuration: `${heart.duration}s`,
            width: `${heart.size}px`,
            height: `${heart.size}px`,
            // Add subtle parallax based on mouse position
            transform: `translate(${offset.x * (heart.size / 20)}px, ${offset.y * (heart.size / 20)}px)`
          }}
        >
          <Heart className="w-full h-full fill-pink-200 text-pink-300" />
        </div>
      ))}
    </div>
  );
};