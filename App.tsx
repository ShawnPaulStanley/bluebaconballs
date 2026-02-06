import React, { useState, useRef, useEffect } from 'react';
import { Hero } from './components/Hero';
import { LoveLetter } from './components/LoveLetter';
import { TheQuestion } from './components/TheQuestion';
import { FloatingHearts } from './components/FloatingHearts';
import { MusicPlayer } from './components/MusicPlayer';

export default function App() {
  const [musicStarted, setMusicStarted] = useState(false);
  const letterRef = useRef<HTMLDivElement>(null);
  const questionRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleStartExperience = () => {
    setMusicStarted(true);
    scrollToSection(letterRef);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    // Calculate percentage for gradient
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    setMousePos({ x, y });
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      className="min-h-screen text-gray-800 relative overflow-hidden transition-colors duration-500"
      style={{
        background: `
          radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(255, 230, 240, 0.8) 0%, rgba(255, 240, 245, 0) 50%),
          linear-gradient(135deg, #fce7f3 0%, #ffe4e6 50%, #fbcfe8 100%)
        `
      }}
    >
      {/* Background Effects */}
      <FloatingHearts />
      
      {/* Audio Player (Hidden) */}
      <MusicPlayer play={musicStarted} />

      {/* Sections */}
      <main className="relative z-10 flex flex-col gap-24 pb-24">
        
        <Hero onStart={handleStartExperience} />

        <div ref={letterRef} className="container mx-auto px-4">
           <LoveLetter onNext={() => scrollToSection(questionRef)} />
        </div>

        <div ref={questionRef}>
          <TheQuestion />
        </div>

      </main>
    </div>
  );
}