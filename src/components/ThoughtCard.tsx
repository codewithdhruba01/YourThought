import { useState } from 'react';
import { Heart } from 'lucide-react';
import clsx from 'clsx';
import type { Thought } from '../types';

interface ThoughtCardProps {
  thought: Thought;
  onLikeToggle: (id: string) => void;
}

export function ThoughtCard({ thought, onLikeToggle }: ThoughtCardProps) {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLikeToggle(thought.id);
  };

  // Upgraded vibrant colors based on the reference design
  const colorClasses = {
    peach: '#FFAF82',
    yellow: '#FFDF59',
    green: '#A6D238', // Vibrant green from reference
    blue: '#82C8FA',
    lavender: '#D7B4F3',
  };

  return (
    <div 
      className="relative flex items-center justify-center w-full aspect-1/1.25 group"
      style={{
        transform: `rotate(${thought.rotation}deg)`,
        transition: 'transform 0.4s ease',
      }}
    >
      <div 
        className={clsx(
          "relative w-[86%] h-[86%] p-[1.2rem_0.9rem_1.15rem] flex flex-col items-center justify-center text-center rounded-2xl",
          "group-hover:-translate-y-1.25 group-hover:rotate-0 transition-transform duration-[0.4s] ease-out"
        )}
        style={{
          backgroundColor: colorClasses[thought.paperColor] || '#A6D238',
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.35) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.35) 1px, transparent 1px)
          `,
          backgroundSize: '18px 18px',
          boxShadow: '0 8px 16px -4px rgba(0,0,0,0.15), inset 0 0 0 1px rgba(255,255,255,0.2)'
        }}
      >
        {/* Tape */}
        <div 
          className="absolute -top-2.5 left-1/2 w-[48%] h-6 z-10 flex flex-col rounded-md overflow-hidden" 
          style={{ 
            transform: 'translateX(-50%)',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          <div className="h-[40%] w-full bg-[#1A73E8]"></div>
          <div className="h-[60%] w-full" style={{ backgroundColor: 'rgba(144, 202, 249, 0.75)' }}></div>
        </div>
        
        {/* Content */}
        <div className="flex-1 flex flex-col items-center justify-center gap-[0.4rem] w-full mt-4">
          <p className="font-serif text-[clamp(0.72rem,1.3vw,0.94rem)] leading-[1.42] text-[#1f1b16] max-w-[15ch] text-balance font-medium tracking-[-0.01em]">
            {thought.text}
          </p>
          {thought.author && (
            <p className="font-serif text-[clamp(0.62rem,1.05vw,0.76rem)] text-[#2a261f7a] mt-[0.2rem]">
              - {thought.author}
            </p>
          )}
        </div>

        {/* Like Button */}
        <div className="absolute bottom-[9%] right-[10%] flex items-center gap-[0.22rem] opacity-70 hover:opacity-100 transition-opacity">
          <button 
            onClick={handleLike}
            className="focus:outline-none flex items-center p-[0.2rem_0.28rem]"
            aria-label="Like thought"
          >
            <Heart 
              size={14} 
              className={clsx(
                "transition-colors duration-200", 
                isLiked ? "fill-[#8c3d3d] text-[#8c3d3d]" : "text-[#1f1b1680]"
              )} 
            />
          </button>
          <span className="text-[calc(0.68rem+1pt)] font-sans font-medium tabular-nums leading-none tracking-[0.02em] text-[#1f1b1680]">
            {thought.likes + (isLiked ? 1 : 0)}
          </span>
        </div>
      </div>
    </div>
  );
}
