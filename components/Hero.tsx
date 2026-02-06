import React from 'react';
import { Heart, MousePointerClick } from 'lucide-react';

interface HeroProps {
  onStart: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 relative">
      <div className="animate-fade-in-up space-y-6">
        <div className="inline-block p-4 rounded-full bg-white/40 backdrop-blur-md mb-6 animate-bounce shadow-lg ring-1 ring-white/50">
          <Heart className="w-10 h-10 text-red-500 fill-red-500" />
        </div>
        
        <h1 className="text-6xl md:text-8xl text-red-600 drop-shadow-sm flex items-center justify-center gap-4 flex-wrap">
          Hey Yuvika <Heart className="w-12 h-12 md:w-20 md:h-20 text-red-500 fill-red-500 animate-pulse" />
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-700 font-light max-w-lg mx-auto leading-relaxed mt-4">
          I made something special just for you...
        </p>

        <button 
          onClick={onStart}
          className="mt-10 group relative px-8 py-4 bg-gradient-to-r from-red-400 to-pink-500 hover:from-red-500 hover:to-pink-600 text-white text-lg rounded-full shadow-lg transition-all hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-red-200"
        >
          <span className="flex items-center gap-2 font-bold tracking-wide">
            Click to Open
            <MousePointerClick className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          </span>
        </button>
      </div>
    </section>
  );
};