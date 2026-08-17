import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { ThoughtCard } from './ThoughtCard';
import type { Thought } from '../types';

interface ThoughtWallProps {
  thoughts: Thought[];
  onLikeToggle: (id: string) => void;
  onAddClick?: () => void;
}

export function ThoughtWall({ thoughts, onLikeToggle, onAddClick }: ThoughtWallProps) {
  return (
    <div className="w-full py-8">
      {/* Grid Layout to align items in rows */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mx-auto justify-items-center" style={{ gap: 'clamp(1rem, 2vw, 1.5rem) clamp(0.5rem, 1vw, 1rem)' }}>
        <AnimatePresence>
          {thoughts.map((thought) => (
            <motion.div
              key={thought.id}
              layout
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
              transition={{ 
                opacity: { duration: 0.3 },
                layout: { type: "spring", bounce: 0.3, duration: 0.6 }
              }}
              className="w-full max-w-[18rem] flex justify-center"
            >
              <ThoughtCard thought={thought} onLikeToggle={onLikeToggle} />
            </motion.div>
          ))}
          {onAddClick && (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full max-w-[18rem] flex justify-center"
            >
              <button 
                onClick={onAddClick}
                className="relative flex items-center justify-center w-full aspect-[1/1.25] group cursor-pointer focus:outline-none"
                style={{
                  transform: 'rotate(1.5deg)',
                  transition: 'transform 0.4s ease',
                }}
              >
                <div 
                  className="relative paper-texture w-[86%] h-[86%] flex flex-col items-center justify-center text-center rounded-[2px] bg-[#d5a575] group-hover:-translate-y-[5px] group-hover:rotate-0 transition-transform duration-[0.4s] ease-out shadow-sm"
                  style={{
                    background: `linear-gradient(165deg, rgba(255,255,255,0.1) 0%, transparent 40%), #d5a575`,
                    boxShadow: 'inset 0 1px rgba(255,255,255,0.4), inset 0 -1px 2px rgba(70,55,30,0.1), 0 1px 1px rgba(0,0,0,0.2), 0 6px 14px rgba(0,0,0,0.2), 0 18px 36px rgba(0,0,0,0.3)'
                  }}
                >
                  {/* Tape */}
                  <div className="tape-base tape-stars absolute -top-[1.2rem] left-1/2 w-[55%] h-[2.4rem]" style={{ transform: 'translateX(-50%)' }} />
                  
                  {/* Content */}
                  <div className="flex flex-col items-center justify-center gap-3 relative z-10 mt-4">
                    <div className="w-12 h-12 rounded-full border-[1.5px] border-dashed border-[#5c442c] flex items-center justify-center text-[#5c442c] group-hover:bg-[#5c442c]/10 transition-colors">
                      <Plus size={24} strokeWidth={2} />
                    </div>
                    <span className="font-serif text-[1.1rem] text-[#5c442c] tracking-wide">add yours</span>
                  </div>
                </div>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
