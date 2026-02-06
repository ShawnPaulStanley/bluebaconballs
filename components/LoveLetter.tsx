import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, MailOpen } from 'lucide-react';

interface LoveLetterProps {
  onNext: () => void;
}

const FULL_LETTER = `My Dearest Yuvika,

From the moment you came into my life, everything became brighter. The way you laugh, the way your eyes sparkle when you're happy, and even the way you scrunch your nose when you're thinking hard... it's all perfect to me.

I never knew what love truly meant until I met you. You are my best friend, my confidant, and my greatest adventure.

Every day with you is a gift I cherish. I simply cannot imagine my world without you in it.

Yours forever,
Shawn
`;

export const LoveLetter: React.FC<LoveLetterProps> = ({ onNext }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Intersection Observer to start typing only when visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Typewriter effect
  useEffect(() => {
    if (!isVisible || isComplete) return;

    let index = 0;
    const intervalId = setInterval(() => {
      setDisplayedText(FULL_LETTER.slice(0, index));
      index++;

      if (index > FULL_LETTER.length) {
        clearInterval(intervalId);
        setIsComplete(true);
      }
    }, 50); // Adjust speed here

    return () => clearInterval(intervalId);
  }, [isVisible, isComplete]);

  return (
    <section 
      ref={elementRef}
      className="max-w-3xl mx-auto my-20 bg-white/70 backdrop-blur-xl p-8 md:p-12 rounded-3xl shadow-2xl border border-white/60 relative group"
    >
      <div className="absolute -top-10 -left-6 transform -rotate-12 bg-pink-100 p-4 rounded-full shadow-lg border border-pink-200">
        <MailOpen className="w-12 h-12 text-pink-500" />
      </div>
      
      <div className="prose prose-lg prose-pink max-w-none">
        <h3 className="text-4xl text-red-500 mb-6 text-center">To My Favorite Person...</h3>
        
        <div className="font-serif text-xl md:text-2xl leading-relaxed text-gray-800 whitespace-pre-wrap min-h-[300px]">
          {displayedText}
          {!isComplete && <span className="animate-pulse inline-block ml-1 w-1 h-6 bg-red-400 align-middle"></span>}
        </div>
      </div>

      {isComplete && (
        <div className="mt-8 text-center animate-fade-in">
          <button 
            onClick={onNext}
            className="flex flex-col items-center gap-2 mx-auto text-red-400 hover:text-red-600 transition-colors"
          >
            <span className="text-sm uppercase tracking-widest font-semibold">I have one question...</span>
            <ChevronDown className="w-6 h-6 animate-bounce" />
          </button>
        </div>
      )}
    </section>
  );
};