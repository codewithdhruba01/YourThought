import { useState } from 'react';
import { Header } from './components/Header';
import { ThoughtToolbar } from './components/ThoughtToolbar';
import { ThoughtWall } from './components/ThoughtWall';
import { FloatingAddButton } from './components/FloatingAddButton';
import { AddThoughtModal } from './components/AddThoughtModal';
import { Footer } from './components/Footer';
import { useThoughts } from './hooks/useThoughts';

function App() {
  const { thoughts, totalCount, sortMode, setSortMode, addThought, toggleLike } = useThoughts();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--color-wall-dark)] text-[#e0ddd5] font-sans selection:bg-white/20">
      <div className="w-full max-w-[1120px] mx-auto flex flex-col min-h-screen" style={{ padding: 'clamp(2.75rem, 8vh, 5rem) clamp(1rem, 3vw, 2rem) 4.5rem' }}>
        <Header />
        
        <main className="flex-1">
          <ThoughtToolbar 
            count={totalCount} 
            activeSort={sortMode} 
            onSortChange={setSortMode} 
          />
          
          <ThoughtWall 
            thoughts={thoughts} 
            onLikeToggle={toggleLike} 
          />
        </main>

        <Footer />
      </div>

      <FloatingAddButton onClick={() => setIsModalOpen(true)} />
      
      <AddThoughtModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={addThought} 
      />
    </div>
  );
}

export default App;
