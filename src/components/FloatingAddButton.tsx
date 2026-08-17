import { Pencil } from 'lucide-react';

interface FloatingAddButtonProps {
  onClick: () => void;
}

export function FloatingAddButton({ onClick }: FloatingAddButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-8 right-8 z-40 group focus:outline-none"
      aria-label="Add a thought"
    >
      <div className="relative w-28 h-28 paper-texture bg-[#f4f0e6] shadow-lg flex flex-col items-center justify-center transform rotate-2 group-hover:rotate-0 group-hover:-translate-y-1 transition-all duration-300">
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-6 bg-white/70 tape-base tape-frosted shadow-sm" />
        
        <div className="flex flex-col items-center space-y-2 mt-2">
          <span className="font-serif text-lg text-gray-800 tracking-wide">add yours</span>
          <div className="flex items-center space-x-1 opacity-60">
            <span className="font-sans text-[0.6rem] uppercase tracking-widest text-gray-600">Write a thought</span>
          </div>
        </div>
        
        {/* Decorative pencil illustration (using Lucide icon as a stand-in) */}
        <div className="absolute -right-2 -bottom-2 text-gray-400 transform -rotate-12 group-hover:rotate-0 transition-transform duration-300">
          <Pencil size={24} strokeWidth={1.5} />
        </div>
      </div>
    </button>
  );
}
