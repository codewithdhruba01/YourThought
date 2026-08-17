import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { v4 as uuidv4 } from 'uuid';
import type { PaperColor, TapeType, Thought } from '../types';

interface AddThoughtModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (thought: Thought) => void;
}

const PAPER_COLORS: { id: PaperColor; hex: string }[] = [
  { id: 'peach', hex: '#f9cba7' },
  { id: 'yellow', hex: '#f2e394' },
  { id: 'green', hex: '#cbe0c1' },
  { id: 'blue', hex: '#b4d1e2' },
  { id: 'lavender', hex: '#d8c3e8' },
];

const TAPE_TYPES: { id: TapeType; label: string }[] = [
  { id: 'frosted', label: 'Frosted' },
  { id: 'gingham', label: 'Gingham' },
  { id: 'polka', label: 'Polka' },
  { id: 'linen', label: 'Linen' },
  { id: 'hearts', label: 'Hearts' },
  { id: 'smiley', label: 'Smiley' },
];

export function AddThoughtModal({ isOpen, onClose, onSubmit }: AddThoughtModalProps) {
  const [text, setText] = useState('');
  const [author, setAuthor] = useState('');
  const [paperColor, setPaperColor] = useState<PaperColor>('peach');
  const [tape, setTape] = useState<TapeType>('frosted');

  // Reset form when opened
  useEffect(() => {
    if (isOpen) {
      setText('');
      setAuthor('');
      setPaperColor('peach');
      setTape('frosted');
    }
  }, [isOpen]);

  const handleSubmit = () => {
    if (!text.trim()) return;

    const newThought: Thought = {
      id: uuidv4(),
      text: text.trim(),
      author: author.trim() || undefined,
      likes: 0,
      createdAt: Date.now(),
      paperColor,
      tape,
      rotation: (Math.random() * 3) - 1.5,
    };

    onSubmit(newThought);
    onClose();
  };

  const previewColorClasses = {
    peach: 'bg-[var(--color-paper-peach)]',
    yellow: 'bg-[var(--color-paper-yellow)]',
    green: 'bg-[var(--color-paper-green)]',
    blue: 'bg-[var(--color-paper-blue)]',
    lavender: 'bg-[var(--color-paper-lavender)]',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg bg-[#22211f] rounded-2xl shadow-2xl overflow-hidden border border-gray-800 flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="p-6 pb-4 flex justify-between items-start relative z-10">
              <div className="text-center w-full">
                <h2 className="font-serif text-3xl text-[#e0ddd5]">add your note</h2>
                <p className="font-serif text-sm text-gray-400 italic">(be kind)</p>
              </div>
              <button
                onClick={onClose}
                className="absolute right-6 top-6 text-gray-400 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-8 custom-scrollbar">
              
              {/* Live Preview */}
              <div className="flex justify-center mt-2">
                <div 
                  className={clsx(
                    "relative paper-texture w-40 h-44 p-4 pt-8 flex flex-col items-center justify-center text-center shadow-md",
                    previewColorClasses[paperColor]
                  )}
                >
                  <div className={clsx("tape-base", `tape-${tape}`)} />
                  <p className="font-serif text-sm leading-snug text-gray-800 break-words w-full line-clamp-4">
                    {text || "a small thing worth doing..."}
                  </p>
                </div>
              </div>

              {/* Selectors */}
              <div className="space-y-6">
                
                {/* Paper Color */}
                <div>
                  <label className="block text-xs font-sans tracking-widest text-gray-400 uppercase mb-3 text-center">
                    Paper Color
                  </label>
                  <div className="flex justify-center space-x-3">
                    {PAPER_COLORS.map((color) => (
                      <button
                        key={color.id}
                        onClick={() => setPaperColor(color.id)}
                        className={clsx(
                          "w-8 h-8 rounded-full shadow-inner transition-all",
                          paperColor === color.id ? "ring-2 ring-offset-2 ring-offset-[#22211f] ring-white scale-110" : "hover:scale-110"
                        )}
                        style={{ backgroundColor: color.hex }}
                        aria-label={`Select ${color.id} paper`}
                      />
                    ))}
                  </div>
                </div>

                {/* Tape Type */}
                <div>
                  <label className="block text-xs font-sans tracking-widest text-gray-400 uppercase mb-3 text-center">
                    Tape
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {TAPE_TYPES.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setTape(t.id)}
                        className={clsx(
                          "flex flex-col items-center justify-center p-2 rounded-lg transition-colors",
                          tape === t.id ? "bg-white/10" : "hover:bg-white/5"
                        )}
                      >
                        <div className="w-16 h-6 mb-2 relative overflow-hidden bg-gray-200">
                           <div className={clsx("absolute inset-0", `tape-${t.id}`)} style={{ top: 0, left: 0, width: '100%', height: '100%', transform: 'none' }} />
                        </div>
                        <span className="text-[10px] uppercase tracking-wider text-gray-400">{t.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Text Input */}
                <div>
                  <label className="block text-xs font-sans tracking-widest text-gray-400 uppercase mb-2">
                    Your Note
                  </label>
                  <div className="relative">
                    <textarea
                      value={text}
                      onChange={(e) => setText(e.target.value.slice(0, 120))}
                      placeholder="a small thing worth doing..."
                      className="w-full bg-[#1a1917] border border-gray-700 rounded-lg p-4 text-[#e0ddd5] font-serif text-lg resize-none focus:outline-none focus:border-gray-500 h-28"
                    />
                    <div className="absolute bottom-3 right-3 text-xs font-sans text-gray-500">
                      {text.length}/120
                    </div>
                  </div>
                </div>

                {/* Author Input */}
                <div>
                  <label className="block text-xs font-sans tracking-widest text-gray-400 uppercase mb-2">
                    Your Name / Instagram Handle <span className="lowercase italic text-gray-500">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="this will show up on the wall..."
                    className="w-full bg-[#1a1917] border border-gray-700 rounded-lg p-3 text-[#e0ddd5] font-serif focus:outline-none focus:border-gray-500"
                  />
                </div>
              </div>

              {/* Submit */}
              <div className="pt-4 pb-2">
                <button
                  onClick={handleSubmit}
                  disabled={!text.trim()}
                  className="w-full bg-[#8c887d] hover:bg-[#a39f93] disabled:opacity-50 disabled:cursor-not-allowed text-[#191816] font-medium py-3 rounded-full transition-colors text-sm uppercase tracking-widest"
                >
                  Submit
                </button>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
