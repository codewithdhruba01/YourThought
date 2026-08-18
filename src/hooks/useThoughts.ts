import { useState, useEffect, useCallback } from 'react';
import type { Thought } from '../types';

export type SortMode = 'newest' | 'popular' | 'surprise';

export function useThoughts() {
  const [thoughts, setThoughts] = useState<Thought[]>([]);
  const [sortMode, setSortMode] = useState<SortMode>('newest');
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize data
  useEffect(() => {
    const stored = localStorage.getItem('thoughtful-list-data-v3');
    if (stored) {
      try {
        setThoughts(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse stored thoughts');
        setThoughts([]);
        localStorage.setItem('thoughtful-list-data-v3', JSON.stringify([]));
      }
    } else {
      setThoughts([]);
      localStorage.setItem('thoughtful-list-data-v3', JSON.stringify([]));
    }
    setIsLoaded(true);
  }, []);

  // Persist on change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('thoughtful-list-data-v3', JSON.stringify(thoughts));
    }
  }, [thoughts, isLoaded]);

  const addThought = useCallback((newThought: Thought) => {
    setThoughts(prev => [newThought, ...prev]);
    // When adding a new thought, usually we want to see it, so we switch to newest
    setSortMode('newest');
  }, []);

  const toggleLike = useCallback((id: string) => {
    setThoughts(prev => 
      prev.map(t => 
        t.id === id 
          ? { ...t, likes: t.likes + 1 } // Simplified logic: just increment for now since card manages local un-like, or actually server should handle true toggle. We'll just update the likes. Wait, the card handles local state. We'll just apply the increment permanently to data.
          : t
      )
    );
  }, []);

  const triggerSurprise = useCallback(() => {
    setSortMode('surprise');
    // Randomize the thoughts by slightly tweaking their order
    setThoughts(prev => {
      const shuffled = [...prev].sort(() => Math.random() - 0.5);
      return shuffled;
    });
  }, []);

  const getSortedThoughts = useCallback(() => {
    const copy = [...thoughts];
    if (sortMode === 'newest') {
      return copy.sort((a, b) => b.createdAt - a.createdAt);
    } else if (sortMode === 'popular') {
      return copy.sort((a, b) => b.likes - a.likes);
    }
    // For surprise, we already shuffled the actual array state
    return copy;
  }, [thoughts, sortMode]);

  return {
    thoughts: getSortedThoughts(),
    totalCount: thoughts.length,
    sortMode,
    setSortMode: (mode: SortMode) => {
      if (mode === 'surprise') {
        triggerSurprise();
      } else {
        setSortMode(mode);
      }
    },
    addThought,
    toggleLike,
  };
}
