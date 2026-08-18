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
      <div 
        className="relative w-28 h-28 rounded-2xl flex flex-col items-center justify-center transform rotate-2 group-hover:rotate-0 group-hover:-translate-y-1.25 transition-all duration-300"
        style={{
          backgroundColor: '#A6D238',
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.35) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.35) 1px, transparent 1px)
          `,
          backgroundSize: '14px 14px',
          boxShadow: '0 8px 16px -4px rgba(0,0,0,0.15), inset 0 0 0 1px rgba(255,255,255,0.2)'
        }}
      >
        {/* Tape */}
        <div 
          className="absolute -top-2.5 left-1/2 w-12 h-5 z-10 flex flex-col rounded-md overflow-hidden" 
          style={{ 
            transform: 'translateX(-50%)',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          <div className="h-[40%] w-full bg-[#1A73E8]"></div>
          <div className="h-[60%] w-full" style={{ backgroundColor: 'rgba(144, 202, 249, 0.75)' }}></div>
        </div>
        
        <div className="flex flex-col items-center space-y-2 mt-2 z-10">
          <span className="font-serif text-lg text-gray-800 tracking-wide font-medium">add yours</span>
          <div className="flex items-center space-x-1 opacity-70">
            <span className="font-sans text-[0.6rem] uppercase tracking-widest text-gray-700">Write a thought</span>
          </div>
        </div>
        
        {/* Decorative pencil illustration (using Lucide icon as a stand-in) */}
        <div className="absolute -right-2 -bottom-2 text-[#466B14] opacity-50 transform -rotate-12 group-hover:rotate-0 transition-transform duration-300">
          <Pencil size={24} strokeWidth={2} />
        </div>
      </div>
    </button>
  );
}
