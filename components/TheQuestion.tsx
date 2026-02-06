import React, { useState, useRef, useEffect } from 'react';
import { Heart, Sparkles } from 'lucide-react';

export const TheQuestion: React.FC = () => {
  const [accepted, setAccepted] = useState(false);
  const [attempts, setAttempts] = useState(0);
  
  // Refs for direct DOM manipulation for smooth performance
  const containerRef = useRef<HTMLDivElement>(null);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const offsetRef = useRef({ x: 0, y: 0 });
  const lastAttemptTime = useRef(0);

  useEffect(() => {
    if (accepted) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!noButtonRef.current || !containerRef.current) return;

      const rect = noButtonRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      const threshold = 150; // Activation radius

      if (distance < threshold) {
        // Increment attempts (throttled to max once per 500ms)
        const now = Date.now();
        if (now - lastAttemptTime.current > 500) {
          setAttempts(prev => prev + 1);
          lastAttemptTime.current = now;
        }

        // Calculate direction vector from Mouse to Button Center
        // We want to move along the vector (Center - Mouse) which is (-dx, -dy)
        const angle = Math.atan2(dy, dx);
        
        // Move distance depends on how close the mouse is (closer = faster repel)
        const repelForce = (threshold - distance) * 0.5;
        
        const moveX = -Math.cos(angle) * repelForce;
        const moveY = -Math.sin(angle) * repelForce;

        offsetRef.current.x += moveX;
        offsetRef.current.y += moveY;

        // Constrain movement to keep it reachable eventually or just annoyingly hard?
        // Let's constrain it within a reasonable box so it doesn't disappear forever
        const limit = 200;
        offsetRef.current.x = Math.max(Math.min(offsetRef.current.x, limit), -limit);
        offsetRef.current.y = Math.max(Math.min(offsetRef.current.y, limit), -limit);

        noButtonRef.current.style.transform = `translate(${offsetRef.current.x}px, ${offsetRef.current.y}px)`;
        // Add smooth transition for transform only
        noButtonRef.current.style.transition = 'transform 0.1s ease-out'; 
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [accepted]);

  const handleMobileInteraction = (e: React.TouchEvent) => {
    if (accepted) return;
    e.preventDefault(); // Prevent click
    setAttempts(prev => prev + 1);
    
    // Simple random jump for touch devices
    const limit = 150;
    const randomX = (Math.random() - 0.5) * limit * 2;
    const randomY = (Math.random() - 0.5) * limit * 2;
    
    offsetRef.current = { x: randomX, y: randomY };
    if (noButtonRef.current) {
        noButtonRef.current.style.transform = `translate(${randomX}px, ${randomY}px)`;
    }
  };

  const handleYes = () => {
    setAccepted(true);
    // Fire confetti from global
    if (window.confetti) {
      const duration = 5 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 50 };

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        window.confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        window.confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
      }, 250);
    }
  };

  if (accepted) {
    return (
      <section className="min-h-[60vh] flex flex-col items-center justify-center p-4 text-center">
        <div className="animate-pop-in space-y-8 bg-white/80 backdrop-blur-lg p-12 rounded-3xl shadow-2xl border-4 border-red-200">
          <div className="flex justify-center gap-4 text-red-500">
            <Heart className="w-16 h-16 fill-red-500 animate-bounce" />
            <Heart className="w-16 h-16 fill-red-500 animate-pulse delay-75" />
            <Heart className="w-16 h-16 fill-red-500 animate-bounce delay-150" />
          </div>
          <h2 className="text-6xl md:text-7xl text-red-600 drop-shadow-md">YAY!!!!! <Heart className="inline w-12 h-12 fill-current" /></h2>
          <p className="text-3xl md:text-4xl text-gray-800 handwritten">
            You just made me the happiest person alive!
          </p>
          <p className="text-xl text-gray-600">I love you so much, Yuvika.</p>
        </div>
      </section>
    );
  }

  return (
    <section ref={containerRef} className="min-h-[80vh] flex flex-col items-center justify-center p-4 relative overflow-visible">
      <div className="text-center space-y-12 max-w-2xl relative z-10">
        <h2 className="text-5xl md:text-7xl text-gray-800 font-bold drop-shadow-white">
          Yuvika...
        </h2>
        <p className="text-3xl md:text-5xl text-red-600 handwritten animate-pulse">
          Will you be my Valentine?
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 mt-12 relative min-h-[150px]">
          {/* YES Button - Grows as you try to click NO */}
          <div style={{ transform: `scale(${1 + attempts * 0.1})`, transition: 'transform 0.2s' }} className="z-30 origin-center">
            <button
              onClick={handleYes}
              className="px-12 py-6 bg-gradient-to-r from-red-500 to-pink-600 text-white text-3xl font-bold rounded-full shadow-lg hover:shadow-2xl hover:brightness-110 transition-shadow transition-colors duration-300 hover-pulse-scale flex items-center gap-3 ring-2 ring-red-300 ring-offset-2"
            >
              YES <Sparkles className="w-8 h-8 fill-yellow-200 text-yellow-100" />
            </button>
          </div>

          {/* NO Button - Moves away magnetically */}
          <button
            ref={noButtonRef}
            onTouchStart={handleMobileInteraction}
            className="px-10 py-5 bg-gray-200 text-gray-600 text-2xl font-semibold rounded-full hover:bg-gray-300 transition-colors cursor-pointer flex items-center gap-2 relative z-20"
          >
            NO
          </button>
        </div>

        {attempts > 2 && (
          <p className="text-sm text-gray-500 italic animate-fade-in mt-8 flex items-center justify-center gap-2">
            (You know you can't click no...)
          </p>
        )}
      </div>
    </section>
  );
};