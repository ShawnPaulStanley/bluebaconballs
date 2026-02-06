import React from 'react';

interface MusicPlayerProps {
  play: boolean;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ play }) => {
  if (!play) return null;

  return (
    <div className="fixed -top-full left-0 w-0 h-0 overflow-hidden">
      <iframe
        width="1"
        height="1"
        src="https://www.youtube.com/embed/MJyKN-8UncM?autoplay=1&loop=1&playlist=MJyKN-8UncM&controls=0&showinfo=0&rel=0"
        title="Romantic Music"
        allow="autoplay; encrypted-media"
        allowFullScreen
      ></iframe>
    </div>
  );
};