import { useEffect } from 'react';
import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { Thought } from '../types';

export type SortMode = 'newest' | 'popular' | 'surprise';

interface ThoughtsState {
  thoughts: Thought[];
  sortMode: SortMode;
  isLoaded: boolean;
  isFetching: boolean;

  // Actions
  fetchThoughts: () => Promise<void>;
  setSortMode: (mode: SortMode) => void;
  triggerSurprise: () => void;
  addThought: (newThought: Thought) => Promise<void>;
  toggleLike: (id: string) => Promise<void>;
}

export const useThoughtsStore = create<ThoughtsState>((set, get) => ({
  thoughts: [],
  sortMode: 'newest',
  isLoaded: false,
  isFetching: false,

  fetchThoughts: async () => {
    if (get().isLoaded || get().isFetching) return;

    set({ isFetching: true });
    const { data, error } = await supabase.from('thoughts').select('*');

    if (error) {
      console.error('Error fetching thoughts:', error);
      set({ isFetching: false });
    } else if (data) {
      const mappedThoughts: Thought[] = data.map((t) => ({
        id: t.id,
        text: t.text,
        author: t.author || undefined,
        likes: t.likes,
        createdAt: Number(t.created_at),
        paperColor: t.paper_color,
        tape: t.tape,
        texture: t.texture || undefined,
        rotation: t.rotation,
      }));
      set({ thoughts: mappedThoughts, isLoaded: true, isFetching: false });
    }
  },

  setSortMode: (mode) => {
    if (mode === 'surprise') {
      get().triggerSurprise();
    } else {
      set({ sortMode: mode });
    }
  },

  triggerSurprise: () => {
    set((state) => {
      const shuffled = [...state.thoughts].sort(() => Math.random() - 0.5);
      return { sortMode: 'surprise', thoughts: shuffled };
    });
  },

  addThought: async (newThought) => {
    // Optimistic update
    set((state) => ({
      thoughts: [newThought, ...state.thoughts],
      sortMode: 'newest',
    }));

    const { error } = await supabase.from('thoughts').insert([
      {
        id: newThought.id,
        text: newThought.text,
        author: newThought.author,
        likes: newThought.likes,
        created_at: newThought.createdAt,
        paper_color: newThought.paperColor,
        tape: newThought.tape,
        texture: newThought.texture,
        rotation: newThought.rotation,
      },
    ]);

    if (error) {
      console.error('Error inserting thought:', error);
    }
  },

  toggleLike: async (id) => {
    const thought = get().thoughts.find((t) => t.id === id);
    if (!thought) return;

    const newLikes = thought.likes + 1;

    set((state) => ({
      thoughts: state.thoughts.map((t) =>
        t.id === id ? { ...t, likes: newLikes } : t
      ),
    }));

    const { error } = await supabase
      .from('thoughts')
      .update({ likes: newLikes })
      .eq('id', id);

    if (error) {
      console.error('Error updating likes:', error);
    }
  },
}));

export function useThoughts() {
  const isLoaded = useThoughtsStore((state) => state.isLoaded);
  const fetchThoughts = useThoughtsStore((state) => state.fetchThoughts);
  const thoughts = useThoughtsStore((state) => state.thoughts);
  const sortMode = useThoughtsStore((state) => state.sortMode);
  const setSortMode = useThoughtsStore((state) => state.setSortMode);
  const addThought = useThoughtsStore((state) => state.addThought);
  const toggleLike = useThoughtsStore((state) => state.toggleLike);

  useEffect(() => {
    if (!isLoaded) {
      fetchThoughts();
    }
  }, [isLoaded, fetchThoughts]);

  const getSortedThoughts = () => {
    const copy = [...thoughts];
    if (sortMode === 'newest') {
      return copy.sort((a, b) => b.createdAt - a.createdAt);
    } else if (sortMode === 'popular') {
      return copy.sort((a, b) => b.likes - a.likes);
    }
    return copy;
  };

  return {
    thoughts: getSortedThoughts(),
    totalCount: thoughts.length,
    sortMode,
    setSortMode,
    addThought,
    toggleLike,
    isLoaded,
  };
}
