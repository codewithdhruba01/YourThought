import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '../lib/supabase';
import type { Thought } from '../types';

export type SortMode = 'newest' | 'popular' | 'surprise';

export function useThoughts() {
  const [thoughts, setThoughts] = useState<Thought[]>([]);
  const [sortMode, setSortMode] = useState<SortMode>('newest');
  const [isLoaded, setIsLoaded] = useState(false);

  const thoughtsRef = useRef(thoughts);
  useEffect(() => {
    thoughtsRef.current = thoughts;
  }, [thoughts]);

  // Initialize data from Supabase
  useEffect(() => {
    const fetchThoughts = async () => {
      const { data, error } = await supabase
        .from('thoughts')
        .select('*');
      
      if (error) {
        console.error('Error fetching thoughts:', error);
      } else if (data) {
        // Map from snake_case to camelCase
        const mappedThoughts: Thought[] = data.map(t => ({
          id: t.id,
          text: t.text,
          author: t.author || undefined,
          likes: t.likes,
          createdAt: Number(t.created_at),
          paperColor: t.paper_color,
          tape: t.tape,
          texture: t.texture || undefined,
          rotation: t.rotation
        }));
        setThoughts(mappedThoughts);
      }
      setIsLoaded(true);
    };

    fetchThoughts();
  }, []);

  const addThought = useCallback(async (newThought: Thought) => {
    // Optimistic update
    setThoughts(prev => [newThought, ...prev]);
    setSortMode('newest');

    // Persist to Supabase
    const { error } = await supabase
      .from('thoughts')
      .insert([{
        id: newThought.id,
        text: newThought.text,
        author: newThought.author,
        likes: newThought.likes,
        created_at: newThought.createdAt,
        paper_color: newThought.paperColor,
        tape: newThought.tape,
        texture: newThought.texture,
        rotation: newThought.rotation
      }]);
      
    if (error) {
      console.error('Error inserting thought:', error);
    }
  }, []);

  const toggleLike = useCallback(async (id: string) => {
    const thought = thoughtsRef.current.find(t => t.id === id);
    if (!thought) return;
    
    const newLikes = thought.likes + 1;

    // Optimistic update
    setThoughts(prev => 
      prev.map(t => 
        t.id === id 
          ? { ...t, likes: newLikes } 
          : t
      )
    );

    // Persist to Supabase
    const { error } = await supabase
      .from('thoughts')
      .update({ likes: newLikes })
      .eq('id', id);

    if (error) {
      console.error('Error updating likes:', error);
    }
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
    isLoaded
  };
}
