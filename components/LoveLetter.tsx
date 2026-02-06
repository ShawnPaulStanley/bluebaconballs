import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, MailOpen } from 'lucide-react';

interface LoveLetterProps {
  onNext: () => void;
}

const FULL_LETTER = `I’ve been meaning to tell you something that’s been on my mind for days now. Being with you has honestly become my favorite part of every day. Your smile, your voice, and the way you care about me make life feel lighter and happier.

You’re not just my girlfriend. You’re my comfort, my safe place, and my favorite person to talk to. Even the simplest moments feel special when I’m with you.

So I wanted to ask you something straight from my heart.

Will you be my Valentine this year? I would love to spend that day with you and make more beautiful memories together.`;

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