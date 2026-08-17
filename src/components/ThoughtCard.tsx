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

  const colorClasses = {
    peach: 'bg-[var(--color-paper-peach)]',
    yellow: 'bg-[var(--color-paper-yellow)]',
    green: 'bg-[var(--color-paper-green)]',
    blue: 'bg-[var(--color-paper-blue)]',
    lavender: 'bg-[var(--color-paper-lavender)]',
  };

  return (
    <div 
      className="relative flex items-center justify-center w-full aspect-[1/1.25] group"
      style={{
        transform: `rotate(${thought.rotation}deg)`,
        transition: 'transform 0.4s ease',
      }}
    >
      <div 
        className={clsx(
          "relative paper-texture w-[86%] h-[86%] p-[1.2rem_0.9rem_1.15rem] flex flex-col items-center justify-center text-center rounded-[2px]",
          colorClasses[thought.paperColor],
          "group-hover:-translate-y-[5px] group-hover:rotate-0 transition-transform duration-[0.4s] ease-out"
        )}
        style={{
          background: `linear-gradient(165deg, rgba(255,255,255,0.28) 0%, transparent 42%), ${colorClasses[thought.paperColor] === 'bg-[var(--color-paper-peach)]' ? 'linear-gradient(200deg, var(--color-paper-peach) 0%, #eebd98 100%)' : ''}`, // Approximate gradients
          boxShadow: 'inset 0 1px rgba(255,255,255,0.62), inset 0 -1px 2px rgba(70,55,30,0.08), 0 1px 1px rgba(0,0,0,0.22), 0 6px 14px rgba(0,0,0,0.28), 0 18px 36px rgba(0,0,0,0.34)'
        }}
      >
        {/* Tape */}
        <div className={clsx("tape-base absolute -top-[1.2rem] left-1/2 w-[55%] h-[2.4rem]", `tape-${thought.tape}`)} style={{ transform: 'translateX(-50%)' }} />
        
        {/* Content */}
        <div className="flex-1 flex flex-col items-center justify-center gap-[0.4rem] w-full mt-4">
          <p className="font-serif text-[clamp(0.72rem,1.3vw,0.94rem)] leading-[1.42] text-[#1f1b16] max-w-[15ch] text-balance font-normal tracking-[-0.01em]">
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
