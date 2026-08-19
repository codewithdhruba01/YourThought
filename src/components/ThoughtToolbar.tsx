import clsx from 'clsx';
import { ChevronDown } from 'lucide-react';
import type { SortMode } from '../hooks/useThoughts';

interface ThoughtToolbarProps {
  count: number;
  activeSort: SortMode;
  onSortChange: (mode: SortMode) => void;
}

export function ThoughtToolbar({
  count,
  activeSort,
  onSortChange,
}: ThoughtToolbarProps) {
  return (
    <div className="flex flex-row items-center justify-between gap-4 mb-5 pb-3 border-b border-[#f3eee61a] font-sans text-[#f3eee675]">
      <div className="text-[0.9rem] font-medium tracking-[0.08em] uppercase whitespace-nowrap">
        <span className="text-[#f3eee6c7] font-variant-numeric tabular-nums">
          {count}
        </span>{' '}
        THOUGHTS
      </div>

      {/* Mobile Dropdown */}
      <div className="sm:hidden relative">
        <select
          value={activeSort}
          onChange={(e) => onSortChange(e.target.value as SortMode)}
          className="appearance-none bg-white/10 text-white border border-white/20 rounded-full pl-4 pr-8 py-1.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-white/30 capitalize"
        >
          <option value="popular" className="bg-[#22211f] text-white">
            Popular
          </option>
          <option value="newest" className="bg-[#22211f] text-white">
            Newest
          </option>
          <option value="surprise" className="bg-[#22211f] text-white">
            Surprise me
          </option>
        </select>
        <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/70 pointer-events-none" />
      </div>

      {/* Desktop Buttons */}
      <div className="hidden sm:flex items-center justify-end gap-[0.3rem]">
        <span className="text-[0.9rem] tracking-[0.06em] uppercase mr-[0.35rem]">
          Show me:
        </span>
        <div className="flex items-center gap-[0.3rem]">
          {(['popular', 'newest', 'surprise'] as SortMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => onSortChange(mode)}
              className={clsx(
                'appearance-none bg-transparent border-0 rounded-full px-3 py-1.5 text-[0.9rem] font-medium transition-colors duration-[0.18s] capitalize',
                activeSort === mode
                  ? 'bg-white/15 text-white'
                  : 'text-[#f3eee66b] hover:text-[#f3eee6c7] focus-visible:outline focus-visible:outline-[#f3eee673] focus-visible:outline-offset-2'
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
