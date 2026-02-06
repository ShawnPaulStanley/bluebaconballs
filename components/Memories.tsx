import React from 'react';
import { Memory } from '../types';

// Placeholder data - user can replace these URLs
const MEMORIES_DATA: Memory[] = [
  { id: 1, imageUrl: 'https://picsum.photos/400/500?random=1', caption: 'Our first date ☕', rotation: -3 },
  { id: 2, imageUrl: 'https://picsum.photos/400/500?random=2', caption: 'That sunny day at the park ☀️', rotation: 2 },
  { id: 3, imageUrl: 'https://picsum.photos/400/500?random=3', caption: 'Your beautiful smile 😊', rotation: -2 },
  { id: 4, imageUrl: 'https://picsum.photos/400/500?random=4', caption: 'Always making me laugh 😂', rotation: 4 },
];

export const Memories: React.FC = () => {
  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-5xl text-center text-red-500 mb-16 drop-shadow-sm">Our Beautiful Memories</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 justify-items-center">
        {MEMORIES_DATA.map((memory) => (
          <div 
            key={memory.id}
            className="group relative bg-white p-4 pb-16 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:z-20 w-full max-w-sm"
            style={{ transform: `rotate(${memory.rotation}deg)` }}
          >
            {/* Tape effect */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-yellow-100/50 rotate-1 shadow-sm"></div>

            <div className="aspect-[4/5] overflow-hidden rounded-sm bg-gray-100 mb-4">
              <img 
                src={memory.imageUrl} 
                alt={memory.caption}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
            </div>
            
            <p className="absolute bottom-6 left-0 right-0 text-center handwritten text-3xl text-gray-700 px-2">
              {memory.caption}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};