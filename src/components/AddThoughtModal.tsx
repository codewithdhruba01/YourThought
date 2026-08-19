import { useState } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { v4 as uuidv4 } from 'uuid';
import type { PaperColor, TapeType, PaperTexture, Thought } from '../types';
import { getTextureStyle } from '../utils/styles';

interface AddThoughtModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (thought: Thought) => void;
}

const PAPER_COLORS: { id: PaperColor; hex: string }[] = [
  { id: 'peach', hex: '#FFAF82' },
  { id: 'yellow', hex: '#FFDF59' },
  { id: 'green', hex: '#A6D238' },
  { id: 'blue', hex: '#82C8FA' },
  { id: 'lavender', hex: '#D7B4F3' },
];

const TEXTURE_TYPES: { id: PaperTexture; label: string }[] = [
  { id: 'grid', label: 'Graph' },
  { id: 'dots', label: 'Dotted' },
  { id: 'lines', label: 'Lined' },
  { id: 'blank', label: 'Blank' },
];

const TAPE_TYPES: { id: TapeType; label: string }[] = [
  { id: 'india', label: 'Indian Flag' },
  { id: 'classic', label: 'Classic Blue' },
  { id: 'frosted', label: 'Frosted' },
  { id: 'gingham', label: 'Gingham' },
  { id: 'polka', label: 'Polka' },
  { id: 'linen', label: 'Linen' },
  { id: 'hearts', label: 'Hearts' },
  { id: 'smiley', label: 'Smiley' },
];

export function AddThoughtModal({
  isOpen,
  onClose,
  onSubmit,
}: AddThoughtModalProps) {
  const [text, setText] = useState('');
  const [author, setAuthor] = useState('');
  const [paperColor, setPaperColor] = useState<PaperColor>('green');
  const [tape, setTape] = useState<TapeType>('india');
  const [texture, setTexture] = useState<PaperTexture>('grid');

  const resetForm = () => {
    setText('');
    setAuthor('');
    setPaperColor('green');
    setTape('india');
    setTexture('grid');
  };

  const handleClose = () => {
    onClose();
    setTimeout(resetForm, 300); // Reset after exit animation
  };

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
      texture,
      rotation: Math.random() * 3 - 1.5,
    };

    onSubmit(newThought);
    handleClose();
  };

  const previewColorClasses: Record<PaperColor, string> = {
    peach: '#FFAF82',
    yellow: '#FFDF59',
    green: '#A6D238', // Vibrant green from reference
    blue: '#82C8FA',
    lavender: '#D7B4F3',
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
            onClick={handleClose}
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
                <h2 className="font-serif text-3xl text-[#e0ddd5]">
                  add your note
                </h2>
                <p className="font-serif text-sm text-gray-400 italic">
                  (be kind)
                </p>
              </div>
              <button
                onClick={handleClose}
                className="absolute right-6 top-6 text-gray-400 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-8 scrollbar-hide">
              {/* Live Preview */}
              <div className="flex justify-center mt-2">
                <div
                  className="relative w-40 h-44 p-4 pt-8 flex flex-col items-center justify-center text-center rounded-2xl"
                  style={{
                    backgroundColor: previewColorClasses[paperColor],
                    boxShadow:
                      '0 8px 16px -4px rgba(0,0,0,0.15), inset 0 0 0 1px rgba(255,255,255,0.2)',
                    ...getTextureStyle(texture, true),
                  }}
                >
                  {/* Tape */}
                  <div
                    className={clsx(
                      'tape-base absolute -top-2.5 left-1/2 w-[48%] h-6 z-10',
                      `tape-${tape}`
                    )}
                    style={{ transform: 'translateX(-50%)' }}
                  />

                  <p className="font-serif text-sm leading-snug text-gray-800 wrap-break-word w-full line-clamp-4 font-medium mt-1">
                    {text || 'a small thing worth doing...'}
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
                          'w-8 h-8 rounded-full shadow-inner transition-all',
                          paperColor === color.id
                            ? 'ring-2 ring-offset-2 ring-offset-[#22211f] ring-white scale-110'
                            : 'hover:scale-110'
                        )}
                        style={{ backgroundColor: color.hex }}
                        aria-label={`Select ${color.id} paper`}
                      />
                    ))}
                  </div>
                </div>

                {/* Paper Texture */}
                <div>
                  <label className="block text-xs font-sans tracking-widest text-gray-400 uppercase mb-3 text-center">
                    Texture
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {TEXTURE_TYPES.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setTexture(t.id)}
                        className={clsx(
                          'flex flex-col items-center justify-center p-2 rounded-lg transition-colors border border-transparent',
                          texture === t.id
                            ? 'bg-white/10 border-white/20'
                            : 'hover:bg-white/5'
                        )}
                      >
                        <div
                          className="w-10 h-10 mb-2 relative rounded-md shadow-inner bg-paper-cream"
                          style={{
                            backgroundColor: previewColorClasses[paperColor],
                            ...getTextureStyle(t.id, true),
                          }}
                        />
                        <span className="text-[10px] uppercase tracking-wider text-gray-400 text-center leading-tight">
                          {t.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tape Type */}
                <div>
                  <label className="block text-xs font-sans tracking-widest text-gray-400 uppercase mb-3 text-center">
                    Tape
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {TAPE_TYPES.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setTape(t.id)}
                        className={clsx(
                          'flex flex-col items-center justify-center p-1.5 rounded-lg transition-colors',
                          tape === t.id ? 'bg-white/10' : 'hover:bg-white/5'
                        )}
                      >
                        <div className="w-12 h-4 mb-1.5 relative overflow-hidden bg-gray-200 rounded-sm">
                          <div
                            className={clsx('absolute inset-0', `tape-${t.id}`)}
                            style={{
                              top: 0,
                              left: 0,
                              width: '100%',
                              height: '100%',
                              transform: 'none',
                            }}
                          />
                        </div>
                        <span className="text-[9px] uppercase tracking-wider text-gray-400 text-center leading-tight truncate w-full">
                          {t.label}
                        </span>
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
                    Your Name / Instagram Handle{' '}
                    <span className="lowercase italic text-gray-500">
                      (optional)
                    </span>
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
