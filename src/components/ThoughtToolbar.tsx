import clsx from 'clsx';
import type { SortMode } from '../hooks/useThoughts';

interface ThoughtToolbarProps {
  count: number;
  activeSort: SortMode;
  onSortChange: (mode: SortMode) => void;
}

export function ThoughtToolbar({ count, activeSort, onSortChange }: ThoughtToolbarProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 mb-5 pb-3 border-b border-[#f3eee61a] font-sans text-[#f3eee675]">
      <div className="text-[0.76rem] font-medium tracking-[0.08em] uppercase whitespace-nowrap">
        <span className="text-[#f3eee6c7] font-variant-numeric tabular-nums">{count}</span> THOUGHTS ADDED
      </div>
      
      <div className="flex items-center justify-end gap-[0.3rem]">
        <span className="text-[0.72rem] tracking-[0.06em] uppercase mr-[0.35rem]">Show me:</span>
        <div className="flex items-center gap-[0.3rem]">
          {(['popular', 'newest', 'surprise'] as SortMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => onSortChange(mode)}
              className={clsx(
                "appearance-none bg-transparent border-0 rounded-full px-[0.48rem] py-[0.28rem] text-[0.8233rem] font-medium transition-colors duration-[0.18s] capitalize",
                activeSort === mode 
                  ? "bg-[#f3eee61a] text-[#f3eee6]" 
                  : "text-[#f3eee66b] hover:text-[#f3eee6c7] focus-visible:outline focus-visible:outline-[#f3eee673] focus-visible:outline-offset-2"
              )}
            >
              {mode === 'surprise' ? 'Surprise me' : mode}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
