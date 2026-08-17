import { AnimatePresence, motion } from 'framer-motion';
import { ThoughtCard } from './ThoughtCard';
import type { Thought } from '../types';

interface ThoughtWallProps {
  thoughts: Thought[];
  onLikeToggle: (id: string) => void;
}

export function ThoughtWall({ thoughts, onLikeToggle }: ThoughtWallProps) {
  return (
    <div className="w-full py-8">
      {/* Grid Layout to align items in rows */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mx-auto justify-items-center" style={{ gap: 'clamp(1.6rem, 3.2vw, 2.4rem) clamp(0.95rem, 2vw, 1.5rem)' }}>
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
              className="w-full max-w-45 flex justify-center"
            >
              <ThoughtCard thought={thought} onLikeToggle={onLikeToggle} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
