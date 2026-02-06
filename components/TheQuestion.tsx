import React, { useState, useRef } from 'react';
import { Heart, Sparkles, Ghost, Smile } from 'lucide-react';

export const TheQuestion: React.FC = () => {
  const [accepted, setAccepted] = useState(false);
  const [noButtonStyle, setNoButtonStyle] = useState<React.CSSProperties>({});
  const [attempts, setAttempts] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleNoInteraction = () => {
    if (accepted) return;
    
    setAttempts(prev => prev + 1);
    
    if (!containerRef.current) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const maxWidth = containerRect.width - 140; // Keep roughly inside container
    const maxHeight = 300; // Limit vertical movement range

    const randomX = Math.random() * maxWidth;
    const randomY = Math.random() * maxHeight;

    setNoButtonStyle({
      position: 'absolute',
      left: `${randomX}px`,
      top: `${randomY}px`,
      transition: 'all 0.2s ease-out',
      zIndex: 20
    });
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
              className="px-12 py-6 bg-gradient-to-r from-red-500 to-pink-600 text-white text-3xl font-bold rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover-pulse-scale flex items-center gap-3 ring-2 ring-red-300 ring-offset-2"
            >
              YES <Sparkles className="w-8 h-8 fill-yellow-200 text-yellow-100" />
            </button>
          </div>

          {/* NO Button - Runs away */}
          <button
            onMouseEnter={handleNoInteraction}
            onTouchStart={handleNoInteraction}
            style={noButtonStyle}
            className="px-10 py-5 bg-gray-200 text-gray-600 text-2xl font-semibold rounded-full hover:bg-gray-300 transition-colors cursor-pointer flex items-center gap-2"
          >
            NO <Ghost className="w-6 h-6" />
          </button>
        </div>

        {attempts > 2 && (
          <p className="text-sm text-gray-500 italic animate-fade-in mt-8 flex items-center justify-center gap-2">
            (You know you can't click no... <Smile className="w-4 h-4" />)
          </p>
        )}
      </div>
    </section>
  );
};